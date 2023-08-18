/*
Copyright the Fluidic Eleventy copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/community-led-design/kit/raw/master/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/community-led-design/kit/raw/master/LICENSE.md.
*/

require("./components/_nav.js");

import Accordion from "./components/_accordion.js";

window.accordions = new Accordion(".accordion", {
    header: "h3",
    icon: "<svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><line x1=\"1\" y1=\"5.85718\" x2=\"11\" y2=\"5.85718\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><line class=\"vertical\" x1=\"6.14282\" y1=\"1\" x2=\"6.14282\" y2=\"11\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>"
});

document.documentElement.style.setProperty("--scrollbar-width", (window.innerWidth - document.documentElement.clientWidth) + "px");
