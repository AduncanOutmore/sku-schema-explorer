'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  ChevronDown,
  Map,
  Layers,
  Package,
  Sofa,
  Box,
  Zap,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Info,
} from 'lucide-react';
import { MermaidDiagram } from '@/components/hierarchy/MermaidDiagram';

// Interactive SKU component
interface SkuPartProps {
  code: string;
  meaning: string;
  type: string;
}

function SkuPart({ code, meaning, type }: SkuPartProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <span className="relative">
      <span
        className={`sku-part ${type}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {code}
      </span>
      {showTooltip && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-jet text-white text-xs rounded-md whitespace-nowrap z-50 shadow-lg">
          <span className="font-mono text-hot-embers font-semibold">{code}</span>
          <span className="text-sand"> = {meaning}</span>
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-4 border-transparent border-t-jet"></span>
        </span>
      )}
    </span>
  );
}

interface InteractiveSkuProps {
  label: string;
  parts: SkuPartProps[];
}

function InteractiveSku({ label, parts }: InteractiveSkuProps) {
  return (
    <div className="flex items-center gap-5 py-3 border-b border-sand last:border-b-0">
      <span className="font-display min-w-[120px] text-xs font-medium text-muted uppercase tracking-wider">
        {label}
      </span>
      <div className="sku-interactive">
        {parts.map((part, i) => (
          <span key={i} className="flex items-center">
            {i > 0 && <span className="sku-separator">-</span>}
            <SkuPart {...part} />
          </span>
        ))}
      </div>
    </div>
  );
}

// Collapsible section component
interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Section({ title, icon, children, defaultOpen = false }: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="card mb-4">
      <div
        className="card-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-muted" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted" />
        )}
        <span className="text-hot-embers">{icon}</span>
        <h2 className="font-display text-base font-semibold text-jet flex-1">{title}</h2>
      </div>
      {isOpen && <div className="card-body">{children}</div>}
    </div>
  );
}

export default function GuidedTourPage() {
  const hierarchyDiagram = `%%{init: {'theme': 'neutral', 'themeVariables': { 'fontSize': '14px', 'primaryColor': '#F25431', 'primaryTextColor': '#fff', 'primaryBorderColor': '#373534', 'lineColor': '#d4cec4', 'secondaryColor': '#ebe5dc', 'tertiaryColor': '#fcf9f5'}}}%%
flowchart TB
    subgraph L1["<b>Finished Goods</b> — What Customers Buy"]
        FG["SOL-LCH-NTK-CBN-ST1<br/>Lounge Chair, Carbon"]
    end
    subgraph L2["<b>Major Components</b> — Assembled In-House"]
        FR["FR-SOL-LCH-NT<br/>Frame"]
        CSH["CSH-LS-SEAT-CBN<br/>Seat Cushion"]
        HT["HT-PB-G1R-151<br/>Power Bar Kit"]
    end
    subgraph L3["<b>Subassemblies</b> — Sourced Parts"]
        SHL["SHL-LS-SEAT-CBN<br/>Shell"]
        COR["COR-LS-SEAT<br/>Core Insert"]
    end
    subgraph L4["<b>Raw Materials</b> — Purchased Inventory"]
        FAB["FAB-SUN-SPTM-CBN<br/>Sunbrella Fabric"]
        FOM["FOM-LS-SEAT<br/>Foam"]
        GPH["HT-GPH-LS-SEAT-G1<br/>Graphene Element"]
    end
    FG --> FR
    FG --> CSH
    FG --> HT
    CSH --> SHL
    CSH --> COR
    SHL --> FAB
    COR --> FOM
    COR --> GPH

    style FG fill:#F25431,stroke:#373534,color:#fff
    style FR fill:#373534,stroke:#373534,color:#fff
    style CSH fill:#5a5856,stroke:#373534,color:#fff
    style HT fill:#4a4847,stroke:#373534,color:#fff
    style SHL fill:#ebe5dc,stroke:#d4cec4,color:#373534
    style COR fill:#d4cec4,stroke:#d4cec4,color:#373534
    style FAB fill:#fcf9f5,stroke:#d4cec4,color:#373534
    style FOM fill:#fcf9f5,stroke:#d4cec4,color:#373534
    style GPH fill:#fcf9f5,stroke:#d4cec4,color:#373534`;

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-jet text-white rounded-lg p-8">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-lg bg-hot-embers flex items-center justify-center flex-shrink-0">
            <Map className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-semibold mb-2">
              SKU Schema Guide
            </h1>
            <p className="text-sand text-lg">
              A complete walkthrough of how Outmore Living&apos;s product hierarchy and SKU system works.
              Perfect for onboarding new team members or refreshing your knowledge.
            </p>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="card">
        <div className="card-body">
          <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-muted mb-4">
            What You&apos;ll Learn
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <a href="#overview" className="flex items-center gap-2 text-sm text-jet hover:text-hot-embers transition-colors">
              <ChevronRight className="w-4 h-4" /> System Overview
            </a>
            <a href="#hierarchy" className="flex items-center gap-2 text-sm text-jet hover:text-hot-embers transition-colors">
              <ChevronRight className="w-4 h-4" /> Product Hierarchy
            </a>
            <a href="#sku-patterns" className="flex items-center gap-2 text-sm text-jet hover:text-hot-embers transition-colors">
              <ChevronRight className="w-4 h-4" /> SKU Patterns
            </a>
            <a href="#configure-to-order" className="flex items-center gap-2 text-sm text-jet hover:text-hot-embers transition-colors">
              <ChevronRight className="w-4 h-4" /> Configure-to-Order
            </a>
            <a href="#katana-types" className="flex items-center gap-2 text-sm text-jet hover:text-hot-embers transition-colors">
              <ChevronRight className="w-4 h-4" /> Katana Item Types
            </a>
            <a href="#part-numbers" className="flex items-center gap-2 text-sm text-jet hover:text-hot-embers transition-colors">
              <ChevronRight className="w-4 h-4" /> Part Number Ranges
            </a>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div id="overview">
        <Section
          title="System Overview"
          icon={<Info className="w-5 h-5" />}
          defaultOpen={true}
        >
          <div className="note mb-6">
            <strong>Configure-to-Order Model:</strong> Outmore Living doesn&apos;t pre-build finished furniture.
            When a customer orders on Shopify, Katana creates a Make-to-Order production run that combines
            the frame, cushions, and power bars for that specific configuration.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-sand-light rounded-lg p-5">
              <h4 className="font-display font-semibold text-jet mb-3 flex items-center gap-2">
                <Sofa className="w-5 h-5 text-hot-embers" />
                The Solerno Collection
              </h4>
              <p className="text-sm text-muted mb-3">
                All current products belong to the <strong>Solerno</strong> collection — premium teak outdoor furniture with integrated heating.
              </p>
              <ul className="text-sm text-muted space-y-1">
                <li>• Lounge Chair, Loveseat, Sofa</li>
                <li>• Swivel Chair, Chaise Lounge</li>
                <li>• Heated Ottoman, Standard Ottoman</li>
                <li>• Dining Chairs (Arm & Side)</li>
                <li>• Tables (Coffee, Side, Dining)</li>
              </ul>
            </div>

            <div className="bg-sand-light rounded-lg p-5">
              <h4 className="font-display font-semibold text-jet mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-hot-embers" />
                Heated Technology
              </h4>
              <p className="text-sm text-muted mb-3">
                What makes Outmore special: graphene heating elements embedded in cushion cores, powered by rechargeable battery bars.
              </p>
              <ul className="text-sm text-muted space-y-1">
                <li>• Power Bar G1R (151Wh)</li>
                <li>• Graphene heating elements</li>
                <li>• Multiple charging options</li>
                <li>• 2-way, 3-way, 4-way splitters</li>
              </ul>
            </div>
          </div>

          <div className="bg-jet text-white rounded-lg p-5">
            <h4 className="font-display font-semibold mb-3">Key Concepts</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-hot-embers font-semibold">ST1 vs ST2</span>
                <p className="text-sand mt-1">
                  ST1 = Standard foam back<br />
                  ST2 = Pillow back style
                </p>
              </div>
              <div>
                <span className="text-hot-embers font-semibold">LS vs DN</span>
                <p className="text-sand mt-1">
                  LS = Lounge Seating<br />
                  DN = Dining Seating
                </p>
              </div>
              <div>
                <span className="text-hot-embers font-semibold">NT vs NTK</span>
                <p className="text-sand mt-1">
                  NT = Natural Teak (frames)<br />
                  NTK = Natural Teak (finished)
                </p>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Hierarchy Section */}
      <div id="hierarchy">
        <Section
          title="Product Hierarchy"
          icon={<Layers className="w-5 h-5" />}
          defaultOpen={true}
        >
          <p className="text-muted mb-4">
            Every finished good breaks down into a tree of components. Understanding this hierarchy is key to working with the SKU system.
          </p>

          <div className="diagram-container mb-6">
            <MermaidDiagram chart={hierarchyDiagram} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-sand rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 rounded-sm bg-hot-embers"></span>
                <span className="font-display font-semibold text-sm">Finished Goods (10000s)</span>
              </div>
              <p className="text-sm text-muted">
                The complete, sellable product. Built on-demand from components when a customer orders.
              </p>
            </div>

            <div className="border border-sand rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 rounded-sm bg-jet"></span>
                <span className="font-display font-semibold text-sm">Frames (30000s)</span>
              </div>
              <p className="text-sm text-muted">
                Teak furniture frames. Pre-built and stocked. Not sold separately (except tables).
              </p>
            </div>

            <div className="border border-sand rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 rounded-sm bg-jet-light"></span>
                <span className="font-display font-semibold text-sm">Cushions (40000s)</span>
              </div>
              <p className="text-sm text-muted">
                Seat and back cushions. Assembled from shells + core inserts. Also sold as replacements.
              </p>
            </div>

            <div className="border border-sand rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 rounded-sm bg-sand"></span>
                <span className="font-display font-semibold text-sm">Core Inserts (40500s)</span>
              </div>
              <p className="text-sm text-muted">
                The heated interior: foam + graphene element + wiring. Internal only, not sold separately.
              </p>
            </div>

            <div className="border border-sand rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 rounded-sm bg-sand-light border border-sand"></span>
                <span className="font-display font-semibold text-sm">Shells (50000s)</span>
              </div>
              <p className="text-sm text-muted">
                Fabric covers for cushions. Contract-manufactured. Sold as spare/replacement parts.
              </p>
            </div>

            <div className="border border-sand rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 rounded-sm bg-jet-lighter"></span>
                <span className="font-display font-semibold text-sm">Heat Tech (70000s)</span>
              </div>
              <p className="text-sm text-muted">
                Power bars, chargers, mounts, splitters, graphene elements. Mix of sellable and internal.
              </p>
            </div>
          </div>
        </Section>
      </div>

      {/* SKU Patterns Section */}
      <div id="sku-patterns">
        <Section
          title="SKU Patterns & Interactive Explorer"
          icon={<Package className="w-5 h-5" />}
          defaultOpen={true}
        >
          <div className="hover-hint mb-6">
            <strong>Hover over any segment</strong> below to see what it means. Each part of a SKU encodes specific information.
          </div>

          <div className="space-y-0 mb-8">
            <InteractiveSku
              label="Finished Good"
              parts={[
                { code: 'SOL', meaning: 'Solerno Collection', type: 'prefix' },
                { code: 'LCH', meaning: 'Lounge Chair', type: 'product' },
                { code: 'NTK', meaning: 'Natural Teak finish', type: 'finish' },
                { code: 'CBN', meaning: 'Carbon (Sunbrella Spectrum)', type: 'fabric' },
                { code: 'ST1', meaning: 'Set Type 1 (Standard back)', type: 'settype' },
              ]}
            />
            <InteractiveSku
              label="Frame"
              parts={[
                { code: 'FR', meaning: 'Frame', type: 'prefix' },
                { code: 'SOL', meaning: 'Solerno Collection', type: 'collection' },
                { code: 'LCH', meaning: 'Lounge Chair', type: 'product' },
                { code: 'NT', meaning: 'Natural Teak', type: 'finish' },
              ]}
            />
            <InteractiveSku
              label="Cushion"
              parts={[
                { code: 'CSH', meaning: 'Cushion assembly', type: 'prefix' },
                { code: 'LS', meaning: 'Lounge Seating', type: 'seating' },
                { code: 'SEAT', meaning: 'Seat position', type: 'component' },
                { code: 'IND', meaning: 'Indigo (Sunbrella Spectrum)', type: 'fabric' },
              ]}
            />
            <InteractiveSku
              label="Shell"
              parts={[
                { code: 'SHL', meaning: 'Shell (fabric cover)', type: 'prefix' },
                { code: 'LS', meaning: 'Lounge Seating', type: 'seating' },
                { code: 'PILB', meaning: 'Pillow Back (ST2)', type: 'component' },
                { code: 'DOV', meaning: 'Dove (Sunbrella Spectrum)', type: 'fabric' },
              ]}
            />
            <InteractiveSku
              label="Core Insert"
              parts={[
                { code: 'COR', meaning: 'Core Insert (heated interior)', type: 'prefix' },
                { code: 'LS', meaning: 'Lounge Seating', type: 'seating' },
                { code: 'BACK', meaning: 'Back position', type: 'component' },
              ]}
            />
            <InteractiveSku
              label="Heat Tech"
              parts={[
                { code: 'HT', meaning: 'Heat Tech', type: 'prefix' },
                { code: 'PB', meaning: 'Power Bar', type: 'product' },
                { code: 'G1R', meaning: 'Generation 1 Refresh', type: 'spec' },
                { code: '151', meaning: '151 Watt-hours', type: 'spec' },
              ]}
            />
            <InteractiveSku
              label="Fabric"
              parts={[
                { code: 'FAB', meaning: 'Fabric', type: 'prefix' },
                { code: 'SUN', meaning: 'Sunbrella', type: 'brand' },
                { code: 'HRTG', meaning: 'Heritage pattern', type: 'pattern' },
                { code: 'CHR', meaning: 'Charcoal', type: 'fabric' },
              ]}
            />
          </div>

          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted mb-4">
            SKU Pattern Reference
          </h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Pattern</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Finished Goods</td>
                <td><code className="text-xs bg-sand-light px-2 py-0.5 rounded">SOL-[PRODUCT]-[FINISH]-[FABRIC]-[SET]</code></td>
                <td className="sku">SOL-LCH-NTK-CBN-ST1</td>
              </tr>
              <tr>
                <td>Frames</td>
                <td><code className="text-xs bg-sand-light px-2 py-0.5 rounded">FR-[COLLECTION]-[PRODUCT]-[FINISH]</code></td>
                <td className="sku">FR-SOL-LCH-NT</td>
              </tr>
              <tr>
                <td>Cushions</td>
                <td><code className="text-xs bg-sand-light px-2 py-0.5 rounded">CSH-[SEATING]-[COMPONENT]-[FABRIC]</code></td>
                <td className="sku">CSH-LS-SEAT-CBN</td>
              </tr>
              <tr>
                <td>Cores</td>
                <td><code className="text-xs bg-sand-light px-2 py-0.5 rounded">COR-[SEATING]-[COMPONENT]</code></td>
                <td className="sku">COR-LS-SEAT</td>
              </tr>
              <tr>
                <td>Shells</td>
                <td><code className="text-xs bg-sand-light px-2 py-0.5 rounded">SHL-[SEATING]-[COMPONENT]-[FABRIC]</code></td>
                <td className="sku">SHL-LS-SEAT-CBN</td>
              </tr>
              <tr>
                <td>Heat Tech</td>
                <td><code className="text-xs bg-sand-light px-2 py-0.5 rounded">HT-[TYPE]-[SPEC]</code></td>
                <td className="sku">HT-PB-G1R-151</td>
              </tr>
              <tr>
                <td>Covers</td>
                <td><code className="text-xs bg-sand-light px-2 py-0.5 rounded">PRO-[COLLECTION]-[PRODUCT]</code></td>
                <td className="sku">PRO-SOL-LCH</td>
              </tr>
              <tr>
                <td>Fabrics</td>
                <td><code className="text-xs bg-sand-light px-2 py-0.5 rounded">FAB-[BRAND]-[PATTERN]-[COLOR]</code></td>
                <td className="sku">FAB-SUN-SPTM-CBN</td>
              </tr>
            </tbody>
          </table>
        </Section>
      </div>

      {/* Configure-to-Order Section */}
      <div id="configure-to-order">
        <Section
          title="Configure-to-Order Process"
          icon={<Box className="w-5 h-5" />}
          defaultOpen={false}
        >
          <div className="note mb-6">
            <strong>Important:</strong> Furniture Sets (like &quot;Living Room Set&quot;) shown on Shopify are NOT Katana kits.
            They&apos;re frontend configurations that create multiple separate orders.
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-sand-light rounded-lg">
              <span className="w-8 h-8 rounded-full bg-hot-embers text-white flex items-center justify-center font-display font-semibold text-sm flex-shrink-0">1</span>
              <div>
                <h4 className="font-display font-semibold text-jet mb-1">Customer Orders on Shopify</h4>
                <p className="text-sm text-muted">
                  Customer selects furniture piece, fabric color, and back style. Shopify sends order to Katana.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-sand-light rounded-lg">
              <span className="w-8 h-8 rounded-full bg-hot-embers text-white flex items-center justify-center font-display font-semibold text-sm flex-shrink-0">2</span>
              <div>
                <h4 className="font-display font-semibold text-jet mb-1">Katana Creates MO</h4>
                <p className="text-sm text-muted">
                  Manufacturing Order created for the specific SKU (e.g., SOL-LCH-NTK-CBN-ST1). BOM explodes to show all needed components.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-sand-light rounded-lg">
              <span className="w-8 h-8 rounded-full bg-hot-embers text-white flex items-center justify-center font-display font-semibold text-sm flex-shrink-0">3</span>
              <div>
                <h4 className="font-display font-semibold text-jet mb-1">Components Pulled from Inventory</h4>
                <p className="text-sm text-muted">
                  Frame (pre-built), cushions (or assembled from shells + cores), and power bar kit gathered for assembly.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-sand-light rounded-lg">
              <span className="w-8 h-8 rounded-full bg-hot-embers text-white flex items-center justify-center font-display font-semibold text-sm flex-shrink-0">4</span>
              <div>
                <h4 className="font-display font-semibold text-jet mb-1">Final Assembly & Ship</h4>
                <p className="text-sm text-muted">
                  Cushions attached to frame, power bar included in package. Finished good shipped to customer.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Katana Types Section */}
      <div id="katana-types">
        <Section
          title="Katana Item Types"
          icon={<AlertCircle className="w-5 h-5" />}
          defaultOpen={false}
        >
          <div className="note note-warning mb-6">
            <strong>Katana Terminology:</strong> In Katana, <em>Item Type</em> is limited to <strong>Product</strong>, <strong>Material</strong>, or <strong>Service</strong>. The <em>Use</em> field specifies how the item functions in production.
          </div>

          <table className="data-table mb-6">
            <thead>
              <tr>
                <th>Category</th>
                <th>Item Type</th>
                <th>Use</th>
                <th>Sellable?</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Finished Goods</td>
                <td><span className="tag tag-mto">Product</span></td>
                <td>Make-to-Order</td>
                <td><CheckCircle className="w-4 h-4 text-green-600" /></td>
                <td className="text-muted text-xs">Built on demand from Shopify orders</td>
              </tr>
              <tr>
                <td>Frames</td>
                <td><span className="tag tag-subassembly">Product</span></td>
                <td>Subassembly</td>
                <td>Mixed</td>
                <td className="text-muted text-xs">Heated furniture frames = No; Tables = Yes</td>
              </tr>
              <tr>
                <td>Cushions</td>
                <td><span className="tag tag-subassembly">Product</span></td>
                <td>Subassembly</td>
                <td><CheckCircle className="w-4 h-4 text-green-600" /></td>
                <td className="text-muted text-xs">Also sold as replacement parts</td>
              </tr>
              <tr>
                <td>Shells</td>
                <td><span className="tag tag-subassembly">Product</span></td>
                <td>Contract-Manufactured</td>
                <td><CheckCircle className="w-4 h-4 text-green-600" /></td>
                <td className="text-muted text-xs">Made by CM partners, spare parts</td>
              </tr>
              <tr>
                <td>Core Inserts</td>
                <td><span className="tag tag-subassembly">Product</span></td>
                <td>Contract-Manufactured</td>
                <td>No</td>
                <td className="text-muted text-xs">Internal only, not sold separately</td>
              </tr>
              <tr>
                <td>Power Bar Kit</td>
                <td><span className="tag tag-kit">Product</span></td>
                <td>Kit</td>
                <td><CheckCircle className="w-4 h-4 text-green-600" /></td>
                <td className="text-muted text-xs">Includes charger in box</td>
              </tr>
              <tr>
                <td>Fabrics, Foam, HW</td>
                <td><span className="tag tag-material">Material</span></td>
                <td>Raw Material</td>
                <td>No</td>
                <td className="text-muted text-xs">Purchased inventory</td>
              </tr>
            </tbody>
          </table>

          <div className="note note-success">
            <strong>Not Katana Kits:</strong> Swatch Kits and Furniture Sets are NOT Katana kits. Swatches are individual items; Sets are Shopify frontend configurations.
          </div>
        </Section>
      </div>

      {/* Part Number Ranges */}
      <div id="part-numbers">
        <Section
          title="Part Number Ranges"
          icon={<Layers className="w-5 h-5" />}
          defaultOpen={false}
        >
          <p className="text-muted mb-4">
            Part numbers are assigned in ranges by category. This makes it easy to identify what type of item you&apos;re looking at.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="flex items-center gap-3 p-3 border border-sand rounded-md">
              <span className="w-4 h-4 rounded-sm bg-hot-embers"></span>
              <span className="font-mono text-sm font-semibold">10000–19999</span>
              <span className="text-sm text-muted">Finished Goods</span>
            </div>
            <div className="flex items-center gap-3 p-3 border border-sand rounded-md">
              <span className="w-4 h-4 rounded-sm bg-jet"></span>
              <span className="font-mono text-sm font-semibold">30000–39999</span>
              <span className="text-sm text-muted">Frames</span>
            </div>
            <div className="flex items-center gap-3 p-3 border border-sand rounded-md">
              <span className="w-4 h-4 rounded-sm bg-jet-light"></span>
              <span className="font-mono text-sm font-semibold">40000–40499</span>
              <span className="text-sm text-muted">Cushions</span>
            </div>
            <div className="flex items-center gap-3 p-3 border border-sand rounded-md">
              <span className="w-4 h-4 rounded-sm bg-sand"></span>
              <span className="font-mono text-sm font-semibold">40500–49999</span>
              <span className="text-sm text-muted">Core Inserts</span>
            </div>
            <div className="flex items-center gap-3 p-3 border border-sand rounded-md">
              <span className="w-4 h-4 rounded-sm bg-sand-light border border-sand"></span>
              <span className="font-mono text-sm font-semibold">50000–59999</span>
              <span className="text-sm text-muted">Shells</span>
            </div>
            <div className="flex items-center gap-3 p-3 border border-sand rounded-md">
              <span className="w-4 h-4 rounded-sm bg-jet-lighter"></span>
              <span className="font-mono text-sm font-semibold">60000–69999</span>
              <span className="text-sm text-muted">Protective Covers</span>
            </div>
            <div className="flex items-center gap-3 p-3 border border-sand rounded-md">
              <span className="w-4 h-4 rounded-sm bg-jet-lighter"></span>
              <span className="font-mono text-sm font-semibold">70000–79999</span>
              <span className="text-sm text-muted">Heat Tech</span>
            </div>
            <div className="flex items-center gap-3 p-3 border border-sand rounded-md">
              <span className="w-4 h-4 rounded-sm bg-jet-light"></span>
              <span className="font-mono text-sm font-semibold">80000–89999</span>
              <span className="text-sm text-muted">Accessories</span>
            </div>
            <div className="flex items-center gap-3 p-3 border border-sand rounded-md">
              <span className="w-4 h-4 rounded-sm bg-muted"></span>
              <span className="font-mono text-sm font-semibold">90000–99999</span>
              <span className="text-sm text-muted">Materials/Marketing</span>
            </div>
          </div>
        </Section>
      </div>

      {/* Next Steps */}
      <div className="card">
        <div className="card-body">
          <h3 className="font-display font-semibold text-jet mb-4">Ready to Explore?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/configurator"
              className="flex items-center justify-between p-4 bg-sand-light rounded-lg hover:bg-sand transition-colors group"
            >
              <span className="font-medium text-jet">SKU Configurator</span>
              <ArrowRight className="w-4 h-4 text-muted group-hover:text-hot-embers transition-colors" />
            </Link>
            <Link
              href="/bom"
              className="flex items-center justify-between p-4 bg-sand-light rounded-lg hover:bg-sand transition-colors group"
            >
              <span className="font-medium text-jet">BOM Explorer</span>
              <ArrowRight className="w-4 h-4 text-muted group-hover:text-hot-embers transition-colors" />
            </Link>
            <Link
              href="/glossary"
              className="flex items-center justify-between p-4 bg-sand-light rounded-lg hover:bg-sand transition-colors group"
            >
              <span className="font-medium text-jet">Glossary</span>
              <ArrowRight className="w-4 h-4 text-muted group-hover:text-hot-embers transition-colors" />
            </Link>
            <Link
              href="/master"
              className="flex items-center justify-between p-4 bg-sand-light rounded-lg hover:bg-sand transition-colors group"
            >
              <span className="font-medium text-jet">Master Data</span>
              <ArrowRight className="w-4 h-4 text-muted group-hover:text-hot-embers transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
