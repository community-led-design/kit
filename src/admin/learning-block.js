
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
    pattern: /^{% learning "([\s\S]*?)" %}([\s\S]*?){% learning %}/,
    fromBlock: function (match) {
        return {
            title: match[1],
            content: match[2]
        };
    },
    toBlock: function (obj) {
        return `{% learning "${obj.title}" %}\n${obj.content}\n{% learning %}`;
    },
    toPreview: function (obj) {
        var md = window.markdownit();
        var content = obj.content ? md.render(obj.content) : "";
        return `<div class="learning-block"><p class="h4">${obj.title || "Learning"}</p>${content}</div>`;
    }
});
