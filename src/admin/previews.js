/* global CMS, createClass, h */

"use strict";

const PagePreview = createClass({
    render: function () {
        const entry = this.props.entry;
        return h("article", {},
            h("header", {"className": "header bg-blue-100"},
                h("div", {"className": "wrapper"},
                    h("h1", {}, entry.getIn(["data", "title"]) || "Untitled")
                )
            ),
            h("div", {"className": "content"},
                h("div", {"className": "inner-content"},
                    this.props.widgetFor("body")
                )
            )
        );
    }
});

const ResourcePreview = createClass({
    render: function () {
        const entry = this.props.entry;
        const subtitle = `<strong>${entry.getIn(["data", "type"]) || "Resource"}</strong> for <strong>${entry.getIn(["data", "buildingBlock"]) || "Co-design"}</strong>`;
        return h("article", {},
            h("header", {"className": "header bg-white"},
                h("div", {"className": "wrapper"},
                    h("h1", {}, entry.getIn(["data", "title"]) || "Untitled"),
                    h("p", {"className": "subtitle text-scale-2 weight-normal", dangerouslySetInnerHTML: {__html: subtitle}})
                )
            ),
            h("div", {"className": "content bg-blue-100"},
                h("div", {"className": "inner-content"},
                    this.props.widgetFor("body")
                )
            )
        );
    }
});

const CaseStudyPreview = createClass({
    render: function () {
        const entry = this.props.entry;
        const authors = entry.getIn(["data", "authors"]) ? `By ${entry.getIn(["data", "authors"]).join(", ").replace(/,(?!.*,)/gmi, " and")}` : "";
        const organization = entry.getIn(["data", "organization"]) ? `, ${entry.getIn(["data", "organization"])}` : "";
        const startDate = entry.getIn(["data", "startDate"]) || false;
        const endDate = entry.getIn(["data", "endDate"]) || false;
        let date = "";
        if (startDate && endDate) {
            if (startDate === endDate) {
                date = `<br />${startDate}`;
            } else {
                date = `<br />${startDate}–${endDate}`;
            }
        } else if (startDate) {
            date = `<br />${startDate}–present`;
        }
        const meta = `${authors}${organization}${date}`;
        return h("article", {},
            h("header", {"className": "header bg-white"},
                h("div", {"className": "wrapper"},
                    h("h1", {}, entry.getIn(["data", "title"]) || "Untitled"),
                    h("p", {"className": "subtitle text-scale-2 weight-bold"}, entry.getIn(["data", "subtitle"]) || ""),
                    h("p", {"className": "meta mt-scale-6", dangerouslySetInnerHTML: {__html: meta}})
                )
            ),
            h("div", {"className": "content bg-green-100"},
                h("div", {"className": "inner-content"},
                    this.props.widgetFor("body")
                )
            )
        );
    }
});

CMS.registerPreviewTemplate("pages", PagePreview);
CMS.registerPreviewTemplate("resources", ResourcePreview);
CMS.registerPreviewTemplate("case-studies", CaseStudyPreview);
