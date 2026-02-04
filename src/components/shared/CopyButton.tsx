'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  label?: string;
  size?: 'sm' | 'md';
}

export function CopyButton({ text, label, size = 'md' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const buttonSize = size === 'sm' ? 'p-1' : 'p-1.5';

  return (
    <button
      onClick={handleCopy}
      className={`
        inline-flex items-center gap-1 rounded-md
        text-gray-500 hover:text-gray-700 hover:bg-gray-100
        transition-colors ${buttonSize}
      `}
      title={copied ? 'Copied!' : `Copy ${label || text}`}
    >
      {copied ? (
        <Check className={`${iconSize} text-green-500`} />
      ) : (
        <Copy className={iconSize} />
      )}
      {label && <span className="text-xs">{label}</span>}
    </button>
  );
}

// Combined SKU display with copy button
export function CopyableSku({ sku, className = '' }: { sku: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <code className="font-mono text-sm bg-gray-100 px-1.5 py-0.5 rounded">
        {sku}
      </code>
      <CopyButton text={sku} size="sm" />
    </span>
  );
}
