import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

const REQUEST_ADDRESS = 'api/userModel/check-balance'

@Component({
  selector: 'app-check-balance',
  templateUrl: './check-balance.component.html',
  styleUrls: ['./check-balance.component.css']
})
export class CheckBalanceComponent implements OnInit {
  idUser = '8434';
  saldo = 0;
  constructor(private rest: RestService) {
    
  }
  ngOnInit() {
    var user = JSON.parse(sessionStorage.getItem('user'));
    this.saldo = user.balance;
  }
  /*
  checkBalance() {
    var balanceRequest ={
      cuenta:this.idUser
    }
    let observer = this.rest.PostRequest(REQUEST_ADDRESS, balanceRequest).subscribe( res => {
      //console.log(res);
      this.saldo = res.saldoInicial;

      observer.unsubscribe();
    });
  }*/

}
