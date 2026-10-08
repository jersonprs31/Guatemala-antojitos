import { getAntojitos } from '@/app/lib/data';
import { deleteAntojito } from '@/app/lib/actions';
import { signOut } from '@/auth';
import Link from 'next/link';

export default async function DashboardPage() {
  const antojitos = await getAntojitos();

  return (
    <main className="p-8 max-w-6xl mx-auto text-slate-200 min-h-screen">
      <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        
        <form action={async () => {
          'use server';
          await signOut({ redirectTo: '/login' });
        }}>
          <button type="submit" className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white px-4 py-2 rounded-md font-medium transition-colors">
            Sign Out
          </button>
        </form>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Antojitos</h2>
        
        <Link href="/dashboard/create" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md font-medium transition-colors shadow-sm">
          + Add New
        </Link>
      </div>

      <div className="overflow-x-auto bg-slate-900 rounded-lg border border-slate-800 shadow-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-700 text-slate-400 text-sm uppercase tracking-wider">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Region</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {antojitos.map((antojito) => (
              <tr key={antojito.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="p-4 font-medium text-white">{antojito.name}</td>
                <td className="p-4">{antojito.region}</td>
                <td className="p-4">
                  <span className="bg-slate-800 text-slate-300 py-1 px-2 rounded-full text-xs border border-slate-700">
                    {antojito.category}
                  </span>
                </td>
                <td className="p-4 flex space-x-4 text-sm font-medium">
                  <Link href={`/dashboard/edit/${antojito.id}`} className="text-blue-400 hover:text-blue-300 transition-colors">
                    Edit
                  </Link>
                  
                  <form action={async () => {
                    'use server';
                    await deleteAntojito(antojito.id);
                  }}>
                    <button type="submit" className="text-red-400 hover:text-red-300 transition-colors">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}