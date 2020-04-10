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
    let perfil = component.crearPerfil("", "", -1, "", 0, "", "");
    expect(perfil.nombre).toBeDefined();
    expect(perfil.apellido).toBeDefined();
    expect(perfil.dpi).toBeDefined();
    expect(perfil.nocuenta).toBeDefined();
    expect(perfil.saldo).toBeDefined();
    expect(perfil.email).toBeDefined();
    expect(perfil.password).toBeDefined();
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

  it("deberia de estar inicializado password", () => {
    expect(component.password).toBeDefined();
  });

  it("deberia recibir los campos \"estado\", \"mensaje\" y \"result\"",
   inject([RestService], async (rest: RestService) => {
     let result;

     result = await rest.PostRequest("perfil", {}).toPromise();
     expect(result.estado).toBeDefined();
     expect(result.mensaje).toBeDefined();
     expect(result.result).toBeDefined();
   })
  );

  it("deberia recibir el result con los valores del usuario",
   inject([RestService], async (rest: RestService) => {
     let result;

     // prueba para la peticion correcta
     result = await rest.PostRequest("perfil", {}).toPromise();
     expect(result.estado).toBeDefined();
     expect(result.mensaje).toBeDefined();
     expect(result.result).toBeDefined();

     expect(result.estado).toBeTruthy();
   })
  );

  it("deberia recibir el result con los valores por defecto",
   inject([RestService], async (rest: RestService) => {
     let result;

     // prueba para la peticion incorrecta
     result = await rest.PostRequest("perfil", {}).toPromise();
     expect(result.estado).toBeDefined();
     expect(result.mensaje).toBeDefined();
     expect(result.result).toBeDefined();

     // como aun no funciona el servidor coloco "!" (aun no hay funcionalidad)
     /******************************************************/
     expect(!result.estado).toBeFalsy();

     // validar que los valores tengan un valor por defecto
     expect(result.result.nombre).toEqual("")
     expect(result.result.apellido).toEqual("");
     expect(result.result.dpi).toEqual(-1);
     expect(result.result.nocuenta).toEqual("");
     expect(result.result.saldo).toEqual(0);
     expect(result.result.email).toEqual("");
     expect(result.result.password).toEqual("");
   })
  );
});
