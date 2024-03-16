import { create } from 'zustand';

export const usePostListStore = create((set, get) => ({
	dataPosts: [], // for list posts page
	dataPinPosts: [], // for list pin posts page
	loadingAdd: false,
	errorAdd: '',
	loadingAddChannel: false,
	errorAddChannel: '',
	mutatePosts: {},
	mutatePinPosts: {},
	mutateDetailPost: {},

	setDataPosts: (payload) => set(() => ({ dataPosts: payload })),
	setDataPinPosts: (payload) => set(() => ({ dataPinPosts: payload })),
	setLoadingAdd: (payload) => set(() => ({ loadingAdd: payload })),
	setErrorAdd: (payload) => set(() => ({ errorAdd: payload })),
	setLoadingAddChannel: (payload) => set(() => ({ loadingAddChannel: payload })),
	setErrorAddChannel: (payload) => set(() => ({ errorAddChannel: payload })),
	setMutatePosts: (payload) => set(() => ({ mutatePosts: payload })),
	setMutatePinPosts: (payload) => set(() => ({ mutatePinPosts: payload })),
	setMutateDetailPost: (payload) => set(() => ({ mutateDetailPost: payload })),
}));
