import { Product, getPartNumberRange } from '@/types/product';

// Core Inserts (40500s range)
// These are internal components NOT sold separately
// They contain the heating technology and are fabric-agnostic
export const CORE_INSERTS: Product[] = [
  {
    sku: 'COR-LS-SEAT',
    name: 'Core Insert, Lounge Seating Seat',
    description: 'Heated core insert for lounge seating seat cushion with graphene heating element',
    category: 'core-insert',
    partNumber: 40501,
    partNumberRange: getPartNumberRange('core-insert'),
    sellable: 'internal-only',
    katanaItemType: 'contract-manufactured',
    hasBom: true,
    isSubassembly: true,
    seatingType: 'LS',
    componentType: 'SEAT',
    notes: 'Contract manufactured. Universal across all fabric colors.',
  },
  {
    sku: 'COR-LS-BACK',
    name: 'Core Insert, Lounge Seating Back',
    description: 'Heated core insert for lounge seating back cushion with graphene heating element',
    category: 'core-insert',
    partNumber: 40502,
    partNumberRange: getPartNumberRange('core-insert'),
    sellable: 'internal-only',
    katanaItemType: 'contract-manufactured',
    hasBom: true,
    isSubassembly: true,
    seatingType: 'LS',
    componentType: 'BACK',
    notes: 'Contract manufactured. Universal across all fabric colors.',
  },
  {
    sku: 'COR-LS-PILB',
    name: 'Core Insert, Lounge Seating Pillow Back',
    description: 'Heated core insert for pillow back cushion with graphene heating element',
    category: 'core-insert',
    partNumber: 40503,
    partNumberRange: getPartNumberRange('core-insert'),
    sellable: 'internal-only',
    katanaItemType: 'contract-manufactured',
    hasBom: true,
    isSubassembly: true,
    seatingType: 'LS',
    componentType: 'PILB',
    notes: 'Contract manufactured. Universal across all fabric colors.',
  },
];

export function getCoreInsertBySku(sku: string): Product | undefined {
  return CORE_INSERTS.find(c => c.sku === sku);
}

export function getCoreInsertByComponent(componentType: string): Product | undefined {
  return CORE_INSERTS.find(c => c.componentType === componentType);
}
