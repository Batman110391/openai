const scrapeHtmlWeb = require("scrape-html-web");

export async function handler(event, context) {
  //const { body } = event;
  // Promise interface
  const optionsFirstExample = {
    url: "https://nodejs.org/en/blog/",
    mainSelector: ".blog-index",
    childrenSelector: [
      { key: "date", selector: "time", type: "text" },
      { key: "version", selector: "a", type: "text" },
      { key: "link", selector: "a", attr: "href" },
    ],
  };
  try {
    const data = await scrapeHtmlWeb(optionsFirstExample);

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
}
