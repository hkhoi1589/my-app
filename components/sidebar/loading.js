export default function SideBarLoading() {
	return (
		<div className='sidebar sidebar-full flex flex-col items-center h-full bg-base-100 overflow-y-auto relative shadow-sm border-r border-neutral scrollbar-hide'>
			<div className='w-full'>
				{Array.from({ length: 3 }, (_, i) => i + 1).map((number) => (
					<div
						key={`sidebarloading-${number}`}
						className='flex items-center w-full h-12 px-5 mb-2 hover:bg-neutral-focus'>
						<div className='animate-skeleton w-52 h-6'></div>
					</div>
				))}

				<div className='flex items-center w-full h-12 px-5 mt-2 hover:bg-neutral-focus cursor-pointer'>
					<div className='animate-skeleton w-6 h-6 mr-2 rounded-full'></div>
					<div className='animate-skeleton flex-1 h-6'></div>
				</div>
			</div>
		</div>
	);
}
