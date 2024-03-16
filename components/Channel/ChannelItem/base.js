'use client';
import channelApi from '@/services/channelApi.service';
import { useUserStore } from '@/store/forum';
import { maxWord } from '@/utils/constant';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

function ChannelItem({ channel }) {
	const { profile } = useUserStore();
	const [isRequest, setIsRequest] = useState(true);

	const handleClick = async (channel_id) => {
		// For server
		const data = await channelApi.RequestJoinChannel(channel_id);
		if (data && !data.error) {
			toast.success(data?.message);
			// for UI
			setIsRequest(false);
		} else {
			toast.error(data.error_request || data.error);
			console.log('RequestJoinChannel', data.error_request || data.error);
		}
	};

	return (
		<div className='flex justify-center items-center flex-1'>
			<i className='ri-hashtag text-4xl'></i>
			<div className='ml-4 flex-1 line-clamp-2'>
				<Link
					href={`/forum/channel?channel_id=${channel.id}&channel_name=${channel.name}&owner=${channel.owner.id}`}
					className='flex items-center'>
					<h4 className='capitalize hover:text-accent-focus'>{channel.name}</h4>
					{channel.owner.id === profile.user_id && (
						<i className='ri-vip-crown-fill text-lg text-accent ml-2'></i>
					)}
				</Link>
				<ul className='list-disc sm:list-none text-primary-focus/60'>
					{channel.description && (
						<li className='text-sm font-normal'>
							{channel.description.length > 200
								? `${channel.description.substring(0, maxWord)}...`
								: channel.description}
						</li>
					)}
					<li className='flex flex-col sm:flex-row sm:items-center sm:space-x-2'>
						{channel.is_joined && (
							<>
								<span className={`text-sm font-normal text-accent-focus`}>
									<i className='ri-check-fill mr-2'></i>
									joined
								</span>
								<span className='font-bold hidden sm:inline'>•</span>
							</>
						)}
						{channel.is_private && (
							<>
								<span className={`text-xs font-normal`}>Private</span>
								<span className='font-bold hidden sm:inline'>•</span>
							</>
						)}
						{channel.owner && (
							<>
								<span className='text-xs font-normal underline'>
									<Link
										href={`/forum/user?id=${channel?.owner?.id}&name=${channel?.owner?.full_name}`}>
										{channel?.owner?.full_name}
									</Link>
								</span>
								<span className='font-bold hidden sm:inline'>•</span>
							</>
						)}
						{channel.members > 0 && (
							<span className='text-xs font-normal'>{`${channel.members} ${
								channel.members > 1 ? 'members' : 'member'
							}`}</span>
						)}
					</li>
				</ul>
			</div>
			{channel.owner.id !== profile.user_id && isRequest && !channel.is_joined && (
				<button
					className='btn btn-circle text-white bg-green-500 hover:bg-green-500/80'
					onClick={() => handleClick(channel.id)}>
					<i className='ri-add-fill text-3xl'></i>
				</button>
			)}
		</div>
	);
}
export default ChannelItem;
