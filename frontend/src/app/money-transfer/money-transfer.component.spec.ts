import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { MoneyTransferComponent } from './money-transfer.component';
import { RestService } from '../rest.service';
import { HttpClientModule } from '@angular/common/http';

describe('MoneyTransferComponent', () => {
  let component: MoneyTransferComponent;
  let fixture: ComponentFixture<MoneyTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoneyTransferComponent],
      providers: [RestService],
      imports: [HttpClientModule]
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
  it('Debe existir el objeto usr y debe tener 5 datos', () => {
    let obj = Object.keys(sessionStorage.getItem('usuario'));
    var expectedKeys = ["account","balance","dpi","email","lastName","name","password"];
    for (var i = 0; i < expectedKeys.length; i++) {
      expect(obj).toContain(expectedKeys[i])
    }
  })
  it('deberia crear un objeto con los campos "cuenta" y "contrasenia"', () => {
    // primer test
    let trans = component.createTransferObject(100,200,300);
    expect(trans.origen).toBeDefined();
    expect(trans.destino).toBeDefined();
    expect(trans.cantidad).toBeDefined();

    //segundo test
    trans = component.createTransferObject(0,0,0);
    expect(trans.origen).toBeDefined();
    expect(trans.destino).toBeDefined();
    expect(trans.cantidad).toBeDefined();

    //tercer test
    trans = component.createTransferObject(null, null,null);
    expect(trans.origen).toBeDefined();
    expect(trans.destino).toBeDefined();
    expect(trans.cantidad).toBeDefined();
  });
  it('la transferencia recibe un objeto con un atributo llamado "resultado"',
    inject([RestService], async (rest: RestService) => {
      let result = await rest.PostRequest('money-transfer', { origen: 'a', destino: 'b', monto: 100 }).toPromise();
      expect(result.resultado).toBeDefined();
      //console.log(result);
    })
  );

  it('Si el monto a transferir es mayor al balance de la cuenta la bandera de envio es falsa', () => {
    let flag = component.comparation(10000);
    expect(flag).toBeFalsy();
  });

});
