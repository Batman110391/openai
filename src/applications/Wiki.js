import React from "react";
import wiki from "wikipedia";

export default function Wiki() {
  React.useEffect(() => {
    (async () => {
      try {
        wiki.setLang("it");

        const searchResults = await wiki.search("Batman");
        console.log(searchResults);

        const page = await wiki.page("Batman");
        console.log(page);
        //Response of type @Page object
        const summary = await page.summary();
        console.log(summary);
        //Response of type @wikiSummary - contains the intro and the main image
        const contentNewYear2020 = await wiki.featuredContent({
          year: "2022",
          month: "11",
          day: "03",
        });
        console.log("d -> ", contentNewYear2020); // returns all deaths which happened on Feb 28

        /* fetch("/iaopenai.netlify/functions/puppertree")
          .then((resp) => resp.json())
          .then((resp) => console.log(resp)); */
      } catch (error) {
        console.log(error);
        //=> Typeof wikiError
      }
    })();
  }, []);

  return <div>Wiki</div>;
}
