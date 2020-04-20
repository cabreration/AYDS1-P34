import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipocambioComponent } from './tipocambio.component';

describe('TipocambioComponent', () => {
  let component: TipocambioComponent;
  let fixture: ComponentFixture<TipocambioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipocambioComponent ]
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

  it("deberia de estar inicializado la variable valor", () => {
    expect(component.valor).toBeDefined();
  });

  it("deberia de estar inicializado la variable valores", () => {
    expect(component.valores).toBeDefined();
  });

  it("valor deberia de ser mayor o igual a 0", () => {
    expect(component.valor).toBeGreaterThanOrEqual(0);
  });

  it("los valores deberia de ser mayor o igual a 0", () => {
    for(let i = 0; i < component.valores.length; i++) {
      expect(component.valores[i]).toBeGreaterThanOrEqual(0);
    }
  });
});
