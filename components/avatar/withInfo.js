'use client';
import { useUserStore } from '@/store/forum';
import { useState } from 'react';
import fetcher from '@/utils/fetcher';
import { API } from '@/utils/constant';
import userApi from '@/services/userApi.service';
import AvatarUpload from './upload';

// import dynamic from 'next/dynamic';
// const AvatarUpload = dynamic(() => import('@/components/Avatar/upload'), {
// 	ssr: false,
// }); // client side rendering

export default function AvatarInfo({ className }) {
	const { profile, setProfile } = useUserStore();

	const [save, setSave] = useState(false); // toggle edit
	const [description, setDescription] = useState(null); // toggle edit
	const [loading, setLoading] = useState(false);

	const onInput = (e) => {
		e.preventDefault();
		setDescription(e.target.value);
		setSave(true);
	};

	const onDescription = async () => {
		const res = await fetcher(`${API}/api/v1/userprofile/profile`, 'PATCH', {
			description,
		});
		if (res.status) {
			// success
			setProfile({ ...profile, description });
			setSave(false);
		}
	};

	const onCrop = async (file) => {
		setLoading(true);
		const res = await userApi.UploadAvatar(file);
		setLoading(false);
		setProfile({ ...profile, avatar: res.url });
	};

	return (
		<div className='flex-1 flex flex-col'>
			{profile && (
				<div className='flex items-center'>
					{loading ? (
						<div className='w-16 h-16 bg-base-200 rounded-full flex items-center justify-center'>
							<span className='loading loading-spinner'></span>
						</div>
					) : (
						<AvatarUpload url={profile.avatar} name={profile.first_name} onCrop={onCrop} />
					)}
					<div className='flex text-center sm:text-start flex-col ml-4'>
						<h3>
							{profile.first_name} {profile.last_name}
						</h3>
						<span className='text-neutral-focus'>{profile.email}</span>
					</div>
				</div>
			)}
			<div className='relative my-2'>
				<textarea
					defaultValue={profile.description}
					className='textarea block w-full bg-transparent h-20 p-0 focus:px-2 focus:outline-neutral-focus border-2 resize-none'
					rows={2}
					placeholder='Add description'
					onInput={onInput}></textarea>
				{save && description && (
					<button
						className='btn btn-xs btn-primary absolute bottom-1 right-1'
						onClick={onDescription}>
						Save
					</button>
				)}
			</div>
		</div>
	);
}
