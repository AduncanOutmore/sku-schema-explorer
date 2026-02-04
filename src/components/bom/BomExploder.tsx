'use client';

import { useState, useMemo } from 'react';
import { Search, Layers } from 'lucide-react';
import { BomTree } from './BomTree';
import { buildBomTree, getBomDepth, countBomItems } from '@/data/bom';
import { getProductsWithBom, searchProducts } from '@/data/products';
import { CATEGORY_COLORS, CATEGORY_NAMES } from '@/types/product';

interface BomExploderProps {
  initialSku?: string;
}

export function BomExploder({ initialSku }: BomExploderProps) {
  const [selectedSku, setSelectedSku] = useState<string>(initialSku || '');
  const [searchQuery, setSearchQuery] = useState('');

  // Get products with BOMs
  const productsWithBom = useMemo(() => getProductsWithBom(), []);

  // Filter products by search
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      // Show a subset by default
      return productsWithBom.slice(0, 50);
    }
    const query = searchQuery.toLowerCase();
    return productsWithBom.filter(
      p =>
        p.sku.toLowerCase().includes(query) ||
        p.name.toLowerCase().includes(query)
    ).slice(0, 50);
  }, [productsWithBom, searchQuery]);

  // Build BOM tree for selected SKU
  const bomTree = useMemo(() => {
    if (!selectedSku) return null;
    try {
      return buildBomTree(selectedSku);
    } catch (err) {
      console.error('Error building BOM tree:', err);
      return null;
    }
  }, [selectedSku]);

  // BOM stats
  const bomStats = useMemo(() => {
    if (!bomTree) return null;
    return {
      depth: getBomDepth(bomTree),
      items: countBomItems(bomTree),
    };
  }, [bomTree]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Selector */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">Select Product</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sku-finished focus:border-transparent"
                />
              </div>
            </div>

            <div className="max-h-[400px] overflow-auto">
              {filteredProducts.map(product => (
                <button
                  key={product.sku}
                  onClick={() => setSelectedSku(product.sku)}
                  className={`
                    w-full text-left px-4 py-3 border-b border-gray-100
                    hover:bg-gray-50 transition-colors
                    ${selectedSku === product.sku ? 'bg-blue-50' : ''}
                  `}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: CATEGORY_COLORS[product.category] }}
                    />
                    <code className="text-xs font-mono font-medium text-gray-800">
                      {product.sku}
                    </code>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {product.name}
                  </p>
                </button>
              ))}

              {filteredProducts.length === 0 && (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No products found
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BOM Tree */}
        <div className="lg:col-span-2">
          {selectedSku && bomTree ? (
            <div className="space-y-4">
              {/* Stats */}
              <div className="flex gap-4">
                <div className="bg-white rounded-lg border border-gray-200 px-4 py-3">
                  <p className="text-xs text-gray-500">BOM Depth</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {bomStats?.depth || 0} levels
                  </p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 px-4 py-3">
                  <p className="text-xs text-gray-500">Total Items</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {bomStats?.items || 0}
                  </p>
                </div>
              </div>

              {/* Tree */}
              <BomTree root={bomTree} />
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <Layers className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Select a Product
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Choose a product from the list to view its complete bill of materials.
                The BOM shows all components and materials needed to build the product.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
