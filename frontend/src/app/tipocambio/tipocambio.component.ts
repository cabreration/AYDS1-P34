import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipocambio',
  templateUrl: './tipocambio.component.html',
  styleUrls: ['./tipocambio.component.css']
})
export class TipocambioComponent implements OnInit {

  valor: number;
  valores: any;

  constructor() {
    this.valor = 0;
    this.valores = [0];
  }

  ngOnInit() {
  }

  crearTipoCambio(valor: number, valores: any) {
    this.valor = valor;
    this.valores = valores;
    return { valor: valor, valores: valores };
  }
}
