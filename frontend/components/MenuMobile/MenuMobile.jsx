import PropTypes from 'prop-types';
import { menuMobile } from './MenuMobile.module.scss';

export default function MenuMobile({ items }) {
	return <nav className={menuMobile}></nav>;
}

MenuMobile.propTypes = {
	items: PropTypes.array,
};
