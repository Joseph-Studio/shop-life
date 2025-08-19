'use client';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ShoppingCartPage() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
        setCartItems(items);
    }, []);

    return (
        <>
        <Header />
        
        <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
            <h1>Shopping Cart</h1>
            <div>
                {cartItems.length === 0 ? (
                    <p>Your cart is currently empty.</p>
                ) : (
                    <ul>
                        {cartItems.map((item, idx) => (
                            <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <span>{item.title}</span>
                                <span style={{ color: 'red' }}>${item.price}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
        <Footer />
        </>
    );
}