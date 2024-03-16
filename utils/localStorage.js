const Storage = {
	getItem(key, initialValue) {
		try {
			const item = localStorage.getItem(key);
			// Parse stored json or if none return initialValue
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			return initialValue;
		}
	},
	setItem(key, value) {
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (err) {
			console.log(err);
		}
	},
};

export default Storage;
