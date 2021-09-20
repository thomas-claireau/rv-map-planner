import Image from 'next/image';
import PropTypes from 'prop-types';
import style from './InfiniteLoader.module.scss';

export default function InfiniteLoader({ last }) {
	return (
		!last && (
			<div className={style['infinite-loader']}>
				<Image src="/assets/img/loader.png" width={25} height={25} />
			</div>
		)
	);
}

InfiniteLoader.propTypes = {
	last: PropTypes.bool.isRequired,
};
