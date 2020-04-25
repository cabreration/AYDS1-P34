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
  constructor(private rest: RestService, private router: Router) { }

  ngOnInit() {
    this.jsonUsrActual = JSON.parse(sessionStorage.getItem('user'));
  }

  async compararMontos(montoATransferir) {
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
      let obj = this.createTransferObject(user.balance , this.cuentaDepositar,this.cantidad);
      let registerTransfer = await this.rest.PostRequest('money-transfer', obj).toPromise();
      if(registerTransfer){
        console.log("Transferencia realizada exitosamente");
        this.alerta = 'Transferencia realizada exitosamente';
      setTimeout(() => this.alerta = '', 2000);
      return true;
      }
      return true;
    }
    /**
     *  let origen = req.body.origen;
  let destino = req.body.destino;
  let cantidad = req.body.cantidad;
  let fecha = new Date();
     */
  }
  createTransferObject(origen: number, destino: number, cantidad: number): any {
    return { origen: origen, destino: destino , cantidad:cantidad};
  }

}
