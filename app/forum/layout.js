import Navbar from '@/components/navbar/forum';
import Sidebar from '@/components/sidebar/forum';
import { getServerSession } from 'next-auth';

export const metadata = {
	title: 'Beyond',
	description: 'The home page',
};

export default async function ForumLayout({ children }) {
	const authSession = await getServerSession();
	console.log('authSession', authSession);

	if (authSession) {
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
	} else {
		return '/auth';
	}
}
