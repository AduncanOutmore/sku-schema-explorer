import { Product, getPartNumberRange } from '@/types/product';
import { FABRIC_COLORS } from '../fabrics';

// Heated seating product types that require cushions
const HEATED_SEATING_TYPES = [
  { code: 'LCH', name: 'Lounge Chair', partNumberOffset: 0 },
  { code: 'LOV', name: 'Loveseat', partNumberOffset: 32 },
  { code: 'SOF', name: 'Sofa', partNumberOffset: 64 },
  { code: 'HOT', name: 'Heated Ottoman', partNumberOffset: 96 },
  { code: 'CHS', name: 'Chaise Lounge', partNumberOffset: 128 },
  { code: 'SVL', name: 'Swivel Chair', partNumberOffset: 160 },
  { code: 'DAC', name: 'Dining Arm Chair', partNumberOffset: 192 },
  { code: 'DCH', name: 'Dining Side Chair', partNumberOffset: 224 },
];

// Generate all finished goods
// 8 seating types x 19 fabrics = 152 products (ST1 only — ST2 pillow back was removed)
export const FINISHED_GOODS: Product[] = HEATED_SEATING_TYPES.flatMap((productType) =>
  FABRIC_COLORS.map((fabric, fabricIndex) => ({
    sku: `SOL-${productType.code}-NTK-${fabric.code}-ST1`,
    name: `Solerno ${productType.name}, ${fabric.name}`,
    description: `${productType.name} from the Solerno collection in ${fabric.fullName}`,
    category: 'finished-good' as const,
    partNumber: 10001 + productType.partNumberOffset + fabricIndex,
    partNumberRange: getPartNumberRange('finished-good'),
    sellable: 'sellable' as const,
    katanaItemType: 'Product' as const,
    katanaUsage: 'make-to-order' as const,
    hasBom: true,
    isSubassembly: false,
    collection: 'SOL',
    productType: productType.code,
    finish: 'NTK',
    setType: 'ST1',
    fabricColor: fabric,
    notes: 'Make-to-Order. Assembled when customer places order on Shopify.',
  }))
);

export function getFinishedGoodBySku(sku: string): Product | undefined {
  return FINISHED_GOODS.find(fg => fg.sku === sku);
}

export function getFinishedGoodsByProductType(productType: string): Product[] {
  return FINISHED_GOODS.filter(fg => fg.productType === productType);
}

export function getFinishedGoodsByFabric(fabricCode: string): Product[] {
  return FINISHED_GOODS.filter(fg => fg.fabricColor?.code === fabricCode);
}

// Get unique product types
export function getUniqueProductTypes(): { code: string; name: string }[] {
  return HEATED_SEATING_TYPES;
}
