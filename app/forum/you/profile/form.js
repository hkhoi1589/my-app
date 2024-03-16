'use client';
import { useUserStore } from '@/store/forum';
import { useState, useEffect } from 'react';
import fetcher from '@/utils/fetcher';
import { API } from '@/utils/constant';
import { formatDate } from '@/utils';

export default function ProfileForm() {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const { profile, setProfile } = useUserStore();
	const [edit, setEdit] = useState(false); // toggle edit
	const [error, setError] = useState({}); // error object
	// data form
	const [data, setData] = useState({
		nickname: profile?.nickname || '',
		birthday: formatDate(profile?.birthday) || '',
		gender: profile?.gender || '',
		phone: '',
	});

	const onEdit = async (e) => {
		e.preventDefault();
		if (edit) {
			const res = await fetcher(`${API}/api/v1/userprofile/profile`, 'PATCH', data);
			if (res.status) {
				// success
				setProfile({ ...profile, ...data });
				setEdit(false);
			} else {
				// error
				setError(res.error);
			}
		} else {
			setEdit(true);
		}
	};

	return (
		<div className='p-4'>
			<div className='flex items-center justify-between mb-4'>
				<span className='text-base font-normal'>General Information</span>
				<button
					onClick={onEdit}
					className='badge whitespace-nowrap py-3 px-5 hover:bg-neutral-focus bg-[#6A6A6A] tracking-wider text-xs font-bold text-base-300'>
					{edit ? 'Save' : 'Edit'}
				</button>
			</div>
			{isClient && (
				<div className='grid grid-rows-5 grid-flow-row sm:grid-flow-col gap-3'>
					<div className='flex text-xs font-normal'>
						<div className='w-1/3 text-base-content'>First Name</div>
						<div className='flex-1 font-semibold'>{profile?.first_name}</div>
					</div>
					<div className='flex text-xs font-normal'>
						<div className='w-1/3 text-base-content'>Last Name</div>
						<div className='flex-1 font-semibold'>{profile?.last_name}</div>
					</div>
					<div className='flex text-xs font-normal'>
						<div className='w-1/3 text-base-content'>Nick Name</div>
						{!edit ? (
							<div className='flex-1 font-semibold'>{profile?.nickname}</div>
						) : (
							<div className='flex-1'>
								<input
									type='text'
									placeholder='Type here'
									className='input input-bordered input-sm w-full max-w-xs'
									value={data.nickname}
									onChange={(e) => setData({ ...data, nickname: e.target.value })}
								/>
							</div>
						)}
					</div>
					<div className='flex text-xs font-normal'>
						<div className='w-1/3 text-base-content'>Birth Day</div>
						{!edit ? (
							<div className='flex-1 font-semibold'>{profile?.birthday}</div>
						) : (
							<div className='flex-1'>
								<input
									type='date'
									placeholder='Type here'
									className='input input-bordered input-sm w-full max-w-xs'
									value={data.birthday}
									onChange={(e) =>
										setData({
											...data,
											birthday: formatDate(e.target.value),
										})
									}
								/>
								{error.error_birthday && <div className='text-error'>{error.error_birthday}</div>}
							</div>
						)}
					</div>
					<div className='flex text-xs font-normal'>
						<div className='w-1/3 text-base-content'>Gender</div>
						{!edit ? (
							<div className='flex-1 font-semibold'>
								{profile?.gender === 'M' ? 'Male' : 'Female'}
							</div>
						) : (
							<div className='flex gap-4'>
								<div className='flex items-center'>
									<input
										type='radio'
										name='gender'
										className='radio mr-2'
										checked={data.gender === 'M'}
										onChange={(e) => setData({ ...data, gender: 'M' })}
									/>{' '}
									Male
								</div>
								<div className='flex items-center'>
									<input
										type='radio'
										name='gender'
										className='radio mr-2'
										checked={data.gender === 'F'}
										onChange={(e) => setData({ ...data, gender: 'F' })}
									/>{' '}
									Female
								</div>
							</div>
						)}
					</div>
					<div className='flex text-xs font-normal'>
						<div className='w-1/3 text-base-content'>Hobbies</div>
						<div className='flex-1 font-semibold'>
							{profile?.hobbies && profile?.hobbies.join(',')}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
