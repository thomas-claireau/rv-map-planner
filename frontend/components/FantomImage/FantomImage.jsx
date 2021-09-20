import Image from 'next/image';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import style from './FantomImage.module.scss';

export default function FantomImage({
	className,
	src,
	alt,
	width,
	height,
	layout,
	circle,
}) {
	const [loading, setLoading] = useState(true);

	return (
		<div className={`${style['fantom-image']} ${className}`}>
			{loading && <Skeleton className={style['skeleton']} circle={circle} />}
			<Image
				src={src}
				alt={alt}
				width={width}
				height={height}
				layout={layout}
				onLoad={() => setLoading(false)}
			/>
		</div>
	);
}

FantomImage.propTypes = {
	className: PropTypes.string,
	src: PropTypes.string.isRequired,
	alt: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number,
	layout: PropTypes.string,
	circle: PropTypes.bool,
};
