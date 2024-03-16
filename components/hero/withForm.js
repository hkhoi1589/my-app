import BG from '@/components/bg/base';
export default function Hero({ className = '' }) {
	return (
		<div className={`relative ${className}`}>
			<section className='relative'>
				<BG />
				<div className='relative z-10 max-w-screen-xl mx-auto px-4 py-28 md:px-8'>
					<div className='space-y-5 max-w-4xl mx-auto text-center'>
						<h2 className='text-4xl opacity-90 font-extrabold mx-auto md:text-5xl'>
							Build and scale up your startup with the best tools
						</h2>
						<p className='max-w-2xl mx-auto'>
							Sed ut perspiciatis unde omnis iste natus voluptatem accusantium
							doloremque laudantium, totam rem aperiam, eaque ipsa quae.
						</p>
						<form className='justify-center items-center gap-x-3 sm:flex'>
							<input
								type='text'
								placeholder='Enter your email'
								className='input w-full max-w-xs'
							/>
							<button className='btn btn-primary'>Get started</button>
						</form>
						<div className='flex justify-center items-center gap-x-4 text-sm'>
							<div className='rating'>
								<input
									type='radio'
									name='rating-2'
									className='mask mask-star-2 bg-orange-400'
								/>
								<input
									type='radio'
									name='rating-2'
									className='mask mask-star-2 bg-orange-400'
									checked
								/>
								<input
									type='radio'
									name='rating-2'
									className='mask mask-star-2 bg-orange-400'
									checked
								/>
								<input
									type='radio'
									name='rating-2'
									className='mask mask-star-2 bg-orange-400'
									checked
								/>
								<input
									type='radio'
									name='rating-2'
									className='mask mask-star-2 bg-orange-400'
									checked
								/>
							</div>
							<div>
								<span className='font-bold'>5.0</span> by over 200 users
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
