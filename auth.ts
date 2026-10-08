import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcrypt';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
   
        if (typeof credentials.email !== 'string' || typeof credentials.password !== 'string') {
          return null;
        }

        try {
          
          const sql = neon(process.env.DATABASE_URL!);
          const users = await sql`SELECT * FROM users WHERE email = ${credentials.email}`;
          
          if (users.length === 0) return null; 
          
          const user = users[0];

          
          const passwordsMatch = await bcrypt.compare(credentials.password, user.password_hash);

          if (passwordsMatch) {
          
            return { id: user.id, name: user.name, email: user.email };
          }
        } catch (error) {
          console.error('Error verificando credenciales:', error);
        }

       
        return null;
      },
    }),
  ],
});