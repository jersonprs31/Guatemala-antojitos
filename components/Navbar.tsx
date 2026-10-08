import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-500 hover:text-blue-400 transition-colors">
              🇬🇹 Guatemala Antojitos
            </Link>
          </div>
          <div>
            <Link 
              href="/login" 
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}