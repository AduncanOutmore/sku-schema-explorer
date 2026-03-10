import { FabricColor } from '@/types/product';

// The 16 available Sunbrella fabric colors
export const FABRIC_COLORS: FabricColor[] = [
  {
    code: 'CBN',
    name: 'Carbon',
    fullName: 'Sunbrella Spectrum Carbon',
    hexColor: '#3D3D3D',
    pattern: 'SPTM',
    sku: 'FAB-SUN-SPTM-CBN',
  },
  {
    code: 'IND',
    name: 'Indigo',
    fullName: 'Sunbrella Spectrum Indigo',
    hexColor: '#3F51B5',
    pattern: 'SPTM',
    sku: 'FAB-SUN-SPTM-IND',
  },
  {
    code: 'DOV',
    name: 'Dove',
    fullName: 'Sunbrella Spectrum Dove',
    hexColor: '#9E9E9E',
    pattern: 'SPTM',
    sku: 'FAB-SUN-SPTM-DOV',
  },
  {
    code: 'CHR',
    name: 'Charcoal',
    fullName: 'Sunbrella Heritage Charcoal',
    hexColor: '#616161',
    pattern: 'HRTG',
    sku: 'FAB-SUN-HRTG-CHR',
  },
  {
    code: 'LEF',
    name: 'Leaf',
    fullName: 'Sunbrella Heritage Leaf',
    hexColor: '#7CB342',
    pattern: 'HRTG',
    sku: 'FAB-SUN-HRTG-LEF',
  },
  {
    code: 'SBL',
    name: 'Sable',
    fullName: 'Sunbrella Heritage Sable',
    hexColor: '#6D4C41',
    pattern: 'HRTG',
    sku: 'FAB-SUN-HRTG-SBL',
  },
  {
    code: 'SLT',
    name: 'Salt',
    fullName: 'Sunbrella Sailcloth Salt',
    hexColor: '#FAFAFA',
    pattern: 'SAIL',
    sku: 'FAB-SUN-SAIL-SLT',
  },
  {
    code: 'SAH',
    name: 'Sahara',
    fullName: 'Sunbrella Sailcloth Sahara',
    hexColor: '#D4A574',
    pattern: 'SAIL',
    sku: 'FAB-SUN-SAIL-SAH',
  },
  {
    code: 'GUL',
    name: 'Seagull',
    fullName: 'Sunbrella Sailcloth Seagull',
    hexColor: '#CFD8DC',
    pattern: 'SAIL',
    sku: 'FAB-SUN-SAIL-GUL',
  },
  {
    code: 'BSQ',
    name: 'Bisque',
    fullName: 'Sunbrella Cast Bisque',
    hexColor: '#D7CCC8',
    pattern: 'CAST',
    sku: 'FAB-SUN-CAST-BSQ',
  },
  {
    code: 'SEA',
    name: 'Seaglass',
    fullName: 'Sunbrella Cast Seaglass',
    hexColor: '#80CBC4',
    pattern: 'CAST',
    sku: 'FAB-SUN-CAST-SEA',
  },
  {
    code: 'SND',
    name: 'Sand',
    fullName: 'Sunbrella Cast Sand',
    hexColor: '#C4B9A8',
    pattern: 'CAST',
    sku: 'FAB-SUN-CAST-SND',
  },
  {
    code: 'ALO',
    name: 'Aloe',
    fullName: 'Sunbrella Bliss Aloe',
    hexColor: '#A5D6A7',
    pattern: 'BLIS',
    sku: 'FAB-SUN-BLIS-ALO',
  },
  {
    code: 'JAV',
    name: 'Java',
    fullName: 'Sunbrella Canvas Java',
    hexColor: '#4E342E',
    pattern: 'CNVS',
    sku: 'FAB-SUN-CNVS-JAV',
  },
  {
    code: 'DEW',
    name: 'Dewdrop',
    fullName: 'Sunbrella Exhale Dewdrop',
    hexColor: '#B3E5FC',
    pattern: 'EXHL',
    sku: 'FAB-SUN-EXHL-DEW',
  },
  {
    code: 'BIN',
    name: 'Blend Indigo',
    fullName: 'Sunbrella Blend Indigo',
    hexColor: '#5C6BC0',
    pattern: 'BLND',
    sku: 'FAB-SUN-BLND-IND',
  },
  {
    code: 'MSA',
    name: 'Mesa',
    fullName: 'Sunbrella Canvas Mesa',
    hexColor: '#C19A6B',
    pattern: 'CNVS',
    sku: 'FAB-SUN-CNVS-MSA',
  },
  {
    code: 'EGS',
    name: 'Eggshell',
    fullName: 'Sunbrella Canvas Eggshell',
    hexColor: '#F0EAD6',
    pattern: 'CNVS',
    sku: 'FAB-SUN-CNVS-EGS',
  },
];

// Throw-specific fabric colors (not used in seating products)
export const THROW_COLORS: FabricColor[] = [
  {
    code: 'STN',
    name: 'Stone',
    fullName: 'Sunbrella Heritage Stone',
    hexColor: '#8B8680',
    pattern: 'HRTG',
    sku: 'FAB-SUN-HRTG-STN',
  },
  {
    code: 'SGE',
    name: 'Sage',
    fullName: 'Sunbrella Heritage Sage',
    hexColor: '#9CAF88',
    pattern: 'HRTG',
    sku: 'FAB-SUN-HRTG-SGE',
  },
  {
    code: 'DWD',
    name: 'Driftwood',
    fullName: 'Sunbrella Sailcloth Driftwood',
    hexColor: '#A89078',
    pattern: 'SAIL',
    sku: 'FAB-SUN-SAIL-DWD',
  },
  {
    code: 'ALB',
    name: 'Alabaster',
    fullName: 'Sunbrella Sailcloth Alabaster',
    hexColor: '#F2EDE4',
    pattern: 'SAIL',
    sku: 'FAB-SUN-SAIL-ALB',
  },
];

// Lookup fabric by code
export function getFabricByCode(code: string): FabricColor | undefined {
  return FABRIC_COLORS.find(f => f.code === code.toUpperCase());
}

// Get all fabric codes
export function getAllFabricCodes(): string[] {
  return FABRIC_COLORS.map(f => f.code);
}

// Group fabrics by pattern
export function getFabricsByPattern(): Record<string, FabricColor[]> {
  return FABRIC_COLORS.reduce((acc, fabric) => {
    if (!acc[fabric.pattern]) {
      acc[fabric.pattern] = [];
    }
    acc[fabric.pattern].push(fabric);
    return acc;
  }, {} as Record<string, FabricColor[]>);
}

// Pattern display names
export const PATTERN_NAMES: Record<string, string> = {
  'SPTM': 'Spectrum',
  'HRTG': 'Heritage',
  'SAIL': 'Sailcloth',
  'CAST': 'Cast',
  'BLIS': 'Bliss',
  'CNVS': 'Canvas',
  'EXHL': 'Exhale',
  'BLND': 'Blend',
};
