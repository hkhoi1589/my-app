import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Storage from '@/store/storage';

export const useNotiStore = create(
	persist(
		(set, get) => ({
			noties: [],
			fcmToken: '',
			setFCMToken: (payload) => set(() => ({ fcmToken: payload })),
			setNoti: (payload) => set(() => ({ noties: payload })),
			addNoti: (payload) =>
				set((state) => ({
					noties: [
						{
							link: `/${payload?.fcmOptions?.link}`,
							img: payload?.notification?.image,
							title: payload?.notification?.title,
							body: payload?.notification?.body,
							isSeen: false,
						},
						...state.noties,
					],
				})),
		}),
		{
			name: 'forumNoti', // unique name
			storage: createJSONStorage(() => Storage),
		}
	)
);
