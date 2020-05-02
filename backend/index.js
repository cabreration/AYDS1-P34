'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const soapRequest = require('easy-soap-request');
const xml2js = require('xml2js');

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
  //console.log(passNuevo);

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
    console.log(mensaje);
  }
  catch(e) {
    mensaje = "Datos no actualizados. Revise sus datos y vuelva a intentarlo. Si el error persiste comuniquese con un soperte tecnico";
    estado = false;
    console.log(e.message);
    console.log(mensaje);
  }

  // enviando informacion
  res.send({
    estado: estado,
    mensaje: mensaje,
    result: (response !== null)? response : null
  });
});

app.get("/cambiodia", async (req, res) => {
  let xml =
    '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<soap:Body>' +
        '<TipoCambioDia xmlns="http://www.banguat.gob.gt/variables/ws/" />' +
      '</soap:Body>' +
    '</soap:Envelope>';
  let sizexml = xml.length;

  const url = 'http://www.banguat.gob.gt/variables/ws/TipoCambio.asmx';
  const sampleHeaders = {
    'Content-Type': 'text/xml; charset=utf-8',
    'SOAPAction': 'http://www.banguat.gob.gt/variables/ws/TipoCambioDia',
    'Content-Length': sizexml
  };

  //console.log(sampleHeaders);
  //console.log(xml);

  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml });
  const { headers, body, statusCode } = response;
  //console.log(headers);
  //console.log(body);
  //console.log(statusCode);
  xml2js.parseString(body, (err, result) => {
    if(err) {
      console.log(err);
      res.send({ estado: false, mensaje: "Upps. Algo salio mal para tener el tipo de cambio dia", result: ""});
    }
    else {
      console.log("ok cambiodia");
      res.send({ estado: true, mensaje: "", result: result['soap:Envelope']['soap:Body'][0].TipoCambioDiaResponse[0].TipoCambioDiaResult[0].CambioDolar[0].VarDolar[0]});
    }
  });
});

app.post("/cambiofecha", async (req, res) => {
  const { fecha } = req.body;
  // 20/03/2020
  
  let xml =
    '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<soap:Body>' +
        '<TipoCambioFechaInicial xmlns="http://www.banguat.gob.gt/variables/ws/">' +
          '<fechainit>' + fecha + '</fechainit>' +
        '</TipoCambioFechaInicial>' +
      '</soap:Body>' +
    '</soap:Envelope>';
  let sizexml = xml.length;

  const url = 'http://www.banguat.gob.gt/variables/ws/TipoCambio.asmx';
  const sampleHeaders = {
    'Content-Type': 'text/xml; charset=utf-8',
    'SOAPAction': 'http://www.banguat.gob.gt/variables/ws/TipoCambioFechaInicial',
    'Content-Length': sizexml
  };

  //console.log(sampleHeaders);
  //console.log(xml);

  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml });
  const { headers, body, statusCode } = response;
  //console.log(headers);
  //console.log(body);
  //console.log(statusCode);
  xml2js.parseString(body, (err, result) => {
    if(err) {
      console.log(err);
      res.send({ estado: false, mensaje: "Upps. Algo salio mal para tener el tipo de cambio dia", result: ""});
    }
    else {
      console.log("ok cambiofecha");
      res.send({ estado: true, mensaje: "", result: result['soap:Envelope']['soap:Body'][0].TipoCambioFechaInicialResponse[0].TipoCambioFechaInicialResult[0].Vars[0].Var});
    }
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


app.post("/reporte", async (req, res)=>{
  let origen = req.body.noCuenta;
  let tipo= req.body.tipo;
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
      let docClient = new AWS.DynamoDB.DocumentClient();
      var params = {
        TableName: 'Transferencia', // give it your table name          
      };
    docClient.scan(params,(err,data)=>{
      if (err) {
          console.log(err);
          res.send({resultado: err});
      }
      else{
        res.send({resultado: data.Items});
        console.log(data.Items);
      }
    });
    }
  });
});

