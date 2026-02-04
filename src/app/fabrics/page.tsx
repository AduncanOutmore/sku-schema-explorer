import { Palette } from 'lucide-react';
import { FabricSelector } from '@/components/fabric/FabricSelector';
import { FABRIC_COLORS } from '@/data/fabrics';

export default function FabricsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center flex-shrink-0">
            <Palette className="w-6 h-6 text-sku-heat" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Fabric Colors
            </h1>
            <p className="text-gray-600">
              Outmore Living offers {FABRIC_COLORS.length} Sunbrella fabric options
              across multiple patterns. Click any color to see details and find
              products available in that fabric.
            </p>
          </div>
        </div>
      </div>

      {/* Fabric info */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <h2 className="font-medium text-blue-900 mb-2">About Sunbrella Fabrics</h2>
        <p className="text-sm text-blue-800">
          All Outmore Living cushions use premium Sunbrella performance fabrics.
          These fabrics are designed for outdoor use with superior UV resistance,
          water repellency, and easy cleaning. Fabric codes appear in cushion,
          shell, and finished good SKUs.
        </p>
      </div>

      {/* Fabric Selector */}
      <FabricSelector />

      {/* SKU Pattern explanation */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="font-medium text-gray-900 mb-3">Fabric Codes in SKUs</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <p>
            The 3-letter fabric code appears at different positions depending on the SKU type:
          </p>
          <div className="font-mono bg-gray-50 p-3 rounded-lg space-y-1">
            <p>Finished Good: SOL-LCH-NTK-<span className="text-sku-finished font-bold">CBN</span>-ST1</p>
            <p>Cushion: CSH-LS-SEAT-<span className="text-sku-cushion font-bold">CBN</span></p>
            <p>Shell: SHL-LS-SEAT-<span className="text-sku-shell font-bold">CBN</span></p>
            <p>Fabric: FAB-SUN-SPTM-<span className="text-sku-material font-bold">CBN</span></p>
          </div>
          <p>
            <strong>Note:</strong> Core inserts (COR-*) do NOT have fabric codes because
            they are universal and work with any fabric color shell.
          </p>
        </div>
      </div>
    </div>
  );
}
