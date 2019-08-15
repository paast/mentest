
const express = require('express');
const mongoose = require('mongoose');
const { appRouter, apiRouter } = require('./routers');

///////////////////

config = {
  serverPort: 3000,
  dbUrl: 'mongodb://localhost:27017/test'
}

///////////////////

const server = express();
server.locals.baseUrl = '';

server.set('views', './src/views');
server.set('view engine', 'pug');

server.use('/api', apiRouter);
server.use('/', appRouter);

connect();

///////////////////

function listen() {
  server.listen(config.serverPort, () => {
    console.log(`mentest is listening on port ${config.serverPort}`);
  });
}

function connect() {
  mongoose.connection
    .on('error', console.error.bind(console, 'connection error:'))
    .on('disconnected', connect)
    .once('open', listen);

  mongoose.connect(config.dbUrl, {useNewUrlParser: true});
}
