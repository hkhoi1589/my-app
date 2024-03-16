import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Storage from '@/store/storage';

export const useStore = create(
	persist(
		(set, get) => ({
			dark: false,
			toggleDark: () => set({ dark: !get().dark }),
		}),
		{
			name: 'istore', // unique name
			storage: createJSONStorage(() => Storage),
		}
	)
);
