import { Product, getPartNumberRange } from '@/types/product';
import { FABRIC_COLORS } from '../fabrics';

// Cushion sets — Katana models these as CUS-LS-SET-{color} (set of seat + back)
// PILB removed — only ST1 standard configuration in Katana

// Generate all cushion sets (19 total: 1 set type x 19 fabrics)
export const CUSHIONS: Product[] =
  FABRIC_COLORS.map((fabric, fabricIndex) => ({
    sku: `CUS-LS-SET-${fabric.code}`,
    name: `Cushion Set, Lounge Seating, ${fabric.name}`,
    description: `Complete cushion set (seat + back) for lounge seating in ${fabric.fullName}. Contains shells and heated core inserts.`,
    category: 'cushion' as const,
    partNumber: 40001 + fabricIndex,
    partNumberRange: getPartNumberRange('cushion'),
    sellable: 'internal-only' as const,
    katanaItemType: 'Product' as const,
    katanaUsage: 'subassembly' as const,
    hasBom: true,
    isSubassembly: true,
    seatingType: 'LS',
    componentType: 'SET',
    fabricColor: fabric,
    notes: 'Assembled in-house. Set = seat cushion + back cushion, each with shell + core insert.',
  }));

export function getCushionBySku(sku: string): Product | undefined {
  return CUSHIONS.find(c => c.sku === sku);
}

export function getCushionsByFabric(fabricCode: string): Product[] {
  return CUSHIONS.filter(c => c.fabricColor?.code === fabricCode);
}
