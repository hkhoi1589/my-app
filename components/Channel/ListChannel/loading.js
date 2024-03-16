import { maxChannelPerPage } from '@/utils/constant';
import React from 'react';

export default function ListChannelLoading() {
	return (
		<div className='mb-8'>
			<div className='flex justify-end pb-3 w-full border-b-2 border-b-neutral'>
				<div className='animate-skeleton w-24 h-4'></div>
			</div>
			<ul>
				{Array.from({ length: maxChannelPerPage }, (_, i) => i + 1).map((number) => (
					<li
						className='border-b-2 border-b-neutral flex items-center justify-between p-2 sm:p-4'
						key={`loading-item-${number}`}>
						<div className='flex justify-center items-start flex-1'>
							<div className='animate-skeleton w-12 h-12 rounded-full'></div>

							<div className='ml-4 flex-1 flex flex-col'>
								<div className='animate-skeleton w-32 h-6 mb-1'></div>
								<div className='animate-skeleton w-28 h-4'></div>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
