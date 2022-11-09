"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const https_1 = __importDefault(require("https"));
const fetch = (method, url, payload = undefined) => new Promise((resolve, reject) => {
    https_1.default
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
function getScraping(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = [];
        const { url, mainSelector, childrenSelector } = options || {};
        yield fetch("GET", url).then((html) => {
            const $ = cheerio_1.default.load(html);
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
                            obj = Object.assign(Object.assign({}, obj), { [key]: text });
                        }
                        if (attr && attr !== "") {
                            if (value.attr(attr) || canBeEmpty) {
                                obj = Object.assign(Object.assign({}, obj), { [key]: value.attr(attr) });
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
                                obj = Object.assign(Object.assign({}, obj), { [key]: text });
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
                                obj = Object.assign(Object.assign({}, obj), { [key]: html });
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
    });
}
function scrapeHtmlWeb(options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield getScraping(options);
            return JSON.parse(data);
        }
        catch (err) {
            return { error: err };
        }
    });
}
exports.default = scrapeHtmlWeb;
