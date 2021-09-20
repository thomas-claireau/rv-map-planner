import PropTypes from 'prop-types';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import style from './Layout.module.scss';

export default function Layout({ children }) {
	return (
		<div className={style['layout']}>
			<Header />
			{children}
			<Footer />
		</div>
	);
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};
