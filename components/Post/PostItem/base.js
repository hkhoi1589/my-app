'use client';
import React from 'react';
import Link from 'next/link';

import dynamic from 'next/dynamic';
import Heart from '@/components/Button/Heart';
import AvatarLoading from '@/components/avatar/loading';
const Avatar = dynamic(() => import('@/components/avatar/base'), {
	loading: () => <AvatarLoading />,
});

export default function PostItem({
	value,
	id,
	title,
	author,
	isPin = false,
	channel = '',
	is_public = false,
	last_comment,
}) {
	return (
		<li className='border-b-2 border-b-neutral flex items-center justify-between p-2 sm:p-4'>
			<div className='flex justify-center items-center flex-1'>
				{
					<div className='relative'>
						<i
							className={`ri-pushpin-line bg-base-100 text-sm -bottom-1 -right-0.5 px-1 py-0.5 rounded-full ${
								isPin ? 'absolute' : 'hidden'
							}`}></i>
						{author?.avatar ? (
							<Avatar
								url={author.avatar}
								name={author ? author.full_name?.charAt(0) : 'Me'}
								className='rounded-full h-12'
							/>
						) : (
							<svg
								className='rounded-full h-12'
								viewBox='0 0 36 36'
								fill='currentColor'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M0.338867 18C0.338867 13.3159 2.19961 8.82365 5.51175 5.51151C8.82389 2.19937 13.3161 0.338623 18.0002 0.338623C22.6843 0.338623 27.1765 2.19937 30.4887 5.51151C33.8008 8.82365 35.6615 13.3159 35.6615 18C35.6615 22.684 33.8008 27.1763 30.4887 30.4884C27.1765 33.8005 22.6843 35.6613 18.0002 35.6613C13.3161 35.6613 8.82389 33.8005 5.51175 30.4884C2.19961 27.1763 0.338867 22.684 0.338867 18ZM18.0002 2.87196C15.068 2.87206 12.199 3.72431 9.74223 5.32503C7.28548 6.92576 5.34687 9.20596 4.16225 11.8882C2.97763 14.5705 2.59806 17.5393 3.06971 20.4333C3.54135 23.3273 4.84389 26.0219 6.81887 28.1893C8.01787 26.3113 9.67091 24.7658 11.6252 23.6956C13.5795 22.6255 15.7721 22.0652 18.0002 22.0666C20.2284 22.065 22.421 22.6251 24.3754 23.6953C26.3297 24.7655 27.9827 26.3111 29.1815 28.1893C31.1565 26.0219 32.459 23.3273 32.9307 20.4333C33.4023 17.5393 33.0228 14.5705 31.8381 11.8882C30.6535 9.20596 28.7149 6.92576 26.2582 5.32503C23.8014 3.72431 20.9324 2.87206 18.0002 2.87196ZM27.2855 29.944C26.3419 28.3176 24.9874 26.9678 23.3577 26.0299C21.728 25.092 19.8805 24.5989 18.0002 24.6C16.1199 24.5989 14.2724 25.092 12.6427 26.0299C11.013 26.9678 9.65852 28.3176 8.71487 29.944C11.3676 32.0124 14.6364 33.1333 18.0002 33.128C21.4989 33.128 24.7202 31.9386 27.2855 29.944ZM11.7335 15.3466C11.7335 13.6846 12.3938 12.0906 13.569 10.9154C14.7442 9.74019 16.3382 9.07996 18.0002 9.07996C19.6622 9.07996 21.2562 9.74019 22.4314 10.9154C23.6066 12.0906 24.2669 13.6846 24.2669 15.3466C24.2669 17.0086 23.6066 18.6026 22.4314 19.7778C21.2562 20.9531 19.6622 21.6133 18.0002 21.6133C16.3382 21.6133 14.7442 20.9531 13.569 19.7778C12.3938 18.6026 11.7335 17.0086 11.7335 15.3466ZM18.0002 11.6133C17.5099 11.6133 17.0245 11.7099 16.5715 11.8975C16.1186 12.0851 15.707 12.3601 15.3603 12.7068C15.0137 13.0534 14.7387 13.465 14.5511 13.9179C14.3634 14.3709 14.2669 14.8564 14.2669 15.3466C14.2669 15.8369 14.3634 16.3224 14.5511 16.7753C14.7387 17.2283 15.0137 17.6398 15.3603 17.9865C15.707 18.3332 16.1186 18.6082 16.5715 18.7958C17.0245 18.9834 17.5099 19.08 18.0002 19.08C18.9903 19.08 19.9399 18.6866 20.6401 17.9865C21.3402 17.2864 21.7335 16.3368 21.7335 15.3466C21.7335 14.3565 21.3402 13.4069 20.6401 12.7068C19.9399 12.0066 18.9903 11.6133 18.0002 11.6133Z'
									fill='#6A6A6A'
								/>
							</svg>
						)}
					</div>
				}
				<div className='ml-2 sm:ml-4 flex-1 line-clamp-2'>
					<Link href={`/forum/detail?id=${id}`}>
						<h4 className='capitalize hover:text-accent-focus'>{title}</h4>
					</Link>
					<ul className='flex flex-col flex-wrap list-disc sm:list-none sm:flex-row sm:items-center sm:space-x-2'>
						{author && (
							<li className='text-sm font-normal underline'>
								<Link
									href={`/forum/user?id=${author?.id}&name=${author?.full_name}`}>
									{author?.full_name}
								</Link>
							</li>
						)}
						{!is_public && (
							<li className='flex flex-nowrap'>
								<div className='font-bold mr-2 hidden sm:inline leading-[20px]'>
									•
								</div>
								<div className='text-sm font-normal underline'>only me</div>
							</li>
						)}
						{channel && (
							<li className='flex flex-nowrap'>
								<div className='font-bold mr-2 hidden sm:inline leading-[20px]'>
									•
								</div>
								<div className='text-sm font-normal hidden sm:inline'>
									in{' '}
									<Link
										href={`/forum/channel/?channel_id=${channel.id}&channel_name=${channel.name}&owner=${channel.owner_uuid}`}
										className='underline'>
										{channel.name}
									</Link>
								</div>
							</li>
						)}
						{last_comment && (
							<li className='flex flex-nowrap'>
								<div className='font-bold mr-2 hidden sm:inline leading-[20px]'>
									•
								</div>
								<div className='text-sm font-normal hidden sm:inline'>
									Last comment by{' '}
									<span className='underline'>
										{last_comment?.author?.full_name}
									</span>
								</div>
							</li>
						)}
					</ul>
				</div>
			</div>
			<div className='flex flex-col items-end'>
				<Heart heart={value} id={id} />
				{/* <span>2 comments</span> */}
			</div>
		</li>
	);
}
