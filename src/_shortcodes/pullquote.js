"use strict";

const MarkdownIt = require("markdown-it");

module.exports = (content, author) => {
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
            linkify: true,
            typographer: true
        });

        renderedContent = md.render(content).trim();
    } else {
        renderedContent = "";
    }
    return `<blockquote>\n<svg width="33" height="28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M25.08 27.96c-2.24-1.04-3.92-2.36-5.04-3.96-1.04-1.6-1.56-3.56-1.56-5.88 0-5.52 3.24-11.4 9.72-17.64l4.44 3 .12.96c-3.28 3.52-4.92 6.88-4.92 10.08 0 1.68.36 3.16 1.08 4.44.72 1.2 1.92 2.2 3.6 3v1.08c-2.24 2-4.72 3.64-7.44 4.92zm-17.52 0C5.32 26.92 3.64 25.6 2.52 24 1.48 22.4.96 20.44.96 18.12.96 12.6 4.2 6.72 10.68.48l4.44 3 .12.96c-3.28 3.52-4.92 6.88-4.92 10.08 0 1.68.36 3.16 1.08 4.44.72 1.2 1.92 2.2 3.6 3v1.08c-2.24 2-4.72 3.64-7.44 4.92z" fill="currentColor"/></svg>\n${renderedContent}\n${citation}\n</blockquote>`;
};
