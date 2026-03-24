import Link from 'next/link';

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-5 hidden md:block">
      <h2 className="text-xl font-bold mb-6">Compressor</h2>

      <nav className="space-y-3 text-sm flex flex-col gap-3">
        <Link
          href="/"
          className="text-gray-600 hover:text-black cursor-pointer"
        >
          Dashboard
        </Link>
        <Link
          href="/files"
          className="text-gray-600 hover:text-black cursor-pointer"
        >
          Files
        </Link>
        <Link
          href="/settings"
          className="text-gray-600 hover:text-black cursor-pointer"
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
}