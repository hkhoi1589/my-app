/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useUserStore } from '@/store/forum';
import userApi from '@/services/userApi.service';
import UserItem from './item';
import { useEffect } from 'react';

export default function UserList({ className = '' }) {
	const { profile, friendsRequests, setFriendRequests } = useUserStore();
	if (!profile) return;
	const { requests, isLoading, isError, mutate } = userApi.GetFriendsRequest(profile.user_id);

	useEffect(() => {
		if (!isError) return;
		//toast.error(errorAdd || isError);
		console.log('ListFriendsRequest', isError);
	}, [isError]);

	useEffect(() => {
		setFriendRequests(requests?.data);
	}, [requests, setFriendRequests]);

	return (
		<ul className={className}>
			{friendsRequests &&
				friendsRequests.map((item, idx) => (
					<UserItem
						id={item.id}
						full_name={item.full_name}
						avatar={item.avatar}
						mutate={mutate}
						key={`friend-${idx}`}
					/>
				))}
		</ul>
	);
}
