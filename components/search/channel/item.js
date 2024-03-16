'use client';
import Link from 'next/link';
import ChannelMenu from './menu';
import { useState } from 'react';
import { useUserStore } from '@/store/forum';

export default function ChannelItem({
	id,
	name,
	owner,
	description,
	members,
	posts,
	is_joined,
	is_private,
	mutate = {},
	fill,
}) {
	const { profile } = useUserStore();
	const [hide, setHide] = useState(false);
	return (
		<li className={`flex items-center justify-between p-2 sm:p-4 ${hide ? 'hidden' : ''}`}>
			<div className='flex justify-center items-start flex-1'>
				<i className='ri-hashtag text-2xl'></i>
				<div className='ml-4 flex-1 line-clamp-2'>
					<Link
						href={`/forum/channel?channel_id=${id}&channel_name=${name}&owner=${owner.id}`}
						className='flex items-center'>
						<h4 className='capitalize hover:text-accent-focus'>{name}</h4>
						{owner.id === profile.user_id && (
							<i className='ri-vip-crown-fill text-lg text-accent ml-2'></i>
						)}
					</Link>
					<ul className='list-disc sm:list-none text-primary-focus/60'>
						{description && (
							<li className='text-xs font-normal'>
								{description.length > 200
									? `${description.substring(0, maxWord)}...`
									: description}
							</li>
						)}
						<li className='flex flex-col sm:flex-row sm:items-center sm:space-x-2'>
							{is_joined && (
								<>
									<span className={`text-xs font-normal text-accent-focus`}>
										<i className='ri-check-fill mr-2'></i>
										joined
									</span>
									<span className='font-bold hidden sm:inline'>•</span>
								</>
							)}
							{is_private && (
								<>
									<span className={`text-xs font-normal`}>Private</span>
									<span className='font-bold hidden sm:inline'>•</span>
								</>
							)}
							{members > 0 && (
								<>
									<span className='text-xs font-normal'>{`${members} ${
										members > 1 ? 'members' : 'member'
									}`}</span>
									<span className='font-bold hidden sm:inline'>•</span>
								</>
							)}
							{posts > 0 && (
								<span className='text-xs font-normal'>{`${posts} ${
									posts > 1 ? 'posts' : 'post'
								}`}</span>
							)}
						</li>
					</ul>
				</div>
			</div>
			{fill && (
				<ChannelMenu
					id={id}
					name={name}
					description={description}
					is_private={is_private}
					mutate={mutate}
					onRemoveIt={() => setHide(true)}
				/>
			)}
		</li>
	);
}
