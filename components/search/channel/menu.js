'use client';
import Modal from '@/components/Modal/confirm';
import { useRef, useState } from 'react';
import channelApi from '@/services/channelApi.service';

import dynamic from 'next/dynamic';
const EditChannel = dynamic(() => import('@/components/Channel/EditChannel/base'));

export default function ChannelMenu({
	id,
	name,
	description,
	is_private = false,
	mutate = {},
	onRemoveIt,
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const dropdownRef = useRef(null);

	const onConfirm = async (val) => {
		if (val) {
			const res = await channelApi.RemoveChannel(id);
			//console.log('res', res);
			if (res && res.status) onRemoveIt();
		}
		setIsOpen(false);
	};
	return (
		<>
			<details className='dropdown dropdown-end' ref={dropdownRef}>
				<summary
					tabIndex='0'
					className='btn btn-sm btn-circle btn-ghost m-1 list-none cursor-pointer my-auto whitespace-nowrap font-medium text-sm hover:text-accent-focus'>
					<i className='ri-more-2-fill'></i>
				</summary>
				<ul
					tabIndex={0}
					className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-36'>
					<li>
						<button onClick={() => setIsEdit(true)}>Edit channel</button>
					</li>
					<li>
						<button onClick={() => setIsOpen(true)}>Delete channel</button>
					</li>
				</ul>
			</details>

			<EditChannel
				isOpen={isEdit}
				setIsOpen={setIsEdit}
				id={id}
				name={name}
				description={description}
				is_private={is_private}
				mutate={mutate}
			/>
			<Modal
				open={isOpen}
				onConfirm={onConfirm}
				title='Warning'
				content='Are you sure you want to delete it ?'
			/>
		</>
	);
}
