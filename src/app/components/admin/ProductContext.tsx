"use client";

import React, { createContext, useContext, useState } from 'react';

export type Product = 'mct' | 'nbc';

interface ProductContextType {
  activeProduct: Product;
  setActiveProduct: (product: Product) => void;
  productLabel: (product: Product) => string;
  productDescription: (product: Product) => string;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [activeProduct, setActiveProduct] = useState<Product>('mct');

  const productLabel = (product: Product) => {
    return product === 'mct' ? 'Malaika Control Tower' : 'Nayeli BIM Control';
  };

  const productDescription = (product: Product) => {
    return product === 'mct'
      ? 'Supply chain and logistics management platform'
      : 'Building Information Modeling control system';
  };

  return (
    <ProductContext.Provider
      value={{
        activeProduct,
        setActiveProduct,
        productLabel,
        productDescription,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within ProductProvider');
  }
  return context;
}
