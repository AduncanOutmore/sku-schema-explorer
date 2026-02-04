import { GlossaryTable } from '@/components/glossary/GlossaryTable';
import { BookOpen } from 'lucide-react';

export default function GlossaryPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6 text-sku-cushion" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Abbreviation Glossary
            </h1>
            <p className="text-gray-600">
              Complete reference of all abbreviations used in Outmore Living SKUs.
              Search by code or meaning, and filter by category to find what you need.
            </p>
          </div>
        </div>
      </div>

      {/* Quick reference */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <h2 className="font-medium text-blue-900 mb-2">Common Patterns</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
          <div className="bg-white rounded-lg p-3">
            <code className="text-sku-finished font-semibold">SOL</code>
            <span className="text-gray-600 ml-2">= Solerno Collection</span>
          </div>
          <div className="bg-white rounded-lg p-3">
            <code className="text-sku-finished font-semibold">LCH</code>
            <span className="text-gray-600 ml-2">= Lounge Chair</span>
          </div>
          <div className="bg-white rounded-lg p-3">
            <code className="text-sku-finished font-semibold">CBN</code>
            <span className="text-gray-600 ml-2">= Carbon (fabric)</span>
          </div>
          <div className="bg-white rounded-lg p-3">
            <code className="text-sku-finished font-semibold">ST1/ST2</code>
            <span className="text-gray-600 ml-2">= Set Type 1/2</span>
          </div>
          <div className="bg-white rounded-lg p-3">
            <code className="text-sku-finished font-semibold">LS</code>
            <span className="text-gray-600 ml-2">= Lounge Seating</span>
          </div>
          <div className="bg-white rounded-lg p-3">
            <code className="text-sku-finished font-semibold">NTK</code>
            <span className="text-gray-600 ml-2">= Natural Teak</span>
          </div>
        </div>
      </div>

      {/* Glossary table */}
      <GlossaryTable />
    </div>
  );
}
