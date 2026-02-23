'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/lib/products';

interface QuoteContextType {
  quoteProducts: Product[];
  addToQuote: (product: Product) => void;
  removeFromQuote: (productId: string) => void;
  isInQuote: (productId: string) => boolean;
  clearQuote: () => void;
  quoteCount: number;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [quoteProducts, setQuoteProducts] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('quoteProducts');
    if (stored) {
      setQuoteProducts(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('quoteProducts', JSON.stringify(quoteProducts));
  }, [quoteProducts]);

  const addToQuote = (product: Product) => {
    setQuoteProducts((prev) => {
      if (prev.find((p) => p.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromQuote = (productId: string) => {
    setQuoteProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const isInQuote = (productId: string) => {
    return quoteProducts.some((p) => p.id === productId);
  };

  const clearQuote = () => {
    setQuoteProducts([]);
  };

  const quoteCount = quoteProducts.length;

  return (
    <QuoteContext.Provider
      value={{
        quoteProducts,
        addToQuote,
        removeFromQuote,
        isInQuote,
        clearQuote,
        quoteCount,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
}