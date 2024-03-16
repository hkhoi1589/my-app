'use client';
import Link from 'next/link';
import { toast } from 'react-toastify';
import channelApi from '@/services/channelApi.service';

import dynamic from 'next/dynamic';
import AvatarLoading from '@/components/avatar/loading';
const Avatar = dynamic(() => import('@/components/avatar/base'), {
	loading: () => <AvatarLoading />,
});

export default function RequestItem({ id, message, sender, mutate, channel_id }) {
	const handleClick = async (isAccept = false) => {
		// for server
		const resolveRequests = () =>
			isAccept
				? channelApi.AcceptRequestJoinChannel(channel_id, id)
				: channelApi.RejectJoinChannel(channel_id, id);
		const data = await resolveRequests();
		if (data && !data.error) {
			toast.success(data?.message);

			// for UI
			if (JSON.stringify(mutate) !== '{}') mutate();
		} else {
			toast.error(data.error_error_firebase || data.error);
			console.log('ChannelRequest', data.error_error_firebase || data.error);
		}
	};

	return (
		<li className='flex items-center justify-between p-2 sm:p-4'>
			<div className='flex justify-center items-center flex-1'>
				<Avatar
					url={sender?.avatar}
					name={sender?.full_name ? sender.full_name.charAt(0) : ''}
					className='w-12'
				/>
				<div className='ml-2 sm:ml-4 flex-1 line-clamp-2'>
					<Link href={`/forum/user?id=${sender?.id}&name=${sender?.full_name}`}>
						<h4 className='capitalize hover:text-accent-focus'>{sender?.full_name}</h4>
					</Link>
					<p className='text-sm hover:text-accent-focus'>{message}</p>
				</div>
			</div>
			<div className='w-28 flex justify-between'>
				<button
					className='btn btn-circle text-white bg-red-500 hover:bg-red-500/80'
					onClick={() => handleClick()}>
					<i className='ri-close-line text-3xl'></i>
				</button>
				<button
					className='btn btn-circle text-white bg-green-500 hover:bg-green-500/80'
					onClick={() => handleClick(true)}>
					<i className='ri-check-line text-3xl'></i>
				</button>
			</div>
		</li>
	);
}
