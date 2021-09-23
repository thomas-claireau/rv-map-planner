import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import https from 'https';
import 'moment/locale/fr';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { ThemeProvider } from '../components/ThemeProvider';
import SEO from '../next-seo.config';
import '../styles/global.scss';

if (process.env.NODE_ENV === 'development') {
	axios.defaults.httpsAgent = new https.Agent({
		rejectUnauthorized: false,
	});

	process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
}

config.autoAddCss = false;

library.add(fas, far, fab);

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
	const { global } = pageProps;

	// addCookies();

	return (
		<ThemeProvider value={global}>
			<DefaultSeo {...SEO} />
			<Head>
				<script async defer src={process.env.NEXT_PUBLIC_MAP_API_URL} />
			</Head>
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

MyApp.propTypes = {
	Component: PropTypes.func.isRequired,
	pageProps: PropTypes.object.isRequired,
	fields: PropTypes.object,
};

function addCookies() {
	if (typeof window !== 'undefined') {
		if (!window.axeptioSettings) {
			window.axeptioSettings = {
				clientId: process.env.NEXT_PUBLIC_AXEPTIO_CLIENT_ID,
			};

			(function (d, s) {
				var t = d.getElementsByTagName(s)[0],
					e = d.createElement(s);

				e.async = true;
				e.src = '//static.axept.io/sdk-slim.js';
				t.parentNode.insertBefore(e, t);
			})(document, 'script');

			void 0 === window._axcb && (window._axcb = []);
			window._axcb.push(function (axeptio) {
				axeptio.on('cookies:complete', function (choices) {
					if (choices.google_analytics) {
						(function (i, s, o, g, r, a, m) {
							i['GoogleAnalyticsObject'] = r;
							(i[r] =
								i[r] ||
								function () {
									(i[r].q = i[r].q || []).push(arguments);
								}),
								(i[r].l = 1 * new Date());
							(a = s.createElement(o)),
								(m = s.getElementsByTagName(o)[0]);
							a.async = 1;
							a.src = g;
							m.parentNode.insertBefore(a, m);
						})(
							window,
							document,
							'script',
							'https://www.google-analytics.com/analytics.js',
							'ga'
						);

						ga('create', 'UA-119345981-2', 'auto');
						ga('send', 'pageview');
					}
				});
			});
		}
	}
}
