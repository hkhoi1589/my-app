import Detail from './detail';

export function generateMetadata({ params, searchParams }, parent) {
	return {
		title: searchParams.name,
	};
}

export default function UserPage() {
	return <Detail />;
}
