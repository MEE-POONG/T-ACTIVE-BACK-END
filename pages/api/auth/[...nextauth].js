
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: {
                    label: 'username',
                    type: 'username',
                    placeholder: 'username'
                },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {

                const { username, password } = credentials;

                if (username === 'admin' && password === 'meprompt') {
                    return {
                        id: 1,
                        name: 'Admin',
                        email: 'admin@localhost',
                        image: null,
                    };
                } else {
                    return null;
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user, account }) {
            // console.log('jwt', token, user, account);
            // console.log('user', user);
            if (account && user) {
                return {
                    ...token,
                    ...user,
                    ...account
                };
            }

            return token;
        },

        async session({ session, token }) {
            // console.log('session', session, token);
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.accessTokenExpires = token.accessTokenExpires;

            return { ...session, user: { ...token } };
        },
        async credentials({ credentials, req, res }) {
            // console.log('credentials', credentials, req, res);
            return credentials;
        }
    },
    theme: {
        colorScheme: 'light', // "auto" | "dark" | "light"
        brandColor: '#33FF5D', // Hex color code #33FF5D
        logo: '/logo.png', // Absolute URL to image
    },
    debug: process.env.NODE_ENV === 'development',
});