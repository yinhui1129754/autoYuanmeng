import puppeteer from "puppeteer-core";
import { utils } from "../utils";


export class PuppeteerCore {
    constructor() {

    }
    async createBrowser(path) {
        this.browser = await puppeteer.launch({
            headless: config.headless || false,
            executablePath: path,
            defaultViewport: {
                width: config.viewWidth || 1920,
                height: config.viewHeight || 937
            }
        });
        this.browser.on("disconnected", () => {
            if (global.wss)
                global.wss.close();

        })
        return puppeteer;
    }
    async closeFirstPage() {
        // await this.page.close();
        let pages = await this.browser.pages()
        pages[0].close();
    }
    async createPage() {
        const page = await this.browser.newPage();
        await page.goto(config.url);
        this.page = page;
    }
    async createConfigPage() {
        const page = await this.browser.newPage();
        await page.goto(utils.getPath("./../index.html"));
        this.configPage = page;

    }
    async mouseClick(x, y) {
        await this.page.mouse.click(x, y);
    }

    async mouseDblClick(x, y) {
        await this.page.mouse.dblclick(x, y, { clickCount: 2 });
    }
    async mouseMove(x, y) {
        await this.page.mouse.move(x, y);
    }
    async mouseDown(x, y) {
        await this.page.mouse.down(x, y);
    }
    async mouseUp(x, y) {
        await this.page.mouse.up(x, y);
    }
    async keyDown(name, option) {
        await this.page.keyboard.down(name, option);
    }
    async keyUp(name, option) {
        await this.page.keyboard.up(name, option);
    }
    async keyPress(name, option) {
        await this.page.keyboard.press(name, option);
    }
    async press(name, option) {
        return this.keyPress(name, option);
    }
    async keyInput(text, option) {
        await this.page.keyboard.type(text, option);
    }
    async screenshot(op) {
        return await this.page.screenshot(op)
    }
    onload(call) {
        return this.page.on("load", call);
    }
}