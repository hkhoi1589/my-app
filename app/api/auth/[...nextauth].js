import NextAuth from 'next-auth';
import Credentials from 'node_modules/next-auth/providers/credentials';

export const providers = [
	Credentials({
		name: 'Credentials',
		credentials: {
			username: { label: 'Username', type: 'text', placeholder: 'username' },
			password: { label: 'Password', type: 'password' },
		},
		async authorize(credentials, req) {
			console.log('credentials', credentials);
			return authApi.Login(credentials); //(5)
		},
	}),
];

const pages = {
	signIn: '/auth',
};

export const authOptions = {
	// Configure one or more authentication providers
	session: {
		strategy: 'jwt', //(1)
	},
	providers,
	pages,
	callbacks: {},
};

export default NextAuth(authOptions);
