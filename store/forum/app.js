import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Storage from '@/store/storage';

export const useAppStore = create(
	persist(
		(set, get) => ({
			dark: false,
			toggleDark: () => set({ dark: !get().dark }),
			sidebar: false,
			toggleSidebar: () => set({ sidebar: !get().sidebar }),
			more: false,
			setMore: () => set({ more: !get().more }),
		}),
		{
			name: 'forumApp', // unique name
			storage: createJSONStorage(() => Storage),
		}
	)
);
