import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCategory, CATEGORY_COLORS, CATEGORY_NAMES, PART_NUMBER_RANGES } from '@/types/product';
import { getProductsByCategory } from '@/data/products';

interface CategoryCardProps {
  category: ProductCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const color = CATEGORY_COLORS[category];
  const name = CATEGORY_NAMES[category];
  const range = PART_NUMBER_RANGES.find(r => r.category === category);
  const products = getProductsByCategory(category);
  const count = products.length;

  // Get example SKUs (up to 3)
  const examples = products.slice(0, 3).map(p => p.sku);

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
      style={{ borderTopColor: color, borderTopWidth: '3px' }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900">{name}</h3>
            {range && (
              <p className="text-sm text-gray-500">
                Part #: {range.start.toLocaleString()}-{range.end.toLocaleString()}
              </p>
            )}
          </div>
          <span
            className="px-2 py-1 text-xs font-medium rounded-full"
            style={{ backgroundColor: `${color}20`, color }}
          >
            {count} items
          </span>
        </div>

        {/* Example SKUs */}
        <div className="space-y-1 mb-4">
          {examples.map(sku => (
            <code
              key={sku}
              className="block text-xs font-mono text-gray-600 truncate"
            >
              {sku}
            </code>
          ))}
          {count > 3 && (
            <span className="text-xs text-gray-400">
              +{count - 3} more...
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/search?category=${category}`}
            className="flex-1 text-center text-sm py-2 px-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            View All
          </Link>
          <Link
            href={`/bom?category=${category}`}
            className="flex items-center justify-center gap-1 text-sm py-2 px-3 rounded-lg text-white transition-colors"
            style={{ backgroundColor: color }}
          >
            BOM <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
