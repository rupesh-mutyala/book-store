import React, { useEffect } from 'react';
import './styles.css';
import { useRouter } from 'next/router';
import getCookieValue from '../utils/getCookieValue';

function MyApp({ Component, pageProps }) {
	// const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		const isLoggedIn = getCookieValue('loggedIn') === 'true';

		if (!isLoggedIn) {
			router.push('/login');
		}
	}, []);

	return <Component {...pageProps} />;
}

export default MyApp;
