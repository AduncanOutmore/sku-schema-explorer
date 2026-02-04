'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Wrench,
  GitBranch,
  Layers,
  Palette,
  BookOpen,
  Database,
  Search,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'SKU Builder', href: '/builder', icon: Wrench },
  { name: 'Hierarchy', href: '/hierarchy', icon: GitBranch },
  { name: 'BOM Explorer', href: '/bom', icon: Layers },
  { name: 'Fabrics', href: '/fabrics', icon: Palette },
  { name: 'Glossary', href: '/glossary', icon: BookOpen },
  { name: 'Katana Guide', href: '/katana', icon: Database },
  { name: 'Search', href: '/search', icon: Search },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200
          transform transition-transform duration-200 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 lg:hidden">
          <span className="font-semibold text-gray-900">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Desktop logo */}
        <div className="hidden lg:flex items-center h-16 px-4 border-b border-gray-200">
          <span className="text-sm font-medium text-gray-500">SKU Schema Explorer</span>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => onClose()}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-colors duration-150
                  ${active
                    ? 'bg-sku-finished text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            <p className="font-medium text-gray-700">Outmore Living</p>
            <p>Premium Heated Outdoor Furniture</p>
            <p className="mt-2">Solerno Collection</p>
          </div>
        </div>
      </aside>
    </>
  );
}
