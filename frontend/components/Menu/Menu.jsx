import PropTypes from 'prop-types';
import { menu } from './Menu.module.scss';

export default function Menu({ items }) {
	return <nav className={menu}></nav>;
}

Menu.propTypes = {
	items: PropTypes.array,
};
