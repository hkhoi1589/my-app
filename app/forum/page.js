import ListChannel from '@/components/Channel/ListChannel/base';
import Tabs from '@/components/Post/Tabs/withBadge';

import dynamic from 'next/dynamic';
const NewChannel = dynamic(() => import('@/components/Channel/NewChannel/base'));
const Search = dynamic(() => import('@/components/search/base'), { ssr: false });

export const metadata = {
	title: 'Channels',
	description: 'The channel page',
};

export default function Page() {
	return (
		<div className='relative flex-1 text-xs overflow-y-auto'>
			<Search className='pb-0 block md:hidden' />

			<div className='w-full'>
				<div className='container mx-auto p-4'>
					<div className='flex flex-col lg:flex-row justify-between mb-4'>
						<Tabs />
						<div className='flex flex-col justify-end sm:flex-row'>
							<NewChannel className='mr-0 sm:mr-4 mb-4 sm:mb-0' />
						</div>
					</div>
					<ListChannel />
				</div>
			</div>
		</div>
	);
}
