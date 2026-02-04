'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Wrench,
  GitBranch,
  Layers,
  Palette,
  BookOpen,
  Database,
  Search,
  Package,
  ArrowRight,
  Map,
  Settings,
  Table,
  Download,
  Zap,
  ChevronRight,
} from 'lucide-react';
import { getProductCounts, getTotalProductCount } from '@/data/products';
import { GLOSSARY } from '@/data/glossary';
import { FABRIC_COLORS } from '@/data/fabrics';
import { CATEGORY_COLORS, CATEGORY_NAMES, ProductCategory } from '@/types/product';

// Interactive SKU Part component
interface SkuPartProps {
  code: string;
  meaning: string;
  type: string;
}

function SkuPart({ code, meaning, type }: SkuPartProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const getTypeClass = () => {
    switch (type) {
      case 'prefix': return 'bg-hot-embers text-white';
      case 'collection': return 'bg-jet text-white';
      case 'product': return 'bg-jet-light text-white';
      case 'finish': return 'bg-sand text-jet';
      case 'fabric': return 'bg-jet-lighter text-white';
      case 'settype': return 'bg-jet text-white';
      case 'seating': return 'bg-jet-light text-white';
      case 'component': return 'bg-sand-light text-jet';
      default: return 'bg-sand text-jet';
    }
  };

  return (
    <span className="relative inline-block">
      <span
        className={`sku-part ${getTypeClass()} px-2 py-1 rounded text-sm font-mono font-semibold cursor-help transition-transform hover:-translate-y-0.5 hover:shadow-md`}
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

function SkuSeparator() {
  return <span className="text-sand mx-0.5 font-mono">-</span>;
}

const primaryActions = [
  {
    name: 'Guided Tour',
    description: 'Learn the SKU system step by step',
    href: '/guide',
    icon: Map,
    color: 'hot-embers',
  },
  {
    name: 'SKU Builder',
    description: 'Build or decode any SKU',
    href: '/builder',
    icon: Wrench,
    color: 'jet',
  },
  {
    name: 'SKU Configurator',
    description: 'Configure products and see BOMs',
    href: '/configurator',
    icon: Settings,
    color: 'jet-light',
  },
  {
    name: 'BOM Explorer',
    description: 'Drill into bill of materials',
    href: '/bom',
    icon: Layers,
    color: 'hot-embers',
  },
];

const secondaryActions = [
  { name: 'Hierarchy', href: '/hierarchy', icon: GitBranch },
  { name: 'Fabrics', href: '/fabrics', icon: Palette },
  { name: 'Glossary', href: '/glossary', icon: BookOpen },
  { name: 'Master Data', href: '/master', icon: Table },
  { name: 'Katana Guide', href: '/katana', icon: Database },
  { name: 'Downloads', href: '/downloads', icon: Download },
];

export default function HomePage() {
  const productCounts = getProductCounts();
  const totalProducts = getTotalProductCount();
  const glossaryCount = GLOSSARY.length;
  const fabricCount = FABRIC_COLORS.length;

  const categoryStats: { category: ProductCategory; count: number }[] = [
    { category: 'finished-good', count: productCounts['finished-good'] },
    { category: 'frame', count: productCounts['frame'] },
    { category: 'cushion', count: productCounts['cushion'] },
    { category: 'core-insert', count: productCounts['core-insert'] },
    { category: 'shell', count: productCounts['shell'] },
    { category: 'heat-tech', count: productCounts['heat-tech'] },
    { category: 'protective-cover', count: productCounts['protective-cover'] },
    { category: 'accessory', count: productCounts['accessory'] },
    { category: 'material', count: productCounts['material'] },
  ];

  return (
    <div className="space-y-8">
      {/* Hero section */}
      <div className="card p-8 bg-gradient-to-br from-jet to-jet-light text-white">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-display font-bold mb-3">
            SKU Schema Explorer
          </h1>
          <p className="text-sand-light text-lg mb-6">
            The complete interactive guide to Outmore Living&apos;s product SKU system.
            Learn how products are structured, explore bills of materials, and master the Solerno collection.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-hot-embers text-white font-display font-medium rounded-md hover:bg-hot-embers/90 transition-colors"
            >
              Start Guided Tour
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white font-display font-medium rounded-md hover:bg-white/20 transition-colors"
            >
              Decode a SKU
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive SKU Preview */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-hot-embers/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-hot-embers" />
          </div>
          <div>
            <h2 className="font-display font-semibold text-jet">How SKUs Work</h2>
            <p className="text-sm text-muted">Hover over each segment to learn what it means</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Finished Good Example */}
          <div className="flex items-center gap-4 p-4 bg-sand-light rounded-lg">
            <span className="font-display text-xs font-semibold text-muted uppercase tracking-wider min-w-[100px]">
              Finished Good
            </span>
            <div className="flex items-center">
              <SkuPart code="SOL" meaning="Solerno Collection" type="prefix" />
              <SkuSeparator />
              <SkuPart code="LCH" meaning="Lounge Chair" type="product" />
              <SkuSeparator />
              <SkuPart code="NTK" meaning="Natural Teak finish" type="finish" />
              <SkuSeparator />
              <SkuPart code="CBN" meaning="Carbon (Sunbrella)" type="fabric" />
              <SkuSeparator />
              <SkuPart code="ST1" meaning="Set Type 1 (Standard back)" type="settype" />
            </div>
          </div>

          {/* Cushion Example */}
          <div className="flex items-center gap-4 p-4 bg-sand-light rounded-lg">
            <span className="font-display text-xs font-semibold text-muted uppercase tracking-wider min-w-[100px]">
              Cushion
            </span>
            <div className="flex items-center">
              <SkuPart code="CSH" meaning="Cushion prefix" type="prefix" />
              <SkuSeparator />
              <SkuPart code="LS" meaning="Lounge Seating" type="seating" />
              <SkuSeparator />
              <SkuPart code="SEAT" meaning="Seat cushion" type="component" />
              <SkuSeparator />
              <SkuPart code="CBN" meaning="Carbon fabric" type="fabric" />
            </div>
          </div>

          {/* Core Insert Example */}
          <div className="flex items-center gap-4 p-4 bg-sand-light rounded-lg">
            <span className="font-display text-xs font-semibold text-muted uppercase tracking-wider min-w-[100px]">
              Core Insert
            </span>
            <div className="flex items-center">
              <SkuPart code="COR" meaning="Core Insert prefix" type="prefix" />
              <SkuSeparator />
              <SkuPart code="LS" meaning="Lounge Seating" type="seating" />
              <SkuSeparator />
              <SkuPart code="SEAT" meaning="Seat component" type="component" />
              <span className="ml-3 text-xs text-muted italic">(No fabric code - universal)</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-sand">
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 text-sm text-hot-embers font-medium hover:underline"
          >
            Try the SKU Decoder
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Primary Actions Grid */}
      <div>
        <h2 className="font-display font-semibold text-jet mb-4">Tools & Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {primaryActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.name}
                href={action.href}
                className="group card p-5 hover:border-hot-embers/30 transition-all hover:shadow-md"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-${action.color}/10`}
                >
                  <Icon className={`w-5 h-5 text-${action.color}`} />
                </div>
                <h3 className="font-display font-medium text-jet mb-1 group-hover:text-hot-embers transition-colors">
                  {action.name}
                </h3>
                <p className="text-sm text-muted">{action.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card p-5 text-center">
          <Package className="w-6 h-6 text-hot-embers mx-auto mb-2" />
          <p className="text-2xl font-display font-bold text-jet">{totalProducts.toLocaleString()}</p>
          <p className="text-sm text-muted">Total Products</p>
        </div>
        <div className="card p-5 text-center">
          <BookOpen className="w-6 h-6 text-jet mx-auto mb-2" />
          <p className="text-2xl font-display font-bold text-jet">{glossaryCount}</p>
          <p className="text-sm text-muted">Abbreviations</p>
        </div>
        <div className="card p-5 text-center">
          <Palette className="w-6 h-6 text-jet-light mx-auto mb-2" />
          <p className="text-2xl font-display font-bold text-jet">{fabricCount}</p>
          <p className="text-sm text-muted">Fabric Colors</p>
        </div>
        <div className="card p-5 text-center">
          <Database className="w-6 h-6 text-jet-lighter mx-auto mb-2" />
          <p className="text-2xl font-display font-bold text-jet">9</p>
          <p className="text-sm text-muted">Part # Ranges</p>
        </div>
      </div>

      {/* Configure-to-Order Note */}
      <div className="note">
        <strong>Configure-to-Order Model:</strong> Furniture <em>sets</em> are configured at order time. Individual <em>pieces</em> (frames, cushions, power bars) are pre-built products kept in inventory. When a customer orders a set on Shopify, the configured combination is assembled from pre-built pieces.
      </div>

      {/* Secondary Actions */}
      <div>
        <h2 className="font-display font-semibold text-jet mb-4">More Resources</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {secondaryActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.name}
                href={action.href}
                className="flex flex-col items-center gap-2 p-4 bg-sand-light rounded-lg hover:bg-sand transition-colors text-center"
              >
                <Icon className="w-5 h-5 text-jet" />
                <span className="text-sm font-medium text-jet">{action.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Category Breakdown */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-jet">Products by Category</h2>
          <Link
            href="/search"
            className="text-sm text-hot-embers font-medium hover:underline flex items-center gap-1"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="card overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-sand">
            {categoryStats.map(({ category, count }) => (
              <Link
                key={category}
                href={`/search?category=${category}`}
                className="flex items-center gap-3 p-4 hover:bg-sand-light transition-colors"
              >
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: CATEGORY_COLORS[category] }}
                />
                <span className="flex-1 text-sm text-jet">
                  {CATEGORY_NAMES[category]}
                </span>
                <span className="text-sm font-display font-semibold text-jet">
                  {count.toLocaleString()}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Key Concepts */}
      <div>
        <h2 className="font-display font-semibold text-jet mb-4">Key Concepts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card p-5">
            <h3 className="font-display font-medium text-jet mb-2">Configure-to-Order Sets</h3>
            <p className="text-sm text-muted">
              Furniture sets (SOL-*) are configured at order time. Individual pieces (frames, cushions, power bars)
              are pre-built products. When ordered, the configured set is assembled from these pre-built pieces.
            </p>
          </div>
          <div className="card p-5">
            <h3 className="font-display font-medium text-jet mb-2">Color-Agnostic Cores</h3>
            <p className="text-sm text-muted">
              Core inserts (COR-*) have no fabric code because they&apos;re universal.
              The same heated core works with any fabric shell color.
            </p>
          </div>
          <div className="card p-5">
            <h3 className="font-display font-medium text-jet mb-2">Part Number Ranges</h3>
            <p className="text-sm text-muted">
              Each category has a reserved range: Finished Goods (10000s), Frames (30000s),
              Cushions (40000s), Core Inserts (40500s), Shells (50000s), and more.
            </p>
          </div>
          <div className="card p-5">
            <h3 className="font-display font-medium text-jet mb-2">Sellable vs Internal</h3>
            <p className="text-sm text-muted">
              Some items are sellable replacements (shells), while others are internal-only
              (core inserts). The Katana Guide helps determine the correct item type.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
