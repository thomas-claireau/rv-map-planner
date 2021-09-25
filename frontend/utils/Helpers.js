export default class Helpers {
	static moveInArray(arr, from, to) {
		// Make sure a valid array is provided
		if (Object.prototype.toString.call(arr) !== '[object Array]') {
			throw new Error('Please provide a valid array');
		}

		// Delete the item from it's current position
		var item = arr.splice(from, 1);

		// Make sure there's an item to move
		if (!item.length) {
			throw new Error('There is no item in the array at index ' + from);
		}

		// Move the item to its new position
		arr.splice(to, 0, item[0]);

		return arr;
	}

	static deepEqual(object1, object2) {
		const keys1 = Object.keys(object1);
		const keys2 = Object.keys(object2);
		if (keys1.length !== keys2.length) {
			return false;
		}
		for (const key of keys1) {
			const val1 = object1[key];
			const val2 = object2[key];
			const areObjects = this.isObject(val1) && this.isObject(val2);
			if (
				(areObjects && !deepEqual(val1, val2)) ||
				(!areObjects && val1 !== val2)
			) {
				return false;
			}
		}
		return true;
	}

	static isObject(object) {
		return object != null && typeof object === 'object';
	}
}
