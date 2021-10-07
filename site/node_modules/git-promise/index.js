var shell = require("shelljs");
var originalSilent = shell.config.silent;
var Q = require("q");

module.exports = function (command, options, callback) {
	var deferred = Q.defer();

	if (command.substring(0, 4) !== "git ") {
		command = "git " + command;
	}
	for (var i = 1; i < arguments.length; i += 1) {
		var arg = arguments[i];
		if (typeof arg === "function") {
			callback = arg;
		} else if (typeof arg === "object") {
			options = arg;
		}
	}
	if (!callback) {
		// If we completely ignore the command, resolve with the command output
		callback = function (stdout) {
			return stdout;
		};
	}
	if (options && options.gitExec) {
		command = command.replace(/^git/, options.gitExec);
	}

	if (options && options.cwd) {
		shell.config.silent = true;
		shell.pushd(options.cwd);
		shell.config.silent = originalSilent;
	}
	shell.exec(command, {silent: true}, function (code, output) {
		var args;

		// If cwd was changed earlier, then change it back to process' root directory
		if (options && options.cwd) {
			shell.config.silent = true;
			shell.popd();
			shell.config.silent = originalSilent;
		}

		if (callback.length === 1) {
			// Automatically handle non 0 exit codes
			if (code !== 0) {
				var error = new Error("'" + command + "' exited with error code " + code);
				error.stdout = output;
				return deferred.reject(error);
			}
			args = [output];
		} else {
			// This callback is interested in the exit code, don't handle exit code
			args = [output, code];
		}

		try {
			deferred.resolve(callback.apply(null, args));
		} catch (ex) {
			deferred.reject(ex);
		}
	});
	return deferred.promise;
};
