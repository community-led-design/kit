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
        const tocHeadings = [...document.querySelectorAll(".inner-content h2")];
        const tocUl = document.querySelector("nav.toc .toc-menu > ul");

        if (articleImages.length) {
            articleImages.forEach(image => {
                // Enable native lazy-loading.
                image.setAttribute("loading", "lazy");
            });
        }

        if (headings.length) {
            headings.forEach(heading => {
                let headingId = slugify(heading.textContent, slugifyOptions);
                if (!heading.getAttribute("id")) {
                    heading.setAttribute("id", headingId);
                }
            });
        }

        if (tocHeadings.length && tocUl) {

            let i = 0;
            tocHeadings.forEach(heading => {
                if (i > 0) {
                    const skipBack = document.createElement("p");
                    skipBack.className = "back-to-top";
                    skipBack.innerHTML = "<a href=\"#toc\">Table of contents &uarr;</a>";
                    heading.parentNode.insertBefore(skipBack, heading);
                }
                const tocItem = document.createElement("li");
                tocItem.innerHTML = `<a href="#${slugify(heading.textContent, slugifyOptions)}">${heading.textContent}</a>`;
                tocUl.appendChild(tocItem);
                i++;
            });

            const skipBack = document.createElement("p");
            skipBack.className = "back-to-top";
            skipBack.innerHTML = "<a href=\"#toc\">Table of contents &uarr;</a>";
            document.querySelector(".inner-content").appendChild(skipBack);
        }

        return "<!DOCTYPE html>\r\n" + document.documentElement.outerHTML;
    }
    return value;
};
