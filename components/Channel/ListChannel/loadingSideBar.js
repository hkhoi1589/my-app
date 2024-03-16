export default function ListChannelLoading() {
	return Array.from({ length: 6 }, (_, i) => i + 1).map((number) => (
		<div className='flex items-center w-full h-10 px-5 mb-2' key={`loading-item-${number}`}>
			<div className='animate-skeleton w-6 h-6 rounded-full'></div>

			<div className='sidebar-text ml-5'>
				<div className='animate-skeleton w-28 h-6'></div>
			</div>
		</div>
	));
}
