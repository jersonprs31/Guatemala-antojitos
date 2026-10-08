"use client";

import { useState, useEffect } from 'react';

type Category = {
  id: number;
  name: string;
};

export default function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Consume the GET API Route
  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  // Consume the POST API Route
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName }),
      });

      if (res.ok) {
        const newCategory = await res.json();
        setCategories([...categories, newCategory]);
        setNewCategoryName('');
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  if (isLoading) return <div className="text-slate-400 mt-4">Loading categories...</div>;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-md mt-8">
      <h2 className="text-xl font-semibold text-white mb-4">Manage Categories</h2>
      
      <form onSubmit={handleAddCategory} className="flex gap-4 mb-6">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New category name..."
          className="flex-1 bg-slate-800 border border-slate-700 rounded-md p-2 text-white outline-none focus:border-blue-500"
        />
        <button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          Add Category
        </button>
      </form>

      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id} className="bg-slate-800 text-slate-200 px-4 py-2 rounded-md border border-slate-700">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}