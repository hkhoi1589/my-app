import React from 'react';

export default function Loading() {
	return (
		<div id='main' className='p-4 overflow-y-auto flex-1'>
			<div className='animate-skeleton w-full h-72 rounded'></div>

			<div className='py-2 mb-4'>
				<div className='flex justify-between items-center mb-4'>
					<div className='animate-skeleton w-72 sm:w-96 h-11'></div>
					<div className='animate-skeleton w-14 sm:w-24 h-6'></div>
				</div>

				<div className='animate-skeleton w-full h-4 mb-2'></div>
				<div className='animate-skeleton w-full h-4 mb-2'></div>
				<div className='animate-skeleton w-96 h-4 mb-2'></div>
			</div>

			<div className='animate-skeleton w-full h-20 mb-8'></div>
		</div>
	);
}
