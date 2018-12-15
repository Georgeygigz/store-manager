import faker from "faker"
import puppeteer from "puppeteer"

//configuration of the url
const productsPage="http://127.0.0.1:5500/UI/templates/addproducts.html"

//create fake login credentials
const productDetails={
    item_name:faker.lorem.word(),
    item_price:"10",
    quantity:faker.random.number(),
    image:faker.image.imageUrl()


}

//variable for puppeteer
let page;
let browser;
const width = 1920;
const height = 1080;

let item_name="#item_name";
let item_price="#item_price";
let quantity="#quantity";
let image="#image";

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
    await page.goto(productsPage);
    await page.waitForSelector("form")
    await page.type(item_name, productDetails.item_name);
    await page.type(item_price, productDetails.item_price);
    await page.type(quantity, productDetails.quantity);
    await page.type(image, productDetails.image);
    await page.click("button[type=submit]");

    }, 60000);
});