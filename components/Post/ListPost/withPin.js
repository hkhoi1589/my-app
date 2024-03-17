'use client';
import React, { useEffect, useState } from 'react';
import PostItem from '@/components/Post/PostItem/base';
import { toast } from 'react-toastify';
import PostListLoading from './loading';
import Pagination from '@/components/Post//Pagination/base';
import Filter from '@/components/Filter/base';
import { filterItems, filterItemsPost, maxPinPostsPerPage } from '@/utils/constant';
import { usePostListStore } from '@/store/forum';
import postApi from '@/services/postApi.service';
import channelApi from '@/services/channelApi.service';
import { redirect, useSearchParams } from 'next/navigation';

function ListPost({ isChannel = false }) {
	let channel_id = '';
	const searchParams = useSearchParams();

	if (isChannel) {
		channel_id = searchParams.get('channel_id');
	}

	const [page, setPage] = useState(0);
	const [activeSort, setActiveSort] = useState(filterItems[0]);
	const { dataPinPosts, setDataPinPosts, errorAdd, errorAddChannel, setMutatePinPosts } =
		usePostListStore();

	const { pinPosts, isLoading, isError, mutate } = isChannel
		? channelApi.ListPinnedPostsChannel(
				channel_id,
				maxPinPostsPerPage,
				maxPinPostsPerPage * page
		  )
		: postApi.ListPinPostForSchool(maxPinPostsPerPage, maxPinPostsPerPage * page);

	useEffect(() => {
		setMutatePinPosts(mutate);
	}, [mutate, setMutatePinPosts]);

	useEffect(() => {
		if (!isError && !errorAdd && !errorAddChannel) return;
		toast.error(errorAdd || isError);
		console.log('ListPinPost', errorAdd || isError);
		redirect('/forum/');
	}, [isError, errorAdd, errorAddChannel]);

	useEffect(() => {
		setDataPinPosts(pinPosts);
	}, [pinPosts, setDataPinPosts]);

	// useEffect(() => {
	// 	console.log('pinposts', data);
	// }, [data]);

	if (isLoading) return <PostListLoading />;

	return (
		<div className={dataPinPosts?.data?.length > 0 ? 'block' : 'hidden'}>
			<div className='mb-8'>
				<div className='flex justify-between border-b-2 border-b-neutral'>
					<h3 className='pl-2 sm:pl-4 text-sm'>Pinned Posts</h3>

					<Filter
						activeSort={activeSort}
						filterItems={filterItemsPost}
						setActiveSort={setActiveSort}
					/>
				</div>
				<ul>
					{dataPinPosts?.data?.map((post, idx) => (
						<PostItem
							key={`post-${idx}`}
							value={post.thumps_up}
							id={post?.id}
							title={post?.subject}
							author={post.author}
							is_public={post?.is_public}
							last_comment={post?.last_comment}
							isPin={true}
						/>
					))}
				</ul>
			</div>

			<Pagination
				page={page}
				total={dataPinPosts?.meta?.count}
				limit={maxPinPostsPerPage}
				setPage={setPage}
			/>
		</div>
	);
}

export default ListPost;
