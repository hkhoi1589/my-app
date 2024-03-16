/*
 * oauth
 */
export const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
export const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;

/*
 * api
 */
export const API = process.env.NEXT_PUBLIC_API;

export const maxChannelPerPage = 20;
export const maxPinPostsPerPage = 10;
export const maxPostsPerPage = 10;
export const maxCommentsPerPage = 20;
export const maxWord = 300;

export const filterItems = [
	{
		label: 'Newest channel',
		field: '-created',
	},
	{
		label: 'Oldest channel',
		field: 'created',
	},
	{
		label: 'Most members',
		field: '-total_members',
	},
	{
		label: 'Fewest members',
		field: 'total_members',
	},
	{
		label: 'A to Z',
		field: 'name',
	},
	{
		label: 'Z to A',
		field: '-name',
	},
];

export const filterItemsPost = [
	{
		label: 'Most Recent Posts',
		field: '-created',
	},
	{
		label: 'Oldest posts',
		field: 'created',
	},
	{
		label: 'A to Z',
		field: 'subject',
	},
	{
		label: 'Z to A',
		field: '-subject',
	},
];

export const optionsImg = {
	maxSizeMB: 0.4,
	maxWidthOrHeight: 1920,
	useWebWorker: true,
	fileType: 'image/webp',
};
