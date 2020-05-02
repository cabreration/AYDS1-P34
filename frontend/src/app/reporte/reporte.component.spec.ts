import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RestService } from "../rest.service";
import { ReporteComponent } from './reporte.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ReporteComponent', () => {
  let component: ReporteComponent;
  let fixture: ComponentFixture<ReporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteComponent ],
      providers: [ RestService ],
      imports: [ HttpClientModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("deberia de recibir, del servidor, una lista de objetos",
  inject([RestService], async (rest: RestService) => {
    let resultado;
    // prueba para la peticion incorrecta
    resultado = await rest.PostRequest("reporte",{noCuenta:999,estado:true}).toPromise();  
    expect(resultado).toBeDefined();
  })
  );

  it("comprueba que el numero de cuenta exita",
  inject([RestService], async (rest: RestService) => {
    let result;
    // prueba para la peticion incorrecta
    result = await rest.PostRequest("reporte",{noCuenta: 0 ,estado: false}).toPromise();      
    expect(result.resultado).toBeFalsy();
  })
  );


});

