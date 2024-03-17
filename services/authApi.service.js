import { API, CLIENT_ID, CLIENT_SECRET } from '@/utils/constant';
import fetcher from '@/utils/fetcher';

const authApi = {
	// Get
	// Post
	Login: ({ email, password }) => {
		const url = `${API}/oauth2/token/`;
		return fetcher(url, 'POST', {
			email,
			password,
			grant_type: password ? 'password' : 'refresh_token',
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
		});
	},
	// Put
	// Patch
	// Delete
};

export default authApi;
