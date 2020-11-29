/*
Copyright the Fluidic Eleventy copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/inclusive-design/codesign.inclusivedesign.ca/raw/master/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/inclusive-design/codesign.inclusivedesign.ca/raw/master/LICENSE.md.
*/

"use strict";

const formatMenu = document.getElementById("format");
const buildingBlockMenu = document.getElementById("building-block");
const clearFilters = document.getElementById("clear-filters");
const resources = document.getElementById("resources");
const results = document.getElementById("results");

const applyFilters = function () {
    const format = formatMenu.value;
    const buildingBlock = buildingBlockMenu.value;

    const formatLabel = (format !== "") ? formatMenu.querySelector(`[value="${format}"]`).innerText : false;
    const buildingBlockLabel = (buildingBlock !== "") ? buildingBlockMenu.querySelector(`[value="${buildingBlock}"]`).innerText : false;

    const filterString = [format, buildingBlock].join(" ").trim();

    let count = 0;

    [...resources.querySelectorAll(".card")].forEach(function (card) {
        if (filterString === "") {
            card.removeAttribute("hidden");
        } else {
            if (card.dataset.filter.includes(filterString)) {
                card.removeAttribute("hidden");
                count++;
            } else {
                card.setAttribute("hidden", "");
            }
        }
    });

    let resultsMessage = `<strong>${count} ${ (count === 1) ? "resource" : "resources" }</strong> matched `;

    if (formatLabel && buildingBlockLabel) {
        resultsMessage = `${resultsMessage} <strong>${formatLabel}</strong> for <strong>${buildingBlockLabel}</strong>${ (count === 0) ? "." : ":" }`;
    } else if (formatLabel) {
        resultsMessage = `${resultsMessage} <strong>${formatLabel}</strong>${ (count === 0) ? "." : ":" }`;
    } else if (buildingBlockLabel) {
        resultsMessage = `${resultsMessage} <strong>${buildingBlockLabel}</strong>${ (count === 0) ? "." : ":" }`;
    } else {
        resultsMessage = "";
    }
    results.innerHTML = resultsMessage;
};

formatMenu.addEventListener("change", applyFilters);
buildingBlockMenu.addEventListener("change", applyFilters);

clearFilters.addEventListener("click", function () {
    formatMenu.value = "";
    buildingBlockMenu.value = "";

    applyFilters();
});
