// Product category with color coding
export type ProductCategory =
  | 'finished-good'    // #2F5496 (Dark Blue)
  | 'frame'            // #5B9BD5 (Light Blue)
  | 'cushion'          // #70AD47 (Green)
  | 'core-insert'      // #9DC3E6 (Pale Blue)
  | 'shell'            // #A9D18E (Light Green)
  | 'heat-tech'        // #FFC000 (Yellow)
  | 'protective-cover' // #8E44AD (Purple)
  | 'accessory'        // #E67E22 (Orange)
  | 'material'         // #F4B183 (Light Orange)
  | 'marketing';       // #95A5A6 (Gray)

// Sellability status for Katana integration
export type SellableStatus = 'sellable' | 'internal-only' | 'kit-component';

// Item type for Katana MRP
export type KatanaItemType =
  | 'make-to-order'      // Finished goods (assembled on order)
  | 'subassembly'        // Cushions, frames for heated seating
  | 'contract-manufactured' // Shells, core inserts
  | 'kit'                // Power Bar (includes charger)
  | 'product-for-resale' // Tables, covers, accessories
  | 'raw-material';      // Fabrics, foam, hardware

// Fabric color definition with visual representation
export interface FabricColor {
  code: string;           // e.g., 'CBN'
  name: string;           // e.g., 'Carbon'
  fullName: string;       // e.g., 'Sunbrella Spectrum Carbon'
  hexColor: string;       // e.g., '#333333'
  pattern: string;        // e.g., 'SPTM' for Spectrum
  sku: string;            // e.g., 'FAB-SUN-SPTM-CBN'
}

// Part number range definition
export interface PartNumberRange {
  start: number;
  end: number;
  category: ProductCategory;
  description: string;
}

// Base product interface
export interface Product {
  sku: string;
  name: string;
  description: string;
  category: ProductCategory;
  partNumber: number | null;  // null for raw materials without specific part numbers
  partNumberRange: PartNumberRange;
  sellable: SellableStatus;
  katanaItemType: KatanaItemType;
  hasBom: boolean;
  isSubassembly: boolean;
  // Optional fields depending on category
  fabricColor?: FabricColor;
  collection?: string;         // e.g., 'SOL' for Solerno
  productType?: string;        // e.g., 'LCH' for Lounge Chair
  finish?: string;             // e.g., 'NTK' for Natural Teak
  setType?: string;            // e.g., 'ST1', 'ST2'
  componentType?: string;      // e.g., 'SEAT', 'BACK', 'PILB'
  seatingType?: string;        // e.g., 'LS' for Lounge Seating
  notes?: string;
}

// Category color mapping for UI
export const CATEGORY_COLORS: Record<ProductCategory, string> = {
  'finished-good': '#2F5496',
  'frame': '#5B9BD5',
  'cushion': '#70AD47',
  'core-insert': '#9DC3E6',
  'shell': '#A9D18E',
  'heat-tech': '#FFC000',
  'protective-cover': '#8E44AD',
  'accessory': '#E67E22',
  'material': '#F4B183',
  'marketing': '#95A5A6',
};

// Category display names
export const CATEGORY_NAMES: Record<ProductCategory, string> = {
  'finished-good': 'Finished Goods',
  'frame': 'Frames',
  'cushion': 'Cushions',
  'core-insert': 'Core Inserts',
  'shell': 'Shells',
  'heat-tech': 'Heat Tech',
  'protective-cover': 'Protective Covers',
  'accessory': 'Accessories',
  'material': 'Materials',
  'marketing': 'Marketing',
};

// Part number ranges
export const PART_NUMBER_RANGES: PartNumberRange[] = [
  { start: 10000, end: 19999, category: 'finished-good', description: 'Finished Goods (Make-to-Order)' },
  { start: 30000, end: 39999, category: 'frame', description: 'Frames' },
  { start: 40000, end: 40499, category: 'cushion', description: 'Cushions' },
  { start: 40500, end: 49999, category: 'core-insert', description: 'Core Inserts (Internal)' },
  { start: 50000, end: 59999, category: 'shell', description: 'Shells (Replacements)' },
  { start: 60000, end: 69999, category: 'protective-cover', description: 'Protective Covers' },
  { start: 70000, end: 79999, category: 'heat-tech', description: 'Heat Tech' },
  { start: 80000, end: 89999, category: 'accessory', description: 'Accessories' },
  { start: 90000, end: 99999, category: 'marketing', description: 'Marketing/Other' },
];

export function getPartNumberRange(category: ProductCategory): PartNumberRange {
  const range = PART_NUMBER_RANGES.find(r => r.category === category);
  if (!range) {
    return { start: 0, end: 0, category, description: 'Unknown' };
  }
  return range;
}

export function getCategoryFromPartNumber(partNumber: number): ProductCategory | null {
  const range = PART_NUMBER_RANGES.find(r => partNumber >= r.start && partNumber <= r.end);
  return range?.category || null;
}
