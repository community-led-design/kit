
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
        return `<blockquote>${quote}${citation}</blockquote>`;
    }
});
