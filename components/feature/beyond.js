import Link from 'next/link';
import Effect from '@/components/effect';
import Image from 'next/image';

export default function Feature({ className = '' }) {
	return (
		<div id='our-story' className={`${className}`}>
			<Effect
				className='duration-[4s] delay-300'
				isInviewState={{
					trueState: 'opacity-1',
					falseState: 'opacity-0 translate-y-6',
				}}>
				<section
					className={`mx-auto max-w-screen-xl rounded-2xl bg-no-repeat bg-cover pt-4 px-12`}
					style={{ backgroundImage: 'url(/img/common/mountain.png)' }}>
					<div className='relative z-10 gap-5 items-center lg:flex'>
						<div className='flex-1 max-w-lg sm:mx-auto sm:text-center lg:order-1 lg:max-w-xl lg:text-left'>
							<div className='py-12 lg:py-0 gap-12'>
								<h3 className='text-3xl sm:text-4xl font-semibold font-merienda'>
									Beyond the Mountains{' '}
									<span className='font-normal text-base'>(BM)</span>
								</h3>
								<p className='text-lg lg:text-xl mt-3'>
									is a non-profit organization founded by college and high school
									students in the United States. The pandemic and wars erased
									borders and shrunk the world. It showed us that acts by
									individuals can have devastating impacts on our world. Modest
									initiatives bringing uplifting changes can also transcend vast
									distances. We believe that hundreds of brief and simple
									educational interactions at BM will engage students in
									Kyrgyzstan, Afghanistan, Ukraine, and beyond on a profound
									level.
								</p>
							</div>
						</div>
						<div className='flex-none max-w-md mx-auto'>
							<Image
								src='/img/common/students.png'
								width={0}
								height={0}
								alt='students.png'
								className='w-full'
							/>
						</div>
					</div>
				</section>
			</Effect>
			<section className='mx-auto max-w-screen-xl my-20 gap-6 grid lg:grid-cols-2'>
				<Effect
					className='duration-[3s] delay-300'
					isInviewState={{
						trueState: 'opacity-1',
						falseState: 'opacity-0 -translate-x-6',
					}}>
					<div className='rounded-2xl bg-gradient-to-b from-base-300/30 p-12'>
						<h3 className='text-2xl lg:text-4xl font-semibold sm:text-4xl font-merienda'>
							Explore
						</h3>
						<p className='text-lg lg:text-xl mt-3'>
							With the recent arrival of over a hundred thousand refugees from
							Afghanistan and Ukraine, Beyond Mountain is directing resources to serve
							the Afghan and Ukrainian communities in the U.S.
						</p>
						<Link href='/forum' className='btn btn-sm btn-outline mt-3'>
							How we get Students involved
						</Link>
					</div>
				</Effect>
				<Effect
					className='duration-[4s] delay-300'
					isInviewState={{
						trueState: 'opacity-1',
						falseState: 'opacity-0 translate-x-6',
					}}>
					<div className='rounded-2xl bg-gradient-to-b from-base-300/30 p-8'>
						<Image
							src='/img/course/childs.png'
							className='max-w-96 mx-auto'
							width={0}
							height={0}
							alt='childs.png'
						/>
					</div>
				</Effect>
			</section>
			<section className='mx-auto max-w-screen-xl my-20 gap-6 grid lg:grid-cols-3'>
				<Effect
					className='duration-[1s] delay-600'
					isInviewState={{
						trueState: 'opacity-1',
						falseState: 'opacity-0 translate-y-6',
					}}>
					<div className='rounded-2xl bg-gradient-to-b from-primary/10 p-12'>
						<h3 className='text-center text-2xl lg:text-4xl font-semibold sm:text-4xl font-merienda'>
							<i className='ri-broadcast-fill block drop-shadow'></i>
							Spread the Word
						</h3>
						<p className='text-lg lg:text-xl mt-3'>
							We think the world would be better if everyone were included. Around the
							world, exclusion and discrimination continue to divide people. We act
							now.
						</p>
					</div>
				</Effect>
				<Effect
					className='duration-[3s] delay-600'
					isInviewState={{
						trueState: 'opacity-1',
						falseState: 'opacity-0 translate-y-6',
					}}>
					<div className='rounded-2xl bg-gradient-to-b from-secondary/10 p-12'>
						<h3 className='text-center text-2xl lg:text-4xl font-semibold sm:text-4xl font-merienda'>
							<i className='ri-global-line block drop-shadow'></i>
							Cross Borders
						</h3>
						<p className='text-lg lg:text-xl mt-3'>
							Language is the key to understanding: Across borders and cultures. We
							offer the possibility to learn English as a second language in a social
							setting.
						</p>
					</div>
				</Effect>
				<Effect
					className='duration-[5s] delay-600'
					isInviewState={{
						trueState: 'opacity-1',
						falseState: 'opacity-0 translate-y-6',
					}}>
					<div className='rounded-2xl bg-gradient-to-b from-accent/10 p-12'>
						<h3 className='text-center text-2xl lg:text-4xl font-semibold sm:text-4xl font-merienda'>
							<i className='ri-pencil-line block drop-shadow'></i>
							Leave a Mark
						</h3>
						<p className='text-lg lg:text-xl mt-3'>
							Beyond Mountain is a non-profit organization. As such, we are at the
							service of society. Do you want to support us in our mission? Get in
							contact!
						</p>
					</div>
				</Effect>
			</section>
		</div>
	);
}
