import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { RestService } from '../rest.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [ HttpClientModule, FormsModule, RouterTestingModule ],
      providers: [ RestService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('no debe existir una sesion iniciada', () => {
    expect(sessionStorage.getItem('usuario')).toEqual(null);
  })

  it('deberia crear un objeto con los campos "cuenta", "contrasenia", "nombre", "apellidos", "dpi", "saldo" y "correo"', () => {
    // primer test
    let user = component.createSignupObject('4321', 'temp', 'temp', 'temp', '1235', 0, 'temp');
    expect(user.name).toBeDefined();
    expect(user.lastName).toBeDefined();
    expect(user.dpi).toBeDefined();
    expect(user.account).toBeDefined();
    expect(user.balance).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.password).toBeDefined();

    //segundo test
    user = component.createSignupObject('', '', '', '', '', 0, '');
    expect(user.name).toBeDefined();
    expect(user.lastName).toBeDefined();
    expect(user.dpi).toBeDefined();
    expect(user.account).toBeDefined();
    expect(user.balance).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.password).toBeDefined();

    //tercer test
    user = component.createSignupObject(null, null, null, null, null, 0, null);
    expect(user.name).toBeDefined();
    expect(user.lastName).toBeDefined();
    expect(user.dpi).toBeDefined();
    expect(user.account).toBeDefined();
    expect(user.balance).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.password).toBeDefined();
  });

  it('deberia recibir del servidor un objeto con las campos "estado" y "mensaje"',
   inject([RestService], async (rest: RestService) => {
    let result;

    // primer test
    let user = component.createSignupObject('test', 'test', 'test', 'test', 'test', 0, 'test')
    result = await rest.PostRequest('signup', user).toPromise();
    expect(result.estado).toBeDefined();
    expect(result.mensaje).toBeDefined();
   })
  );
  
});
