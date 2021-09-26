import axios from 'axios';
import { SocialProfileJsonLd } from 'next-seo';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import Map from '../components/Map/Map';

export default function Home({ fields, global }) {
	const [google, setGoogle] = useState(null);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setGoogle(window.google);
		}, 1000);

		return () => clearTimeout(timeout);
	}, []);

	return (
		<Layout>
			<SocialProfileJsonLd
				type="Person"
				name="Thomas Claireau"
				url={global?.seo.home_url}
				sameAs={global?.header.menus.items.map((item) => item.url)}
			/>

			<Map google={google} />
		</Layout>
	);
}

Home.propTypes = {
	fields: PropTypes.object,
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
		props: {
			fields: fields?.data ?? null,
			global: global?.data ?? null,
		},
	};
}
