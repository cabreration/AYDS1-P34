import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cuenta = '';
  contrasenia = '';

  constructor(private rest: RestService) { }

  ngOnInit() {
  }

  createLoginObject(account: string, password: string): any {}

  login() {
    let user = this.createLoginObject(this.cuenta, this.contrasenia);
    let observer = this.rest.PostRequest('/login', user).subscribe(res => {
      
    });
  }

}
