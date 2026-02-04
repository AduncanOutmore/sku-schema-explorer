'use client';

import { useState } from 'react';
import { Database, CheckCircle, ArrowRight, HelpCircle, ExternalLink, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { CATEGORY_COLORS, CATEGORY_NAMES, PART_NUMBER_RANGES, ProductCategory } from '@/types/product';

// Decision tree questions
interface DecisionNode {
  question: string;
  yes: string | DecisionNode;
  no: string | DecisionNode;
}

const decisionTree: DecisionNode = {
  question: 'Is this item sold to customers (directly or as a replacement)?',
  yes: {
    question: 'Is it assembled in-house from components?',
    yes: {
      question: 'Is it assembled to order (not pre-built)?',
      yes: 'make-to-order',
      no: 'subassembly',
    },
    no: {
      question: 'Is it a kit that includes other items (e.g., Power Bar + Charger)?',
      yes: 'kit',
      no: 'product-for-resale',
    },
  },
  no: {
    question: 'Is it manufactured by a contract manufacturer (external)?',
    yes: 'contract-manufactured',
    no: 'raw-material',
  },
};

const itemTypeDescriptions: Record<string, { name: string; description: string; examples: string[] }> = {
  'make-to-order': {
    name: 'Make-to-Order',
    description: 'Finished goods assembled when customer places order. Not pre-built inventory.',
    examples: ['SOL-LCH-NTK-CBN-ST1', 'SOL-SOF-NTK-IND-ST2'],
  },
  'subassembly': {
    name: 'Subassembly',
    description: 'Products assembled in-house that are components of other products.',
    examples: ['CSH-LS-SEAT-CBN', 'FR-SOL-LCH-NTK'],
  },
  'contract-manufactured': {
    name: 'Contract Manufactured',
    description: 'Items manufactured by external partners. Purchased, not made in-house.',
    examples: ['COR-LS-SEAT', 'SHL-LS-SEAT-CBN'],
  },
  'kit': {
    name: 'Kit',
    description: 'Bundle of items sold together as a single SKU.',
    examples: ['HT-PB-G1R-151 (includes Power Bar + Charger)'],
  },
  'product-for-resale': {
    name: 'Product for Resale',
    description: 'Purchased items sold directly without modification.',
    examples: ['PRO-SOL-LCH', 'ACC-CARE-TEAK', 'FR-SOL-CTB-NT (tables)'],
  },
  'raw-material': {
    name: 'Raw Material',
    description: 'Materials and components used in manufacturing, not sold directly.',
    examples: ['FAB-SUN-SPTM-CBN', 'FOM-LS-SEAT', 'HW-GRM-4'],
  },
};

const KATANA_DOCS = [
  {
    title: 'Katana MRP Documentation',
    url: 'https://support.katanamrp.com/',
    description: 'Official Katana MRP support center and knowledge base',
    category: 'Main',
  },
  {
    title: 'Item Types Guide',
    url: 'https://support.katanamrp.com/hc/en-us/articles/360011440200-Item-types',
    description: 'Understanding Products, Materials, and Services in Katana',
    category: 'Core Concepts',
  },
  {
    title: 'Make-to-Order (MTO)',
    url: 'https://support.katanamrp.com/hc/en-us/articles/4403780481937-Make-to-Order-MTO-',
    description: 'Setting up and managing make-to-order products',
    category: 'Production',
  },
  {
    title: 'Bill of Materials (BOM)',
    url: 'https://support.katanamrp.com/hc/en-us/articles/360011440220-Bill-of-Materials-BOM-',
    description: 'Creating and managing BOMs in Katana',
    category: 'Production',
  },
  {
    title: 'Subassemblies',
    url: 'https://support.katanamrp.com/hc/en-us/articles/360011440240-Subassemblies',
    description: 'Working with subassembly products and nested BOMs',
    category: 'Production',
  },
  {
    title: 'Inventory Management',
    url: 'https://support.katanamrp.com/hc/en-us/articles/360011440260-Inventory-management',
    description: 'Managing stock levels and inventory tracking',
    category: 'Inventory',
  },
  {
    title: 'Stock Transfers',
    url: 'https://support.katanamrp.com/hc/en-us/articles/360011440280-Stock-transfers',
    description: 'Moving inventory between locations',
    category: 'Inventory',
  },
  {
    title: 'Purchase Orders',
    url: 'https://support.katanamrp.com/hc/en-us/articles/360011440320-Purchase-orders',
    description: 'Creating and managing purchase orders',
    category: 'Purchasing',
  },
];

function DecisionTreeExplorer() {
  const [path, setPath] = useState<boolean[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const getCurrentNode = (): DecisionNode | string => {
    let node: DecisionNode | string = decisionTree;
    for (const answer of path) {
      if (typeof node === 'string') return node;
      node = answer ? node.yes : node.no;
    }
    return node;
  };

  const currentNode = getCurrentNode();

  const handleAnswer = (answer: boolean) => {
    const newPath = [...path, answer];
    setPath(newPath);

    // Check if we've reached a result
    let node: DecisionNode | string = decisionTree;
    for (const a of newPath) {
      if (typeof node === 'string') break;
      node = a ? node.yes : node.no;
    }
    if (typeof node === 'string') {
      setResult(node);
    }
  };

  const reset = () => {
    setPath([]);
    setResult(null);
  };

  if (result) {
    const info = itemTypeDescriptions[result];
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="font-semibold text-green-800">Result: {info.name}</span>
        </div>
        <p className="text-green-700 mb-3">{info.description}</p>
        <div className="mb-4">
          <p className="text-sm font-medium text-green-800 mb-1">Examples:</p>
          <div className="flex flex-wrap gap-2">
            {info.examples.map(ex => (
              <code key={ex} className="text-xs bg-white px-2 py-1 rounded text-green-700">
                {ex}
              </code>
            ))}
          </div>
        </div>
        <button
          onClick={reset}
          className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
        >
          Start Over
        </button>
      </div>
    );
  }

  if (typeof currentNode === 'object') {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-start gap-3 mb-4">
          <HelpCircle className="w-5 h-5 text-sku-finished flex-shrink-0 mt-0.5" />
          <p className="text-lg text-gray-900">{currentNode.question}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => handleAnswer(true)}
            className="flex-1 px-4 py-3 bg-green-100 text-green-800 font-medium rounded-lg hover:bg-green-200 transition-colors"
          >
            Yes
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="flex-1 px-4 py-3 bg-red-100 text-red-800 font-medium rounded-lg hover:bg-red-200 transition-colors"
          >
            No
          </button>
        </div>
        {path.length > 0 && (
          <button
            onClick={reset}
            className="mt-3 text-sm text-gray-500 hover:text-gray-700"
          >
            Start over
          </button>
        )}
      </div>
    );
  }

  return null;
}

