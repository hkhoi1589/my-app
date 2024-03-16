'use client';
import { useState } from 'react';
import Link from 'next/link';
import PostMenu from './menu';
import Heart from '@/components/Button/Heart';

import dynamic from 'next/dynamic';
import AvatarLoading from '@/components/avatar/loading';
const Avatar = dynamic(() => import('@/components/avatar/base'), {
	loading: () => <AvatarLoading />,
});

export default function PostItem({
	id,
	subject,
	is_public = false,
	channel,
	last_comment,
	thumps_up,
	fill,
	author,
}) {
	const [hide, setHide] = useState(false);
	let info = author ? { ...author } : {};

	return (
		<li className={`flex items-center justify-between p-2 sm:p-4 ${hide ? 'hidden' : ''}`}>
			<div className='flex justify-center items-center flex-1'>
				<Avatar
					url={info.avatar}
					name={info ? info.full_name?.charAt(0) : 'Me'}
					className='w-12'
				/>
				<div className='ml-2 sm:ml-4 flex-1 line-clamp-2'>
					<Link href={`/forum/detail?id=${id}`}>
						<h4 className='capitalize hover:text-accent-focus'>{subject}</h4>
					</Link>
					<ul className='flex flex-col flex-wrap list-disc sm:list-none sm:flex-row sm:items-center sm:space-x-2'>
						{author && (
							<li className='text-sm font-normal underline'>
								<Link
									href={`/forum/user?id=${author?.id}&name=${author?.full_name}`}>
									{author?.full_name}
								</Link>
							</li>
						)}
						{is_public ? (
							<li className='flex flex-nowrap'>
								<div className='font-bold mr-2 hidden sm:inline leading-[20px]'>
									•
								</div>
								<div className='text-sm font-normal underline'>everyone</div>
							</li>
						) : (
							<li className='flex flex-nowrap'>
								<div className='font-bold mr-2 hidden sm:inline leading-[20px]'>
									•
								</div>
								<div className='text-sm font-normal underline'>only me</div>
							</li>
						)}
						{channel && (
							<li className='flex flex-nowrap'>
								<div className='font-bold mr-2 hidden sm:inline leading-[20px]'>
									•
								</div>
								<div className='text-sm font-normal hidden sm:inline'>
									in{' '}
									<Link
										href={`/forum/channel/?channel_id=${channel.id}&channel_name=${channel.name}&owner=${channel.owner_uuid}`}
										className='underline'>
										{channel.name}
									</Link>
								</div>
							</li>
						)}
						{last_comment && (
							<li className='flex flex-nowrap'>
								<div className='font-bold mr-2 hidden sm:inline leading-[20px]'>
									•
								</div>
								<div className='text-sm font-normal hidden sm:inline'>
									Last comment by{' '}
									<span className='underline'>
										{last_comment?.author?.full_name}
									</span>
								</div>
							</li>
						)}
					</ul>
				</div>
			</div>
			{fill && (
				<div className='flex items-center relative'>
					<Heart heart={thumps_up} id={id} />
					<PostMenu id={id} onRemoveIt={() => setHide(true)} />
				</div>
			)}
		</li>
	);
}
