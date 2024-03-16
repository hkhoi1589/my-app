'use client';
import Link from 'next/link';
import { useState } from 'react';
import channelApi from '@/services/channelApi.service';

export default function ChannelItem({ id, name, image_background, owner }) {
	const [hide, setHide] = useState(false);

	return (
		<li
			className={`flex border-b-2 items-center justify-between p-2 sm:p-4 ${
				hide ? 'hidden' : ''
			}`}>
			<div className='flex justify-center items-start'>
				<i className='ri-hashtag text-2xl'></i>
				<div className='ml-4 line-clamp-2'>
					<Link href={`/forum/channel?channel_id=${id}&channel_name=${name}`}>
						<h4 className='capitalize hover:text-accent-focus'>{name}</h4>
					</Link>
					{owner && (
						<div className='text-xs font-normal'>
							This channel is owned by
							<Link
								href={`/forum/user?id=${owner?.id}&name=${owner?.full_name}`}
								className='underline capitalize hover:text-accent-focus ml-1'>
								{owner?.full_name}
							</Link>
						</div>
					)}
				</div>
			</div>
			<div className='w-28 flex justify-between'>
				<button
					className='btn btn-circle text-white bg-red-500 hover:bg-red-500/80'
					onClick={async () => {
						await channelApi.RejectChannel(id);
						setHide(true);
					}}>
					<i className='ri-close-line text-3xl'></i>
				</button>
				<button
					className='btn btn-circle text-white bg-green-500 hover:bg-green-500/80'
					onClick={async () => {
						await channelApi.JoinUsersChannel(id);
						setHide(true);
					}}>
					<i className='ri-check-line text-3xl'></i>
				</button>
			</div>
		</li>
	);
}
