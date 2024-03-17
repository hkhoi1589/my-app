'use client';
import { formatTimeAgo } from '@/utils/date';
import Heart from '@/components/Button/Heart';
import Paragraph from '@/components/Post/Paragraph/withReadMore';
import ListComment from '@/components/Post/ListComment/base';
import EditPost from '@/components/Post/EditPost/base';
import AvatarLoading from '@/components/avatar/loading';
import postApi from '@/services/postApi.service';
import { Gallery } from 'react-grid-gallery';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Loading from './loading';
import { toast } from 'react-toastify';
import { usePostListStore, useUserStore } from '@/store/forum';

import dynamic from 'next/dynamic';
const Modal = dynamic(() => import('@/components/Modal/confirm'));
const Avatar = dynamic(() => import('@/components/avatar/base'), {
	loading: () => <AvatarLoading />,
});

export default function DetailPost() {
	const searchParams = useSearchParams();
	const { profile } = useUserStore();
	const { setMutateDetailPost } = usePostListStore();
	const dropdownRef = useRef(null);

	const id = searchParams.get('id');
	const [isEdit, setIsEdit] = useState(false);
	const [isRemove, setIsRemove] = useState(false);
	const router = useRouter();

	const { post, isLoading, isError, mutate } = postApi.GetDetailPost(id);

	const onRemove = async (val) => {
		if (val) {
			const res = await postApi.RemovePost(id);
			if (res && res.status) {
				router.back(); // remove -> back previous page
				toast.success('Remove post successfully!');
				return;
			} else {
				toast.error('A post cannot be deleted after one hour after its creation.');
				console.log(res);
			}
		}
		setIsRemove(false);
	};

	useEffect(() => {
		setMutateDetailPost(mutate);
	}, [mutate, setMutateDetailPost]);

	useEffect(() => {
		if (!isError) return;
		toast.error(isError);
		console.log('detail post', isError);
		redirect('/forum/');
	}, [isError]);

	useEffect(() => {
		if (!post) return;
		if (!post.is_public && profile.user_id !== post.author?.id)
			toast.error('This post is private!');
		//console.log(post);
	}, [post, profile.user_id]);

	if (isLoading || !post || !id) return <Loading />;

	return (
		<div className='py-4 px-6 overflow-y-auto flex-1'>
			<div className='flex justify-between items-center'>
				<h2 className='text-3xl lg:text-4xl flex-1 leading-[2.72rem] font-semibold line-clamp-2'>
					{post?.subject}
				</h2>

				<div className='flex items-center relative'>
					<Heart heart={post?.thumps_up} id={post?.id} />
					{profile.user_id === post?.author?.id && (
						<details
							className='absolute top-0 right-0 dropdown dropdown-end'
							ref={dropdownRef}>
							<summary
								tabIndex='0'
								className='list-none cursor-pointer my-auto whitespace-nowrap font-medium text-sm hover:text-accent-focus'>
								<i className='ri-more-2-fill'></i>
							</summary>
							<ul
								tabIndex={0}
								className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-36'>
								<li>
									<button onClick={() => setIsEdit(true)}>Edit post</button>
								</li>
								<li>
									<button onClick={() => setIsRemove(true)}>Delete post</button>
								</li>
							</ul>
						</details>
					)}
				</div>
			</div>
			<div className='py-2 mb-4'>
				<Paragraph content={post?.content} maxWord={300} />

				{post.images && (
					<Gallery images={post.images} rowHeight={360} enableImageSelection={false} />
				)}
			</div>
			<div className='flex items-center mb-4'>
				<div className='flex items-center uppercase text-sm'>
					<Avatar
						url={post?.author?.avatar}
						name={post?.author?.full_name ? post.author.full_name.charAt(0) : ''}
						className='w-10 mr-3'
					/>
					<span>{post?.author?.full_name}</span>
					{post.created && (
						<span className='ml-1'>post {formatTimeAgo(post.created)}</span>
					)}
				</div>
				<ul className='flex gap-3 px-6'>
					{post.tags &&
						post.tags.map((tag, idx) => (
							<li
								className='py-1 px-3 border border-neutral-focus rounded-full'
								key={`tag-${idx}`}>
								{tag}
							</li>
						))}
				</ul>
			</div>

			<ListComment idPost={post?.id} />

			<Modal
				open={isRemove}
				onConfirm={onRemove}
				title='Warning'
				content='Are you sure you want to delete it ?'
			/>

			<EditPost
				isOpen={isEdit}
				setIsOpen={setIsEdit}
				idPost={id}
				is_public={post.is_public}
				images={post.images}
				subject={post.subject}
				oldtags={post.tags}
				content={post.content}
				mutate={mutate}
				channel_id={post?.channel_id}
			/>
		</div>
	);
}
