import Image from 'next/image';

export default function Contact({ className = '' }) {
	const servicesItems = ['Mobile development', 'UI/UX Design', 'web development', 'SEO'];

	return (
		<section className={`flex overflow-hidden ${className}`}>
			<div className='flex-1 hidden lg:block'>
				<Image
					src='/img/common/contact.jpg'
					className='w-full h-screen object-cover'
					width={0}
					height={0}
					alt='contact.jpg'
				/>
			</div>
			<div className='py-12 flex-1 lg:flex lg:justify-center lg:h-screen lg:overflow-auto'>
				<div className='max-w-lg flex-1 mx-auto px-4'>
					<div>
						<h3 className='opacity-90 text-3xl font-semibold sm:text-4xl'>
							Get in touch
						</h3>
						<p className='mt-3'>
							We’d love to hear from you! Please fill out the form bellow.
						</p>
					</div>
					<form className='space-y-5 mt-12 lg:pb-12'>
						<div>
							<label className='font-medium'>Full name</label>
							<input
								type='text'
								required
								className='w-full mt-2 input input-sm border-gray-200 shadow-sm'
							/>
						</div>
						<div>
							<label className='font-medium'>Email</label>
							<input
								type='email'
								required
								className='w-full mt-2 input input-sm border-gray-200 shadow-sm'
							/>
						</div>
						<div>
							<label className='font-medium'>Phone number</label>
							<div className='relative mt-2'>
								<div className='absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2'>
									<select className='text-sm bg-transparent outline-none rounded-lg h-full'>
										<option>US</option>
										<option>ES</option>
										<option>MR</option>
									</select>
								</div>
								<input
									type='number'
									placeholder='+1 (555) 000-000'
									required
									className='w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg'
								/>
							</div>
						</div>
						<div>
							<label className='font-medium'>Services</label>
							<ul className='grid gap-y-2 gap-x-6 flex-wrap grid-cols-2 mt-3'>
								{servicesItems.map((item, idx) => (
									<li key={idx} className='flex gap-x-3 text-sm'>
										<div>
											<input
												id={`service-${idx}`}
												type='checkbox'
												className='checkbox-item peer hidden'
											/>
											<label
												htmlFor={`service-${idx}`}
												className='relative flex w-5 h-5 bg-white peer-checked:bg-primary rounded-md border ring-offset-2 ring-primary duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45'></label>
										</div>
										<label
											htmlFor={`service-${idx}`}
											className='cursor-pointer'>
											{item}
										</label>
									</li>
								))}
							</ul>
						</div>
						<div>
							<label className='font-medium'>Message</label>
							<textarea
								required
								className='w-full mt-2 textarea border-gray-200 shadow-sm'
								rows={4}></textarea>
						</div>
						<button className='w-full px-4 py-2 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-lg duration-150'>
							Submit
						</button>
					</form>
				</div>
			</div>
		</section>
	);
}
