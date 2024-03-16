'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar({ className = '' }) {
	const pathname = usePathname();

	const list = [
		// {
		// 	label: 'Register',
		// 	href: '/auth/register',
		// 	icon: <i className='ri-user-add-line text-lg mr-1'></i>,
		// 	active: pathname.match(/\/auth\/register/),
		// },
		{
			label: 'Login',
			href: '/auth/login',
			active: pathname.match(/\/auth\/login/),
		},
	];

	return (
		<div className={`backdrop-blur bg-base-100 ${className}`}>
			<nav className='container mx-auto px-4 flex justify-between min-h-16'>
				<div className='flex items-center'>
					<Link href='/' className='overflow-hidden max-h-[69px] relative'>
						<Image src='/img/svg/beyond-full.svg' alt='beyond-full.svg' className='logo-mono' height={48} />
					</Link>
				</div>
				<div className='inline-flex items-center space-x-3'>
					{list.map((item, idx) => (
						<Link
							key={`${idx}`}
							href={item.href}
							className={`btn btn-primary ${
								item.active ? 'opacity-50 pointer-events-none' : ''
							}`}>
							{item.icon}
							{item.label}
						</Link>
					))}
				</div>
			</nav>
		</div>
	);
}
