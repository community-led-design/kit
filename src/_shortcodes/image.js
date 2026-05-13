/* eslint-disable new-cap */
import path from 'node:path';
import EleventyImage from '@11ty/eleventy-img';

const imageShortcode = (src, alt, sizes, widths) => {
	const options = {
		widths,
		formats: ['jpeg'],
		outputDir: './_site/assets/media/generated',
		urlPath: '/assets/media/generated/',
		sharpJpegOptions: {
			quality: 99,
			progressive: true,
		},
	};
	const source = path.join('./src', src);
	EleventyImage(source, options);

	const imageAttributes = {
		alt,
		sizes,
		loading: 'lazy',
	};

	const metadata = EleventyImage.statsSync(source, options);
	return EleventyImage.generateHTML(metadata, imageAttributes);
};

export default imageShortcode;
