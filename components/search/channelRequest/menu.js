'use client';
import Modal from '@/components/Modal/confirm';
import { useState } from 'react';
import channelApi from '@/services/channelApi.service';

export default function ChannelMenu({ id, onRemoveIt }) {
	const [isOpen, setIsOpen] = useState(false);

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
			<div className='dropdown dropdown-end'>
				<label tabIndex={0} className='btn btn-sm btn-circle btn-ghost m-1'>
					<i className='ri-more-2-fill'></i>
				</label>
				<ul
					tabIndex={0}
					className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-36'>
					<li>
						<a onClick={() => setIsOpen(true)}>Delete channel</a>
					</li>
				</ul>
			</div>
			<Modal
				open={isOpen}
				onConfirm={onConfirm}
				title='Warning'
				content='Are you sure you want to delete it ?'
			/>
		</>
	);
}
