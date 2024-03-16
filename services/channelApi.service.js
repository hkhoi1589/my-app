'use client';
import { API } from '@/utils/constant';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

const channelApi = {
	// GET
	GetDetailCommentChannel: (channel_id, comment_id) => {
		const url = `${API}/api/v1/channel/${channel_id}/comments/${comment_id}`;
		const { data, isLoading } = useSWR(url, fetcher);

		return {
			detail_comment: data,
			isLoading,
			isError: data?.status === false ? data?.message : '',
		};
	},
	SearchChannelSchool: (
		ordering = '-created',
		limit = '',
		offset = 0,
		q = '',
		isFetch = true
	) => {
		// OK
		const url = `${API}/api/v1/channels/search?ordering=${ordering}&limit=${limit}&offset=${offset}&q=${q}`;
		const { data, isLoading, mutate } = useSWR(isFetch ? url : null, fetcher);

		return {
			channels: data,
			isLoading,
			isError: data?.status === false ? data?.message : '',
			mutate,
		};
	},
	SearchMemberChannel: (channel_id, limit = '', offset = 0, q = '') => {
		const url = `${API}/api/v1/channels/${channel_id}/members/search?limit=${limit}&offset=${offset}&q=${q}`;
		const { data, isLoading } = useSWR(url, fetcher);

		return {
			members: data,
			isLoading,
			isError: data?.status === false ? data?.message : '',
		};
	},
	ListChannel: (ordering = '-created', limit = '', offset = 0) => {
		const url = `${API}/api/v1/channels?ordering=${ordering}&limit=${limit}&offset=${offset}`;
		const { data, isLoading, mutate } = useSWR(url, fetcher, {
			revalidateOnFocus: false,
		});

		return {
			channels: data,
			isLoading,
			isError: data?.status === false ? data?.message : '',
			mutate,
		};
	},
	ListMemberChannel: (channel_id, ordering = '-created', limit = '', offset = 0) => {
		const url = `${API}/api/v1/channels/${channel_id}/members?ordering=${ordering}&limit=${limit}&offset=${offset}`;
		const { data, isLoading, mutate } = useSWR(url, fetcher, {
			revalidateOnFocus: false,
		});

		return {
			members: data,
			isLoading,
			isError: data?.status === false ? data?.message : '',
			mutate,
		};
	},
	ListPinnedPostsChannel: (channel_id, limit, offset = 0) => {
		const url = `${API}/api/v1/channels/${channel_id}/posts-pinned?limit=${limit}&offset=${offset}`;
		const { data, isLoading, mutate } = useSWR(limit ? url : '', fetcher, {
			revalidateOnFocus: false,
		});

		return {
			pinPosts: data,
			isLoading,
			isError: data?.status === false ? data?.message : '',
			mutate,
		};
	},
	ListRequestJoinChannel: (channel_id, ordering = '-created', limit = '', offset = 0, q = '') => {
		const url = `${API}/api/v1/channels/${channel_id}/requests?ordering=${ordering}&limit=${limit}&offset=${offset}&q=${q}`;
		const { data, isLoading, mutate } = useSWR(url, fetcher);

		return {
			requests: data,
			isLoading,
			isError: data?.status === false ? data?.message : '',
			mutate,
		};
	},
	ListPostChannel: (channel_id, ordering = '-created', limit, offset = 0) => {
		const url = `${API}/api/v1/channels/${channel_id}/posts?ordering=${ordering}&limit=${limit}&offset=${offset}`;
		const { data, isLoading, mutate } = useSWR(limit ? url : '', fetcher, {
			revalidateOnFocus: false,
		});

		return {
			posts: data,
			isLoading,
			isError: data?.status === false ? data?.message : '',
			mutate,
		};
	},
	SearchPostChannel: (
		channel_id,
		ordering = '-created',
		limit = '',
		offset = 0,
		q = '',
		isFetch = true
	) => {
		const url = `${API}/api/v1/channels/${channel_id}/posts/search?ordering=${ordering}&limit=${limit}&offset=${offset}&q=${q}`;
		const { data, isLoading, mutate } = useSWR(isFetch ? url : '', fetcher);

		return {
			posts: data,
			isLoading,
			isError: data?.status === false ? data?.message : '',
			mutate,
		};
	},

	// Post
	CreateChannelSchool: (name, description = '', is_private = false) => {
		const url = `${API}/api/v1/channels/`;
		return fetcher(url, 'POST', {
			name,
			description,
			is_private,
		});
	},
	InviteUsersChannel: (channel_id, members, message = 'Hello') => {
		const url = `${API}/api/v1/channels/${channel_id}/invitations`;
		return fetcher(url, 'POST', {
			members,
			message,
		});
	},
	CreatePostChannel: (channel_id, subject, content, tags, is_public) => {
		const url = `${API}/api/v1/channels/${channel_id}/posts`;
		return fetcher(url, 'POST', {
			subject,
			content,
			tags,
			is_public,
		});
	},
	RequestJoinChannel: (channel_id, message = 'Hi, I want to join this channel') => {
		const url = `${API}/api/v1/channels/${channel_id}/request`;
		return fetcher(url, 'POST', {
			message,
		});
	},

	// Put
	UpdateCommentChannel: (channel_id, comment_id, content, author, status, parent) => {
		const url = `${API}/api/v1/channel/${channel_id}/comments/${comment_id}`;
		return fetcher(url, 'PUT', {
			content,
			author,
			status,
			parent,
		});
	},
	UpdateChannel: (channel_id, name, description, is_private) => {
		const url = `${API}/api/v1/channels/${channel_id}`;
		return fetcher(url, 'PUT', {
			name,
			description,
			is_private,
		});
	},
	PinPostChannel: (channel_id, id) => {
		const url = `${API}/api/v1/channels/${channel_id}/posts/pinned/${id}`;
		return fetcher(url, 'PUT');
	},
	AcceptRequestJoinChannel: (channel_id, request_id) => {
		const url = `${API}/api/v1/channels/${channel_id}/request/${request_id}`;
		return fetcher(url, 'PUT');
	},

	// Patch
	PartialUpdateCommentChannel: (channel_id, comment_id, content, author, status, parent) => {
		const url = `${API}/api/v1/channel/${channel_id}/comments/${comment_id}`;
		return fetcher(url, 'PATCH', {
			content,
			author,
			status,
			parent,
		});
	},
	ChangeStatusChannel: (channel_id, status) => {
		const url = `${API}/api/v1/channels/${channel_id}`;
		return fetcher(url, 'PATCH', {
			status,
		});
	},
	JoinUsersChannel: (channel_id) => {
		const url = `${API}/api/v1/channels/${channel_id}/invitation`;
		return fetcher(url, 'PATCH');
	},
	UpdatePostChannel: (channel_id, id, subject, content, tags) => {
		const url = `${API}/api/v1/channels/${channel_id}/post/${id}`;
		return fetcher(url, 'PATCH', {
			subject,
			content,
			tags,
		});
	},

	// Delete
	DestroyCommentChannel: (channel_id, comment_id) => {
		const url = `${API}/api/v1/channel/${channel_id}/comments/${comment_id}`;
		return fetcher(url, 'DELETE');
	},
	RemoveChannel: (channel_id) => {
		const url = `${API}/api/v1/channels/${channel_id}`;
		return fetcher(url, 'DELETE');
	},
	RejectChannel: (channel_id) => {
		const url = `${API}/api/v1/channels/${channel_id}/invitation`;
		return fetcher(url, 'DELETE');
	},
	RejectJoinChannel: (
		channel_id,
		request_id,
		message = 'Sorry, You cannot join this channel'
	) => {
		const url = `${API}/api/v1/channels/${channel_id}/request/${request_id}`;
		return fetcher(url, 'DELETE', {
			message,
		});
	},
	RemovePinPostChannel: (channel_id, id) => {
		const url = `${API}/api/v1/channels/${channel_id}/posts/pinned/${id}`;
		return fetcher(url, 'DELETE');
	},
	DeletePostChannel: (channel_id, id) => {
		const url = `${API}/api/v1/channels/${channel_id}/posts/${id}`;
		return fetcher(url, 'DELETE');
	},
};

export default channelApi;
