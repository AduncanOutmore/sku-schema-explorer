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

// Set types
const SET_TYPES = [
  { code: 'ST1', name: 'Standard (Seat + Foam Back)', offset: 0 },
  { code: 'ST2', name: 'Pillow Back (Seat + Pillow Back)', offset: 16 },
];

// Generate all finished goods
// 8 seating types x 2 set types x 16 fabrics = 256 products
export const FINISHED_GOODS: Product[] = HEATED_SEATING_TYPES.flatMap((productType) =>
  SET_TYPES.flatMap((setType) =>
    FABRIC_COLORS.map((fabric, fabricIndex) => ({
      sku: `SOL-${productType.code}-NTK-${fabric.code}-${setType.code}`,
      name: `Solerno ${productType.name}, ${fabric.name}, ${setType.code === 'ST1' ? 'Standard' : 'Pillow Back'}`,
      description: `${productType.name} from the Solerno collection in ${fabric.fullName} with ${setType.code === 'ST1' ? 'foam back' : 'pillow back'} cushion configuration`,
      category: 'finished-good' as const,
      partNumber: 10001 + productType.partNumberOffset + setType.offset + fabricIndex,
      partNumberRange: getPartNumberRange('finished-good'),
      sellable: 'sellable' as const,
      katanaItemType: 'make-to-order' as const,
      hasBom: true,
      isSubassembly: false,
      collection: 'SOL',
      productType: productType.code,
      finish: 'NTK',
      setType: setType.code,
      fabricColor: fabric,
      notes: 'Make-to-Order. Assembled when customer places order on Shopify.',
    }))
  )
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

export function getFinishedGoodsBySetType(setType: string): Product[] {
  return FINISHED_GOODS.filter(fg => fg.setType === setType);
}

// Get unique product types
export function getUniqueProductTypes(): { code: string; name: string }[] {
  return HEATED_SEATING_TYPES;
}
