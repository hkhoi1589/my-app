'use client';

import { useAppStore } from '@/store/forum';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const ListChannel = dynamic(() => import('@/components/Channel/ListChannel/sidebar'));

export default function Sidebar({ className = '' }) {
	const { more, sidebar, toggleSidebar, setMore } = useAppStore();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const channel_id = searchParams.get('channel_id');

	const listSidebar = [
		{
			label: 'Channels',
			href: '/forum',
			icon: (
				<svg
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					className='min-w-[24px]'>
					<path
						d='M12 22C6.47699 22 1.99999 17.523 1.99999 12C1.99999 6.477 6.47699 2 12 2C17.523 2 22 6.477 22 12C22.0022 13.978 21.4161 15.9121 20.316 17.556C20.194 17.7375 20.4225 18.886 21 21C18.8855 20.4225 17.7375 20.194 17.556 20.316C15.9121 21.4161 13.978 22.0023 12 22Z'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinejoin='round'
					/>
					<path
						d='M15.6973 9.9099H7.30775M13.0763 7.8689L14.5333 16.1309M9.57625 7.8689L11.0333 16.1309M16.6978 13.9999H8.30775'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			),
			active: !channel_id && (pathname === '/forum/' || pathname === '/forum'),
		},
		{
			label: 'Posts',
			href: '/forum/posts',
			icon: <i className='ri-file-search-line text-2xl'></i>,
			active: pathname.match(/\/forum\/posts/),
		},
		{
			label: 'You',
			href: '/forum/you/your-posts',
			icon: <i className='ri-home-line text-2xl'></i>,
			active: pathname.match(/\/forum\/you/g),
		},
	];

	return (
		<div
			className={`sidebar ${
				sidebar ? 'sidebar-full' : 'w-[64px]'
			} flex flex-col items-center h-full bg-base-100 overflow-y-auto ${className} scrollbar-hide`}>
			<div className='w-full'>
				{listSidebar.map((item, idx) => (
					<Link
						key={`sidebar-${idx}`}
						className={`flex items-center w-full h-12 px-5 mb-2 hover:bg-neutral-focus border-solid border-r-base-content ${
							item.active
								? 'bg-neutral text-base-content border-r-4'
								: 'hover:bg-neutral hover:text-base-content'
						}`}
						href={item.href}
						data-tippy-content={item.label}
						data-tippy-placement='right'>
						{item.icon}
						<span className='sidebar-text ml-5 text-sm font-medium'>{item.label}</span>
					</Link>
				))}

				<div
					className='flex items-center w-full h-12 px-5 mt-2 hover:bg-neutral-focus cursor-pointer'
					onClick={() => {
						if (!sidebar) toggleSidebar();
						setMore();
					}}>
					<i
						className={`ri-arrow-right-s-line text-2xl transform duration-100 ${
							more ? 'rotate-90' : ''
						}`}></i>
					<span className='sidebar-text ml-5 text-sm font-medium'>Your Channels</span>
				</div>
				<ListChannel />
			</div>
		</div>
	);
}
