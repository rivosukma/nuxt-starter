import CredentialsProvider from 'next-auth/providers/credentials';
import { NuxtAuthHandler } from '#auth';

export default NuxtAuthHandler({
    secret: process.env.AUTH_SECRET,
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        CredentialsProvider.default({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            async authorize(credentials: { email: string; password: string }) {
                const user = {
                    id: '1',
                    name: 'J Smith',
                    email: 'jsmith@suretybond.co.id',
                    password: 'hunter2'
                };

                if (
                    credentials?.email === user.email &&
                    credentials?.password === user.password
                ) {
                    return user;
                } else {
                    // eslint-disable-next-line no-console
                    console.error(
                        'Warning: Malicious login attempt registered, bad credentials provided'
                    );
                    return null;
                }
            }
            // callbacks: {
            //   jwt({ token, user }: any) {
            //     console.log("jwt", token, user);
            //     if (user) token.user = user;

            //     return Promise.resolve(token);
            //   },
            //   session({ token, session }: any) {
            //     console.log("sesh", token, session);
            //     if (token) session.user = token.user;
            //     return Promise.resolve(session);
            //   },
            // },
        })
    ]
});
