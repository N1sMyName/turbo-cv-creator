import {Page} from "puppeteer";
import {__dirname} from './utils.js'

export const generatePdf = async (page: Page, path: string) => {

    const url = `file://${__dirname}/index.html`
    await page.goto(url, {
        waitUntil: 'load'
    })
    // Generate a PDF of the page
    await page.pdf({
        path, // Path to save the PDF
        format: 'A4', // Paper format
        printBackground: true // Print background graphics
    });

}

