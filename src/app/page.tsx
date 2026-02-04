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
} from 'lucide-react';
import { getProductCounts, getTotalProductCount } from '@/data/products';
import { GLOSSARY } from '@/data/glossary';
import { FABRIC_COLORS } from '@/data/fabrics';
import { CATEGORY_COLORS, CATEGORY_NAMES, ProductCategory } from '@/types/product';

const quickActions = [
  {
    name: 'Build a SKU',
    description: 'Create or decode SKUs interactively',
    href: '/builder',
    icon: Wrench,
    color: '#2F5496',
  },
  {
    name: 'Explore Hierarchy',
    description: 'View product structure diagrams',
    href: '/hierarchy',
    icon: GitBranch,
    color: '#5B9BD5',
  },
  {
    name: 'BOM Explorer',
    description: 'Drill into bill of materials',
    href: '/bom',
    icon: Layers,
    color: '#70AD47',
  },
  {
    name: 'Fabric Colors',
    description: 'Browse all 16 fabric options',
    href: '/fabrics',
    icon: Palette,
    color: '#FFC000',
  },
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
      {/* Welcome section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome to the SKU Schema Explorer
        </h1>
        <p className="text-gray-600 max-w-2xl">
          This interactive guide helps you understand Outmore Living&apos;s complete SKU system.
          Learn how products are structured, explore bills of materials, and decode any SKU
          in the Solerno collection.
        </p>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.name}
                href={action.href}
                className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 hover:shadow-md transition-all"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${action.color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: action.color }} />
                </div>
                <h3 className="font-medium text-gray-900 mb-1 group-hover:text-sku-finished">
                  {action.name}
                </h3>
                <p className="text-sm text-gray-500">{action.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Stats overview */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Schema Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <Package className="w-6 h-6 text-sku-finished mb-2" />
            <p className="text-2xl font-bold text-gray-900">{totalProducts.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Total Products</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <BookOpen className="w-6 h-6 text-sku-cushion mb-2" />
            <p className="text-2xl font-bold text-gray-900">{glossaryCount}</p>
            <p className="text-sm text-gray-500">Abbreviations</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <Palette className="w-6 h-6 text-sku-heat mb-2" />
            <p className="text-2xl font-bold text-gray-900">{fabricCount}</p>
            <p className="text-sm text-gray-500">Fabric Colors</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <Database className="w-6 h-6 text-sku-frame mb-2" />
            <p className="text-2xl font-bold text-gray-900">9</p>
            <p className="text-sm text-gray-500">Part Number Ranges</p>
          </div>
        </div>
      </div>

      {/* Category breakdown */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Products by Category</h2>
          <Link
            href="/search"
            className="text-sm text-sku-finished hover:underline flex items-center gap-1"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            {categoryStats.map(({ category, count }) => (
              <Link
                key={category}
                href={`/search?category=${category}`}
                className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
              >
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: CATEGORY_COLORS[category] }}
                />
                <span className="flex-1 text-sm text-gray-700">
                  {CATEGORY_NAMES[category]}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {count.toLocaleString()}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Key concepts */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Concepts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-medium text-gray-900 mb-2">Make-to-Order</h3>
            <p className="text-sm text-gray-600">
              Finished goods (SOL-*) are not pre-built. When a customer orders on Shopify,
              the configured SKU triggers assembly from inventory components (frame, cushions, power bar).
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-medium text-gray-900 mb-2">Color-Agnostic Cores</h3>
            <p className="text-sm text-gray-600">
              Core inserts (COR-*) have no fabric code because they&apos;re universal.
              The same heated core works with any fabric shell color.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-medium text-gray-900 mb-2">Part Number Ranges</h3>
            <p className="text-sm text-gray-600">
              Each category has a reserved range: Finished Goods (10000s), Frames (30000s),
              Cushions (40000s), Core Inserts (40500s), Shells (50000s), and more.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-medium text-gray-900 mb-2">Sellable vs Internal</h3>
            <p className="text-sm text-gray-600">
              Some items are sellable replacements (shells), while others are internal-only
              (core inserts). The Katana Guide helps determine the correct item type.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
