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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('no existe 1 o 2 de las cuentas',
    inject([RestService], async (rest: RestService) => {
      let result = await rest.PostRequest('money-transfer', { cuentaOrigen: 'a',cuentaDestino: 'b', monto:100}).toPromise();
      expect(result.result).toBeDefined();
      //console.log(result);
    })
  );
  it ('el monto a transferir es mayor al monto de la cuenta de Origen',
    inject([RestService], async (rest: RestService) => {
      let result = await rest.PostRequest('money-transfer', { cuentaOrigen: '1',cuentaDestino: '2', monto:10000}).toPromise();
      expect(result.result).toBeDefined();
      //console.log(result);
    })
  );
  it ('transferencia exitosa',
    inject([RestService], async (rest: RestService) => {
      let result = await rest.PostRequest('money-transfer', { cuentaOrigen: '1',cuentaDestino: '2', monto:100}).toPromise();
      expect(result.result).toBeDefined();
      //console.log(result);
    })
  );
});
