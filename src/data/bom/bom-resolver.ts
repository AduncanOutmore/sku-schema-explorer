import { BomRelation, BomNode } from '@/types/bom';
import { Product, ProductCategory } from '@/types/product';
import { BOM_TEMPLATES } from './bom-relations';
import { getProductBySku } from '../products';
import { getFabricByCode } from '../fabrics';

// Extract color code from SKU
export function extractColorFromSku(sku: string): string | null {
  // Try to match fabric color code patterns
  // Finished goods: SOL-LCH-NTK-CBN-ST1
  // Cushions/Shells: CSH-LS-SEAT-CBN
  const parts = sku.split('-');

  // For finished goods (5 parts), color is at index 3
  if (parts.length === 5 && parts[0] === 'SOL') {
    return parts[3];
  }

  // For cushions and shells (4 parts), color is at index 3
  if (parts.length === 4 && (parts[0] === 'CSH' || parts[0] === 'SHL')) {
    return parts[3];
  }

  return null;
}

// Get fabric pattern from color code
function getFabricPattern(colorCode: string): string {
  const fabric = getFabricByCode(colorCode);
  return fabric?.pattern || 'SPTM';
}

// Check if a template pattern matches a SKU
function matchesTemplate(template: string, sku: string, colorCode: string | null): boolean {
  if (!colorCode) {
    // For non-fabric items, do exact match
    return template === sku;
  }

  // Replace template placeholders and compare
  const pattern = getFabricPattern(colorCode);
  const resolvedTemplate = template
    .replace('{COLOR}', colorCode)
    .replace('{PATTERN}', pattern);

  return resolvedTemplate === sku;
}

// Resolve BOM for a specific SKU
export function resolveBomForSku(sku: string): BomRelation[] {
  const colorCode = extractColorFromSku(sku);
  const pattern = colorCode ? getFabricPattern(colorCode) : '';

  return BOM_TEMPLATES
    .filter(rel => matchesTemplate(rel.parentSku, sku, colorCode))
    .map(rel => ({
      ...rel,
      parentSku: colorCode
        ? rel.parentSku.replace('{COLOR}', colorCode).replace('{PATTERN}', pattern)
        : rel.parentSku,
      componentSku: colorCode
        ? rel.componentSku.replace('{COLOR}', colorCode).replace('{PATTERN}', pattern)
        : rel.componentSku,
    }));
}

// Get category from SKU prefix
function getCategoryFromSku(sku: string): ProductCategory {
  if (sku.startsWith('SOL-')) return 'finished-good';
  if (sku.startsWith('FR-')) return 'frame';
  if (sku.startsWith('CSH-')) return 'cushion';
  if (sku.startsWith('COR-')) return 'core-insert';
  if (sku.startsWith('SHL-')) return 'shell';
  if (sku.startsWith('HT-')) return 'heat-tech';
  if (sku.startsWith('PRO-')) return 'protective-cover';
  if (sku.startsWith('ACC-')) return 'accessory';
  if (sku.startsWith('FAB-') || sku.startsWith('FOM-') || sku.startsWith('FIL-') || sku.startsWith('HW-') || sku.startsWith('LBL-')) return 'material';
  return 'material';
}

// Build recursive BOM tree for a SKU
export function buildBomTree(
  sku: string,
  level: number = 0,
  quantity: number = 1,
  unit: string = 'ea',
  visitedSkus: Set<string> = new Set()
): BomNode {
  // Prevent infinite recursion
  if (visitedSkus.has(sku)) {
    const product = getProductBySku(sku);
    return {
      sku,
      product: product || null,
      name: product?.name || sku,
      quantity,
      unit,
      level,
      children: [],
      category: product?.category || getCategoryFromSku(sku),
    };
  }

  visitedSkus.add(sku);

  const product = getProductBySku(sku);
  const bomRelations = resolveBomForSku(sku);

  const children = bomRelations.map(rel =>
    buildBomTree(
      rel.componentSku,
      level + 1,
      rel.quantity,
      rel.unit,
      new Set(visitedSkus)
    )
  );

  return {
    sku,
    product: product || null,
    name: product?.name || sku,
    quantity,
    unit,
    level,
    children,
    category: product?.category || getCategoryFromSku(sku),
  };
}

// Flatten BOM tree for table display
export function flattenBomTree(
  node: BomNode,
  path: string[] = []
): Array<{
  sku: string;
  name: string;
  quantity: number;
  unit: string;
  level: number;
  path: string[];
  category: ProductCategory;
  hasChildren: boolean;
}> {
  const currentPath = [...path, node.sku];
  const result = [
    {
      sku: node.sku,
      name: node.name,
      quantity: node.quantity,
      unit: node.unit,
      level: node.level,
      path: currentPath,
      category: node.category,
      hasChildren: node.children.length > 0,
    },
  ];

  for (const child of node.children) {
    result.push(...flattenBomTree(child, currentPath));
  }

  return result;
}

// Get total material requirements from BOM tree
export function getMaterialRequirements(
  node: BomNode,
  parentQuantity: number = 1
): Map<string, { name: string; quantity: number; unit: string; category: ProductCategory }> {
  const requirements = new Map<string, { name: string; quantity: number; unit: string; category: ProductCategory }>();

  const effectiveQuantity = node.quantity * parentQuantity;

  if (node.children.length === 0) {
    // This is a leaf node (material)
    const existing = requirements.get(node.sku);
    if (existing) {
      existing.quantity += effectiveQuantity;
    } else {
      requirements.set(node.sku, {
        name: node.name,
        quantity: effectiveQuantity,
        unit: node.unit,
        category: node.category,
      });
    }
  } else {
    // Process children
    for (const child of node.children) {
      const childReqs = getMaterialRequirements(child, effectiveQuantity);
      for (const [sku, data] of childReqs) {
        const existing = requirements.get(sku);
        if (existing) {
          existing.quantity += data.quantity;
        } else {
          requirements.set(sku, { ...data });
        }
      }
    }
  }

  return requirements;
}

// Get BOM depth
export function getBomDepth(node: BomNode): number {
  if (node.children.length === 0) {
    return 0;
  }
  return 1 + Math.max(...node.children.map(child => getBomDepth(child)));
}

// Count total items in BOM
export function countBomItems(node: BomNode): number {
  return 1 + node.children.reduce((sum, child) => sum + countBomItems(child), 0);
}
