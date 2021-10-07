# openport

Finds open network ports.

## Installation

```bash
$ npm install openport
```

## Quick Examples

```javascript
var op = require('openport'),
    http = require('http');

// find an open port
op.find(function(err, port) {
  if(err) { console.log(err); return; }
  // yea! we have an open port.
});

// find two open ports, choosing from 1024, 1025, 1026, 1028
op.find(
  {
    ports: [ 1024, 1025, 1026, 1028 ],
    count: 2
  },
  function(err, ports) {
    if(err) { console.log(err); return; }
    // yea! we have two open ports.
  }
);

// find an open port between 1024 and 2000, but not 1025 or 1500
op.find(
  {
    startingPort: 1024,
    endingPort: 2000,
    avoid: [ 1025, 1500 ]
  },
  function(err, port) {
    if(err) { console.log(err); return; }
    // yea! we have an open port between 1024 and 2000, but not port 1025 or 1500.
  }
);

// create 2 http servers
op.find(
  {
    count: 2,
    createServer: function (port, callback) {
      var server = http.createServer(function (req, res) {
      });
      server.port = port; // save it for later
      server.once('error', function (ex) {
        callback(ex);
      });
      server.listen(port, function () {
        callback(null, server);
      });
    }
  }, function (err, servers) {
    if(err) { console.log(err); return; }
    // yea! we have two web servers.
  }
);
```

# API Documentation

### openport.find([options], callback)

Finds open network ports

__Arguments__

 * options - (optional) - Find options
  * startingPort - The port to start searching for an open port (default: 1024).
  * endingPort - The port to stop searching for an open port (default: 65535).
  * ports - An array of ports to search.
  * count - The number of open ports to find.
  * avoid - An array of ports to avoid.
  * createServer - A function that will try to open a server listening on the given port. Use this when you want to make sure nobody steals your ports in between calls.
 * callback(err, port/ports/servers) - Callback to be called when we have found the open ports.
