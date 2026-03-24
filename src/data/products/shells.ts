import { Product, getPartNumberRange } from '@/types/product';
import { FABRIC_COLORS } from '../fabrics';

// Lounge seating shell components (PILB removed — only ST1 standard configuration in Katana)
const SHELL_COMPONENTS = [
  { code: 'SEAT', name: 'Seat', partNumberOffset: 0 },
  { code: 'BACK', name: 'Back', partNumberOffset: 19 },
];

// Lounge seating shells (38 total: 2 components x 19 fabrics)
export const SHELLS: Product[] = SHELL_COMPONENTS.flatMap((component) =>
  FABRIC_COLORS.map((fabric, fabricIndex) => ({
    sku: `SHL-${component.code}-${fabric.code}`,
    name: `Shell, ${component.name}, ${fabric.name}`,
    description: `Fabric shell cover for lounge seating ${component.name.toLowerCase()} cushion in ${fabric.fullName}`,
    category: 'shell' as const,
    partNumber: 50001 + component.partNumberOffset + fabricIndex,
    partNumberRange: getPartNumberRange('shell'),
    sellable: 'sellable' as const,
    katanaItemType: 'Product' as const,
    katanaUsage: 'contract-manufactured' as const,
    hasBom: true,
    isSubassembly: true,
    seatingType: 'LS',
    componentType: component.code,
    fabricColor: fabric,
    notes: 'Contract manufactured by Mozaic. Sellable as replacement part.',
  }))
);

// Heated Ottoman shells (19 fabrics) — has #4 grommet for heating wire pass-through
export const HEATED_OTTOMAN_SHELLS: Product[] = FABRIC_COLORS.map((fabric, fabricIndex) => ({
  sku: `SHL-HOT-${fabric.code}`,
  name: `Shell, Heated Ottoman, ${fabric.name}`,
  description: `Fabric shell cover for heated ottoman in ${fabric.fullName}. Includes #4 snap grommet for heating wire.`,
  category: 'shell' as const,
  partNumber: 50039 + fabricIndex,
  partNumberRange: getPartNumberRange('shell'),
  sellable: 'internal-only' as const,
  katanaItemType: 'Product' as const,
  katanaUsage: 'contract-manufactured' as const,
  hasBom: true,
  isSubassembly: true,
  seatingType: 'HOT',
  componentType: 'SEAT',
  fabricColor: fabric,
  notes: 'Contract manufactured by Mozaic. Total cost $48 (fabric + label + #4 grommet + Mozaic op).',
}));

// Ottoman shells (19 fabrics) — no grommet
export const OTTOMAN_SHELLS: Product[] = FABRIC_COLORS.map((fabric, fabricIndex) => ({
  sku: `SHL-OTM-${fabric.code}`,
  name: `Shell, Ottoman, ${fabric.name}`,
  description: `Fabric shell cover for ottoman in ${fabric.fullName}. No grommet.`,
  category: 'shell' as const,
  partNumber: 50058 + fabricIndex,
  partNumberRange: getPartNumberRange('shell'),
  sellable: 'internal-only' as const,
  katanaItemType: 'Product' as const,
  katanaUsage: 'contract-manufactured' as const,
  hasBom: true,
  isSubassembly: true,
  seatingType: 'OTM',
  componentType: 'SEAT',
  fabricColor: fabric,
  notes: 'Contract manufactured by Mozaic. Total cost $46.50 (fabric + label + Mozaic op).',
}));

export const ALL_SHELLS = [...SHELLS, ...HEATED_OTTOMAN_SHELLS, ...OTTOMAN_SHELLS];

export function getShellBySku(sku: string): Product | undefined {
  return ALL_SHELLS.find(s => s.sku === sku);
}

export function getShellsByComponent(componentType: string): Product[] {
  return ALL_SHELLS.filter(s => s.componentType === componentType);
}

export function getShellsByFabric(fabricCode: string): Product[] {
  return ALL_SHELLS.filter(s => s.fabricColor?.code === fabricCode);
}
