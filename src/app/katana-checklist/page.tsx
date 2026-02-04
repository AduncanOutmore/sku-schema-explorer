'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CheckSquare,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  Package,
  Layers,
  Settings,
  Database,
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  decision?: string;
  important?: boolean;
  links?: { label: string; url: string }[];
}

interface ChecklistSection {
  title: string;
  icon: React.ReactNode;
  description: string;
  items: ChecklistItem[];
}

const CHECKLIST_SECTIONS: ChecklistSection[] = [
  {
    title: 'Item Type Classification',
    icon: <Package className="w-5 h-5" />,
    description: 'Katana has exactly THREE item types. Every item must be one of these.',
    items: [
      {
        id: 'type-product',
        title: 'Product',
        description: 'Items that can be sold to customers AND/OR manufactured in-house. Products can have BOMs.',
        decision: 'Use for: Finished goods, frames, cushions, shells, covers, heat tech kits, and accessories sold to customers.',
        important: true,
      },
      {
        id: 'type-material',
        title: 'Material',
        description: 'Items that are purchased and consumed in production. Materials cannot have BOMs - they are raw inputs.',
        decision: 'Use for: Fabrics, foam, batting, hardware (grommets, cord grips), labels, barrier materials.',
        important: true,
      },
      {
        id: 'type-service',
        title: 'Service',
        description: 'Non-physical items like labor, shipping, or other services. Generally not used for Outmore physical products.',
        decision: 'Use for: Contract manufacturing labor if tracked separately from the item itself.',
      },
    ],
  },
  {
    title: 'Usage Classification',
    icon: <Settings className="w-5 h-5" />,
    description: 'How each item is actually used in your production and sales workflow.',
    items: [
      {
        id: 'usage-mto',
        title: 'Configure-to-Order (CTO)',
        description: 'Furniture SETS are configured and assembled when ordered. Individual pieces (frames, cushions) are pre-built.',
        decision: 'Use for: Furniture sets (SOL-LCH-NTK-CBN-ST1) - these are configured combinations of pre-built pieces assembled at order time.',
        important: true,
        links: [
          { label: 'Katana MTO Guide', url: 'https://support.katanamrp.com/hc/en-us/articles/4403780481937-Make-to-Order-MTO-' },
        ],
      },
      {
        id: 'usage-subassembly',
        title: 'Subassembly (Pre-built)',
        description: 'Pre-built products used as components in furniture sets. Cushions are built ahead of time and stocked.',
        decision: 'Use for: Cushions (CSH-*). Pre-built from shell + core, kept in inventory, pulled when a set is ordered.',
        important: true,
        links: [
          { label: 'Katana Subassembly Guide', url: 'https://support.katanamrp.com/hc/en-us/articles/360011440240-Subassemblies' },
        ],
      },
      {
        id: 'usage-contract',
        title: 'Contract Manufactured',
        description: 'Items manufactured by external partners. Purchased complete, not made in-house.',
        decision: 'Use for: Shells (SHL-*) and Core Inserts (COR-*). Made by contract manufacturers - we don\'t make them in Katana.',
        important: true,
      },
      {
        id: 'usage-kit',
        title: 'Kit',
        description: 'A bundle of items always sold together as a single SKU. Components tracked separately.',
        decision: 'Use for: Power Bar Kit (HT-PB-G1R-151) which always includes the charger.',
        links: [
          { label: 'Katana Kit Guide', url: 'https://support.katanamrp.com/hc/en-us/articles/360011440260-Kits' },
        ],
      },
      {
        id: 'usage-resale',
        title: 'Product for Resale',
        description: 'Purchased items sold directly to customers without modification.',
        decision: 'Use for: Tables (CTB, STB, SDT, RDT), Ottoman (OTM), Protective Covers (PRO-*), Accessories.',
      },
      {
        id: 'usage-raw',
        title: 'Raw Material',
        description: 'Materials consumed in manufacturing. Tracked by inventory, depleted via BOMs.',
        decision: 'Use for: Fabrics, foam, batting, barrier materials, labels.',
      },
    ],
  },
  {
    title: 'BOM Structure Decisions',
    icon: <Layers className="w-5 h-5" />,
    description: 'Critical decisions about what components go where in the bill of materials.',
    items: [
      {
        id: 'bom-fg',
        title: 'Finished Good BOM Components',
        description: 'What items should be in a finished good\'s BOM?',
        decision: 'Include: Frame (1x), Cushions (varies by product), Power Bar Kit (1x). Do NOT include raw materials - those are in cushion BOMs.',
        important: true,
      },
      {
        id: 'bom-cushion',
        title: 'Cushion BOM Components',
        description: 'Cushions are subassemblies with their own BOMs.',
        decision: 'Include: Shell (1x), Core Insert (1x). The cushion is assembled from a shell + core.',
      },
      {
        id: 'bom-shell',
        title: 'Shell Hardware Allocation',
        description: 'Which hardware belongs on the shell?',
        decision: 'Shells include: Fabric, Woven Label, Snap Grommet #4 (x1 per shell), Custom Grommet (x1 for seat shells only).',
        important: true,
      },
      {
        id: 'bom-core',
        title: 'Core Insert Hardware Allocation',
        description: 'Which hardware belongs on the core?',
        decision: 'Cores include: Foam, Batting, Barriers, Heating Element, Cord Grip (x2 for seat, x1 for back/pillow), Cord Grip Nut (same qty as cord grip).',
        important: true,
      },
      {
        id: 'bom-no-color',
        title: 'Color-Agnostic Core Inserts',
        description: 'Core inserts don\'t have a fabric color code.',
        decision: 'COR-LS-SEAT (not COR-LS-SEAT-CBN). Cores are universal - same core works with any shell color.',
      },
    ],
  },
  {
    title: 'Sellability & Replacement Parts',
    icon: <Database className="w-5 h-5" />,
    description: 'Which items can be sold as replacement parts to customers?',
    items: [
      {
        id: 'sell-shells',
        title: 'Shells are Sellable',
        description: 'Customers can purchase replacement shells if they want to change color or replace worn fabric.',
        decision: 'Mark all shells (SHL-*) as sellable products. They\'re available on Shopify as replacement parts.',
        important: true,
      },
      {
        id: 'sell-cores',
        title: 'Core Inserts are Internal Only',
        description: 'Core inserts are not sold separately to customers.',
        decision: 'Mark all cores (COR-*) as internal-only. Customers buy complete cushions, not just the heated cores.',
        important: true,
      },
      {
        id: 'sell-power',
        title: 'Power Bar is Sellable',
        description: 'Power bars can be sold as replacement/additional units.',
        decision: 'Mark power bar kit as sellable. Include as a kit with charger always bundled.',
      },
      {
        id: 'sell-covers',
        title: 'Covers and Accessories',
        description: 'All protective covers and accessories are standalone sellable products.',
        decision: 'Mark all PRO-* and ACC-* items as sellable products for resale.',
      },
    ],
  },
  {
    title: 'Part Number Conventions',
    icon: <HelpCircle className="w-5 h-5" />,
    description: 'How to assign part numbers in Katana for easy identification.',
    items: [
      {
        id: 'pn-ranges',
        title: 'Part Number Ranges',
        description: 'Reserved ranges by category for consistent numbering.',
        decision: '10000s: Finished Goods | 30000s: Frames | 40000s: Cushions | 40500s: Core Inserts | 50000s: Shells | 60000s: Covers | 70000s: Heat Tech | 80000s: Accessories',
        important: true,
      },
      {
        id: 'pn-mto',
        title: 'MTO Product Part Numbers',
        description: 'Finished goods that are made-to-order may not need traditional part numbers.',
        decision: 'SKU is primary identifier. Part number optional but helps with Katana filtering/reporting.',
      },
      {
        id: 'pn-materials',
        title: 'Materials Without Part Numbers',
        description: 'Some raw materials may not have formal part numbers.',
        decision: 'Use SKU as identifier. Part number not required for materials in Katana.',
      },
    ],
  },
  {
    title: 'Shopify Integration',
    icon: <ExternalLink className="w-5 h-5" />,
    description: 'How Katana syncs with Shopify for orders.',
    items: [
      {
        id: 'shop-mto',
        title: 'CTO Orders from Shopify',
        description: 'When a customer orders a furniture set on Shopify, the configured combination is assembled.',
        decision: 'The SOL-* SKU creates a Manufacturing Order in Katana. Pre-built pieces (frame, cushions, power bar) are pulled from inventory and assembled.',
        important: true,
      },
      {
        id: 'shop-bundles',
        title: 'Shopify Bundles vs Katana Kits',
        description: 'Shopify furniture "sets" are NOT Katana kits.',
        decision: 'Shopify bundles (e.g., "Lounge Set") are cart configurations. Each piece is a separate MTO product in Katana.',
        important: true,
      },
      {
        id: 'shop-variants',
        title: 'SKU Variants for Fabric Colors',
        description: 'Each fabric color creates a unique SKU variant.',
        decision: 'SOL-LCH-NTK-CBN-ST1 and SOL-LCH-NTK-IND-ST1 are different variants. Katana tracks each separately.',
      },
    ],
  },
];

