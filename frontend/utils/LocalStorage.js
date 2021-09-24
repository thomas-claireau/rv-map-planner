export default class LocalStorage {
	static get(item, defaultReturn) {
		return typeof window !== 'undefined'
			? JSON.parse(localStorage.getItem(item)) || defaultReturn
			: defaultReturn;
	}
}
