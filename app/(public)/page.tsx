import VisitTracker from '../../components/VisitTracker';
import Search from '../../components/Search';
import AntojitoCard from '../../components/AntojitoCard';
import { getAntojitos } from '../lib/data';

export default async function Home(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const antojitos = await getAntojitos(query, currentPage);

  return (
    <main className="max-w-6xl mx-auto p-4">
      <header className="mb-8 mt-4 text-center">
        <h1 className="text-4xl font-bold text-blue-500 mb-2">Guatemala Antojitos</h1>
        <p className="text-slate-300">Discover the best flavors of our land.</p>
      </header>

      <VisitTracker />

      <div className="mt-8">
        <Search placeholder="Search antojitos by name, category, or region..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {antojitos.map((antojito: any) => (
          <AntojitoCard key={antojito.id} antojito={antojito} />
        ))}
      </div>
    </main>
  );
}