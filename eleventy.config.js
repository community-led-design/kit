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
const path = require("path");

const fluidPlugin = require("eleventy-plugin-fluid");
const rssPlugin = require("@11ty/eleventy-plugin-rss");
const navigationPlugin = require("@11ty/eleventy-navigation");
const eleventyImage = require("@11ty/eleventy-img");

const exampleBlockShortcode = require("./src/shortcodes/example-block.js");
const learningBlockShortcode = require("./src/shortcodes/learning-block.js");
const pullquoteShortcode = require("./src/shortcodes/pullquote.js");

function imageShortcode(src, alt, sizes, widths) {
    let options = {
        widths: widths,
        formats: ["jpeg"],
        outputDir: "./dist/assets/media/generated",
        urlPath: "/assets/media/generated/",
        sharpJpegOptions: {
            quality: 99,
            progressive: true
        }
    };
    let source = path.join(__dirname, "src/" , src);
    eleventyImage(source, options);

    let imageAttributes = {
        alt,
        sizes,
        loading: "lazy"
    };

    let metadata = eleventyImage.statsSync(source, options);
    return eleventyImage.generateHTML(metadata, imageAttributes);
}

// Import transforms
const parseTransform = require("./src/transforms/parse-transform.js");

module.exports = function (eleventyConfig) {
    eleventyConfig.setUseGitIgnore(false);

    // Shortcodes
    eleventyConfig.addPairedShortcode("accordion", content => {
        return `<div class="accordion flow">\n${content}\n</div>`;
    });
    eleventyConfig.addPairedShortcode("example", exampleBlockShortcode);
    eleventyConfig.addPairedShortcode("learning", learningBlockShortcode);
    eleventyConfig.addPairedShortcode("pullquote", pullquoteShortcode);

    eleventyConfig.addNunjucksShortcode("resizeImage", imageShortcode);

    // Transforms
    eleventyConfig.addTransform("parse", parseTransform);

    // Passthrough copy
    eleventyConfig.addPassthroughCopy({"src/assets/fonts": "assets/fonts"});
    eleventyConfig.addPassthroughCopy({"src/assets/icons/": "/"});
    eleventyConfig.addPassthroughCopy({"src/assets/images": "assets/images"});
    eleventyConfig.addPassthroughCopy({"src/assets/media": "assets/media"});
    eleventyConfig.addPassthroughCopy("src/admin/config.yml");
    eleventyConfig.addPassthroughCopy("src/admin/*.js");
    eleventyConfig.addPassthroughCopy({"node_modules/infusion/src/lib/hypher/patterns": "lib/infusion/src/lib/hypher/patterns"});

    // Plugins
    eleventyConfig.addPlugin(fluidPlugin, {
        css: {
            enabled: false
        },
        sass: {
            enabled: true
        },
        i18n: false
    });
    eleventyConfig.addPlugin(rssPlugin);
    eleventyConfig.addPlugin(navigationPlugin);

    // Collections

    eleventyConfig.addCollection("resources", collection => {
        return [
            ...collection.getFilteredByGlob("src/collections/resources/*.md").sort((a, b) => b.data.order - a.data.order)
        ].reverse();
    });

    eleventyConfig.addCollection("caseStudies", collection => {
        return [
            ...collection.getFilteredByGlob("src/collections/case-studies/*.md").sort((a, b) => b.data.order - a.data.order)
        ].reverse();
    });

    // 404
    eleventyConfig.setBrowserSyncConfig({
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
