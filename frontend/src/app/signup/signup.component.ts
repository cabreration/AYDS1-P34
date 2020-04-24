import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  alerta = '';
  account = '';
  password = '';
  name = '';
  lastName = '';
  dpi = '';
  balance = '';
  email = '';

  constructor(private rest: RestService, private router: Router) { }

  ngOnInit() {
  }

  createSignupObject(account: string, password: string, name: string,
    lastName: string, dpi: string, balance: string, email: string): any {
    return { 
      name: name,
      lastName: lastName,
      dpi: dpi,
      account: account,     
      balance: balance,
      email: email,
      password: password
    };
  }

  async signup() {
    if (this.checkFields()) {
      let obj = this.createSignupObject(this.account, this.password, this.name, this.lastName, this.dpi, this.balance, this.email);
      let response = await this.rest.PostRequest('api/userModel', obj).toPromise();
      if (response.estado) {
        this.alerta = 'Su cuenta ha sido creada';
        setTimeout(() => this.router.navigate(['']), 1500);
      }
      else {
        this.alerta = response.mensaje;
        setTimeout(() => this.alerta = '', 2000);
      }
    }
  }

  checkFields() {
    if (this.account === '') {
      this.alerta = 'Debe ingresar un numero de cuenta';
      setTimeout(() => this.alerta = '', 2000);
      return false;
    }
    else if (this.password === '') {
      this.alerta = 'Debe ingresar su contrasenia';
      setTimeout(() => this.alerta = '', 2000);
      return false;
    }
    else if (this.name === '') {
      this.alerta = 'Debe ingresar su nombre';
      setTimeout(() => this.alerta = '', 2000);
      return false;
    }
    else if (this.lastName === '') {
      this.alerta = 'Debe ingresar sus apellidos';
      setTimeout(() => this.alerta = '', 2000);
      return false;
    }
    else if (this.dpi === '') {
      this.alerta = 'Debe ingresar su dpi';
      setTimeout(() => this.alerta = '', 2000);
      return false;
    }
    else if (this.balance === '') {
      this.alerta = 'Debe ingresar el balance de su cuenta';
      setTimeout(() => this.alerta = '', 2000);
      return false;
    }
    else if (this.email === '') {
      this.alerta = 'Debe ingresar su email';
      setTimeout(() => this.alerta = '', 2000);
      return false;
    }

    return true;
  }
}
