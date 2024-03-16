import { API } from '@/utils/constant';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

const commentApi = {
	// Get
	ListCommentSchool: (limit, offset) => {
		const url = `${API}/api/v1/comments?limit=${limit}&offset=${offset}`;
		const { data, isLoading } = useSWR(url, fetcher);

		return {
			comments: data,
			isLoading,
			isError: data?.status === false ? data?.message : '',
		};
	},
	GetDetailCommentSchool: (comment_id) => {
		const url = `${API}/api/v1/comments/${comment_id}`;
		const { data, isLoading } = useSWR(url, fetcher);
		return {
			detail_comments: data,
			isLoading,
			isError: data?.status === false ? data?.message : '',
		};
	},

	// Post
	CommentPost: (id, content, reply_comment) => {
		const url = `${API}/api/v1/posts/${id}/comments`;
		let body = {
			content,
		};
		if (reply_comment)
			body = {
				content,
				reply_comment,
			};
		return fetcher(url, 'POST', body);
	},

	// Put
	UpdateCommentSchool: (comment_id, content, author, status, parent) => {
		const url = `${API}/api/v1/comments/${comment_id}`;
		return fetcher(url, 'PUT', {
			content,
			author,
			status,
			parent,
		});
	},

	LikeComment: (comment_id) => {
		const url = `${API}/api/v1/comment/${comment_id}/like`;
		return fetcher(url, 'PUT');
	},

	// Patch
	PartialUpdateCommentSchool: (comment_id, content, author, status, parent) => {
		const url = `${API}/api/v1/comments/${comment_id}`;
		return fetcher(url, 'PATCH', {
			content,
			author,
			status,
			parent,
		});
	},

	// Delete
	DestroyCommentSchool: (comment_id) => {
		const url = `${API}/api/v1/comments/${comment_id}`;
		return fetcher(url, 'DELETE');
	},

	// Remove
	ListCommentByIdPost: (idPost) => {
		const url = `${process.env.NEXT_PUBLIC_BASIC_API_ENDPOINT}/comments?postId=${idPost}`;
		return fetcher(url);
	},

	RemoveLikeComment: (comment_id) => {
		const url = `${API}/api/v1/comment/${comment_id}/like`;
		return fetcher(url, 'DELETE');
	},
};

export default commentApi;
