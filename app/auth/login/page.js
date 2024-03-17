import LoginForm from '@/components/Form/login';
import { Suspense } from 'react';

export default function Page() {
	return (
		<Suspense fallback='Loading Login Form'>
			<LoginForm />
		</Suspense>
	);
}
