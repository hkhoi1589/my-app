'use client';
import { useRef, useState } from 'react';
import AddComment from '@/components/Post/AddComment/withReply';
import NestedComment from '@/components/Post/Comment/nestedComment';
import Heart from '@/components/Button/Heart';
import { formatDate } from '@/utils/date';
import commentApi from '@/services/commentApi.service';
import { toast } from 'react-toastify';
import { useCommentsListStore, useUserStore } from '@/store/forum';
import CommentLoading from './loading';
import Paragraph from '@/components/Post/Paragraph/withReadMore';
import AvatarLoading from '@/components/avatar/loading';
import dynamic from 'next/dynamic';

const Avatar = dynamic(() => import('@/components/avatar/base'), {
	loading: () => <AvatarLoading />,
});

export default function Comment({ idPost, idComment, value, replies, img, author, time, text }) {
	const [isReply, setIsReply] = useState(false);
	const [isReplyLoading, setIsReplyLoading] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [content, setContent] = useState(text);
	const [isEdit, setIsEdit] = useState(false);
	const dropdownRef = useRef(null);

	const { dataComments, setDataComments } = useCommentsListStore();
	const { profile } = useUserStore();

	const handleEditComment = async () => {
		setIsLoading(true);

		const result = await commentApi.UpdateCommentSchool(idComment, content);
		//console.log('result', result);

		if (result?.status) {
			// Updates UI
			const { data } = result;
			const newData = {
				meta: dataComments.meta || {},
				data: dataComments.data.map((element) => {
					if (element.id === data.id) return data;
					return element;
				}),
			};
			//console.log('newData', newData);
			toast.success('Update comment successfully!');
			setDataComments(newData);
		} else {
			toast.error(result?.message);
		}
		setIsLoading(false);
	};

	const handleRemoveComment = async () => {
		setIsLoading(true);

		const data = await commentApi.DestroyCommentSchool(idComment);

		if (data?.status) {
			// Updates UI
			const newData = {
				meta: { ...dataComments.meta, count: dataComments.meta.count - 1 },
				data: dataComments.data.filter((element) => element.id !== idComment),
			};
			//console.log('newData', newData);
			toast.success('Remove comment successfully!');
			setDataComments(newData);
		} else {
			toast.error(data?.message);
		}
		setIsLoading(false);
	};

	if (isLoading) return <CommentLoading />;

	return (
		<div className='flex relative'>
			<div className='flex-shrink-0 mr-3'>
				<Avatar
					url={img}
					name={profile?.first_name?.charAt(0)}
					className='rounded-full w-10 h-10 font-normal'
				/>
			</div>
			<div className='flex-1 pb-2'>
				<strong>{author?.full_name}</strong>
				<span className='ml-2 text-xs opacity-50'>{formatDate(time)}</span>
				{isEdit ? (
					<div className='flex-1'>
						<input
							type='text'
							name='q'
							id='comment'
							value={content}
							onChange={(e) => setContent(e.target.value)}
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
								className='badge whitespace-nowrap mr-4 px-2 py-3 hover:bg-neutral-focus bg-[#6A6A6A] text-base-300 font-bold text-xs tracking-wider'
								onClick={() => setIsEdit(false)}>
								Cancel
							</button>
							<button
								className='badge whitespace-nowrap px-2 py-3 hover:bg-neutral-focus bg-[#6A6A6A] text-base-300 font-bold text-xs tracking-wider'
								onClick={() => {
									setIsEdit(false);
									handleEditComment();
								}}>
								Edit
							</button>
						</div>
					</div>
				) : (
					<Paragraph content={content} />
				)}

				<div className='flex items-center'>
					<Heart type='comment' heart={value} id={idComment} className='-ml-4 mr-2' />
					<button
						onClick={() => setIsReply(!isReply)}
						className='btn btn-sm flex btn-ghost text-xs tracking-wider text-base-content font-bold'>
						<i className='ri-reply-fill text-xl text-[#aab8c2]'></i>
						Reply
					</button>
				</div>

				{isReply && (
					<AddComment
						id={idPost}
						reply_comment={idComment}
						setIsReplyLoading={setIsReplyLoading}
					/>
				)}
				<ul className='mt-2'>
					{isReplyLoading && <CommentLoading />}
					{replies &&
						replies?.map((reply) => (
							<li key={`user-${reply?.id}.jpg`}>
								<NestedComment
									reply_comment={idComment}
									idComment={reply?.id}
									value={reply?.thumps_up}
									img={reply?.author?.avatar}
									author={reply?.author}
									time={reply?.created}
									text={reply?.content}
								/>
							</li>
						))}
				</ul>
			</div>
			{author?.id === profile?.user_id && (
				<details className='absolute top-0 right-0 dropdown dropdown-end' ref={dropdownRef}>
					<summary
						tabIndex='0'
						className='btn btn-sm btn-circle btn-ghost m-1 list-none cursor-pointer my-auto whitespace-nowrap font-medium text-sm hover:text-accent-focus'>
						<i className='ri-more-fill'></i>
					</summary>
					<ul
						tabIndex='0'
						className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-36'>
						<li>
							<button
								className='whitespace-nowrap'
								onClick={() => {
									setIsEdit(true);
									dropdownRef.current.removeAttribute('open');
								}}>
								Edit
							</button>
						</li>
						<li>
							<button
								className='whitespace-nowrap'
								onClick={() => {
									handleRemoveComment();
									dropdownRef.current.removeAttribute('open');
								}}>
								Delete
							</button>
						</li>
					</ul>
				</details>
			)}
		</div>
	);
}
