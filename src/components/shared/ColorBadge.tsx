import { ProductCategory, CATEGORY_COLORS, CATEGORY_NAMES } from '@/types/product';

interface ColorBadgeProps {
  category: ProductCategory;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function ColorBadge({ category, size = 'md', showLabel = false }: ColorBadgeProps) {
  const color = CATEGORY_COLORS[category];
  const name = CATEGORY_NAMES[category];

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className="flex items-center gap-2">
      <span
        className={`${sizeClasses[size]} rounded-full flex-shrink-0`}
        style={{ backgroundColor: color }}
        title={name}
      />
      {showLabel && (
        <span className="text-sm text-gray-600">{name}</span>
      )}
    </div>
  );
}

// Inline color dot for use in text
export function CategoryDot({ category }: { category: ProductCategory }) {
  const color = CATEGORY_COLORS[category];
  return (
    <span
      className="inline-block w-2 h-2 rounded-full mr-1"
      style={{ backgroundColor: color }}
    />
  );
}
