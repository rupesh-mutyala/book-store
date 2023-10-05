function toSnakeCase(inputString) {
	// Replace spaces and other separators with underscores
	const snakeCaseString = inputString.replace(/[\s-]/g, '_').toLowerCase();
	return snakeCaseString;
}

export default toSnakeCase;
