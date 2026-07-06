import React, { useState } from 'react'
import Cart from './Cart.jsx'
import Orders from './Orders.jsx'

/**
 * App.jsx — biteThat Root Router
 * Switches between the Cart page and Orders page using a simple state-based router.
 * No external router needed — works out of the box.
 */
export default function App() {
  const [page, setPage] = useState('orders')

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* ── Dev Page Switcher Bar (remove in production) ── */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        gap: '10px',
        background: '#0D0B1A',
        padding: '10px 16px',
        borderRadius: '9999px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}>
        <button
          onClick={() => setPage('cart')}
          style={{
            padding: '8px 20px',
            borderRadius: '9999px',
            border: 'none',
            background: page === 'cart' ? '#7C3AED' : 'rgba(255,255,255,0.08)',
            color: '#fff',
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          🛒 Cart
        </button>
        <button
          onClick={() => setPage('orders')}
          style={{
            padding: '8px 20px',
            borderRadius: '9999px',
            border: 'none',
            background: page === 'orders' ? '#7C3AED' : 'rgba(255,255,255,0.08)',
            color: '#fff',
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          📋 Orders
        </button>
      </div>

      {/* ── Page Render ── */}
      {page === 'cart'   && <Cart    onNavigate={setPage} />}
      {page === 'orders' && <Orders  onNavigate={setPage} />}
    </div>
  )
}
