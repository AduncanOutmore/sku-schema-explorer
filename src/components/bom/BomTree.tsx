'use client';

import { useState, useMemo } from 'react';
import { ChevronRight, ChevronDown, Expand, Minimize2 } from 'lucide-react';
import { BomNode as BomNodeType } from '@/types/bom';
import { CATEGORY_COLORS, CATEGORY_NAMES } from '@/types/product';
import { CopyButton } from '@/components/shared/CopyButton';

interface BomTreeProps {
  root: BomNodeType;
}

interface BomNodeProps {
  node: BomNodeType;
  expandedNodes: Set<string>;
  onToggle: (sku: string) => void;
}

function BomNodeRow({ node, expandedNodes, onToggle }: BomNodeProps) {
  const hasChildren = node.children.length > 0;
  const isExpanded = expandedNodes.has(node.sku);
  const color = CATEGORY_COLORS[node.category];

  return (
    <div>
      <div
        className={`
          flex items-center py-2 px-2 border-b border-gray-100
          ${hasChildren ? 'cursor-pointer hover:bg-gray-50' : ''}
        `}
        style={{ paddingLeft: `${node.level * 24 + 8}px` }}
        onClick={() => hasChildren && onToggle(node.sku)}
      >
        {/* Expand/Collapse icon */}
        <div className="w-5 h-5 flex items-center justify-center mr-1">
          {hasChildren && (
            isExpanded
              ? <ChevronDown className="w-4 h-4 text-gray-500" />
              : <ChevronRight className="w-4 h-4 text-gray-500" />
          )}
        </div>

        {/* Category color dot */}
        <span
          className="w-3 h-3 rounded-full flex-shrink-0 mr-2"
          style={{ backgroundColor: color }}
          title={CATEGORY_NAMES[node.category]}
        />

        {/* SKU */}
        <code className="font-mono text-sm font-medium text-gray-800 mr-2">
          {node.sku}
        </code>

        {/* Copy button */}
        <CopyButton text={node.sku} size="sm" />

        {/* Name */}
        <span className="flex-1 text-sm text-gray-600 ml-2 truncate">
          {node.name}
        </span>

        {/* Quantity */}
        <span className="text-sm text-gray-500 ml-2 flex-shrink-0">
          {node.quantity} {node.unit}
        </span>
      </div>

      {/* Children */}
      {isExpanded && node.children.map(child => (
        <BomNodeRow
          key={child.sku}
          node={child}
          expandedNodes={expandedNodes}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export function BomTree({ root }: BomTreeProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(() => new Set([root.sku]));

  const toggleNode = (sku: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(sku)) {
        next.delete(sku);
      } else {
        next.add(sku);
      }
      return next;
    });
  };

  // Collect all SKUs for expand all
  const allSkus = useMemo(() => {
    const skus: string[] = [];
    const collect = (node: BomNodeType) => {
      if (node.children.length > 0) {
        skus.push(node.sku);
        node.children.forEach(collect);
      }
    };
    collect(root);
    return skus;
  }, [root]);

  const expandAll = () => {
    setExpandedNodes(new Set(allSkus));
  };

  const collapseAll = () => {
    setExpandedNodes(new Set([root.sku]));
  };

  const isAllExpanded = expandedNodes.size === allSkus.length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header with controls */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="font-medium text-gray-900">Bill of Materials</h3>
        <div className="flex gap-2">
          <button
            onClick={collapseAll}
            className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:bg-gray-200 rounded"
            title="Collapse all"
          >
            <Minimize2 className="w-3 h-3" />
            Collapse
          </button>
          <button
            onClick={expandAll}
            className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:bg-gray-200 rounded"
            title="Expand all"
          >
            <Expand className="w-3 h-3" />
            Expand All
          </button>
        </div>
      </div>

      {/* Tree */}
      <div className="max-h-[600px] overflow-auto">
        <BomNodeRow
          node={root}
          expandedNodes={expandedNodes}
          onToggle={toggleNode}
        />
      </div>

      {/* Footer legend */}
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-sku-finished" />
            Finished
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-sku-frame" />
            Frame
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-sku-cushion" />
            Cushion
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-sku-core" />
            Core
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-sku-shell" />
            Shell
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-sku-heat" />
            Heat Tech
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-sku-material" />
            Material
          </span>
        </div>
      </div>
    </div>
  );
}
