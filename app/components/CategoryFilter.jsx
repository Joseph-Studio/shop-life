'use client';
import { useState, useEffect, useMemo } from 'react';

export default function CategoryFilter() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [q, setQ] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('https://fakestoreapi.com/products').then(r => r.json()),
      fetch('https://fakestoreapi.com/products/categories').then(r => r.json())
    ]).then(([prods, cats]) => {
      setProducts(prods);
      setCategories(cats);
    }).catch(console.error);
  }, []);

  const filteredProducts = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return products.filter(p => {
      const byCat = selectedCategory === 'all' || p.category === selectedCategory;
      const byText =
        !needle ||
        p.title.toLowerCase().includes(needle) ||
        p.description.toLowerCase().includes(needle);
      return byCat && byText;
    });
  }, [products, selectedCategory, q]);

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:justify-end">
          <input
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:max-w-xs"
            placeholder="Search products…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:max-w-xs text-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((p) => (
          <article
            key={p.id}
            className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <div className="flex h-48 w-full items-center justify-center overflow-hidden rounded-md bg-gray-50">
              <img
                src={p.image}
                alt={p.title}
                className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <h3 className="mt-3 line-clamp-2 text-sm font-medium text-gray-900">{p.title}</h3>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-base font-semibold text-red-600">${p.price}</span>
              <span className="text-xs text-gray-500">{p.category}</span>
            </div>
            {p.rating && (
              <div className="mt-1 text-xs text-gray-500">
                {p.rating.rate}★ ({p.rating.count})
              </div>
            )}
            <button
              className="mt-3 w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              onClick={() => alert("Add ${p.title} id ${p.id} to cart )")}
            >
              Add to cart
            </button>
          </article>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="mt-10 text-center text-red-500">No products match your filters.</p>
      )}
    </div>
  );
}
