
import { execSync } from 'node:child_process';
import fluidPlugin from 'eleventy-plugin-fluid';
import eleventyNavigationPlugin from '@11ty/eleventy-navigation';
import exampleBlockShortcode from './src/_shortcodes/example-block.js';
import imageShortcode from './src/_shortcodes/image.js';
import learningBlockShortcode from './src/_shortcodes/learning-block.js';
import pullquoteShortcode from './src/_shortcodes/pullquote.js';
import parseTransform from './src/_transforms/parse-transform.js';

/**
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig An instance of Eleventy's UserConfig class.
 * @returns {object} The configuration object.
 */
export default function eleventy(eleventyConfig) {
	// Shortcodes
	eleventyConfig.addPairedShortcode('accordion', (content) => `<div class="accordion flow">\n${content}\n</div>`);
	eleventyConfig.addPairedShortcode('example', exampleBlockShortcode);
	eleventyConfig.addPairedShortcode('learning', learningBlockShortcode);
	eleventyConfig.addPairedShortcode('pullquote', pullquoteShortcode);
	eleventyConfig.addNunjucksShortcode('resizeImage', imageShortcode);

	// Transforms
	eleventyConfig.addTransform('parse', parseTransform);

	// Passthrough copy
	eleventyConfig.addPassthroughCopy({ 'src/assets/fonts': 'assets/fonts' });
	eleventyConfig.addPassthroughCopy({ 'src/assets/icons/': '/' });
	eleventyConfig.addPassthroughCopy({ 'src/assets/images': 'assets/images' });
	eleventyConfig.addPassthroughCopy({ 'src/assets/media': 'assets/media' });
	eleventyConfig.addPassthroughCopy('src/admin/config.yml');
	eleventyConfig.addPassthroughCopy('src/admin/*.js');
	eleventyConfig.addPassthroughCopy({
		'node_modules/@babel/standalone/babel.min.js': 'lib/cms/babel.min.js',
		'node_modules/@babel/standalone/babel.min.js.map': 'lib/cms/babel.min.js.map',
		'node_modules/markdown-it/dist/markdown-it.min.js': 'lib/cms/markdown-it.min.js',
	});
	eleventyConfig.addPassthroughCopy({ 'node_modules/infusion/src/lib/hypher/patterns': 'lib/infusion/src/lib/hypher/patterns' });

	// Plugins
	eleventyConfig.addPlugin(fluidPlugin, {
		css: {
			enabled: true,
		},
		i18n: false,
	});
	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	// Collections
	eleventyConfig.addCollection('resources', (collection) =>
		collection.getFilteredByGlob('src/collections/resources/*.md').toSorted((a, b) => b.data.order - a.data.order)
			.toReversed());

	eleventyConfig.addCollection('caseStudies', (collection) =>
		collection.getFilteredByGlob('src/collections/case-studies/*.md').toSorted((a, b) => b.data.order - a.data.order)
			.toReversed());

	eleventyConfig.on('eleventy.after', () => {
		// TODO: Once 11ty v3 is stable and the project updated to use it, it will be possible to use Pagefind's
		// NodeJS API instead of calling `npx` with `exec`. This is because 11ty currently doesn't support ES6 modules.
		// https://pagefind.app/docs/node-api/
		execSync('npx pagefind --site _site --glob "**/index.html"', { encoding: 'utf8' });
	});

	return {
		dir: {
			input: 'src',
		},
		passthroughFileCopy: true,
		templateFormats: ['njk', 'md', 'css', 'png', 'jpg', 'svg'],
		htmlTemplateEngine: 'njk',
		markdownTemplateEngine: 'njk',
	};
}
