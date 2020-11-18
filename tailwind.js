
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
        colors: {
            black: "#000",
            white: "#fff",
            blue: {
                100: "#eef3f9",
                300: "#41cdfa",
                500: "#1362b4",
                600: "#1b4066"
            },
            green: {
                100: "#e8f3f2",
                300: "#98d1cd",
                500: "#375c59",
                600: "#233938"
            },
            yellow: {
                100: "#f5d9c7",
                300: "#f6b026",
                500: "#ce9b62"
            }
        },
        fontFamily: {
            body: ["Alegreya Sans", "sans-serif"]
        },
        fontSize: {
            sm: "0.875rem",
            base: "1.125rem",
            lg: "1.25rem",
            xl: "1.5rem",
            "2xl": "1.75rem",
            "3xl": "2rem",
            "4xl": "2.5rem",
            "5xl": "3rem",
            "6xl": "4.5rem"
        },
        extend: {
            borderWidth: {
                "3": "3px"
            }
        }
    },
    variants: {},
    plugins: []
};
