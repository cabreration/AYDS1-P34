import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
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
  noCuentaActual = 122;
  alerta = '';
  jsonUsrActual;
  cantidad = 0;
  cuentaDepositar = 0;
  user;
  constructor(private rest: RestService, private router: Router) { }

  ngOnInit() {
    this.jsonUsrActual = JSON.parse(sessionStorage.getItem('user'));
    this.noCuentaActual = this.jsonUsrActual.account;
    console.log(this.jsonUsrActual);
  }

  async compararMontos() {
    console.log("enctro en comparar montos");
    let montoATransferir = this.cantidad;
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user == null || user == undefined) {
      return false;
    }
    if (montoATransferir > user.balance) {
      console.log('monto sobrepasa fondos en cuenta');
      this.alerta = 'Fondos insuficientes';
      setTimeout(() => this.alerta = '', 2000);
      return false;
    }
    else {
      console.log("entro en debito");
      let obj = this.createTransferObject(user.account , this.cuentaDepositar,+this.cantidad);
      console.log(obj);
      let registerTransfer = await this.rest.PostRequest('money-transfer', obj).toPromise();
      if(registerTransfer.resultado){
        console.log("Transferencia realizada exitosamente");
        this.alerta = 'Transferencia realizada exitosamente';
      setTimeout(() => this.alerta = '', 2000);
      return true;
      }
      return true;
    }
  }
  createTransferObject(origen: number, destino: number, cantidad: number): any {
    return { origen: origen, destino: destino , cantidad:cantidad};
  }

}
