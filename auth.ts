import { findUserByCredentials } from '@/lib/user';
import NextAuth, { Session } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

declare module 'next-auth' {
  interface User {
    userName: string;
    role: number;
    roleName: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        userName: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.userName || !credentials?.password) {
          return null;
        }

        const user = await findUserByCredentials(
          credentials.userName as string,
          credentials.password as string
        );

        if (!user) {
          return null;
        }

        return {
          id: String(user.id),
          userName: user.userName,
          role: user.role,
          roleName: user.roleName,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }): Promise<Session> {
      return {
        ...session,
        user: {
          id: token.id as string,
          userName: token.userName as string,
          role: token.role as number,
          roleName: token.roleName as string,
          name: token.name as string,
        },
      };
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userName = user.userName;
        token.role = user.role;
        token.roleName = user.roleName;
        token.name = user.name;
      }
      return token;
    },
  },
});
