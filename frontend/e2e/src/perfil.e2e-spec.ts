import { PerfilPage } from './perfil.po'
import { browser } from 'protractor'

describe('vista de perfil', () => {
  let page: PerfilPage;

  beforeEach(() => {
    page = new PerfilPage();
  });

  it('deberia de no actualizar datos', () => {
    page.navigateTo();

    browser.driver.sleep(3000);
    page.getActualizarButton().click();
    expect(page.getMensaje().isPresent()).toBeFalsy();
  });

  it('deberia de mostrar una advertencia si los campos no son llenados', () => {
    page.navigateTo();

    browser.driver.sleep(3000);
    expect(page.getAlerta().isPresent()).toBeFalsy();
  });
});