export default function KatanaPage() {
  const categories = [...new Set(KATANA_DOCS.map(doc => doc.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
            <Database className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-jet mb-2">
              Katana Integration Guide
            </h1>
            <p className="text-muted">
              Understanding how Outmore Living products map to Katana MRP item types.
              Use the decision tree to determine the correct type for any item.
            </p>
          </div>
        </div>
      </div>

      {/* Katana Documentation Links */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-hot-embers/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-hot-embers" />
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold text-jet">Katana MRP Documentation</h2>
            <p className="text-sm text-muted">Official guides and resources</p>
          </div>
        </div>

        <div className="space-y-6">
          {categories.map(category => (
            <div key={category}>
              <h3 className="text-sm font-display font-semibold text-jet uppercase tracking-wider mb-3">
                {category}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {KATANA_DOCS.filter(doc => doc.category === category).map(doc => (
                  <a
                    key={doc.title}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-sand rounded-lg p-4 hover:border-hot-embers/30 hover:bg-sand-light/50 transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-jet group-hover:text-hot-embers transition-colors text-sm">
                        {doc.title}
                      </h4>
                      <ExternalLink className="w-4 h-4 text-muted group-hover:text-hot-embers transition-colors flex-shrink-0" />
                    </div>
                    <p className="text-xs text-muted mt-1">{doc.description}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-sand">
          <Link
            href="/downloads"
            className="inline-flex items-center gap-2 text-sm text-hot-embers hover:underline"
          >
            <BookOpen className="w-4 h-4" />
            View all resources and downloads
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Decision Tree */}
      <div>
        <h2 className="text-lg font-display font-semibold text-jet mb-4">
          Item Type Decision Tree
        </h2>
        <DecisionTreeExplorer />
      </div>

      {/* Item Types Reference */}
      <div>
        <h2 className="text-lg font-display font-semibold text-jet mb-4">
          Item Type Reference
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(itemTypeDescriptions).map(([key, info]) => (
            <div key={key} className="card p-4">
              <h3 className="font-display font-medium text-jet mb-2">{info.name}</h3>
              <p className="text-sm text-muted mb-3">{info.description}</p>
              <div className="flex flex-wrap gap-1">
                {info.examples.slice(0, 2).map(ex => (
                  <code key={ex} className="text-xs bg-sand-light px-2 py-1 rounded">
                    {ex.split(' ')[0]}
                  </code>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part Number Ranges */}
      <div>
        <h2 className="text-lg font-display font-semibold text-jet mb-4">
          Part Number Ranges
        </h2>
        <div className="card overflow-hidden">
          <table className="w-full data-table">
            <thead>
              <tr>
                <th className="text-left px-4 py-3 text-sm font-display font-medium text-jet">Range</th>
                <th className="text-left px-4 py-3 text-sm font-display font-medium text-jet">Category</th>
                <th className="text-left px-4 py-3 text-sm font-display font-medium text-jet">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand">
              {PART_NUMBER_RANGES.map(range => (
                <tr key={range.category} className="hover:bg-sand-light">
                  <td className="px-4 py-3">
                    <code className="font-mono text-sm">
                      {range.start.toLocaleString()}-{range.end.toLocaleString()}
                    </code>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: CATEGORY_COLORS[range.category] }}
                      />
                      <span className="text-sm">{CATEGORY_NAMES[range.category]}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted">
                    {range.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Rules */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h2 className="font-display font-medium text-amber-900 mb-3">Key Rules for Katana</h2>
        <div className="space-y-3 text-sm text-amber-800">
          <p>
            <strong>Subassembly flag:</strong> An item is marked as subassembly if it&apos;s
            used as a component in another product&apos;s BOM. Frames for heated seating,
            cushions, shells, and cores are all subassemblies.
          </p>
          <p>
            <strong>Tables are different:</strong> Unlike heated seating frames, table frames
            (CTB, STB, SDT, RDT) and the non-heated ottoman (OTM) are sold directly as
            finished products - they&apos;re &quot;Product for Resale&quot; not subassemblies.
          </p>
          <p>
            <strong>Contract manufacturing:</strong> Shells and Core Inserts are manufactured
            by external partners. Outmore provides materials (fabric, labels for shells);
            the CM provides zipper/thread. These are purchased, not made in-house.
          </p>
          <p>
            <strong>Kits vs Bundles:</strong> Power Bar (HT-PB-G1R-151) is a kit because
            charger is always included. Furniture sets on Shopify are NOT Katana kits -
            they&apos;re shopping cart configurations.
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-amber-200">
          <p className="text-sm text-amber-800">
            Need help with Katana setup?{' '}
            <a
              href="https://support.katanamrp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-900 font-medium hover:underline inline-flex items-center gap-1"
            >
              Visit Katana Support <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
