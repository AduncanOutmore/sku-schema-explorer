import { Product, ProductCategory } from './product';

// BOM relationship (flat structure)
export interface BomRelation {
  parentSku: string;      // Can contain {COLOR} template
  componentSku: string;   // Can contain {COLOR} template
  componentName: string;
  quantity: number;
  unit: 'ea' | 'lb' | 'sqft' | 'ft';
}

// Nested BOM tree node for display
export interface BomNode {
  sku: string;
  product: Product | null;
  name: string;
  quantity: number;
  unit: string;
  level: number;
  children: BomNode[];
  isExpanded?: boolean;
  category: ProductCategory;
}

// Flattened BOM item for table display
export interface FlattenedBomItem {
  sku: string;
  name: string;
  quantity: number;
  unit: string;
  level: number;
  path: string[];  // Parent SKUs leading to this item
  category: ProductCategory;
  hasChildren: boolean;
}

// BOM summary statistics
export interface BomSummary {
  totalItems: number;
  totalMaterials: number;
  maxDepth: number;
  categoryCounts: Record<ProductCategory, number>;
}

// Material requirement for quantity calculation
export interface MaterialRequirement {
  sku: string;
  name: string;
  totalQuantity: number;
  unit: string;
  category: ProductCategory;
}
