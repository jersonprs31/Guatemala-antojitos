import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export default function LoginPage() {
  async function loginAction(formData: FormData) {
    'use server';
    try {
      await signIn('credentials', formData, { redirectTo: '/dashboard' });
    } catch (error) {
      if (error instanceof AuthError) {
  
        throw new Error('Correo o contraseña incorrectos.');
      }
     
      throw error;
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <form action={loginAction} className="flex w-full max-w-md flex-col space-y-4 rounded-lg bg-slate-900 p-8 shadow-md border border-slate-800">
        <h1 className="text-2xl font-bold text-white text-center mb-6">Admin Login</h1>
        
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="email">Email</label>
          <input 
            className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 outline-none focus:border-blue-500" 
            id="email" type="email" name="email" placeholder="admin@antojitos.com" required 
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="password">Password</label>
          <input 
            className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder:text-slate-500 outline-none focus:border-blue-500" 
            id="password" type="password" name="password" placeholder="••••••" required 
          />
        </div>

        <button type="submit" className="mt-6 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 font-bold transition-colors">
          Sign In
        </button>
      </form>
    </main>
  );
}