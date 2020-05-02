import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  @ViewChild ('content', {static: false}) content: ElementRef;

  noCuentaActual = 122;
  alerta = '';
  alertaVacia='';  
  jsonUsrActual;
  TotalTransacciones=[];
  tipo=false;
  constructor(private rest: RestService, private router: Router) { }

  ngOnInit() {
    this.jsonUsrActual = JSON.parse(sessionStorage.getItem('user'));
    if (this.jsonUsrActual === null || this.jsonUsrActual === undefined) {
      this.noCuentaActual = -1;
    }
    else {
      this.noCuentaActual = this.jsonUsrActual.account;
    }
    console.log(this.jsonUsrActual);

  }
  generarGeneral(tipo){
    this.TotalTransacciones=[];
    this.tipo=tipo;
    this.generarReporte(tipo);
  }
  async generarReporte(tipoR){
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user == null || user == undefined) {
      return false;
    }
    else {
      //let obj = this.crearObjTrans(user.account , this.cuentaDepositar,this.cantidad, );
      console.log(this.noCuentaActual);
      let reporte = await this.rest.PostRequest('reporte', {noCuenta:this.noCuentaActual, tipo:tipoR}).toPromise();
      if(reporte.resultado){
      setTimeout(() => this.alerta = '', 2000);
      console.log(reporte.resultado);      
      }
      for (let index = 0; index < reporte.resultado.length; index++) {
        let item= reporte.resultado[index];
        if(tipoR===true){          
          this.TotalTransacciones.push(item);
        }
        else{
          if(item.origen===this.noCuentaActual){
            this.TotalTransacciones.push(item);
          }
        }        
      }
      this.alerta = 'Generando reporte';
      setTimeout(() => this.alerta = '', 2000);         
    }
  }

  descargarPDF(){
    if(this.TotalTransacciones.length===0){
      this.alertaVacia = 'Debe seleccionar un tipo de reporte';      
      setTimeout(() => this.alertaVacia = '', 2000);
      return;
    }
    let doc = new jsPDF();
    let elemento={
      '#editor': function(element,renderer){
        return true;
      }
    };
    let content= this.content.nativeElement;
    doc.fromHTML(content.innerHTML,15,15,{
      'width':190,
      'elementHandlers':elemento
    });
    this.alerta = 'Descargando reporte';
    setTimeout(() => this.alerta = '', 2000);
    doc.save('reporte.pdf');
  }



}
