"use strict";

fluid.uiOptions(".flc-prefsEditor-separatedPanel", {
    preferences: [
        "fluid.prefs.lineSpace",
        "fluid.prefs.textFont",
        "fluid.prefs.contrast",
        "fluid.prefs.enhanceInputs",
        "fluid.prefs.syllabification"
    ],
    auxiliarySchema: {
        terms: {
            "templatePrefix": "/lib/infusion/src/framework/preferences/html",
            "messagePrefix": "/lib/infusion/src/framework/preferences/messages"
        }, "fluid.prefs.syllabification": {
            enactor: {
                terms: {
                    patternPrefix: "/lib/infusion/src/lib/hypher/patterns"
                }
            }
        }
    },
    prefsEditorLoader: {
        lazyLoad: true
    },
    schema: {
        properties: {
            "fluid.prefs.lineSpace": {
                "minimum": 1
            }
        }
    }
});
