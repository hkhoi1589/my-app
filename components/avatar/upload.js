'use client';
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';
import { useRef, createRef, useState } from 'react';
import { urltoFile } from '@/utils/file';

import dynamic from 'next/dynamic';
import AvatarLoading from '@/components/avatar/loading';
const Avatar = dynamic(() => import('@/components/avatar/base'), {
	loading: () => <AvatarLoading />,
});

export default function AvatarUpload({ className, url, name = '', onCrop }) {
	const fileRef = useRef(null);
	const modalRef = useRef(null);
	const cropperRef = createRef();
	const [pic, setPic] = useState(null);
	const [info, setInfo] = useState({});

	const close = () => {
		modalRef.current.removeAttribute('open');
		fileRef.current.value = null;
	};
	const handleChange = (e) => {
		const files = e.target.files;

		if (!files) {
			return;
		}
		const modal = modalRef.current;
		modal.setAttribute('open', true);

		// read file
		const reader = new FileReader();
		reader.onload = () => {
			setPic(reader.result);
		};
		reader.readAsDataURL(files[0]);
		setInfo(files[0]);
	};

	const getCropData = async () => {
		const cropper = cropperRef.current?.cropper;
		if (typeof cropper !== 'undefined') {
			const file = await urltoFile(
				cropper.getCroppedCanvas().toDataURL(),
				info.name,
				info.type
			);
			onCrop(file);
		}
		close();
	};

	return (
		<>
			<div className={`relative ${className}`}>
				<label htmlFor='dropzone-file' className='w-16 h-16 cursor-pointer'>
					<Avatar url={url} name={name.charAt(0)} className='w-16' />
					<input
						ref={fileRef}
						id='dropzone-file'
						type='file'
						accept='image/*'
						className='hidden'
						onChange={handleChange}
					/>
				</label>
				<i className='ri-camera-fill absolute -bottom-1 -right-1'></i>
			</div>
			<dialog ref={modalRef} className='modal'>
				<div className='modal-box modal-bottom sm:modal-middle max-w-sm'>
					<Cropper
						ref={cropperRef}
						style={{ height: 336, width: '100%' }}
						initialAspectRatio={1}
						aspectRatio={1}
						preview='.img-preview'
						src={pic}
						viewMode={1}
						minCropBoxHeight={10}
						minCropBoxWidth={10}
						background={false}
						responsive={true}
						autoCropArea={1}
						checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
						guides={true}
					/>
					<div className='modal-action'>
						<button className='btn btn-sm' onClick={close}>
							Close
						</button>
						<button className='btn btn-sm btn-primary' onClick={getCropData}>
							Crop
						</button>
					</div>
				</div>
			</dialog>
		</>
	);
}
