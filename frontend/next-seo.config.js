export default {
	title: 'Thomas Claireau - Développeur web fullstack',
	description:
		"Je m'appelle Thomas Claireau et je suis développeur web fullstack. Sur ce site, je présente mes projets et des articles destinés à partager mon expérience",
	canonical: process.env.NEXT_APP_URL,
	openGraph: {
		type: 'website',
		locale: 'fr_FR',
		url: process.env.NEXT_APP_URL,
		title: 'Thomas Claireau - Développeur web fullstack',
		site_name: 'Thomas Claireau - Développeur web fullstack',
	},
	twitter: {
		handle: '@handle',
		site: '@thomas_claireau',
		cardType: 'summary_large_image',
	},
	additionalMetaTags: [
		{
			property: 'dc:creator',
			content: 'Thomas Claireau',
		},
		{
			name: 'application-name',
			content: 'Thomas Claireau - Développeur web fullstack',
		},
		{
			httpEquiv: 'x-ua-compatible',
			content: 'IE:edge; chrome=1',
		},
	],
};
