const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

const dev = false;

exports.handler = async function (event) {
  console.log("functions");
  //const { content, destination } = JSON.parse(event.body);
  puppeteer.use(StealthPlugin());

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disabled-setupid-sandbox"],
    executablePath: dev
      ? "C:/Program Files/Google/Chrome/Application/chrome.exe"
      : await chromium.executablePath,
    headless: true,
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
