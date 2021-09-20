import Link from 'next/link';
import PropTypes from 'prop-types';

export default function Post({ index, item, layout, last }) {
	if (!item) return <div>Chargement</div>;

	return (
		item.title &&
		item.thumbnail.url && (
			<Link href={`/post/${item.slug}`}>
				<a>post</a>
			</Link>
		)
	);
}

Post.propTypes = {
	index: PropTypes.number.isRequired,
	item: PropTypes.object.isRequired,
	layout: PropTypes.string,
};
