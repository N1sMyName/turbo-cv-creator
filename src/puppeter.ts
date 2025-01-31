import {Page} from "puppeteer";

export const setPageToFull = async (page: Page) => {
    const {width, height} = await page.evaluate(() => {
        return {
            width: window.screen.width,
            height: window.screen.height
        };
    });
    await page.setViewport({width, height})
}