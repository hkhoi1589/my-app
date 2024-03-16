import { create } from 'zustand';

export const useCommentsListStore = create((set, get) => ({
	dataComments: [],
	loadingAdd: false,
	errorAdd: '',
	mutate: {},

	setDataComments: (payload) => set(() => ({ dataComments: payload })),
	setLoadingAdd: (payload) => set(() => ({ loadingAdd: payload })),
	setErrorAdd: (payload) => set(() => ({ errorAdd: payload })),
	setMutate: (payload) => set(() => ({ mutate: payload })),
}));
