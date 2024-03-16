'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Tabs({ className = '' }) {
	const pathname = usePathname();

	const items = [
		{
			label: 'posts',
			href: '/forum/posts',
			active: pathname.match(/\/forum\/posts/),
		},
		{
			label: 'channels',
			href: '/forum',
			active: pathname === '/forum/',
		},
		{
			label: 'you',
			href: '/forum/you/your-posts',
			active: pathname.match(
				/\/forum\/you\/(profile|your-posts|your-channels|friends-list)/g
			),
		},
	];

	return (
		<div className={`space-x-4 mb-4 flex justify-between sm:justify-normal ${className}`}>
			{items.map((item, idx) => (
				<Link
					href={item.href}
					className={`btn btn-sm ${!item.active && 'btn-outline'}`}
					key={`tab_badge-${idx}`}>
					{item.label}
				</Link>
			))}
		</div>
	);
}
