'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
}

export function Header({ onMenuClick, isSidebarOpen }: HeaderProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');

  const getPageTitle = () => {
    if (pathname === '/') return 'Dashboard';
    if (pathname === '/builder') return 'SKU Builder';
    if (pathname === '/hierarchy') return 'Product Hierarchy';
    if (pathname.startsWith('/bom')) return 'BOM Explorer';
    if (pathname === '/fabrics') return 'Fabric Selector';
    if (pathname === '/glossary') return 'Glossary';
    if (pathname === '/katana') return 'Katana Guide';
    if (pathname === '/search') return 'Search';
    return 'SKU Schema Explorer';
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
          >
            {isSidebarOpen ? (
              <X className="w-5 h-5 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600" />
            )}
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sku-finished flex items-center justify-center">
              <span className="text-white font-bold text-sm">OM</span>
            </div>
            <span className="font-semibold text-gray-900 hidden sm:block">
              Outmore Living
            </span>
          </Link>
          <span className="text-gray-300 hidden sm:block">|</span>
          <h1 className="text-lg font-medium text-gray-700 hidden sm:block">
            {getPageTitle()}
          </h1>
        </div>

        {/* Right side - Search */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search SKUs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
                }
              }}
              className="w-48 sm:w-64 pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sku-finished focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
