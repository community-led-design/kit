/**
 * @module Accordion
 * @description Progressively-enhanced accordion component.
 * @param {string} selector - The selector of a container element for the accordion.
 * @param {object} options - Object of options for the accordion.
 */
export default class Accordion {
	/**
	 * Constructor.
	 * @param {string} selector - The selector of a container element for the accordion.
	 * @param {object} options - Object of options for the accordion.
	 */
	constructor(selector, options = {}) {
		const defaults = {
			header: 'h2',
			exclusive: false,
			icon: false,
			onCreate: null,
			onExpand: null,
			onCollapse: null,
		};

		this.accordions = document.querySelectorAll(selector);
		this.options = { selector, ...defaults, ...options };

		Array.prototype.forEach.call(this.accordions, (accordion) => {
			this.createAccordion(accordion);
		});

		this.handleClick = this.handleClick.bind(this);
		this.getPanelContent = this.getPanelContent.bind(this);
		this.addEventListeners();
	}

	/**
	 * Create an accordion by adding controls to headers and wrapping/hiding each panel.
	 * @param {Node} accordion - The accordion container.
	 */
	createAccordion(accordion) {
		const headers = accordion.querySelectorAll(this.options.header);
		if (headers.length === 0) {
			return;
		}

		Array.prototype.forEach.call(headers, (header) => {
			header.innerHTML = `<button type="button" aria-expanded="false">${header.textContent}${this.options.icon || ''}</button>`;

			header.id ||= Math.random().toString(36).slice(2);

			const panelContent = this.getPanelContent(header);
			const panelWrapper = document.createElement('div');
			panelWrapper.className = 'panel';
			panelWrapper.setAttribute('role', 'region');
			panelWrapper.setAttribute('hidden', true);
			panelWrapper.setAttribute('aria-labelledby', header.id);

			for (const node of panelContent) {
				panelWrapper.append(node);
			}

			header.parentNode.insertBefore(panelWrapper, header.nextElementSibling);
		});

		/**
		 * Called when an accordion is created.
		 * @callback onCreate
		 */
		if (this.options.onCreate && typeof this.options.onCreate === 'function') {
			this.options.onCreate.call({ accordion });
		}
	}

	/**
	 * Gather content between successive header elements.
	 * @param {Node} element - The header from which to start.
	 * @returns {Array} - An array of DomNodes.
	 */
	getPanelContent(element) {
		const els = [];
		while (element.nextElementSibling && !element.nextElementSibling.matches(this.options.header)) {
			els.push(element.nextElementSibling);
			element = element.nextElementSibling;
		}

		for (const node of els) {
			node.remove();
		}

		return els;
	}

	/**
	 * Handle the click event on an accordion header.
	 * @param {Event} event - The click event that we're handling.
	 */
	handleClick(event) {
		if (!event.target.closest(`${this.options.selector} [aria-expanded]`)) {
			return;
		}

		const ctrl = event.target.closest(`${this.options.selector} [aria-expanded]`);
		const panel = ctrl.parentNode.nextElementSibling;

		const expanded = ctrl.getAttribute('aria-expanded') === 'true' || false;

		if (this.options.exclusive) {
			Array.prototype.forEach.call(ctrl.closest(this.options.selector).querySelectorAll('[aria-expanded]'), (element) => {
				element.setAttribute('aria-expanded', false);
				element.parentNode.nextElementSibling.setAttribute('hidden', true);
			});
		}

		ctrl.setAttribute('aria-expanded', !expanded);
		if (expanded) {
			/**
			 * Called when an accordion panel is collapsed.
			 * @callback onCollapse
			 */
			if (this.options.onCollapse && typeof this.options.onCollapse === 'function') {
				this.options.onCollapse.call({ header: ctrl.parentNode, panel });
			}

			panel.setAttribute('hidden', true);
		} else {
			/**
			 * Called when an accordion panel is expanded.
			 * @callback onExpand
			 */
			if (this.options.onExpand && typeof this.options.onExpand === 'function') {
				this.options.onExpand.call({ header: ctrl.parentNode, panel });
			}

			panel.removeAttribute('hidden');
		}
	}

	/**
	 * Add click event listeners.
	 */
	addEventListeners() {
		document.addEventListener('click', this.handleClick, false);
	}
}
