'use client';

import { useState, useMemo } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FABRIC_COLORS } from '@/data/fabrics';
import { getProductBySku } from '@/data/products';
import { CopyButton } from '@/components/shared/CopyButton';
import { CATEGORY_COLORS, CATEGORY_NAMES, ProductCategory } from '@/types/product';

// Product types
const PRODUCT_TYPES = [
  { code: 'LCH', name: 'Lounge Chair' },
  { code: 'LOV', name: 'Loveseat' },
  { code: 'SOF', name: 'Sofa' },
  { code: 'HOT', name: 'Heated Ottoman' },
  { code: 'CHS', name: 'Chaise Lounge' },
  { code: 'SVL', name: 'Swivel Chair' },
  { code: 'DAC', name: 'Dining Arm Chair' },
  { code: 'DCH', name: 'Dining Side Chair' },
];

// Component types
const COMPONENT_TYPES = [
  { code: 'SEAT', name: 'Seat' },
  { code: 'BACK', name: 'Back (Foam)' },
  { code: 'PILB', name: 'Pillow Back' },
];

// SKU categories that can be built
const BUILDABLE_CATEGORIES = [
  { key: 'finished-good', name: 'Finished Good', prefix: 'SOL' },
  { key: 'cushion', name: 'Cushion', prefix: 'CSH' },
  { key: 'shell', name: 'Shell', prefix: 'SHL' },
  { key: 'core-insert', name: 'Core Insert', prefix: 'COR' },
];

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { code: string; name: string }[];
  placeholder: string;
}

function SelectField({ label, value, onChange, options, placeholder }: SelectFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sku-finished focus:border-transparent"
      >
        <option value="">{placeholder}</option>
        {options.map(opt => (
          <option key={opt.code} value={opt.code}>{opt.name} ({opt.code})</option>
        ))}
      </select>
    </div>
  );
}

export function SkuBuilder() {
  const [category, setCategory] = useState('');
  const [productType, setProductType] = useState('');
  const [setType, setSetType] = useState('');
  const [fabric, setFabric] = useState('');
  const [component, setComponent] = useState('');

  // Build SKU based on selections
  const builtSku = useMemo(() => {
    if (!category) return null;

    switch (category) {
      case 'finished-good':
        if (productType && fabric && setType) {
          return `SOL-${productType}-NTK-${fabric}-${setType}`;
        }
        break;
      case 'cushion':
        if (component && fabric) {
          return `CSH-LS-${component}-${fabric}`;
        }
        break;
      case 'shell':
        if (component && fabric) {
          return `SHL-LS-${component}-${fabric}`;
        }
        break;
      case 'core-insert':
        if (component) {
          return `COR-LS-${component}`;
        }
        break;
    }
    return null;
  }, [category, productType, setType, fabric, component]);

  // Validate SKU
  const product = useMemo(() => {
    if (!builtSku) return null;
    return getProductBySku(builtSku);
  }, [builtSku]);

  // Reset dependent fields when category changes
  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setProductType('');
    setSetType('');
    setFabric('');
    setComponent('');
  };

  const fabricOptions = FABRIC_COLORS.map(f => ({ code: f.code, name: f.name }));

  return (
    <div className="space-y-6">
      {/* Category selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What do you want to build?
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {BUILDABLE_CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => handleCategoryChange(cat.key)}
              className={`
                p-3 rounded-lg border text-left transition-colors
                ${category === cat.key
                  ? 'border-sku-finished bg-blue-50 ring-2 ring-sku-finished'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLORS[cat.key as ProductCategory] }}
                />
                <span className="font-medium text-gray-900">{cat.name}</span>
              </div>
              <code className="text-xs text-gray-500">{cat.prefix}-...</code>
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic fields based on category */}
      {category && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-medium text-gray-900 mb-4">
            Configure {BUILDABLE_CATEGORIES.find(c => c.key === category)?.name}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Finished Good fields */}
            {category === 'finished-good' && (
              <>
                <SelectField
                  label="Product Type"
                  value={productType}
                  onChange={setProductType}
                  options={PRODUCT_TYPES}
                  placeholder="Select product..."
                />
                <SelectField
                  label="Fabric Color"
                  value={fabric}
                  onChange={setFabric}
                  options={fabricOptions}
                  placeholder="Select fabric..."
                />
                <SelectField
                  label="Set Type"
                  value={setType}
                  onChange={setSetType}
                  options={[
                    { code: 'ST1', name: 'Standard (Foam Back)' },
                    { code: 'ST2', name: 'Pillow Back' },
                  ]}
                  placeholder="Select set type..."
                />
              </>
            )}

            {/* Cushion/Shell fields */}
            {(category === 'cushion' || category === 'shell') && (
              <>
                <SelectField
                  label="Component Type"
                  value={component}
                  onChange={setComponent}
                  options={COMPONENT_TYPES}
                  placeholder="Select component..."
                />
                <SelectField
                  label="Fabric Color"
                  value={fabric}
                  onChange={setFabric}
                  options={fabricOptions}
                  placeholder="Select fabric..."
                />
              </>
            )}

            {/* Core Insert fields */}
            {category === 'core-insert' && (
              <SelectField
                label="Component Type"
                value={component}
                onChange={setComponent}
                options={COMPONENT_TYPES}
                placeholder="Select component..."
              />
            )}
          </div>

          {/* Note for core inserts */}
          {category === 'core-insert' && (
            <p className="mt-3 text-sm text-gray-500">
              Note: Core inserts don&apos;t have fabric codes - they&apos;re universal across all colors.
            </p>
          )}
        </div>
      )}

      {/* Generated SKU */}
      {builtSku && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="font-medium text-gray-900">Generated SKU</h3>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <code className="text-2xl font-mono font-bold text-sku-finished">
              {builtSku}
            </code>
            <CopyButton text={builtSku} size="md" />
          </div>

          {product ? (
            <div className="bg-green-50 rounded-lg p-4">
              <p className="font-medium text-green-800 mb-1">Valid Product</p>
              <p className="text-green-700 mb-2">{product.name}</p>
              {product.partNumber && (
                <p className="text-sm text-green-600 mb-3">
                  Part Number: {product.partNumber}
                </p>
              )}
              <Link
                href={`/bom/${builtSku}`}
                className="inline-flex items-center gap-1 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
              >
                View BOM <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ) : (
            <div className="bg-amber-50 rounded-lg p-4">
              <p className="text-amber-800">
                SKU pattern is valid, but this specific product is not in the database.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
