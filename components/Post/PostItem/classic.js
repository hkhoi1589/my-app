'use client';
import { useState } from 'react';
import Heart from '@/components/Button/Heart';
import Link from 'next/link';
import Avatar from '@/components/avatar/base';

export default function Sidebar({ id, subject, author, icon, thumps_up }) {
	const [amount, setAmount] = useState(thumps_up);

	return (
		<li className='border-b-2 border-b-neutral flex items-center justify-between p-2 sm:p-4'>
			<div className='flex justify-center items-center flex-1'>
				<Avatar url={icon} name={author ? author.charAt(0) : ''} className='w-12' />
				<div className='ml-2 sm:ml-4 flex-1 line-clamp-2'>
					<Link href={`/forum/posts/${id}`}>
						<h4 className='capitalize hover:text-accent-focus'>{subject}</h4>
					</Link>
					<ul className='flex flex-col list-disc sm:list-none sm:flex-row sm:items-center sm:space-x-2'>
						{author && <li className='text-sm font-normal underline'>{author}</li>}
						<li className='font-bold hidden sm:inline'>•</li>
						<li className='text-sm font-normal hidden sm:inline'>
							in <span className='underline'>General</span>
						</li>
						<li className='font-bold hidden sm:inline'>•</li>
						<li className='text-sm font-normal hidden sm:inline'>
							Last comment 5 minutes ago by{' '}
							<span className='underline'>Ms. Maggie</span>
						</li>
					</ul>
				</div>
			</div>
			<div className='flex flex-col items-end'>
				<Heart amount={amount} setAmount={setAmount} />
				<span>2 comments</span>
			</div>
		</li>
	);
}
