import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: number;
      name?: string | null;
      email?: string | null;
      avatar?: string | null;
      phone?: string | null;
      slug?: string | null;
      title?: string | null;
      accessToken?: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: number;
    name?: string | null;
    email?: string | null;
    avatar?: string | null;
    phone?: string | null;
    slug?: string | null;
    title?: string | null;
    accessToken?: string;
  }
}