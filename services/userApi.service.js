import { useUserStore } from '@/store/forum';
import { API } from '@/utils/constant';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

const userApi = {
	// Get
	GetFriends: (id, ordering = '', limit = '', offset = '') => {
		const url = `${API}/api/v1/users/${id}/friends?ordering=${ordering}&limit=${limit}&offset=${offset}`;
		const { data, isLoading } = useSWR(url, fetcher, {
			revalidateOnFocus: false,
		});

		return {
			friends: data,
			isLoading,
			isError: data?.status === false ? data?.message : '',
		};
	},
	GetFriendsRequest: (id, limit = '', offset = '') => {
		const url = `${API}/api/v1/users/${id}/friend-request?limit=${limit}&offset=${offset}`;
		const { data, isLoading, mutate } = useSWR(url, fetcher);

		return {
			requests: data,
			isLoading,
			isError: data?.status === false ? data?.message : '',
			mutate,
		};
	},
	GetChannelRequest: (id, limit = '', offset = '') => {
		const url = `${API}/api/v1/users/${id}/request-channels?limit=${limit}&offset=${offset}`;
		const { data, isLoading, mutate } = useSWR(url, fetcher);

		return {
			requests: data,
			isLoading,
			isError: data?.status === false ? data?.message : '',
			mutate,
		};
	},
	GetProfile: () => {
		const url = `${API}/api/v1/userprofile/me`;
		const { data, isLoading, mutate } = useSWR(url, fetcher);

		return {
			profile: data,
			isLoading,
			isError: data?.status === false ? data?.message : '',
			mutate,
		};
	},
	GetUserProfile: (user_id) => {
		const url = `${API}/api/v1/userprofile/${user_id}/profile`;
		const { data, isLoading, error } = useSWR(url, fetcher);

		return {
			user_profile: data,
			isLoading,
			isError: error,
		};
	},
	SearchAllUser: (limit, offset, q) => {
		const url = `${API}/api/v1/users/search?limit=${limit}&offset=${offset}&q=${q}`;
		const { data, isLoading } = useSWR(url, fetcher);

		return {
			users: data,
			isLoading,
			isError: data?.status === false ? data?.message : '',
		};
	},
	ListChannelUser: (ordering = '-created', limit = '', offset = 0) => {
		const { access } = useUserStore();

		const url = `${API}/api/v1/me/channels?ordering=${ordering}&limit=${limit}&offset=${offset}`;
		const { data, isLoading, mutate } = useSWR(access ? url : null, fetcher, {
			revalidateOnFocus: false,
		});

		return {
			channels: data,
			isLoading,
			isError: data?.status === false ? data?.message : '',
			mutate,
		};
	},

	// Post
	AddHobbyUserProfile: (type_id, description) => {
		const url = `${API}/api/v1/hobby/profile`;
		return fetcher(url, 'POST', {
			type_id,
			description,
		});
	},
	SendFriendRequest: (id, message) => {
		const url = `${API}/api/v1/users/${id}/friend-request`;
		return fetcher(url, 'POST', {
			message,
		});
	},
	AcceptFriendRequest: (id) => {
		const url = `${API}/api/v1/users/${id}/accept-friend`;
		return fetcher(url, 'POST');
	},

	// Put
	UpdateHobbyUserProfile: (id, type_id, description) => {
		const url = `${API}/api/v1/hobby/profile`;
		return fetcher(url, 'PUT', {
			id,
			type_id,
			description,
		});
	},
	UpdateLocationUserProfile: (
		primary_street_name,
		secondary_street_name,
		primary_location,
		secondary_location,
		city,
		city_area,
		state,
		postal_code,
		country,
		country_area,
		phone
	) => {
		const url = `${API}/api/v1/location/profile`;
		return fetcher(url, 'PUT', {
			primary_street_name,
			secondary_street_name,
			primary_location,
			secondary_location,
			city,
			city_area,
			state,
			postal_code,
			country,
			country_area,
			phone,
		});
	},
	ChangePassword: (old_password, new_password) => {
		const url = `${API}/api/v1/users/change-password`;
		return fetcher(url, 'PUT', {
			old_password,
			new_password,
		});
	},
	UpdateUserStatusSchool: (id, is_active) => {
		const url = `${API}/api/v1/users/change-status`;
		return fetcher(url, 'PUT', {
			id,
			is_active,
		});
	},
	ResetPassword: (email, token, new_password, retype_new_password) => {
		const url = `${API}/api/v1/users/forgot-password`;
		return fetcher(url, 'PUT', {
			email,
			token,
			new_password,
			retype_new_password,
		});
	},
	SearchEmailForgotPassword: (email) => {
		const url = `${API}/api/v1/users/forgot-password/search-email`;
		return fetcher(url, 'PUT', {
			email,
		});
	},
	VerifyForgotPasswordToken: (token) => {
		const url = `${API}/api/v1/users/forgot-password/verify-token`;
		return fetcher(url, 'PUT', {
			token,
		});
	},

	// Patch
	UpdateUserProfile: (birthday, phone, gender, description, nickname) => {
		const url = `${API}/api/v1/userprofile/profile`;
		return fetcher(url, 'PATCH', {
			birthday,
			phone,
			gender,
			description,
			nickname,
		});
	},

	UploadAvatar: (image) => {
		const url = `${API}/api/v1/users/avatar`;

		let formData = new FormData();
		formData.append('avatar', image);

		return fetcher(
			url,
			'PATCH',
			{
				files: formData,
			},
			{
				'Content-Type': 'multipart/form-data',
			}
		);
	},

	// Delete
	RemoveHobbyUser: (id) => {
		const url = `${API}/api/v1/hobby/profile`;
		return fetcher(url, 'DELETE', { id });
	},
	RejectFriendRequest: (id) => {
		const url = `${API}/api/v1/users/${id}/reject-friend`;
		return fetcher(url, 'DELETE');
	},

	// Remove
	ListCommentByIdPost: (idPost) => {
		const url = `${API}/comments?postId=${idPost}`;
		return fetcher(url);
	},
};

export default userApi;
