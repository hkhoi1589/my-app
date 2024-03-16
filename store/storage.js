import { get, set, del } from 'idb-keyval'; // can use anything: IndexedDB, Ionic Storage, etc.

// Custom storage object
export default {
	getItem: async (name) => {
		// console.log(name, "has been retrieved");
		return get(name)
			.then((val) => val)
			.catch((e) => {});
	},
	setItem: async (name, value) => {
		// console.log(name, "with value", value, "has been saved");
		await set(name, value);
	},
	removeItem: async (name) => {
		// console.log(name, "has been deleted");
		await del(name);
	},
};
