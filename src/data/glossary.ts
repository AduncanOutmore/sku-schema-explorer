import { GlossaryEntry, AbbreviationCategory } from '@/types/glossary';

export const GLOSSARY: GlossaryEntry[] = [
  // Prefixes
  { abbreviation: 'SOL', meaning: 'Solerno (collection name)', category: 'Prefix' },
  { abbreviation: 'FR', meaning: 'Frame', category: 'Prefix' },
  { abbreviation: 'CSH', meaning: 'Cushion', category: 'Prefix' },
  { abbreviation: 'COR', meaning: 'Core Insert', category: 'Prefix' },
  { abbreviation: 'SHL', meaning: 'Shell', category: 'Prefix' },
  { abbreviation: 'HT', meaning: 'Heat Tech', category: 'Prefix' },
  { abbreviation: 'PRO', meaning: 'Protective Cover', category: 'Prefix' },
  { abbreviation: 'ACC', meaning: 'Accessory', category: 'Prefix' },
  { abbreviation: 'SW', meaning: 'Swatch', category: 'Prefix' },
  { abbreviation: 'MKT', meaning: 'Marketing', category: 'Prefix' },
  { abbreviation: 'FAB', meaning: 'Fabric', category: 'Prefix' },
  { abbreviation: 'FOM', meaning: 'Foam', category: 'Prefix' },
  { abbreviation: 'FIL', meaning: 'Fill/Batting', category: 'Prefix' },
  { abbreviation: 'HW', meaning: 'Hardware', category: 'Prefix' },
  { abbreviation: 'LBL', meaning: 'Label', category: 'Prefix' },

  // Products
  { abbreviation: 'LCH', meaning: 'Lounge Chair', category: 'Product' },
  { abbreviation: 'LOV', meaning: 'Loveseat', category: 'Product' },
  { abbreviation: 'SOF', meaning: 'Sofa', category: 'Product' },
  { abbreviation: 'HOT', meaning: 'Heated Ottoman', category: 'Product' },
  { abbreviation: 'OTM', meaning: 'Ottoman (non-heated)', category: 'Product' },
  { abbreviation: 'CHS', meaning: 'Chaise Lounge', category: 'Product' },
  { abbreviation: 'SVL', meaning: 'Swivel Chair', category: 'Product' },
  { abbreviation: 'DAC', meaning: 'Dining Arm Chair', category: 'Product' },
  { abbreviation: 'DCH', meaning: 'Dining Side Chair', category: 'Product' },
  { abbreviation: 'CTB', meaning: 'Coffee Table', category: 'Product' },
  { abbreviation: 'STB', meaning: 'Side Table', category: 'Product' },
  { abbreviation: 'SDT', meaning: 'Square Dining Table', category: 'Product' },
  { abbreviation: 'RDT', meaning: 'Rectangle Dining Table', category: 'Product' },

  // Components
  { abbreviation: 'SEAT', meaning: 'Seat', category: 'Component' },
  { abbreviation: 'BACK', meaning: 'Back (foam)', category: 'Component' },
  { abbreviation: 'PILB', meaning: 'Pillow Back', category: 'Component' },
  { abbreviation: 'LS', meaning: 'Lounge Seating', category: 'Component' },
  { abbreviation: 'ST1', meaning: 'Set Type 1 (Seat + Foam Back)', category: 'Component' },
  { abbreviation: 'ST2', meaning: 'Set Type 2 (Seat + Pillow Back)', category: 'Component' },

  // Finishes
  { abbreviation: 'NT', meaning: 'Natural Teak', category: 'Finish' },
  { abbreviation: 'NTK', meaning: 'Natural Teak (finished goods)', category: 'Finish' },
  { abbreviation: 'BLK', meaning: 'Black', category: 'Finish' },
  { abbreviation: 'WHT', meaning: 'White', category: 'Finish' },

  // Heat Tech
  { abbreviation: 'PB', meaning: 'Power Bar', category: 'Heat Tech' },
  { abbreviation: 'MNT', meaning: 'Mount', category: 'Heat Tech' },
  { abbreviation: 'CHG', meaning: 'Charging', category: 'Heat Tech' },
  { abbreviation: 'GPH', meaning: 'Graphene (heating element)', category: 'Heat Tech' },
  { abbreviation: 'G1', meaning: 'Generation 1', category: 'Heat Tech' },
  { abbreviation: 'G1R', meaning: 'Generation 1 Refresh', category: 'Heat Tech' },
  { abbreviation: 'ADPT', meaning: 'Adapter', category: 'Heat Tech' },
  { abbreviation: 'CRT', meaning: 'Cart', category: 'Heat Tech' },
  { abbreviation: 'SPLT', meaning: 'Splitter', category: 'Heat Tech' },
  { abbreviation: 'UNI', meaning: 'Universal', category: 'Heat Tech' },

  // Fabric Patterns
  { abbreviation: 'SUN', meaning: 'Sunbrella', category: 'Fabric Pattern' },
  { abbreviation: 'BAR', meaning: 'Barrier', category: 'Fabric Pattern' },
  { abbreviation: 'WPB', meaning: 'Waterproof Black', category: 'Fabric Pattern' },
  { abbreviation: 'MSH', meaning: 'Mesh', category: 'Fabric Pattern' },
  { abbreviation: 'BLIS', meaning: 'Bliss (pattern)', category: 'Fabric Pattern' },
  { abbreviation: 'BLND', meaning: 'Blend (pattern)', category: 'Fabric Pattern' },
  { abbreviation: 'CAST', meaning: 'Cast (pattern)', category: 'Fabric Pattern' },
  { abbreviation: 'CNVS', meaning: 'Canvas (pattern)', category: 'Fabric Pattern' },
  { abbreviation: 'EXHL', meaning: 'Exhale (pattern)', category: 'Fabric Pattern' },
  { abbreviation: 'HRTG', meaning: 'Heritage (pattern)', category: 'Fabric Pattern' },
  { abbreviation: 'SAIL', meaning: 'Sailcloth (pattern)', category: 'Fabric Pattern' },
  { abbreviation: 'SPTM', meaning: 'Spectrum (pattern)', category: 'Fabric Pattern' },

  // Colors
  { abbreviation: 'ALO', meaning: 'Aloe', category: 'Color' },
  { abbreviation: 'IND', meaning: 'Indigo', category: 'Color' },
  { abbreviation: 'BSQ', meaning: 'Bisque', category: 'Color' },
  { abbreviation: 'SEA', meaning: 'Seaglass', category: 'Color' },
  { abbreviation: 'SND', meaning: 'Sand', category: 'Color' },
  { abbreviation: 'JAV', meaning: 'Java', category: 'Color' },
  { abbreviation: 'DEW', meaning: 'Dewdrop', category: 'Color' },
  { abbreviation: 'CHR', meaning: 'Charcoal', category: 'Color' },
  { abbreviation: 'LEF', meaning: 'Leaf', category: 'Color' },
  { abbreviation: 'SBL', meaning: 'Sable', category: 'Color' },
  { abbreviation: 'GUL', meaning: 'Seagull', category: 'Color' },
  { abbreviation: 'SAH', meaning: 'Sahara', category: 'Color' },
  { abbreviation: 'SLT', meaning: 'Salt', category: 'Color' },
  { abbreviation: 'CBN', meaning: 'Carbon', category: 'Color' },
  { abbreviation: 'DOV', meaning: 'Dove', category: 'Color' },
  { abbreviation: 'ALB', meaning: 'Alabaster', category: 'Color' },
  { abbreviation: 'DRFT', meaning: 'Driftwood', category: 'Color' },
  { abbreviation: 'SAGE', meaning: 'Sage', category: 'Color' },
  { abbreviation: 'STNE', meaning: 'Stone', category: 'Color' },

  // Hardware
  { abbreviation: 'GRM', meaning: 'Grommet', category: 'Hardware' },
  { abbreviation: 'CRDG', meaning: 'Cord Grip', category: 'Hardware' },
  { abbreviation: 'CRDN', meaning: 'Cord Grip Nut', category: 'Hardware' },

  // Labels
  { abbreviation: 'WVN', meaning: 'Woven', category: 'Label' },
  { abbreviation: 'OM', meaning: 'Outmore', category: 'Label' },
  { abbreviation: 'OML', meaning: 'Outmore Living', category: 'Label' },

  // Accessories
  { abbreviation: 'THRW', meaning: 'Throw', category: 'Accessory' },
  { abbreviation: 'CARE', meaning: 'Care Kit', category: 'Accessory' },
  { abbreviation: 'TEAK', meaning: 'Teak', category: 'Accessory' },

  // Marketing
  { abbreviation: 'CAT', meaning: 'Catalog', category: 'Marketing' },
  { abbreviation: 'RES', meaning: 'Residential', category: 'Marketing' },
  { abbreviation: 'HOS', meaning: 'Hospitality', category: 'Marketing' },

  // Other
  { abbreviation: 'KIT', meaning: 'Kit/Bundle', category: 'Other' },
  { abbreviation: 'SM', meaning: 'Small', category: 'Other' },
  { abbreviation: 'LG', meaning: 'Large', category: 'Other' },
  { abbreviation: 'POLY', meaning: 'Polyester', category: 'Other' },
];

// Get all unique categories
export const GLOSSARY_CATEGORIES: AbbreviationCategory[] = [
  'Prefix',
  'Product',
  'Component',
  'Finish',
  'Heat Tech',
  'Fabric Pattern',
  'Color',
  'Hardware',
  'Label',
  'Accessory',
  'Marketing',
  'Other',
];

// Lookup function
export function lookupAbbreviation(code: string): GlossaryEntry | undefined {
  return GLOSSARY.find(entry => entry.abbreviation === code.toUpperCase());
}

// Get entries by category
export function getEntriesByCategory(category: AbbreviationCategory): GlossaryEntry[] {
  return GLOSSARY.filter(entry => entry.category === category);
}

// Search glossary
export function searchGlossary(query: string): GlossaryEntry[] {
  const lowerQuery = query.toLowerCase();
  return GLOSSARY.filter(
    entry =>
      entry.abbreviation.toLowerCase().includes(lowerQuery) ||
      entry.meaning.toLowerCase().includes(lowerQuery)
  );
}
