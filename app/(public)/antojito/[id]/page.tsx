import { getAntojitoById } from '@/app/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// 1. Dynamic Metadata Generation
export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params;
  const id = params.id;
  const antojito = await getAntojitoById(id);

  if (!antojito) {
    return { title: 'Antojito Not Found' };
  }

  return {
    title: antojito.name,
    description: antojito.description,
    openGraph: {
      title: `${antojito.name} | Guatemala Antojitos`,
      description: antojito.description,
      images: [
        {
          url: antojito.image_url,
          width: 1200,
          height: 630,
          alt: antojito.name,
        },
      ],
    },
  };
}

// 2. Main Page Component
export default async function AntojitoDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const antojito = await getAntojitoById(id);

  if (!antojito) {
    notFound();
  }

  return (
    <main className="max-w-5xl mx-auto p-8 text-slate-200 min-h-screen">
      <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors font-medium">
        <span className="mr-2">&larr;</span> Back to Catalog
      </Link>

      <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl flex flex-col md:flex-row">
        
        <div className="w-full md:w-1/2 bg-slate-800 min-h-[300px] md:min-h-[500px]">
          <img 
            src={antojito.image_url} 
            alt={antojito.name} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="flex items-center mb-4">
            <span className="bg-blue-900/50 text-blue-400 border border-blue-800 py-1 px-3 rounded-full text-sm font-medium tracking-wide uppercase">
              {antojito.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
            {antojito.name}
          </h1>
          
          <p className="text-lg text-slate-400 font-medium mb-8 border-b border-slate-800 pb-6">
            Origin: {antojito.region}
          </p>
          
          <h2 className="text-xl font-bold text-white mb-4">About this dish</h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            {antojito.description}
          </p>
        </div>

      </div>
    </main>
  );
}