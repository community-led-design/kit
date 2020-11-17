/* global CMS */

"use strict";

CMS.registerEditorComponent({
    id: "figure",
    label: "Figure",
    fields: [
        {
            name: "image",
            label: "Image",
            widget: "image"
        },
        {
            name: "altText",
            label: "Alternative Text",
            widget: "string"
        },
        {
            name: "caption",
            label: "Caption",
            widget: "markdown"
        }
    ],
    pattern: /{% figure "([\s\S]*?)", "([\s\S]*?)" %}([\s\S]*?){% endfigure %}/,
    fromBlock: function (match) {
        return {
            image: match[1],
            altText: match[2],
            caption: match[3]
        };
    },
    toBlock: function (obj) {
        return `{% figure "${obj.image}", "${obj.altText}" %}\n${obj.caption}\n{% endfigure %}`;
    },
    toPreview: function (obj) {
        var md = window.markdownit();
        var caption = obj.caption ? `<figcation>${md.render(obj.caption)}</figcaption>` : "";
        return `<figure><img src="${obj.image}" alt="${obj.altText}" />${caption}</figure>`;
    }
});
