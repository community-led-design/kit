/*
Copyright the Fluidic Eleventy copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/inclusive-design/codesign.inclusivedesign.ca/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/inclusive-design/codesign.inclusivedesign.ca/raw/main/LICENSE.md.
*/

"use strict";
const jsdom = require("jsdom");
const slugify = require("slugify");
const {JSDOM} = jsdom;

const slugifyOptions = {
    replacement: "-",
    lower: true,
    strict: true
};

module.exports = function (value, outputPath) {
    if (outputPath && outputPath.includes(".html")) {
        const DOM = new JSDOM(value, {
            resources: "usable"
        });

        const document = DOM.window.document;
        const articleImages = [...document.querySelectorAll("main article img")];
        const headings = [...document.querySelectorAll("main article h2, main article h3, main article h4")];
        const tocHeadings = [...document.querySelectorAll(".inner-content h2, .inner-content h3")];

        if (articleImages.length) {
            articleImages.forEach(image => {
                // Enable native lazy-loading.
                image.setAttribute("loading", "lazy");
            });
        }

        if (headings.length) {
            headings.forEach(heading => {
                let headingId = slugify(heading.textContent, slugifyOptions);
                heading.setAttribute("id", headingId);
            });
        }

        if (tocHeadings.length) {
            const toc = document.querySelector("nav.toc");
            tocHeadings.forEach(heading => {
                let headingUrl = `#${slugify(heading.textContent, slugifyOptions)}`;
                let tocItem = document.createElement("p");
                tocItem.className = heading.tagName.replace("H", "level-");
                tocItem.innerHTML = `<a href="${headingUrl}">${heading.textContent}</a>`;
                toc.appendChild(tocItem);
            });
        }

        return "<!DOCTYPE html>\r\n" + document.documentElement.outerHTML;
    }
    return value;
};
