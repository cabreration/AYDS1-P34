import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-money-transfer',
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.css']
})
export class MoneyTransferComponent implements OnInit {

  /*
  * CUANDO LA TRANSFERENCIA MONETARIA SEA EXITOSA EL MONTO ENVIADO SE DEBE RESTAR DIRECTAMENTE
  * DE LA VARIABLE DE SESION, ASI EVITAMOS HACER PETICIONES INNECESARIAS
  */
  constructor() { }

  ngOnInit() {
  }

  compararMontos(montoATransferir) {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user == null || user == undefined) {
      return false;
    }
    if (montoATransferir > user.balance) {
      return false;
    }
    else {
      return true;
    }
  }

}
