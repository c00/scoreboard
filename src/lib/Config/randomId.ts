export function getRandomId(prefix?: string) {
	return (prefix || '') + Math.floor(Math.random() * 100000).toString();
}
