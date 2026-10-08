"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface Antojito {
  id: string;
  name: string;
  description: string;
  category: string;
  region: string;
  price?: number; 
  image_url?: string; 
  imageUrl?: string;
}

export default function AntojitoCard({ antojito }: { antojito: Antojito }) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Fallback to support both imageUrl or image_url from the DB
  const imageSrc = antojito.imageUrl || antojito.image_url || '';

  // 1. Check local storage when the component loads
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('antojito_favorites') || '[]');
    if (favorites.includes(antojito.id)) {
      setIsFavorite(true);
    }
  }, [antojito.id]);

  // 2. Handle the heart button click
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents the Link navigation when clicking the heart
    
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
    <article className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-slate-900 dark:border dark:border-slate-800">
      
      {/* 
        We wrap the image and text in a Link. 
        Clicking anywhere in this area takes you to the detailed view. 
      */}
      <Link href={`/antojito/${antojito.id}`} className="group flex-1 flex flex-col cursor-pointer">
        
        <div className="relative h-48 w-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          {imageSrc ? (
            <img 
              src={imageSrc} 
              alt={antojito.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
              No Image Available
            </div>
          )}
        </div>
        
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-semibold text-orange-800 dark:bg-blue-900/50 dark:text-blue-400">
              {antojito.category}
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {antojito.region}
            </span>
          </div>
          
          <h3 className="mb-2 text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors dark:text-white dark:group-hover:text-blue-400">
            {antojito.name}
          </h3>
          <p className="mb-4 flex-1 text-sm text-slate-600 line-clamp-3 dark:text-slate-300">
            {antojito.description}
          </p>
        </div>
      </Link>
      
      {/* Footer section with Price and Buttons */}
      <div className="flex items-center justify-between border-t border-slate-100 p-5 pt-4 dark:border-slate-800">
        
        <span className="text-lg font-bold text-green-700 dark:text-green-500">
          {antojito.price ? `Q${antojito.price.toFixed(2)}` : ''}
        </span>
        
        <div className="flex items-center gap-2">
          {/* Favorite Button */}
          <button 
            onClick={toggleFavorite}
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
              isFavorite 
                ? 'border-red-500 bg-red-50 text-red-500 dark:bg-red-500/10 dark:border-red-500/50' 
                : 'border-slate-300 text-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800'
            }`}
            aria-label="Toggle Favorite"
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            ♥
          </button>
          
          {/* Details Link Button */}
          <Link 
            href={`/antojito/${antojito.id}`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}