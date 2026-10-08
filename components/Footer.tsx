export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <p className="text-slate-400 text-sm text-center">
          &copy; {new Date().getFullYear()} Guatemala Antojitos. Discover the best flavors of our land.
        </p>
        <p className="text-slate-500 text-xs mt-2">
          WDD430 Project
        </p>
      </div>
    </footer>
  );
}