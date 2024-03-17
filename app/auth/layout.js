import Navbar from '@/components/navbar/auth';

export const metadata = {
	title: 'Beyond Dashboard',
	description: 'The Auth page',
};

export default function AuthLayout({ children }) {
	return (
		<div className='relative h-screen flex flex-col bg-base-200'>
			<Navbar className='relative z-40 shadow-sm' />
			<main id='main' className='relative w-full mx-auto flex-1 overflow-y-hidden'>
				{children}
			</main>
		</div>
	);
}
