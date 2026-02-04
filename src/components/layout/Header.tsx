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
    if (pathname === '/guide') return 'Guided Tour';
    if (pathname.startsWith('/bom')) return 'BOM Explorer';
    if (pathname === '/fabrics') return 'Fabric Selector';
    if (pathname === '/glossary') return 'Glossary';
    if (pathname === '/katana') return 'Katana Guide';
    if (pathname === '/search') return 'Search';
    if (pathname === '/configurator') return 'SKU Configurator';
    if (pathname === '/master') return 'Master Data';
    if (pathname === '/downloads') return 'Downloads & Resources';
    return 'SKU Schema Explorer';
  };

  return (
    <header className="bg-white border-b-2 border-jet sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md hover:bg-sand-light lg:hidden transition-colors"
            aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
          >
            {isSidebarOpen ? (
              <X className="w-5 h-5 text-jet" />
            ) : (
              <Menu className="w-5 h-5 text-jet" />
            )}
          </button>
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-hot-embers flex items-center justify-center">
              <span className="text-white font-display font-semibold text-sm">OM</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-semibold text-jet text-lg tracking-tight">
                Outmore Living
              </span>
              <span className="text-muted text-sm ml-2">SKU Schema</span>
            </div>
          </Link>
        </div>

        {/* Right side - Search */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
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
              className="w-48 sm:w-64 pl-9 pr-4 py-2 text-sm border border-sand rounded-md bg-cream focus:outline-none focus:ring-2 focus:ring-hot-embers focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
