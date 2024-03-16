'use client';
import Modal from '@/components/Modal/withButton';
import UserItem from '@/components/search/user/item';
import Progress from '@/components/progress';
import useDebounce from '@/utils/useDebounce';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import channelApi from '@/services/channelApi.service';
import { toast } from 'react-toastify';

import dynamic from 'next/dynamic';
const InviteChannel = dynamic(() => import('@/components/Channel/InviteChannel/base'), {
	ssr: false,
});

function ListMember({ className = '' }) {
	//const { profile } = useUserStore();

	const searchParams = useSearchParams();
	const channel_id = searchParams.get('channel_id');
	//const owner = searchParams.get('owner');

	const [isOpen, setIsOpen] = useState(false);
	const [isInvite, setIsInvite] = useState(false);

	// search
	const [keyword, setKeyword] = useState(''); // input
	const valDebounce = useDebounce(keyword, 500); // debounce input

	const { members, isLoading, isError } = channelApi.ListMemberChannel(channel_id, 'first_name');

	useEffect(() => {
		if (!isError) return;
		toast.error(isError);
		console.log('ListMembers', isError);
	}, [isError]);

	// useEffect(() => {
	// 	console.log('ListMember', data);
	// }, [data]);

	return (
		<div>
			<Modal
				className={`btn btn-sm btn-primary hover:text-base-300 rounded-full ${className}`}
				title='View members'
				isIcon={false}
				isOpen={isOpen}
				setIsOpen={setIsOpen}>
				<div className='flex justify-between mt-4'>
					<h3 className='font-bold text-lg'>View member to this Channel</h3>
					<button
						className={`btn btn-sm btn-primary hover:text-base-300 rounded-full flex-nowrap`}
						onClick={() => setIsInvite(!isInvite)}>
						<i className='ri-add-line'></i>
						Invite member
					</button>
				</div>
				{/* Search */}
				<div className={`container mx-auto p-4 ${className}`}>
					<div className='relative w-full'>
						<button className='btn btn-sm btn-ghost btn-circle z-10 absolute top-2 left-2'>
							<i className='ri-search-line text-xl opacity-80'></i>
						</button>
						<div className='dropdown w-full'>
							<input
								className='w-full input border-neutral rounded-full pl-10 pr-24'
								placeholder='Search'
								onChange={(e) => setKeyword(e.target.value)}
								tabIndex={1}
							/>
						</div>
					</div>
				</div>
				<ul className='mb-8 overflow-y-auto max-h-52'>
					{members?.data?.length > 0 ? (
						members?.data?.map((member, idx) => (
							<UserItem key={`member-${idx}`} {...member} />
						))
					) : (
						<li className='border-b-2 border-b-neutral flex items-center justify-between p-2 sm:p-4'>
							<div className='flex justify-center items-start flex-1'>
								No member in this channel
							</div>
						</li>
					)}
				</ul>
				{isLoading && <Progress className='mx-auto my-4' />}
			</Modal>
			<InviteChannel isOpen={isInvite} setIsOpen={setIsInvite} oldMembers={members?.data} />
		</div>
	);
}
export default ListMember;
