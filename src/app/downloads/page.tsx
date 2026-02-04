'use client';

import { Download, FileSpreadsheet, Clock, GitCommit, ExternalLink, BookOpen } from 'lucide-react';

const CHANGELOG = [
  {
    version: '1.2.0',
    date: '2025-02-04',
    changes: [
      'Added Guided Tour with interactive SKU documentation',
      'Added SKU Configurator with BOM tree visualization',
      'Added Master Data table with full product inventory',
      'Added Downloads section with CSV exports',
      'Integrated Outmore brand design system',
      'Added Katana MRP documentation links',
    ],
  },
  {
    version: '1.1.0',
    date: '2025-02-03',
    changes: [
      'Added Fabric Selector with all 16 fabric colors',
      'Added BOM Explorer with multi-level expansion',
      'Added Search functionality across all SKUs',
      'Added SKU Builder and Decoder tools',
      'Added Glossary with 97 abbreviation entries',
    ],
  },
  {
    version: '1.0.0',
    date: '2025-02-02',
    changes: [
      'Initial release of SKU Schema Explorer',
      'Product Hierarchy visualization with Mermaid diagrams',
      'Core data structure with 224+ product SKUs',
      'Responsive layout with sidebar navigation',
    ],
  },
];

const DOWNLOADS = [
  {
    name: 'Abbreviation Glossary',
    filename: 'abbreviation-glossary.csv',
    description: 'Complete glossary of 97+ abbreviations used in the SKU schema, including prefixes, product codes, component codes, finishes, and colors.',
    size: '8 KB',
    entries: '99 entries',
  },
  {
    name: 'Katana Master Data',
    filename: 'outmore-katana-master.csv',
    description: 'Full master product data including part numbers, SKUs, names, categories, Katana item types, uses, and sellable status.',
    size: '45 KB',
    entries: '50+ products',
  },
];

const KATANA_RESOURCES = [
  {
    name: 'Katana MRP Documentation',
    url: 'https://support.katanamrp.com/',
    description: 'Official Katana MRP support documentation and knowledge base.',
  },
  {
    name: 'Item Types Guide',
    url: 'https://support.katanamrp.com/hc/en-us/articles/360011440200-Item-types',
    description: 'Understanding Products, Materials, and Services in Katana.',
  },
  {
    name: 'Make-to-Order Guide',
    url: 'https://support.katanamrp.com/hc/en-us/articles/4403780481937-Make-to-Order-MTO-',
    description: 'Setting up and managing make-to-order products.',
  },
  {
    name: 'Bill of Materials (BOM)',
    url: 'https://support.katanamrp.com/hc/en-us/articles/360011440220-Bill-of-Materials-BOM-',
    description: 'Creating and managing BOMs in Katana.',
  },
  {
    name: 'Subassemblies',
    url: 'https://support.katanamrp.com/hc/en-us/articles/360011440240-Subassemblies',
    description: 'Working with subassembly products and nested BOMs.',
  },
  {
    name: 'Inventory Management',
    url: 'https://support.katanamrp.com/hc/en-us/articles/360011440260-Inventory-management',
    description: 'Managing stock levels and inventory tracking.',
  },
];

export default function DownloadsPage() {
  const handleDownload = (filename: string) => {
    // In a real app, these would link to actual file URLs
    // For now, we'll show the path where files should be hosted
    alert(`Download: /downloads/${filename}\n\nNote: CSV files should be placed in the public/downloads folder for direct download.`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-jet mb-2">Downloads & Resources</h1>
        <p className="text-muted">
          Download CSV data files and access Katana MRP documentation.
        </p>
      </div>

      {/* CSV Downloads */}
      <section className="card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-hot-embers/10 flex items-center justify-center">
            <FileSpreadsheet className="w-5 h-5 text-hot-embers" />
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold text-jet">Data Files</h2>
            <p className="text-sm text-muted">CSV exports for reference and integration</p>
          </div>
        </div>

        <div className="grid gap-4">
          {DOWNLOADS.map((file) => (
            <div
              key={file.filename}
              className="border border-sand rounded-lg p-4 hover:border-hot-embers/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-jet">{file.name}</h3>
                  <p className="text-sm text-muted mt-1">{file.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <FileSpreadsheet className="w-3 h-3" />
                      {file.filename}
                    </span>
                    <span>{file.size}</span>
                    <span>{file.entries}</span>
                  </div>
                </div>
                <a
                  href={`/downloads/${file.filename}`}
                  download
                  className="btn btn-primary flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Katana Resources */}
      <section className="card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-jet/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-jet" />
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold text-jet">Katana MRP Resources</h2>
            <p className="text-sm text-muted">Official documentation and guides</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {KATANA_RESOURCES.map((resource) => (
            <a
              key={resource.name}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-sand rounded-lg p-4 hover:border-hot-embers/30 hover:bg-sand-light/50 transition-all group"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-display font-semibold text-jet group-hover:text-hot-embers transition-colors">
                  {resource.name}
                </h3>
                <ExternalLink className="w-4 h-4 text-muted group-hover:text-hot-embers transition-colors flex-shrink-0" />
              </div>
              <p className="text-sm text-muted mt-2">{resource.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Changelog */}
      <section className="card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <GitCommit className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold text-jet">Changelog</h2>
            <p className="text-sm text-muted">Version history and updates</p>
          </div>
        </div>

        <div className="space-y-6">
          {CHANGELOG.map((release, index) => (
            <div key={release.version} className="relative">
              {/* Version header */}
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-hot-embers text-white text-sm font-semibold">
                  v{release.version}
                </span>
                <span className="flex items-center gap-1 text-sm text-muted">
                  <Clock className="w-3 h-3" />
                  {new Date(release.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                {index === 0 && (
                  <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded">
                    Latest
                  </span>
                )}
              </div>

              {/* Changes list */}
              <ul className="space-y-2 pl-4 border-l-2 border-sand ml-4">
                {release.changes.map((change, changeIndex) => (
                  <li key={changeIndex} className="relative text-sm text-jet pl-4">
                    <span className="absolute left-[-9px] top-2 w-2 h-2 rounded-full bg-sand"></span>
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Integration Notes */}
      <section className="card p-6 bg-sand-light border-sand">
        <h3 className="font-display font-semibold text-jet mb-3">Integration Notes</h3>
        <div className="space-y-3 text-sm text-muted">
          <p>
            <strong className="text-jet">CSV Import:</strong> Both CSV files are formatted for direct import into Katana MRP,
            Google Sheets, or Microsoft Excel. Column headers match Katana's expected format.
          </p>
          <p>
            <strong className="text-jet">SKU Matching:</strong> When importing to Katana, ensure SKUs match exactly
            (case-sensitive). The abbreviation glossary can help decode any unfamiliar codes.
          </p>
          <p>
            <strong className="text-jet">BOM Relationships:</strong> Parent-child relationships in the master data
            correspond to the BOM structures shown in the BOM Explorer tool.
          </p>
        </div>
      </section>
    </div>
  );
}
