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

  it("deberia de crear un objeto perfil con valores por defecto", () => {
    let obj = component.crearPerfil(null, null, null, null, null, null);
    expect(obj).toBeDefined();
  });

  it("deberia de crear un objeto perfil con valores reales", () => {
    let obj = component.crearPerfil("test", "test", "0", "201325583", "0", "");
    expect(obj).toBeDefined();
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

 it("deberia retornar true checkFields", () => {
   component.nombre = "test";
   component.apellido = "test";
   component.dpi = "0";
   component.email = "test@gmail.com";
   let result = component.checkFields();
   expect(result).toBeTruthy();
 });
});
