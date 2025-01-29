import puppeter from 'puppeteer';

(async () => {
    // Connect to an existing instance of Chrome
    const browser = await puppeter.connect({
        browserURL: 'http://localhost:9222', // Ensure Chrome is started with --remote-debugging-port=9222
    });




    // Open a new page
    const page = await browser.newPage();
    await page.setViewport({width: 1000, height: 1000})

    // Navigate to the specified URL
    await page.goto('https://www.linkedin.com/jobs/collections/recommended/?currentJobId=4138069363', {
        waitUntil: 'load'
    });

    // Extract HTML from the element with ID 'main'
    const baseHtml = await page.$eval('.jobs-semantic-search-job-details-wrapper', element => element.innerHTML);
    await page.click('.job-details-module > .job-details-connections-card > div > div > button',)
    const elements = await page.$$('.job-details-people-who-can-help__connections-modal-section')
    console.log(elements)
    // await ask(extractFromHtml(baseHtml,''))

    const pages = await browser.pages()
    if (pages.length > 1) {
        await page.close()
    }
    // await browser.close();
})();