'use client';
import React, { useEffect, useState } from 'react';
import PostItem from '@/components/Post/PostItem/base';
import { toast } from 'react-toastify';
import PostListLoading from './loading';
import Pagination from '@/components/Post/Pagination/base';
import Filter from '@/components/Filter/base';
import { usePostListStore } from '@/store/forum';
import { filterItemsPost } from '@/utils/constant';
import postApi from '@/services/postApi.service';
import channelApi from '@/services/channelApi.service';
import { redirect, useSearchParams } from 'next/navigation';

function ListPost({ isChannel = false, customText = '' }) {
	let channel_id = '';
	const searchParams = useSearchParams();

	if (isChannel) {
		channel_id = searchParams.get('channel_id');
	}

	const [page, setPage] = useState(0);
	const [activeSort, setActiveSort] = useState(filterItemsPost[0]);
	const {
		dataPosts,
		dataPinPosts,
		setDataPosts,
		loadingAdd,
		loadingAddChannel,
		errorAdd,
		errorAddChannel,
		setMutatePosts,
	} = usePostListStore();

	const { posts, isLoading, isError, mutate } = isChannel
		? channelApi.ListPostChannel(
				channel_id,
				activeSort?.field,
				20 - dataPinPosts?.data?.length,
				(20 - dataPinPosts?.data?.length) * page
		  )
		: postApi.ListPostSchool(
				activeSort?.field,
				20 - dataPinPosts?.data?.length,
				(20 - dataPinPosts?.data?.length) * page
		  );

	useEffect(() => {
		setMutatePosts(mutate);
	}, [mutate, setMutatePosts]);

	useEffect(() => {
		if (!isError && !errorAdd && !errorAddChannel) return;
		toast.error(errorAdd || isError);
		console.log('ListPost', errorAdd || isError);
		redirect('/forum/');
	}, [isError, errorAdd, errorAddChannel]);

	useEffect(() => {
		setDataPosts(posts);
	}, [posts, setDataPosts]);

	// useEffect(() => {
	// 	if (isChannel) console.log('ischannel posts', dataPosts);
	// 	else console.log('posts', dataPosts);
	// }, [dataPosts]);

	if (isLoading) return <PostListLoading />;

	return (
		<>
			<div className='mb-8'>
				<div className='flex justify-between border-b-2 border-b-neutral'>
					<h3 className='pl-2 sm:pl-4 text-sm'>All Other Posts</h3>
					<Filter
						activeSort={activeSort}
						filterItems={filterItemsPost}
						setActiveSort={setActiveSort}
					/>
				</div>
				<ul>
					{(loadingAdd || loadingAddChannel) && page === 1 && (
						<li className='border-b-2 border-b-neutral flex items-center justify-between p-2 sm:p-4'>
							<div className='flex justify-center items-center flex-1'>
								<div className='animate-skeleton w-12 h-12 rounded-full'></div>

								<div className='ml-4 flex-1 flex flex-col'>
									<div className='animate-skeleton w-32 h-5 mb-1'></div>
									<div className='animate-skeleton w-28 h-3'></div>
								</div>
							</div>
							<div className='animate-skeleton w-15 h-15 rounded-full'></div>
						</li>
					)}
					{dataPosts?.data?.length > 0 ? (
						dataPosts?.data?.map((post, idx) => (
							<PostItem
								key={`post-${idx}`}
								value={post.thumps_up}
								id={post.id}
								title={post.subject}
								author={post.author}
								is_public={post?.is_public}
								last_comment={post?.last_comment}
								channel={post?.channel}
							/>
						))
					) : (
						<li className='border-b-2 border-b-neutral flex items-center justify-between p-2 sm:p-4'>
							<div className='flex justify-center items-center flex-1'>
								{customText || 'No posts in this school'}
							</div>
						</li>
					)}
				</ul>
			</div>

			<Pagination
				page={page}
				total={dataPosts?.meta?.count}
				limit={20 - dataPinPosts?.data?.length}
				setPage={setPage}
			/>
		</>
	);
}

export default ListPost;
