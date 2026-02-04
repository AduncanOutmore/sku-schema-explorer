import { BomRelation } from '@/types/bom';

// BOM relations with template patterns
// {COLOR} is replaced with the actual fabric color code at runtime
export const BOM_TEMPLATES: BomRelation[] = [
  // ===== FINISHED GOODS -> COMPONENTS =====

  // Standard Set (ST1): Frame + Seat Cushion + Back Cushion + Power Bar
  { parentSku: 'SOL-LCH-NTK-{COLOR}-ST1', componentSku: 'FR-SOL-LCH-NTK', componentName: 'Frame, Solerno Lounge Chair', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-LCH-NTK-{COLOR}-ST1', componentSku: 'CSH-LS-SEAT-{COLOR}', componentName: 'Seat Cushion', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-LCH-NTK-{COLOR}-ST1', componentSku: 'CSH-LS-BACK-{COLOR}', componentName: 'Back Cushion', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-LCH-NTK-{COLOR}-ST1', componentSku: 'HT-PB-G1R-151', componentName: 'Power Bar Kit', quantity: 1, unit: 'ea' },

  // Pillow Back Set (ST2): Frame + Seat Cushion + Pillow Back Cushion + Power Bar
  { parentSku: 'SOL-LCH-NTK-{COLOR}-ST2', componentSku: 'FR-SOL-LCH-NTK', componentName: 'Frame, Solerno Lounge Chair', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-LCH-NTK-{COLOR}-ST2', componentSku: 'CSH-LS-SEAT-{COLOR}', componentName: 'Seat Cushion', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-LCH-NTK-{COLOR}-ST2', componentSku: 'CSH-LS-PILB-{COLOR}', componentName: 'Pillow Back Cushion', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-LCH-NTK-{COLOR}-ST2', componentSku: 'HT-PB-G1R-151', componentName: 'Power Bar Kit', quantity: 1, unit: 'ea' },

  // Loveseat (2 seat cushions)
  { parentSku: 'SOL-LOV-NTK-{COLOR}-ST1', componentSku: 'FR-SOL-LOV-NTK', componentName: 'Frame, Solerno Loveseat', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-LOV-NTK-{COLOR}-ST1', componentSku: 'CSH-LS-SEAT-{COLOR}', componentName: 'Seat Cushion', quantity: 2, unit: 'ea' },
  { parentSku: 'SOL-LOV-NTK-{COLOR}-ST1', componentSku: 'CSH-LS-BACK-{COLOR}', componentName: 'Back Cushion', quantity: 2, unit: 'ea' },
  { parentSku: 'SOL-LOV-NTK-{COLOR}-ST1', componentSku: 'HT-PB-G1R-151', componentName: 'Power Bar Kit', quantity: 1, unit: 'ea' },

  { parentSku: 'SOL-LOV-NTK-{COLOR}-ST2', componentSku: 'FR-SOL-LOV-NTK', componentName: 'Frame, Solerno Loveseat', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-LOV-NTK-{COLOR}-ST2', componentSku: 'CSH-LS-SEAT-{COLOR}', componentName: 'Seat Cushion', quantity: 2, unit: 'ea' },
  { parentSku: 'SOL-LOV-NTK-{COLOR}-ST2', componentSku: 'CSH-LS-PILB-{COLOR}', componentName: 'Pillow Back Cushion', quantity: 2, unit: 'ea' },
  { parentSku: 'SOL-LOV-NTK-{COLOR}-ST2', componentSku: 'HT-PB-G1R-151', componentName: 'Power Bar Kit', quantity: 1, unit: 'ea' },

  // Sofa (3 seat cushions)
  { parentSku: 'SOL-SOF-NTK-{COLOR}-ST1', componentSku: 'FR-SOL-SOF-NTK', componentName: 'Frame, Solerno Sofa', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-SOF-NTK-{COLOR}-ST1', componentSku: 'CSH-LS-SEAT-{COLOR}', componentName: 'Seat Cushion', quantity: 3, unit: 'ea' },
  { parentSku: 'SOL-SOF-NTK-{COLOR}-ST1', componentSku: 'CSH-LS-BACK-{COLOR}', componentName: 'Back Cushion', quantity: 3, unit: 'ea' },
  { parentSku: 'SOL-SOF-NTK-{COLOR}-ST1', componentSku: 'HT-PB-G1R-151', componentName: 'Power Bar Kit', quantity: 1, unit: 'ea' },

  { parentSku: 'SOL-SOF-NTK-{COLOR}-ST2', componentSku: 'FR-SOL-SOF-NTK', componentName: 'Frame, Solerno Sofa', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-SOF-NTK-{COLOR}-ST2', componentSku: 'CSH-LS-SEAT-{COLOR}', componentName: 'Seat Cushion', quantity: 3, unit: 'ea' },
  { parentSku: 'SOL-SOF-NTK-{COLOR}-ST2', componentSku: 'CSH-LS-PILB-{COLOR}', componentName: 'Pillow Back Cushion', quantity: 3, unit: 'ea' },
  { parentSku: 'SOL-SOF-NTK-{COLOR}-ST2', componentSku: 'HT-PB-G1R-151', componentName: 'Power Bar Kit', quantity: 1, unit: 'ea' },

  // Heated Ottoman (seat only, no back)
  { parentSku: 'SOL-HOT-NTK-{COLOR}-ST1', componentSku: 'FR-SOL-HOT-NTK', componentName: 'Frame, Solerno Heated Ottoman', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-HOT-NTK-{COLOR}-ST1', componentSku: 'CSH-LS-SEAT-{COLOR}', componentName: 'Seat Cushion', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-HOT-NTK-{COLOR}-ST1', componentSku: 'HT-PB-G1R-151', componentName: 'Power Bar Kit', quantity: 1, unit: 'ea' },

  { parentSku: 'SOL-HOT-NTK-{COLOR}-ST2', componentSku: 'FR-SOL-HOT-NTK', componentName: 'Frame, Solerno Heated Ottoman', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-HOT-NTK-{COLOR}-ST2', componentSku: 'CSH-LS-SEAT-{COLOR}', componentName: 'Seat Cushion', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-HOT-NTK-{COLOR}-ST2', componentSku: 'HT-PB-G1R-151', componentName: 'Power Bar Kit', quantity: 1, unit: 'ea' },

  // Chaise Lounge
  { parentSku: 'SOL-CHS-NTK-{COLOR}-ST1', componentSku: 'FR-SOL-CHS-NTK', componentName: 'Frame, Solerno Chaise Lounge', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-CHS-NTK-{COLOR}-ST1', componentSku: 'CSH-LS-SEAT-{COLOR}', componentName: 'Seat Cushion', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-CHS-NTK-{COLOR}-ST1', componentSku: 'CSH-LS-BACK-{COLOR}', componentName: 'Back Cushion', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-CHS-NTK-{COLOR}-ST1', componentSku: 'HT-PB-G1R-151', componentName: 'Power Bar Kit', quantity: 1, unit: 'ea' },

  { parentSku: 'SOL-CHS-NTK-{COLOR}-ST2', componentSku: 'FR-SOL-CHS-NTK', componentName: 'Frame, Solerno Chaise Lounge', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-CHS-NTK-{COLOR}-ST2', componentSku: 'CSH-LS-SEAT-{COLOR}', componentName: 'Seat Cushion', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-CHS-NTK-{COLOR}-ST2', componentSku: 'CSH-LS-PILB-{COLOR}', componentName: 'Pillow Back Cushion', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-CHS-NTK-{COLOR}-ST2', componentSku: 'HT-PB-G1R-151', componentName: 'Power Bar Kit', quantity: 1, unit: 'ea' },

  // Swivel Chair
  { parentSku: 'SOL-SVL-NTK-{COLOR}-ST1', componentSku: 'FR-SOL-SVL-NTK', componentName: 'Frame, Solerno Swivel Chair', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-SVL-NTK-{COLOR}-ST1', componentSku: 'CSH-LS-SEAT-{COLOR}', componentName: 'Seat Cushion', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-SVL-NTK-{COLOR}-ST1', componentSku: 'CSH-LS-BACK-{COLOR}', componentName: 'Back Cushion', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-SVL-NTK-{COLOR}-ST1', componentSku: 'HT-PB-G1R-151', componentName: 'Power Bar Kit', quantity: 1, unit: 'ea' },

  { parentSku: 'SOL-SVL-NTK-{COLOR}-ST2', componentSku: 'FR-SOL-SVL-NTK', componentName: 'Frame, Solerno Swivel Chair', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-SVL-NTK-{COLOR}-ST2', componentSku: 'CSH-LS-SEAT-{COLOR}', componentName: 'Seat Cushion', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-SVL-NTK-{COLOR}-ST2', componentSku: 'CSH-LS-PILB-{COLOR}', componentName: 'Pillow Back Cushion', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-SVL-NTK-{COLOR}-ST2', componentSku: 'HT-PB-G1R-151', componentName: 'Power Bar Kit', quantity: 1, unit: 'ea' },

  // Dining Arm Chair
  { parentSku: 'SOL-DAC-NTK-{COLOR}-ST1', componentSku: 'FR-SOL-DAC-NTK', componentName: 'Frame, Solerno Dining Arm Chair', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-DAC-NTK-{COLOR}-ST1', componentSku: 'CSH-LS-SEAT-{COLOR}', componentName: 'Seat Cushion', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-DAC-NTK-{COLOR}-ST1', componentSku: 'CSH-LS-BACK-{COLOR}', componentName: 'Back Cushion', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-DAC-NTK-{COLOR}-ST1', componentSku: 'HT-PB-G1R-151', componentName: 'Power Bar Kit', quantity: 1, unit: 'ea' },

  { parentSku: 'SOL-DAC-NTK-{COLOR}-ST2', componentSku: 'FR-SOL-DAC-NTK', componentName: 'Frame, Solerno Dining Arm Chair', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-DAC-NTK-{COLOR}-ST2', componentSku: 'CSH-LS-SEAT-{COLOR}', componentName: 'Seat Cushion', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-DAC-NTK-{COLOR}-ST2', componentSku: 'CSH-LS-PILB-{COLOR}', componentName: 'Pillow Back Cushion', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-DAC-NTK-{COLOR}-ST2', componentSku: 'HT-PB-G1R-151', componentName: 'Power Bar Kit', quantity: 1, unit: 'ea' },

  // Dining Side Chair
  { parentSku: 'SOL-DCH-NTK-{COLOR}-ST1', componentSku: 'FR-SOL-DCH-NTK', componentName: 'Frame, Solerno Dining Side Chair', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-DCH-NTK-{COLOR}-ST1', componentSku: 'CSH-LS-SEAT-{COLOR}', componentName: 'Seat Cushion', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-DCH-NTK-{COLOR}-ST1', componentSku: 'CSH-LS-BACK-{COLOR}', componentName: 'Back Cushion', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-DCH-NTK-{COLOR}-ST1', componentSku: 'HT-PB-G1R-151', componentName: 'Power Bar Kit', quantity: 1, unit: 'ea' },

  { parentSku: 'SOL-DCH-NTK-{COLOR}-ST2', componentSku: 'FR-SOL-DCH-NTK', componentName: 'Frame, Solerno Dining Side Chair', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-DCH-NTK-{COLOR}-ST2', componentSku: 'CSH-LS-SEAT-{COLOR}', componentName: 'Seat Cushion', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-DCH-NTK-{COLOR}-ST2', componentSku: 'CSH-LS-PILB-{COLOR}', componentName: 'Pillow Back Cushion', quantity: 1, unit: 'ea' },
  { parentSku: 'SOL-DCH-NTK-{COLOR}-ST2', componentSku: 'HT-PB-G1R-151', componentName: 'Power Bar Kit', quantity: 1, unit: 'ea' },

  // ===== CUSHIONS -> SHELL + CORE =====
  { parentSku: 'CSH-LS-SEAT-{COLOR}', componentSku: 'SHL-LS-SEAT-{COLOR}', componentName: 'Shell, Seat', quantity: 1, unit: 'ea' },
  { parentSku: 'CSH-LS-SEAT-{COLOR}', componentSku: 'COR-LS-SEAT', componentName: 'Core Insert, Seat', quantity: 1, unit: 'ea' },

  { parentSku: 'CSH-LS-BACK-{COLOR}', componentSku: 'SHL-LS-BACK-{COLOR}', componentName: 'Shell, Back', quantity: 1, unit: 'ea' },
  { parentSku: 'CSH-LS-BACK-{COLOR}', componentSku: 'COR-LS-BACK', componentName: 'Core Insert, Back', quantity: 1, unit: 'ea' },

  { parentSku: 'CSH-LS-PILB-{COLOR}', componentSku: 'SHL-LS-PILB-{COLOR}', componentName: 'Shell, Pillow Back', quantity: 1, unit: 'ea' },
  { parentSku: 'CSH-LS-PILB-{COLOR}', componentSku: 'COR-LS-PILB', componentName: 'Core Insert, Pillow Back', quantity: 1, unit: 'ea' },

  // ===== SHELLS -> FABRIC + LABEL + HARDWARE =====
  // Seat Shell - includes snap grommet and custom grommet
  { parentSku: 'SHL-LS-SEAT-{COLOR}', componentSku: 'FAB-SUN-{PATTERN}-{COLOR}', componentName: 'Sunbrella Fabric', quantity: 3, unit: 'sqft' },
  { parentSku: 'SHL-LS-SEAT-{COLOR}', componentSku: 'LBL-WVN-OM', componentName: 'Woven Label, Outmore', quantity: 1, unit: 'ea' },
  { parentSku: 'SHL-LS-SEAT-{COLOR}', componentSku: 'HW-GRM-4', componentName: 'Snap Grommet #4', quantity: 1, unit: 'ea' },
  { parentSku: 'SHL-LS-SEAT-{COLOR}', componentSku: 'HW-GRM-CUS', componentName: 'Custom Grommet', quantity: 1, unit: 'ea' },

  // Back Shell - includes snap grommet
  { parentSku: 'SHL-LS-BACK-{COLOR}', componentSku: 'FAB-SUN-{PATTERN}-{COLOR}', componentName: 'Sunbrella Fabric', quantity: 2.5, unit: 'sqft' },
  { parentSku: 'SHL-LS-BACK-{COLOR}', componentSku: 'LBL-WVN-OM', componentName: 'Woven Label, Outmore', quantity: 1, unit: 'ea' },
  { parentSku: 'SHL-LS-BACK-{COLOR}', componentSku: 'HW-GRM-4', componentName: 'Snap Grommet #4', quantity: 1, unit: 'ea' },

  // Pillow Back Shell - includes snap grommet
  { parentSku: 'SHL-LS-PILB-{COLOR}', componentSku: 'FAB-SUN-{PATTERN}-{COLOR}', componentName: 'Sunbrella Fabric', quantity: 2, unit: 'sqft' },
  { parentSku: 'SHL-LS-PILB-{COLOR}', componentSku: 'LBL-WVN-OM', componentName: 'Woven Label, Outmore', quantity: 1, unit: 'ea' },
  { parentSku: 'SHL-LS-PILB-{COLOR}', componentSku: 'HW-GRM-4', componentName: 'Snap Grommet #4', quantity: 1, unit: 'ea' },

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

  // Pillow Back Core - 1 cord grip
  { parentSku: 'COR-LS-PILB', componentSku: 'FOM-LS-PILB', componentName: 'Foam, LS Pillow Back', quantity: 1, unit: 'ea' },
  { parentSku: 'COR-LS-PILB', componentSku: 'FIL-POLY', componentName: 'Polyester Batting', quantity: 0.3, unit: 'lb' },
  { parentSku: 'COR-LS-PILB', componentSku: 'FAB-BAR-WPB', componentName: 'Barrier, Waterproof Black', quantity: 1.2, unit: 'sqft' },
  { parentSku: 'COR-LS-PILB', componentSku: 'FAB-BAR-MSH', componentName: 'Barrier, Mesh', quantity: 0.6, unit: 'sqft' },
  { parentSku: 'COR-LS-PILB', componentSku: 'HT-GPH-LS-PILB-G1', componentName: 'Graphene Heating Element', quantity: 1, unit: 'ea' },
  { parentSku: 'COR-LS-PILB', componentSku: 'HW-CRDG', componentName: 'Cord Grip', quantity: 1, unit: 'ea' },
  { parentSku: 'COR-LS-PILB', componentSku: 'HW-CRDN', componentName: 'Cord Grip Nut', quantity: 1, unit: 'ea' },

  // ===== POWER BAR KIT -> COMPONENTS =====
  { parentSku: 'HT-PB-G1R-151', componentSku: 'HT-PB-G1R-151-UNIT', componentName: 'Power Bar Unit (internal)', quantity: 1, unit: 'ea' },
  { parentSku: 'HT-PB-G1R-151', componentSku: 'HT-CHG-ADPT-90', componentName: 'Charging Adapter, 90W', quantity: 1, unit: 'ea' },
];
