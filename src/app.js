/* eslint-disable @typescript-eslint/no-var-requires */
// src/app.js
const express = require('express');
const artistRouter = require('./routes/artist');

const app = express();

app.use(express.json());

app.use('/artist', artistRouter);


// app.get('/', (req, res) => {
//     res.status(200).json('hello world')
//     // res.send('world')
//     // res.status(200).send({ result: 'string'})
// });

module.exports = app;