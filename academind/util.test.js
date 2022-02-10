const { generateText, checkAndGenerate } = require('./util');
const pup = require('puppeteer');

let browser = null;

afterAll( async () => {
    await browser.close();
});

test('should output name and age', () => {
    const txt1 = generateText('max', 29);
    expect(txt1).toBe('max (29 years old)');

    const txt2 = generateText('max', 20);
    expect(txt2).toBe('max (20 years old)');
});

test('should empty', () => {
    const txt = generateText('', null);
    expect(txt).toBe(' (null years old)');
});

test('should check and generate text output', () => {
    const txt3 = checkAndGenerate('max', 29);
    expect(txt3).toBe('max (29 years old)');
});

test('should browser and click', async () => {

    browser = await pup.launch({
        headless: false, //see the browser
        slowMo: 80,
    });
    const page = await browser.newPage();
    await page.goto('file:///Users/rmolinaro/Documents/testing/academind/index.html');
    await page.click('input#name');
    await page.type('input#name', 'Max');
    await page.click('input#age');
    await page.type('input#age', '29');
    await page.click('#btnAddUser');

    const finaltxt = await page.$eval('.user-item', (el) => el.textContent);
    expect(finaltxt).toBe('Max (29 years old)');
}, 10000);
