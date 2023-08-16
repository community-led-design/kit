/*
Copyright the Fluidic Eleventy copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/inclusive-design/co-design.inclusivedesign.ca/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/inclusive-design/co-design.inclusivedesign.ca/raw/main/LICENSE.md.
*/

"use strict";

const path = require("path");
const fluidPlugin = require("eleventy-plugin-fluid");
const rssPlugin = require("@11ty/eleventy-plugin-rss");
const navigationPlugin = require("@11ty/eleventy-navigation");
const eleventyImage = require("@11ty/eleventy-img");

const exampleBlockShortcode = require("./src/_shortcodes/example-block.js");
const learningBlockShortcode = require("./src/_shortcodes/learning-block.js");
const pullquoteShortcode = require("./src/_shortcodes/pullquote.js");

function imageShortcode(src, alt, sizes, widths) {
    let options = {
        widths: widths,
        formats: ["jpeg"],
        outputDir: "./_site/assets/media/generated",
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
const parseTransform = require("./src/_transforms/parse-transform.js");

module.exports = function (eleventyConfig) {
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
    eleventyConfig.addPassthroughCopy({
        "node_modules/netlify-cms/dist/netlify-cms.js": "lib/cms/netlify-cms.js",
        "node_modules/netlify-cms/dist/netlify-cms.js.map": "lib/cms/netlify-cms.js.map",
        "node_modules/@babel/standalone/babel.min.js": "lib/cms/babel.min.js",
        "node_modules/@babel/standalone/babel.min.js.map": "lib/cms/babel.min.js.map",
        "node_modules/markdown-it/dist/markdown-it.min.js": "lib/cms/markdown-it.min.js",
        "node_modules/prop-types/prop-types.min.js": "lib/cms/prop-types.min.js",
        "node_modules/react/umd/react.development.js": "lib/cms/react.development.js",
        "node_modules/react/umd/react.production.min.js": "lib/cms/react.production.min.js"
    });
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

    return {
        dir: {
            input: "src"
        },
        passthroughFileCopy: true,
        markdownTemplateEngine: "njk"
    };
};
