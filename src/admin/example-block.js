
/* global CMS */

"use strict";

CMS.registerEditorComponent({
    id: "learning-block",
    label: "Learning Block",
    fields: [
        {
            name: "content",
            label: "Content",
            widget: "markdown"
        },
        {
            name: "title",
            label: "Title",
            widget: "string"
        }
    ],
    pattern: /^{% example "([\s\S]*?)" %}([\s\S]*?){% endexample %}/,
    fromBlock: function (match) {
        return {
            title: match[1],
            content: match[2]
        };
    },
    toBlock: function (obj) {
        return `{% example "${obj.title}" %}\n${obj.content}\n{% endexample %}`;
    },
    toPreview: function (obj) {
        var md = window.markdownit();
        var content = obj.content ? md.render(obj.content) : "";
        return `<div class="block example-block"><p class="h4">${obj.title || "Example"}</p>${content}</div>`;
    }
});
