'use client';
import { useUserStore } from '@/store/forum';
import userApi from '@/services/userApi.service';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import dynamic from 'next/dynamic';
import AvatarLoading from '@/components/avatar/loading';

const Avatar = dynamic(() => import('@/components/avatar/base'), {
	loading: () => <AvatarLoading />,
});

export default function Detail() {
	const { profile } = useUserStore();
	const router = useRouter();
	const searchParams = useSearchParams();
	const user_id = searchParams.get('id');
	const { user_profile } = userApi.GetUserProfile(user_id);

	if (user_profile && !user_profile.status) {
		toast.warn(user_profile.message);
		router.push(`/forum/you/profile`);
	}

	const upro = user_profile?.data;
	const onRequest = async (e) => {
		const target = e.currentTarget;
		target.disabled = true;
		const res = await userApi.SendFriendRequest(
			user_id,
			`My name is ${profile?.first_name}, I want to be your friend`
		);
		//console.log('res UserPage', res);
		if (!res.status) {
			target.disabled = false;
			toast.warn(res.message);
		}
	};

	// useEffect(() => {
	// 	console.log('friendsList', friendsList);
	// }, [friendsList]);

	return (
		upro && (
			<div className='container mx-auto p-4'>
				<div className='flex justify-center items-center flex-1 p-4 border-b-2 border-t-neutral'>
					<Avatar url={upro.avatar} name={upro.first_name.charAt(0)} className='w-16' />
					<div className='ml-2 sm:ml-4 flex-1 line-clamp-2'>
						<h4 className='capitalize hover:text-accent-focus'>
							{upro.first_name} {upro.last_name}
						</h4>
						<p className='text-sm hover:text-accent-focus'>{upro.email}</p>
					</div>
					<div>
						{profile.user_id !== user_id && !upro.is_friend && (
							<button
								className='btn btn-sm btn-primary hover:text-base-300 rounded-full flex-nowrap'
								onClick={(e) => onRequest(e)}>
								<i className='ri-send-plane-fill'></i>Request friends
							</button>
						)}
					</div>
				</div>
				<div className='p-4 w-full'>
					<div className='flex items-center justify-between mb-4'>
						<span className='text-base font-normal'>General Information</span>
					</div>
					<div className='grid grid-rows-5 grid-flow-row sm:grid-flow-col gap-3'>
						<div className='flex text-xs font-normal'>
							<div className='w-1/3 text-base-content'>First Name</div>
							<div className='flex-1 font-semibold'>{upro.first_name}</div>
						</div>
						<div className='flex text-xs font-normal'>
							<div className='w-1/3 text-base-content'>Last Name</div>
							<div className='flex-1 font-semibold'>{upro.last_name}</div>
						</div>
						<div className='flex text-xs font-normal'>
							<div className='w-1/3 text-base-content'>Nick Name</div>
							<div className='flex-1 font-semibold'>{upro.nickname}</div>
						</div>
						<div className='flex text-xs font-normal'>
							<div className='w-1/3 text-base-content'>Birth Day</div>
							<div className='flex-1 font-semibold'>{upro.birthday}</div>
						</div>
						<div className='flex text-xs font-normal'>
							<div className='w-1/3 text-base-content'>Gender</div>
							<div className='flex-1 font-semibold'>
								{upro.gender === 'M' ? 'Male' : 'Female'}
							</div>
						</div>
						<div className='flex text-xs font-normal'>
							<div className='w-1/3 text-base-content'>Hobbies</div>
							<div className='flex-1 font-semibold'>
								{upro.hobbies && upro.hobbies.join(',')}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	);
}
