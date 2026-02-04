// Mermaid diagram definitions for product hierarchy visualization

export const MAIN_HIERARCHY_DIAGRAM = `%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#2F5496', 'primaryTextColor': '#fff', 'primaryBorderColor': '#1a3a6e', 'lineColor': '#5b9bd5', 'secondaryColor': '#70AD47', 'tertiaryColor': '#FFC000'}}}%%
flowchart TB
    subgraph FG["FINISHED GOODS (10000s)"]
        FG1["SOL-LCH-NTK-CBN-ST1<br/>Lounge Chair, Carbon, Standard"]
        FG2["SOL-LCH-NTK-CBN-ST2<br/>Lounge Chair, Carbon, Pillow Back"]
    end

    subgraph FR["FRAMES (30000s)"]
        FR1["FR-SOL-LCH-NT<br/>Lounge Chair Frame"]
    end

    subgraph CSH["CUSHIONS (40000s)"]
        CSH1["CSH-LS-SEAT-CBN<br/>Seat Cushion"]
        CSH2["CSH-LS-BACK-CBN<br/>Back Cushion"]
        CSH3["CSH-LS-PILB-CBN<br/>Pillow Back Cushion"]
    end

    subgraph COR["CORE INSERTS (40500s)"]
        COR1["COR-LS-SEAT<br/>Seat Core"]
        COR2["COR-LS-BACK<br/>Back Core"]
        COR3["COR-LS-PILB<br/>Pillow Back Core"]
    end

    subgraph SHL["SHELLS (50000s)"]
        SHL1["SHL-LS-SEAT-CBN<br/>Seat Shell"]
        SHL2["SHL-LS-BACK-CBN<br/>Back Shell"]
        SHL3["SHL-LS-PILB-CBN<br/>Pillow Back Shell"]
    end

    subgraph HT["HEAT TECH (70000s)"]
        HT1["HT-PB-G1R-151<br/>Power Bar Kit"]
        HT2["HT-CHG-ADPT-90<br/>Charger"]
    end

    subgraph MAT["MATERIALS"]
        MAT1["FAB-SUN-SPTM-CBN<br/>Fabric"]
        MAT2["FOM-LS-SEAT<br/>Foam"]
        MAT3["HT-GPH-LS-SEAT-G1<br/>Heating Element"]
        MAT4["FIL-POLY<br/>Batting"]
    end

    FG1 --> FR1
    FG1 --> CSH1
    FG1 --> CSH2
    FG1 --> HT1

    FG2 --> FR1
    FG2 --> CSH1
    FG2 --> CSH3
    FG2 --> HT1

    CSH1 --> SHL1
    CSH1 --> COR1
    CSH2 --> SHL2
    CSH2 --> COR2
    CSH3 --> SHL3
    CSH3 --> COR3

    HT1 --> HT2

    SHL1 --> MAT1
    COR1 --> MAT2
    COR1 --> MAT3
    COR1 --> MAT4

    classDef finished fill:#2F5496,stroke:#1a3a6e,color:#fff
    classDef frame fill:#5B9BD5,stroke:#2F5496,color:#fff
    classDef cushion fill:#70AD47,stroke:#4a7a30,color:#fff
    classDef core fill:#9DC3E6,stroke:#5B9BD5,color:#000
    classDef shell fill:#A9D18E,stroke:#70AD47,color:#000
    classDef heattech fill:#FFC000,stroke:#bf9000,color:#000
    classDef material fill:#F4B183,stroke:#c55a11,color:#000

    class FG1,FG2 finished
    class FR1 frame
    class CSH1,CSH2,CSH3 cushion
    class COR1,COR2,COR3 core
    class SHL1,SHL2,SHL3 shell
    class HT1,HT2 heattech
    class MAT1,MAT2,MAT3,MAT4 material`;

