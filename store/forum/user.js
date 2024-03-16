import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Storage from '@/store/storage';

export const useUserStore = create(
	persist(
		(set, get) => ({
			access: null, // access_token
			refresh: null, // refresh_token
			profile: {},
			friendsRequests: [],
			channelRequests: [],
			friendsList: [],
			yourChannels: [],
			mutateYourChannels: {},

			setAccess: (payload) => set(() => ({ access: payload })),
			setRefresh: (payload) => set(() => ({ refresh: payload })),
			setProfile: (payload) => set(() => ({ profile: payload })),
			setFriendRequests: (payload) => set(() => ({ friendsRequests: payload })),
			setChannelRequests: (payload) => set(() => ({ channelRequests: payload })),
			setFriendList: (payload) => set(() => ({ friendsList: payload })),
			setYourChannels: (payload) => set(() => ({ yourChannels: payload })),
			setMutateYourChannels: (payload) => set(() => ({ mutateYourChannels: payload })),
		}),
		{
			name: 'forumUser', // unique name
			storage: createJSONStorage(() => Storage),
		}
	)
);
