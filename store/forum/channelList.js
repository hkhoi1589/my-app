import { create } from 'zustand';

export const useChannelListStore = create((set, get) => ({
	dataChannels: [], // for list channel page
	loadingAdd: false,
	errorAdd: '',
	mutate: {},
	setDataChannels: (payload) => set(() => ({ dataChannels: payload })),
	setLoadingAdd: (payload) => set(() => ({ loadingAdd: payload })),
	setErrorAdd: (payload) => set(() => ({ errorAdd: payload })),
	setMutate: (payload) => set(() => ({ mutate: payload })),
}));
