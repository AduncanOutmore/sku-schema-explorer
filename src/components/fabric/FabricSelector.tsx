'use client';

import { useState } from 'react';
import { FABRIC_COLORS, PATTERN_NAMES, getFabricsByPattern } from '@/data/fabrics';
import { FabricColor } from '@/types/product';
import { CopyButton } from '@/components/shared/CopyButton';
import Link from 'next/link';

interface FabricSwatchProps {
  fabric: FabricColor;
  isSelected: boolean;
  onClick: () => void;
}

function FabricSwatch({ fabric, isSelected, onClick }: FabricSwatchProps) {
  // Determine if text should be light or dark based on background
  const isLightColor = fabric.hexColor.toLowerCase() === '#fafafa' ||
    fabric.hexColor.toLowerCase() === '#cfd8dc' ||
    fabric.hexColor.toLowerCase() === '#d7ccc8' ||
    fabric.hexColor.toLowerCase() === '#a5d6a7' ||
    fabric.hexColor.toLowerCase() === '#b3e5fc' ||
    fabric.hexColor.toLowerCase() === '#c4b9a8';

  return (
    <button
      onClick={onClick}
      className={`
        relative rounded-xl overflow-hidden transition-all
        ${isSelected
          ? 'ring-2 ring-sku-finished ring-offset-2 scale-105'
          : 'hover:scale-102 hover:shadow-md'
        }
      `}
    >
      <div
        className="aspect-square flex items-end justify-start p-3"
        style={{ backgroundColor: fabric.hexColor }}
      >
        <div
          className={`text-left ${isLightColor ? 'text-gray-800' : 'text-white'}`}
        >
          <p className="font-semibold text-sm">{fabric.name}</p>
          <p className="text-xs opacity-80">{fabric.code}</p>
        </div>
      </div>
    </button>
  );
}

export function FabricSelector() {
  const [selectedFabric, setSelectedFabric] = useState<FabricColor | null>(null);
  const fabricsByPattern = getFabricsByPattern();

  return (
    <div className="space-y-6">
      {/* Grid of all fabrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {FABRIC_COLORS.map(fabric => (
          <FabricSwatch
            key={fabric.code}
            fabric={fabric}
            isSelected={selectedFabric?.code === fabric.code}
            onClick={() => setSelectedFabric(
              selectedFabric?.code === fabric.code ? null : fabric
            )}
          />
        ))}
      </div>

      {/* Selected fabric details */}
      {selectedFabric && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            {/* Color preview */}
            <div
              className="w-full sm:w-48 h-32 sm:h-auto"
              style={{ backgroundColor: selectedFabric.hexColor }}
            />

            {/* Details */}
            <div className="flex-1 p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedFabric.name}
                  </h3>
                  <p className="text-gray-600">{selectedFabric.fullName}</p>
                </div>
                <button
                  onClick={() => setSelectedFabric(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  &times;
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Code</p>
                  <div className="flex items-center gap-1">
                    <code className="font-mono font-semibold">{selectedFabric.code}</code>
                    <CopyButton text={selectedFabric.code} size="sm" />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Pattern</p>
                  <p className="font-medium">
                    {PATTERN_NAMES[selectedFabric.pattern]} ({selectedFabric.pattern})
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Hex Color</p>
                  <div className="flex items-center gap-1">
                    <code className="font-mono text-sm">{selectedFabric.hexColor}</code>
                    <CopyButton text={selectedFabric.hexColor} size="sm" />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Fabric SKU</p>
                  <div className="flex items-center gap-1">
                    <code className="font-mono text-sm">{selectedFabric.sku}</code>
                    <CopyButton text={selectedFabric.sku} size="sm" />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/search?fabric=${selectedFabric.code}`}
                  className="px-4 py-2 bg-sku-finished text-white text-sm rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  View Products in {selectedFabric.name}
                </Link>
                <Link
                  href={`/bom/CSH-LS-SEAT-${selectedFabric.code}`}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
                >
                  View Sample BOM
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fabrics by pattern */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Fabrics by Pattern</h2>
        {Object.entries(fabricsByPattern).map(([pattern, fabrics]) => (
          <div key={pattern} className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="font-medium text-gray-900 mb-3">
              {PATTERN_NAMES[pattern] || pattern}
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({fabrics.length} colors)
              </span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {fabrics.map(fabric => (
                <button
                  key={fabric.code}
                  onClick={() => setSelectedFabric(fabric)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <span
                    className="w-6 h-6 rounded-full border border-gray-200"
                    style={{ backgroundColor: fabric.hexColor }}
                  />
                  <span className="text-sm">
                    {fabric.name}
                    <span className="text-gray-400 ml-1">({fabric.code})</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
