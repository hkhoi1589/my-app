export default function NavBarLoading() {
	return (
		<div className='backdrop-blur relative z-40 border-b border-neutral shadow-sm'>
			<nav className='w-full px-1 flex justify-between min-h-16'>
				<div className='flex items-center px-1'>
					<div className='animate-skeleton w-10 h-10 mr-2 rounded-full'></div>
					<div className='animate-skeleton w-20 h-8 rounded'></div>
				</div>

				<div className='w-full max-w-2xl hidden md:flex items-center'>
					<div className='animate-skeleton w-full h-12 rounded'></div>
				</div>

				<div className='inline-flex items-center space-x-3'>
					<div className='dropdown dropdown-end'>
						<label
							tabIndex={0}
							className='list-none cursor-pointer my-auto whitespace-nowrap font-medium text-sm hover:text-accent-focus'>
							<div className='animate-skeleton w-10 h-10 rounded-full'></div>
						</label>
					</div>
				</div>
			</nav>
		</div>
	);
}
