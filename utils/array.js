/**
 * @param {array} arr
 * @param {number} fromIndex
 * @param {number} toIndex
 */
export function moveItem(arr, fromIndex, toIndex) {
	const startIndex = fromIndex < 0 ? arr.length + fromIndex : fromIndex;

	if (startIndex >= 0 && startIndex < arr.length) {
		const endIndex = toIndex < 0 ? arr.length + toIndex : toIndex;

		const [item] = arr.splice(fromIndex, 1);
		arr.splice(endIndex, 0, item);
	}
}

export function moveItemImmutable(arr, fromIndex, toIndex) {
	arr = [...arr];
	moveItem(arr, fromIndex, toIndex);
	return arr;
}

/**
 * @param {array} arr
 * @param {object} obj
 * @param {prop} key
 */
export const replaceItemByKey = function (arr, obj, key) {
	let index = arr.findIndex((val) => val[key] === obj[key]);
	if (index) {
		arr[index] = Object.assign(arr[index], obj);
	}
	return arr;
};

export function replaceItemByKeyImmutable(arr, obj, key) {
	arr = [...arr];
	replaceItemByKey(arr, obj, key);
	return arr;
}

/**
 * @param {array} arr
 * @param {object} obj
 * @param {prop} index
 */
export const replaceItemByIndex = function (arr, obj, index) {
	if (arr[index]) {
		arr[index] = { ...arr[index], ...obj };
	}
	return arr;
};

export function replaceItemByIndexImmutable(arr, obj, index) {
	arr = [...arr];
	replaceItemByIndex(arr, obj, index);
	return arr;
}

/**
 * @param {array} target
 * @param {array} source
 * @param {prop} key
 */
export const mergeArrayByKey = (target, source, key) => {
	source.forEach((sourceElement) => {
		let targetElement = target.find((targetElement) => {
			return sourceElement[key] === targetElement[key];
		});
		targetElement ? Object.assign(targetElement, sourceElement) : target.push(sourceElement);
	});
	return target;
};

export function mergeArrayByKeyImmutable(target, source, key) {
	target = [...target];
	mergeArrayByKey(target, source, key);
	return arr;
}

/**
 * @param {array} arr
 * @param {prop} key
 * @param {boolean} omitKey
 * @returns array
 */
export const groupByKey = (arr, key, omitKey = false) =>
	arr.reduce(
		(hash, { [key]: value, ...rest }) => ({
			...hash,
			[value]: (hash[value] || []).concat(omitKey ? { ...rest } : { [key]: value, ...rest }),
		}),
		{}
	);

export const groupByKeyImmutable = (arr, key, omitKey = false) => {
	arr = [...arr];
	groupByKey(arr, key, omitKey);
	return arr;
};
