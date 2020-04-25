import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { RestService } from '../rest.service';
import { HttpClientModule } from '@angular/common/http';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [ HttpClientModule ],
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
    let user = component.createSignupObject('4321', 'temp', 'temp', 'temp', '1235', '', 'temp');
    expect(user.cuenta).toBeDefined();
    expect(user.contrasenia).toBeDefined();
    expect(user.nombre).toBeDefined();
    expect(user.apellidos).toBeDefined();
    expect(user.dpi).toBeDefined();
    expect(user.saldo).toBeDefined();
    expect(user.correo).toBeDefined();

    //segundo test
    user = component.createSignupObject('', '', '', '', '', '', '');
    expect(user.cuenta).toBeDefined();
    expect(user.contrasenia).toBeDefined();
    expect(user.nombre).toBeDefined();
    expect(user.apellidos).toBeDefined();
    expect(user.dpi).toBeDefined();
    expect(user.saldo).toBeDefined();
    expect(user.correo).toBeDefined();

    //tercer test
    user = component.createSignupObject(null, null, null, null, null, '', null);
    expect(user.cuenta).toBeDefined();
    expect(user.contrasenia).toBeDefined();
    expect(user.nombre).toBeDefined();
    expect(user.apellidos).toBeDefined();
    expect(user.dpi).toBeDefined();
    expect(user.saldo).toBeDefined();
    expect(user.correo).toBeDefined();
  });

  it('deberia recibir del servidor un objeto con las campos "estado" y "mensaje"',
   inject([RestService], async (rest: RestService) => {
    let result;

    // primer test
    result = await rest.PostRequest('signup', { cuenta: '', contrasenia: '' }).toPromise();
    expect(result.estado).toBeDefined();
    expect(result.mensaje).toBeDefined();

    //segundo test
    result = await rest.PostRequest('signup', { cuenta: '4321', contrasenia: 'test' }).toPromise();
    expect(result.estado).toBeDefined();
    expect(result.mensaje).toBeDefined();

    //tercer test
    result = await rest.PostRequest('signup', { cuenta: null, contrasenia: null }).toPromise();
    expect(result.estado).toBeDefined();
    expect(result.mensaje).toBeDefined();
   })
  );
});
