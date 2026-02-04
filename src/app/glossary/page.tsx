'use client';

import { useState, useMemo } from 'react';
import { BookOpen, Search, Filter } from 'lucide-react';
import { GLOSSARY_ENTRIES } from '@/data/glossary';

const CATEGORIES = [
  'All',
  'Prefix',
  'Product',
  'Component',
  'Finish',
  'Heat Tech',
  'Fabric Pattern',
  'Color',
  'Hardware',
  'Label',
  'Accessory',
  'Marketing',
  'Other',
];

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEntries = useMemo(() => {
    return GLOSSARY_ENTRIES.filter((entry) => {
      const matchesSearch =
        searchQuery === '' ||
        entry.abbreviation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.meaning.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || entry.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="card-body">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-sand-light flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-hot-embers" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-semibold text-jet mb-2">
                Abbreviation Glossary
              </h1>
              <p className="text-muted">
                Complete reference of all {GLOSSARY_ENTRIES.length} abbreviations used in Outmore Living SKUs.
                Use Ctrl/Cmd+F for quick browser search.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick reference */}
      <div className="note">
        <strong>Quick Reference:</strong> All SKU abbreviations used across the Outmore Living product catalog.
      </div>

      {/* Search and filters */}
      <div className="card">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search by code or meaning..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-sand rounded-md bg-cream focus:outline-none focus:ring-2 focus:ring-hot-embers"
              />
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn text-xs py-1.5 px-3 ${
                  selectedCategory === cat
                    ? 'bg-hot-embers text-white border-hot-embers'
                    : ''
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted">
        Showing {filteredEntries.length} of {GLOSSARY_ENTRIES.length} entries
      </p>

      {/* Glossary table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="w-24">Code</th>
                <th>Meaning</th>
                <th className="w-32">Category</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center text-muted py-8">
                    No matching abbreviations found.
                  </td>
                </tr>
              ) : (
                filteredEntries.map((entry) => (
                  <tr key={entry.abbreviation}>
                    <td className="sku font-mono font-semibold">{entry.abbreviation}</td>
                    <td>{entry.meaning}</td>
                    <td>
                      <span className={`
                        inline-block px-2 py-0.5 rounded text-xs font-medium
                        ${entry.category === 'Prefix' ? 'bg-hot-embers/10 text-hot-embers' :
                          entry.category === 'Product' ? 'bg-jet/10 text-jet' :
                          entry.category === 'Component' ? 'bg-jet-light/10 text-jet-light' :
                          entry.category === 'Finish' ? 'bg-sand text-jet' :
                          entry.category === 'Heat Tech' ? 'bg-jet-lighter/10 text-jet-lighter' :
                          entry.category === 'Fabric Pattern' ? 'bg-sand-light text-jet' :
                          entry.category === 'Color' ? 'bg-hot-embers/10 text-hot-embers' :
                          'bg-sand-light text-muted'}
                      `}>
                        {entry.category}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
