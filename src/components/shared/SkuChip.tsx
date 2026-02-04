import Link from 'next/link';
import { ProductCategory, CATEGORY_COLORS } from '@/types/product';

interface SkuChipProps {
  sku: string;
  category?: ProductCategory;
  linkTo?: 'bom' | 'search' | 'none';
  size?: 'sm' | 'md' | 'lg';
}

export function SkuChip({ sku, category, linkTo = 'bom', size = 'md' }: SkuChipProps) {
  const borderColor = category ? CATEGORY_COLORS[category] : '#6B7280';

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  const content = (
    <span
      className={`
        inline-flex items-center font-mono rounded-md
        bg-gray-50 border-l-4
        ${sizeClasses[size]}
        ${linkTo !== 'none' ? 'hover:bg-gray-100 cursor-pointer' : ''}
      `}
      style={{ borderLeftColor: borderColor }}
    >
      {sku}
    </span>
  );

  if (linkTo === 'none') {
    return content;
  }

  const href = linkTo === 'bom'
    ? `/bom/${encodeURIComponent(sku)}`
    : `/search?q=${encodeURIComponent(sku)}`;

  return (
    <Link href={href} className="inline-block">
      {content}
    </Link>
  );
}

// Simpler inline SKU display without link
export function SkuText({ sku, className = '' }: { sku: string; className?: string }) {
  return (
    <code className={`font-mono text-sm bg-gray-100 px-1.5 py-0.5 rounded ${className}`}>
      {sku}
    </code>
  );
}
