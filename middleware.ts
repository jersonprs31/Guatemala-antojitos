import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// Extract the auth function and export it as default
const { auth } = NextAuth(authConfig);
export default auth;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};