import Image from 'next/image';

export default function Testimonial({ className = '' }) {
	const testimonials = [
		{
			avatar: '/img/avatar/kimthiendung.jpg',
			name: 'Martin escobar',
			title: 'Founder of meta',
			quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et est hendrerit, porta nunc vitae.',
		},
		{
			avatar: '/img/avatar/user-4.jpg',
			name: 'Angela stian',
			title: 'Product designer',
			quote: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
		},
		{
			avatar: '/img/avatar/user-5.jpg',
			name: 'Karim ahmed',
			title: 'DevOp engineer',
			quote: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain.',
		},
	];

	return (
		<section className={`py-14 ${className}`}>
			<div className='max-w-screen-xl mx-auto px-4 md:px-8'>
				<div className='max-w-xl sm:text-center md:mx-auto'>
					<h3 className='opacity-90 text-3xl font-semibold sm:text-4xl'>
						See what others saying about us
					</h3>
					<p className='mt-3 opacity-70'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et est
						hendrerit, porta nunc vitae, gravida justo. Nunc fermentum magna lorem,
						euismod volutpat arcu volutpat et.
					</p>
				</div>
				<div className='mt-12'>
					<ul className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
						{testimonials.map((item, idx) => (
							<li key={idx} className='bg-base-300/30 p-4 rounded-xl'>
								<figure>
									<div className='flex items-center gap-x-4'>
										<Image
											src={item.avatar}
											width={0}
											height={0}
											alt='avatar'
											className='w-16 h-16 rounded-full'
										/>
										<div>
											<span className='block opacity-90 font-semibold'>
												{item.name}
											</span>
											<span className='block opacity-70 text-sm mt-0.5'>
												{item.title}
											</span>
										</div>
									</div>
									<blockquote>
										<p className='mt-6 opacity-80'>{item.quote}</p>
									</blockquote>
								</figure>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
