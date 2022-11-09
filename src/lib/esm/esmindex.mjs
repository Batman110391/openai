import cheerio from "cheerio";
import https from "https";
const fetch = (method, url, payload = undefined) => new Promise((resolve, reject) => {
    https
        .get(url, (res) => {
        const dataBuffers = [];
        res.on("data", (data) => {
            if (data) {
                dataBuffers.push(data.toString("utf8"));
            }
        });
        res.on("end", () => resolve(dataBuffers.join("")));
    })
        .on("error", reject);
});
async function getScraping(options) {
    let result = [];
    const { url, mainSelector, childrenSelector } = options || {};
    await fetch("GET", url).then((html) => {
        const $ = cheerio.load(html);
        const selectedElem = mainSelector;
        $(selectedElem).each((parentIndex, parentElem) => {
            $(parentElem)
                .children()
                .each((childId, childElem) => {
                let obj = {};
                $(childrenSelector).each((index, el) => {
                    const { key, selector, attr, type, canBeEmpty, replace } = el;
                    const value = $(childElem).find(selector);
                    if (!attr && !type) {
                        let text = value.text().trim();
                        if (replace) {
                            if (replace instanceof RegExp) {
                                text = text.replace(replace, "");
                            }
                            else if (typeof replace === "function") {
                                text = replace(text);
                            }
                        }
                        obj = { ...obj, [key]: text };
                    }
                    if (attr && attr !== "") {
                        if (value.attr(attr) || canBeEmpty) {
                            obj = { ...obj, [key]: value.attr(attr) };
                        }
                    }
                    else if (type === "text") {
                        if (value.text().trim() || canBeEmpty) {
                            let text = value.text().trim();
                            if (replace) {
                                if (replace instanceof RegExp) {
                                    text = text.replace(replace, "");
                                }
                                else if (typeof replace === "function") {
                                    text = replace(text);
                                }
                            }
                            obj = { ...obj, [key]: text };
                        }
                    }
                    else if (type === "html") {
                        if (value.prop("outerHTML") || canBeEmpty) {
                            let html = value.prop("outerHTML");
                            if (replace) {
                                if (replace instanceof RegExp) {
                                    html = html.replace(replace, "");
                                }
                                else if (typeof replace === "function") {
                                    html = replace(html);
                                }
                            }
                            obj = { ...obj, [key]: html };
                        }
                    }
                });
                if (Object.keys(obj).length) {
                    result.push(obj);
                }
            });
        });
    });
    try {
        return JSON.stringify(result, null, 2);
    }
    catch (err) {
        throw "There was an error converting to Json!";
    }
}
async function scrapeHtmlWeb(options) {
    try {
        const data = await getScraping(options);
        return JSON.parse(data);
    }
    catch (err) {
        return { error: err };
    }
}
export default scrapeHtmlWeb;
