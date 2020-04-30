import {browser, element, by, Key} from 'protractor';

export class SignupPage {
    
    navigateTo() {
        return browser.get('/signup');
    }

    getPasswordField() {
        return element(by.id('inputPassword'));
    }

    getAccountField() {
        return element(by.id('inputName'));
    }

    getLoginButton() {
        return element(by.id('loginButton'));
    }

    getSignupButton() {
        return element(by.id('signupButton'));
    }

    getAlert() {
        return element(by.id('notification'));
    }
}