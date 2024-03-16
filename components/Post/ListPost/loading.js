import { maxPinPostsPerPage, maxPostsPerPage } from '@/utils/constant';
import React from 'react';

export default function PostListLoading() {
	return (
		<div className='mb-8'>
			<div className='flex justify-between w-full pb-3 border-b-2 border-b-neutral'>
				<div className='animate-skeleton w-56 h-5 pl-2 sm:pl-4'></div>
				<div className='animate-skeleton w-24 h-4'></div>
			</div>
			<ul>
				{Array.from({ length: maxPinPostsPerPage + maxPostsPerPage }, (_, i) => i + 1).map(
					(number) => (
						<li
							className='border-b-2 border-b-neutral flex items-center justify-between p-2 sm:p-4'
							key={`loading-item-${number}`}>
							<div className='flex justify-center items-center flex-1'>
								<div className='animate-skeleton w-12 h-12 rounded-full'></div>

								<div className='ml-4 flex-1 flex flex-col'>
									<div className='animate-skeleton w-32 h-5 mb-1'></div>
									<div className='animate-skeleton w-28 h-3'></div>
								</div>
							</div>
							<div className='animate-skeleton w-10 h-10 rounded-full'></div>
						</li>
					)
				)}
			</ul>
		</div>
	);
}
