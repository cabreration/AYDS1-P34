import { Component, OnInit } from '@angular/core';
import { RestService } from "../rest.service";

@Component({
  selector: 'app-tipocambio',
  templateUrl: './tipocambio.component.html',
  styleUrls: ['./tipocambio.component.css']
})

export class TipocambioComponent implements OnInit {

  tipoCambioDia: any;
  tipoCambioFechaInicial: any;
  fechaInicial: string;

  constructor(private rest: RestService) {
    this.tipoCambioDia = this.crearTipoCambioDia(null, null);
    this.tipoCambioFechaInicial = this.crearTipoCambioFechaInicial(null);
    this.fechaInicial =  this.getDateNow();
  }

  ngOnInit() {
  }

  getDateNow() {
    let nFecha = new Date();
    return this.changeFormatUS(nFecha.toLocaleDateString());
  }

  changeFechaIncial(fecha) {
    this.fechaInicial = fecha;
  }

  // crea un objeto de tipoCambioDia
  crearTipoCambioDia(fecha, valor) {
    let fechaSistema = new Date();
    let date = (fecha !== null)? this.changeFormatUS(fecha): this.changeFormatUS(fechaSistema.toLocaleDateString());
    let value = (valor !== null)? valor: "0";
    return { fecha: date, valor: value };
  }

  changeFormatUS(fecha) {
    let arr = fecha.split('/');

    let day = parseInt(arr[0]);
    let month = parseInt(arr[1]);
    let year = parseInt(arr[2]);

    let nFecha = year + "-" + ((month < 10)? "0"+month: month) + "-" + ((day < 10)? "0"+day: day);
    return nFecha;
  }

  changeFormatES(fecha: string) {
    let arr = fecha.split('-');

    let day = parseInt(arr[2]);
    let month = parseInt(arr[1]);
    let year = parseInt(arr[0]);

    let nFecha = ((day < 10)? "0"+day: day) + "/" + ((month < 10)? "0"+month: month) + "/" + year;
    return nFecha;
  }

  // crea una lista de TipoCambioFechaInicial
  crearTipoCambioFechaInicial(arreglo) {
    let arr = (arreglo !== null)? arreglo: [];
    return arr;
  }

  // peticion get para tipo de cambio dia
  async getTipoCambioDia() {
    // peticion get
    let res = await this.rest.GetRequest("cambiodia").toPromise();

    // si se consigue datos
    if(res.estado) {
      // obtener el resultado
      let varDolar = res.result;

      // modificar el tipo cambio dia
      this.tipoCambioDia = this.crearTipoCambioDia(varDolar.fecha[0], varDolar.referencia[0]);
    }
    else
    {
      this.tipoCambioDia = this.crearTipoCambioDia(null, null);
    }
  }

  // peticion get para tipo de cambio fecha inicial
  async getTipoCambioFechaInicial() {
    // peticion get
    const info = {
      fecha: this.changeFormatES(this.fechaInicial)
    }

    let res = await this.rest.PostRequest("cambiofecha", info).toPromise();

    if(res.estado) {
      let vars = res.result;
      this.tipoCambioFechaInicial = this.crearTipoCambioFechaInicial(vars);
    }
    else {
      this.tipoCambioFechaInicial = this.crearTipoCambioFechaInicial(null);
    }
  }
}
