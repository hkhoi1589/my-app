'use client';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

export default function UploadFilePics({ className = '', setSelectedImage }) {
	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			'image/*': [],
		},
		onDrop: (acceptedFiles) => {
			setSelectedImage((prev) => [
				...prev,
				...acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				),
			]);
		},
		onError: (e) => toast.warn(e || 'Only accept images'),
		multiple: true,
	});

	return (
		<div className={`flex flex-wrap gap-4 px-4 py-2 overflow-hidden ${className}`}>
			<label htmlFor='file' {...getRootProps({ className: 'cursor-pointer' })}>
				<i className='ri-image-line text-xl'></i>
				<input {...getInputProps()} className='hidden' />
			</label>
		</div>
	);
}
