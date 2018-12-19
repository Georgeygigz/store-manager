import faker from "faker"
import puppeteer from "puppeteer"

//configuration of the url
const categoryPage="http://127.0.0.1:5500/UI/templates/category.html"

//create fake login credentials
const categoryDetail={
    category:faker.lorem.word()
}

//variable for puppeteer
let page;
let browser;
const width = 1920;
const height = 1080;

let category="#category";


//definatio of puppeteer behavior

    beforeAll(async () => {
        browser=await puppeteer.launch({
            headless:false,
            slowMo:80,
            args: [`--window-size=${width},${height}`]
        });
        page = await browser.newPage();
        await page.setViewport({ width, height });
    });
    afterAll(() => {
        browser.close();
    });

 describe("login page", () => {
    //Actual test
    it("test add new category", async () => {
    await page.goto(categoryPage);
    await page.waitForSelector("form")
    await page.type(category, categoryDetail.category);
    await page.click("button[type=submit]");

    }, 600000);
});