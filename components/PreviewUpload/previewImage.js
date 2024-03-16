'use client';
import postApi from '@/services/postApi.service';
import Image from 'next/image';
import React, { useEffect } from 'react';

function PreviewUpload({ className = '', selectedImage = [], setSelectedImage, idPost = '' }) {
	const removePic = async (index) => {
		const removed = [...selectedImage];
		removed.splice(index, 1);
		setSelectedImage(removed);

		if (idPost && selectedImage[index].id) {
			await postApi.RemoveImagePost(idPost, selectedImage[index].id);
		}
	};

	useEffect(() => {
		// Make sure to revoke the data uris to avoid memory leaks, will run on unmount
		return () => selectedImage.forEach((file) => URL.revokeObjectURL(file.preview));
	}, [selectedImage]);

	// useEffect(() => {
	// 	console.log('selectedImage', selectedImage);
	// }, [selectedImage]);

	return (
		<div className={`flex flex-wrap gap-4 px-4 ${className}`}>
			{selectedImage.map((file, idx) => (
				<div
					className='relative flex-grow flex items-stretch'
					style={{ flexBasis: '20%' }}
					key={`filename-${idx}`}>
					<div className='relative rounded w-full h-full flex items-stretch'>
						<Image src={file.preview} alt='preview-img' className='object-cover' />
						<div
							className='btn btn-xs btn-circle btn-error text-white absolute -right-2 -top-2'
							onClick={() => removePic(idx)}>
							✕
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default PreviewUpload;
