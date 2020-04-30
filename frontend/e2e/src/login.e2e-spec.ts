import { LoginPage } from './login.po'
import { browser } from 'protractor';

describe('vista de login', () => {
    let page: LoginPage;

    beforeEach(() => {
        page = new LoginPage();
    });

    it('deberia navegar a la pagina de registro', () => {
        page.navigateTo();

        browser.driver.sleep(3000);
        page.getSignupButton().click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/signup');
        browser.driver.sleep(3000);
    });

    it('deberia navegar a la pagina de perfil al iniciar sesion', () => {
        page.navigateTo();

        browser.driver.sleep(1500);
        page.getAccountField().sendKeys('test');
        browser.driver.sleep(1500);
        page.getPasswordField().sendKeys('test');
        browser.driver.sleep(1500);
        page.getLoginButton().click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/perfil');
        browser.driver.sleep(3000);
    });

    it('deberia mostrar una advertencia si los campos no son llenados', ()=> {
        page.navigateTo();

        browser.driver.sleep(3000);
        expect(page.getAlert().isPresent()).toBeFalsy();
        page.getLoginButton().click();
        browser.driver.sleep(3000);
    });
});