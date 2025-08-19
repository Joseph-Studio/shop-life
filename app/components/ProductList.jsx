'use client';
import { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          <img src={p.image} alt={p.title} width={50} />
          {p.title} - ${p.price}
          <div className ="text-sm text-red-500">
          {p.category && <span> ({p.category})</span>}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
