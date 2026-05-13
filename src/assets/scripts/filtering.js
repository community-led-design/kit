/*
Copyright the Fluidic Eleventy copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/community-led-design/kit/raw/master/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/community-led-design/kit/raw/master/LICENSE.md.
*/

const typeMenu = document.querySelector('#type');
const buildingBlockMenu = document.querySelector('#building-block');
const applyFilters = document.querySelector('#apply-filters');
const clearFilters = document.querySelector('#clear-filters');
const resources = document.querySelector('#resources');
const results = document.querySelector('#results');

const applyCurrentFilters = function () {
	const type = typeMenu.value;
	const buildingBlock = buildingBlockMenu.value;

	const typeLabel = (type === '') ? false : typeMenu.querySelector(`[value="${type}"]`).textContent;
	const buildingBlockLabel = (buildingBlock === '') ? false : buildingBlockMenu.querySelector(`[value="${buildingBlock}"]`).textContent;

	const filterString = [type, buildingBlock].join(' ').trim();

	let count = 0;

	for (const card of resources.querySelectorAll('.card')) {
		if (filterString === '') {
			card.removeAttribute('hidden');
		} else if (card.dataset.filter.includes(filterString)) {
			card.removeAttribute('hidden');
			count++;
		} else {
			card.setAttribute('hidden', '');
		}
	}

	let resultsMessage = `<strong>${count} ${(count === 1) ? 'resource' : 'resources'}</strong> matched `;

	if (typeLabel && buildingBlockLabel) {
		resultsMessage = `${resultsMessage} <strong>${typeLabel}</strong> for <strong>${buildingBlockLabel}</strong>${(count === 0) ? '.' : ':'}`;
	} else if (typeLabel) {
		resultsMessage = `${resultsMessage} <strong>${typeLabel}</strong>${(count === 0) ? '.' : ':'}`;
	} else if (buildingBlockLabel) {
		resultsMessage = `${resultsMessage} <strong>${buildingBlockLabel}</strong>${(count === 0) ? '.' : ':'}`;
	} else {
		resultsMessage = '';
	}

	results.innerHTML = resultsMessage;
};

applyFilters.addEventListener('click', applyCurrentFilters);
clearFilters.addEventListener('click', () => {
	typeMenu.value = '';
	buildingBlockMenu.value = '';

	applyCurrentFilters();
});
