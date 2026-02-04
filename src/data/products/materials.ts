import { Product, getPartNumberRange } from '@/types/product';
import { FABRIC_COLORS } from '../fabrics';

// Raw materials and components used in manufacturing
export const MATERIALS: Product[] = [
  // Sunbrella Fabrics (generated from fabric colors)
  ...FABRIC_COLORS.map((fabric, index) => ({
    sku: fabric.sku,
    name: fabric.fullName,
    description: `Premium outdoor performance fabric - ${fabric.fullName}`,
    category: 'material' as const,
    partNumber: null,
    partNumberRange: getPartNumberRange('material'),
    sellable: 'internal-only' as const,
    katanaItemType: 'raw-material' as const,
    hasBom: false,
    isSubassembly: true,
    fabricColor: fabric,
    notes: 'Raw material. Used in shell manufacturing.',
  })),

  // Barrier Fabrics
  {
    sku: 'FAB-BAR-WPB',
    name: 'Barrier, Waterproof Black',
    description: 'Waterproof barrier fabric for core inserts',
    category: 'material',
    partNumber: null,
    partNumberRange: getPartNumberRange('material'),
    sellable: 'internal-only',
    katanaItemType: 'raw-material',
    hasBom: false,
    isSubassembly: true,
  },
  {
    sku: 'FAB-BAR-MSH',
    name: 'Barrier, Mesh',
    description: 'Mesh barrier fabric for core inserts',
    category: 'material',
    partNumber: null,
    partNumberRange: getPartNumberRange('material'),
    sellable: 'internal-only',
    katanaItemType: 'raw-material',
    hasBom: false,
    isSubassembly: true,
  },

  // Foam
  {
    sku: 'FOM-LS-SEAT',
    name: 'Foam, Lounge Seating Seat',
    description: 'High-density foam for lounge seating seat cushions',
    category: 'material',
    partNumber: null,
    partNumberRange: getPartNumberRange('material'),
    sellable: 'internal-only',
    katanaItemType: 'raw-material',
    hasBom: false,
    isSubassembly: true,
  },
  {
    sku: 'FOM-LS-BACK',
    name: 'Foam, Lounge Seating Back',
    description: 'High-density foam for lounge seating back cushions',
    category: 'material',
    partNumber: null,
    partNumberRange: getPartNumberRange('material'),
    sellable: 'internal-only',
    katanaItemType: 'raw-material',
    hasBom: false,
    isSubassembly: true,
  },
  {
    sku: 'FOM-LS-PILB',
    name: 'Foam, Lounge Seating Pillow Back',
    description: 'High-density foam for pillow back cushions',
    category: 'material',
    partNumber: null,
    partNumberRange: getPartNumberRange('material'),
    sellable: 'internal-only',
    katanaItemType: 'raw-material',
    hasBom: false,
    isSubassembly: true,
  },

  // Fill/Batting
  {
    sku: 'FIL-POLY',
    name: 'Polyester Batting',
    description: 'Polyester fill/batting for cushion inserts',
    category: 'material',
    partNumber: null,
    partNumberRange: getPartNumberRange('material'),
    sellable: 'internal-only',
    katanaItemType: 'raw-material',
    hasBom: false,
    isSubassembly: true,
  },

  // Hardware
  {
    sku: 'HW-GRM-4',
    name: 'Snap Grommet #4',
    description: 'Metal snap grommet for cushion connections',
    category: 'material',
    partNumber: null,
    partNumberRange: getPartNumberRange('material'),
    sellable: 'internal-only',
    katanaItemType: 'raw-material',
    hasBom: false,
    isSubassembly: true,
  },
  {
    sku: 'HW-CRDG',
    name: 'Cord Grip',
    description: 'Cord grip for heating element cable management',
    category: 'material',
    partNumber: null,
    partNumberRange: getPartNumberRange('material'),
    sellable: 'internal-only',
    katanaItemType: 'raw-material',
    hasBom: false,
    isSubassembly: true,
  },
  {
    sku: 'HW-CRDN',
    name: 'Cord Grip Nut',
    description: 'Nut for cord grip assembly',
    category: 'material',
    partNumber: null,
    partNumberRange: getPartNumberRange('material'),
    sellable: 'internal-only',
    katanaItemType: 'raw-material',
    hasBom: false,
    isSubassembly: true,
  },

  // Labels
  {
    sku: 'LBL-WVN-OM',
    name: 'Woven Label, Outmore',
    description: 'Woven fabric label with Outmore branding',
    category: 'material',
    partNumber: null,
    partNumberRange: getPartNumberRange('material'),
    sellable: 'internal-only',
    katanaItemType: 'raw-material',
    hasBom: false,
    isSubassembly: true,
  },

  // Power Bar internal unit
  {
    sku: 'HT-PB-G1R-151-UNIT',
    name: 'Power Bar Unit (internal)',
    description: 'Internal power bar unit component',
    category: 'material',
    partNumber: null,
    partNumberRange: getPartNumberRange('material'),
    sellable: 'internal-only',
    katanaItemType: 'raw-material',
    hasBom: false,
    isSubassembly: true,
    notes: 'Component of Power Bar Kit. Not sold separately.',
  },
];

export function getMaterialBySku(sku: string): Product | undefined {
  return MATERIALS.find(m => m.sku === sku);
}

export function getFabricMaterials(): Product[] {
  return MATERIALS.filter(m => m.sku.startsWith('FAB-SUN-'));
}

export function getHardwareMaterials(): Product[] {
  return MATERIALS.filter(m => m.sku.startsWith('HW-'));
}
