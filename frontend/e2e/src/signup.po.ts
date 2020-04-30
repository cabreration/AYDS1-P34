import {browser, element, by, Key} from 'protractor';

export class SignupPage {
    
    navigateTo() {
        return browser.get('/signup');
    }

    getNameField() {
        return element(by.id('inputName'));
    }

    getLastNameField() {
        return element(by.id('inputLastName'));
    }

    getDPIField() {
        return element(by.id('inputDPI'));
    }

    getAccountField() {
        return element(by.id('inputAccount'));
    }

    getBalanceField() {
        return element(by.id('inputBalance'));
    }

    getEmailField() {
        return element(by.id('inputEmail'));
    }

    getPasswordField() {
        return element(by.id('inputPassword'));
    }

    getLoginButton() {
        return element(by.id('loginButton'));
    }

    getSignupButton() {
        return element(by.id('signupButton'));
    }

    getAlert() {
        return element(by.id('alert'));
    }

    getMessage() {
        return element(by.id('message'))
    }
}