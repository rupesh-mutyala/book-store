const getCookieValue = (cookieName) => {
	const cookiePairs = document.cookie.split('; ');

	const cookiePair = cookiePairs.find((pair) => {
		const [name] = pair.split('=');

		return name === cookieName;
	});

	if (cookiePair) {
		const [, value] = cookiePair.split('=');
		return decodeURIComponent(value);
	}

	return null; // Cookie not found case
};

export default getCookieValue;
