/* global CMS */

CMS.registerEditorComponent({
	id: 'accordion',
	label: 'Accordion',
	fields: [{
		name: 'content',
		label: 'Content',
		widget: 'markdown',
	}],
	pattern: /^{% accordion %}([\s\S]*?){% endaccordion %}/,
	fromBlock(match) {
		return {
			content: match[1],
		};
	},
	toBlock(object) {
		return `{% accordion %}\n${object.content}\n{% endaccordion %}`;
	},
	toPreview(object) {
		const md = globalThis.markdownit();
		const content = object.content ? md.render(object.content) : '';
		return `<div class="accordion">${content}</div>`;
	},
});
