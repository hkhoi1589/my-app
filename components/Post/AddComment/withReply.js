'use client';
import commentApi from '@/services/commentApi.service';
import { useCommentsListStore, useUserStore } from '@/store/forum';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { formatUTC } from '@/utils/date';

import dynamic from 'next/dynamic';
import AvatarLoading from '@/components/avatar/loading';
const Avatar = dynamic(() => import('@/components/avatar/base'), {
	loading: () => <AvatarLoading />,
});

export default function AddComment({ id, reply_comment = '', setIsReplyLoading }) {
	const [content, setContent] = useState('');

	const { dataComments, setDataComments } = useCommentsListStore();
	const { profile } = useUserStore();

	const handleUploadComment = async () => {
		setIsReplyLoading(true);
		setContent('');

		const result = await commentApi.CommentPost(id, content, reply_comment);
		//console.log(result);
		if (result?.status) {
			// Updates UI
			const newComment = {
				author: {
					avatar: profile?.avatar,
					full_name: `${profile?.last_name} ${profile?.first_name}`,
					id: profile?.user_id,
				},
				content,
				id: result?.data?.id,
				created: formatUTC(),
				modified: formatUTC(),
				parent: null,
				replies: [],
				status: 'C',
				thumps_up: [],
			};
			const newData = {
				...dataComments,
				data: dataComments.data.map((comment) => {
					if (comment.id === reply_comment)
						return {
							...comment,
							replies: [newComment, ...comment.replies],
						};
					return comment;
				}),
			};
			setDataComments(newData);
			toast.success(result?.data?.message);
		} else {
			toast.error(result?.message);
		}
		setIsReplyLoading(false);
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			handleUploadComment();
		}
	};

	return (
		<div className='mt-2 flex items-start'>
			<div className='flex-shrink-0 mr-3'>
				<Avatar
					url={profile?.avatar}
					name={profile?.first_name?.charAt(0)}
					className='w-10 h-10 font-normal'
				/>
			</div>
			<div className='flex-1'>
				<input
					type='text'
					name='q'
					id='comment'
					value={content}
					onChange={(e) => setContent(e.target.value)}
					onKeyDown={handleKeyDown}
					className={`outline-none placeholder:truncate h-8 text-base bg-transparent border-solid border-b-neutral border-b-2 input-sm w-full focus-within:border-primary`}
					placeholder='Add a comment...'
				/>

				<div className='flex justify-end mt-2'>
					{/* <button
						className='btn btn-sm btn-circle btn-ghost tooltip tooltip-bottom'
						data-tip='Emoji'>
						<svg
							className='w-5 h-5 mx-auto'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z'></path>
						</svg>
					</button> */}
					<button
						className='badge whitespace-nowrap px-2 py-3 hover:bg-neutral-focus bg-[#6A6A6A] text-base-300 font-bold text-xs tracking-wider'
						onClick={handleUploadComment}>
						Reply
					</button>
				</div>
			</div>
		</div>
	);
}
