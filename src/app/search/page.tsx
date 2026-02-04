'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search as SearchIcon, Filter, X, ArrowRight } from 'lucide-react';
import { ALL_PRODUCTS, getProductCounts } from '@/data/products';
import { FABRIC_COLORS } from '@/data/fabrics';
import {
  ProductCategory,
  CATEGORY_COLORS,
  CATEGORY_NAMES,
  SellableStatus,
} from '@/types/product';
import { CopyButton } from '@/components/shared/CopyButton';

const CATEGORIES: ProductCategory[] = [
  'finished-good',
  'frame',
  'cushion',
  'core-insert',
  'shell',
  'heat-tech',
  'protective-cover',
  'accessory',
  'material',
];

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialFabric = searchParams.get('fabric') || '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | ''>(
    initialCategory as ProductCategory | ''
  );
  const [selectedFabric, setSelectedFabric] = useState(initialFabric);
  const [selectedSellable, setSelectedSellable] = useState<SellableStatus | ''>('');
  const [showFilters, setShowFilters] = useState(
    !!(initialCategory || initialFabric)
  );

  // Filter products
  const filteredProducts = useMemo(() => {
    let products = ALL_PRODUCTS;

    // Text search
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      products = products.filter(
        p =>
          p.sku.toLowerCase().includes(lowerQuery) ||
          p.name.toLowerCase().includes(lowerQuery) ||
          p.description.toLowerCase().includes(lowerQuery)
      );
    }

    // Category filter
    if (selectedCategory) {
      products = products.filter(p => p.category === selectedCategory);
    }

    // Fabric filter
    if (selectedFabric) {
      products = products.filter(p => p.fabricColor?.code === selectedFabric);
    }

    // Sellable filter
    if (selectedSellable) {
      products = products.filter(p => p.sellable === selectedSellable);
    }

    return products;
  }, [query, selectedCategory, selectedFabric, selectedSellable]);

  const clearFilters = () => {
    setQuery('');
    setSelectedCategory('');
    setSelectedFabric('');
    setSelectedSellable('');
  };

  const hasFilters = query || selectedCategory || selectedFabric || selectedSellable;
  const productCounts = getProductCounts();

  return (
    <>
      {/* Search and filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search input */}
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by SKU, name, or description..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sku-finished focus:border-transparent"
            />
          </div>

          {/* Toggle filters button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`
              flex items-center gap-2 px-4 py-2 text-sm rounded-lg border transition-colors
              ${showFilters
                ? 'bg-sku-finished text-white border-sku-finished'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>

          {/* Clear button */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Category filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as ProductCategory | '')}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sku-finished"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>
                      {CATEGORY_NAMES[cat]} ({productCounts[cat]})
                    </option>
                  ))}
                </select>
              </div>

              {/* Fabric filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fabric Color
                </label>
                <select
                  value={selectedFabric}
                  onChange={(e) => setSelectedFabric(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sku-finished"
                >
                  <option value="">All Fabrics</option>
                  {FABRIC_COLORS.map(f => (
                    <option key={f.code} value={f.code}>
                      {f.name} ({f.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Sellable filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sellable Status
                </label>
                <select
                  value={selectedSellable}
                  onChange={(e) => setSelectedSellable(e.target.value as SellableStatus | '')}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sku-finished"
                >
                  <option value="">All</option>
                  <option value="sellable">Sellable</option>
                  <option value="internal-only">Internal Only</option>
                  <option value="kit-component">Kit Component</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500">
        Found {filteredProducts.length.toLocaleString()} products
      </p>

      {/* Results */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No products found matching your criteria.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredProducts.slice(0, 100).map(product => (
              <div
                key={product.sku}
                className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50"
              >
                {/* Category color */}
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: CATEGORY_COLORS[product.category] }}
                  title={CATEGORY_NAMES[product.category]}
                />

                {/* SKU and name */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-medium text-gray-900">
                      {product.sku}
                    </code>
                    <CopyButton text={product.sku} size="sm" />
                  </div>
                  <p className="text-sm text-gray-600 truncate">{product.name}</p>
                </div>

                {/* Part number */}
                {product.partNumber && (
                  <span className="text-sm text-gray-400 hidden sm:block">
                    #{product.partNumber}
                  </span>
                )}

                {/* Fabric swatch */}
                {product.fabricColor && (
                  <span
                    className="w-5 h-5 rounded-full border border-gray-200 flex-shrink-0"
                    style={{ backgroundColor: product.fabricColor.hexColor }}
                    title={product.fabricColor.name}
                  />
                )}

                {/* Actions */}
                {product.hasBom && (
                  <Link
                    href={`/bom/${product.sku}`}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    BOM <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Load more indicator */}
        {filteredProducts.length > 100 && (
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-center text-sm text-gray-500">
            Showing first 100 results. Refine your search to see more specific results.
          </div>
        )}
      </div>
    </>
  );
}

function SearchLoading() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">
      Loading search...
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
            <SearchIcon className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Product Search
            </h1>
            <p className="text-gray-600">
              Search and filter all {ALL_PRODUCTS.length.toLocaleString()} products
              in the Outmore Living catalog.
            </p>
          </div>
        </div>
      </div>

      <Suspense fallback={<SearchLoading />}>
        <SearchContent />
      </Suspense>
    </div>
  );
}
