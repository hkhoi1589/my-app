import ChannelRequest from '@/components/search/channelRequest/list';
import ChannelList from '@/components/search/channel/list';

export const metadata = {
	title: 'Your Channels',
	description: 'The your channels page',
};

export default function Page() {
	const src = `/api/v1/me/channels`;

	return (
		<>
			<ChannelRequest loader={true} limit={10} />
			<ChannelList src={src} loader={true} limit={10} fill={true} />
		</>
	);
}
