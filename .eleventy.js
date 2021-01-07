/*
Copyright the Fluidic Eleventy copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/inclusive-design/codesign.inclusivedesign.ca/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/inclusive-design/codesign.inclusivedesign.ca/raw/main/LICENSE.md.
*/

"use strict";

const fs = require("fs");

const fluidPlugin = require("eleventy-plugin-fluid");
const rssPlugin = require("@11ty/eleventy-plugin-rss");
const navigationPlugin = require("@11ty/eleventy-navigation");

// Import transforms
const htmlMinTransform = require("./src/transforms/html-min-transform.js");
const parseTransform = require("./src/transforms/parse-transform.js");

module.exports = function (config) {
    config.setUseGitIgnore(false);

    // Shortcodes
    config.addPairedShortcode("accordion", content => {
        return `<div class="accordion space-y-4">\n${content}\n</div>`;
    });

    // Transforms
    config.addTransform("htmlmin", htmlMinTransform);
    config.addTransform("parse", parseTransform);

    // Passthrough copy
    config.addPassthroughCopy({"src/assets/fonts": "assets/fonts"});
    config.addPassthroughCopy({"src/assets/icons/": "/"});
    config.addPassthroughCopy({"src/assets/images": "assets/images"});
    config.addPassthroughCopy("src/admin/config.yml");
    config.addPassthroughCopy("src/admin/*.js");
    config.addPassthroughCopy("src/robots.txt");
    config.addPassthroughCopy({"node_modules/infusion/src/lib/hypher/patterns": "lib/infusion/src/lib/hypher/patterns"});

    // Plugins
    config.addPlugin(fluidPlugin);
    config.addPlugin(rssPlugin);
    config.addPlugin(navigationPlugin);

    // Collections

    config.addCollection("resources", collection => {
        return [
            ...collection.getFilteredByGlob("src/resources/*.md").sort((a, b) => b.data.order - a.data.order)
        ].reverse();
    });

    config.addCollection("caseStudies", collection => {
        return [
            ...collection.getFilteredByGlob("src/case-studies/*.md").sort((a, b) => b.data.order - a.data.order)
        ].reverse();
    });

    // 404
    config.setBrowserSyncConfig({
        callbacks: {
            ready: function (err, bs) {

                bs.addMiddleware("*", (req, res) => {
                    const content_404 = fs.readFileSync("dist/404.html");
                    // Provides the 404 content without redirect.
                    res.write(content_404);
                    res.writeHead(404);
                    res.end();
                });
            }
        }
    });

    return {
        dir: {
            input: "src",
            output: "dist",
            includes: "_includes"
        },
        passthroughFileCopy: true
    };
};
