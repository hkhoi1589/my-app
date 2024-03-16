import React from 'react';

export default function CommentLoading() {
	return (
		<div className='flex'>
			<div className='flex-shrink-0 mr-3'>
				<div className='animate-skeleton rounded-full w-10 h-10'></div>
			</div>
			<div className='flex-1 pb-2'>
				<div className='animate-skeleton w-32 h-4 mb-2'></div>
				<div className='animate-skeleton w-96 h-4 mb-2'></div>
			</div>
			<div className='animate-skeleton w-10 h-10 rounded-full'></div>
		</div>
	);
}
