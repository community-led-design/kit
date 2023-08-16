"use strict";

module.exports = {
    extends: [
        "fluid",
        "plugin:yml/standard"
    ],
    ignorePatterns: ["_site/", "backstop_data/", "!.*.cjs", "!.*.js", "!.github"],
    env: {
        amd: true,
        browser: true,
        node: true,
        es6: true
    },
    parserOptions: {
        ecmaVersion: 2020
    },
    overrides: [{
        files: ["src/assets/scripts/components/_accordion.js", "src/assets/scripts/app.js"],
        parserOptions: {
            sourceType: "module"
        }
    }]
};
