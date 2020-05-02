import { browser, element, by, Key } from 'protractor';

export class TipoCambioPage {
    navigateTo() {
        return browser.get('/tipocambio');
    }

    getFechaInicialField() {
        return element(by.id('FechaInicial'));
    }

    getFechaField() {
        return element(by.id('Fecha'));
    }

    getValorField() {
        return element(by.id('Valor'));
    }

    getVentaField() {
        return element(by.id('Venta'));
    }

    getCompraField() {
        return element(by.id('Compra'));
    }

    getTipocambiofechainicialButton() {
        return element(by.id('tipocambiofechainicial'));
    }

    getTipocambiodiaButton() {
        return element(by.id('tipocambiodia'));
    }
}
