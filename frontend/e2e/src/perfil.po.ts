import { browser, element, by, Key } from 'protractor';

export class PerfilPage {
    navigateTo() {
        return browser.get('/perfil');
    }

    getEmailField() {
        return element(by.id('email'));
    }

    getApellidosField() {
        return element(by.id('apellidos'));
    }

    getDpiField() {
        return element(by.id('dpi'));
    }

    getNoCuentaField() {
        return element(by.id('nocuenta'));
    }

    getSaldoField() {
        return element(by.id('saldo'));
    }

    getPasswordAnteriorField() {
        return element(by.id('password-anterior'));
    }

    getPasswordNuevoField() {
        return element(by.id('password-nuevo'));
    }

    getPasswordConfirmarField() {
        return element(by.id('password-confirmar'));
    }

    getActualizarButton() {
        return element(by.id('actualizar'));
    }

    getMensaje() {
        return element(by.id('mensaje'));
    }

    getAlerta() {
        return element(by.id('alerta'));
    }
}
