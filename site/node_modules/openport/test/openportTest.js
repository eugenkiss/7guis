'use strict';

var net = require('net');
var http = require('http');
var op = require('../');

module.exports = {
  'bad arguments': function (test) {
    try {
      op.find();
      test.fail("should throw");
    } catch (ex) {
      test.equals('callback is required', ex.message);
    }
    test.done();
  },

  'just a callback': function (test) {
    op.find(function (err, port) {
      test.ok(!err);
      test.ok(parseInt(port) > 1000);
      test.done();
    });
  },

  'find a single open port': function (test) {
    op.find(
      {
        ports: [ 1024 ]
      },
      function (err, port) {
        test.ok(!err);
        test.equals(1024, port);
        test.done();
      });
  },

  'find a port not in the avoid list': function (test) {
    op.find(
      {
        ports: [ 1024, 1025, 1026, 1027 ],
        avoid: [ 1025, 1026 ],
        count: 2
      },
      function (err, ports) {
        test.ok(!err);
        test.deepEqual([1024, 1027], ports);
        test.done();
      });
  },

  'find a port not in the avoid list outer case': function (test) {
    op.find(
      {
        ports: [ 1024, 1025, 1026, 1027 ],
        avoid: [ '1024', '1027' ],
        count: 2
      },
      function (err, ports) {
        test.ok(!err);
        test.deepEqual([1025, 1026], ports);
        test.done();
      });
  },

  'find a port not in the avoid list starting port': function (test) {
    op.find(
      {
        startingPort: 1024,
        avoid: [ 1024, 1026 ],
        count: 2
      },
      function (err, ports) {
        test.ok(!err);
        test.deepEqual([1025, 1027], ports);
        test.done();
      });
  },

  'port that requires sudo': function (test) {
    op.find(
      {
        ports: [ 1023 ]
      },
      function (err, port) {
        test.equals('no ports found', err.message);
        test.ok(!port);
        test.done();
      });
  },

  'find a port after a closed port': function (test) {
    var server = net.createServer();
    server.listen(1024, function () {
      op.find(
        {
          ports: [ 1024, 1025 ]
        },
        function (err, port) {
          test.ok(!err);
          test.equals(1025, port);
          server.close();
          test.done();
        });
    });
  },

  'find multiple open ports': function (test) {
    op.find(
      {
        ports: [ 1024, 1025 ],
        count: 2
      },
      function (err, ports) {
        test.ok(!err);
        test.equals(2, ports.length);
        test.equals(1024, ports[0]);
        test.equals(1025, ports[1]);
        test.done();
      });
  },

  'find open defaults': function (test) {
    op.find(
      function (err, port) {
        test.ok(!err);
        test.equals(1024, port);
        test.done();
      });
  },

  'find open with starting port': function (test) {
    op.find(
      {
        startingPort: 10000
      },
      function (err, port) {
        test.ok(!err);
        test.equals(10000, port);
        test.done();
      });
  },

  'bad starting and ending port': function (test) {
    try {
      op.find(
        {
          startingPort: 1025,
          endingPort: 1024
        },
        function (err, port) {
          test.fail("this shouldn't happen");
        });
    } catch (ex) {
      test.done();
    }
  },

  'bad starting port': function (test) {
    try {
      op.find(
        {
          startingPort: 0
        },
        function (err, port) {
          test.fail("this shouldn't happen");
        });
    } catch (ex) {
      test.done();
    }
  },

  'bad ending port': function (test) {
    try {
      op.find(
        {
          startingPort: op.maxPort + 1
        },
        function (err, port) {
          test.fail("this shouldn't happen");
        });
    } catch (ex) {
      test.done();
    }
  },

  'find no open port hitting ending port': function (test) {
    var server = net.createServer();
    server.listen(1024, function () {
      op.find(
        {
          startingPort: 1024,
          endingPort: 1024
        },
        function (err, port) {
          test.equals('no ports found', err.message);
          test.ok(!port);
          server.close();
          test.done();
        });
    });
  },

  'create custom servers': function (test) {
    var server = net.createServer();
    server.listen(1024, function () {
      op.find({
        ports: [1024, 1025, 1026],
        count: 2,
        createServer: function (port, callback) {
          var server = http.createServer(function (req, res) {
          });
          server.port = port;
          server.once('error', function (ex) {
            callback(ex);
          });
          server.listen(port, function () {
            callback(null, server);
          });
        }
      }, function (err, servers) {
        test.ok(!err);
        test.equals(servers.length, 2);
        test.equals(servers[0].port, 1025);
        test.equals(servers[1].port, 1026);
        servers[0].close();
        servers[1].close();
        server.close();
        test.done();
      });
    });
  }
};

