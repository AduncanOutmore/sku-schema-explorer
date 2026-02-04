import { Layers, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { BomExploder } from '@/components/bom/BomExploder';
import { getProductBySku } from '@/data/products';
import { CATEGORY_COLORS, CATEGORY_NAMES } from '@/types/product';

interface BomSkuPageProps {
  params: { sku: string };
}

export default function BomSkuPage({ params }: BomSkuPageProps) {
  const sku = decodeURIComponent(params.sku);
  const product = getProductBySku(sku);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <Link
          href="/bom"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to BOM Explorer
        </Link>

        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: product
                ? `${CATEGORY_COLORS[product.category]}15`
                : '#f3f4f6'
            }}
          >
            <Layers
              className="w-6 h-6"
              style={{
                color: product
                  ? CATEGORY_COLORS[product.category]
                  : '#9ca3af'
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              {product && (
                <span
                  className="px-2 py-0.5 text-xs font-medium rounded-full"
                  style={{
                    backgroundColor: `${CATEGORY_COLORS[product.category]}20`,
                    color: CATEGORY_COLORS[product.category]
                  }}
                >
                  {CATEGORY_NAMES[product.category]}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              <code className="font-mono">{sku}</code>
            </h1>
            {product && (
              <p className="text-gray-600">{product.name}</p>
            )}
          </div>
        </div>
      </div>

      {/* BOM Exploder with initial SKU */}
      <BomExploder initialSku={sku} />
    </div>
  );
}

// Generate static params for common SKUs
export async function generateStaticParams() {
  const commonSkus = [
    'SOL-LCH-NTK-CBN-ST1',
    'SOL-LCH-NTK-CBN-ST2',
    'CSH-LS-SEAT-CBN',
    'CSH-LS-BACK-CBN',
    'CSH-LS-PILB-CBN',
    'COR-LS-SEAT',
    'SHL-LS-SEAT-CBN',
    'HT-PB-G1R-151',
  ];

  return commonSkus.map(sku => ({ sku }));
}
