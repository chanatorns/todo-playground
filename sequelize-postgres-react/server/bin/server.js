/* eslint-disable no-undef */
require('dotenv').config();

var app = require('../app');
var http = require('http');

var port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
  case 'EACCES':
    // eslint-disable-next-line no-console
    console.error(bind + ' requires elevated privileges');
    // eslint-disable-next-line no-undef
    process.exit(1);
    break;
  case 'EADDRINUSE':
    // eslint-disable-next-line no-console
    console.error(bind + ' is already in use');
    // eslint-disable-next-line no-undef
    process.exit(1);
    break;
  default:
    throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  // eslint-disable-next-line no-console
  console.log('Listening on ' + bind);
}
