'use client';

import { useState } from 'react';
import { Poppins, DM_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-display',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en" className={`${poppins.variable} ${dmSans.variable}`}>
      <head>
        <title>SKU Schema Explorer - Outmore Living</title>
        <meta name="description" content="Interactive SKU schema explorer for Outmore Living heated outdoor furniture" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-cream text-jet antialiased">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Main content area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <Header
              onMenuClick={() => setSidebarOpen(!sidebarOpen)}
              isSidebarOpen={sidebarOpen}
            />

            {/* Main content */}
            <main className="flex-1 overflow-auto p-4 lg:p-6">
              <div className="max-w-6xl mx-auto">
                <Breadcrumb />
                {children}
              </div>
            </main>

            {/* Footer */}
            <footer className="border-t-2 border-jet py-6 text-center text-muted text-xs">
              <p>Outmore Living SKU Schema v5.4</p>
              <p>Interactive BOM Explorer for Katana MRP</p>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
