'use client';

import { useState, useMemo } from 'react';
import { Table, Search, Download, ExternalLink } from 'lucide-react';
import Link from 'next/link';

// Master data from CSV - comprehensive list
const MASTER_DATA = [
  // Frames
  { partNumber: '30001', sku: 'FR-SOL-LCH-NT', name: 'Solerno Lounge Chair Frame, Natural Teak', category: 'Frame', type: 'Product', use: 'Subassembly', sellable: false },
  { partNumber: '30002', sku: 'FR-SOL-LOV-NT', name: 'Solerno Loveseat Frame, Natural Teak', category: 'Frame', type: 'Product', use: 'Subassembly', sellable: false },
  { partNumber: '30003', sku: 'FR-SOL-SOF-NT', name: 'Solerno Sofa Frame, Natural Teak', category: 'Frame', type: 'Product', use: 'Subassembly', sellable: false },
  { partNumber: '30004', sku: 'FR-SOL-HOT-NT', name: 'Solerno Heated Ottoman Frame, Natural Teak', category: 'Frame', type: 'Product', use: 'Subassembly', sellable: false },
  { partNumber: '30005', sku: 'FR-SOL-OTM-NT', name: 'Solerno Ottoman Frame, Natural Teak', category: 'Frame', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '30006', sku: 'FR-SOL-CTB-NT', name: 'Solerno Coffee Table Frame, Natural Teak', category: 'Frame', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '30007', sku: 'FR-SOL-STB-NT', name: 'Solerno Side Table Frame, Natural Teak', category: 'Frame', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '30008', sku: 'FR-SOL-SVL-NT', name: 'Solerno Swivel Chair Frame, Natural Teak', category: 'Frame', type: 'Product', use: 'Subassembly', sellable: false },
  { partNumber: '30009', sku: 'FR-SOL-CHS-NT', name: 'Solerno Chaise Lounge Frame, Natural Teak', category: 'Frame', type: 'Product', use: 'Subassembly', sellable: false },
  { partNumber: '30010', sku: 'FR-SOL-DCH-NT', name: 'Solerno Dining Side Chair Frame, Natural Teak', category: 'Frame', type: 'Product', use: 'Subassembly', sellable: false },
  { partNumber: '30011', sku: 'FR-SOL-DAC-NT', name: 'Solerno Dining Arm Chair Frame, Natural Teak', category: 'Frame', type: 'Product', use: 'Subassembly', sellable: false },
  { partNumber: '30012', sku: 'FR-SOL-SDT-NT', name: 'Solerno Square Dining Table Frame, Natural Teak', category: 'Frame', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '30013', sku: 'FR-SOL-RDT-NT', name: 'Solerno Rectangle Dining Table Frame, Natural Teak', category: 'Frame', type: 'Product', use: 'Resale', sellable: true },

  // Heat Tech
  { partNumber: '70001', sku: 'HT-PB-G1R-151', name: 'Power Bar, Gen 1 Refresh, 151Wh', category: 'Heat Tech', type: 'Product', use: 'Kit', sellable: true },
  { partNumber: '70002', sku: 'HT-CHG-ADPT-90', name: 'Charging Adapter, 90W', category: 'Heat Tech', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '70003', sku: 'HT-MNT-G1', name: 'Mount, Gen 1', category: 'Heat Tech', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '70004', sku: 'HT-MNT-UNI', name: 'Mount, Universal', category: 'Heat Tech', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '70005', sku: 'HT-CHG-CRT-20', name: 'Charging Cart, 20 Devices', category: 'Heat Tech', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '70006', sku: 'HT-CHG-SPLT-2', name: 'Power Splitter, 2-Way', category: 'Heat Tech', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '70007', sku: 'HT-CHG-SPLT-3', name: 'Power Splitter, 3-Way', category: 'Heat Tech', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '70008', sku: 'HT-CHG-SPLT-4', name: 'Power Splitter, 4-Way', category: 'Heat Tech', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '70009', sku: 'HT-GPH-LS-SEAT-G1', name: 'Graphene Heating Element, LS Seat, Gen 1', category: 'Heat Tech', type: 'Material', use: 'Material', sellable: false },
  { partNumber: '70010', sku: 'HT-GPH-LS-BACK-G1', name: 'Graphene Heating Element, LS Back, Gen 1', category: 'Heat Tech', type: 'Material', use: 'Material', sellable: false },
  { partNumber: '70011', sku: 'HT-GPH-LS-PILB-G1', name: 'Graphene Heating Element, LS Pillow Back, Gen 1', category: 'Heat Tech', type: 'Material', use: 'Material', sellable: false },

  // Protective Covers
  { partNumber: '60001', sku: 'PRO-SOL-LCH', name: 'Protective Cover, Lounge Chair', category: 'Protective Cover', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '60002', sku: 'PRO-SOL-LOV', name: 'Protective Cover, Loveseat', category: 'Protective Cover', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '60003', sku: 'PRO-SOL-SOF', name: 'Protective Cover, Sofa', category: 'Protective Cover', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '60004', sku: 'PRO-SOL-HOT', name: 'Protective Cover, Heated Ottoman', category: 'Protective Cover', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '60005', sku: 'PRO-SOL-OTM', name: 'Protective Cover, Ottoman', category: 'Protective Cover', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '60006', sku: 'PRO-SOL-CTB', name: 'Protective Cover, Coffee Table', category: 'Protective Cover', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '60007', sku: 'PRO-SOL-STB', name: 'Protective Cover, Side Table', category: 'Protective Cover', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '60008', sku: 'PRO-SOL-SVL', name: 'Protective Cover, Swivel Chair', category: 'Protective Cover', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '60009', sku: 'PRO-SOL-CHS', name: 'Protective Cover, Chaise Lounge', category: 'Protective Cover', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '60010', sku: 'PRO-SOL-DCH', name: 'Protective Cover, Dining Side Chair', category: 'Protective Cover', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '60011', sku: 'PRO-SOL-DAC', name: 'Protective Cover, Dining Arm Chair', category: 'Protective Cover', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '60012', sku: 'PRO-SOL-SDT', name: 'Protective Cover, Square Dining Table', category: 'Protective Cover', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '60013', sku: 'PRO-SOL-RDT', name: 'Protective Cover, Rectangle Dining Table', category: 'Protective Cover', type: 'Product', use: 'Resale', sellable: true },

  // Accessories
  { partNumber: '80001', sku: 'ACC-THRW-ALO', name: 'Sunbrella Signature Throw, Aloe', category: 'Accessory', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '80002', sku: 'ACC-THRW-IND', name: 'Sunbrella Signature Throw, Indigo', category: 'Accessory', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '80003', sku: 'ACC-THRW-CBN', name: 'Sunbrella Signature Throw, Carbon', category: 'Accessory', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '80004', sku: 'ACC-THRW-DOV', name: 'Sunbrella Signature Throw, Dove', category: 'Accessory', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '80005', sku: 'ACC-THRW-CHR', name: 'Sunbrella Signature Throw, Charcoal', category: 'Accessory', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '80006', sku: 'ACC-THRW-SLT', name: 'Sunbrella Signature Throw, Salt', category: 'Accessory', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '80007', sku: 'ACC-CARE-TEAK', name: 'Teak Care Kit', category: 'Accessory', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '80008', sku: 'ACC-CARE-SUN', name: 'Sunbrella Care Kit', category: 'Accessory', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '80009', sku: 'SW-KIT-SM', name: 'Swatch Kit, Small', category: 'Accessory', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '80010', sku: 'SW-KIT-LG', name: 'Swatch Kit, Large', category: 'Accessory', type: 'Product', use: 'Resale', sellable: true },

  // Marketing
  { partNumber: '90001', sku: 'MKT-CAT-RES', name: 'Product Catalog, Residential', category: 'Marketing', type: 'Product', use: 'Resale', sellable: true },
  { partNumber: '90002', sku: 'MKT-CAT-HOS', name: 'Product Catalog, Hospitality', category: 'Marketing', type: 'Product', use: 'Resale', sellable: true },

  // Core Inserts
  { partNumber: '40501', sku: 'COR-LS-SEAT', name: 'Core Insert, Lounge Seating, Seat', category: 'Core Insert', type: 'Product', use: 'Contract-manufactured', sellable: false },
  { partNumber: '40502', sku: 'COR-LS-BACK', name: 'Core Insert, Lounge Seating, Back', category: 'Core Insert', type: 'Product', use: 'Contract-manufactured', sellable: false },
  { partNumber: '40503', sku: 'COR-LS-PILB', name: 'Core Insert, Lounge Seating, Pillow Back', category: 'Core Insert', type: 'Product', use: 'Contract-manufactured', sellable: false },
];

