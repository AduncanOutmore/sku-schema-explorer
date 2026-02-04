'use client';

import { useState } from 'react';
import { Wrench, Lightbulb, ArrowRight } from 'lucide-react';
import { SkuDecoder } from '@/components/sku-builder/SkuDecoder';
import { SkuBuilder } from '@/components/sku-builder/SkuBuilder';
import Link from 'next/link';

type Mode = 'decoder' | 'builder';

export default function BuilderPage() {
  const [mode, setMode] = useState<Mode>('decoder');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-hot-embers/10 flex items-center justify-center flex-shrink-0">
            <Wrench className="w-6 h-6 text-hot-embers" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-jet mb-2">
              SKU Builder & Decoder
            </h1>
            <p className="text-muted">
              Decode any existing SKU to understand its components, or build a new SKU
              by selecting options step by step.
            </p>
          </div>
        </div>
      </div>

      {/* Mode toggle */}
      <div className="flex bg-sand rounded-lg p-1 w-fit">
        <button
          onClick={() => setMode('decoder')}
          className={`
            px-4 py-2 text-sm font-display font-medium rounded-md transition-colors
            ${mode === 'decoder'
              ? 'bg-white text-jet shadow'
              : 'text-muted hover:text-jet'
            }
          `}
        >
          Decode SKU
        </button>
        <button
          onClick={() => setMode('builder')}
          className={`
            px-4 py-2 text-sm font-display font-medium rounded-md transition-colors
            ${mode === 'builder'
              ? 'bg-white text-jet shadow'
              : 'text-muted hover:text-jet'
            }
          `}
        >
          Build SKU
        </button>
      </div>

      {/* Content */}
      <div className="card p-6">
        {mode === 'decoder' ? (
          <div>
            <h2 className="text-lg font-display font-semibold text-jet mb-4">
              Decode an Existing SKU
            </h2>
            <p className="text-muted mb-6">
              Enter any Outmore Living SKU to see a breakdown of each segment with
              meanings and validation.
            </p>
            <SkuDecoder />
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-display font-semibold text-jet mb-4">
              Build a New SKU
            </h2>
            <p className="text-muted mb-6">
              Select a category and configure options to generate a valid SKU.
              This helps you understand the structure of Outmore Living SKUs.
            </p>
            <SkuBuilder />
          </div>
        )}
      </div>

      {/* SKU Pattern Reference */}
      <div className="card p-6 bg-jet text-white">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-hot-embers" />
          <h2 className="font-display font-semibold">SKU Pattern Reference</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="font-display font-medium text-white mb-1">Finished Goods</p>
            <code className="text-hot-embers bg-white/10 px-2 py-1 rounded text-xs">
              SOL-[PRODUCT]-[FINISH]-[FABRIC]-[SET]
            </code>
            <p className="text-sand mt-2">Example: SOL-LCH-NTK-CBN-ST1</p>
          </div>
          <div>
            <p className="font-display font-medium text-white mb-1">Cushions</p>
            <code className="text-hot-embers bg-white/10 px-2 py-1 rounded text-xs">
              CSH-[SEATING]-[COMPONENT]-[FABRIC]
            </code>
            <p className="text-sand mt-2">Example: CSH-LS-SEAT-CBN</p>
          </div>
          <div>
            <p className="font-display font-medium text-white mb-1">Shells</p>
            <code className="text-hot-embers bg-white/10 px-2 py-1 rounded text-xs">
              SHL-[SEATING]-[COMPONENT]-[FABRIC]
            </code>
            <p className="text-sand mt-2">Example: SHL-LS-SEAT-CBN</p>
          </div>
          <div>
            <p className="font-display font-medium text-white mb-1">Core Inserts</p>
            <code className="text-hot-embers bg-white/10 px-2 py-1 rounded text-xs">
              COR-[SEATING]-[COMPONENT]
            </code>
            <p className="text-sand mt-2">Example: COR-LS-SEAT (no fabric!)</p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/guide" className="card p-4 hover:border-hot-embers/30 transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-medium text-jet group-hover:text-hot-embers transition-colors">
                Learn SKU Patterns
              </h3>
              <p className="text-sm text-muted">Guided tour of the complete SKU system</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted group-hover:text-hot-embers transition-colors" />
          </div>
        </Link>
        <Link href="/glossary" className="card p-4 hover:border-hot-embers/30 transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-medium text-jet group-hover:text-hot-embers transition-colors">
                Abbreviation Glossary
              </h3>
              <p className="text-sm text-muted">Look up any SKU segment meaning</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted group-hover:text-hot-embers transition-colors" />
          </div>
        </Link>
      </div>
    </div>
  );
}
