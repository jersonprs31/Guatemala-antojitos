import { createAntojito } from '@/app/lib/actions';
import { deleteAntojito } from '@/app/lib/actions';
import Link from 'next/link';

export default function CreateAntojitoPage() {
  return (
    <main className="max-w-3xl mx-auto p-8 text-slate-200">
      <h1 className="text-3xl font-bold text-white mb-6">Agregar Nuevo Antojito</h1>
      
      <form action={createAntojito} className="bg-slate-900 p-6 rounded-lg border border-slate-800 space-y-6 shadow-md">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Nombre</label>
            <input type="text" name="name" required className="w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-white outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Categoría</label>
            <select name="category" required className="w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-white outline-none focus:border-blue-500">
              <option value="Dulce">Dulce</option>
              <option value="Salado">Salado</option>
              <option value="Bebida">Bebida</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Región</label>
          <input type="text" name="region" required placeholder="Ej: Todo el país, Quetzaltenango..." className="w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-white outline-none focus:border-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Descripción</label>
          <textarea name="description" required rows={3} className="w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-white outline-none focus:border-blue-500"></textarea>
        </div>

        {/* Updated Image Input */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">URL de la Imagen</label>
          <input 
            type="url" 
            name="image_url" 
            required 
            placeholder="https://ejemplo.com/imagen.jpg" 
            className="w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-white outline-none focus:border-blue-500" 
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t border-slate-800">
          <Link href="/dashboard" className="px-4 py-2 text-slate-400 hover:text-white transition-colors">
            Cancelar
          </Link>
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-md font-medium transition-colors">
            Guardar Antojito
          </button>
        </div>
      </form>
    </main>
  );
}