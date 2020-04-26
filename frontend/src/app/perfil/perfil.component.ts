import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: any;
  nombre: string;
  apellido: string;
  dpi: number;
  nocuenta: string;
  saldo: number;
  email: string;
  password: string;

  passwordNuevo: string;
  passwordConfirmar: string;

  mensaje: string;
  alerta: string;

  constructor(private rest: RestService) {
    this.nombre = "";
    this.apellido = "";
    this.dpi = -1;
    this.nocuenta = "";
    this.saldo = 0;
    this.email = "";
    this.password = "";
    this.passwordNuevo = "";
    this.passwordConfirmar = "";
    this.mensaje = "";
    this.alerta = "";

    this.cargarUsuario();
  }

  ngOnInit() {
  }

  cargarUsuario() {
    let user = sessionStorage.getItem("user");
    let usuario = JSON.parse(user);
    //console.log(usuario);

    this.usuario = usuario;

    this.nombre = usuario.name;
    this.apellido = usuario.lastName;
    this.dpi = usuario.dpi;
    this.nocuenta = usuario.account;
    this.saldo = usuario.balance;
    this.email = usuario.email;
  }

  crearPerfil(nombre: string, apellido: string, dpi: number, nocuenta: string, saldo: number, email: string, password: string) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dpi = dpi;
    this.nocuenta = nocuenta;
    this.saldo = saldo;
    this.email = email;
    this.password = password;

    return {
      nombre: nombre,
      apellido: apellido,
      dpi: dpi,
      nocuenta: nocuenta,
      saldo: saldo,
      email: email,
      password: password
    };
  }

  changeEmail(email) {
    this.email = email;
  }

  changeNombre(nombre) {
    this.nombre = nombre;
  }

  changeApellido(apellido) {
    this.apellido = apellido;
  }

  changeDpi(dpi) {
    this.dpi = dpi;
  }

  changePassword(password) {
    this.password = password;
  }

  changePasswordNuevo(password) {
    this.passwordNuevo = password;
  }

  changePasswordConfirmar(password) {
    this.passwordConfirmar = password;
  }

  checkFields() {
    if(this.password === "" && (this.passwordNuevo !== "" || this.passwordConfirmar !== "")) {
      this.alerta = "Debe de ingresar su password";
      setTimeout(() => this.alerta = '', 2000);
      return false;
    }

    if(this.password !== "" && (this.passwordNuevo === "" && this.passwordConfirmar === "")) {
      this.alerta = "Debe de ingresar su nuevo password";
      setTimeout(() => this.alerta = "", 2000);
      return false;
    }

    if(this.passwordNuevo === "" && this.passwordConfirmar === "") {
      //no modificar password
      return true;
    }

    if(this.passwordNuevo !== this.passwordConfirmar) {
      this.alerta = "Su password no coincide";
      setTimeout(() => this.alerta = "", 2000);
      return false;
    }
    return true;
  }

  async eventActualizar() {
    /*checkear campos*/
    if(!this.checkFields()) return;

    /*construir info*/
    const info = {
      account: this.nocuenta,
      name: this.nombre,
      lastName: this.apellido,
      dpi: this.dpi,
      balance: this.saldo,
      email: this.email,
      password: this.password,
      passwordNew: this.passwordNuevo,
      passwordSesion: this.usuario.password
    }

    /* realizar peticion */
    //console.log(this.usuario);
    let res = await this.rest.PostRequest("perfil", info).toPromise();

    if(res.estado) {

      if(res.result !== null) {
        // restaurar sesion
        sessionStorage.setItem('user', JSON.stringify(res.result));

        // recuperar los demas datos
        this.cargarUsuario();
      }

      this.mensaje = res.mensaje;
      setTimeout(() => this.mensaje = "", 2000);
    }
    else {
      this.alerta = res.mensaje;
      setTimeout(() => this.alerta = "", 2000);
    }
  }
}
