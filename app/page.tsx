import VisitTracker from '../components/VisitTracker';

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto p-4">
      <header className="mb-8 mt-4 text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">Guatemala Antojitos</h1>
        <p className="text-slate-600">Descubre los mejores sabores de nuestra tierra.</p>
      </header>

      {/* Aquí se renderiza el contador de visitas */}
      <VisitTracker />

      {/* Aquí irá tu CSS Grid con las tarjetas más adelante */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* <AntojitoCard /> */}
      </div>
    </main>
  );
}