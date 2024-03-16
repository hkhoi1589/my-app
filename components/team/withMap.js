import Image from 'next/image';

export default function Team({ className = '' }) {
	return (
		<section id='team' className={`py-28 ${className}`}>
			<h3 className='opacity-90 text-center text-3xl font-semibold sm:text-4xl font-merienda mb-12'>
				Meet our team
			</h3>
			<div
				className='container mx-auto gap-8 space-y-8 columns-2 sm:columns-3 md:columns-4 bg-contain bg-center bg-no-repeat'
				style={{ backgroundImage: "url('/img/common/world.png')" }}>
				<div className='dropdown dropdown-bottom'>
					<label tabindex='0'>
						<Image
							src='/img/avatar/kimthiendung.jpg'
							width={0}
							height={0}
							alt='kimthiendung.jpg'
							className='pic-circle w-64 ring-4 ring-info'
						/>
					</label>
					<div className='dropdown-content z-10 rounded-lg bg-white/50 backdrop-blur p-4 mt-6 text-lg'>
						Edouard Ollivier
						<p className='text-sm opacity-60'>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry.
						</p>
					</div>
				</div>
				<div className='dropdown dropdown-bottom'>
					<label tabindex='0'>
						<Image
							src='/img/avatar/user-1.jpg'
							width={0}
							height={0}
							alt='user-1.jpg'
							className='pic-circle w-32 ring-4 ring-warning'
						/>
					</label>
					<div className='dropdown-content z-10 rounded-lg bg-white/50 backdrop-blur p-4 mt-6 text-lg'>
						Edouard Ollivier
						<p className='text-sm opacity-60'>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry.
						</p>
					</div>
				</div>
				<div className='dropdown dropdown-bottom'>
					<label tabindex='0'>
						<Image
							src='/img/avatar/user-2.jpg'
							width={0}
							height={0}
							alt='user-2.jpg'
							className='pic-circle w-64 ring-4 ring-success'
						/>
					</label>
					<div className='dropdown-content z-10 rounded-lg bg-white/50 backdrop-blur p-4 mt-6 text-lg'>
						Edouard Ollivier
						<p className='text-sm opacity-60'>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry.
						</p>
					</div>
				</div>
				<div className='dropdown dropdown-bottom'>
					<label tabindex='0'>
						<Image
							src='/img/avatar/user-3.jpg'
							width={0}
							height={0}
							alt='user-3.jpg'
							className='pic-circle w-48 ring-4 ring-error'
						/>
					</label>
					<div className='dropdown-content z-10 rounded-lg bg-white/50 backdrop-blur p-4 mt-6 text-lg'>
						Edouard Ollivier
						<p className='text-sm opacity-60'>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry.
						</p>
					</div>
				</div>
				<div className='dropdown dropdown-bottom'>
					<label tabindex='0'>
						<Image
							src='/img/avatar/user-4.jpg'
							width={0}
							height={0}
							alt='user-4.jpg'
							className='pic-circle w-72 ring-4'
						/>
					</label>
					<div className='dropdown-content z-10 rounded-lg bg-white/50 backdrop-blur p-4 mt-6 text-lg'>
						Edouard Ollivier
						<p className='text-sm opacity-60'>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry.
						</p>
					</div>
				</div>
				<div className='dropdown dropdown-bottom'>
					<label tabindex='0'>
						<Image
							src='/img/avatar/user-5.jpg'
							width={0}
							height={0}
							alt='user-5.jpg'
							className='pic-circle w-32 ring-4 ring-secondary'
						/>
					</label>
					<div className='dropdown-content z-10 rounded-lg bg-white/50 backdrop-blur p-4 mt-6 text-lg'>
						Edouard Ollivier
						<p className='text-sm opacity-60'>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry.
						</p>
					</div>
				</div>
				<div className='dropdown dropdown-bottom'>
					<label tabindex='0'>
						<Image
							src='/img/avatar/a-1.jpg'
							width={0}
							height={0}
							alt='a-1.jpg'
							className='pic-circle ring-4 ring-primary'
						/>
					</label>
					<div className='dropdown-content z-10 rounded-lg bg-white/50 backdrop-blur p-4 mt-6 text-lg'>
						Edouard Ollivier
						<p className='text-sm opacity-60'>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry.
						</p>
					</div>
				</div>
				<div className='dropdown dropdown-bottom'>
					<label tabindex='0'>
						<Image
							src='/img/avatar/a-2.jpg'
							width={0}
							height={0}
							alt='a-2.jpg'
							className='pic-circle w-36 ring-4 ring-accent'
						/>
					</label>
					<div className='dropdown-content z-10 rounded-lg bg-white/50 backdrop-blur p-4 mt-6 text-lg'>
						Edouard Ollivier
						<p className='text-sm opacity-60'>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry.
						</p>
					</div>
				</div>
				<div className='dropdown dropdown-bottom'>
					<label tabindex='0'>
						<Image
							src='/img/avatar/a-3.jpg'
							width={0}
							height={0}
							alt='a-3.jpg'
							className='pic-circle w-64 ring-4 ring-warning'
						/>
					</label>
					<div className='dropdown-content z-10 rounded-lg bg-white/50 backdrop-blur p-4 mt-6 text-lg'>
						Edouard Ollivier
						<p className='text-sm opacity-60'>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry.
						</p>
					</div>
				</div>
				<div className='dropdown dropdown-bottom'>
					<label tabindex='0'>
						<Image
							src='/img/avatar/a-4.jpg'
							width={0}
							height={0}
							alt='a-4.jpg'
							className='pic-circle w-48 ring-4 ring-info'
						/>
					</label>
					<div className='dropdown-content z-10 rounded-lg bg-white/50 backdrop-blur p-4 mt-6 text-lg'>
						Edouard Ollivier
						<p className='text-sm opacity-60'>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry.
						</p>
					</div>
				</div>
				<div className='dropdown dropdown-bottom'>
					<label tabindex='0'>
						<Image
							src='/img/avatar/a-5.jpg'
							width={0}
							height={0}
							alt='a-5.jpg'
							className='pic-circle ring-4 ring-success'
						/>
					</label>
					<div className='dropdown-content z-10 rounded-lg bg-white/50 backdrop-blur p-4 mt-6 text-lg'>
						Edouard Ollivier
						<p className='text-sm opacity-60'>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry.
						</p>
					</div>
				</div>
				<div className='dropdown dropdown-bottom'>
					<label tabindex='0'>
						<Image
							src='/img/avatar/a-6.jpg'
							width={0}
							height={0}
							alt='a-6.jpg'
							className='pic-circle w-32 ring-4 ring-error'
						/>
					</label>
					<div className='dropdown-content z-10 rounded-lg bg-white/50 backdrop-blur p-4 mt-6 text-lg'>
						Edouard Ollivier
						<p className='text-sm opacity-60'>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
