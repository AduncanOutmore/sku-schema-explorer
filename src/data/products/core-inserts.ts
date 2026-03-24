import { Product, getPartNumberRange } from '@/types/product';

// Core Inserts (40500s range)
// Internal components NOT sold separately. Fabric-agnostic.
export const CORE_INSERTS: Product[] = [
  // Lounge seating
  {
    sku: 'COR-LS-SEAT',
    name: 'Core Insert, Lounge Seating Seat',
    description: 'Heated core insert for lounge seating seat cushion with graphene heating element',
    category: 'core-insert',
    partNumber: 40501,
    partNumberRange: getPartNumberRange('core-insert'),
    sellable: 'internal-only',
    katanaItemType: 'Product',
    katanaUsage: 'contract-manufactured',
    hasBom: true,
    isSubassembly: true,
    seatingType: 'LS',
    componentType: 'SEAT',
    notes: 'Contract manufactured. Universal across all fabric colors. Has 2x cord grip (dual heating zones).',
  },
  {
    sku: 'COR-LS-BACK',
    name: 'Core Insert, Lounge Seating Back',
    description: 'Heated core insert for lounge seating back cushion with graphene heating element',
    category: 'core-insert',
    partNumber: 40502,
    partNumberRange: getPartNumberRange('core-insert'),
    sellable: 'internal-only',
    katanaItemType: 'Product',
    katanaUsage: 'contract-manufactured',
    hasBom: true,
    isSubassembly: true,
    seatingType: 'LS',
    componentType: 'BACK',
    notes: 'Contract manufactured. Universal across all fabric colors. Has 1x cord grip.',
  },
  {
    sku: 'COR-LS-SET',
    name: 'Core Insert, Lounge Seating Set',
    description: 'Set of seat + back heated core inserts for lounge seating',
    category: 'core-insert',
    partNumber: 40503,
    partNumberRange: getPartNumberRange('core-insert'),
    sellable: 'internal-only',
    katanaItemType: 'Product',
    katanaUsage: 'contract-manufactured',
    hasBom: true,
    isSubassembly: true,
    seatingType: 'LS',
    componentType: 'SET',
    notes: 'Set product. Contains 1x seat core insert + 1x back core insert.',
  },
  // Heated Ottoman
  {
    sku: 'COR-HOT',
    name: 'Core Insert, Heated Ottoman',
    description: 'Heated core insert for ottoman with graphene heating element, #6 grommet, cord grip',
    category: 'core-insert',
    partNumber: 40504,
    partNumberRange: getPartNumberRange('core-insert'),
    sellable: 'internal-only',
    katanaItemType: 'Product',
    katanaUsage: 'contract-manufactured',
    hasBom: true,
    isSubassembly: true,
    seatingType: 'HOT',
    componentType: 'SEAT',
    notes: 'Mozaic manufactured. $67.25 total. Foam + batting + barrier + mesh + heating pad + #6 grommet + cord grip + nut + Mozaic op ($16.50).',
  },
  // Ottoman (non-heated)
  {
    sku: 'COR-OTM',
    name: 'Core Insert, Ottoman',
    description: 'Non-heated core insert for ottoman. Foam + barrier + mesh only, no heating elements.',
    category: 'core-insert',
    partNumber: 40505,
    partNumberRange: getPartNumberRange('core-insert'),
    sellable: 'internal-only',
    katanaItemType: 'Product',
    katanaUsage: 'contract-manufactured',
    hasBom: true,
    isSubassembly: true,
    seatingType: 'OTM',
    componentType: 'SEAT',
    notes: 'Mozaic manufactured. $63.75 total. Foam + batting + barrier + mesh + Mozaic op ($35.25).',
  },
];

export function getCoreInsertBySku(sku: string): Product | undefined {
  return CORE_INSERTS.find(c => c.sku === sku);
}

export function getCoreInsertByComponent(componentType: string): Product | undefined {
  return CORE_INSERTS.find(c => c.componentType === componentType);
}
