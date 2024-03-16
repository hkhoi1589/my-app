import Wrap from './wrap';

export const metadata = {
	title: 'Your Friends',
	description: 'The your friends page',
};

export default function Page() {
	return <Wrap suppressHydrationWarning={true} />;
}
