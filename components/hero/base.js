import Link from 'next/link';
import BG from '@/components/bg/rotate45';
import Image from 'next/image';

export default function Hero({ className = '' }) {
	return (
		<div className={`relative ${className}`}>
			<BG />
			<section>
				<div className='max-w-screen-xl mx-auto px-4 py-20 gap-12 overflow-hidden md:px-8 md:flex'>
					<div className='flex-none space-y-5 max-w-xl'>
						<Link
							href='#'
							className='inline-flex gap-x-6 items-center rounded-full p-1 pr-6 border text-sm font-medium duration-150 hover:bg-neutral-focus'>
							<span className='badge badge-primary'>News</span>
							<p className='flex items-center'>
								Read the launch post from here
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
									fill='currentColor'
									className='w-5 h-5'>
									<path
										fillRule='evenodd'
										d='M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z'
										clipRule='evenodd'
									/>
								</svg>
							</p>
						</Link>
						<h1 className='text-4xl font-extrabold sm:text-5xl'>
							Build your SaaS exactly how you want
						</h1>
						<p>
							Sed ut perspiciatis unde omnis iste natus voluptatem accusantium
							doloremque laudantium, totam rem aperiam, eaque ipsa quae.
						</p>
						<div className='flex items-center gap-x-3 sm:text-sm'>
							<Link href='#' className='btn btn-primary btn-sm rounded-full'>
								Get started
							</Link>
							<Link href='#' className='btn btn-ghost btn-sm rounded-full'>
								Contact sales
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
									fill='currentColor'
									className='w-5 h-5'>
									<path
										fillRule='evenodd'
										d='M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z'
										clipRule='evenodd'
									/>
								</svg>
							</Link>
						</div>
					</div>
					<div className='flex-1 hidden md:block'>
						<Image
							src='/img/common/platform.png'
							width={0}
							height={0}
							alt='platform.png'
							className='max-w-xl w-full'
						/>
					</div>
				</div>
			</section>
		</div>
	);
}
