import { CheckBalancePage } from './check-balance.po'
import { browser } from 'protractor';

describe('vista Consulta Saldo', () => {
    let page: CheckBalancePage;

    beforeEach(() => {
        page = new CheckBalancePage();
    });

    it('deberia navegar a la pagina de consulta de Saldo', () => {
        page.navigateTo();

        browser.driver.sleep(1500);
        page.getAccountField().sendKeys('test');
        browser.driver.sleep(1500);
        page.getPasswordField().sendKeys('test');
        browser.driver.sleep(1500);
        page.getLoginButton().click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/perfil');
        browser.driver.sleep(1500);
        page.getMenuCheckBalanceButton().click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/check-balance');
        browser.driver.sleep(3000);
    });
});