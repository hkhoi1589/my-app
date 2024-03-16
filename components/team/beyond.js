import Effect from '@/components/effect';
import Image from 'next/image';

export default function Team({ className = '' }) {
	return (
		<section id='team' className={`py-28 ${className}`}>
			<h3 className='opacity-90 text-center text-3xl font-semibold sm:text-4xl font-merienda mb-12'>
				Meet our team
			</h3>
			<Effect
				className='duration-1000 delay-300'
				isInviewState={{
					trueState: 'opacity-1',
					falseState: 'opacity-0 translate-y-6',
				}}>
				<div
					className='container mx-auto min-h-[500px] gap-8 columns-2 md:columns-3 bg-cover md:bg-contain bg-center bg-no-repeat'
					style={{ backgroundImage: "url('/img/common/world.png')" }}>
					<div className='my-10 md:-mr-6 flex items-center justify-center'>
						<div className='avatar order-1'>
							<div className='w-20 rounded-full ring ring-primary'>
								<Image
									src='/img/avatar/user-2.jpg'
									width={80}
									height={80}
									alt='user-2.jpg'
								/>
							</div>
						</div>
						<div className='bg-primary text-white rounded text-lg px-3 py-2 -mx-2'>
							Dung Pham
						</div>
					</div>
					<div className='my-16 flex items-center justify-end'>
						<div className='avatar'>
							<div className='w-20 rounded-full ring ring-accent'>
								<Image
									src='/img/avatar/user-3.jpg'
									width={80}
									height={80}
									alt='user-3.jpg'
								/>
							</div>
						</div>
						<div className='bg-accent text-white rounded text-lg px-3 py-2 -mx-2'>
							Long Huynh
						</div>
					</div>
					<div className='my-10 flex items-center justify-end'>
						<div className='avatar'>
							<div className='w-20 rounded-full ring ring-info'>
								<Image
									src='/img/avatar/user-4.jpg'
									width={80}
									height={80}
									alt='user-4.jpg'
								/>
							</div>
						</div>
						<div className='bg-info text-white rounded text-lg px-3 py-2 -mx-2'>
							Cuong Quoc
						</div>
					</div>
					<div className='my-12 flex items-center justify-start'>
						<div className='avatar order-1'>
							<div className='w-20 rounded-full ring ring-success'>
								<Image
									src='/img/avatar/user-5.jpg'
									width={80}
									height={80}
									alt='user-5.jpg'
								/>
							</div>
						</div>
						<div className='bg-success text-white rounded text-lg px-3 py-2 -mx-2'>
							Tuyen Huynh
						</div>
					</div>
					<div className='my-10 flex items-center justify-start'>
						<div className='avatar'>
							<div className='w-20 rounded-full ring ring-error'>
								<Image
									src='/img/avatar/a-1.jpg'
									width={80}
									height={80}
									alt='a-1.jpg'
								/>
							</div>
						</div>
						<div className='bg-error text-white rounded text-lg px-3 py-2 -mx-2'>
							Khoi Huynh
						</div>
					</div>
					<div className='my-16 flex items-center justify-center'>
						<div className='avatar'>
							<div className='w-20 rounded-full ring ring-warning'>
								<Image
									src='/img/avatar/a-2.jpg'
									width={80}
									height={80}
									alt='a-2.jpg'
								/>
							</div>
						</div>
						<div className='bg-warning text-white rounded text-lg px-3 py-2 -mx-2'>
							Dat Huynh
						</div>
					</div>
					<div className='my-10 flex items-center justify-start'>
						<div className='avatar'>
							<div className='w-20 rounded-full ring ring-primary'>
								<Image
									src='/img/avatar/a-3.jpg'
									width={80}
									height={80}
									alt='a-3.jpg'
								/>
							</div>
						</div>
						<div className='bg-primary text-white rounded text-lg px-3 py-2 -mx-2'>
							Bao Huynh
						</div>
					</div>
					<div className='my-16 flex items-center justify-start'>
						<div className='avatar order-1'>
							<div className='w-20 rounded-full ring ring-secondary'>
								<Image
									src='/img/avatar/a-4.jpg'
									width={80}
									height={80}
									alt='a-4.jpg'
								/>
							</div>
						</div>
						<div className='bg-secondary text-white rounded text-lg px-3 py-2 -mx-2'>
							Chau Nguyen
						</div>
					</div>
				</div>
			</Effect>
		</section>
	);
}
