import { Layers } from 'lucide-react';
import { BomExploder } from '@/components/bom/BomExploder';

export default function BomPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
            <Layers className="w-6 h-6 text-sku-cushion" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              BOM Explorer
            </h1>
            <p className="text-gray-600">
              Drill into the complete bill of materials for any product.
              See the full component hierarchy from finished goods down to raw materials.
            </p>
          </div>
        </div>
      </div>

      {/* BOM Exploder */}
      <BomExploder />

      {/* Tips */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
        <h2 className="font-medium text-amber-900 mb-3">Reading the BOM</h2>
        <div className="space-y-2 text-sm text-amber-800">
          <p>
            <strong>Click</strong> any item with children to expand/collapse its components.
          </p>
          <p>
            <strong>Color dots</strong> indicate category: Blue for finished goods,
            green for cushions, pale blue for cores, light green for shells, etc.
          </p>
          <p>
            <strong>Quantities</strong> show how many of each component are needed
            (in units: ea, lb, sqft).
          </p>
          <p>
            <strong>Depth</strong> shows the number of assembly levels.
            A 4-level BOM goes: Finished Good → Cushion → Shell → Fabric.
          </p>
        </div>
      </div>
    </div>
  );
}
