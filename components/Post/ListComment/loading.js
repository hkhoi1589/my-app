import { maxCommentsPerPage } from '@/utils/constant';
import React from 'react';

export default function ListCommentLoading() {
	return (
		<>
			<div className='flex py-3'>
				<div className='flex items-center mr-2'>
					<div className='animate-skeleton w-6 h-6 mr-2'></div>
					<div className='animate-skeleton w-28 h-6'></div>
				</div>
			</div>

			<div className='space-y-4'>
				<div className='mt-2 flex items-start'>
					<div className='flex-shrink-0 mr-3'>
						<div className='animate-skeleton rounded-full w-8 h-8'></div>
					</div>
					<div className='flex-1'>
						<div className='animate-skeleton w-full h-8'></div>

						<div className='flex justify-end mt-2'>
							<div className='animate-skeleton rounded w-20 h-7'></div>
						</div>
					</div>
				</div>
				<ul>
					{Array.from({ length: maxCommentsPerPage }, (_, i) => i + 1).map((number) => (
						<li className='flex' key={`loading-cmt-${number}`}>
							<div className='flex-shrink-0 mr-3'>
								<div className='animate-skeleton rounded-full w-10 h-10'></div>
							</div>
							<div className='flex-1 pb-2'>
								<div className='animate-skeleton w-32 h-4 mb-2'></div>
								<div className='animate-skeleton w-96 h-4 mb-2'></div>
							</div>
							<div className='animate-skeleton w-10 h-10 rounded-full'></div>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
