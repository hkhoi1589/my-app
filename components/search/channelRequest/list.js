/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useUserStore } from '@/store/forum';
import ChannelItem from './item';
import { useRequest } from '@/utils/request';

export default function ChannelList({ className = '', loader = false, limit = 10, fill = false }) {
	if (!loader) return;

	const { profile } = useUserStore();
	const src = `/api/v1/users/${profile.user_id}/invitation-channels`;

	const { data, error, size, setSize, hitEnd } = useRequest(src, {
		limit: limit,
	});
	if (error) return 'An error has occurred.';

	return (
		<div>
			{data &&
				data.map((page, i) => (
					<ul key={i} className={`divide-y-2 divide-neutral ${className}`}>
						{page.data &&
							page.data.map((item, idx) => <ChannelItem {...item} key={idx} fill={fill} />)}
					</ul>
				))}

			{data && data.length > 0 ? (
				!hitEnd &&
				limit < data.length && (
					<div className='text-center my-4'>
						<button className='btn btn-sm btn-outline' onClick={() => setSize(size + 1)}>
							Load more
						</button>
					</div>
				)
			) : (
				<div></div>
			)}
		</div>
	);
}
