import {browser, element, by, Key} from 'protractor';

export class ReportePage {
    
    navigateTo() {
        return browser.get('/reporte');
    }

    getReporteButton() {
        return element(by.id('general'));
    }

    getMiReporteButton() {
        return element(by.id('propio'));
    }

}
