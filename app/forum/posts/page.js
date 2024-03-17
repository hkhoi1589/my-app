import Tabs from '@/components/Post/Tabs/withBadge';
import ListPost from '@/components/Post/ListPost/base';
import ListPinPost from '@/components/Post/ListPost/withPin';

import dynamic from 'next/dynamic';
const NewPost = dynamic(() => import('@/components/Post/NewPost/base'));
const Search = dynamic(() => import('@/components/search/base'), { ssr: false });

export const metadata = {
	title: 'Posts',
	description: 'The post page',
};

export default async function Page() {
	return (
		<main className='relative flex-1 text-xs overflow-y-auto'>
			<Search className='pb-0 block md:hidden' />

			<div className='w-full'>
				<div className='container mx-auto p-4'>
					<div className='flex flex-col sm:flex-row justify-between mb-4'>
						<Tabs />
						<NewPost />
					</div>
					<ListPinPost />
					<ListPost />
				</div>
			</div>
		</main>
	);
}
