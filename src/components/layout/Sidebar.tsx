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
  Map,
  Settings,
  Table,
  Download,
  CheckSquare,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Guided Tour', href: '/guide', icon: Map },
  { name: 'SKU Builder', href: '/builder', icon: Wrench },
  { name: 'SKU Configurator', href: '/configurator', icon: Settings },
  { name: 'Hierarchy', href: '/hierarchy', icon: GitBranch },
  { name: 'BOM Explorer', href: '/bom', icon: Layers },
  { name: 'Fabrics', href: '/fabrics', icon: Palette },
  { name: 'Glossary', href: '/glossary', icon: BookOpen },
  { name: 'Master Data', href: '/master', icon: Table },
  { name: 'Katana Guide', href: '/katana', icon: Database },
  { name: 'Katana Checklist', href: '/katana-checklist', icon: CheckSquare },
  { name: 'Downloads', href: '/downloads', icon: Download },
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
          className="fixed inset-0 bg-jet/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-sand
          transform transition-transform duration-200 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-sand lg:hidden">
          <span className="font-display font-semibold text-jet">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-sand-light transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-jet" />
          </button>
        </div>

        {/* Desktop logo */}
        <div className="hidden lg:flex items-center h-16 px-4 border-b border-sand">
          <span className="font-display text-sm font-medium text-muted">SKU Schema Explorer</span>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-12rem)]">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => onClose()}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium
                  transition-all duration-150
                  ${active
                    ? 'bg-hot-embers text-white'
                    : 'text-jet hover:bg-sand-light hover:text-hot-embers'
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Legend */}
        <div className="absolute bottom-20 left-0 right-0 px-4">
          <div className="text-xs text-muted space-y-1">
            <p className="font-display font-semibold text-jet uppercase tracking-wider text-[10px] mb-2">Part # Ranges</p>
            <div className="grid grid-cols-2 gap-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-hot-embers"></span>
                10000s FG
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-jet"></span>
                30000s FR
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-jet-light"></span>
                40000s CSH
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-sand-light border border-sand"></span>
                50000s SHL
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-jet-lighter"></span>
                60000s COV
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-jet-lighter"></span>
                70000s HT
              </span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sand bg-sand-light">
          <div className="text-xs text-muted">
            <p className="font-display font-semibold text-jet">Outmore Living</p>
            <p>Premium Heated Outdoor Furniture</p>
          </div>
        </div>
      </aside>
    </>
  );
}
