import axios from 'axios';
import { SocialProfileJsonLd } from 'next-seo';
import PropTypes from 'prop-types';
import Layout from '../components/Layout/Layout';
import style from './index.module.scss';

export default function Home({ fields, global }) {
	return (
		<Layout>
			website
			<SocialProfileJsonLd
				type="Person"
				name="Thomas Claireau"
				url={global?.seo.home_url}
				sameAs={global?.header.menus.items.map((item) => item.url)}
			/>
			<main className={style['index']}></main>
		</Layout>
	);
}

Home.propTypes = {
	fields: PropTypes.object.isRequired,
};

export async function getServerSideProps() {
	const auth = {
		auth: {
			username: process.env.NEXT_PUBLIC_API_USERNAME,
			password: process.env.NEXT_PUBLIC_API_PASSWORD,
		},
	};

	let fields, global;

	try {
		fields = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/pages?post_id=22`,
			auth
		);

		global = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/global`,
			auth
		);
	} catch (error) {
		console.error(error);
	}

	return {
		props: { fields: fields?.data ?? null, global: global?.data ?? null },
	};
}
