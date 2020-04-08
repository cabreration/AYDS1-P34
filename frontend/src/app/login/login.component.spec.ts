import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RestService } from '../rest.service';
import { HttpClientModule } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [ RestService ],
      imports: [ HttpClientModule ]
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
    expect(user.cuenta).toBeDefined();
    expect(user.contrasenia).toBeDefined();

    //segundo test
    user = component.createLoginObject('', '');
    expect(user.cuenta).toBeDefined();
    expect(user.contrasenia).toBeDefined();

    //tercer test
    user = component.createLoginObject(null, null);
    expect(user.cuenta).toBeDefined();
    expect(user.contrasenia).toBeDefined();
  });

  it('deberia recibir del servidor un objeto con las campos "estado" y "mensaje"',
   inject([RestService], async (rest: RestService) => {
    let result;

    // primer test
    result = await rest.PostRequest('login', { cuenta: '', contrasenia: '' }).toPromise();
    expect(result.estado).toBeDefined();
    expect(result.mensaje).toBeDefined();

    //segundo test
    result = await rest.PostRequest('login', { cuenta: '4321', contrasenia: 'test' }).toPromise();
    expect(result.estado).toBeDefined();
    expect(result.mensaje).toBeDefined();

    //tercer test
    result = await rest.PostRequest('login', { cuenta: null, contrasenia: null }).toPromise();
    expect(result.estado).toBeDefined();
    expect(result.mensaje).toBeDefined();
   })
  );
});
