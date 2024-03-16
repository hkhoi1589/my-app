export {
	moveItem,
	moveItemImmutable,
	replaceItemByKey,
	replaceItemByKeyImmutable,
	replaceItemByIndex,
	replaceItemByIndexImmutable,
	mergeArrayByKey,
	mergeArrayByKeyImmutable,
	groupByKey,
	groupByKeyImmutable,
} from './array';

export { fileToBase64, urlToBase64 } from './file';

/**
 * @param {number} min
 * @param {number} max
 * @returns
 */
export function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @param {function} fn
 * @param {number} wait
 * @returns
 */
export const debounce = function (fn, wait) {
	let t;
	return function () {
		clearTimeout(t);
		t = setTimeout(() => fn.apply(this, arguments), wait);
	};
};

/**
 * @param {number} ms
 * @returns
 */
export const sleep = function (ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * @param {string} str
 * @returns
 */
export const urlParse = function (str) {
	let query = '';
	let href = str || location.href;
	const url = href.split('?');
	if (url.length >= 2) {
		query = url[1];
	}

	let result = {};
	query.split('&').forEach(function (part) {
		if (part) {
			var item = part.split('=');
			result[item[0]] = decodeURIComponent(item[1]);
		}
	});
	return result;
};

/**
 * @param {string} obj
 * @returns
 */
export const urlStringify = function (obj) {
	var encode = encodeURIComponent;
	return Object.keys(obj || {})
		.reduce(function (arr, key) {
			[].concat(obj[key]).forEach(function (v) {
				arr.push(encode(key) + '=' + encode(v));
			});
			return arr;
		}, [])
		.join('&')
		.replace(/\s/g, '+');
};

export const isClient = function () {
	return typeof window !== 'undefined';
};

export const handleToTop = function (value) {
	window.scrollTo({ top: value, behavior: 'smooth' });
};

export const formatDate = (dateStr, dmy = false) => {
	let date = new Date(dateStr);

	if (date !== 'Invalid Date') {
		const outYear = date.getFullYear();
		const outMonth = String(date.getMonth() + 1).padStart(2, '0');
		const outDay = String(date.getDate()).padStart(2, '0');
		if (dmy) return `${outDay}-${outMonth}-${outYear}`;
		return `${outYear}-${outMonth}-${outDay}`;
	}

	// Define regular expressions for the supported date formats
	const regexes = [
		/^\d{4}-\d{2}-\d{2}$/,
		/^\d{4}\/\d{2}\/\d{2}$/,
		/^\d{2}-\d{2}-\d{4}$/,
		/^\d{2}\/\d{2}\/\d{4}$/,
	];

	// Iterate through the regular expressions to match the input format
	for (const regex of regexes) {
		if (regex.test(dateStr)) {
			// Split the date string based on the separator (/ or -)
			const separator = dateStr.includes('/') ? '/' : '-';
			const dateParts = dateStr.split(separator);

			// Check if the date parts are in the correct order (year, month, day)
			if ((separator === '/' || separator === '-') && dateParts[0].length !== 4) {
				// Swap day and year for the format YYYY/DD/MM
				date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
			} else {
				date = new Date(dateStr);
			}

			break;
		}
	}

	// Check if the date is valid
	if (!date || isNaN(date.getTime())) {
		return 'Invalid Date';
	}

	const outYear = date.getFullYear();
	const outMonth = String(date.getMonth() + 1).padStart(2, '0');
	const outDay = String(date.getDate()).padStart(2, '0');

	if (dmy) return `${outDay}-${outMonth}-${outYear}`;
	return `${outYear}-${outMonth}-${outDay}`;
};
