import { ProductCategory } from './product';

// SKU segment definition
export interface SkuSegment {
  name: string;           // e.g., 'PRODUCT', 'FABRIC'
  position: number;       // Segment position (0-indexed)
  required: boolean;
  options: SkuSegmentOption[];
  description: string;
}

// Option for a SKU segment
export interface SkuSegmentOption {
  code: string;           // e.g., 'LCH'
  label: string;          // e.g., 'Lounge Chair'
  description?: string;
}

// SKU pattern definition
export interface SkuPattern {
  category: ProductCategory;
  prefix: string;         // e.g., 'SOL', 'FR', 'CSH'
  pattern: string;        // e.g., 'SOL-[PRODUCT]-[FINISH]-[FABRIC]-[SET]'
  regex: RegExp;          // Validation regex
  segments: SkuSegment[];
  example: string;
  description: string;
}

// Decoded SKU segment
export interface DecodedSegment {
  code: string;
  meaning: string;
  position: number;
  segmentType: string;
  isValid: boolean;
}

// Decoded SKU result
export interface DecodedSku {
  sku: string;
  isValid: boolean;
  category: ProductCategory | null;
  categoryName: string;
  segments: DecodedSegment[];
  partNumber: number | null;
  errors: string[];
  warnings: string[];
}

// Builder state for SKU construction
export interface SkuBuilderState {
  category: ProductCategory | null;
  selectedSegments: Record<string, string>;
  generatedSku: string;
  isValid: boolean;
}
