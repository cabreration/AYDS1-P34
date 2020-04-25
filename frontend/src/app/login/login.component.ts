import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cuenta = '';
  contrasenia = '';
  alerta = '';

  constructor(private rest: RestService, private router: Router) { }

  ngOnInit() {
  }

  createLoginObject(account: string, password: string): any {
    return { account: '', password: '' };
  }

  async login() {
    if (this.checkFields()) {
      let obj = this.createLoginObject(this.cuenta, this.contrasenia);
      let acceso = await this.rest.PostRequest('api/userModel/login/', obj).toPromise();
      if (acceso.estado) {
        this.router.navigate(['perfil']);
      }
      else {
        this.alerta = acceso.mensaje;
        setTimeout(() => this.alerta = '', 2000);
      }
    }
  }

  checkFields() {
    if (this.cuenta === '') {
      this.alerta = 'Debe ingresar un numero de cuenta';
      setTimeout(() => this.alerta = '', 2000);
      return false;
    }
    else if (this.contrasenia === '') {
      this.alerta = 'Debe ingresar su contrasenia';
      setTimeout(() => this.alerta = '', 2000);
      return false;
    }

    return true;
  }
}
