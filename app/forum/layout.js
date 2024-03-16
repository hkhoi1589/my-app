import Navbar from '@/components/navbar/forum';
import Sidebar from '@/components/sidebar/forum';

export const metadata= {
    title: 'Beyond',
	description: 'The home page',
};

export default function RootLayout({ children }) {
	return (
		<div className='relative h-screen flex flex-col'>
			<Navbar className='relative z-40 border-b border-neutral shadow-sm' />
			<main
				id='main'
				className='relative w-full mx-auto flex-1 flex flex-row overflow-y-hidden'>
				<Sidebar className='relative shadow-sm border-r border-neutral' />
				{children}
			</main>
		</div>
	);
}
