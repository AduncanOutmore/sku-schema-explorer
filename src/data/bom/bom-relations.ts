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

  // ===== POWER BAR KIT -> COMPONENTS =====
  { parentSku: 'HT-PB-G1R-151', componentSku: 'HT-PB-UNIT-G1R', componentName: 'Power Bar Unit', quantity: 1, unit: 'ea' },
  { parentSku: 'HT-PB-G1R-151', componentSku: 'HT-CHG-ADPT-90', componentName: 'Charging Adapter, 90W', quantity: 1, unit: 'ea' },
];
