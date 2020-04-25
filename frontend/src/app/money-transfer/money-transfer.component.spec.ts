import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { MoneyTransferComponent } from './money-transfer.component';
import { RestService } from '../rest.service';
import { HttpClientModule } from '@angular/common/http';

describe('MoneyTransferComponent', () => {
  let component: MoneyTransferComponent;
  let fixture: ComponentFixture<MoneyTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyTransferComponent ],
      providers: [ RestService ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('El componente es creado', () => {
    expect(component).toBeTruthy();
  });

  it ('la transferencia recibe un objeto con un atributo llamado "resultado"',
    inject([RestService], async (rest: RestService) => {
      let result = await rest.PostRequest('money-transfer', { origen: 'a' , destino: 'b', monto:100}).toPromise();
      expect(result.resultado).toBeDefined();
      //console.log(result);
    })
  );

  it ('Si el monto a transferir es mayor al balance de la cuenta la bandera de envio es falsa', () => {
    let flag = component.compararMontos();
    expect(flag).toBeFalsy();
  });

});
