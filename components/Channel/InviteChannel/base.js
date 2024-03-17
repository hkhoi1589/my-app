'use client';
import Progress from '@/components/progress';
import UserItem from '@/components/search/user/itemChannel';
import channelApi from '@/services/channelApi.service';
import userApi from '@/services/userApi.service';
import { useUserStore } from '@/store/forum';
import useDebounce from '@/utils/useDebounce';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

function InviteChannel({ isOpen, setIsOpen, oldMembers, className = '' }) {
	const modal = useRef(null);

	const searchParams = useSearchParams();
	const channel_id = searchParams.get('channel_id');
	//const owner = searchParams.get('owner');
	const { profile } = useUserStore();

	const [isSubmit, setIsSubmit] = useState(false);
	const [members, setMembers] = useState([]);
	const [data, setData] = useState([]);

	// search
	const [keyword, setKeyword] = useState(''); // input
	const valDebounce = useDebounce(keyword, 500); // debounce input

	const { friends, isLoading, isError } = userApi.GetFriends(profile.user_id, 'full_name');

	const handleInviteChannel = async () => {
		setIsSubmit(true);
		if (members.length === 0) {
			toast.warn('Please choose some friends to invite!');
			setIsSubmit(false);
			return;
		} else {
			const result = await channelApi.InviteUsersChannel(channel_id, members);
			if (result?.status) {
				setIsOpen(!isOpen);
				setMembers([]);
				toast.success(result?.message);
			} else {
				toast.error(result?.message);
			}
		}

		setIsSubmit(false);
	};

	useEffect(() => {
		if (!isError) return;
		toast.error(isError);
		console.log('InviteChannel', isError);
	}, [isError]);

	useEffect(() => {
		setData(
			friends?.data?.filter(
				({ id: friends }) => !oldMembers?.some(({ id: members }) => friends === members)
			)
		);
		return () => setData([]);
	}, [friends, oldMembers]);

	return (
		<div ref={modal} className={`modal sm:modal-middle ${isOpen ? 'modal-open' : ''}`}>
			<div className='modal-box max-h-none overflow-y-visible'>
				<button
					className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
					onClick={(e) => {
						if (e.target !== modal.current) setIsOpen(!isOpen);
					}}>
					✕
				</button>

				<h3 className='font-bold text-lg'>Invite member to this Channel</h3>
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
					{data?.length > 0 ? (
						data.map((friend, idx) => (
							<li key={`friend-${idx}`} className='flex items-center py-4'>
								<UserItem {...friend} members={members} setMembers={setMembers} />
							</li>
						))
					) : (
						<li className='border-b-2 border-b-neutral flex items-center justify-between p-2 sm:p-4'>
							<div className='flex justify-center items-start flex-1'>No friend</div>
						</li>
					)}
				</ul>
				{isLoading && <Progress className='mx-auto my-4' />}

				<div className='modal-action mt-4'>
					<button
						className='btn btn-sm btn-neutral rounded-2xl text-sm font-semibold'
						onClick={(e) => {
							if (e.target !== modal.current) setIsOpen(!isOpen);
						}}>
						Cancel
					</button>
					<button
						className='btn btn-sm btn-primary rounded-2xl text-sm font-semibold'
						onClick={() => {
							handleInviteChannel();
						}}>
						{isSubmit && <span className='loading loading-spinner loading-xs'></span>}
						Invite
					</button>
				</div>
			</div>
			<div onClick={() => setIsOpen(!isOpen)} className='modal-backdrop'></div>
		</div>
	);
}
export default InviteChannel;
