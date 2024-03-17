import Tabs from '@/components/Post/Tabs/withBadge';
import Search from '@/components/search/base';
import ListPost from '@/components/Post/ListPost/base';
import ListPinPost from '@/components/Post/ListPost/withPin';
import ChannelRequestList from '@/components/Channel/ListChannel/withRequest';

import dynamic from 'next/dynamic';
const NewPost = dynamic(() => import('@/components/Post/NewPost/base'));
const ListMember = dynamic(() => import('@/components/Channel/ListMember/base'), { ssr: false });

export function generateMetadata({ params, searchParams }, parent) {
	return {
		title: searchParams.channel_name,
	};
}

export default function Page() {
	return (
		<main className='relative flex-1 text-xs overflow-y-auto'>
			<Search className='pb-0 block md:hidden' />

			<div className='w-full overflow-y-auto'>
				<div className='container mx-auto p-4'>
					<div className='flex flex-col sm:flex-row justify-between mb-4'>
						<Tabs />
						<div className='flex flex-col justify-start lg:flex-row'>
							<ListMember className='w-full' />
							<NewPost className='lg:ml-4 mt-4 lg:mt-0' isChannel={true} />
						</div>
					</div>
					<ChannelRequestList />
					<ListPinPost isChannel={true} />
					<ListPost isChannel={true} customText='No posts in this Channel' />
				</div>
			</div>
		</main>
	);
}
