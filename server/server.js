const express = require('express');
const app = express();
const path = require('path');

const blockoutRouter = require('./routes/blockout');
const collectionRouter = require('./routes/collection');
const rideRouter = require('./routes/ride');

console.log('in server.js');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res, next) => {
    console.log('in get /')
    return next();
  }, (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
})

// route handlers for client app requests
app.use('/api/blockout', blockoutRouter);
app.use('/api/collection', collectionRouter);
app.use('/api/ride', rideRouter);

app.use('/assets', express.static(path.join(__dirname, './assets')))


// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    status: 400,
    message: { err: 'unknown middleware error' },
  };
  console.log(err);
  const errObj = Object.assign({}, defaultErr, err);
  return res.status(errObj.status).json(errObj.message);
})


app.listen(3000);

module.exports = app;
