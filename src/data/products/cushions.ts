import { Product, getPartNumberRange } from '@/types/product';
import { FABRIC_COLORS } from '../fabrics';

// Lounge seating cushion sets (19 total: 19 fabrics)
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

// Heated Ottoman cushions (19 fabrics) — shell with grommet + heated core insert
export const HEATED_OTTOMAN_CUSHIONS: Product[] =
  FABRIC_COLORS.map((fabric, fabricIndex) => ({
    sku: `CUS-HOT-${fabric.code}`,
    name: `Cushion, Heated Ottoman, ${fabric.name}`,
    description: `Heated ottoman cushion in ${fabric.fullName}. Shell (SHL-HOT) + Heated Core Insert (COR-HOT).`,
    category: 'cushion' as const,
    partNumber: 40020 + fabricIndex,
    partNumberRange: getPartNumberRange('cushion'),
    sellable: 'internal-only' as const,
    katanaItemType: 'Product' as const,
    katanaUsage: 'subassembly' as const,
    hasBom: true,
    isSubassembly: true,
    seatingType: 'HOT',
    componentType: 'SET',
    fabricColor: fabric,
    notes: 'Contract manufactured by Mozaic. Cost: $115.25 (shell $48 + core insert $67.25).',
  }));

// Ottoman cushions (19 fabrics) — shell without grommet + non-heated core insert
export const OTTOMAN_CUSHIONS: Product[] =
  FABRIC_COLORS.map((fabric, fabricIndex) => ({
    sku: `CUS-OTM-${fabric.code}`,
    name: `Cushion, Ottoman, ${fabric.name}`,
    description: `Ottoman cushion in ${fabric.fullName}. Shell (SHL-OTM) + Core Insert (COR-OTM).`,
    category: 'cushion' as const,
    partNumber: 40039 + fabricIndex,
    partNumberRange: getPartNumberRange('cushion'),
    sellable: 'internal-only' as const,
    katanaItemType: 'Product' as const,
    katanaUsage: 'subassembly' as const,
    hasBom: true,
    isSubassembly: true,
    seatingType: 'OTM',
    componentType: 'SET',
    fabricColor: fabric,
    notes: 'Contract manufactured by Mozaic. Cost: $110.25 (shell $46.50 + core insert $63.75).',
  }));

export const ALL_CUSHIONS = [...CUSHIONS, ...HEATED_OTTOMAN_CUSHIONS, ...OTTOMAN_CUSHIONS];

export function getCushionBySku(sku: string): Product | undefined {
  return ALL_CUSHIONS.find(c => c.sku === sku);
}

export function getCushionsByFabric(fabricCode: string): Product[] {
  return ALL_CUSHIONS.filter(c => c.fabricColor?.code === fabricCode);
}
