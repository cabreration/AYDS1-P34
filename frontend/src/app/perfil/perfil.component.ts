import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  nombre: string;
  apellido: string;
  dpi: number;
  nocuenta: string;
  saldo: number;
  email: string;
  password: string;

  passwordNuevo: string;
  passwordConfirmar: string;

  constructor() {
    this.nombre = "";
    this.apellido = "";
    this.dpi = -1;
    this.nocuenta = "";
    this.saldo = 0;
    this.email = "";
    this.password = "";
    this.passwordNuevo = "";
    this.passwordConfirmar = "";
  }

  ngOnInit() {
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

  eventActualizar() {
    /*enviar al servidor*/
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

}
