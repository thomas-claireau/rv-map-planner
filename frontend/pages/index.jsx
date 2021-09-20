import axios from 'axios';
import { SocialProfileJsonLd } from 'next-seo';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import Layout from '../components/Layout/Layout';
import Sidebar from '../components/Sidebar/Sidebar';
import style from './index.module.scss';

export default function Home({ fields, global }) {
	const Map = useMemo(() =>
		dynamic(() => import('../components/Map/Map'), {
			loading: () => <p>A map is loading</p>,
			ssr: false,
		})
	);

	return (
		<Layout>
			<SocialProfileJsonLd
				type="Person"
				name="Thomas Claireau"
				url={global?.seo.home_url}
				sameAs={global?.header.menus.items.map((item) => item.url)}
			/>
			<main className={style['index']}>
				<Sidebar />
				<Map />
			</main>
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
