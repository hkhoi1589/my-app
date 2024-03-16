'use client';
import Modal from '@/components/Modal/withButton';
import channelApi from '@/services/channelApi.service';
import { useChannelListStore, useUserStore } from '@/store/forum';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

function NewChannel({ className = '' }) {
	const [isPrivate, setIsPrivate] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [isSubmit, setIsSubmit] = useState(false);

	const { mutate, setLoadingAdd } = useChannelListStore();
	const { mutateYourChannels } = useUserStore();

	const handleNewChannel = async () => {
		setIsSubmit(true);
		setLoadingAdd(true);

		if (!title) {
			toast.warn('Please add a name to this channel');
		} else {
			const result = await channelApi.CreateChannelSchool(title, desc, isPrivate);

			if (result?.status) {
				if (JSON.stringify(mutate) !== '{}') mutate();
				if (JSON.stringify(mutateYourChannels) !== '{}') mutateYourChannels();

				setIsOpen(!isOpen);
				setTitle('');
				setDesc('');
				toast.success(result?.data?.message);
			} else {
				toast.error(result?.message);
			}
		}

		setIsSubmit(false);
		setLoadingAdd(false);
	};

	return (
		<Modal
			className={`btn btn-sm btn-primary hover:text-base-300 rounded-full ${className}`}
			title='New Channel'
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			isSubmit={isSubmit}
			titleSubmit='Create'
			handleSubmit={handleNewChannel}>
			<h3 className='font-bold text-lg'>Create A Channel</h3>
			<input
				type='text'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				className={`outline-none placeholder:truncate h-10 pt-4 text-base bg-transparent border-solid border-b-neutral border-b-2 input-sm w-full focus-within:border-primary`}
				placeholder='Add a name...'
			/>
			<input
				type='text'
				value={desc}
				onChange={(e) => setDesc(e.target.value)}
				className={`outline-none placeholder:truncate h-10 pt-4 text-base bg-transparent border-solid border-b-neutral border-b-2 input-sm w-full focus-within:border-primary`}
				placeholder='Description...'
			/>
			<div className='text-sm font-semibold pt-3 pb-2'>Visibility</div>
			<div className='flex flex-col'>
				<label className='flex items-center mb-2 text-sm' htmlFor='radio_new_public'>
					<input
						type='radio'
						id='radio_new_public'
						name='radio_new_channel'
						className='radio mr-4'
						onChange={() => setIsPrivate(false)}
						checked={!isPrivate}
					/>
					Public - anyone in school
				</label>
				<label className='flex items-center mb-2 text-sm' htmlFor='radio_new_private'>
					<input
						type='radio'
						id='radio_new_private'
						name='radio_new_channel'
						className='radio mr-4'
						onChange={() => setIsPrivate(true)}
						checked={isPrivate}
					/>
					<div className='flex flex-col'>
						Private - Only specific people
						<span className='text-neutral-focus'>join by invitation</span>
					</div>
				</label>
			</div>
		</Modal>
	);
}

export default NewChannel;
