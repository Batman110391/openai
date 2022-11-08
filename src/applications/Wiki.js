import React from "react";
//import scrapeHtmlWeb from "scrape-html-web";
const options = {
  urls: ["http://nodejs.org/"],
  directory: "/path/to/save/",
};

// with async/await

const optionsFirstExample = {
  url: "https://nodejs.org/en/blog/",
  mainSelector: ".blog-index",
  childrenSelector: [
    { key: "date", selector: "time", type: "text" },
    { key: "version", selector: "a", type: "text" },
    { key: "link", selector: "a", attr: "href" },
  ],
};

export default function Wiki() {
  React.useEffect(() => {
    (async () => {
      //const data = await scrapeHtmlWeb(optionsFirstExample);
      //const result = await scrape(options);
      console.log("example 1 :");
    })();
  }, []);

  return <div>Wiki</div>;
}
