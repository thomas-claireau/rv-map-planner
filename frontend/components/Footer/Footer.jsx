import Container from '../Container/Container';
import { useThemeContext } from '../ThemeProvider';
import style from './Footer.module.scss';

export default function Footer() {
	const context = useThemeContext();
	const footer = context?.footer;
	const now = new Date();

	return (
		<footer className={style['footer']}>
			<Container className={style['container']}>footer</Container>
		</footer>
	);
}
