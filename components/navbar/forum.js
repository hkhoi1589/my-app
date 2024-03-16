'use client';
import { useAppStore, useUserStore, useNotiStore } from '@/store/forum';
import { useRouter } from 'next/navigation';
import SwapTheme from '@/components/Button/SwapTheme';
import { removeServiceWorker } from '@/utils/firebase';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

const Avatar = dynamic(() => import('@/components/avatar/base'));
const Search = dynamic(() => import('@/components/search/base'));
const PushNotification = dynamic(() => import('@/components/PushNotification/base'));

export default function Navbar({ className = '' }) {
	const { setNoti, setFCMToken } = useNotiStore();
	const { more, toggleSidebar, setMore } = useAppStore();
	const { setAccess, setRefresh, setProfile, profile } = useUserStore();
	const router = useRouter();

	const onLogout = async () => {
		try {
			// remove fcm service worker, forumUser, forumNoti
			setNoti([]);
			setFCMToken('');
			removeServiceWorker();

			setAccess(null);
			setRefresh(null);
			setProfile({});
			router.push('/auth/login/?msg=forum');
		} catch (error) {
			console.log('onLogout', error);
		}
	};

	return (
		<div className={`backdrop-blur ${className}`}>
			<nav className='w-full px-1 flex justify-between min-h-16'>
				<div className='flex items-center px-1'>
					<button
						className='btn btn-ghost btn-circle mr-2'
						onClick={() => {
							toggleSidebar();
							if (more) setMore();
						}}>
						<i className='ri-menu-line text-2xl'></i>
					</button>
					<Link href='/' className='overflow-hidden max-h-[69px] relative'>
						<Image src='/img/svg/beyond-full.svg' className='logo-mono' alt='logo.png' height={48} />
					</Link>
				</div>

				<div className='w-full max-w-2xl mx-auto hidden md:block'>
					<Search />
				</div>

				<div className='inline-flex items-center space-x-3'>
					<SwapTheme />
					<PushNotification />
					<div className='dropdown dropdown-end'>
						<label
							tabIndex={0}
							className='list-none cursor-pointer my-auto whitespace-nowrap font-medium text-sm hover:text-accent-focus'>
							<Avatar
								url={profile.avatar}
								name={profile.first_name?.charAt(0)}
								className='w-10 font-normal'
							/>
						</label>
						<ul
							tabIndex={0}
							className='menu menu-sm dropdown-content border border-neutral shadow-sm bg-base-100 rounded-box mt-3 z-[1] p-2 w-36'>
							<li>
								<a onClick={() => router.push('/forum/you/profile')}>Settings</a>
							</li>
							<li>
								<a onClick={onLogout}>Logout</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
}
