import Image from 'next/image';

export interface Antojito {
  id: string;
  name: string;
  description: string;
  category: string;
  region: string;
  price: number;
  imageUrl: string;
}

export default function AntojitoCard({ antojito }: { antojito: Antojito }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg">
      <div className="relative h-48 w-full bg-gray-200">
        {/* Note: Ensure you have placeholder images in your public/images folder */}
        <Image 
          src={antojito.imageUrl} 
          alt={antojito.name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-semibold text-orange-800">
            {antojito.category}
          </span>
          <span className="text-xs font-medium text-gray-500">
            {antojito.region}
          </span>
        </div>
        
        <h3 className="mb-2 text-xl font-bold text-gray-900">{antojito.name}</h3>
        <p className="mb-4 flex-1 text-sm text-gray-600 line-clamp-3">
          {antojito.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="text-lg font-bold text-green-700">
            Q{antojito.price.toFixed(2)}
          </span>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
            Ver detalles
          </button>
        </div>
      </div>
    </article>
  );
}