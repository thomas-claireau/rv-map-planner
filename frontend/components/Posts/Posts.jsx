import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import InfiniteLoader from '../InfiniteLoader/InfiniteLoader';
import Post from '../Post/Post';
import style from './Posts.module.scss';

export default function Posts({ className, layout, items, nbStarterPosts }) {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		if (items && nbStarterPosts) setPosts(items.slice(0, nbStarterPosts));
	}, []);

	if (!items?.length) return <div>Chargement</div>;

	async function fetchData(e) {
		setTimeout(async () => {
			setPosts(items.slice(0, nbStarterPosts + Number(posts.length)));
		}, 1500);
	}

	return nbStarterPosts ? (
		<InfiniteScroll
			dataLength={posts.length}
			next={fetchData}
			hasMore={true}
			className={`${className} ${style['posts']} ${style[layout]}`}
			loader={<InfiniteLoader last={posts.length == items.length} />}
		>
			{posts.map((post, index) => (
				<Post
					key={index}
					index={index}
					layout={layout}
					item={post}
					last={posts.length == items.length}
				/>
			))}
		</InfiniteScroll>
	) : (
		<div className={`${className} ${style['posts']} ${style[layout]}`}>
			{items.map((post, index) => (
				<Post key={index} index={index} layout={layout} item={post} />
			))}
		</div>
	);
}

Posts.propTypes = {
	className: PropTypes.string,
	layout: PropTypes.string,
	items: PropTypes.array.isRequired,
	nbStarterPosts: PropTypes.number,
};
