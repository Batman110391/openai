const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");

exports.handler = async function (event) {
  console.log("functions");

  const localPathChrome =
    "C:/Program Files/Google/Chrome/Application/chrome.exe";

  const executablePath = await chromium.executablePath();

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  });

  console.log("Running tests...");

  const page = await browser.newPage();

  await page.goto("https://streamingcommunity.actor/search?q=Caleidoscopio");

  await page.waitForSelector(".tile-image");

  let links = await page.evaluate(() => {
    let linksElement = document.body.querySelectorAll(".tile-image");
    let links = Object.values(linksElement).map((x) => {
      if (x.href) {
        return {
          link: x.href,
        };
      } else {
        return null;
      }
    });

    return links;
  });

  const filterLinks = links.filter((x) => x).filter((_, i) => i < 1);
  await browser.close();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: filterLinks[0].link }),
  };
};
