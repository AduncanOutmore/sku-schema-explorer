import { BomRelation } from '@/types/bom';

// BOM relations with template patterns
// {COLOR} is replaced with the actual fabric color code at runtime
export const BOM_TEMPLATES: BomRelation[] = [
  // ===== FINISHED GOODS -> COMPONENTS =====
  // All finished goods are ST1 only (pillow back ST2 was removed)

  // Lounge Chair: Frame + Cushion Set + Power Bar
  { parentSku: 'SOL-LCH-NTK-{COLOR}-ST1', componentSku: 'FRM-SOL-LCH', componentName: 'Frame, Solerno Lounge Chair', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-LCH-NTK-{COLOR}-ST1', componentSku: 'CUS-LS-SET-{COLOR}', componentName: 'Cushion Set', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-LCH-NTK-{COLOR}-ST1', componentSku: 'HT-PB-G1R-151', componentName: 'Power Bar Kit', quantity: 1, unit: 'ea' },

  // Loveseat (2 cushion sets)
  { parentSku: 'SOL-LOV-NTK-{COLOR}-ST1', componentSku: 'FRM-SOL-LOV', componentName: 'Frame, Solerno Loveseat', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-LOV-NTK-{COLOR}-ST1', componentSku: 'CUS-LS-SET-{COLOR}', componentName: 'Cushion Set', quantity: 2, unit: 'ea' },
  { parentSku: 'SOL-LOV-NTK-{COLOR}-ST1', componentSku: 'HT-PB-G1R-151', componentName: 'Power Bar Kit', quantity: 1, unit: 'ea' },

  // Sofa (3 cushion sets)
  { parentSku: 'SOL-SOF-NTK-{COLOR}-ST1', componentSku: 'FRM-SOL-SOF', componentName: 'Frame, Solerno Sofa', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-SOF-NTK-{COLOR}-ST1', componentSku: 'CUS-LS-SET-{COLOR}', componentName: 'Cushion Set', quantity: 3, unit: 'ea' },
  { parentSku: 'SOL-SOF-NTK-{COLOR}-ST1', componentSku: 'HT-PB-G1R-151', componentName: 'Power Bar Kit', quantity: 1, unit: 'ea' },

  // Heated Ottoman (seat only, no back)
  { parentSku: 'SOL-HOT-NTK-{COLOR}-ST1', componentSku: 'FRM-SOL-HOT', componentName: 'Frame, Solerno Heated Ottoman', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-HOT-NTK-{COLOR}-ST1', componentSku: 'CUS-LS-SET-{COLOR}', componentName: 'Cushion Set', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-HOT-NTK-{COLOR}-ST1', componentSku: 'HT-PB-G1R-151', componentName: 'Power Bar Kit', quantity: 1, unit: 'ea' },

  // Chaise Lounge
  { parentSku: 'SOL-CHS-NTK-{COLOR}-ST1', componentSku: 'FRM-SOL-CHS', componentName: 'Frame, Solerno Chaise Lounge', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-CHS-NTK-{COLOR}-ST1', componentSku: 'CUS-LS-SET-{COLOR}', componentName: 'Cushion Set', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-CHS-NTK-{COLOR}-ST1', componentSku: 'HT-PB-G1R-151', componentName: 'Power Bar Kit', quantity: 1, unit: 'ea' },

  // Swivel Chair
  { parentSku: 'SOL-SVL-NTK-{COLOR}-ST1', componentSku: 'FRM-SOL-SVL', componentName: 'Frame, Solerno Swivel Chair', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-SVL-NTK-{COLOR}-ST1', componentSku: 'CUS-LS-SET-{COLOR}', componentName: 'Cushion Set', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-SVL-NTK-{COLOR}-ST1', componentSku: 'HT-PB-G1R-151', componentName: 'Power Bar Kit', quantity: 1, unit: 'ea' },

  // Dining Arm Chair
  { parentSku: 'SOL-DAC-NTK-{COLOR}-ST1', componentSku: 'FRM-SOL-DAC', componentName: 'Frame, Solerno Dining Arm Chair', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-DAC-NTK-{COLOR}-ST1', componentSku: 'CUS-LS-SET-{COLOR}', componentName: 'Cushion Set', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-DAC-NTK-{COLOR}-ST1', componentSku: 'HT-PB-G1R-151', componentName: 'Power Bar Kit', quantity: 1, unit: 'ea' },

  // Dining Side Chair
  { parentSku: 'SOL-DCH-NTK-{COLOR}-ST1', componentSku: 'FRM-SOL-DCH', componentName: 'Frame, Solerno Dining Side Chair', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-DCH-NTK-{COLOR}-ST1', componentSku: 'CUS-LS-SET-{COLOR}', componentName: 'Cushion Set', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-DCH-NTK-{COLOR}-ST1', componentSku: 'HT-PB-G1R-151', componentName: 'Power Bar Kit', quantity: 1, unit: 'ea' },

  // ===== CUSHION SET -> SHELLS + CORE INSERT SET =====
  { parentSku: 'CUS-LS-SET-{COLOR}', componentSku: 'SHL-SEAT-{COLOR}', componentName: 'Shell, Seat', quantity: 1, unit: 'ea' },
  { parentSku: 'CUS-LS-SET-{COLOR}', componentSku: 'SHL-BACK-{COLOR}', componentName: 'Shell, Back', quantity: 1, unit: 'ea' },
  { parentSku: 'CUS-LS-SET-{COLOR}', componentSku: 'COR-LS-SET', componentName: 'Core Insert Set', quantity: 1, unit: 'ea' },

  // ===== SHELLS -> FABRIC + LABEL + HARDWARE =====
  // Seat Shell
  { parentSku: 'SHL-SEAT-{COLOR}', componentSku: 'FAB-SUN-{PATTERN}-{COLOR}', componentName: 'Sunbrella Fabric', quantity: 3, unit: 'sqft' },
  { parentSku: 'SHL-SEAT-{COLOR}', componentSku: 'LBL-WVN-OM', componentName: 'Woven Label, Outmore', quantity: 1, unit: 'ea' },
  { parentSku: 'SHL-SEAT-{COLOR}', componentSku: 'HW-GRM-4', componentName: 'Snap Grommet #4', quantity: 1, unit: 'ea' },
  { parentSku: 'SHL-SEAT-{COLOR}', componentSku: 'HW-GRM-CUS', componentName: 'Custom Grommet', quantity: 1, unit: 'ea' },

  // Back Shell
  { parentSku: 'SHL-BACK-{COLOR}', componentSku: 'FAB-SUN-{PATTERN}-{COLOR}', componentName: 'Sunbrella Fabric', quantity: 2.5, unit: 'sqft' },
  { parentSku: 'SHL-BACK-{COLOR}', componentSku: 'LBL-WVN-OM', componentName: 'Woven Label, Outmore', quantity: 1, unit: 'ea' },
  { parentSku: 'SHL-BACK-{COLOR}', componentSku: 'HW-GRM-4', componentName: 'Snap Grommet #4', quantity: 1, unit: 'ea' },

  // ===== CORE INSERT SET -> INDIVIDUAL INSERTS =====
  { parentSku: 'COR-LS-SET', componentSku: 'COR-LS-SEAT', componentName: 'Core Insert, Seat', quantity: 1, unit: 'ea' },
  { parentSku: 'COR-LS-SET', componentSku: 'COR-LS-BACK', componentName: 'Core Insert, Back', quantity: 1, unit: 'ea' },

  // ===== CORE INSERTS -> MATERIALS + HARDWARE =====
  // Seat Core - 2 cord grips (dual heating zones)
  { parentSku: 'COR-LS-SEAT', componentSku: 'FOM-LS-SEAT', componentName: 'Foam, LS Seat', quantity: 1, unit: 'ea' },
  { parentSku: 'COR-LS-SEAT', componentSku: 'FIL-POLY', componentName: 'Polyester Batting', quantity: 0.5, unit: 'lb' },
  { parentSku: 'COR-LS-SEAT', componentSku: 'FAB-BAR-WPB', componentName: 'Barrier, Waterproof Black', quantity: 2, unit: 'sqft' },
  { parentSku: 'COR-LS-SEAT', componentSku: 'FAB-BAR-MSH', componentName: 'Barrier, Mesh', quantity: 1, unit: 'sqft' },
  { parentSku: 'COR-LS-SEAT', componentSku: 'HT-GPH-LS-SEAT-G1', componentName: 'Graphene Heating Element', quantity: 1, unit: 'ea' },
  { parentSku: 'COR-LS-SEAT', componentSku: 'HW-CRDG', componentName: 'Cord Grip', quantity: 2, unit: 'ea' },
  { parentSku: 'COR-LS-SEAT', componentSku: 'HW-CRDN', componentName: 'Cord Grip Nut', quantity: 2, unit: 'ea' },

  // Back Core - 1 cord grip
  { parentSku: 'COR-LS-BACK', componentSku: 'FOM-LS-BACK', componentName: 'Foam, LS Back', quantity: 1, unit: 'ea' },
  { parentSku: 'COR-LS-BACK', componentSku: 'FIL-POLY', componentName: 'Polyester Batting', quantity: 0.4, unit: 'lb' },
  { parentSku: 'COR-LS-BACK', componentSku: 'FAB-BAR-WPB', componentName: 'Barrier, Waterproof Black', quantity: 1.5, unit: 'sqft' },
  { parentSku: 'COR-LS-BACK', componentSku: 'FAB-BAR-MSH', componentName: 'Barrier, Mesh', quantity: 0.75, unit: 'sqft' },
  { parentSku: 'COR-LS-BACK', componentSku: 'HT-GPH-LS-BACK-G1', componentName: 'Graphene Heating Element', quantity: 1, unit: 'ea' },
  { parentSku: 'COR-LS-BACK', componentSku: 'HW-CRDG', componentName: 'Cord Grip', quantity: 1, unit: 'ea' },
  { parentSku: 'COR-LS-BACK', componentSku: 'HW-CRDN', componentName: 'Cord Grip Nut', quantity: 1, unit: 'ea' },

  // ===== OTTOMAN FINISHED GOODS -> COMPONENTS =====

  // Ottoman: Frame + Cushion
  { parentSku: 'SOL-OTM-NTK-{COLOR}-ST1', componentSku: 'FRM-SOL-OTM', componentName: 'Frame, Ottoman', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-OTM-NTK-{COLOR}-ST1', componentSku: 'CUS-OTM-{COLOR}', componentName: 'Cushion, Ottoman', quantity: 1, unit: 'ea' },

  // Heated Ottoman: Frame + Heated Cushion + Power Bar
  { parentSku: 'SOL-HOT-NTK-{COLOR}-ST1', componentSku: 'FRM-SOL-HOT', componentName: 'Frame, Heated Ottoman', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-HOT-NTK-{COLOR}-ST1', componentSku: 'CUS-HOT-{COLOR}', componentName: 'Cushion, Heated Ottoman', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-HOT-NTK-{COLOR}-ST1', componentSku: 'HT-PB-G1R-151', componentName: 'Power Bar Kit', quantity: 1, unit: 'ea' },

  // ===== OTTOMAN CUSHIONS -> SHELL + CORE INSERT =====
  { parentSku: 'CUS-OTM-{COLOR}', componentSku: 'SHL-OTM-{COLOR}', componentName: 'Shell, Ottoman', quantity: 1, unit: 'ea' },
  { parentSku: 'CUS-OTM-{COLOR}', componentSku: 'COR-OTM', componentName: 'Core Insert, Ottoman', quantity: 1, unit: 'ea' },

  { parentSku: 'CUS-HOT-{COLOR}', componentSku: 'SHL-HOT-{COLOR}', componentName: 'Shell, Heated Ottoman', quantity: 1, unit: 'ea' },
  { parentSku: 'CUS-HOT-{COLOR}', componentSku: 'COR-HOT', componentName: 'Core Insert, Heated Ottoman', quantity: 1, unit: 'ea' },

  // ===== OTTOMAN SHELLS -> MATERIALS =====
  // Heated Ottoman Shell: fabric + label + #4 grommet + Mozaic op
  { parentSku: 'SHL-HOT-{COLOR}', componentSku: 'FAB-SUN-{PATTERN}-{COLOR}', componentName: 'Sunbrella Fabric', quantity: 1, unit: 'ea' },
  { parentSku: 'SHL-HOT-{COLOR}', componentSku: 'LBL-WVN-OM', componentName: 'Woven Label, Outmore', quantity: 1, unit: 'ea' },
  { parentSku: 'SHL-HOT-{COLOR}', componentSku: 'HW-GRM-4', componentName: 'Snap Grommet #4', quantity: 1, unit: 'ea' },

  // Ottoman Shell: fabric + label (no grommet) + Mozaic op
  { parentSku: 'SHL-OTM-{COLOR}', componentSku: 'FAB-SUN-{PATTERN}-{COLOR}', componentName: 'Sunbrella Fabric', quantity: 1, unit: 'ea' },
  { parentSku: 'SHL-OTM-{COLOR}', componentSku: 'LBL-WVN-OM', componentName: 'Woven Label, Outmore', quantity: 1, unit: 'ea' },

  // ===== OTTOMAN CORE INSERTS -> MATERIALS =====
  // Heated Ottoman Core: foam + batting + barrier + mesh + heating pad + #6 grommet + cord grip + nut
  { parentSku: 'COR-HOT', componentSku: 'FOM-HOT', componentName: 'Foam, Heated Ottoman', quantity: 1, unit: 'ea' },
  { parentSku: 'COR-HOT', componentSku: 'FIL-POLY', componentName: 'Polyester Batting', quantity: 1, unit: 'ea' },
  { parentSku: 'COR-HOT', componentSku: 'FAB-BAR-WPB', componentName: 'Barrier, Waterproof Black', quantity: 1, unit: 'ea' },
  { parentSku: 'COR-HOT', componentSku: 'FAB-BAR-MSH', componentName: 'Barrier, Mesh', quantity: 1, unit: 'ea' },
  { parentSku: 'COR-HOT', componentSku: 'HT-GPH-HO-SEAT-G1', componentName: 'Heating Pad, Ottoman', quantity: 1, unit: 'ea' },
  { parentSku: 'COR-HOT', componentSku: 'HW-GRM-6', componentName: 'Snap-On Grommet #6', quantity: 1, unit: 'ea' },
  { parentSku: 'COR-HOT', componentSku: 'HW-CRDG', componentName: 'Cord Grip', quantity: 1, unit: 'ea' },
  { parentSku: 'COR-HOT', componentSku: 'HW-CRDN', componentName: 'Cord Grip Nut', quantity: 1, unit: 'ea' },

  // Ottoman Core: foam + batting + barrier + mesh (no heating, no grommet, no cord grip)
  { parentSku: 'COR-OTM', componentSku: 'FOM-OTM', componentName: 'Foam, Ottoman', quantity: 1, unit: 'ea' },
  { parentSku: 'COR-OTM', componentSku: 'FIL-POLY', componentName: 'Polyester Batting', quantity: 1, unit: 'ea' },
  { parentSku: 'COR-OTM', componentSku: 'FAB-BAR-WPB', componentName: 'Barrier, Waterproof Black', quantity: 1, unit: 'ea' },
  { parentSku: 'COR-OTM', componentSku: 'FAB-BAR-MSH', componentName: 'Barrier, Mesh', quantity: 1, unit: 'ea' },

  // ===== POWER BAR KIT -> COMPONENTS =====
  { parentSku: 'HT-PB-G1R-151', componentSku: 'HT-PB-UNIT-G1R', componentName: 'Power Bar Unit', quantity: 1, unit: 'ea' },
  { parentSku: 'HT-PB-G1R-151', componentSku: 'HT-CHG-ADPT-90', componentName: 'Charging Adapter, 90W', quantity: 1, unit: 'ea' },
];
