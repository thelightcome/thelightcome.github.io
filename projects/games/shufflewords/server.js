const mongoose = require('mongoose'),
	  app = require('./app'),
	  debug = require('debug')('word-game:server'),
	  http = require('http');

let server;

mongoose.connect('mongodb://localhost/word-game', {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {

	console.log('connected database');

	const port = normalizePort(process.env.PORT || '3000');
	app.set('port', port);

	server = http.createServer(app);

	console.log('server listen' + port)

	server.listen(port);
	server.on('error', onError);
	server.on('listening', onListening);
});

function normalizePort(val) {
	const port = parseInt(val, 10);

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

	const bind = typeof port === 'string'
	? 'Pipe ' + port
	: 'Port ' + port;

	switch (error.code) {
		case 'EACCES':
		console.error(bind + ' requires elevated privileges');
		process.exit(1);
		break;
		case 'EADDRINUSE':
		console.error(bind + ' is already in use');
		process.exit(1);
		break;
		default:
		throw error;
	}
}

function onListening() {
	const addr = server.address();
	const bind = typeof addr === 'string'
	? 'pipe ' + addr
	: 'port ' + addr.port;
	debug('Listening on ' + bind);
}
