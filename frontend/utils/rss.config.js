import { Feed } from 'feed';

export const generateRssFeed = async (data) => {
	const date = new Date();

	const author = {
		name: 'Name of site',
		email: 'john.smith@gmail.com',
		link: 'https://link.fr',
	};

	const feed = new Feed({
		title: 'Title of site',
		description: 'Description of site',
		id: process.env.NEXT_APP_URL + '/blog',
		link: process.env.NEXT_APP_URL + '/blog',
		// image: `${process.env.NEXT_APP_URL}/logo.svg`,
		// favicon: `${process.env.NEXT_APP_URL}/favicon.png`,
		copyright: `All rights reserved ${date.getFullYear()}, Name of site`,
		updated: date,
		generator: 'Feed for Node.js',
		feedLinks: {
			rss2: `${process.env.NEXT_APP_URL}/rss/feed.xml`,
			json: `${process.env.NEXT_APP_URL}/rss/feed.json`,
			atom: `${process.env.NEXT_APP_URL}/rss/atom.xml`,
		},
		author,
	});

	// feed posts
	data?.forEach((post) => {
		feed.addItem({
			title: post?.title,
			id: `${process.env.NEXT_APP_URL}/post/${post.slug}`,
			link: `${process.env.NEXT_APP_URL}/post/${post.slug}`,
			description: post?.content.substring(0, 250) + '...',
			content: post?.content,
			author: [author],
			contributor: [author],
			date: new Date(post?.updated_at),
		});
	});

	return feed;
};
