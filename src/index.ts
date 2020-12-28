import puppeteer from 'puppeteer';
import {match} from './aprMatcher';

const getRawTexts = async ():Promise<string[]> => {
    const browser = await puppeteer.launch();
    try {
        const page = await browser.newPage();
        await page.goto('https://www.curve.fi/');
        const closeButton = await page.$('div.bn-onboard-modal-content-close')
        await closeButton?.evaluate(closeButton => (closeButton as HTMLElement).click());

        //it took a little bit of time for curve.fi to load the incentives.
        await page.waitForTimeout(5000);
        const texts = await page.evaluate(() => Array.from(document.querySelectorAll('span.apr'), element => {
            return (element as HTMLElement).innerText;
        }));
        await browser.close();
        return texts;
    } catch (e) {
        return [];
    } finally {
        await browser.close();
    }

};
(async function () {
    const rawTexts = await getRawTexts();
    const aprs = rawTexts.map(apr => match(apr)).filter(it => it);
    console.log(aprs);
})();


