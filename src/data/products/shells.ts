import { Product, getPartNumberRange } from '@/types/product';
import { FABRIC_COLORS } from '../fabrics';

// Shell component types
const SHELL_COMPONENTS = [
  { code: 'SEAT', name: 'Seat', partNumberOffset: 0 },
  { code: 'BACK', name: 'Back', partNumberOffset: 16 },
  { code: 'PILB', name: 'Pillow Back', partNumberOffset: 32 },
];

// Generate all shells (48 total: 3 components x 16 fabrics)
export const SHELLS: Product[] = SHELL_COMPONENTS.flatMap((component, componentIndex) =>
  FABRIC_COLORS.map((fabric, fabricIndex) => ({
    sku: `SHL-LS-${component.code}-${fabric.code}`,
    name: `Shell, Lounge Seating ${component.name}, ${fabric.name}`,
    description: `Fabric shell cover for lounge seating ${component.name.toLowerCase()} cushion in ${fabric.fullName}`,
    category: 'shell' as const,
    partNumber: 50001 + component.partNumberOffset + fabricIndex,
    partNumberRange: getPartNumberRange('shell'),
    sellable: 'sellable' as const,
    katanaItemType: 'contract-manufactured' as const,
    hasBom: true,
    isSubassembly: true,
    seatingType: 'LS',
    componentType: component.code,
    fabricColor: fabric,
    notes: 'Contract manufactured. Sellable as replacement part.',
  }))
);

export function getShellBySku(sku: string): Product | undefined {
  return SHELLS.find(s => s.sku === sku);
}

export function getShellsByComponent(componentType: string): Product[] {
  return SHELLS.filter(s => s.componentType === componentType);
}

export function getShellsByFabric(fabricCode: string): Product[] {
  return SHELLS.filter(s => s.fabricColor?.code === fabricCode);
}

export function getShellForCushion(componentType: string, fabricCode: string): Product | undefined {
  return SHELLS.find(s => s.componentType === componentType && s.fabricColor?.code === fabricCode);
}
