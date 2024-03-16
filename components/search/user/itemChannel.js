import AvatarLoading from '@/components/avatar/loading';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Avatar = dynamic(() => import('@/components/avatar/base'), {
	loading: () => <AvatarLoading />,
});

export default function UserItem({ id, avatar, full_name, members, setMembers }) {
	const [state, setState] = useState(members.includes(id));

	return (
		<div className='flex justify-center items-center flex-1'>
			<Avatar url={avatar} name={full_name?.charAt(0)} className='w-10 font-normal' />
			<div className='ml-4 flex-1 line-clamp-2'>
				<h4 className='capitalize'>{full_name}</h4>
			</div>
			{state ? (
				<button
					className='btn btn-sm btn-neutral rounded-2xl text-sm font-semibold'
					onClick={() => {
						setMembers(members.filter((member_id) => member_id !== id));
						setState(false);
					}}>
					<i className='ri-subtract-fill'></i>
				</button>
			) : (
				<button
					className='btn btn-sm btn-secondary text-white rounded-2xl text-sm font-semibold'
					onClick={() => {
						setMembers([...members, id]);
						setState(true);
					}}>
					<i className='ri-add-fill'></i>
				</button>
			)}
		</div>
	);
}
