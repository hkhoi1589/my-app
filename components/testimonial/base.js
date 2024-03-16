import Image from 'next/image';

export default function Testimonial({ className = '' }) {
	return (
		<section className={`py-14 ${className}`}>
			<div className='max-w-screen-xl mx-auto px-4 md:px-8'>
				<div className='max-w-3xl mx-auto text-center'>
					<h3 className='text-primary font-semibold pb-6'>What people are saying</h3>
					<figure>
						<blockquote>
							<p className='opacity-90 text-xl font-semibold sm:text-2xl'>
								“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et
								est hendrerit, porta nunc vitae, gravida justo. Nunc fermentum magna
								lorem, euismod volutpat arcu volutpat et.“
							</p>
						</blockquote>
						<div className='mt-6'>
							<Image
								src='/img/avatar/kimthiendung.jpg'
								width={0}
								height={0}
								alt='kimthiendung.jpg'
								className='w-16 h-16 mx-auto rounded-full'
							/>
							<div className='mt-3'>
								<span className='block opacity-90 font-semibold'>
									Kim Thien Dung
								</span>
								<span className='block opacity-70 text-sm mt-0.5'>
									Founder of meta
								</span>
							</div>
						</div>
					</figure>
				</div>
			</div>
		</section>
	);
}
