const scrapeHtmlWeb = require("scrape-html-web");

exports.handler = async function (event, context) {
  const { body } = event;
  // Promise interface
  try {
    const data = await scrapeHtmlWeb(body);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err }),
    };
  }
};
