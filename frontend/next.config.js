const path = require('path');
const withReactSvg = require('next-react-svg');

module.exports = withReactSvg({
	sassOptions: {
		includePaths: [path.join(__dirname, 'src', 'styles')],
		prependData: `@import "styles/_variables.scss";`,
	},
	include: path.resolve(__dirname, 'public/assets/img'),
	webpack(config, { isServer }) {
		config.resolve.alias['public'] = path.join(__dirname, 'public');

		return config;
	},
	images: {
		domains: ['website.local'],
	},
});