export const CUSHION_BOM_DIAGRAM = `%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#70AD47'}}}%%
flowchart TB
    CSH["CSH-LS-SEAT-CBN<br/>Seat Cushion, Carbon"]
    SHL["SHL-LS-SEAT-CBN<br/>Seat Shell, Carbon"]
    COR["COR-LS-SEAT<br/>Seat Core Insert"]

    CSH --> SHL
    CSH --> COR

    FAB["FAB-SUN-SPTM-CBN<br/>Fabric (3 sqft)"]
    LBL["LBL-WVN-OM<br/>Woven Label"]

    SHL --> FAB
    SHL --> LBL

    FOM["FOM-LS-SEAT<br/>Foam"]
    FIL["FIL-POLY<br/>Batting (0.5 lb)"]
    BAR1["FAB-BAR-WPB<br/>Waterproof Barrier"]
    BAR2["FAB-BAR-MSH<br/>Mesh Barrier"]
    GPH["HT-GPH-LS-SEAT-G1<br/>Heating Element"]
    HW["Hardware<br/>(Grommets, Cord Grip)"]

    COR --> FOM
    COR --> FIL
    COR --> BAR1
    COR --> BAR2
    COR --> GPH
    COR --> HW

    classDef cushion fill:#70AD47,stroke:#4a7a30,color:#fff
    classDef shell fill:#A9D18E,stroke:#70AD47,color:#000
    classDef core fill:#9DC3E6,stroke:#5B9BD5,color:#000
    classDef material fill:#F4B183,stroke:#c55a11,color:#000

    class CSH cushion
    class SHL shell
    class COR core
    class FAB,LBL,FOM,FIL,BAR1,BAR2,GPH,HW material`;

export const PART_NUMBER_RANGES_DIAGRAM = `%%{init: {'theme': 'base'}}%%
flowchart LR
    subgraph ranges["PART NUMBER RANGES"]
        direction TB
        R1["10000-19999<br/>Finished Goods"]
        R2["30000-39999<br/>Frames"]
        R3["40000-40499<br/>Cushions"]
        R4["40500-49999<br/>Core Inserts"]
        R5["50000-59999<br/>Shells"]
        R6["60000-69999<br/>Protective Covers"]
        R7["70000-79999<br/>Heat Tech"]
        R8["80000-89999<br/>Accessories"]
        R9["90000-99999<br/>Marketing"]
    end

    classDef finished fill:#2F5496,color:#fff
    classDef frame fill:#5B9BD5,color:#fff
    classDef cushion fill:#70AD47,color:#fff
    classDef core fill:#9DC3E6,color:#000
    classDef shell fill:#A9D18E,color:#000
    classDef cover fill:#8E44AD,color:#fff
    classDef heat fill:#FFC000,color:#000
    classDef accessory fill:#E67E22,color:#fff
    classDef marketing fill:#95A5A6,color:#fff

    class R1 finished
    class R2 frame
    class R3 cushion
    class R4 core
    class R5 shell
    class R6 cover
    class R7 heat
    class R8 accessory
    class R9 marketing`;

export const SKU_PATTERN_DIAGRAM = `%%{init: {'theme': 'base'}}%%
flowchart TB
    subgraph FG["Finished Good SKU Pattern"]
        direction LR
        F1["SOL"] --> F2["LCH"] --> F3["NTK"] --> F4["CBN"] --> F5["ST1"]
        F1b["Collection"] -.-> F1
        F2b["Product"] -.-> F2
        F3b["Finish"] -.-> F3
        F4b["Fabric"] -.-> F4
        F5b["Set Type"] -.-> F5
    end

    subgraph CSH["Cushion SKU Pattern"]
        direction LR
        C1["CSH"] --> C2["LS"] --> C3["SEAT"] --> C4["CBN"]
        C1b["Prefix"] -.-> C1
        C2b["Seating"] -.-> C2
        C3b["Component"] -.-> C3
        C4b["Fabric"] -.-> C4
    end

    subgraph COR["Core Insert SKU Pattern"]
        direction LR
        O1["COR"] --> O2["LS"] --> O3["SEAT"]
        O1b["Prefix"] -.-> O1
        O2b["Seating"] -.-> O2
        O3b["Component"] -.-> O3
        note["No fabric code!<br/>Universal across colors"]
    end`;

// Map of diagram IDs to their content
export const DIAGRAMS: Record<string, string> = {
  'main-hierarchy': MAIN_HIERARCHY_DIAGRAM,
  'cushion-bom': CUSHION_BOM_DIAGRAM,
  'part-number-ranges': PART_NUMBER_RANGES_DIAGRAM,
  'sku-patterns': SKU_PATTERN_DIAGRAM,
};

export function getDiagram(id: string): string | undefined {
  return DIAGRAMS[id];
}
