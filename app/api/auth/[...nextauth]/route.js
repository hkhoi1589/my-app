import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: 'Credentials',
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				console.log(credentials);
				// Add logic here to look up the user from the credentials supplied
				const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' };

				if (user) {
					// Any object returned will be saved in `user` property of the JWT
					return user;
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					return null;

					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
		}),
	],
	pages: {
		signIn: '/auth/login',
	},
	callbacks: {
		async jwt({ token, user, session }) {
			// the processing of JWT occurs before handling sessions.
			console.log('jwt callback ', { token, user, session });

			if (user) {
				token.accessToken = user.accessToken;
				token.refreshToken = user.refreshToken;
				token.accessTokenExpires = user.accessTokenExpires;
				token.role = user.role;
				token.id = user.id;
			}

			return token;
		},

		//  The session receives the token from JWT
		async session({ session, token, user }) {
			console.log('session callback ', { token, user, session });

			return {
				...session,
				user: {
					...session.user,
					accessToken: token.accessToken,
					refreshToken: token.refreshToken,
					role: token.role,
					id: token.id,
				},
				error: token.error,
			};
		},
	},
});

export { handler as GET, handler as POST };
