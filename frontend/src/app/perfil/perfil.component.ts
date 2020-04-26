import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  // variable de sesion
  usuario: any;

  // datos de usuario
  nombre: string;
  apellido: string;
  dpi: string;
  nocuenta: string;
  saldo: number;
  email: string;

  // password para validar cambio de password
  password: string;

  // nuevo password
  passwordNuevo: string;
  passwordConfirmar: string;

  // mensaje y alertta
  mensaje: string;
  alerta: string;

  constructor(private rest: RestService) {
    this.usuario = null;

    this.nombre = "";
    this.apellido = "";
    this.dpi = "0";
    this.nocuenta = "";
    this.saldo = 0;
    this.email = "";

    this.password = "";
    this.passwordNuevo = "";
    this.passwordConfirmar = "";

    this.mensaje = "";
    this.alerta = "";

    // cargar datos de sesion
    this.cargarUsuario();
  }

  ngOnInit() {
  }

  cargarUsuario() {
    // obtener el usuario
    let user = sessionStorage.getItem("user");

    if(user === null) return;

    // obtener el usuario json
    let usuario = JSON.parse(user);

    // asignar datos de sesion
    this.usuario = usuario;

    // crearPerfil
    let perfil = this.crearPerfil(
        usuario.name,
        usuario.lastName,
        usuario.dpi,
        usuario.account,
        usuario.balance,
        usuario.email);

   console.log(perfil);

    this.nombre = perfil.nombre;
    this.apellido = perfil.apellido;
    this.dpi = perfil.dpi;
    this.nocuenta = perfil.nocuenta;
    this.saldo = perfil.saldo;
    this.email = perfil.email;
  }

  crearPerfil(name, lastName, dpi, account, balance, email) {
    let nombre = (name === null)? "test": name;
    let apellido = (lastName === null)? "test": lastName;
    let ddpi = (dpi === null)? "0": dpi;
    let nocuenta = (account === null)? "-0000001": account;
    let saldo = (balance === null)? 0: balance;
    let eemail = (email === null)? "test@gami.com": email;

    return {
      nombre: nombre,
      apellido: apellido,
      dpi: ddpi,
      nocuenta: nocuenta,
      saldo: saldo,
      email: eemail
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

    if(this.nombre === "") {
      this.alerta = "Deberia ingresar su nombre";
      setTimeout(() => this.alerta = "", 2000);
      return false;
    }

    if(this.apellido === "") {
      this.alerta = "Deberia ingresar su apellido";
      setTimeout(() => this.alerta = "", 2000);
      return false;
    }

    if(this.dpi === "") {
      this.alerta = "Deberia ingresar su dpi";
      setTimeout(() => this.alerta = "", 2000);
      return false;
    }

    if(this.email === "") {
      this.alerta = "Deberia ingresar su email";
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
      setTimeout(() => this.mensaje = "", 3000);
    }
    else {
      this.alerta = res.mensaje;
      setTimeout(() => this.alerta = "", 3000);
    }
  }
}
