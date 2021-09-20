import { useEffect, useState } from 'react';
import Container from '../Container/Container';
import Menu from '../Menu/Menu';
import MenuMobile from '../MenuMobile/MenuMobile';
import { useThemeContext } from '../ThemeProvider';
import style from './Header.module.scss';

export default function Header() {
	const [scrolled, setScrolled] = useState(0);

	const context = useThemeContext();
	const header = context?.header;

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	function handleScroll() {
		setScrolled(window.scrollY > 0);
	}

	return (
		<header
			className={`${style['header']} ${scrolled ? style['scrolled'] : ''}`}
		>
			<Container>
				<Menu />
				<MenuMobile />
			</Container>
		</header>
	);
}
