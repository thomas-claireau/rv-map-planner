export function getLocalStorageItem(item, defaultReturn = null) {
	return typeof window !== 'undefined'
		? JSON.parse(localStorage.getItem(item)) || defaultReturn
		: defaultReturn;
}
