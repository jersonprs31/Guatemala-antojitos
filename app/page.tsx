"use client";

import { useState } from "react";
import antojitosData from "../src/data/antojitos.json";
import AntojitoCard from "../src/components/AntojitoCard";
import type { Antojito } from "../src/components/AntojitoCard";

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extract unique categories for the dropdown
  const categories = ["All", ...Array.from(new Set(antojitosData.map(item => item.category)))];

  // Filter logic (Issue #6)
  const filteredAntojitos = (antojitosData as Antojito[]).filter((antojito) => {
    const matchesSearch = antojito.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || antojito.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="mx-auto max-w-7xl">
        
        <header className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-gray-900">Guatemala Antojitos</h1>
          <p className="text-lg text-gray-600">Discover traditional flavors and street food.</p>
        </header>

        {/* Filter Controls */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="text"
            placeholder="Search antojitos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none sm:max-w-md"
          />
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Responsive CSS Grid (Issue #3) */}
        {filteredAntojitos.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAntojitos.map((antojito) => (
              <AntojitoCard key={antojito.id} antojito={antojito} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-gray-500">
            No antojitos found matching your criteria.
          </div>
        )}

      </div>
    </main>
  );
}