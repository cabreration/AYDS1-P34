import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
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

  it('deberia crear un objeto con numero de cuenta y contrasenia', () => {
    let user = component.createLoginObject('4321', 'temp');
    expect(user.cuenta).toBeDefined();
    expect(user.contrasenia).toBeDefined();
  });

  
});
