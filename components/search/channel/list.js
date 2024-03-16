/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import Progress from '@/components/progress';
import Loading from '@/app/forum/you/your-posts/loading';
import ChannelItem from './item';
import { useRequest } from '@/utils/request';
import useIsInViewport from '@/utils/useIsInViewport';
import { useEffect, useRef } from 'react';

export default function ChannelList({
	className = '',
	src = '/api/v1/channels/search',
	loader = false,
	limit = 8,
	q = '',
	fill = false,
}) {
	if (!loader) return;

	const { data, error, size, setSize, isLoading, hitEnd, noData, mutate } = useRequest(src, {
		limit: limit,
		q: q,
	});
	if (error) return 'An error has occurred.';

	// handle autoload with is viewport
	const btnLoad = useRef(null);
	const isInViewport = useIsInViewport(btnLoad);

	useEffect(() => {
		if (data && isInViewport) {
			if (!isLoading && !hitEnd) {
				// console.log('load');
				setSize(size + 1);
			}
		}
	}, [data, hitEnd, isInViewport, isLoading, setSize, size]);

	// useEffect(() => {
	// 	console.log('data', data);
	// }, [data]);

	return (
		<div>
			{data &&
				data.map((page, i) => (
					<ul key={i} className={`divide-y-2 border-b-2 divide-neutral ${className}`}>
						{page.data &&
							page.data.map((item, idx) => (
								<ChannelItem {...item} mutate={mutate} key={idx} fill={fill} />
							))}
					</ul>
				))}

			{isLoading && <Loading className='mx-auto my-4' />}

			<div className='text-center my-4' ref={btnLoad}>
				{!isLoading && !hitEnd && <Progress className='mx-auto my-4' />}
			</div>

			{!isLoading && noData && <div className='text-base my-2'>No data</div>}
		</div>
	);
}
