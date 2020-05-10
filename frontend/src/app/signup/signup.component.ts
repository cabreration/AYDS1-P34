import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
//********************COMENTARIO 1 */
  alerta = '';
  mensaje = '';
  account = '';
  password = '';
  name = '';
  lastName = '';
  dpi = '';
  balance: number = 0;
  email = '';
//********************COMENTARIO 2 */
  constructor(private rest: RestService, private router: Router) { }

  ngOnInit() {
  }
//********************COMENTARIO 3 */
  createSignupObject(account: string, password: string, name: string,
    lastName: string, dpi: string, balance: number, email: string): any {
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
//********************COMENTARIO 4 */
  async signup() {
    if (this.checkFields()) {
      let obj = this.createSignupObject(this.account, this.password, this.name, this.lastName, this.dpi, this.balance, this.email);
      let response = await this.rest.PostRequest('signup', obj).toPromise();
      console.log(response);
      if (response.estado) {
        this.mensaje = 'Su cuenta ha sido creada';
        setTimeout(() => this.router.navigate(['']), 2000);
      }
      else {
        this.alerta = response.mensaje;
        setTimeout(() => this.alerta = '', 2000);
      }
    }
  }
//********************COMENTARIO 5 */
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
    }//********************COMENTARIO 6
    else if (this.lastName === '') {
      this.alerta = 'Debe ingresar sus apellidos';
      setTimeout(() => this.alerta = '', 2000);
      return false;
    }
    else if (this.dpi === '') {
      this.alerta = 'Debe ingresar su dpi';
      setTimeout(() => this.alerta = '', 2000);
      return false;
    }//********************COMENTARIO 7
    else if (this.email === '') {
      this.alerta = 'Debe ingresar su email';
      setTimeout(() => this.alerta = '', 2000);
      return false;
    }

    return true;
  }
}
//********************COMENTARIO 8 */
//********************COMENTARIO 9 */
//********************COMENTARIO 10 */
//********************COMENTARIO 11 */
//********************COMENTARIO 12 */
//********************COMENTARIO 13 */
//********************COMENTARIO 14 */
//********************COMENTARIO 15 */

