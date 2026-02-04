import { Product, getPartNumberRange } from '@/types/product';
import { FABRIC_COLORS } from '../fabrics';

// Cushion component types
const CUSHION_COMPONENTS = [
  { code: 'SEAT', name: 'Seat', partNumberOffset: 0 },
  { code: 'BACK', name: 'Back', partNumberOffset: 16 },
  { code: 'PILB', name: 'Pillow Back', partNumberOffset: 32 },
];

// Generate all cushions (48 total: 3 components x 16 fabrics)
export const CUSHIONS: Product[] = CUSHION_COMPONENTS.flatMap((component, componentIndex) =>
  FABRIC_COLORS.map((fabric, fabricIndex) => ({
    sku: `CSH-LS-${component.code}-${fabric.code}`,
    name: `Cushion, Lounge Seating ${component.name}, ${fabric.name}`,
    description: `Complete cushion assembly for lounge seating ${component.name.toLowerCase()} in ${fabric.fullName}. Contains shell and heated core insert.`,
    category: 'cushion' as const,
    partNumber: 40001 + component.partNumberOffset + fabricIndex,
    partNumberRange: getPartNumberRange('cushion'),
    sellable: 'sellable' as const,
    katanaItemType: 'subassembly' as const,
    hasBom: true,
    isSubassembly: true,
    seatingType: 'LS',
    componentType: component.code,
    fabricColor: fabric,
    notes: 'Assembled in-house. Each cushion = 1 Shell + 1 Core Insert.',
  }))
);

export function getCushionBySku(sku: string): Product | undefined {
  return CUSHIONS.find(c => c.sku === sku);
}

export function getCushionsByComponent(componentType: string): Product[] {
  return CUSHIONS.filter(c => c.componentType === componentType);
}

export function getCushionsByFabric(fabricCode: string): Product[] {
  return CUSHIONS.filter(c => c.fabricColor?.code === fabricCode);
}

export function getCushionForFinishedGood(componentType: string, fabricCode: string): Product | undefined {
  return CUSHIONS.find(c => c.componentType === componentType && c.fabricColor?.code === fabricCode);
}
