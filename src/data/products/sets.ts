import { Product, getPartNumberRange } from '@/types/product';
import { FABRIC_COLORS } from '../fabrics';

// Furniture set types sold as bundles on Shopify
const SET_TYPES = [
  { code: 'H2C', name: 'Heated 2-Chair Set', prefix: 'FU-SO-H2C', partNumberOffset: 0 },
  { code: 'HLS', name: 'Heated Loveseat Set', prefix: 'FU-SO-HLS', partNumberOffset: 19 },
  { code: 'HSS', name: 'Sofa Set', prefix: 'FU-SO-HSS', partNumberOffset: 38 },
  { code: 'HSSW', name: 'Heated Sofa + Swivel Set', prefix: 'FU-SO-HSSW', partNumberOffset: 57 },
];

// Generate all sets (4 types x 19 fabrics = 76 products)
export const SETS: Product[] = SET_TYPES.flatMap((setType) =>
  FABRIC_COLORS.map((fabric, fabricIndex) => ({
    sku: `${setType.prefix}-${fabric.code}`,
    name: `Solerno ${setType.name}, ${fabric.name}`,
    description: `${setType.name} from the Solerno collection in ${fabric.fullName}`,
    category: 'finished-good' as const,
    partNumber: 11001 + setType.partNumberOffset + fabricIndex,
    partNumberRange: getPartNumberRange('finished-good'),
    sellable: 'sellable' as const,
    katanaItemType: 'Product' as const,
    katanaUsage: 'make-to-order' as const,
    hasBom: true,
    isSubassembly: false,
    collection: 'SOL',
    productType: setType.code,
    fabricColor: fabric,
    notes: 'Shopify bundle product. BOM references individual finished goods.',
  }))
);

export function getSetBySku(sku: string): Product | undefined {
  return SETS.find(s => s.sku === sku);
}

export function getSetsByType(setTypeCode: string): Product[] {
  return SETS.filter(s => s.productType === setTypeCode);
}
