
/* global CMS */

"use strict";

CMS.registerEditorComponent({
    id: "pullquote",
    label: "Pullquote",
    fields: [
        {
            name: "quote",
            label: "Quote",
            widget: "markdown"
        },
        {
            name: "author",
            label: "Author",
            widget: "string"
        }
    ],
    pattern: /^{% pullquote "([\s\S]*?)" %}([\s\S]*?){% endpullquote %}/,
    fromBlock: function (match) {
        return {
            author: match[1],
            quote: match[2]
        };
    },
    toBlock: function (obj) {
        return `{% pullquote "${obj.author}" %}\n${obj.quote}\n{% endpullquote %}`;
    },
    toPreview: function (obj) {
        var md = window.markdownit();
        var quote = obj.quote ? md.render(obj.quote) : "";
        var citation = obj.author ? `<cite>${obj.author}</cite>` : "";
        return `<blockquote><svg width="33" height="28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M25.08 27.96c-2.24-1.04-3.92-2.36-5.04-3.96-1.04-1.6-1.56-3.56-1.56-5.88 0-5.52 3.24-11.4 9.72-17.64l4.44 3 .12.96c-3.28 3.52-4.92 6.88-4.92 10.08 0 1.68.36 3.16 1.08 4.44.72 1.2 1.92 2.2 3.6 3v1.08c-2.24 2-4.72 3.64-7.44 4.92zm-17.52 0C5.32 26.92 3.64 25.6 2.52 24 1.48 22.4.96 20.44.96 18.12.96 12.6 4.2 6.72 10.68.48l4.44 3 .12.96c-3.28 3.52-4.92 6.88-4.92 10.08 0 1.68.36 3.16 1.08 4.44.72 1.2 1.92 2.2 3.6 3v1.08c-2.24 2-4.72 3.64-7.44 4.92z" fill="currentColor"/></svg>${quote}${citation}</blockquote>`;
    }
});
