require('dotenv').config();
const { initializeApp } = require('firebase-admin/app');
module.exports.firebase = initializeApp();
const express = require('express');
const app = express();
const morgan = require('morgan');
const router = require('./routes.js');
const { decodeToken } = require('./middleware');


app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// app.use(decodeToken);
// commented for testing solely routes without auth

app.get('/test', (req, res) => {
  res.send('hello order management world');
});

app.use('/api', router);

app.all('/', (req, res) => {
  res.status(404).end();
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});