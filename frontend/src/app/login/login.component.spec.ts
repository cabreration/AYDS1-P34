import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RestService } from '../rest.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [ RestService ],
      imports: [ HttpClientModule, FormsModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('no debe existir una sesion iniciada', () => {
    expect(sessionStorage.getItem('usuario')).toEqual(null);
  })

  it('deberia crear un objeto con los campos "cuenta" y "contrasenia"', () => {
    // primer test
    let user = component.createLoginObject('4321', 'temp');
    expect(user.account).toBeDefined();
    expect(user.password).toBeDefined();

    //segundo test
    user = component.createLoginObject('', '');
    expect(user.account).toBeDefined();
    expect(user.password).toBeDefined();

    //tercer test
    user = component.createLoginObject(null, null);
    expect(user.account).toBeDefined();
    expect(user.password).toBeDefined();
  });

  it('deberia recibir del servidor un objeto con las campos "estado" y "mensaje"',
   inject([RestService], async (rest: RestService) => {
    let result;

    // primer test
    let user = component.createLoginObject('test', 'test');
    result = await rest.PostRequest('login', user).toPromise();
    expect(result.estado).toBeDefined();
    expect(result.mensaje).toBeDefined();
   })
  );
});
