import { ReportePage } from './reporte.po'
import { browser } from 'protractor';

describe('vista Pagina Reporte', () => {
    let page: ReportePage;

    beforeEach(() => {
        page = new ReportePage();
    });

    it('deberia navegar a la pagina de Reporte y generar Reporte General', () => {
        page.navigateTo();

        browser.driver.sleep(1500);
        page.getReporteButton().click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/reporte');
        browser.driver.sleep(3000);
    });

    it('deberia navegar a la pagina de Reporte y generar Mi reporte', () => {
        page.navigateTo();

        browser.driver.sleep(1500);
        page.getMiReporteButton().click();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/reporte');
        browser.driver.sleep(3000);
    });

});
