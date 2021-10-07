# git-promise

Simple wrapper that allows you to run any `git` command using a more intuitive syntax.

## Getting Started

```shell
npm install git-promise --save
```

Once installed, you can use it in your JavaScript files like so:

```js
var git = require("git-promise");

git("rev-parse --abbrev-ref HEAD").then(function (branch) {
  console.log(branch); // This is your current branch
});
```

The module will handle exit code automatically, so

```js
var git = require("git-promise");

git("merge origin/master").then(function () {
  // Everything was fine
}).fail(function (err) {
  // Something went bad, maybe merge conflict?
  console.error(err);
});
```

`err` is an [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object augmented with `stdout` property. The following code:

```js
git('clone http://example.org/notExistingExample.git').fail(function (err) {
  console.log("MESSAGE");
  console.log(err.message);
  console.log("STDOUT");
  console.log(err.stdout);
});
```

will log:

```
MESSAGE
'git clone http://example.org/notExistingExample.git' exited with error code 128
STDOUT
Cloning into 'notExistingExample'...
fatal: remote error: Repository does not exist
The requested repository does not exist, or you do not have permission to
access it.
```

## Advanced usage

The `git` command accepts a second parameter that can be used to parse the output or to deal with non 0 exit code.

```js
var git = require("git-promise");

git("status -sb", function (stdout) {
  return stdout.match(/## (.*)/)[1];
}).then(function (branch) {
  console.log(branch); // This is your current branch
});
```

The callback accepts 2 parameters, `(stdout, code)`, where `stdout` is the output of the git command and `code` is the exit code.

The return value of this function will be the resolved value of the promise.

If the `code` parameter is not specified, it'll be handled automatically and the promise will be rejected in case of non 0 code.

```js
var git = require("git-promise");

git("merge-base --is-ancestor master HEAD", function (stdout, code) {
  if (code === 0) {
    // the branch we are on is fast forward to master
    return true;
  } else if (code === 1) {
    // no, it's not
    return false;
  } else {
    // some other error happened
    throw new Error("Something bad happened: " + stdout);
  }
}).then(function (isFastForward) {
  console.log(isFastForward);
}).fail(function (err) {
  // deal with the error
});
```


### Chaining commands

Imagine to be on a local branch which is not fast forward with master and you want to know which commit were pushed on master after the forking point:

```js
var git = require("git-promise");

function findForkCommit () {
  return git("merge-base master HEAD", function (output) {
    return output.trim();
  });
}

function findChanges (forkCommit) {
  return git("log " + forkCommit + "..master --format=oneline", function (output) {
    return output.trim().split("\n");
  });
}

// synchronization can be done in many ways, for instance with Q
var Q = require("q");
[findForkCommit, findChanges].reduce(Q.when, Q({})).then(function (commits) {
  console.log(commits);
});

// or simply using promises, simple cases only?
findForkCommit().then(findChanges).then(function (commits) {
  console.log(commits);
});
```

### Working directory

By default all git commands run in the current working directory (i.e. `process.cwd()`).

You can use the following syntax to run a git command in different folder

```js
var git = require("git-promise");

git("blame file1.js", {cwd: "src/"}).then(function () {
  // Blame someone
});
```

### Custom git executable

By default any command tries to use `git` in `$PATH`, if you have installed `git` in a funky location you can override this value using `gitExec`.

```js
var git = require("git-promise");

git("status", {gitExec: "/usr/local/sbin/git"}).then(function () {
  // All good, I guess
});
```

## Utility methods

This module comes with some utility methods to parse the output of some git commands

```js
var util = require("git-promise/util");
```

* `util.extractStatus(output [, lineSeparator])`

Parse the output of `git status --porcelain` and returns an object with

```
{
  branch: "current branch name, only if git status -b is used",
  index: {
    modified: ["list of files modified in the index"],
    added: ["list of files added in the index"],
    deleted: ["list of files deleted in the index"],
    renamed: ["list of files renamed in the index"],
    copied: ["list of files copied in the index"]
  },
  workingTree: {
    modified: ["list of files modified in the local working tree"],
    added: ["list of files added / renamed / copied in the local working tree"],
    deleted: ["list of files deleted in the local working tree"]
  }
}
```

The method works both with or without option `-z`.

* `util.hasConflict(output)`

Try to determine if there's a merge conflict from the output of `git merge-tree`

```js
var git = require("git-promise");
var util = require("git-promise/util");

git("merge-tree <root-commit> <branch1> <branch2>").then(function (stdout) {
  console.log(util.hasConflict(stdout));
});
```

## Release History

* 0.3.1 Fix current working directory not switching back when command exits with error
* 0.3.0 Custom git executable with `gitExec` option
* 0.2.0 Change current working directory
* 0.1.0 Just started
