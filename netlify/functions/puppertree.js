const scrapeIt = require("scrape-it");

exports.handler = async function (event, context) {
  // Promise interface
  const result = await scrapeIt("https://ionicabizau.net", {
    title: ".header h1",
    desc: ".header h2",
    avatar: {
      selector: ".header img",
      attr: "src",
    },
  }).then(({ data, response }) => {
    return { status: `Status Code: ${response.statusCode}`, response: data };
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: result }),
  };
};
