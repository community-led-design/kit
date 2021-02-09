/* global CMS */

"use strict";

/** Note: this replaces the default image editor component. Seems to work? */
CMS.registerEditorComponent({
    id: "image",
    label: "Image",
    fields: [
        {
            name: "image",
            label: "Image",
            widget: "image",
            required: true
        },
        {
            name: "alt",
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
    fromBlock: match =>
        match && {
            image: match[1],
            alt: match[2],
            caption: match[3]
        },
    toBlock: function ({alt, image, caption}) {
        return `{% figure "${image || ""}", "${alt.replace(/"/g, "&quot;") || ""}" %}\n${caption || ""}\n{% endfigure %}`;
    },
    toPreview: ({alt, image, caption}) => {
        const md = window.markdownit();
        const figcaption = caption ? `<figcaption>${md.render(caption)}</figcaption>` : "";
        return `<figure><img src="${image}" alt="${alt.replace(/"/g, "&quot;") || ""}" />${figcaption}</figure>`;
    }
});
