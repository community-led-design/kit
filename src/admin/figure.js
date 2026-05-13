/* global CMS */

CMS.registerEditorComponent({
	id: 'figure',
	label: 'Figure',
	fields: [
		{
			name: 'image',
			label: 'Image',
			widget: 'image',
			required: true,
		},
		{
			name: 'alt',
			label: 'Alternative Text',
			widget: 'string',
		},
		{
			name: 'caption',
			label: 'Caption',
			widget: 'markdown',
		},
	],
	pattern: /^{% figure "([\s\S]*?)", "([\s\S]*?)" %}([\s\S]*?){% endfigure %}/,
	fromBlock: (match) =>
		match && {
			image: match[1],
			alt: match[2],
			caption: match[3],
		},
	toBlock({ alt, image, caption }) {
		alt = alt ? alt.replaceAll('"', '&quot;') : '';
		return `{% figure "${image || ''}", "${alt || ''}" %}\n${caption || ''}\n{% endfigure %}`;
	},
	toPreview({ alt, image, caption }) {
		const md = globalThis.markdownit();
		alt = alt ? alt.replaceAll('"', '&quot;') : '';
		const figcaption = caption ? `<figcaption>${md.render(caption)}</figcaption>` : '';
		return `<figure><img src="${image || ''}" alt="${alt || ''}" />${figcaption}</figure>`;
	},
});
