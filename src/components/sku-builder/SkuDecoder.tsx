'use client';

import { useState, useMemo } from 'react';
import { Search, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { lookupAbbreviation } from '@/data/glossary';
import { getProductBySku } from '@/data/products';
import { CATEGORY_COLORS, CATEGORY_NAMES, ProductCategory } from '@/types/product';
import { CopyButton } from '@/components/shared/CopyButton';

// SKU patterns with segment descriptions
const SKU_PATTERNS = [
  {
    pattern: /^SOL-([A-Z]{3})-([A-Z]{2,3})-([A-Z]{3})-ST([12])$/,
    category: 'finished-good' as ProductCategory,
    segments: ['Collection', 'Product Type', 'Finish', 'Fabric', 'Set Type'],
  },
  {
    pattern: /^FR-([A-Z]{3})-([A-Z]{3})-([A-Z]{2,3})$/,
    category: 'frame' as ProductCategory,
    segments: ['Prefix', 'Collection', 'Product Type', 'Finish'],
  },
  {
    pattern: /^CSH-([A-Z]{2})-([A-Z]{4})-([A-Z]{3})$/,
    category: 'cushion' as ProductCategory,
    segments: ['Prefix', 'Seating Type', 'Component', 'Fabric'],
  },
  {
    pattern: /^SHL-([A-Z]{2})-([A-Z]{4})-([A-Z]{3})$/,
    category: 'shell' as ProductCategory,
    segments: ['Prefix', 'Seating Type', 'Component', 'Fabric'],
  },
  {
    pattern: /^COR-([A-Z]{2})-([A-Z]{4})$/,
    category: 'core-insert' as ProductCategory,
    segments: ['Prefix', 'Seating Type', 'Component'],
  },
  {
    pattern: /^HT-([A-Z]{2,3})-(.+)$/,
    category: 'heat-tech' as ProductCategory,
    segments: ['Prefix', 'Type', 'Details'],
  },
  {
    pattern: /^PRO-([A-Z]{3})-([A-Z]{3})$/,
    category: 'protective-cover' as ProductCategory,
    segments: ['Prefix', 'Collection', 'Product Type'],
  },
  {
    pattern: /^ACC-([A-Z]{4})-([A-Z]{3,4})$/,
    category: 'accessory' as ProductCategory,
    segments: ['Prefix', 'Type', 'Variant'],
  },
];

interface DecodedSegment {
  code: string;
  meaning: string;
  segmentType: string;
}

export function SkuDecoder() {
  const [inputSku, setInputSku] = useState('');

  const decoded = useMemo(() => {
    if (!inputSku.trim()) {
      return null;
    }

    const sku = inputSku.toUpperCase().trim();
    const parts = sku.split('-');

    // Find matching pattern
    let matchedPattern = null;
    for (const p of SKU_PATTERNS) {
      if (p.pattern.test(sku)) {
        matchedPattern = p;
        break;
      }
    }

    // Decode each segment
    const segments: DecodedSegment[] = parts.map((part, index) => {
      const entry = lookupAbbreviation(part);
      let segmentType = 'Unknown';

      if (matchedPattern && index < matchedPattern.segments.length) {
        segmentType = matchedPattern.segments[index];
      }

      return {
        code: part,
        meaning: entry?.meaning || 'Unknown',
        segmentType,
      };
    });

    // Find product
    const product = getProductBySku(sku);

    return {
      sku,
      isValid: !!matchedPattern,
      category: matchedPattern?.category || null,
      segments,
      product,
      partNumber: product?.partNumber || null,
    };
  }, [inputSku]);

  return (
    <div className="space-y-4">
      {/* Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Enter a SKU to decode (e.g., SOL-LCH-NTK-CBN-ST1)"
          value={inputSku}
          onChange={(e) => setInputSku(e.target.value)}
          className="w-full pl-12 pr-4 py-4 text-lg font-mono border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sku-finished focus:border-transparent"
        />
      </div>

      {/* Decoded result */}
      {decoded && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Status header */}
          <div
            className={`flex items-center gap-3 px-5 py-3 ${
              decoded.isValid ? 'bg-green-50' : 'bg-amber-50'
            }`}
          >
            {decoded.isValid ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">Valid SKU</span>
                {decoded.category && (
                  <span
                    className="ml-auto px-2 py-0.5 text-xs font-medium rounded-full"
                    style={{
                      backgroundColor: `${CATEGORY_COLORS[decoded.category]}20`,
                      color: CATEGORY_COLORS[decoded.category],
                    }}
                  >
                    {CATEGORY_NAMES[decoded.category]}
                  </span>
                )}
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-amber-800">
                  Pattern not recognized (may still be valid)
                </span>
              </>
            )}
          </div>

          {/* Segments breakdown */}
          <div className="p-5">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Segment Breakdown</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {decoded.segments.map((segment, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <span className="text-gray-300 mx-1">-</span>}
                  <div className="bg-gray-100 rounded-lg px-3 py-2 text-center">
                    <code className="block font-mono font-semibold text-sku-finished">
                      {segment.code}
                    </code>
                    <span className="text-xs text-gray-500">{segment.segmentType}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Meanings table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium text-gray-700">Code</th>
                    <th className="text-left px-4 py-2 font-medium text-gray-700">Meaning</th>
                    <th className="text-left px-4 py-2 font-medium text-gray-700">Segment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {decoded.segments.map((segment, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2">
                        <code className="font-mono font-semibold">{segment.code}</code>
                      </td>
                      <td className="px-4 py-2 text-gray-600">{segment.meaning}</td>
                      <td className="px-4 py-2 text-gray-500">{segment.segmentType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Product info */}
            {decoded.product && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Product Found</h4>
                <p className="text-blue-800 mb-2">{decoded.product.name}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  {decoded.product.partNumber && (
                    <div>
                      <span className="text-blue-600">Part #:</span>
                      <span className="ml-1 font-mono">{decoded.product.partNumber}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-blue-600">Sellable:</span>
                    <span className="ml-1">{decoded.product.sellable}</span>
                  </div>
                  <div>
                    <span className="text-blue-600">Katana Type:</span>
                    <span className="ml-1">{decoded.product.katanaItemType}</span>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Link
                    href={`/bom/${decoded.sku}`}
                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                  >
                    View BOM <ArrowRight className="w-3 h-3" />
                  </Link>
                  <CopyButton text={decoded.sku} label="Copy SKU" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Example SKUs */}
      {!decoded && (
        <div className="text-sm text-gray-500">
          <p className="mb-2">Try these example SKUs:</p>
          <div className="flex flex-wrap gap-2">
            {['SOL-LCH-NTK-CBN-ST1', 'CSH-LS-SEAT-CBN', 'COR-LS-SEAT', 'HT-PB-G1R-151'].map(sku => (
              <button
                key={sku}
                onClick={() => setInputSku(sku)}
                className="font-mono text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
              >
                {sku}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
