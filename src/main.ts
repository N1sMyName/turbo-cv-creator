import puppeter from 'puppeteer';
import dotenv from 'dotenv';
import {extractFromHtml, generateHtml} from "./prompts.js";
import {ask} from "./anthropic.js";
import {setPageToFull} from "./puppeter.js";
import process from 'process'
import {jobSelectors} from "./selectors.js";
import {createPath, deleteFile, readFromFile, writeToFile} from "./utils.js";
import {generatePdf} from "./pdf.js";


dotenv.config();

export const browser = await puppeter.connect({
    browserURL: 'http://localhost:9222', // Ensure Chrome is started with --remote-debugging-port=9222
});

const run = async (url: string) => {
    try {

        // Connect to an existing instance of Chrome

        // Open a new page
        const pages = await browser.pages();
        const page = pages[0];
        await setPageToFull(page)

        // Navigate to the specified URL
        await page.goto(process.env.URL || '', {
            waitUntil: 'load'
        });

        const html = await page.$eval(jobSelectors.linkedIn, element => element.innerHTML);
        console.log(`Html has been generated`)

        const jsonRaw = await ask(extractFromHtml(html))

        const json: Record<string, any> = JSON.parse(jsonRaw)
        console.log(`Json has been generated`)

        const template = await readFromFile('dist/template.html')
        console.log(`Template has been red`)

        const cvHtml = await ask(generateHtml(jsonRaw, template))
        console.log(`CvHtml has been generated`)

        await writeToFile(createPath(json.position.title,'.html'), cvHtml)
        console.log(`Index.html has been generated`)

        await generatePdf(page, createPath(json.position.title))
        console.log(`pdf has been generated`)

        // await deleteFile('index.html')
        // console.log(`index.html has been deleted`)

        await browser.close()
    } catch (e: any) {
        console.log(e.message)
        await browser.close()
    }

};

// if (process.env?.URL) {
//     await run(process.env?.URL)
// }
