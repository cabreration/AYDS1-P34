import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

let pageName = "http://www.banguat.gob.gt/variables/ws/TipoCambio.asmx";
let contentType = "text/xml;charset=UTF-8;text/html, application/xhtml+xml, */*";
let bodySoap = "\"http://www.banguat.gob.gt/variables/ws/TipoCambioDia\"";

@Component({
  selector: 'app-tipocambio',
  templateUrl: './tipocambio.component.html',
  styleUrls: ['./tipocambio.component.css']
})

export class TipocambioComponent implements OnInit {

  valor: number;
  valores: any;

  constructor(private httpClient: HttpClient) {
    this.valor = 0;
    this.valores = [0];

    this.requestTipoCambioDia();
  }

  ngOnInit() {
  }

  requestTipoCambioDia() {
    /*let xmlRequest = "<?xml version=\"1.0\" encoding=\"utf-8\"?>"+
      "<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"" +
      "               xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"" +
      "               xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
      "  <soap:Body>" +
      "     <TipoCambioDia xmlns=\"http://www.banguat.gob.gt/variables/ws/\" />" +
      "  </soap:Body>" +
      "</soap:Envelope>";

      let httpOptions = {
        headers: new HttpHeaders({
          "Host": "www.banguat.gob.gt",
          "Content-Type": contentType,
          "Content-Length": "",
          "SOAPAction": bodySoap,
          "Access-Control-Allow-Origin": "*"
        })
      };*/

      /*let httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": contentType,
          "SOAPAction": bodySoap
        })
      };

      this.PostRequest(xmlRequest, httpOptions).subscribe(res => {
        console.log("en post request");
      });*/
  }



  PostRequest(info, httpOptions) {
    console.log(pageName);
    return this.httpClient.post<any>(pageName, info, httpOptions);
  }

  crearTipoCambio(valor: number, valores: any) {
    this.valor = valor;
    this.valores = valores;
    return { valor: valor, valores: valores };
  }
}
