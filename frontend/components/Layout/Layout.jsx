import PropTypes from 'prop-types';
import style from './Layout.module.scss';

export default function Layout({ children }) {
	return <div className={style['layout']}>{children}</div>;
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};
