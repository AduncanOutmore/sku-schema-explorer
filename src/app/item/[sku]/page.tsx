import {
  ArrowLeft,
  Package,
  Hash,
  Tag,
  Layers,
  ArrowRight,
  Box,
  Palette,
  Info,
} from 'lucide-react';
import Link from 'next/link';
import { getProductBySku, ALL_PRODUCTS } from '@/data/products';
import { CATEGORY_COLORS, CATEGORY_NAMES } from '@/types/product';
import { resolveBomForSku } from '@/data/bom/bom-resolver';
import { CopyButton } from '@/components/shared/CopyButton';

interface ItemDetailPageProps {
  params: { sku: string };
}

export default function ItemDetailPage({ params }: ItemDetailPageProps) {
  const sku = decodeURIComponent(params.sku);
  const product = getProductBySku(sku);
  const bomComponents = product?.hasBom ? resolveBomForSku(sku) : [];

  if (!product) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <Link
            href="/search"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Search
          </Link>
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-gray-900 mb-2">Product Not Found</h1>
            <p className="text-gray-500">
              No product matches SKU <code className="font-mono bg-gray-100 px-2 py-0.5 rounded">{sku}</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const categoryColor = CATEGORY_COLORS[product.category];
  const categoryName = CATEGORY_NAMES[product.category];

  const SELLABLE_LABELS: Record<string, { label: string; style: string }> = {
    'sellable': { label: 'Sellable', style: 'bg-green-50 text-green-700 border-green-200' },
    'internal-only': { label: 'Internal Only', style: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
    'kit-component': { label: 'Kit Component', style: 'bg-blue-50 text-blue-700 border-blue-200' },
  };

  const sellableInfo = SELLABLE_LABELS[product.sellable];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <Link
          href="/search"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Search
        </Link>

        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${categoryColor}15` }}
          >
            <Package
              className="w-6 h-6"
              style={{ color: categoryColor }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span
                className="px-2 py-0.5 text-xs font-medium rounded-full"
                style={{
                  backgroundColor: `${categoryColor}20`,
                  color: categoryColor,
                }}
              >
                {categoryName}
              </span>
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${sellableInfo.style}`}>
                {sellableInfo.label}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">
                <code className="font-mono">{product.sku}</code>
              </h1>
              <CopyButton text={product.sku} />
            </div>
            <p className="text-gray-600 text-lg">{product.name}</p>
            <p className="text-gray-500 text-sm mt-1">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Properties */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Info className="w-4 h-4 text-gray-400" />
            Product Properties
          </h2>
          <dl className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500 flex items-center gap-2">
                <Hash className="w-3.5 h-3.5" />
                Part Number
              </dt>
              <dd className="text-sm font-medium text-gray-900">
                {product.partNumber ? `#${product.partNumber}` : 'N/A'}
              </dd>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500 flex items-center gap-2">
                <Tag className="w-3.5 h-3.5" />
                Category
              </dt>
              <dd className="text-sm font-medium text-gray-900 flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: categoryColor }}
                />
                {categoryName}
              </dd>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500 flex items-center gap-2">
                <Box className="w-3.5 h-3.5" />
                Sellable Status
              </dt>
              <dd className="text-sm font-medium text-gray-900">
                {sellableInfo.label}
              </dd>
            </div>
            {product.collection && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <dt className="text-sm text-gray-500">Collection</dt>
                <dd className="text-sm font-medium text-gray-900 font-mono">{product.collection}</dd>
              </div>
            )}
            {product.productType && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <dt className="text-sm text-gray-500">Product Type</dt>
                <dd className="text-sm font-medium text-gray-900 font-mono">{product.productType}</dd>
              </div>
            )}
            {product.finish && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <dt className="text-sm text-gray-500">Finish</dt>
                <dd className="text-sm font-medium text-gray-900 font-mono">{product.finish}</dd>
              </div>
            )}
            {product.setType && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <dt className="text-sm text-gray-500">Set Type</dt>
                <dd className="text-sm font-medium text-gray-900 font-mono">{product.setType}</dd>
              </div>
            )}
            {product.componentType && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <dt className="text-sm text-gray-500">Component Type</dt>
                <dd className="text-sm font-medium text-gray-900 font-mono">{product.componentType}</dd>
              </div>
            )}
            {product.seatingType && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <dt className="text-sm text-gray-500">Seating Type</dt>
                <dd className="text-sm font-medium text-gray-900 font-mono">{product.seatingType}</dd>
              </div>
            )}
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">Subassembly</dt>
              <dd className="text-sm font-medium text-gray-900">
                {product.isSubassembly ? 'Yes' : 'No'}
              </dd>
            </div>
          </dl>
        </div>

        {/* Katana Integration */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-gray-400" />
            Katana Integration
          </h2>
          <dl className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">Item Type</dt>
              <dd className="text-sm font-medium text-gray-900">{product.katanaItemType}</dd>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">Usage</dt>
              <dd className="text-sm font-medium text-gray-900 capitalize">
                {product.katanaUsage.replace(/-/g, ' ')}
              </dd>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">Part Number Range</dt>
              <dd className="text-sm font-medium text-gray-900">
                {product.partNumberRange.start.toLocaleString()} &ndash; {product.partNumberRange.end.toLocaleString()}
              </dd>
            </div>
            <div className="flex justify-between items-start py-2 border-b border-gray-100">
              <dt className="text-sm text-gray-500">Range Description</dt>
              <dd className="text-sm font-medium text-gray-900 text-right">
                {product.partNumberRange.description}
              </dd>
            </div>
          </dl>

          {product.notes && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-700">Notes: </span>
                {product.notes}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Fabric Color (if applicable) */}
      {product.fabricColor && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Palette className="w-4 h-4 text-gray-400" />
            Fabric Color
          </h2>
          <div className="flex items-center gap-4">
            <span
              className="w-12 h-12 rounded-lg border border-gray-200 flex-shrink-0"
              style={{ backgroundColor: product.fabricColor.hexColor }}
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{product.fabricColor.fullName}</p>
              <p className="text-sm text-gray-500">
                Code: <code className="font-mono">{product.fabricColor.code}</code>
                {' | '}Pattern: <code className="font-mono">{product.fabricColor.pattern}</code>
              </p>
              <p className="text-sm text-gray-500">
                Fabric SKU: <code className="font-mono">{product.fabricColor.sku}</code>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* BOM Summary */}
      {product.hasBom && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-gray-400" />
              Bill of Materials
            </h2>
            <Link
              href={`/bom/${encodeURIComponent(product.sku)}`}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              View Full BOM <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-sm text-gray-500 mb-3">
            This product has <span className="font-medium text-gray-700">{bomComponents.length}</span> direct component{bomComponents.length !== 1 ? 's' : ''}.
          </p>
          <div className="divide-y divide-gray-100">
            {bomComponents.map((component, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <code className="font-mono text-sm text-gray-700">{component.componentSku}</code>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500 flex-shrink-0">
                  <span>{component.quantity} {component.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Generate static params for common SKUs
export async function generateStaticParams() {
  const commonSkus = [
    'SOL-LCH-NTK-CBN-ST1',
    'SOL-LCH-NTK-CBN-ST2',
    'SOL-LOV-NTK-CBN-ST1',
    'CSH-LS-SEAT-CBN',
    'FR-LS-LCH-NTK',
    'COR-LS-SEAT',
    'SHL-LS-SEAT-CBN',
    'HT-PB-G1R-151',
  ];

  return commonSkus.map(sku => ({ sku }));
}
