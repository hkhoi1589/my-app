'use client';
import Link from 'next/link';
import { useUserStore } from '@/store/forum';
import userApi from '@/services/userApi.service';
import { toast } from 'react-toastify';

import dynamic from 'next/dynamic';
import AvatarLoading from '@/components/avatar/loading';
const Avatar = dynamic(() => import('@/components/avatar/base'), {
	loading: () => <AvatarLoading />,
});

export default function UserItem({ id, full_name, avatar, mutate, email = '' }) {
	const { friendsRequests, setFriendRequests } = useUserStore();

	const handleClick = async (isAccept = false) => {
		// for UI
		setFriendRequests(friendsRequests.filter((request) => request?.id !== id));

		// for server
		const resolveRequests = () =>
			isAccept ? userApi.AcceptFriendRequest(id) : userApi.RejectFriendRequest(id);
		const data = await resolveRequests();
		if (data && !data.error) {
			toast.success(data?.message);
		} else {
			if (JSON.stringify(mutate) !== '{}') mutate();

			toast.error(data.error_error_friend || data.error);
			console.log('FriendRequest', data.error_error_friend || data.error);
		}
	};

	return (
		<li className='flex items-center justify-between p-2 sm:p-4'>
			<div className='flex justify-center items-center flex-1'>
				<Avatar url={avatar} name={full_name ? full_name.charAt(0) : ''} className='w-12' />
				<div className='ml-2 sm:ml-4 flex-1 line-clamp-2'>
					<Link href={`/forum/user?id=${id}&name=${full_name}`}>
						<h4 className='capitalize hover:text-accent-focus'>{full_name}</h4>
						{email && <p className='text-sm hover:text-accent-focus'>{email}</p>}
					</Link>
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
