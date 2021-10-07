/* globals require */
var url = require("url");

function pushUniq (array, value) {
	if (array.indexOf(value) === -1) {
		array.push(value);
	}
}

/**
 * Extract status information from the output of git status --porcelain
 * @see https://www.kernel.org/pub/software/scm/git/docs/git-status.html
 * @param {String} output The text output
 * @param {String} lineSeparator either \n or \0
 * @return {Object}
 */
exports.extractStatus = function (output, lineSeparator) {
	// Guess the line separator is not given
	if (!lineSeparator) {
		// Default to new line (git status --porcelain)
		lineSeparator = "\n";
		if (output.indexOf("\0") !== -1) {
			// git status -z uses \0
			lineSeparator = "\0";
		}
	}

	var keys = {
		M: "modified",
		A: "added",
		D: "deleted",
		R: "renamed",
		C: "copied"
	};

	function createStatus () {
		return {
			modified : [],
			added : [],
			deleted : [],
			renamed : [],
			copied : []
		};
	}

	var summary = {
		branch: "",
		index: createStatus(),
		workingTree: createStatus()
	};

	function process (host, status, code, file) {
		if (code === " ") {
			return;
		} else if (code in keys) {
			pushUniq(host[status][keys[code]], file);
		} else if (code === "?") {
			if (status === "workingTree") {
				// '??' are the untracked files, so add them only once in the working tree
				pushUniq(host[status].added, file);
			}
		} else {
			// console.log("Found a line '" + file + "' with code: " + code + " on status" + status);
		}
	}

	var lines = output.split(lineSeparator);

	lines.forEach(function (line) {
		if (!line) {
			return;
		}
		var index = line.substring(0, 1);
		var workingTree = line.substring(1, 2);
		var file = line.substring(3);

		if (index === "#" && workingTree === "#") {
			summary.branch = file;
		} else {
			process(summary, "index", index, file);
			process(summary, "workingTree", workingTree, file);
		}
	});

	return summary;
};

/**
 * Understand if there's a conflict in a merge operation
 * @param {String} output Diff of a merge
 * @return {Boolean}
 */
exports.hasConflict = function (output) {
	var inBoth = /\nchanged in both/g;
	var conflict = /\n\+[>]{7}/g;
	var compareWith = "\n" + output;
	return inBoth.test(compareWith) && conflict.test(compareWith);
};
