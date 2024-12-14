const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  // Launch Puppeteer browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Set the download directory
  const downloadPath = path.resolve(__dirname, 'downloads');
  if (!fs.existsSync(downloadPath)) {
    fs.mkdirSync(downloadPath);
  }

  // Set the download directory in browser preferences
  await page._client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: downloadPath
  });

  // Go to the URL
  await page.goto('https://fuckingfast.co/7jyte5ukfgwb#Grand_Theft_Auto_V_--_fitgirl-repacks.site_--_.part002.rar', {
    waitUntil: 'networkidle2'
  });

  // Perform any necessary interactions here (clicking buttons, waiting for redirects, etc.)
  // In this case, it's likely you'll need to find the link that triggers the file download.
  // For example, assume we need to click a download button or wait for the link to appear:
  
  // Wait for a download button or link to appear
  // This part should be customized according to the structure of the website
  const downloadLinkSelector = 'a.download-link'; // Modify this selector to match the actual download link/button
  await page.waitForSelector(downloadLinkSelector);
  
  // Get the download URL (assumes there's an anchor tag with a class 'download-link')
  const downloadUrl = await page.$eval(downloadLinkSelector, (link) => link.href);
  console.log(`Found download URL: ${downloadUrl}`);
  
  // Directly download the file using the URL
  const response = await page.goto(downloadUrl);
  const buffer = await response.buffer();

  // Save the file locally
  const fileName = 'downloaded_file.rar'; // Modify this based on your file's name
  const filePath = path.join(downloadPath, fileName);
  fs.writeFileSync(filePath, buffer);

  console.log(`File downloaded and saved to: ${filePath}`);

  // Close browser
  await browser.close();
})();
