'use client';

import useSWRInfinite from 'swr/infinite';
import fetcher from '@/utils/fetcher';
import { API } from '@/utils/constant';

export const useRequest = (url, filter = { limit: 10 }, opts = {}) => {
	const slug = `${new URLSearchParams(filter)}`; // { limit: 10, ... }

	const getKey = (pageIndex, previousPageData) => {
		// reached the end
		if (previousPageData && !previousPageData.data) return null;

		// first page, we don't have `previousPageData`
		if (pageIndex === 0) return `${API + url}?offset=${pageIndex * filter.limit}&${slug}`;

		return `${API + url}?offset=${pageIndex * filter.limit}&${slug}`;
	};

	const resutls = useSWRInfinite(
		getKey,
		fetcher, // method fetch
		{
			revalidateIfStale: true, // automatically revalidate even if there is stale data (details)
			revalidateOnFocus: false, // automatically revalidate when window gets focused (details)
			revalidateOnReconnect: true, // automatically revalidate when the browser regains a network connection
			shouldRetryOnError: false, // retry when fetcher has an error
			errorRetryCount: 3, //max error retry count
			...opts,
		} // option
	);

	// check end data
	let noData = false;
	let hitEnd = false;
	let error = '';
	const { data, mutate } = resutls;

	if (data) {
		// check array in results
		const json = data[data.length - 1] || { data: [] };
		if (json.data?.length === 0) {
			hitEnd = true;
			if (resutls.size === 1) noData = true;
		} else if (json.meta?.count <= resutls.size * json.data?.length) hitEnd = true;
		else error = json.status === false ? json.message : '';

		//console.log(hitEnd, json.count, resutls.size * json.data.length);
	}

	return {
		...resutls,
		error,
		hitEnd,
		noData,
		mutate,
	};
};
