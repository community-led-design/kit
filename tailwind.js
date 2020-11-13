
"use strict";

module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true
    },
    purge: [
        "./src/**/*.njk",
        "./src/**/*.svg"
    ],
    theme: {
        extend: {}
    },
    variants: {},
    plugins: []
};
