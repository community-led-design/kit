/* global CMS */

"use strict";

CMS.registerEditorComponent({
    id: "accordion",
    label: "Accordion",
    fields: [{
        name: "content",
        label: "Content",
        widget: "markdown"
    }],
    pattern: /^{% accordion %}([\s\S]*?){% endaccordion %}/,
    fromBlock: function (match) {
        return {
            content: match[1]
        };
    },
    toBlock: function (obj) {
        return `{% accordion %}\n${obj.content}\n{% endaccordion %}`;
    },
    toPreview: function (obj) {
        var md = window.markdownit();
        var content = obj.content ? md.render(obj.content) : "";
        return `<div class="accordion">${content}</div>`;
    }
});
