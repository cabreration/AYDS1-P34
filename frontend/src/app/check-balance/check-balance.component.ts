import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

const REQUEST_ADDRESS = 'check-balance'

@Component({
  selector: 'app-check-balance',
  templateUrl: './check-balance.component.html',
  styleUrls: ['./check-balance.component.css']
})
export class CheckBalanceComponent implements OnInit {
  constructor(private rest: RestService) { }
  idUser = '1';
  saldo = 0;
  ngOnInit() {
  }

  checkBalance() {
    var balanceRequest ={
      cuenta:this.idUser
    }
    let observer = this.rest.PostRequest(REQUEST_ADDRESS, balanceRequest).subscribe( res => {
      console.log(res);
      this.saldo = res.saldo;

      observer.unsubscribe();
    });
  }

}
