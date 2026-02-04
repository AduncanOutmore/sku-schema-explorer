// Abbreviation category types
export type AbbreviationCategory =
  | 'Prefix'
  | 'Product'
  | 'Component'
  | 'Finish'
  | 'Heat Tech'
  | 'Fabric Pattern'
  | 'Color'
  | 'Hardware'
  | 'Label'
  | 'Accessory'
  | 'Marketing'
  | 'Other';

// Glossary entry interface
export interface GlossaryEntry {
  abbreviation: string;
  meaning: string;
  category: AbbreviationCategory;
  examples?: string[];
  notes?: string;
}

// Grouped glossary for display
export interface GroupedGlossary {
  category: AbbreviationCategory;
  entries: GlossaryEntry[];
}
