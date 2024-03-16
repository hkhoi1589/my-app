'use client';
import channelApi from '@/services/channelApi.service';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

function EditChannel({
	className = '',
	isOpen,
	is_private = false,
	setIsOpen,
	id,
	name,
	description,
	mutate = {},
}) {
	const modal = useRef(null);

	const [isPrivate, setIsPrivate] = useState(is_private);
	const [title, setTitle] = useState(name);
	const [desc, setDesc] = useState(description);
	const [isSubmit, setIsSubmit] = useState(false);

	const handleEditChannel = async () => {
		setIsSubmit(true);

		if (!title) {
			toast.warn('Please add a name to this channel');
		} else {
			const result = await channelApi.UpdateChannel(id, title, desc, isPrivate);

			if (result?.status) {
				if (JSON.stringify(mutate) !== '{}') mutate();

				setIsOpen(!isOpen);
				toast.success(result?.message);
			} else {
				toast.error(result?.message);
			}
		}

		setIsSubmit(false);
	};

	useEffect(() => {
		setIsPrivate(isPrivate);
		setTitle(title);
		setDesc(description);
	}, [is_private, name, description, isPrivate, title]);

	return (
		<div ref={modal} className={`modal sm:modal-middle ${isOpen ? 'modal-open' : ''}`}>
			<div className='modal-box max-h-none overflow-y-visible px-0 pt-0'>
				<button
					className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
					onClick={() => setIsOpen(!isOpen)}>
					✕
				</button>
				<div className='p-6 pb-3 max-h-96'>
					<h3 className='font-bold text-lg'>Edit Channel</h3>
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
						<label
							className='flex items-center mb-2 text-sm'
							htmlFor={`radio_edit_public-${id}`}>
							<input
								type='radio'
								id={`radio_edit_public-${id}`}
								name={`radio_edit_channel-${id}`}
								className='radio mr-4'
								onChange={() => setIsPrivate(false)}
								checked={!isPrivate}
							/>
							Public - anyone in school
						</label>
						<label
							className='flex items-center mb-2 text-sm'
							htmlFor={`radio_edit_private-${id}`}>
							<input
								type='radio'
								id={`radio_edit_private-${id}`}
								name={`radio_edit_channel-${id}`}
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
				</div>
				<div className='modal-action mr-6 mt-4'>
					<button
						className='btn btn-sm btn-neutral rounded-2xl text-sm font-semibold disabled:btn-disabled'
						disabled={isSubmit}
						onClick={() => setIsOpen(!isOpen)}>
						Cancel
					</button>
					<button
						className='btn btn-sm btn-primary rounded-2xl text-sm font-semibold disabled:btn-disabled'
						disabled={isSubmit}
						onClick={() => {
							handleEditChannel();
						}}>
						{isSubmit && <span className='loading loading-spinner loading-xs'></span>}
						Update
					</button>
				</div>
			</div>
			<div onClick={() => setIsOpen(!isOpen)} className='modal-backdrop'></div>
		</div>
	);
}

export default EditChannel;