const CATEGORIES = ['All', 'Frame', 'Heat Tech', 'Protective Cover', 'Accessory', 'Marketing', 'Core Insert'];

export default function MasterDataPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredData = useMemo(() => {
    return MASTER_DATA.filter((item) => {
      const matchesSearch =
        searchQuery === '' ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.partNumber.includes(searchQuery);

      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="card-body">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-sand-light flex items-center justify-center flex-shrink-0">
              <Table className="w-6 h-6 text-hot-embers" />
            </div>
            <div className="flex-1">
              <h1 className="font-display text-2xl font-semibold text-jet mb-2">
                Katana Master Item List
              </h1>
              <p className="text-muted">
                Complete inventory of all {MASTER_DATA.length} SKUs configured in Katana MRP.
                Filter by category using the buttons below.
              </p>
            </div>
            <Link
              href="/downloads"
              className="btn btn-primary flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download CSV
            </Link>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="note">
        <strong>Complete Inventory:</strong> All SKUs configured in Katana MRP. This table shows the static item master - for generated finished goods with fabric variations, use the{' '}
        <Link href="/configurator" className="text-hot-embers hover:underline">SKU Configurator</Link>.
      </div>

      {/* Search and filters */}
      <div className="card">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search by SKU, name, or part number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-sand rounded-md bg-cream focus:outline-none focus:ring-2 focus:ring-hot-embers"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn text-xs py-1.5 px-3 ${
                  selectedCategory === cat
                    ? 'bg-hot-embers text-white border-hot-embers'
                    : ''
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted">
        Showing {filteredData.length} of {MASTER_DATA.length} items
      </p>

      {/* Data table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="w-20">Part #</th>
                <th className="w-44">SKU</th>
                <th>Name</th>
                <th className="w-32">Category</th>
                <th className="w-24">Type</th>
                <th className="w-32">Use</th>
                <th className="w-20">Sellable</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-8">
                    No matching items found.
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.partNumber}>
                    <td className="font-mono text-muted">{item.partNumber}</td>
                    <td className="sku font-mono font-semibold">{item.sku}</td>
                    <td>{item.name}</td>
                    <td>
                      <span className={`
                        inline-block px-2 py-0.5 rounded text-xs font-medium
                        ${item.category === 'Frame' ? 'bg-jet text-white' :
                          item.category === 'Heat Tech' ? 'bg-jet-lighter text-white' :
                          item.category === 'Protective Cover' ? 'bg-jet-lighter text-white' :
                          item.category === 'Accessory' ? 'bg-jet-light text-white' :
                          item.category === 'Core Insert' ? 'bg-sand text-jet' :
                          'bg-sand-light text-jet'}
                      `}>
                        {item.category}
                      </span>
                    </td>
                    <td>
                      <span className={`tag ${item.type === 'Product' ? 'tag-subassembly' : 'tag-material'}`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="text-sm text-muted">{item.use}</td>
                    <td className="text-center">
                      {item.sellable ? (
                        <span className="text-green-600">Yes</span>
                      ) : (
                        <span className="text-muted">No</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
