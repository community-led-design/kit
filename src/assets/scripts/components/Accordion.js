/**
 * @module Accordion
 *
 * @description Progressively-enhanced accordion component.
 *
 * @param {String} selector - The selector of a container element for the accordion.
 * @param {Object} options - Object of options for the accordion.
 */
export default class Accordion {
    /**
     * Constructor.
     *
     * @param {String} selector - The selector of a container element for the accordion.
     * @param {Object} options - Object of options for the accordion.
     */
    constructor( selector, options = {} ) {
        const defaults = {
            header: "h2",
            exclusive: false,
            icon: false,
            onCreate: null,
            onExpand: null,
            onCollapse: null
        };

        this.accordions = document.querySelectorAll(selector);
        this.options = Object.assign( {selector}, defaults, options );

        Array.prototype.forEach.call( this.accordions, accordion => {
            this.createAccordion( accordion );
        } );

        this.handleClick = this.handleClick.bind( this );
        this.getPanelContent = this.getPanelContent.bind( this );
        this.addEventListeners();
    }

    /**
     * Create an accordion by adding controls to headers and wrapping/hiding each panel.
     *
     * @param {DomNode} accordion - The accordion container.
     */
    createAccordion( accordion ) {
        const headers = accordion.querySelectorAll(this.options.header);
        if (headers.length === 0) {
            return;
        }

        Array.prototype.forEach.call(headers, header => {
            header.innerHTML = `<button type="button" aria-expanded="false">${header.textContent}${this.options.icon || ""}</button>`;

            if (!header.id) {
                header.id = Math.random().toString(36).slice(2);
            }

            const panelContent = this.getPanelContent(header);
            const panelWrapper = document.createElement("div");
            panelWrapper.className = "panel";
            panelWrapper.setAttribute("role", "region");
            panelWrapper.setAttribute("hidden", true);
            panelWrapper.setAttribute("aria-labelledby", header.id);

            panelContent.forEach(node => {
                panelWrapper.appendChild(node);
            });

            header.parentNode.insertBefore(panelWrapper, header.nextElementSibling);

        });

        /**
         * Called when an accordion is created.
         *
         * @callback onCreate
         */
        if ( this.options.onCreate && "function" === typeof this.options.onCreate ) {
            this.options.onCreate.call({accordion});
        }
    }

    /**
     * Gather content between successive header elements.
     *
     * @param {DomNode} el - The header from which to start.
     * @return {Array} - An array of DomNodes.
     */
    getPanelContent(el) {
        let els = [];
        while (el.nextElementSibling && !el.nextElementSibling.matches(this.options.header)) {
            els.push(el.nextElementSibling);
            el = el.nextElementSibling;
        }

        els.forEach((node) => {
            node.parentNode.removeChild(node);
        });

        return els;
    }


    /**
     * Handle the click event on an accordion header.
     *
     * @param {Event} event - The click event that we're handling.
     */
    handleClick( event ) {
        if ( !event.target.closest( `${this.options.selector} [aria-expanded]` ) ) {
            return;
        }

        const ctrl = event.target.closest( `${this.options.selector} [aria-expanded]` );
        const panel = ctrl.parentNode.nextElementSibling;

        const expanded = "true" === ctrl.getAttribute( "aria-expanded" ) || false;

        if (this.options.exclusive) {
            Array.prototype.forEach.call( ctrl.closest(this.options.selector).querySelectorAll( "[aria-expanded]" ), el => {
                el.setAttribute( "aria-expanded", false );
                el.parentNode.nextElementSibling.setAttribute("hidden", true);
            } );
        }

        ctrl.setAttribute( "aria-expanded", !expanded );
        if (expanded) {
            /**
             * Called when an accordion panel is collapsed.
             *
             * @callback onCollapse
             */
            if ( this.options.onCollapse && "function" === typeof this.options.onCollapse ) {
                this.options.onCollapse.call({header: ctrl.parentNode, panel});
            }
            panel.setAttribute("hidden", true);
        } else {
            /**
             * Called when an accordion panel is expanded.
             *
             * @callback onExpand
             */
            if ( this.options.onExpand && "function" === typeof this.options.onExpand ) {
                this.options.onExpand.call({header: ctrl.parentNode, panel});
            }
            panel.removeAttribute("hidden");
        }
    }

    /**
     * Add click event listeners.
     */
    addEventListeners() {
        document.addEventListener( "click", this.handleClick, false );
    }
}
