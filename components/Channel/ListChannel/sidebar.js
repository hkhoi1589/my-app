'use client';

import userApi from '@/services/userApi.service';
import { useAppStore, useUserStore } from '@/store/forum';
import Link from 'next/link';
import { useEffect } from 'react';
import ListChannelLoading from './loadingSideBar';
import { useSearchParams } from 'next/navigation';

function ListChannel() {
	const { more } = useAppStore();
	const searchParams = useSearchParams();
	const channel_id = searchParams.get('channel_id');

	const { yourChannels, setYourChannels, setMutateYourChannels } = useUserStore();

	// call api
	const { channels, isLoading, isError, mutate } = userApi.ListChannelUser();

	useEffect(() => {
		setMutateYourChannels(mutate);
	}, [mutate, setMutateYourChannels]);

	// neu loi
	useEffect(() => {
		if (!isError) return;
		console.log('Sidebar', isError);
	}, [isError]);

	useEffect(() => {
		// convert lai cho phu hop UI
		const modifiedListChannel = channels?.data?.map((channel) => {
			return {
				...channel,
				href: `/forum/channel?channel_id=${channel.id}&channel_name=${channel.name}&owner=${channel.owner.id}`,
				active: channel_id === channel.id.toString(),
			};
		});

		// luu vao local
		setYourChannels(modifiedListChannel);
	}, [channels, channel_id, setYourChannels]);

	// useEffect(() => {
	// 	console.log('yourChannels', yourChannels);
	// }, [yourChannels]);

	if (isLoading) return <ListChannelLoading />;

	return (
		<div className={`${more ? 'sidebar-more' : 'hidden'}`}>
			{yourChannels?.map((item) => (
				<Link
					key={`channel-${item.id}`}
					className={`flex items-center w-full h-12 px-5 mt-2 hover:bg-neutral-focus ${
						item.active
							? 'bg-neutral text-base-content border-r-4'
							: 'hover:bg-neutral hover:text-base-content'
					}`}
					href={item.href}
					data-tippy-content={item.name}
					data-tippy-placement='right'>
					<i className='ri-hashtag text-2xl'></i>
					<span className='sidebar-text ml-5 text-sm font-medium truncate'>
						{item.name}
					</span>
				</Link>
			))}
		</div>
	);
}

export default ListChannel;
