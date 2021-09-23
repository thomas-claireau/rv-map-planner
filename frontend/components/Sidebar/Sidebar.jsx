import PropTypes from 'prop-types';
import { useRef } from 'react';
import style from './Sidebar.module.scss';

export default function Sidebar({ map, locations }) {
	const inputRef = useRef(null);

	console.log(locations);

	return (
		<aside className={style['sidebar']}>
			<input type="text" ref={inputRef} />
			{places.map((place) => {
				console.log(place);
				return <li>coucou</li>;
			})}
		</aside>
	);
}

Sidebar.propTypes = {
	map: PropTypes.object,
	locations: PropTypes.array,
};