'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import AvatarLoading from '@/components/avatar/loading';
import { useRef } from 'react';

const Avatar = dynamic(() => import('@/components/avatar/base'), {
	loading: () => <AvatarLoading />,
});

export default function UserItem({ id, email, full_name, avatar, fill = false }) {
	const dropdownRef = useRef(null);

	return (
		<li className='flex items-center justify-between p-2 sm:p-4 w-full'>
			<div className='flex justify-center items-center flex-1'>
				<Avatar url={avatar} name={full_name ? full_name.charAt(0) : ''} className='w-12' />
				<div className='ml-2 sm:ml-4 flex-1 line-clamp-2'>
					<Link href={`/forum/user?id=${id}&name=${full_name}`}>
						<h4 className='capitalize hover:text-accent-focus'>{full_name}</h4>
						<p className='text-sm hover:text-accent-focus'>{email}</p>
					</Link>
				</div>
			</div>
			{fill && (
				<details className='dropdown dropdown-end' ref={dropdownRef}>
					<summary
						tabIndex='0'
						className='btn btn-sm btn-circle btn-ghost m-1 list-none cursor-pointer my-auto whitespace-nowrap font-medium text-sm hover:text-accent-focus'>
						<i className='ri-more-2-fill'></i>
					</summary>
					<ul
						tabIndex={0}
						className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-36'>
						<li>
							<Link href={`/forum/user?id=${id}&name=${full_name}`}>
								View Profile
							</Link>
						</li>
					</ul>
				</details>
			)}
		</li>
	);
}
