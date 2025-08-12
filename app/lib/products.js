import { cache } from 'react';

export const getAllProducts = cache(async () => {
  const res = await fetch('https://fakestoreapi.com/products', {
    next: { revalidate: 60 }
  });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
});

export const getCategories = cache(async () => {
  const res = await fetch('https://fakestoreapi.com/products/categories', {
    next: { revalidate: 60 }
  });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
});
