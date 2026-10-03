"use client";

import { useState, useEffect } from 'react';
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
  const [isFavorite, setIsFavorite] = useState(false);

  // 1. Check local storage when the component loads
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('antojito_favorites') || '[]');
    if (favorites.includes(antojito.id)) {
      setIsFavorite(true);
    }
  }, [antojito.id]);

  // 2. Handle the heart button click
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('antojito_favorites') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      // Remove from favorites
      newFavorites = favorites.filter((id: string) => id !== antojito.id);
    } else {
      // Add to favorites
      newFavorites = [...favorites, antojito.id];
    }
    
    // Save back to local storage and update UI
    localStorage.setItem('antojito_favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg">
      <div className="relative h-48 w-full bg-gray-200">
        <div className="flex h-full w-full items-center justify-center bg-gray-200 text-sm text-gray-500">
          [Image Placeholder]
        </div>
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
          <div className="flex items-center gap-2">
            {/* The new Favorite button */}
            <button 
              onClick={toggleFavorite}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border ${isFavorite ? 'border-red-500 bg-red-50 text-red-500' : 'border-gray-300 text-gray-400 hover:bg-gray-50'}`}
              aria-label="Toggle Favorite"
            >
              ♥
            </button>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
              Details
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}