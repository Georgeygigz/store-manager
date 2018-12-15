import faker from "faker"
import puppeteer from "puppeteer"

//configuration of the url
const login_page="http://127.0.0.1:5500/UI/templates/index.html"

//create fake login credentials
const loginDetails={
    email:faker.internet.email(),
    password:faker.internet.password(),
}

//variable for puppeteer
let page;
let browser;
const width = 1920;
const height = 1080;
let email="#email";
let password="#password"

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
    it("test login with wrong credentials", async () => {
    await page.goto(login_page);
    await page.waitForSelector("form")
    await page.type(email, loginDetails.email);
    await page.type(password, loginDetails.password);
    await page.click("button[type=submit]");

    }, 60000);
});