// import puppeteer from 'puppeteer';

// export default defineEventHandler(async (event) => {
//   const browser = await puppeteer.launch({
//     args: ['--no-sandbox', '--disable-setuid-sandbox']
//   });
//   const page = await browser.newPage();

//   // Navigate to the URL
//   await page.goto('https://example.com/', { waitUntil: 'domcontentloaded' });

//   // Get the page content
//   const content = await page.content();

//   await browser.close();

//   return content;
// });
