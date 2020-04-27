import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { PerfilComponent } from './perfil.component';
import { RestService } from "../rest.service";
import { HttpClientModule } from "@angular/common/http";

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilComponent ],
      providers: [ RestService ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("deberia crear un objeto perfil", () => {
    let perfil = component.crearPerfil("", "", 0, "", 0, "");
    expect(perfil.nombre).toBeDefined();
    expect(perfil.apellido).toBeDefined();
    expect(perfil.dpi).toBeDefined();
    expect(perfil.nocuenta).toBeDefined();
    expect(perfil.saldo).toBeDefined();
    expect(perfil.email).toBeDefined();

    perfil = component.crearPerfil(null, null, null, null, null, null);
    expect(perfil.nombre).toBeDefined();
    expect(perfil.apellido).toBeDefined();
    expect(perfil.dpi).toBeDefined();
    expect(perfil.nocuenta).toBeDefined();
    expect(perfil.saldo).toBeDefined();
    expect(perfil.email).toBeDefined();
  });

  it("deberia de estar con valor null usuario", () => {
    expect(component.usuario).toBeNull();
  });

  it("deberia de estar inicializado nombre", () => {
    expect(component.nombre).toBeDefined();
  });

  it("deberia de estar inicializado apellido", () => {
    expect(component.apellido).toBeDefined();
  });

  it("deberia de estar inicializado dpi", () => {
    expect(component.dpi).toBeDefined();
  });

  it("deberia de estar inicializado nocuenta", () => {
    expect(component.nocuenta).toBeDefined();
  });

  it("deberia de estar inicializado saldo", () => {
    expect(component.saldo).toBeDefined();
  });

  it("deberia de estar inicializado email", () => {
    expect(component.email).toBeDefined();
  });

  it("deberia de estar inicializado mensaje", () => {
    expect(component.mensaje).toBeDefined();
  });

  it("deberia de estar inicializado alerta", () => {
    expect(component.alerta).toBeDefined();
  });

  it("deberia de cambiar el email", () => {
    component.changeEmail("test@gmail.com");
    expect(component.email).toEqual("test@gmail.com");
  });

  it("deberia de cambiar el nombre", () => {
    component.changeNombre("test");
    expect(component.nombre).toEqual("test");
  });

  it("deberia de cambiar el apellido", () => {
    component.changeApellido("test");
    expect(component.apellido).toEqual("test");
  });

  it("deberia de cambiar el dpi", () => {
    component.changeDpi("0000");
    expect(component.dpi).toEqual("0000");
  });

  it("deberia de cambiar el password", () => {
    component.changePassword("test@gmail.com");
    expect(component.password).toEqual("test@gmail.com");
  });

  it("deberia de cambiar el passwordNuevo", () => {
    component.changePasswordNuevo("test@gmail.com");
    expect(component.passwordNuevo).toEqual("test@gmail.com");
  });

  it("deberia de cambiar el passwordConfirmar", () => {
    component.changePasswordConfirmar("test@gmail.com");
    expect(component.passwordConfirmar).toEqual("test@gmail.com");
  });

  it("deberia recibir los campos \"estado\", \"mensaje\" y \"result\"",
   inject([RestService], async (rest: RestService) => {
     const info = {
       account: "000000",
       name: "test",
       lastName: "test",
       dpi: "0",
       balance: "0",
       email: "test@gmail.com",
       password: "",
       passwordNew: "",
       passwordSesion: "test123"
     }

     let result;

     result = await rest.PostRequest("perfil", info).toPromise();
     expect(result.estado).toBeDefined();
     expect(result.mensaje).toBeDefined();

     if(result.result === null) {
       expect(result.result).toBeNull();
     }
     else {
       expect(result.result).toBeDefined();
     }
   })
 );

 it("deberia de retornar false", () => {
   let result = component.checkFields();
   expect(result).toBeFalsy();
 });

 it("deberia retornar true", () => {
   component.nombre = "test";
   component.apellido = "test";
   component.dpi = "0";
   component.email = "test@gmail.com";
   let result = component.checkFields();
   expect(result).toBeTruthy();
 });
});
