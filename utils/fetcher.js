import Storage from '@/store/storage';

/**
 * @param {*} url
 * @param {*} method
 * @param {*} body
 * @param {*} headers
 * @returns data json
 */
export default async function fetcher(url, method = 'GET', body = {}, headers = {}) {
	const opt = { method: method ? String(method || '').toUpperCase() : 'GET' };

	if (opt.method !== 'GET') {
		if (body.files) opt.body = body.files;
		else opt.body = JSON.stringify(body || {});
	}

	opt.headers = {
		'Content-Type': 'application/json',
		...headers,
	};

	if (body.files) {
		delete opt.headers['Content-Type'];
	}

	const json = await Storage.getItem('forumUser');
	if (json) {
		const data = JSON.parse(json);
		const { access } = data.state;
		if (access) opt.headers.Authorization = `Bearer ${access}`;
	}
	//console.log('Authorization', opt.headers.Authorization);
	//console.log(opt);
	return fetch(url, opt).then((r) => {
		// if (r.status === 403) {
		// 	if (window) window.location.href = '/error/403/';
		// } else if (r.status === 404) {
		// 	if (window) window.location.href = '/error/404/';
		// } else
		// if (r.status === 401) {
		// 	Storage.removeItem('forumUser');
		// }
		return r.json();
	});
}
