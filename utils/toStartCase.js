function toStartCase(inputText) {
	const words = inputText.toLowerCase().split('_');

	const startCaseText = words
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

	return startCaseText;
}

export default toStartCase;
