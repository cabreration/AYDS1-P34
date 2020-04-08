import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cuenta = '';
  contrasenia = '';

  constructor() { }

  ngOnInit() {
  }

  createLoginObject(account: string, password: string): any {
    return { cuenta: '', contrasenia: ''};
  }

  login() {}

}
