import React from 'react';

export default function Loading() {
	return (
		<div className='relative flex-1 text-xs overflow-y-auto'>
			<div className='container mx-auto p-4 block md:hidden'>
				<div className='animate-skeleton w-96 h-12 rounded'></div>
			</div>

			<div className='w-full overflow-y-auto'>
				<div className='container mx-auto p-4'>
					<div className='flex flex-col sm:flex-row justify-between mb-4'>
						<ul className='space-x-4 mb-4 flex justify-between'>
							{Array.from({ length: 5 }, (_, i) => i + 1).map((number) => (
								<div
									className='animate-skeleton w-16 h-8'
									key={`loading-${number}`}></div>
							))}
						</ul>
						<div className='h-8'></div>
					</div>
					<div className='mb-8'>
						<div className='flex justify-between w-full pb-3 border-b-2 border-b-neutral'>
							<div className='animate-skeleton w-56 h-5 pl-2 sm:pl-4'></div>
							<div className='animate-skeleton w-24 h-4'></div>
						</div>
						<ul>
							{Array.from({ length: 5 }, (_, i) => i + 1).map((number) => (
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
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
