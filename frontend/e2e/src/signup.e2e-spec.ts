import { SignupPage } from './signup.po'
import { browser } from 'protractor';

describe('vista de registro', () => {
    let page: SignupPage;

    beforeEach(() => {
        page = new SignupPage();
    });

    it('deberia navegar a la pagina de login', () => {
        page.navigateTo();

        browser.driver.sleep(3000);
        page.getLoginButton().click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/');
        browser.driver.sleep(3000);
    });

    it('deberia mostrar una advertencia si los campos no son llenados', ()=> {
        page.navigateTo();

        browser.driver.sleep(3000);
        expect(page.getAlert().isPresent()).toBeFalsy();
        page.getSignupButton().click();
        browser.driver.sleep(3000);
    });
});