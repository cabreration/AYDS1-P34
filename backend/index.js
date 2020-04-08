'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());

app.listen(3000, () => console.log('escuchando en puerto 3000'));

app.post('/login', async(req, res)=> {
    res.send({ estado: true, mensaje: 'hola mundo'});
});

app.post('/signup', async(req, res)=> {
    res.send({ estado: true, mensaje: 'hola mundo'});
});