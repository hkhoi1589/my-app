'use client';
import { API } from '@/utils/constant';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

const postApi = {
	// Get
	ListPinPostForSchool: (limit, offset = 0) => {
		// OK
		const url = `${API}/api/v1/posts-pinned?limit=${limit}&offset=${offset}`;
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
	SearchPostSchool: (ordering = '-created', limit = '', offset = 0, q = '', isFetch = true) => {
		// OK
		const url = `${API}/api/v1/posts/search?ordering=${ordering}&limit=${limit}&offset=${offset}&q=${q}`;
		const { data, isLoading, mutate } = useSWR(isFetch ? url : '', fetcher);

		return {
			posts: data,
			isLoading,
			isError: data?.status === false ? data?.message : '',
			mutate,
		};
	},
	ListPostSchool: (ordering = '-created', limit, offset = 0) => {
		// OK
		const url = `${API}/api/v1/posts?ordering=${ordering}&limit=${limit}&offset=${offset}`;
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
	GetDetailPost: (id) => {
		// OK
		const url = `${API}/api/v1/posts/${id}`;
		const { data, isLoading, mutate } = useSWR(url, fetcher, {
			revalidateOnFocus: false,
		});
		return {
			post: data?.data,
			isLoading,
			isError: data?.status === false ? data?.message : '',
			mutate,
		};
	},
	ListCommentPost: (id, limit, offset) => {
		const url = `${API}/api/v1/posts/${id}/comments?limit=${limit}&offset=${offset}`;
		const { data, isLoading, mutate } = useSWR(url, fetcher, {
			revalidateOnFocus: false,
		});

		return {
			comments_post: data,
			isLoading,
			isError: data?.status === false ? Object.values(data?.error)[0] : '',
			mutate,
		};
	},

	// Post
	CreatePostSchool: (subject, content, tags, is_public) => {
		// OK
		const url = `${API}/api/v1/posts`;
		return fetcher(url, 'POST', {
			subject,
			content,
			tags,
			is_public,
		});
	},
	UploadImagePost: (id, image, caption = '') => {
		const url = `${API}/api/v1/posts/${id}/image`;

		let formData = new FormData();
		formData.append('image', image);
		formData.append('caption', caption);

		//console.log(...formData);
		return fetcher(
			url,
			'POST',
			{
				files: formData,
			},
			{
				'Content-Type': 'multipart/form-data',
			}
		);
	},

	// Put
	CreateLocationPost: (
		id,
		primary_street_name,
		secondary_street_name,
		primary_location,
		secondary_location
	) => {
		const url = `${API}/api/v1/post/${id}/location`;
		return fetcher(url, 'PUT', {
			primary_street_name,
			secondary_street_name,
			primary_location,
			secondary_location,
		});
	},
	PinPostSchool: (post_id) => {
		const url = `${API}/api/v1/posts/pinned/${post_id}`;
		return fetcher(url, 'PUT');
	},
	LikePost: (id_post) => {
		const url = `${API}/api/v1/posts/${id_post}/like`;
		return fetcher(url, 'PUT');
	},

	// Patch
	UpdatePostSchool: (id, subject, content, tags, is_public) => {
		const url = `${API}/api/v1/posts/${id}`;
		return fetcher(url, 'PATCH', {
			subject,
			content,
			tags,
			is_public,
		});
	},
	UpdateImage: (image, id, image_id, caption = '') => {
		const url = `${API}/api/v1/posts/${id}/image/${image_id}`;

		let formData = new FormData();
		formData.append('image', image);
		formData.append('caption', caption);

		//console.log(...formData);
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
	RemovePinPostSchool: (post_id) => {
		const url = `${API}/api/v1/posts/pinned/${post_id}`;
		return fetcher(url, 'DELETE');
	},
	RemoveLikePost: (id_post) => {
		const url = `${API}/api/v1/posts/${id_post}/like`;
		return fetcher(url, 'DELETE');
	},

	// remove
	TotalPost: () => {
		const url = `${process.env.NEXT_PUBLIC_BASIC_API_ENDPOINT}/stats`;
		return fetcher(url);
	},
	RemovePost: (post_id) => {
		const url = `${API}/api/v1/posts/${post_id}`;
		return fetcher(url, 'DELETE');
	},
	RemoveImagePost: (post_id, image_id) => {
		const url = `${API}/api/v1/posts/${post_id}/image/${image_id}`;
		return fetcher(url, 'DELETE');
	},
};

export default postApi;
