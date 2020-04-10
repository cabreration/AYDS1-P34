'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.listen(3000, () => console.log('escuchando en puerto 3000'));

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/login', async(req, res)=> {
    res.send({ estado: true, mensaje: 'hola mundo'});
});

app.post('/signup', async(req, res)=> {
    res.send({ estado: true, mensaje: 'hola mundo'});
});

app.post("/perfil", (req, res) => {
    res.send({
      estado: true,
      mensaje: "post perfil",
      result: {
        nombre: "",
        apellido: "",
        dpi: -1,
        nocuenta: "",
        saldo: 0,
        email: "",
        password: ""
      }
    });
});

app.post("/check-balance",(req,res)=>{
  //console.log(req.body);
  let cuentas = [{cuenta:'1',saldo: 10},{cuenta:'2',saldo: 20},{cuenta:'3',saldo: 30},{cuenta:'4',saldo: 40}];
  cuentas.forEach(element =>{
    if(element.cuenta===req.body.cuenta){
      res.send({saldo:element.saldo});
    }
  })
  res.send({saldo:0});
});
