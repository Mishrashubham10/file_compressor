export function Header() {
  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between">
      <h1 className="font-semibold">Dashboard</h1>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">Welcome 👋</span>
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </div>
    </header>
  );
}