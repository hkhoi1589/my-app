'use client';
import Tabs from '@/components/Post/Tabs/base';
import { usePathname } from 'next/navigation';

import dynamic from 'next/dynamic';
const NewPost = dynamic(() => import('@/components/Post/NewPost/base'));
const NewChannel = dynamic(() => import('@/components/Channel/NewChannel/base'));
const AvatarInfo = dynamic(() => import('@/components/avatar/withInfo'), { ssr: false });

export default function YouLayout({ children }) {
	const pathname = usePathname();

	const listYouTabs = [
		{
			label: 'Your Posts',
			href: '/forum/you/your-posts',
			active: pathname.match(/\/forum\/you\/your-posts/),
		},
		{
			label: 'Your Channels',
			href: '/forum/you/your-channels',
			active: pathname.match(/\/forum\/you\/your-channels/),
		},
		{
			label: 'Friends List',
			href: '/forum/you/friends-list',
			active: pathname.match(/\/forum\/you\/friends-list/),
		},
		{
			label: 'Profile',
			href: '/forum/you/profile',
			active: pathname.match(/\/forum\/you\/profile/),
		},
	];

	return (
		<main id='main' className='p-4 overflow-y-auto flex-1'>
			<div className='container mx-auto p-4'>
				<div className=''>
					<div className='flex flex-col sm:flex-row'>
						<AvatarInfo className='w-16' />
						<div className='flex flex-col justify-start lg:flex-row lg:ml-4 mb-4 lg:mb-0'>
							<NewChannel className='mr-0 lg:mr-4 mb-4 lg:mb-0' />
							<NewPost />
						</div>
					</div>
					<Tabs items={listYouTabs} />
				</div>
				<div className='border-t-2 border-t-neutral'>{children}</div>
			</div>
		</main>
	);
}
