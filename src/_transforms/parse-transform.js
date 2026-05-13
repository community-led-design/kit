
import { parseHTML } from 'linkedom';
import slugify from '@sindresorhus/slugify';

const slugifyOptions = {
	replacement: '-',
	lower: true,
	strict: true,
};

const parseTransform = (value, outputPath) => {
	if (outputPath && outputPath.endsWith('.html')) {
		const { document } = parseHTML(value);

		const articleImages = [...document.querySelectorAll('main article img')];
		const headings = [...document.querySelectorAll('main article h2, main article h3, main article h4')];
		const tocHeadings = [...document.querySelectorAll('.inner-content h2')];
		const tocUl = document.querySelector('nav.toc .toc-menu > ul');

		if (articleImages.length > 0) {
			for (const image of articleImages) {
				// Enable native lazy-loading.
				image.setAttribute('loading', 'lazy');
			}
		}

		if (headings.length > 0) {
			for (const heading of headings) {
				const headingId = slugify(heading.textContent, slugifyOptions);
				if (!heading.getAttribute('id')) {
					heading.setAttribute('id', headingId);
				}
			}
		}

		if (tocHeadings.length > 0 && tocUl) {
			let i = 0;
			for (const heading of tocHeadings) {
				if (i > 0) {
					const skipBack = document.createElement('p');
					skipBack.className = 'back-to-top';
					skipBack.innerHTML = '<a href="#toc">Table of contents &uarr;</a>';
					heading.parentNode.insertBefore(skipBack, heading);
				}

				const tocItem = document.createElement('li');
				tocItem.innerHTML = `<a href="#${slugify(heading.textContent, slugifyOptions)}">${heading.textContent}</a>`;
				tocUl.append(tocItem);
				i++;
			}

			const skipBack = document.createElement('p');
			skipBack.className = 'back-to-top';
			skipBack.innerHTML = '<a href="#toc">Table of contents &uarr;</a>';
			document.querySelector('.inner-content').append(skipBack);
		}

		return '<!DOCTYPE html>\r\n' + document.documentElement.outerHTML;
	}

	return value;
};

export default parseTransform;
