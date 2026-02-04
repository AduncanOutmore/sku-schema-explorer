'use client';

import { useEffect, useRef, useState } from 'react';

interface MermaidDiagramProps {
  chart: string;
  id: string;
}

export function MermaidDiagram({ chart, id }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Dynamic import to avoid SSR issues
        const mermaid = (await import('mermaid')).default;

        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            primaryColor: '#2F5496',
            primaryTextColor: '#fff',
            primaryBorderColor: '#1a3a6e',
            lineColor: '#5b9bd5',
            secondaryColor: '#70AD47',
            tertiaryColor: '#FFC000',
          },
          flowchart: {
            curve: 'basis',
            padding: 20,
          },
        });

        if (containerRef.current) {
          containerRef.current.innerHTML = '';
          const { svg } = await mermaid.render(id, chart);
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        console.error('Mermaid render error:', err);
        setError('Failed to render diagram');
      } finally {
        setIsLoading(false);
      }
    };

    renderDiagram();
  }, [chart, id]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="animate-pulse text-gray-500">Loading diagram...</div>
        </div>
      )}
      <div
        ref={containerRef}
        className={`mermaid-container overflow-auto p-4 bg-white rounded-lg border border-gray-200 ${
          isLoading ? 'min-h-[200px]' : ''
        }`}
      />
    </div>
  );
}
