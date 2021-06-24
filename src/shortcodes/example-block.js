"use strict";

const MarkdownIt = require("markdown-it");

module.exports = (content, title) => {
    if (title === "") {
        title = "Example";
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
    return `<div class="block example-block">\n<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><g fill="currentColor"><path d="m10 5.92a4.14 4.14 0 0 0 -4.14 4.13 3.53 3.53 0 0 0 .95 2.54 1.58 1.58 0 0 1 .51 1.1v.73s0 0 0 .05v1.23a1.38 1.38 0 0 0 .2.66.51.51 0 0 0 0 .17 2.5 2.5 0 0 0 5 0 .51.51 0 0 0 0-.17 1.38 1.38 0 0 0 .2-.66v-1.23s0 0 0-.05v-.73a1.58 1.58 0 0 1 .51-1.1 3.53 3.53 0 0 0 1-2.54 4.14 4.14 0 0 0 -4.23-4.13zm1.67 9.78a.34.34 0 0 1 -.34.33h-2.66a.34.34 0 0 1 -.34-.33v-.78h3.34zm-1.67 2.3a1.49 1.49 0 0 1 -1.41-1h2.82a1.49 1.49 0 0 1 -1.41 1zm2.41-6a2.55 2.55 0 0 0 -.73 1.73v.23h-3.36v-.23a2.55 2.55 0 0 0 -.73-1.73 2.57 2.57 0 0 1 -.73-1.91 3.14 3.14 0 0 1 6.28 0 2.57 2.57 0 0 1 -.73 1.91z"/><path d="m3 9h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/><path d="m18 9h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/><path d="m10 3.44a.5.5 0 0 0 .5-.5v-1a.5.5 0 1 0 -1 0v1a.5.5 0 0 0 .5.5z"/><path d="m15.35 4.15-.7.7a.51.51 0 0 0 -.15.36.49.49 0 0 0 .15.35.48.48 0 0 0 .7 0l.36-.35.35-.36a.48.48 0 0 0 0-.7.5.5 0 0 0 -.71 0z"/><path d="m4.65 4.15a.5.5 0 0 0 -.71 0 .48.48 0 0 0 0 .7l.35.36.36.35a.48.48 0 0 0 .7 0 .49.49 0 0 0 .15-.35.51.51 0 0 0 -.15-.36z"/></g></svg>\n<p class="h4">${title}</p>\n${renderedContent}\n</div>`;
};
