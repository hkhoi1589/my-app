import Image from 'next/image';

export default function Feature({ className = '' }) {
	return (
		<div id='our-story' className={`${className}`}>
			<h2 className='text-center text-2xl lg:text-3xl uppercase font-semibold font-merienda mb-8'>
				Made by students to connect students
			</h2>
			<section className='p-4 sm:p-12 bg-base-200 rounded-box'>
				<div className='text-gray-600 gap-x-12 items-center justify-between lg:flex'>
					<div className='mt-6 gap-12 sm:mt-0 md:flex lg:block'>
						<div className='max-w-2xl'>
							<h3 className='text-gray-800 text-3xl font-semibold sm:text-4xl'>
								Beyond the Mountains{' '}
								<span className='font-normal text-base'>(BM)</span>
							</h3>
							<p className='mt-3 max-w-xl'>
								is a non-profit organization founded by college and high school
								students in the United States. The pandemic and wars erased borders
								and shrunk the world. It showed us that acts by individuals can have
								devastating impacts on our world. Modest initiatives bringing
								uplifting changes can also transcend vast distances. We believe that
								hundreds of brief and simple educational interactions at BM will
								engage students in Kyrgyzstan, Afghanistan, Ukraine, and beyond on a
								profound level.
							</p>
						</div>
					</div>
					<div className='sm:hidden lg:block lg:max-w-xl'>
						<Image
							src='/img/course/dashboard-2.png'
							alt='dashboard-2.png'
							width={0}
							height={0}
							sizes='100vw'
							style={{ width: 'auto', height: 'auto' }}
						/>
					</div>
				</div>
			</section>

			<section className='pt-6'>
				<ul className='grid gap-6 sm:grid-cols-2'>
					<li className='bg-accent/10 p-8 rounded-box'>
						<figure className='space-y-4'>
							<div className='font-semibold text-4xl'>User-experience.</div>
							<div>Feelin’ good about it.</div>
							<p>
								Every part of the platform aims to make pleasant experiences for
								your members, on any device.
							</p>
							<div className='flex items-center justify-center pt-8'>
								<Image
									src='/img/course/group.png'
									alt='group.png'
									width={0}
									height={0}
									sizes='100vw'
									style={{ width: 'auto', height: 'auto' }}
								/>
							</div>
						</figure>
					</li>
					<li className='bg-purple-50 p-8 rounded-box'>
						<figure className='space-y-4'>
							<div className='flex items-center justify-center pb-8'>
								<Image
									src='/img/course/dashboard.png'
									alt='dashboard.png'
									width={0}
									height={0}
									sizes='100vw'
									style={{ width: 'auto', height: 'auto' }}
								/>
							</div>
							<div className='font-semibold text-4xl'>Functionality & design.</div>
							<div>Lookin’ good doing it. .</div>
							<p>
								Create beautiful websites and apps with an intuitive design for your
								users.
							</p>
						</figure>
					</li>
				</ul>
			</section>

			<section className='pt-6'>
				<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
					<div className='flex rounded-box bg-[#EFC9A6] aspect-square overflow-hidden'>
						<div className='w-3/5 relative'>
							<Image
								src='/img/course/vertical-1.jpg'
								alt='vertical-1.jpg'
								width={0}
								height={0}
								sizes='100vw'
								style={{ width: 'auto', height: 'auto' }}
							/>
							<div className='p-4 absolute top-0 w-full drop-shadow-md font-semibold text-4xl md:text-6xl text-white font-merienda'>
								Spread the Word
							</div>
						</div>
						<div className='w-2/5 flex items-end p-4'>
							We think the world would be better if everyone were included. Around the
							world, exclusion and discrimination continue to divide people. We act
							now.
						</div>
					</div>
					<div className='flex flex-col rounded-box bg-[#EFABA6] aspect-square overflow-hidden'>
						<div className='p-4'>
							Language is the key to understanding: Across borders and cultures. We
							offer the possibility to learn English as a second language in a social
							setting.
						</div>
						<div className='flex-1 flex items-end relative overflow-hidden'>
							<Image
								src='/img/course/square-1.jpg'
								alt='square-1.jpg'
								width={0}
								height={0}
								sizes='100vw'
								style={{ width: 'auto', height: 'auto' }}
							/>
							<div className='absolute inset-0 w-full flex items-center'>
								<div className='text-center w-full drop-shadow-md font-semibold text-4xl md:text-6xl text-white font-merienda'>
									Cross Borders
								</div>
							</div>
						</div>
					</div>
					<div className='flex rounded-box bg-[#89BCC4] aspect-square overflow-hidden'>
						<div className='w-2/5 flex items-end p-4 text-right'>
							Beyond Mountain is a non-profit organization. As such, we are at the
							service of society. Do you want to support us in our mission? Get in
							contact!
						</div>
						<div className='w-3/5 relative bg-base-300'>
							<Image
								src='/img/course/vertical-2.png'
								alt='vertical-2.png'
								width={384}
								height={664}
							/>
							<div className='p-4 absolute top-0 w-full drop-shadow-md font-semibold text-4xl md:text-6xl text-white font-merienda'>
								Leave a Mark
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
