import Image from 'next/image';

export default function Contact({ className = '' }) {
	const contactMethods = [
		{
			icon: <i className='ri-mail-line text-lg'></i>,
			contact: 'hello@beyoundmountain.org',
		},
		{
			icon: <i className='ri-phone-line text-lg'></i>,
			contact: '+1(408) 899-4128',
		},
		{
			icon: <i className='ri-map-pin-line text-lg'></i>,
			contact: '453 W San Carlos St.San Jose, CA 95110',
		},
	];

	return (
		<section id='contact' className={`py-14 ${className}`}>
			<div className='max-w-3xl mx-auto bg-gradient-to-b from-base-300/30 rounded-2xl gap-12 justify-between py-4 px-8 lg:px-0 lg:flex'>
				<div className='flex-1 space-y-3 flex flex-col justify-center ml-auto lg:pl-6'>
					<h3 className='font-semibold text-base text-primary/60'>Contact us</h3>
					<p className='opacity-90 font-semibold text-3xl sm:text-4xl font-merienda'>
						Let us know how we can help
					</p>
					<p className='text-lg md:text-xl'>
						We’re here to help and answer any question you might have, We look forward
						to hearing from you!
					</p>
					<div>
						<ul className='mt-6 flex flex-wrap gap-x-10 gap-y-6 items-center'>
							{contactMethods.map((item, idx) => (
								<li key={idx} className='flex items-center gap-x-3'>
									<div className='flex-none opacity-80'>{item.icon}</div>
									<p className='text-lg md:text-xl'>{item.contact}</p>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className='relative'>
					<Image
						src='/img/course/vertical-2.png'
						className='-mt-36 mx-auto'
						width={384}
						height={664}
						alt='vertical-2.png'
					/>
				</div>
			</div>
		</section>
	);
}
