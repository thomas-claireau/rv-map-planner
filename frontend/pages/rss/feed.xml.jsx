import axios from 'axios';
import { generateRssFeed } from '../../utils/rss.config';

const Feed = () => {};

export async function getServerSideProps({ res }) {
	let posts;

	try {
		posts = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
			auth: {
				username: process.env.NEXT_PUBLIC_API_USERNAME,
				password: process.env.NEXT_PUBLIC_API_PASSWORD,
			},
		});
	} catch (error) {
		console.error(error);
	}

	const feed = await generateRssFeed(posts?.data);

	res.write(feed.rss2());
	res.end();

	return {
		props: {},
	};
}

export default Feed;
