import ProfileForm from './form';

export const metadata = {
	title: 'Your Profile',
	description: 'The your profile page',
};

export default async function Page() {
	return <ProfileForm />;
}
