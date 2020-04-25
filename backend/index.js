'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const aws_keys = {
  apiVersion: '2012-08-10',
  region: 'us-east-2',
  endpoint: 'http://dynamodb.us-east-2.amazonaws.com'
}

let AWS = require('aws-sdk');
AWS.config.loadFromPath('./awsConfig.json');
const ddb = new AWS.DynamoDB(aws_keys);

app.listen(3000, () => console.log('escuchando en puerto 3000'));

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/login', async(req, res)=> {
  let account = req.body.account;
  let password = req.body.password;

  let docClient = new AWS.DynamoDB.DocumentClient();
  let params = {
    TableName: 'Usuario',
    Key: {
      'account': account
    }
  }

  docClient.get(params, (err, data) => {
    if (err) {
      console.log(err);
      res.send( { estado: false, mensaje: 'algo salio mal' } );
    }
    else {
      if (Object.keys(data).length === 0 ) {
        res.send( { estado: false, mensaje: 'no existe un usuario con ese numero de cuenta' } );
      }
      else {
        if (data.Item.password != password) {
          res.send({ estado: false, mensaje: 'la clave es incorrecta' });
        }
        else {
          res.send({ estado: true, mensaje: data.Item });
        }
      }
    }
  });
});

app.post('/signup', async(req, res)=> {
  let body = req.body;
  
  //verificamos que no exista ya un usuario con ese numero de cuenta
  let docClient = new AWS.DynamoDB.DocumentClient();
  let params = {
    TableName: 'Usuario',
    Key: {
      'account': body.account
    }
  }

  docClient.get(params, (err, data) => {
    if (err) {
      console.log(err);
      res.send( { estado: false, mensaje: 'algo salio mal'} );
    }
    else {
      if (Object.keys(data).length === 0) {
        ddb.putItem({
          TableName: 'Usuario',
          Item: {
            "account": { S: body.account },
            "name": { S: body.name },
            "lastName": { S: body.lastName },
            "dpi": { S: body.dpi },
            "balance": { S: body.balance.toString(10) }, 
            "email": { S: body.email },
            "password": { S: body.password }
          }
        }, (err, data1) => {
          if (err) {
            console.log(err);
            res.send({ estado: false, mensaje: 'algo salio mal' });
          }
          else {
            res.send({ estado: true, mensaje: 'su cuenta ha sido creada' });
          }
        });
      }
      else {
        res.send({ estado: false, mensaje: 'ya existe un usuario con ese numero de cuenta' });
      }
    }
  });
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

app.post("/money-transfer",async (req,res)=>{
  //res.send({result:false});
  try{
    const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
    //console.log(req.body);
    if(req.body===null||req.body.cuentaOrigen===null
      ||req.body.cuentaDestino===null
      ||req.body.cuentaOrigen===''
      ||req.body.cuentaDestino===''
      ||req.body.cuentaDestino===req.body.cuentaOrigen){
      res.send({result:false});
    }
    let cuentas = [{cuenta:'1',saldo: 1000},{cuenta:'2',saldo: 2000},{cuenta:'3',saldo: 3000},{cuenta:'4',saldo: 4000}];
    var origen = false;
    var destino = false;
    await waitFor(100);
    await asyncForEach(cuentas,async (element)=>{
      await waitFor(50);
      if(element.cuenta===req.body.cuentaOrigen){
        if(element.saldo<req.body.monto){
          res.send({result:false})
        }else{
          origen=true;
        }
      }
      if(element.cuenta===req.body.cuentaDestino){
        destino=true;
      }
    })
    if(!origen||!destino){
      res.send({result:false});
    }
    /**aqui se ejecutaria la operacion de suma/resta en las cuentas origen/destino */
    res.send({result:true});
  }catch(error){
  }
});

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}


app.post("/reporte", async (req, res) => {
  let resultado;
  if(req.body.estado===false){
    resultado={
        estado:false,
        mensaje: 'NO reporte',
        result:{}
      }
  }
  else{
    resultado={    
      estado: true,
      mensaje: "reporte",
      result: {
        transaccion1: {tipo:"retiro", monto:"100"},
        transaccion2: {tipo:"deposito", monto:"200"},
        transaccion3: {tipo:"retiro", monto:"300"}
      }
    }
  }
  res.send(resultado);
});
