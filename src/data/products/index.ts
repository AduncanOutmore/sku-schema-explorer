import { Product, ProductCategory } from '@/types/product';
import { FINISHED_GOODS } from './finished-goods';
import { SETS } from './sets';
import { FRAMES, FRAME_PARTS } from './frames';
import { ALL_CUSHIONS } from './cushions';
import { CORE_INSERTS } from './core-inserts';
import { ALL_SHELLS } from './shells';
import { HEAT_TECH } from './heat-tech';
import { PROTECTIVE_COVERS, ACCESSORIES } from './accessories';
import { MATERIALS } from './materials';

// Re-export all product arrays
export { FINISHED_GOODS } from './finished-goods';
export { SETS } from './sets';
export { FRAMES, FRAME_PARTS } from './frames';
export { ALL_CUSHIONS as CUSHIONS, HEATED_OTTOMAN_CUSHIONS, OTTOMAN_CUSHIONS } from './cushions';
export { CORE_INSERTS } from './core-inserts';
export { ALL_SHELLS as SHELLS, HEATED_OTTOMAN_SHELLS, OTTOMAN_SHELLS } from './shells';
export { HEAT_TECH } from './heat-tech';
export { PROTECTIVE_COVERS, ACCESSORIES } from './accessories';
export { MATERIALS } from './materials';

// Aggregate all products
export const ALL_PRODUCTS: Product[] = [
  ...FINISHED_GOODS,
  ...SETS,
  ...FRAMES,
  ...FRAME_PARTS,
  ...ALL_CUSHIONS,
  ...CORE_INSERTS,
  ...ALL_SHELLS,
  ...HEAT_TECH,
  ...PROTECTIVE_COVERS,
  ...ACCESSORIES,
  ...MATERIALS,
];

// Get product by SKU
export function getProductBySku(sku: string): Product | undefined {
  return ALL_PRODUCTS.find(p => p.sku === sku);
}

// Get products by category
export function getProductsByCategory(category: ProductCategory): Product[] {
  return ALL_PRODUCTS.filter(p => p.category === category);
}

// Get sellable products
export function getSellableProducts(): Product[] {
  return ALL_PRODUCTS.filter(p => p.sellable === 'sellable');
}

// Get products that are subassemblies
export function getSubassemblies(): Product[] {
  return ALL_PRODUCTS.filter(p => p.isSubassembly);
}

// Get products with BOMs
export function getProductsWithBom(): Product[] {
  return ALL_PRODUCTS.filter(p => p.hasBom);
}

// Search products
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return ALL_PRODUCTS.filter(
    p =>
      p.sku.toLowerCase().includes(lowerQuery) ||
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
  );
}

// Get product counts by category
export function getProductCounts(): Record<ProductCategory, number> {
  const counts: Record<ProductCategory, number> = {
    'finished-good': 0,
    'frame': 0,
    'cushion': 0,
    'core-insert': 0,
    'shell': 0,
    'heat-tech': 0,
    'protective-cover': 0,
    'accessory': 0,
    'material': 0,
    'marketing': 0,
  };

  ALL_PRODUCTS.forEach(p => {
    counts[p.category]++;
  });

  return counts;
}

// Get total product count
export function getTotalProductCount(): number {
  return ALL_PRODUCTS.length;
}
