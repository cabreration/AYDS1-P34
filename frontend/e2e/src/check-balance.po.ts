import {browser, element, by, Key} from 'protractor';

export class CheckBalancePage {
    
    navigateTo() {
        return browser.get('/');
    }

    getAccountField() {
        return element(by.id('inputName'));
    }

    getPasswordField() {
        return element(by.id('inputPassword'));
    }

    getLoginButton() {
        return element(by.id('loginButton'));
    }

    getMenuCheckBalanceButton() {
        return element(by.id('Menu_Saldo'));
    }
}