/*
Copyright the Fluidic Eleventy copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/community-led-design/kit/raw/master/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/community-led-design/kit/raw/master/LICENSE.md.
*/

import Accordion from './components/_accordion.js';

globalThis.accordions = new Accordion('.accordion', {
	header: 'h3',
	icon: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="1" y1="5.85718" x2="11" y2="5.85718" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line class="vertical" x1="6.14282" y1="1" x2="6.14282" y2="11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
});

/* Nav */

const menuItems = document.querySelectorAll('#menu ul a');
const menuToggle = document.querySelector('#menu-toggle');

const dropdownLinks = [...document.querySelectorAll('.nav .submenu-parent > a, .nav .submenu-parent > p')];
const dropdownButtons = [];

/**
 * Collapse the menu.
 */
const collapseMenu = () => {
	menuToggle.setAttribute('aria-expanded', false);
};

/**
 * Collapse the submenu corresponding to the toggle button `btn`.
 * @param {HTMLElement} btn - The toggle button whose submenu should be collapsed.
 */
const collapseSubmenu = (btn) => {
	btn.setAttribute('aria-expanded', false);
	btn.parentNode.classList.remove('submenu-parent--submenu-visible');
};

/**
 * Collapse the menu and any open submenus.
 */
const collapseAll = () => {
	collapseMenu();
	for (const btn of dropdownButtons) {
		collapseSubmenu(btn);
	}
};

// Create submenu buttons and submenus
for (const link of dropdownLinks) {
	const toggleButton = document.createElement('button');
	const dropdown = link.nextElementSibling;

	if (link.getAttribute('href')) {
		const overviewLink = link.cloneNode();
		overviewLink.dataset.parent = false;
		overviewLink.textContent = 'Overview';
		dropdown.insertBefore(overviewLink, dropdown.firstElementChild);
	}

	toggleButton.classList.add('submenu-toggle');
	toggleButton.setAttribute('aria-expanded', 'false');
	toggleButton.innerHTML = `${link.textContent} <svg class="inline" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.912109 0.990478L5.91211 5.99048L10.9121 0.990477" stroke="currentColor" stroke-width="2"/></svg>`;

	if (link.dataset.parent || link.getAttribute('aria-current') === 'page') {
		toggleButton.dataset.parent = true;
	}

	link.replaceWith(toggleButton);

	dropdownButtons.push(toggleButton);
}

// Handle click event on menu toggle button.
document.addEventListener('click', (event) => {
	if (!event.target.closest('#menu-toggle')) {
		return;
	}

	const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
	menuToggle.setAttribute('aria-expanded', !expanded);
});

// Handle click event on submenu toggle button.
document.addEventListener('click', (event) => {
	if (!event.target.closest('.submenu-toggle')) {
		return;
	}

	const submenuToggle = event.target.closest('.submenu-toggle');

	const expanded = submenuToggle.getAttribute('aria-expanded') === 'true' || false;
	submenuToggle.setAttribute('aria-expanded', !expanded);

	for (const btn of dropdownButtons) {
		if (btn !== submenuToggle) {
			collapseSubmenu(btn);
		}
	}

	submenuToggle.parentNode.classList.toggle('submenu-parent--submenu-visible', !expanded);
});

// Collapse menu and/or submenus if a click happens outside of the menu.
document.addEventListener('click', (event) => {
	if (menuToggle.getAttribute('aria-expanded' !== 'true') && document.querySelectorAll('.menu [aria-expanded="true"]').length === 0) {
		return;
	}

	if (!event.target.closest('#menu')) {
		collapseAll();
	}
});

// Collapse menu and/or submenus on <esc>.
document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
		collapseAll();
	}
});

// Handle blur on menu items.
for (const menuItem of menuItems) {
	menuItem.addEventListener('blur', (event) => {
		if (event.target === menuItems.at(-1) && event.relatedTarget && event.relatedTarget.parentNode.nodeName !== 'LI') {
			collapseAll();
		}
	});
}

document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + 'px');
