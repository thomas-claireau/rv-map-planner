export default {
	title: 'RV Map Planner',
	description: 'Description of rv map planner',
	canonical: process.env.NEXT_APP_URL,
	openGraph: {
		type: 'website',
		locale: 'fr_FR',
		url: process.env.NEXT_APP_URL,
		title: 'RV Map Planner',
		site_name: 'RV Map Planner',
	},
	twitter: {
		handle: '@handle',
		site: '@rv_map_planner',
		cardType: 'summary_large_image',
	},
	additionalMetaTags: [
		{
			property: 'dc:creator',
			content: 'Thomas Claireau',
		},
		{
			name: 'application-name',
			content: 'RV Map Planner',
		},
		{
			httpEquiv: 'x-ua-compatible',
			content: 'IE:edge; chrome=1',
		},
	],
};
