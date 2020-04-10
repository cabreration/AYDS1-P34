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

app.post("/check-balance",async (req,res)=>{
  try{
    const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
    //console.log(req.body);
    if(req.body===null||req.body.cuenta===null){
      res.send({saldo:0});
    }
    let cuentas = [{cuenta:'1',saldo: 10},{cuenta:'2',saldo: 20},{cuenta:'3',saldo: 30},{cuenta:'4',saldo: 40}];
    var result = {saldo:0};
    await waitFor(100);
    await asyncForEach(cuentas,async (element)=>{
      await waitFor(50);
      if(element.cuenta===req.body.cuenta){
        result = {saldo:element.saldo}
      }
    })
    res.send(result);
  }catch(error){
    
  }
  
});

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
