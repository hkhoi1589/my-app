import Image from 'next/image';

export default function Team({ className = '' }) {
	const team = [
		{
			avatar: '/img/avatar/a-1.jpg',
			name: 'Dung pham',
			title: 'Product designer',
		},
		{
			avatar: '/img/avatar/a-2.jpg',
			name: 'Micheal colorand',
			title: 'Software engineer',
		},
		{
			avatar: '/img/avatar/a-3.jpg',
			name: 'Brown Luis',
			title: 'Full stack engineer',
		},
		{
			avatar: '/img/avatar/a-4.jpg',
			name: 'Lysa sandiago',
			title: 'Head of designers',
		},
		{
			avatar: '/img/avatar/a-5.jpg',
			name: 'Daniel martin',
			title: 'Product designer',
		},
		{
			avatar: '/img/avatar/a-6.jpg',
			name: 'Vicky tanson',
			title: 'Product manager',
		},
	];

	return (
		<section className={`py-14 ${className}`}>
			<div className='max-w-screen-xl mx-auto px-4 md:px-8'>
				<div className='max-w-xl mx-auto sm:text-center'>
					<h3 className='opacity-90 text-3xl font-semibold sm:text-4xl'>Our team</h3>
					<p className='opacity-70 mt-3'>
						{`Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown.`}
					</p>
				</div>
				<div className='mt-12'>
					<ul className='grid gap-8 sm:grid-cols-2 md:grid-cols-3'>
						{team.map((item, idx) => (
							<li key={idx}>
								<div className='w-full h-60 sm:h-52 md:h-56'>
									<Image
										className='w-full h-full object-cover object-center shadow-md rounded-xl'
										src={item.avatar}
										width={0}
										height={0}
										alt='avatar'
									/>
								</div>
								<div className='mt-4'>
									<h4 className='text-lg opacity-80 font-semibold'>
										{item.name}
									</h4>
									<p className='text-primary'>{item.title}</p>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
