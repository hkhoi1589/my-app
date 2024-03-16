import Image from 'next/image';

export default function Team({ className = '' }) {
	return (
		<section id='team' className={`py-28 ${className}`}>
			<div className='relative w-72 lg:w-full lg:max-w-md aspect-square mx-auto sm:text-center border-4 border-white/50 rounded-full'>
				<div className='indicator w-full absolute inset-0'>
					<span className='indicator-item indicator-middle indicator-center inline-flex justify-center text-3xl pb-6 font-semibold font-merienda'>
						Our team
					</span>
					<span className='indicator-item indicator-top indicator-center'>
						<div className='-ml-12 avatar tooltip tooltip-bottom' data-tip='Dung Pham'>
							<div className='w-24 rounded-full ring ring-white hover:ring-info ring-offset-2'>
								<Image
									src='/img/avatar/kimthiendung.jpg'
									width={0}
									height={0}
									alt='kimthiendung.jpg'
								/>
							</div>
						</div>
					</span>
					<span className='indicator-item indicator-bottom indicator-center'>
						<div className='-ml-12 avatar tooltip tooltip-top' data-tip='Ana Nguyen'>
							<div className='w-24 rounded-full ring ring-white hover:ring-success ring-offset-2'>
								<Image
									src='/img/avatar/user-3.jpg'
									width={0}
									height={0}
									alt='user-3.jpg'
								/>
							</div>
						</div>
					</span>
					<span className='indicator-item indicator-middle indicator-start'>
						<div className='-mt-12 avatar tooltip tooltip-right' data-tip='Black Pink'>
							<div className='w-24 rounded-full ring ring-white hover:ring-warning ring-offset-2'>
								<Image
									src='/img/avatar/user-1.jpg'
									width={0}
									height={0}
									alt='user-1.jpg'
								/>
							</div>
						</div>
					</span>
					<span className='indicator-item indicator-middle indicator-end'>
						<div className='-mt-12 avatar tooltip tooltip-left' data-tip='Jone Cena'>
							<div className='w-24 rounded-full ring ring-white hover:ring-error ring-offset-2'>
								<Image
									src='/img/avatar/user-2.jpg'
									width={0}
									height={0}
									alt='user-2.jpg'
								/>
							</div>
						</div>
					</span>
				</div>
			</div>
		</section>
	);
}
