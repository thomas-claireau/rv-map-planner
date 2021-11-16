import { SocialProfileJsonLd } from 'next-seo';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import Map from '../components/Map/Map';

export default function Home() {
	const [google, setGoogle] = useState(null);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setGoogle(window.google);
		}, 500);

		return () => clearTimeout(timeout);
	}, []);

	return (
		<Layout>
			<SocialProfileJsonLd
				type="Person"
				name="Thomas Claireau"
			/>

			<Map google={google} />
		</Layout>
	);
}

Home.propTypes = {
	fields: PropTypes.object,
};
