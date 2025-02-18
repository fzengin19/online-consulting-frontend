import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import api from './axios';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email ve şifre gerekli');
        }

        try {
          const response = await api.post('/api/auth/login', {
            email: credentials.email,
            password: credentials.password,
          });

          const { user, token } = response.data;

          if (user && token) {
            // Token'ı user nesnesine ekle
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              avatar: user.avatar,
              phone: user.phone,
              slug: user.slug,
              title: user.title,
              accessToken: token,
            };
          }

          throw new Error('Giriş başarısız');
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Giriş başarısız');
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.avatar = user.avatar;
        token.phone = user.phone;
        token.slug = user.slug;
        token.title = user.title;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as number;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.avatar = token.avatar as string;
        session.user.phone = token.phone as string;
        session.user.slug = token.slug as string;
        session.user.title = token.title as string;
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 gün
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/api/user/profile');
    return response.data;
  } catch (error) {
    return null;
  }
};