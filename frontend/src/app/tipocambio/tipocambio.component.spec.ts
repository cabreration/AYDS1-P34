import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { TipocambioComponent } from './tipocambio.component';
import { RestService } from "../rest.service";
import { HttpClientModule } from "@angular/common/http";

describe('TipocambioComponent', () => {
  let component: TipocambioComponent;
  let fixture: ComponentFixture<TipocambioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipocambioComponent ],
      providers: [ RestService ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipocambioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("deberia de estar inicializado tipoCambioDia", () => {
    expect(component.tipoCambioDia).toBeDefined();
  });

  it("deberia de estar inicializado tipoCambioFechaInicial", () => {
    expect(component.tipoCambioFechaInicial).toBeDefined();
  });

  it("deberia de estar inicializado fechaInicial", () => {
    expect(component.fechaInicial).toBeDefined();
  });

  it("deberia de retornar la fecha de hoy", () => {
    expect(component.getDateNow()).toBeDefined();
  });

  it("deberia de cambiar la fechaInicial", () => {
    component.changeFechaIncial("10/10/2020");
    expect(component.fechaInicial).toEqual("10/10/2020");
  });

  it("deberia de crear un objeto tipoCambioDia", () => {
    let obj = component.crearTipoCambioDia(null, null);
    expect(obj).toBeDefined();
  });

  it("deberia de cambiar el formato de la fecha a us", () => {
    let obj = component.changeFormatUS("10/10/2020");
    expect(obj).toEqual("2020-10-10");
  });

  it("deberia de cambiar el formato de la fecha a es", () => {
    let obj = component.changeFormatES("2020-10-10");
    expect(obj).toEqual("10/10/2020");
  });

  it("deberia de crear un objeto crearTipoCambioFechaInicial", () => {
    let obj = component.crearTipoCambioFechaInicial(null);
    expect(obj).toBeDefined();
  });
});
