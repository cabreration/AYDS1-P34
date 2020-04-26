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

app.post("/perfil", async (req, res) => {
  // mostrar Datos
  //console.log(req.body);

  // obtener datos
  const { account, name, lastName, dpi, balance, email, password, passwordNew, passwordSesion } = req.body;

  // guardar password que puede o no modificarse
  let passNuevo = (password !== "")? passwordNew: passwordSesion;
  console.log(passNuevo);

  // dynamodb cliente
  let docClient = new AWS.DynamoDB.DocumentClient();

  // parametros
  let params = queryDynamoPerfil(account, name, lastName, dpi, balance, email, passNuevo, password);

  let response = null;
  let mensaje = "";
  let estado = false;

  try {
    let data = await docClient.update(params).promise();
    mensaje = "Datos actualizados";
    estado = true;
    response = {
      account: account,
      name: data.Attributes.name,
      lastName: data.Attributes.lastName,
      dpi: data.Attributes.dpi,
      balance: data.Attributes.balance,
      email: data.Attributes.email,
      password: data.Attributes.password
    }
    //console.log(response);
  }
  catch(e) {
    mensaje = "Datos no actualizados. Revise sus datos y vuelva a intentarlo. Si el error persiste comuniquese con un soperte tecnico";
    estado = false;
    console.log(e.message);
  }

  // enviando informacion
  res.send({
    estado: estado,
    mensaje: mensaje,
    result: (response !== null)? response : null
  });
});

function queryDynamoPerfil(account, name, lastName, dpi, balance, email, passNuevo, password) {
  let params;

  if(password !== "") {
    params = {
      TableName: "Usuario",
      Key: {
        "account": account
      },
      UpdateExpression: "set #name = :n, #lastName = :ln, #dpi = :d, #balance = :b, #email = :e, #password = :p",
      ExpressionAttributeNames: {
          "#name": "name",
          "#lastName": "lastName",
          "#dpi": "dpi",
          "#balance": "balance",
          "#email": "email",
          "#password": "password"
      },
      ExpressionAttributeValues: {
        ":n": name,
        ":ln": lastName,
        ":d": dpi,
        ":b": balance,
        ":e": email,
        ":p": passNuevo,
        ":op": password
      },
      /*FilterExpression: "#password = :p",*/
      ConditionExpression: "#password = :op",
      ReturnValues:"UPDATED_NEW"
    };
  }
  else {
    params = {
      TableName: "Usuario",
      Key: {
        "account": account
      },
      UpdateExpression: "set #name = :n, #lastName = :ln, #dpi = :d, #balance = :b, #email = :e, #password = :p",
      ExpressionAttributeNames: {
          "#name": "name",
          "#lastName": "lastName",
          "#dpi": "dpi",
          "#balance": "balance",
          "#email": "email",
          "#password": "password"
      },
      ExpressionAttributeValues: {
        ":n": name,
        ":ln": lastName,
        ":d": dpi,
        ":b": balance,
        ":e": email,
        ":p": passNuevo
      },
      /*FilterExpression: "#password = :p",*/
      ReturnValues:"UPDATED_NEW"
    };
  }
  return params;
}

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
  let origen = req.body.origen;
  let destino = req.body.destino;
  let cantidad = req.body.cantidad;
  let fecha = new Date();

  let docClient = new AWS.DynamoDB.DocumentClient();
  let params = {
    TableName: 'Usuario',
    Key: {
      'account': origen
    }
  }

  docClient.get(params, (err, data) => {
    if (err) {
      console.log(err);
      res.send({resultado: false});
    }
    else {
      let primero = data.Item;

      let docClient2 = new AWS.DynamoDB.DocumentClient();
      let params = {
        TableName: 'Usuario',
        Key: {
          'account': destino
        }
      }

      docClient2.get(params, (err2, data2) => {
        if (err2) {
          console.log(err);
          res.send({resultado: false});
          return;
        }
        else {
          if (Object.keys(data2).length === 0) {
            res.send({ resultado: false });
            return;
          }
          else {
            let segundo = data2.Item;
            ddb.putItem({
              TableName: 'Transferencia',
              Item: {
                "origen": { S: origen },
                "destino": { S: destino },
                "cantidad": { S: cantidad.toString(10) },
                "fecha": { S: fecha.toString() }
              }
            }, (err3, data3) => {
              if (err3) {
                console.log(err);
                res.send({ resultado: false});
                return;
              }
              else {
                // aqui actualizamos los valores
                var params2 = {
                  TableName: 'Usuario',
                  Key: {
                    "account": origen
                  },
                  UpdateExpression: "set balance = :b",
                  ExpressionAttributeValues: {
                    ":b": parseInt(primero.balance) - cantidad
                  }
                }

                let docClient3 = new AWS.DynamoDB.DocumentClient();
                docClient3.update(params2, (err4, data4) => {
                  if (err) {
                    res.send({resultado: false});
                  }
                  else {
                    var params3 = {
                      TableName: 'Usuario',
                      Key: {
                        "account": destino
                      },
                      UpdateExpression: "set balance = :b",
                      ExpressionAttributeValues: {
                        ":b": parseInt(segundo.balance) + cantidad
                      }
                    }
                  }

                  let docClient4 = new AWS.DynamoDB.DocumentClient();
                  docClient4.update(params3, (err5, data5)=> {
                    if (err) {
                      res.send({resultado: false});
                    }
                    else {
                      res.send({resultado: true});
                    }
                  });
                });
              }
            });
          }
        }
      });
    }
  });
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
