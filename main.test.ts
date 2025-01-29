import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

describe('main.ts tests', () => {
    let browser: puppeteer.Browser;
    let page: puppeteer.Page;

    beforeAll(async () => {
        browser = await puppeteer.connect({
            browserURL: 'http://localhost:9222', // Ensure Chrome is started with --remote-debugging-port=9222
        });
        page = await browser.newPage();
        await page.goto('https://www.linkedin.com/jobs/collections/recommended/?currentJobId=4110432408', {
            waitUntil: 'load'
        });
    });

    afterAll(async () => {
        const pages = await browser.pages();
        if (pages.length > 1) {
            await page.close();
        }
        // await browser.close();
    });

    test('classTextContent should contain string EPAM Systems', async () => {
        const html = await page.$eval('.jobs-semantic-search-job-details-wrapper', element => element.innerHTML);
        const $ = cheerio.load(html);
        const classTextContent = $('.QHgNBisqsSQXGYlDXUUbuaaRFUNehsVjxBrEA').text();
        expect(classTextContent).toContain('EPAM Systems');
    });

    test('classHrefValue should contain string https://www.linkedin.com/company/epam-systems/life', async () => {
        const html = await page.$eval('.jobs-semantic-search-job-details-wrapper', element => element.innerHTML);
        const $ = cheerio.load(html);
        const classHrefValue = $('.QHgNBisqsSQXGYlDXUUbuaaRFUNehsVjxBrEA').attr('href');
        expect(classHrefValue).toContain('https://www.linkedin.com/company/epam-systems/life');
    });

    test('aboutJobText should contain specific text', async () => {
        const html = await page.$eval('.jobs-semantic-search-job-details-wrapper', element => element.innerHTML);
        const $ = cheerio.load(html);
        const aboutJobText = $('h2:contains("About the job")').nextUntil('h2:contains("Responsibilities")').text();
        expect(aboutJobText).toContain('We are seeking a talented Senior JavaScript Developer to join our remote team, working with a global leader in logistics and shipping services.\n\nIn this position, you will be responsible for designing, implementing, and maintaining a front-end platform used for information management, shipment, and logistics services. You will work closely with cross-functional teams, utilizing Agile methodologies for software development and delivery cycles, ensuring high-quality software delivery by performing regular testing, code reviews, and documentation.');
    });

    test('responsibilitiesText should contain specific text', async () => {
        const html = await page.$eval('.jobs-semantic-search-job-details-wrapper', element => element.innerHTML);
        const $ = cheerio.load(html);
        const responsibilitiesText = $('h2:contains("Responsibilities")').nextUntil('h2:contains("Nice to have")').text();
        expect(responsibilitiesText).toContain('Design, implement, and maintain a front-end platform used for information management, shipment, and logistics services\nCommunicate effectively with team members and collaborate using Gitlab, ServiceNow, and other team tools\nDevelop and maintain Continuous Integration (CI) practices and pipeline for multiple projects\nCreate and manage API Gateway, PostgreSQL, and other Amazon Web Services (AWS) components\nFollow Agile methodologies for software development and delivery cycles\nEnsure high-quality software delivery by performing regular testing, code reviews, and documentation');
    });

    test('niceToHaveText should contain specific text', async () => {
        const html = await page.$eval('.jobs-semantic-search-job-details-wrapper', element => element.innerHTML);
        const $ = cheerio.load(html);
        const niceToHaveText = $('h2:contains("Nice to have")').nextUntil('h2:contains("We offer")').text();
        expect(niceToHaveText).toContain('Experience with other front-end frameworks such as Angular or VueJS\nProficiency in Python or other server-side programming languages\nKnowledge of containerization technologies such as Docker or Kubernetes\nExperience with serverless architectures and AWS Lambda functions');
    });
});