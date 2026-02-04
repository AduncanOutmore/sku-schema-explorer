'use client';

import { useState } from 'react';
import { Wrench } from 'lucide-react';
import { SkuDecoder } from '@/components/sku-builder/SkuDecoder';
import { SkuBuilder } from '@/components/sku-builder/SkuBuilder';

type Mode = 'decoder' | 'builder';

export default function BuilderPage() {
  const [mode, setMode] = useState<Mode>('decoder');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
            <Wrench className="w-6 h-6 text-sku-finished" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              SKU Builder & Decoder
            </h1>
            <p className="text-gray-600">
              Decode any existing SKU to understand its components, or build a new SKU
              by selecting options step by step.
            </p>
          </div>
        </div>
      </div>

      {/* Mode toggle */}
      <div className="flex bg-gray-100 rounded-lg p-1 w-fit">
        <button
          onClick={() => setMode('decoder')}
          className={`
            px-4 py-2 text-sm font-medium rounded-md transition-colors
            ${mode === 'decoder'
              ? 'bg-white text-gray-900 shadow'
              : 'text-gray-600 hover:text-gray-900'
            }
          `}
        >
          Decode SKU
        </button>
        <button
          onClick={() => setMode('builder')}
          className={`
            px-4 py-2 text-sm font-medium rounded-md transition-colors
            ${mode === 'builder'
              ? 'bg-white text-gray-900 shadow'
              : 'text-gray-600 hover:text-gray-900'
            }
          `}
        >
          Build SKU
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {mode === 'decoder' ? (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Decode an Existing SKU
            </h2>
            <p className="text-gray-600 mb-6">
              Enter any Outmore Living SKU to see a breakdown of each segment with
              meanings and validation.
            </p>
            <SkuDecoder />
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Build a New SKU
            </h2>
            <p className="text-gray-600 mb-6">
              Select a category and configure options to generate a valid SKU.
              This helps you understand the structure of Outmore Living SKUs.
            </p>
            <SkuBuilder />
          </div>
        )}
      </div>

      {/* SKU Pattern Reference */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
        <h2 className="font-medium text-amber-900 mb-3">SKU Pattern Reference</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-amber-800 mb-1">Finished Goods</p>
            <code className="text-amber-700">SOL-[PRODUCT]-[FINISH]-[FABRIC]-[SET]</code>
            <p className="text-amber-600 mt-1">Example: SOL-LCH-NTK-CBN-ST1</p>
          </div>
          <div>
            <p className="font-medium text-amber-800 mb-1">Cushions</p>
            <code className="text-amber-700">CSH-[SEATING]-[COMPONENT]-[FABRIC]</code>
            <p className="text-amber-600 mt-1">Example: CSH-LS-SEAT-CBN</p>
          </div>
          <div>
            <p className="font-medium text-amber-800 mb-1">Shells</p>
            <code className="text-amber-700">SHL-[SEATING]-[COMPONENT]-[FABRIC]</code>
            <p className="text-amber-600 mt-1">Example: SHL-LS-SEAT-CBN</p>
          </div>
          <div>
            <p className="font-medium text-amber-800 mb-1">Core Inserts</p>
            <code className="text-amber-700">COR-[SEATING]-[COMPONENT]</code>
            <p className="text-amber-600 mt-1">Example: COR-LS-SEAT (no fabric!)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
