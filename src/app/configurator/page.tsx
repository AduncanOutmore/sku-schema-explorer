'use client';

import { useState, useMemo } from 'react';
import { Settings, ChevronDown, Copy, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Product data with BOM configuration
const PRODUCT_DATA: Record<string, {
  name: string;
  frameSku: string;
  seats: number;
  hasDining: boolean;
  noBack?: boolean;
  frameDesc: string;
}> = {
  'LCH': { name: 'Lounge Chair', frameSku: 'FR-SOL-LCH-NTK', seats: 1, hasDining: false, frameDesc: 'Lounge Chair Frame' },
  'LOV': { name: 'Loveseat', frameSku: 'FR-SOL-LOV-NTK', seats: 2, hasDining: false, frameDesc: 'Loveseat Frame' },
  'SOF': { name: 'Sofa', frameSku: 'FR-SOL-SOF-NTK', seats: 3, hasDining: false, frameDesc: 'Sofa Frame' },
  'CHS': { name: 'Chaise Lounge', frameSku: 'FR-SOL-CHS-NTK', seats: 1, hasDining: false, frameDesc: 'Chaise Frame' },
  'SVL': { name: 'Swivel Chair', frameSku: 'FR-SOL-SVL-NTK', seats: 1, hasDining: false, frameDesc: 'Swivel Chair Frame' },
  'HOT': { name: 'Heated Ottoman', frameSku: 'FR-SOL-HOT-NTK', seats: 1, hasDining: false, noBack: true, frameDesc: 'Ottoman Frame' },
  'DAC': { name: 'Dining Arm Chair', frameSku: 'FR-SOL-DAC-NTK', seats: 1, hasDining: true, frameDesc: 'Dining Arm Chair Frame' },
  'DCH': { name: 'Dining Side Chair', frameSku: 'FR-SOL-DCH-NTK', seats: 1, hasDining: true, frameDesc: 'Dining Side Chair Frame' },
};

const FABRIC_DATA: Record<string, { pattern: string; name: string; hex: string }> = {
  'CBN': { pattern: 'SPTM', name: 'Carbon', hex: '#3d3d3d' },
  'IND': { pattern: 'SPTM', name: 'Indigo', hex: '#3f5277' },
  'DOV': { pattern: 'SPTM', name: 'Dove', hex: '#b5afa6' },
  'CHR': { pattern: 'HRTG', name: 'Charcoal', hex: '#4a4a4a' },
  'LEF': { pattern: 'HRTG', name: 'Leaf', hex: '#6b7c5a' },
  'SBL': { pattern: 'HRTG', name: 'Sable', hex: '#5c4d3c' },
  'SLT': { pattern: 'SAIL', name: 'Salt', hex: '#f5f5f0' },
  'SAH': { pattern: 'SAIL', name: 'Sahara', hex: '#d4c4a8' },
  'GUL': { pattern: 'SAIL', name: 'Seagull', hex: '#c8c8c0' },
  'BSQ': { pattern: 'CAST', name: 'Bisque', hex: '#e8dcc8' },
  'SEA': { pattern: 'CAST', name: 'Seaglass', hex: '#b8d4d0' },
  'SND': { pattern: 'CAST', name: 'Sand', hex: '#c9b99a' },
  'ALO': { pattern: 'BLIS', name: 'Aloe', hex: '#9cb89c' },
  'JAV': { pattern: 'CNVS', name: 'Java', hex: '#5c4033' },
  'DEW': { pattern: 'EXHL', name: 'Dewdrop', hex: '#c4d4dc' },
  'EMB': { pattern: 'EXHL', name: 'Ember', hex: '#c45c3c' },
};

// BOM Node component
interface BomNodeProps {
  sku: string;
  desc: string;
  cat: string;
  qty: string;
  children?: React.ReactNode;
  isHighlightQty?: boolean;
}

function BomNode({ sku, desc, cat, qty, children, isHighlightQty }: BomNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = !!children;

  return (
    <div className="bom-node">
      <div
        className="bom-node-header"
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        <span className={`bom-node-toggle ${!hasChildren ? 'invisible' : ''}`}>
          {isExpanded ? '▼' : '▶'}
        </span>
        <span className={`bom-node-sku ${cat}`}>{sku}</span>
        <span className="bom-node-desc font-body">{desc}</span>
        <span
          className={`bom-node-qty ${isHighlightQty ? 'bg-hot-embers text-white border-hot-embers' : ''}`}
        >
          {qty}
        </span>
      </div>
      {hasChildren && isExpanded && (
        <div className="bom-children">{children}</div>
      )}
    </div>
  );
}

function BomLeaf({ sku, desc, cat, qty, isHighlightQty }: Omit<BomNodeProps, 'children'>) {
  return (
    <div className="bom-node no-children">
      <div className="bom-node-header">
        <span className="bom-node-toggle invisible">▼</span>
        <span className={`bom-node-sku ${cat}`}>{sku}</span>
        <span className="bom-node-desc font-body">{desc}</span>
        <span
          className={`bom-node-qty ${isHighlightQty ? 'bg-hot-embers text-white border-hot-embers' : ''}`}
        >
          {qty}
        </span>
      </div>
    </div>
  );
}

export default function ConfiguratorPage() {
  const [product, setProduct] = useState('');
  const [finish, setFinish] = useState('NTK');
  const [back, setBack] = useState('ST1');
  const [fabric, setFabric] = useState('');
  const [copied, setCopied] = useState(false);

  const isValid = product && fabric;

  const { sku, description, bomHtml } = useMemo(() => {
    if (!isValid) return { sku: '', description: '', bomHtml: null };

    const pData = PRODUCT_DATA[product];
    const fData = FABRIC_DATA[fabric];
    const isOttoman = pData.noBack;
    const isDining = pData.hasDining;
    const seats = pData.seats;
    const seatingType = isDining ? 'DN' : 'LS';
    const backType = back === 'ST1' ? 'BACK' : 'PILB';

    // Build SKU
    let generatedSku = 'SOL-' + product + '-' + finish + '-' + fabric;
    if (!isOttoman) generatedSku += '-' + back;

    // Build description
    let desc = pData.name + ', ' + fData.name;
    if (!isOttoman) desc += ', ' + (back === 'ST1' ? 'Standard Back' : 'Pillow Back');

    // Build BOM JSX
    const bomContent = (
      <div className="bom-tree">
        <BomNode sku={generatedSku} desc={desc} cat="cat-finished" qty="×1">
          {/* Frame */}
          <BomLeaf sku={pData.frameSku} desc={pData.frameDesc} cat="cat-frame" qty="×1" />

          {/* Seat Cushions */}
          {!isOttoman ? (
            <>
              <BomNode
                sku={`CSH-${seatingType}-SEAT-${fabric}`}
                desc="Seat Cushion"
                cat="cat-cushion"
                qty={seats > 1 ? `×${seats}` : '×1'}
                isHighlightQty={seats > 1}
              >
                <BomNode
                  sku={`SHL-${seatingType}-SEAT-${fabric}`}
                  desc="Shell, Seat"
                  cat="cat-shell"
                  qty="×1"
                >
                  <BomLeaf sku={`FAB-SUN-${fData.pattern}-${fabric}`} desc="Fabric" cat="cat-material" qty="3 sqft" />
                  <BomLeaf sku="LBL-WVN-OM" desc="Woven Label" cat="cat-material" qty="×1" />
                  <BomLeaf sku="HW-GRM-4" desc="Snap Grommet #4" cat="cat-material" qty="×1" />
                </BomNode>
                <BomNode
                  sku={`COR-${seatingType}-SEAT`}
                  desc="Core Insert, Seat"
                  cat="cat-core"
                  qty="×1"
                >
                  <BomLeaf sku={`FOM-${seatingType}-SEAT`} desc="Foam, Seat" cat="cat-material" qty="×1" />
                  <BomLeaf sku={`HT-GPH-${seatingType}-SEAT-G1`} desc="Graphene Element" cat="cat-heattech" qty="×1" />
                  <BomLeaf sku="FIL-POLY" desc="Polyester Batting" cat="cat-material" qty="0.5 lb" />
                  <BomLeaf sku="FAB-BAR-WPB" desc="Waterproof Barrier" cat="cat-material" qty="2 sqft" />
                  <BomLeaf sku="HW-CRDG" desc="Cord Grip" cat="cat-material" qty="×2" isHighlightQty />
                  <BomLeaf sku="HW-CRDN" desc="Cord Grip Nut" cat="cat-material" qty="×2" isHighlightQty />
                </BomNode>
              </BomNode>

              {/* Back Cushions */}
              <BomNode
                sku={`CSH-${seatingType}-${backType}-${fabric}`}
                desc={(back === 'ST1' ? 'Back' : 'Pillow Back') + ' Cushion'}
                cat="cat-cushion"
                qty={seats > 1 ? `×${seats}` : '×1'}
                isHighlightQty={seats > 1}
              >
                <BomNode
                  sku={`SHL-${seatingType}-${backType}-${fabric}`}
                  desc={`Shell, ${back === 'ST1' ? 'Back' : 'Pillow Back'}`}
                  cat="cat-shell"
                  qty="×1"
                >
                  <BomLeaf sku={`FAB-SUN-${fData.pattern}-${fabric}`} desc="Fabric" cat="cat-material" qty="2.5 sqft" />
                  <BomLeaf sku="LBL-WVN-OM" desc="Woven Label" cat="cat-material" qty="×1" />
                  <BomLeaf sku="HW-GRM-4" desc="Snap Grommet #4" cat="cat-material" qty="×1" />
                </BomNode>
                <BomNode
                  sku={`COR-${seatingType}-${backType}`}
                  desc={`Core Insert, ${back === 'ST1' ? 'Back' : 'Pillow Back'}`}
                  cat="cat-core"
                  qty="×1"
                >
                  <BomLeaf sku={`FOM-${seatingType}-${backType}`} desc="Foam" cat="cat-material" qty="×1" />
                  <BomLeaf sku={`HT-GPH-${seatingType}-${backType}-G1`} desc="Graphene Element" cat="cat-heattech" qty="×1" />
                  <BomLeaf sku="FIL-POLY" desc="Polyester Batting" cat="cat-material" qty="0.3 lb" />
                  <BomLeaf sku="HW-CRDG" desc="Cord Grip" cat="cat-material" qty="×1" />
                  <BomLeaf sku="HW-CRDN" desc="Cord Grip Nut" cat="cat-material" qty="×1" />
                </BomNode>
              </BomNode>
            </>
          ) : (
            /* Ottoman - seat only */
            <BomNode
              sku={`CSH-${seatingType}-SEAT-${fabric}`}
              desc="Ottoman Cushion"
              cat="cat-cushion"
              qty="×1"
            >
              <BomNode
                sku={`SHL-${seatingType}-SEAT-${fabric}`}
                desc="Shell"
                cat="cat-shell"
                qty="×1"
              >
                <BomLeaf sku={`FAB-SUN-${fData.pattern}-${fabric}`} desc="Fabric" cat="cat-material" qty="2 sqft" />
                <BomLeaf sku="HW-GRM-4" desc="Snap Grommet #4" cat="cat-material" qty="×1" />
              </BomNode>
              <BomNode
                sku={`COR-${seatingType}-SEAT`}
                desc="Core Insert"
                cat="cat-core"
                qty="×1"
              >
                <BomLeaf sku={`FOM-${seatingType}-SEAT`} desc="Foam" cat="cat-material" qty="×1" />
                <BomLeaf sku={`HT-GPH-${seatingType}-SEAT-G1`} desc="Graphene Element" cat="cat-heattech" qty="×1" />
                <BomLeaf sku="HW-CRDG" desc="Cord Grip" cat="cat-material" qty="×2" isHighlightQty />
                <BomLeaf sku="HW-CRDN" desc="Cord Grip Nut" cat="cat-material" qty="×2" isHighlightQty />
              </BomNode>
            </BomNode>
          )}

          {/* Power Bar Kit */}
          <BomNode
            sku="HT-PB-G1R-151"
            desc="Power Bar Kit"
            cat="cat-heattech"
            qty={seats > 1 ? `×${seats}` : '×1'}
            isHighlightQty={seats > 1}
          >
            <BomLeaf sku="HT-PB-UNIT-G1R" desc="Power Bar Unit" cat="cat-heattech" qty="×1" />
            <BomLeaf sku="HT-CHG-ADPT-90" desc="Charger, 90W" cat="cat-heattech" qty="×1" />
          </BomNode>
        </BomNode>
      </div>
    );

    return { sku: generatedSku, description: desc, bomHtml: bomContent };
  }, [product, finish, back, fabric, isValid]);

  const handleCopy = () => {
    navigator.clipboard.writeText(sku);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="card-body">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-hot-embers flex items-center justify-center flex-shrink-0">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-semibold text-jet mb-2">
                SKU Configurator
              </h1>
              <p className="text-muted">
                Build a finished goods SKU by selecting your options. See the complete Bill of Materials with quantities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Configurator Form */}
      <div className="card">
        <div className="card-body">
          <div className="note mb-6">
            <strong>Build Your SKU:</strong> Select your product options below to generate the finished goods SKU and see the complete Bill of Materials with quantities.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Furniture Piece */}
            <div>
              <label className="font-display text-xs font-semibold uppercase tracking-wider text-muted block mb-2">
                Furniture Piece
              </label>
              <div className="relative">
                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full appearance-none px-4 py-3 border border-sand rounded-md bg-white text-jet focus:outline-none focus:ring-2 focus:ring-hot-embers pr-10"
                >
                  <option value="">— Select —</option>
                  <option value="LCH">Lounge Chair</option>
                  <option value="LOV">Loveseat</option>
                  <option value="SOF">Sofa</option>
                  <option value="CHS">Chaise Lounge</option>
                  <option value="SVL">Swivel Chair</option>
                  <option value="HOT">Heated Ottoman</option>
                  <option value="DAC">Dining Arm Chair</option>
                  <option value="DCH">Dining Side Chair</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
              </div>
            </div>

            {/* Frame Finish */}
            <div>
              <label className="font-display text-xs font-semibold uppercase tracking-wider text-muted block mb-2">
                Frame Finish
              </label>
              <div className="relative">
                <select
                  value={finish}
                  onChange={(e) => setFinish(e.target.value)}
                  className="w-full appearance-none px-4 py-3 border border-sand rounded-md bg-white text-jet focus:outline-none focus:ring-2 focus:ring-hot-embers pr-10"
                >
                  <option value="NTK">Natural Teak</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
              </div>
            </div>

            {/* Back Style */}
            <div>
              <label className="font-display text-xs font-semibold uppercase tracking-wider text-muted block mb-2">
                Back Style
              </label>
              <div className="relative">
                <select
                  value={back}
                  onChange={(e) => setBack(e.target.value)}
                  disabled={Boolean(product && PRODUCT_DATA[product]?.noBack)}
                  className="w-full appearance-none px-4 py-3 border border-sand rounded-md bg-white text-jet focus:outline-none focus:ring-2 focus:ring-hot-embers pr-10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="ST1">Standard Back (Foam)</option>
                  <option value="ST2">Pillow Back</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
              </div>
            </div>

            {/* Fabric Color */}
            <div>
              <label className="font-display text-xs font-semibold uppercase tracking-wider text-muted block mb-2">
                Fabric Color
              </label>
              <div className="relative">
                <select
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
                  className="w-full appearance-none px-4 py-3 border border-sand rounded-md bg-white text-jet focus:outline-none focus:ring-2 focus:ring-hot-embers pr-10"
                >
                  <option value="">— Select —</option>
                  <optgroup label="Spectrum">
                    <option value="CBN">Carbon</option>
                    <option value="IND">Indigo</option>
                    <option value="DOV">Dove</option>
                  </optgroup>
                  <optgroup label="Heritage">
                    <option value="CHR">Charcoal</option>
                    <option value="LEF">Leaf</option>
                    <option value="SBL">Sable</option>
                  </optgroup>
                  <optgroup label="Sailcloth">
                    <option value="SLT">Salt</option>
                    <option value="SAH">Sahara</option>
                    <option value="GUL">Seagull</option>
                  </optgroup>
                  <optgroup label="Cast">
                    <option value="BSQ">Bisque</option>
                    <option value="SEA">Seaglass</option>
                    <option value="SND">Sand</option>
                  </optgroup>
                  <optgroup label="Other">
                    <option value="ALO">Aloe (Bliss)</option>
                    <option value="JAV">Java (Canvas)</option>
                    <option value="DEW">Dewdrop (Exhale)</option>
                    <option value="EMB">Ember (Exhale)</option>
                  </optgroup>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Fabric preview */}
          {fabric && (
            <div className="mt-4 flex items-center gap-3">
              <span
                className="w-8 h-8 rounded-md border border-sand"
                style={{ backgroundColor: FABRIC_DATA[fabric].hex }}
              />
              <span className="text-sm text-muted">
                {FABRIC_DATA[fabric].name} — Sunbrella {FABRIC_DATA[fabric].pattern === 'SPTM' ? 'Spectrum' :
                  FABRIC_DATA[fabric].pattern === 'HRTG' ? 'Heritage' :
                  FABRIC_DATA[fabric].pattern === 'SAIL' ? 'Sailcloth' :
                  FABRIC_DATA[fabric].pattern === 'CAST' ? 'Cast' :
                  FABRIC_DATA[fabric].pattern === 'BLIS' ? 'Bliss' :
                  FABRIC_DATA[fabric].pattern === 'CNVS' ? 'Canvas' : 'Exhale'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Result */}
      {isValid && (
        <>
          {/* Generated SKU */}
          <div className="bg-jet text-white rounded-lg p-6">
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-sand mb-4">
              Generated SKU
            </h3>
            <div className="flex items-center gap-4 flex-wrap">
              <code className="font-mono text-2xl font-semibold tracking-wider">
                {sku}
              </code>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-md text-sm transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
              <Link
                href={`/bom/${sku}`}
                className="flex items-center gap-2 px-3 py-1.5 bg-hot-embers hover:bg-hot-embers/90 rounded-md text-sm transition-colors"
              >
                View in BOM Explorer
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="text-sand mt-3">{description}</p>
          </div>

          {/* BOM Tree */}
          <div className="card">
            <div className="card-body">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted mb-4">
                Bill of Materials
              </h3>
              {bomHtml}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
