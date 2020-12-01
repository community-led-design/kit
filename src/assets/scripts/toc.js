"use strict";

const toc = document.querySelector(".toc");

toc.addEventListener("click", function (event) {
    const btn = event.target.closest("[aria-expanded]");
    if (!btn) {
        return;
    }

    const expanded = btn.getAttribute("aria-expanded") === "true" || false;
    btn.setAttribute("aria-expanded", !expanded);
});
