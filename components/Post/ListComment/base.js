'use client';
import React, { useEffect, useState } from 'react';
import Comment from '@/components/Post/Comment/base';
import AddComment from '@/components/Post/AddComment/base';
import ListCommentLoading from './loading';
import Pagination from '@/components/Post/Pagination/base';
import postApi from '@/services/postApi.service';
import { maxCommentsPerPage } from '@/utils/constant';
import { useCommentsListStore } from '@/store/forum';
import { toast } from 'react-toastify';

export default function ListComment({ idPost }) {
	const [page, setPage] = useState(0);
	// const [activeSort, setActiveSort] = useState(filterItems[0]);
	const { dataComments, setDataComments, loadingAdd, errorAdd, setMutate } = useCommentsListStore();

	const { comments_post, isLoading, isError, mutate } = postApi.ListCommentPost(
		idPost,
		maxCommentsPerPage,
		maxCommentsPerPage * page
	);

	useEffect(() => {
		setMutate(mutate);
	}, [mutate, setMutate]);

	useEffect(() => {
		if (!isError && !errorAdd) return;
		toast.error(errorAdd || isError);
		console.log('ListComment', errorAdd || isError);
	}, [isError, errorAdd]);

	useEffect(() => {
		setDataComments(comments_post);
	}, [comments_post, setDataComments]);

	// useEffect(() => {
	// 	console.log('dataComments ListComment', dataComments);
	// }, [dataComments]);

	if (isLoading || !dataComments) return <ListCommentLoading />;

	return (
		<>
			<div className='flex py-3'>
				<div className='flex items-center mr-2'>
					<svg
						className='w-6 h-6 mr-2'
						viewBox='0 0 20 21'
						fill='currentColor'
						xmlns='http://www.w3.org/2000/svg'>
						<path d='M4 12.7598H16V10.7964H4V12.7598ZM4 9.81464H16V7.85119H4V9.81464ZM4 6.86947H16V4.90602H4V6.86947ZM20 20.6136L16 16.6867H2C1.45 16.6867 0.979002 16.4943 0.587002 16.1094C0.195002 15.7246 -0.000664969 15.2625 1.69779e-06 14.7233V2.94257C1.69779e-06 2.40263 0.196002 1.94023 0.588002 1.5554C0.980002 1.17056 1.45067 0.978473 2 0.979128H18C18.55 0.979128 19.021 1.17155 19.413 1.55638C19.805 1.94122 20.0007 2.40328 20 2.94257V20.6136ZM16.85 14.7233L18 15.8277V2.94257H2V14.7233H16.85Z' />
					</svg>
					<p>{`${dataComments?.meta?.count} ${
						dataComments?.meta?.count > 1 ? 'comments' : 'comment'
					}`}</p>
				</div>
				{/* <div className='dropdown dropdown-end'>
			<label tabIndex='0' className='btn btn-sm'>
				<svg
					className='w-6 h-6 mr-2'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth='1.5'
					stroke='currentColor'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12'></path>
				</svg>
				Sort
			</label>
			<ul
				tabIndex='0'
				className='z-50 dropdown-content menu p-2 shadow bg-base-100 rounded-md w-52'>
				<li>
					<a>Top comments</a>
				</li>
				<li>
					<a>Newest first</a>
				</li>
			</ul>
		</div> */}
			</div>

			<div className='space-y-4'>
				<AddComment id={idPost} />

				<ul>
					{loadingAdd && (
						<li className='flex' key={`loading-add-cmt`}>
							<div className='flex-shrink-0 mr-3'>
								<div className='animate-skeleton rounded-full w-10 h-10'></div>
							</div>
							<div className='flex-1 pb-2'>
								<div className='animate-skeleton w-32 h-4 mb-2'></div>
								<div className='animate-skeleton w-96 h-4 mb-2'></div>
							</div>
							<div className='animate-skeleton w-10 h-10 rounded-full'></div>
						</li>
					)}
					{dataComments &&
						dataComments?.data?.map((comment) => (
							<li key={`user-${comment.id}.jpg`}>
								<Comment
									idPost={idPost}
									idComment={comment?.id}
									value={comment?.thumps_up}
									img={comment?.author?.avatar}
									author={comment?.author}
									time={comment?.created}
									text={comment?.content}
									replies={comment?.replies}
								/>
							</li>
						))}
				</ul>
			</div>

			<Pagination
				page={page}
				total={dataComments?.count}
				limit={maxCommentsPerPage}
				setPage={setPage}
			/>
		</>
	);
}
