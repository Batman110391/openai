const puppeteer = require("puppeteer");
const url = "https://www.mymovies.it/film/2021/cmon-cmon/cinema/lazio/";
const options = {
  args: ["--no-sandbox"],
};

const selector = "#recensione";

exports.handler = async function (event, context) {
  async function getTable() {
    const browser = await puppeteer.launch(options);
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.goto(url);
    const tableInfo = await page.$$eval(selector, (nodes) => {
      return nodes.map((node) => {
        const table = node.querySelector("table");

        return table.textContent;
      });
    });

    await browser.close();

    return tableInfo;
  }

  const result = await getTable();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: result }),
  };
};
