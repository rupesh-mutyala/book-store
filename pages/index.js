import { useEffect } from 'react';
import { useRouter } from 'next/router';
import getCookieValue from '../utils/getCookieValue';

function HomePage() {
	const router = useRouter();

	useEffect(() => {
		const isLoggedIn = getCookieValue('loggedIn') === 'true';

		if (isLoggedIn) {
			router.push('/home');
		}
	}, [router]);

	return null;
}

export default HomePage;
