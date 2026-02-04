'use client';

import { useState } from 'react';
import { GitBranch, ChevronDown } from 'lucide-react';
import { MermaidDiagram } from '@/components/hierarchy/MermaidDiagram';
import { CategoryCard } from '@/components/hierarchy/CategoryCard';
import {
  MAIN_HIERARCHY_DIAGRAM,
  CUSHION_BOM_DIAGRAM,
  PART_NUMBER_RANGES_DIAGRAM,
  SKU_PATTERN_DIAGRAM,
} from '@/data/mermaid-diagrams';
import { ProductCategory, CATEGORY_COLORS, CATEGORY_NAMES } from '@/types/product';

const diagrams = [
  { id: 'main-hierarchy', name: 'Product Hierarchy', chart: MAIN_HIERARCHY_DIAGRAM },
  { id: 'cushion-bom', name: 'Cushion BOM', chart: CUSHION_BOM_DIAGRAM },
  { id: 'part-number-ranges', name: 'Part Number Ranges', chart: PART_NUMBER_RANGES_DIAGRAM },
  { id: 'sku-patterns', name: 'SKU Patterns', chart: SKU_PATTERN_DIAGRAM },
];

const categories: ProductCategory[] = [
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

export default function HierarchyPage() {
  const [selectedDiagram, setSelectedDiagram] = useState(diagrams[0]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
            <GitBranch className="w-6 h-6 text-sku-frame" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Product Hierarchy
            </h1>
            <p className="text-gray-600">
              Visual representation of how Outmore Living products are structured.
              Finished goods break down into frames, cushions, and heat tech.
              Cushions further decompose into shells and core inserts.
            </p>
          </div>
        </div>
      </div>

      {/* Color Legend */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h2 className="text-sm font-medium text-gray-700 mb-3">Color Legend</h2>
        <div className="flex flex-wrap gap-4">
          {categories.slice(0, 7).map(category => (
            <div key={category} className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded"
                style={{ backgroundColor: CATEGORY_COLORS[category] }}
              />
              <span className="text-sm text-gray-600">{CATEGORY_NAMES[category]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Diagram Selector and Viewer */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Diagram tabs */}
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {diagrams.map(diagram => (
            <button
              key={diagram.id}
              onClick={() => setSelectedDiagram(diagram)}
              className={`
                px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
                ${selectedDiagram.id === diagram.id
                  ? 'border-sku-finished text-sku-finished'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                }
              `}
            >
              {diagram.name}
            </button>
          ))}
        </div>

        {/* Diagram content */}
        <div className="p-4">
          <MermaidDiagram
            chart={selectedDiagram.chart}
            id={`mermaid-${selectedDiagram.id}`}
          />
        </div>
      </div>

      {/* Category Cards */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(category => (
            <CategoryCard key={category} category={category} />
          ))}
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
        <h2 className="font-medium text-amber-900 mb-3">Understanding the Hierarchy</h2>
        <div className="space-y-3 text-sm text-amber-800">
          <p>
            <strong>Finished Goods</strong> are the top level - complete furniture pieces
            configured and sold to customers. They&apos;re assembled on-demand (Make-to-Order).
          </p>
          <p>
            <strong>Cushions</strong> are the key subassembly - each contains a Shell
            (fabric cover) and a Core Insert (heated interior). Shells are sellable
            as replacements; cores are internal-only.
          </p>
          <p>
            <strong>Frames</strong> vary by use: some are subassemblies of heated seating,
            others (tables, non-heated ottoman) are sold directly as products.
          </p>
          <p>
            <strong>Part numbers</strong> indicate category: 10000s for finished goods,
            30000s for frames, 40000s for cushions/cores, 50000s for shells.
          </p>
        </div>
      </div>
    </div>
  );
}
