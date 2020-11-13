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

module.exports = function (value, outputPath) {
    if (outputPath.endsWith(".html")) {
        const DOM = new JSDOM(value, {
            resources: "usable"
        });

        const document = DOM.window.document;
        const articleImages = [...document.querySelectorAll("main article img")];
        const headings = [...document.querySelectorAll("main article h2, main article h3, main article h4")];

        if (articleImages.length) {
            articleImages.forEach(image => {
                // Enable native lazy-loading.
                image.setAttribute("loading", "lazy");
            });
        }

        const toc = document.querySelector(".toc");

        if (headings.length && toc) {
            const tocNav = document.createElement("nav");
            const tocUl = document.createElement("ul");
            tocNav.setAttribute("aria-label", "Secondary Navigation");

            headings.forEach(heading => {
                let headingId = slugify(heading.textContent, {
                    replacement: "-",
                    lower: true,
                    strict: true
                });
                headingId = headingId.replace(/co\-design/g, "codesign");
                heading.setAttribute("id", headingId);

                const tocLi = document.createElement("li");
                const tocLink = document.createElement("a");
                tocLink.setAttribute("href", `#${headingId}`);
                tocLink.textContent = heading.textContent;
                tocLi.appendChild(tocLink);
                tocUl.appendChild(tocLi);
            });

            tocNav.appendChild(tocUl);
            toc.appendChild(tocNav);
            toc.classList.remove("hidden");
        }

        return "<!DOCTYPE html>\r\n" + document.documentElement.outerHTML;
    }
    return value;
};
