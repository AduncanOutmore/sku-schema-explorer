'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

const routeLabels: Record<string, string> = {
  '': 'Dashboard',
  'builder': 'SKU Builder',
  'hierarchy': 'Product Hierarchy',
  'bom': 'BOM Explorer',
  'fabrics': 'Fabric Selector',
  'glossary': 'Glossary',
  'katana': 'Katana Guide',
  'search': 'Search',
};

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
  ];

  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const label = routeLabels[segment] || decodeURIComponent(segment);
    breadcrumbs.push({
      label,
      href: currentPath,
    });
  });

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center gap-1 text-sm text-gray-500 mb-4">
      {breadcrumbs.map((item, index) => (
        <span key={item.href} className="flex items-center gap-1">
          {index > 0 && <ChevronRight className="w-4 h-4" />}
          {index === breadcrumbs.length - 1 ? (
            <span className="font-medium text-gray-900">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              className="hover:text-sku-finished transition-colors"
            >
              {index === 0 ? (
                <Home className="w-4 h-4" />
              ) : (
                item.label
              )}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
