import { TipoCambioPage } from './perfil.po'
import { browser } from 'protractor'

describe('vista de tipocambio', () => {
  let page: TipoCambioPage;

  beforeEach(() => {
    page = new TipoCambioPage();
  });

  it('deberia de mostrar tipo de cambio del dia', () => {
    page.navigateTo();

    browser.driver.sleep(3000);
    expect(page.getValorField()).toBeDefined();
  });
});
