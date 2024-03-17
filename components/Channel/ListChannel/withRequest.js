'use client';
import { useUserStore } from '@/store/forum';
import { useEffect } from 'react';
import channelApi from '@/services/channelApi.service';
import { useSearchParams } from 'next/navigation';
import RequestItem from './item';

export default function ChannelList({ className = '' }) {
	const { profile, channelRequests, setChannelRequests } = useUserStore();

	const searchParams = useSearchParams();
	const channel_id = searchParams.get('channel_id');
	const owner = searchParams.get('owner');

	const { requests, isLoading, isError, mutate } = channelApi.ListRequestJoinChannel(channel_id);

	useEffect(() => {
		if (!isError) return;
		//toast.error(isError);
		console.log('ListJoinChannelRequest', isError);
	}, [isError]);

	useEffect(() => {
		setChannelRequests(requests);
	}, [requests, setChannelRequests]);

	// useEffect(() => {
	// 	console.log('channelRequests', channelRequests);
	// }, [channelRequests]);

	if (isLoading || !requests) return;

	return (
		<ul className={profile.user_id !== owner ? 'hidden' : className}>
			{channelRequests?.data &&
				channelRequests?.data.map((item, idx) => (
					<RequestItem
						id={item.id}
						channel_id={channel_id}
						message={item.message}
						sender={item.sender}
						mutate={mutate}
						key={`requestChannel-${idx}`}
					/>
				))}
		</ul>
	);
}
