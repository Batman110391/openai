import React from "react";
import XMLParser from "react-xml-parser";

export default function GoogleNews({ dispatch }) {
  React.useEffect(() => {
    fetch(
      "https://news.google.com/news?q=apple&output=rss&hl=it&gl=IT&ceid=IT:it",
      {
        redirect: "follow",
        mode: "cors",
        headers: {
          Accept: "*/*",
        },
      }
    )
      .then((resp) => resp.text())
      .then((data) => {
        console.log(data);
        var xml = new XMLParser().parseFromString(data);
        console.log(xml);
      })
      .catch((err) => console.log(err));
  }, []);

  return <div>GoogleNews</div>;
}
