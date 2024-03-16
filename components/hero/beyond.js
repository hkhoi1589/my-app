import Link from 'next/link';

export default function Hero({ className = '' }) {
	return (
		<div className={`relative ${className}`}>
			<section>
				<div className='max-w-screen-xl w-full mx-auto px-4 pt-28 pb-32 gap-12 md:px-8'>
					<div className='space-y-5 max-w-4xl mx-auto text-center'>
						<h1 className='text-4xl md:text-5xl lg:text-7xl font-semibold font-merienda opacity-90 mx-auto'>
							Let’s move
							<span className='block text-transparent bg-clip-text bg-gradient-to-r from-[#7226C8] via-[#E30FA6] to-[#FF8515]'>
								Beyond the Mountain
							</span>
						</h1>
						<h2 className='text-xl md:text-2xl lg:text-3xl'>
							Made by students to connect students
						</h2>
						<div className='flex items-center justify-center gap-x-3'>
							<Link href='/forum' className='btn btn-primary btn-sm'>
								Browse courses
							</Link>
							<Link href='/forum' className='btn btn-outline btn-sm'>
								Get access
								<i className='ri-arrow-right-fill'></i>
							</Link>
						</div>
					</div>
					<div className='mt-14 relative'>
						<div
							className='absolute top-0 inset-x-0 mx-auto w-1/2 h-1 sm:w-1/3 opacity-50'
							style={{
								borderWidth: '0px 0px 1.5px',
								borderImage:
									'radial-gradient(rgb(209, 213, 219), rgb(209, 213, 219), rgb(209, 213, 219), rgba(209, 213, 219, 0)) 1 / 1 / 0 stretch',
							}}></div>
					</div>
				</div>
			</section>
		</div>
	);
}
