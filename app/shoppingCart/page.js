'use client';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { X } from 'lucide-react';




export default function ShoppingCartPage() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
        setCartItems(items);
    }, []);

    const removeItem = (index) => {
        const updatedCart = cartItems.filter((_, idx) => idx !== index);
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    };

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <>
            <Header />
            <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
                <h1>Shopping Cart</h1>
                <div>
                    {cartItems.length === 0 ? (
                        <p>Your cart is currently empty.</p>
                    ) : (
                        <>
                            <ul>
                                {cartItems.map((item, idx) => (
                                    <li
                                        key={idx}
                                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}
                                    >
                                        <span>{item.title}</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ color: 'red' }}>${item.price}</span>
                                            <button
                                                onClick={() => removeItem(idx)}
                                                style={{
                                                    background: 'transparent',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    padding: 0,
                                                }}
                                            >
                                                <X size={16} color="gray" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 16, gap: '12px' }}>
                                <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                                    Total: <span style={{ color: 'green' }}>${total.toFixed(2)}</span>
                                </p>
                                <button 
                                    style={{
                                        backgroundColor: '#0070f3',
                                        color: 'white',
                                        padding: '8px 16px',
                                        borderRadius: '4px',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => alert('Proceeding to purchase...')}
                                >
                                    Purchase
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
