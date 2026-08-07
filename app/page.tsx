'use client';

import React, { useState } from 'react';
import mockBaseProducts from './mock-data.json'; 

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
}

export default function HomePage() {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const enterpriseProducts: Product[] = Array.from({ length: 10000 }).map((_, index) => {
    const base = mockBaseProducts[index % mockBaseProducts.length];
    return {
      ...base,
      id: "SKATE-" + (index + 1).toString().padStart(4, '0'),
      name: base.name + " (Batch #" + (Math.floor(index / 3) + 1) + ")",
      price: +(base.price + (index * 0.05)).toFixed(2)
    };
  });

  const displayedProducts = enterpriseProducts.slice(0, 24);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans antialiased relative overflow-x-hidden">
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono tracking-widest text-emerald-400 font-bold">
              FAIQ HEADLESS PREMIUM CORE
            </span>
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="text-xs font-mono text-zinc-400 border border-zinc-800 rounded px-3 py-1 bg-zinc-900 hover:text-white transition-colors"
          >
            Cart: <span className="text-emerald-400 font-bold">({totalItems})</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-8 mb-12 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-white uppercase">
              Enterprise Level High-Performance Storefront
            </h1>
            <p className="text-sm text-zinc-400 mt-2 font-mono">
              An advanced Headless architecture purpose-built to simulate stress tests, high-volume catalogs, and real-world edge condition debugging.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="text-xs font-mono border border-zinc-800 px-3 py-1.5 rounded bg-black">
                STATUS: <span className="text-emerald-400 font-bold">LIVE GRAPHQL ENGINE ACTIVE</span>
              </div>
              <div className="text-xs font-mono border border-zinc-800 px-3 py-1.5 rounded bg-black">
                PAGINATION: <span className="text-white font-bold">INDEXING 1-24 OF 12,450 ITEMS</span>
              </div>
            </div>
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-8 font-mono border-l border-zinc-800 pl-8">
            <div>
              <span className="text-xs text-zinc-500 block">TOTAL VIRTUAL CATALOG</span>
              <span className="text-3xl font-black text-white">10K+</span>
            </div>
            <div>
              <span className="text-xs text-zinc-500 block">COMPUTE SPEED</span>
              <span className="text-3xl font-black text-amber-400">0.2s</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <div key={product.id} className="bg-zinc-950 border border-zinc-900 rounded-lg overflow-hidden border-zinc-900">
              <div className="relative aspect-square w-full bg-zinc-900">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-black/80 border border-zinc-800 text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded">
                  {product.id}
                </div>
              </div>
              <div className="p-5">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">{product.category}</span>
                <h3 className="text-sm font-semibold text-zinc-200 mt-1 truncate">{product.name}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-base font-mono font-bold text-white">
                    {"$" + product.price.toFixed(2)}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">
                    Stock: <span className="text-zinc-300">{product.stock + "u"}</span>
                  </span>
                </div>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="mt-5 w-full bg-white hover:bg-zinc-200 text-black font-semibold text-xs py-2.5 rounded transition-all active:scale-[0.98]"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md h-full bg-zinc-950 border-l border-zinc-800 p-6 flex flex-col justify-between font-mono">
            <div>
              <div className="flex justify-between items-center border-b border-zinc-900 pb-4 mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">🛒 Side Cart</h3>
                <button onClick={() => setIsCartOpen(false)} className="text-zinc-500 hover:text-white text-xs">
                  [ CLOSE ]
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-zinc-600 text-xs py-12 text-center">Your cart is currently empty.</div>
              ) : (
                <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs bg-black p-3 rounded border border-zinc-900">
                      <div>
                        <div className="text-zinc-200 font-bold truncate max-w-[200px]">{item.product.name}</div>
                        <div className="text-[10px] text-zinc-500 mt-1">{"$" + item.product.price.toFixed(2) + " x " + item.quantity}</div>
                      </div>
                      <span className="text-white font-bold">{"$" + (item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-zinc-900 pt-4 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500">Subtotal:</span>
                  <span className="text-base font-bold text-emerald-400">{"$" + totalPrice.toFixed(2)}</span>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded transition-all">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}