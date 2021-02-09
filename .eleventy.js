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
const MarkdownIt = require("markdown-it");

const fluidPlugin = require("eleventy-plugin-fluid");
const rssPlugin = require("@11ty/eleventy-plugin-rss");
const navigationPlugin = require("@11ty/eleventy-navigation");
const eleventyImage = require("@11ty/eleventy-img");

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
const htmlMinTransform = require("./src/transforms/html-min-transform.js");
const parseTransform = require("./src/transforms/parse-transform.js");

module.exports = function (config) {
    config.setUseGitIgnore(false);

    // Shortcodes
    config.addPairedShortcode("accordion", content => {
        return `<div class="accordion flow">\n${content}\n</div>`;
    });
    config.addPairedShortcode("learning", (content, title) => {
        if (title === "") {
            title = "Learning";
        }

        let renderedContent;

        if (content.trim()) {
            const md = new MarkdownIt({
                html: true,
                breaks: true,
                linkify: true
            });

            renderedContent = md.render(content).trim();
        } else {
            renderedContent = "";
        }
        return `<div class="learning-block">\n<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><g fill="currentColor"><path d="m10 5.92a4.14 4.14 0 0 0 -4.14 4.13 3.53 3.53 0 0 0 .95 2.54 1.58 1.58 0 0 1 .51 1.1v.73s0 0 0 .05v1.23a1.38 1.38 0 0 0 .2.66.51.51 0 0 0 0 .17 2.5 2.5 0 0 0 5 0 .51.51 0 0 0 0-.17 1.38 1.38 0 0 0 .2-.66v-1.23s0 0 0-.05v-.73a1.58 1.58 0 0 1 .51-1.1 3.53 3.53 0 0 0 1-2.54 4.14 4.14 0 0 0 -4.23-4.13zm1.67 9.78a.34.34 0 0 1 -.34.33h-2.66a.34.34 0 0 1 -.34-.33v-.78h3.34zm-1.67 2.3a1.49 1.49 0 0 1 -1.41-1h2.82a1.49 1.49 0 0 1 -1.41 1zm2.41-6a2.55 2.55 0 0 0 -.73 1.73v.23h-3.36v-.23a2.55 2.55 0 0 0 -.73-1.73 2.57 2.57 0 0 1 -.73-1.91 3.14 3.14 0 0 1 6.28 0 2.57 2.57 0 0 1 -.73 1.91z"/><path d="m3 9h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/><path d="m18 9h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/><path d="m10 3.44a.5.5 0 0 0 .5-.5v-1a.5.5 0 1 0 -1 0v1a.5.5 0 0 0 .5.5z"/><path d="m15.35 4.15-.7.7a.51.51 0 0 0 -.15.36.49.49 0 0 0 .15.35.48.48 0 0 0 .7 0l.36-.35.35-.36a.48.48 0 0 0 0-.7.5.5 0 0 0 -.71 0z"/><path d="m4.65 4.15a.5.5 0 0 0 -.71 0 .48.48 0 0 0 0 .7l.35.36.36.35a.48.48 0 0 0 .7 0 .49.49 0 0 0 .15-.35.51.51 0 0 0 -.15-.36z"/></g></svg>\n<p class="h4">${title}</p>\n${renderedContent}\n</div>`;
    });

    config.addPairedShortcode("pullquote", (content, author) => {
        let citation;

        if (author === "") {
            citation = "";
        } else {
            citation = `<cite>${author}</cite>`;
        }

        let renderedContent;

        if (content.trim()) {
            const md = new MarkdownIt({
                html: true,
                breaks: true,
                linkify: true
            });

            renderedContent = md.render(content).trim();
        } else {
            renderedContent = "";
        }
        return `<blockquote>\n<svg width="33" height="28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M25.08 27.96c-2.24-1.04-3.92-2.36-5.04-3.96-1.04-1.6-1.56-3.56-1.56-5.88 0-5.52 3.24-11.4 9.72-17.64l4.44 3 .12.96c-3.28 3.52-4.92 6.88-4.92 10.08 0 1.68.36 3.16 1.08 4.44.72 1.2 1.92 2.2 3.6 3v1.08c-2.24 2-4.72 3.64-7.44 4.92zm-17.52 0C5.32 26.92 3.64 25.6 2.52 24 1.48 22.4.96 20.44.96 18.12.96 12.6 4.2 6.72 10.68.48l4.44 3 .12.96c-3.28 3.52-4.92 6.88-4.92 10.08 0 1.68.36 3.16 1.08 4.44.72 1.2 1.92 2.2 3.6 3v1.08c-2.24 2-4.72 3.64-7.44 4.92z" fill="currentColor"/></svg>\n${renderedContent}\n${citation}\n</blockquote>`;
    });

    config.addNunjucksShortcode("resizeImage", imageShortcode);

    // Transforms
    config.addTransform("htmlmin", htmlMinTransform);
    config.addTransform("parse", parseTransform);

    // Passthrough copy
    config.addPassthroughCopy({"src/assets/fonts": "assets/fonts"});
    config.addPassthroughCopy({"src/assets/icons/": "/"});
    config.addPassthroughCopy({"src/assets/images": "assets/images"});
    config.addPassthroughCopy({"src/assets/media": "assets/media"});
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
