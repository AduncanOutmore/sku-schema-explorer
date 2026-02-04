import { Product, getPartNumberRange } from '@/types/product';

// Heat Tech products (70000s range)
export const HEAT_TECH: Product[] = [
  // Power Bars (Kits)
  {
    sku: 'HT-PB-G1R-151',
    name: 'Power Bar Kit, Gen 1 Refresh, 151Wh',
    description: 'Rechargeable power bar with 151Wh capacity, includes 90W charger',
    category: 'heat-tech',
    partNumber: 70001,
    partNumberRange: getPartNumberRange('heat-tech'),
    sellable: 'sellable',
    katanaItemType: 'kit',
    hasBom: true,
    isSubassembly: true,
    notes: 'Kit includes power bar unit and charger. Used as component in finished goods.',
  },

  // Chargers and Adapters
  {
    sku: 'HT-CHG-ADPT-90',
    name: 'Charging Adapter, 90W',
    description: '90W power adapter for charging power bars',
    category: 'heat-tech',
    partNumber: 70002,
    partNumberRange: getPartNumberRange('heat-tech'),
    sellable: 'sellable',
    katanaItemType: 'product-for-resale',
    hasBom: false,
    isSubassembly: true,
    notes: 'Included in Power Bar Kit. Also sold separately as replacement.',
  },

  // Mounts
  {
    sku: 'HT-MNT-G1',
    name: 'Mount, Generation 1',
    description: 'Mounting bracket for Gen 1 power bars',
    category: 'heat-tech',
    partNumber: 70003,
    partNumberRange: getPartNumberRange('heat-tech'),
    sellable: 'sellable',
    katanaItemType: 'product-for-resale',
    hasBom: false,
    isSubassembly: false,
  },
  {
    sku: 'HT-MNT-UNI',
    name: 'Mount, Universal',
    description: 'Universal mounting bracket compatible with all power bar generations',
    category: 'heat-tech',
    partNumber: 70004,
    partNumberRange: getPartNumberRange('heat-tech'),
    sellable: 'sellable',
    katanaItemType: 'product-for-resale',
    hasBom: false,
    isSubassembly: false,
  },

  // Charging Infrastructure
  {
    sku: 'HT-CHG-CRT-20',
    name: 'Charging Cart, 20 Devices',
    description: 'Mobile charging station for up to 20 power bars',
    category: 'heat-tech',
    partNumber: 70005,
    partNumberRange: getPartNumberRange('heat-tech'),
    sellable: 'sellable',
    katanaItemType: 'product-for-resale',
    hasBom: false,
    isSubassembly: false,
    notes: 'For hospitality and commercial use.',
  },

  // Splitters
  {
    sku: 'HT-CHG-SPLT-2',
    name: 'Power Splitter, 2-Way',
    description: 'Splits power from one bar to two heating elements',
    category: 'heat-tech',
    partNumber: 70006,
    partNumberRange: getPartNumberRange('heat-tech'),
    sellable: 'sellable',
    katanaItemType: 'product-for-resale',
    hasBom: false,
    isSubassembly: false,
  },
  {
    sku: 'HT-CHG-SPLT-3',
    name: 'Power Splitter, 3-Way',
    description: 'Splits power from one bar to three heating elements',
    category: 'heat-tech',
    partNumber: 70007,
    partNumberRange: getPartNumberRange('heat-tech'),
    sellable: 'sellable',
    katanaItemType: 'product-for-resale',
    hasBom: false,
    isSubassembly: false,
  },
  {
    sku: 'HT-CHG-SPLT-4',
    name: 'Power Splitter, 4-Way',
    description: 'Splits power from one bar to four heating elements',
    category: 'heat-tech',
    partNumber: 70008,
    partNumberRange: getPartNumberRange('heat-tech'),
    sellable: 'sellable',
    katanaItemType: 'product-for-resale',
    hasBom: false,
    isSubassembly: false,
  },

  // Heating Elements (Materials/Components)
  {
    sku: 'HT-GPH-LS-SEAT-G1',
    name: 'Graphene Heating Element, LS Seat, Gen 1',
    description: 'Graphene-based heating element for lounge seating seat cushions',
    category: 'heat-tech',
    partNumber: 70009,
    partNumberRange: getPartNumberRange('heat-tech'),
    sellable: 'internal-only',
    katanaItemType: 'raw-material',
    hasBom: false,
    isSubassembly: true,
    notes: 'Component of core inserts. Not sold separately.',
  },
  {
    sku: 'HT-GPH-LS-BACK-G1',
    name: 'Graphene Heating Element, LS Back, Gen 1',
    description: 'Graphene-based heating element for lounge seating back cushions',
    category: 'heat-tech',
    partNumber: 70010,
    partNumberRange: getPartNumberRange('heat-tech'),
    sellable: 'internal-only',
    katanaItemType: 'raw-material',
    hasBom: false,
    isSubassembly: true,
    notes: 'Component of core inserts. Not sold separately.',
  },
  {
    sku: 'HT-GPH-LS-PILB-G1',
    name: 'Graphene Heating Element, LS Pillow Back, Gen 1',
    description: 'Graphene-based heating element for pillow back cushions',
    category: 'heat-tech',
    partNumber: 70011,
    partNumberRange: getPartNumberRange('heat-tech'),
    sellable: 'internal-only',
    katanaItemType: 'raw-material',
    hasBom: false,
    isSubassembly: true,
    notes: 'Component of core inserts. Not sold separately.',
  },
];

export function getHeatTechBySku(sku: string): Product | undefined {
  return HEAT_TECH.find(h => h.sku === sku);
}

export function getSellableHeatTech(): Product[] {
  return HEAT_TECH.filter(h => h.sellable === 'sellable');
}
