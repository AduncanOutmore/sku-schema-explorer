'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { GLOSSARY, GLOSSARY_CATEGORIES } from '@/data/glossary';
import { AbbreviationCategory, GlossaryEntry } from '@/types/glossary';
import { CopyButton } from '@/components/shared/CopyButton';

export function GlossaryTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AbbreviationCategory | 'all'>('all');

  const filteredEntries = useMemo(() => {
    let entries = GLOSSARY;

    // Filter by category
    if (selectedCategory !== 'all') {
      entries = entries.filter(e => e.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      entries = entries.filter(
        e =>
          e.abbreviation.toLowerCase().includes(query) ||
          e.meaning.toLowerCase().includes(query)
      );
    }

    return entries;
  }, [searchQuery, selectedCategory]);

  const groupedEntries = useMemo(() => {
    if (selectedCategory !== 'all') {
      return [{ category: selectedCategory, entries: filteredEntries }];
    }

    const groups: { category: AbbreviationCategory; entries: GlossaryEntry[] }[] = [];
    GLOSSARY_CATEGORIES.forEach(category => {
      const entries = filteredEntries.filter(e => e.category === category);
      if (entries.length > 0) {
        groups.push({ category, entries });
      }
    });
    return groups;
  }, [filteredEntries, selectedCategory]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  const hasFilters = searchQuery || selectedCategory !== 'all';

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search abbreviations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sku-finished focus:border-transparent"
          />
        </div>

        {/* Category filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as AbbreviationCategory | 'all')}
            className="pl-9 pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sku-finished focus:border-transparent appearance-none bg-white"
          >
            <option value="all">All Categories</option>
            {GLOSSARY_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Clear filters */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500">
        Showing {filteredEntries.length} of {GLOSSARY.length} abbreviations
      </p>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {groupedEntries.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No abbreviations found matching your search.
          </div>
        ) : (
          groupedEntries.map(({ category, entries }) => (
            <div key={category}>
              {/* Category header */}
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700">{category}</h3>
              </div>

              {/* Entries */}
              <table className="w-full">
                <tbody className="divide-y divide-gray-100">
                  {entries.map((entry) => (
                    <tr key={entry.abbreviation} className="hover:bg-gray-50">
                      <td className="px-4 py-3 w-28">
                        <div className="flex items-center gap-2">
                          <code className="font-mono text-sm font-semibold text-sku-finished bg-blue-50 px-2 py-0.5 rounded">
                            {entry.abbreviation}
                          </code>
                          <CopyButton text={entry.abbreviation} size="sm" />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {entry.meaning}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
