"use client";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 z-40 bg-white border-b border-gray-200 px-6 flex items-center justify-end shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src="/avatar.png"
          alt="Admin Avatar"
          className="w-10 h-10 rounded-full border border-gray-200"
        />
        <div className="text-right">
          <div className="text-sm font-semibold text-gray-800">
            Jaylon George
          </div>
          <div className="text-xs text-gray-500">Admin Yogyakarta</div>
        </div>
      </div>
    </header>
  );
}
