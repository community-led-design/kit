/* eslint max-params: ["error", 5] */

const clamp = function (value, min, max) {
	return Math.max(Math.min(value, max), min);
};

const constructHeading = function (level = 2) {
	return `<h${level}>Search results</h${level}>`;
};

const constructSummary = function (term, count) {
	return `<strong>${count} results for “${term}”</strong>`;
};

const constructResults = function (results) {
	let searchResults = '';

	for (const result of results) {
		searchResults += `
            <li>
                <div class="search-results__title">
                    <a href="${result.url}">${result.meta.title}</a>
                    <em>${result.meta.category ?? ''}</em>
                </div>
                <p class="search-results__excerpt">${result.excerpt}</p>
            </li>
        `;
	}

	return `<ol class="search-results" role="list">${searchResults}</ol>`;
};

const constructHREF = function (baseURL, parameters = {}, withOrigin = true) {
	const url = new URL(baseURL);
	for (const parameter in parameters) {
		if (Object.hasOwn(parameters, parameter)) {
			url.searchParams.set(parameter, parameters[parameter]);
		}
	}

	return withOrigin ? url.href : url.href.slice(url.origin.length);
};

const constructPageLinks = function (baseURL, pages, page = 1, svgs = {}) {
	if (pages <= 1) {
		return '';
	}

	const current = clamp(page, 1, pages);
	const previous = `<li>
        <a href="${constructHREF(baseURL, { page: current - 1 })}" rel="prev"df>
            ${svgs.previous ? `<span class="visually-hidden">Previous</span>${svgs.previous}` : 'Previous'}
        </a>
    </li>`;
	const next = `<li><a href="${constructHREF(baseURL, { page: current + 1 })}" rel="next">${svgs.next ? `<span class="visually-hidden">Next</span>${svgs.next}` : 'Next'}</a></li>`;

	let pageLinks = '';

	for (let i = 1; i <= pages; i++) {
		pageLinks += `<li><a href="${constructHREF(baseURL, { page: i })}" ${i === current ? 'aria-current="page"' : ''}>${i}</a></li>`;
	}

	return `
        <nav class="pagination" aria-label="Search pagination">
            <ul role="list">
                ${current > 1 ? previous : ''}
                ${pageLinks}
                ${current < pages ? next : ''}
            </ul>
        </nav>
    `;
};

const getPagedResults = async function (search, page = 1, itemsPerPage = 5) {
	const pages = Math.ceil(search.results.length / itemsPerPage);
	const start = clamp(page - 1, 0, pages) * itemsPerPage;
	const end = Math.max(start, Math.min(start + 5, search.results.length));
	return Promise.all(search.results.slice(start, end).map((r) => r.data()));
};

const render = async function (container, search, term, page = 1, options) {
	const options_ = {
		itemsPerPage: 5,
		...options,
	};

	const containerElm = document.querySelector(container);
	const pages = Math.ceil(search.results.length / options_.itemsPerPage);
	const pagedResults = await getPagedResults(search, page, options_.itemsPerPage);

	containerElm.innerHTML = `
        ${constructHeading()}
        ${constructSummary(term, search.results.length)}
        ${constructResults(pagedResults)}
        ${constructPageLinks(globalThis.location, pages, page, options_.svgs)}
    `;

	return pagedResults;
};

/*
    This is intended for performing a single search on a page.
    However, Pagefind can support more functionality like sorting, filtering,
    debounced search and etc.
*/
const search = async function (pagefind, options) {
	const options_ = {
		itemsPerPage: 5,
		inputSelector: '#search',
		resultsContainer: '#results-container',
		resultsSelector: '#search-results',
		cloak: 'cloak',
		queryParam: 'q',
		pageParam: 'page',
		...options,
	};

	const parameters = new URLSearchParams(globalThis.location.search);
	let term = parameters.get(options_.queryParam);

	const searchInput = document.querySelector(options_.inputSelector);
	searchInput.value = term;

	let page = parameters.get(options_.pageParam);
	page = Number.isNaN(page) ? 1 : Number(page ?? 1);

	term = typeof term === 'string' ? term.trim() : '';

	if (!term) {
		return [];
	}

	const searchResults = await pagefind.search(term);
	const results = await render(options_.resultsSelector, searchResults, term, page, options_);

	if (options_.cloak) {
		document.querySelector(options_.resultsContainer).classList.remove(options_.cloak);
	}

	return results;
};

globalThis.search = search;
