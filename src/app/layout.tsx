'use client';

import { useState } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>SKU Schema Explorer - Outmore Living</title>
        <meta name="description" content="Interactive SKU schema explorer for Outmore Living heated outdoor furniture" />
      </head>
      <body className={`${inter.className} bg-gray-50`}>
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
              <Breadcrumb />
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
