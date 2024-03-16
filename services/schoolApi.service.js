import { API, CLIENT_ID, CLIENT_SECRET } from '@/utils/constant';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

const schoolApi = {
	// Get
	ListUserSchool: (limit = 6, offset) => {
		const url = `${API}/api/v1/roles?limit=${limit}&offset=${offset}`;
		const { data, isLoading } = useSWR(url, fetcher);

		return {
			users: data,
			isLoading,
			isError: data?.status === false ? data?.message : '',
		};
	},
	SearchTag: (q = '', limit = '', offset = 0) => {
		const url = `${API}/api/v1/tags/search?limit=${limit}&offset=${offset}&q=${q}`;
		const { data, isLoading } = useSWR(url, fetcher);

		return {
			tags: data?.data, // dont need meta
			isLoading,
			isError: data?.status === false ? data?.message : '',
		};
	},

	// Post
	RegistrationDeviceNotification: (registration_id) => {
		const url = `${API}/notifications/register/`;
		return fetcher(url, 'POST', {
			registration_id,
		});
	},
	ObtainToken: (
		client_id,
		client_secret,
		grant_type,
		refresh_token = '',
		email = '',
		password = ''
	) => {
		const url = `${API}/oauth2/token/`;
		return fetcher(url, 'POST', {
			email,
			password,
			refresh_token,
			grant_type,
			client_id,
			client_secret,
		});
	},
	RevokeToken: (token, client_id, client_secret) => {
		const url = `${API}/oauth2/token/revoke/`;
		return fetcher(url, 'POST', {
			token,
			client_id,
			client_secret,
		});
	},
	RefreshToken: (refresh) => {
		const url = `${API}/oauth2/token/`;
		return fetcher(url, 'POST', {
			grant_type: 'refresh_token',
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			refresh_token: refresh,
		});
	},

	// Put

	// Patch
	UpdateSchool: (school_id, name, introduction, website) => {
		const url = `${API}/api/v1/school/${school_id}`;
		return fetcher(url, 'PATCH', {
			name,
			introduction,
			website,
		});
	},

	// Delete
	DestroyFCMToken: (registration_id) => {
		const url = `${API}/notifications/register/`;
		return fetcher(url, 'DELETE', { registration_id });
	},

	// Remove
	ListCommentByIdPost: (idPost) => {
		const url = `${API}/comments?postId=${idPost}`;
		return fetcher(url);
	},
};

export default schoolApi;
