'use client';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ShoppingCartPage() {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      if (!user?.id) return;
      try {
        const res = await fetch('/api/cart', {
          headers: { 'userId': user.id }
        });
        const data = await res.json();
        setCartItems(data.items || []);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchCart();
  }, [user]);  // Reload when user changes

  const removeItem = async (productId) => {
    try {
      const updatedCart = cartItems.filter(item => item.productId !== productId);
      setCartItems(updatedCart);
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'userId': user.id 
        },
        body: JSON.stringify({ items: updatedCart })
      });
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <Header />
      <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item) => (
                <li key={item.productId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>{item.title}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'red' }}>${item.price}</span>
                    <button onClick={() => removeItem(item.productId)}>
                      <X size={16} color="gray" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
              <p style={{ fontWeight: 'bold' }}>
                Total: <span style={{ color: 'green' }}>${total.toFixed(2)}</span>
              </p>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}