function ChecklistSection({ section, expandedItems, toggleItem }: {
  section: ChecklistSection;
  expandedItems: Set<string>;
  toggleItem: (id: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-3 p-4 bg-sand-light hover:bg-sand transition-colors text-left"
      >
        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-hot-embers">
          {section.icon}
        </div>
        <div className="flex-1">
          <h2 className="font-display font-semibold text-jet">{section.title}</h2>
          <p className="text-sm text-muted">{section.description}</p>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-muted" />
        ) : (
          <ChevronRight className="w-5 h-5 text-muted" />
        )}
      </button>

      {isExpanded && (
        <div className="divide-y divide-sand">
          {section.items.map((item) => (
            <div key={item.id} className="p-4">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-start gap-3 text-left"
              >
                <div className={`
                  w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                  ${expandedItems.has(item.id)
                    ? 'border-hot-embers bg-hot-embers text-white'
                    : 'border-sand'
                  }
                `}>
                  {expandedItems.has(item.id) && <CheckSquare className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-medium text-jet">{item.title}</h3>
                    {item.important && (
                      <span className="px-2 py-0.5 bg-hot-embers/10 text-hot-embers text-xs font-semibold rounded">
                        Important
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted mt-1">{item.description}</p>
                </div>
              </button>

              {item.decision && (
                <div className="ml-9 mt-3 p-3 bg-sand-light rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-hot-embers flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-jet">Decision:</p>
                      <p className="text-sm text-muted">{item.decision}</p>
                    </div>
                  </div>
                </div>
              )}

              {item.links && item.links.length > 0 && (
                <div className="ml-9 mt-2 flex flex-wrap gap-2">
                  {item.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-hot-embers hover:underline"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function KatanaChecklistPage() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const totalItems = CHECKLIST_SECTIONS.reduce((acc, s) => acc + s.items.length, 0);
  const checkedItems = expandedItems.size;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-hot-embers/10 flex items-center justify-center flex-shrink-0">
            <CheckSquare className="w-6 h-6 text-hot-embers" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-display font-bold text-jet mb-2">
              Katana Integration Checklist
            </h1>
            <p className="text-muted">
              Comprehensive checklist of all critical decisions for setting up Outmore Living products in Katana MRP.
              Click items to mark them as reviewed.
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-display font-bold text-jet">
              {checkedItems}/{totalItems}
            </p>
            <p className="text-sm text-muted">items reviewed</p>
          </div>
        </div>
      </div>

      {/* Critical Summary */}
      <div className="card p-6 bg-jet text-white">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-hot-embers" />
          <h2 className="font-display font-semibold">Critical Summary</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-display font-medium text-hot-embers mb-2">Item Types</h3>
            <p className="text-sm text-sand-light">
              Only 3 options: <strong>Product</strong>, <strong>Material</strong>, or <strong>Service</strong>.
              Everything else is a "usage" setting.
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-display font-medium text-hot-embers mb-2">Shells vs Cores</h3>
            <p className="text-sm text-sand-light">
              <strong>Shells</strong>: sellable, have snap grommets.
              <strong> Cores</strong>: internal only, have cord grips.
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-display font-medium text-hot-embers mb-2">CTO vs Pre-built</h3>
            <p className="text-sm text-sand-light">
              Furniture <strong>sets</strong> are CTO (configured on order).
              Individual <strong>pieces</strong> (cushions, frames) are pre-built.
            </p>
          </div>
        </div>
      </div>

      {/* Info Note */}
      <div className="note">
        <strong>Katana Terminology:</strong> "Item Type" (Product/Material/Service) is different from "Usage" (MTO, Subassembly, etc.).
        An item can be Type: Product with Usage: Make-to-Order, or Type: Product with Usage: Subassembly.
      </div>

      {/* Checklist Sections */}
      <div className="space-y-4">
        {CHECKLIST_SECTIONS.map((section) => (
          <ChecklistSection
            key={section.title}
            section={section}
            expandedItems={expandedItems}
            toggleItem={toggleItem}
          />
        ))}
      </div>

      {/* Quick Links */}
      <div className="card p-6">
        <h2 className="font-display font-semibold text-jet mb-4">Related Resources</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            href="/katana"
            className="flex items-center gap-2 p-3 bg-sand-light rounded-lg hover:bg-sand transition-colors"
          >
            <Database className="w-5 h-5 text-jet" />
            <span className="text-sm font-medium text-jet">Katana Guide</span>
          </Link>
          <Link
            href="/bom"
            className="flex items-center gap-2 p-3 bg-sand-light rounded-lg hover:bg-sand transition-colors"
          >
            <Layers className="w-5 h-5 text-jet" />
            <span className="text-sm font-medium text-jet">BOM Explorer</span>
          </Link>
          <Link
            href="/master"
            className="flex items-center gap-2 p-3 bg-sand-light rounded-lg hover:bg-sand transition-colors"
          >
            <Package className="w-5 h-5 text-jet" />
            <span className="text-sm font-medium text-jet">Master Data</span>
          </Link>
          <a
            href="https://support.katanamrp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 bg-sand-light rounded-lg hover:bg-sand transition-colors"
          >
            <ExternalLink className="w-5 h-5 text-jet" />
            <span className="text-sm font-medium text-jet">Katana Docs</span>
          </a>
        </div>
      </div>
    </div>
  );
}
