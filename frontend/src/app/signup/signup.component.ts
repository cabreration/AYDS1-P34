import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  createSignupObject(account: string, password: string, name: string,
    lastName: string, dpi: string, balance: number, email: string): any {
    return { cuenta: '',
    contrasenia: '',
    nombre: '',
    apellidos: '',
    dpi: '',
    saldo: 0,
    correo: '',
    };
  }

}
