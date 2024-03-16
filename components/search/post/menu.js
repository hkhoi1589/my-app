'use client';
import Modal from '@/components/Modal/confirm';
import { useRef, useState } from 'react';
import postApi from '@/services/postApi.service';
import { toast } from 'react-toastify';

export default function PostMenu({ className = '', id, onRemoveIt }) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	const onConfirm = async (val) => {
		if (val) {
			const res = await postApi.RemovePost(id);
			if (res && res.status) {
				onRemoveIt();
			} else {
				toast.error('A post cannot be deleted after one hour after its creation.');
				console.log(res);
			}
		}
		setIsOpen(false);
	};

	return (
		<>
			<details className='absolute top-0 right-0 dropdown dropdown-end' ref={dropdownRef}>
				<summary
					tabIndex='0'
					className='list-none cursor-pointer my-auto whitespace-nowrap font-medium text-sm hover:text-accent-focus'>
					<i className='ri-more-2-fill'></i>
				</summary>
				<ul
					tabIndex={0}
					className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-36'>
					<li>
						<button onClick={() => setIsOpen(true)}>Delete post</button>
					</li>
				</ul>
			</details>
			<Modal
				open={isOpen}
				onConfirm={onConfirm}
				title='Warning'
				content='Are you sure you want to delete it ?'
			/>
		</>
	);
}
