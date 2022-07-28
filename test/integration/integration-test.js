import puppeteer from 'puppeteer'
import path from 'path'

describe('integration should', () => {
    let browser
    beforeAll(async () => {
        browser = await puppeteer.launch();
    })
    afterAll(async () => {
        await browser.close();
    })
    test('webworkers should resolve to elements', async () => {
        const page = await browser.newPage();
        await page.goto(`file:${path.join(__dirname, '../../examples/index.html')}`);
        await page.waitForTimeout(1000);
        const el1 = await page.evaluate(() => document.querySelector('#el1').textContent);
        const el2 = await page.evaluate(() => document.querySelector('#el2').textContent);
        const el3 = await page.evaluate(() => document.querySelector('#el3').textContent);
        const el4 = await page.evaluate(() => document.querySelector('#el4').textContent);
        expect(el1).toEqual("4")
        expect(el2).toEqual("4")
        expect(el3).toEqual("8")
        expect(el4).toEqual("8")
    })
})