// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const docRoutes = require('./routes/route');

// const app = express();

// // Middleware
// app.use(express.json());

// app.use(cors());

// app.use(express.urlencoded({ extended: false }));   

// app.use('/api/docs', docRoutes);


// module.exports = {app}


// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const docRoutes = require('./routes/route');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Serve static files
app.use(express.static('public'));

// Attach the HTTP server to Socket.IO
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// WebSocket event handlers
io.on('connection', (socket) => {
	console.log('A user connected');

	// Send a message to the client
	socket.emit('message', 'Hello, client!');

	// Handle messages from the client
	socket.on('message', (data) => {
		console.log(`Received message from client: ${data}`);
	});

	// Handle disconnections
	socket.on('disconnect', () => {
		console.log('A user disconnected');
	});
});

// Mount routes
app.use('/api/docs', docRoutes);

module.exports = { app, server };
