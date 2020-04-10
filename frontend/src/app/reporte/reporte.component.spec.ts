import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RestService } from "../rest.service";
import { ReporteComponent } from './reporte.component';
import { HttpClientModule } from '@angular/common/http';

describe('ReporteComponent', () => {
  let component: ReporteComponent;
  let fixture: ComponentFixture<ReporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteComponent ],
      providers: [ RestService ],
      imports: [ HttpClientModule ]
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

  it("devuelve las transacciones de una cuenta de prueba",
  inject([RestService], async (rest: RestService) => {
    let result;
    result = await rest.PostRequest("reporte",{estado: true}).toPromise();
    expect(result.estado).toBeDefined();
    expect(result.mensaje).toBeDefined();
    expect(result.result).toBeDefined();
  })
  );

  it("devuelve las transacciones vacias si la cuenta no existe",
  inject([RestService], async (rest: RestService) => {
    let result;
    result = await rest.PostRequest("reporte",{estado: false}).toPromise();
    expect(result.estado).toBeDefined();
    expect(result.mensaje).toBeDefined();
    expect(result.result).toBeDefined();
  })
  );

});

