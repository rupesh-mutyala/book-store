function setCookie(cookieName, cookieValue, expirationDays) {
	const expirationDate = new Date();
	expirationDate.setDate(expirationDate.getDate() + expirationDays);

	const expirationDateUTCString = expirationDate.toUTCString();

	const cookieString = `${cookieName}=${encodeURIComponent(
		cookieValue,
	)}; expires=${expirationDateUTCString}; path=/`;

	document.cookie = cookieString;
}

export default setCookie;
