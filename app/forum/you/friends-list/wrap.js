'use client';
import { useUserStore } from '@/store/forum';
import UserList from '@/components/search/user/list';
import dynamic from 'next/dynamic';
const FriendRequestList = dynamic(() => import('@/components/search/friendRequest/list'), {
	ssr: false,
}); // client side rendering
export default function Page() {
	const { profile } = useUserStore();
	const src = `/api/v1/users/${profile.user_id}/friends`;
	return (
		<>
			<FriendRequestList className='border-b-2 border-neutral' />

			<UserList src={src} loader={true} limit={10} fill={true} />
		</>
	);
}
