import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { CheckBalanceComponent } from './check-balance.component';
import { RestService } from '../rest.service';
import { HttpClientModule } from '@angular/common/http';

describe('CheckBalanceComponent', () => {
  let component: CheckBalanceComponent;
  let fixture: ComponentFixture<CheckBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckBalanceComponent ],
      providers: [ RestService ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('no existe la cuenta',
    inject([RestService], async (rest: RestService) => {
      let result = await rest.PostRequest('check-balance', { cuenta: ''}).toPromise();
      expect(result.saldo).toBeDefined();
    })
  );
  it ('devuelve el saldo de una cuenta de prueba',
    inject([RestService], async (rest: RestService) => {
      let result = await rest.PostRequest('check-balance', { cuenta: '1'}).toPromise();
      expect(result.saldo).toBeDefined();
    })
  );
  it ('devuelve saldo 0 en caso de no enviar el numero de cuenta en la request',
    inject([RestService], async (rest: RestService) => {
      let result = await rest.PostRequest('check-balance', { cuenta: null}).toPromise();
      expect(result.saldo).toBeDefined();
    })
  );
  it ('devuelve saldo 0 en caso de no enviar datos',
    inject([RestService], async (rest: RestService) => {
      let result = await rest.PostRequest('check-balance', null).toPromise();
      expect(result.saldo).toBeDefined();
    })
  );
});
