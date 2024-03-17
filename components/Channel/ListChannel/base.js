'use client';
import React, { useEffect, useState } from 'react';
import Pagination from '@/components/Post//Pagination/base';
import ListChannelLoading from './loading';
import channelApi from '@/services/channelApi.service';
import Filter from '@/components/Filter/base';
import { useChannelListStore } from '@/store/forum';
import { filterItems, maxChannelPerPage } from '@/utils/constant';
import ChannelItem from '@/components/Channel/ChannelItem/base';
import { toast } from 'react-toastify';

function ListChannel() {
	const [page, setPage] = useState(0);
	const [activeSort, setActiveSort] = useState(filterItems[0]);
	const { dataChannels, setDataChannels, loadingAdd, errorAdd, setMutate } =
		useChannelListStore();

	const { channels, isLoading, isError, mutate } = channelApi.ListChannel(
		activeSort?.field,
		maxChannelPerPage,
		maxChannelPerPage * page
	);

	useEffect(() => {
		setMutate(mutate);
	}, [mutate, setMutate]);

	useEffect(() => {
		if (!isError && !errorAdd) return;
		toast.error(errorAdd || isError);
		console.log('ListChannel', errorAdd || isError);
	}, [isError, errorAdd]);

	useEffect(() => {
		setDataChannels(channels);
	}, [channels, setDataChannels]);

	// useEffect(() => {
	// 	console.log('dataChannels', dataChannels);
	// }, [dataChannels]);

	if (isLoading) return <ListChannelLoading />;

	return (
		<>
			<div className='text-end border-b-2 border-b-neutral'>
				<Filter
					activeSort={activeSort}
					filterItems={filterItems}
					setActiveSort={setActiveSort}
				/>
			</div>
			<ul className='mb-8'>
				{loadingAdd && page === 1 && (
					<li className='border-b-2 border-b-neutral flex items-center justify-between p-2 sm:p-4'>
						<div className='flex justify-center items-center flex-1'>
							<div className='animate-skeleton w-12 h-12 rounded-full'></div>

							<div className='ml-4 flex-1 flex flex-col'>
								<div className='animate-skeleton w-32 h-5 mb-1'></div>
								<div className='animate-skeleton w-28 h-3'></div>
							</div>
						</div>
						<div className='animate-skeleton w-15 h-15 rounded-full'></div>
					</li>
				)}
				{dataChannels?.data?.length > 0 ? (
					dataChannels?.data?.map((channel, idx) => (
						<li
							key={`channel-${idx}`}
							className='border-b-2 border-b-neutral flex items-center justify-between p-2 sm:p-4'>
							<ChannelItem channel={channel} />
						</li>
					))
				) : (
					<li className='border-b-2 border-b-neutral flex items-center justify-between p-2 sm:p-4'>
						<div className='flex justify-center items-start flex-1'>
							No channel in this school
						</div>
					</li>
				)}
			</ul>

			<Pagination
				page={page}
				total={dataChannels?.meta?.count}
				limit={maxChannelPerPage}
				setPage={setPage}
			/>
		</>
	);
}

export default ListChannel;
