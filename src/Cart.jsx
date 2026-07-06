import React, { useState, useEffect, useRef } from 'react';

/**
 * BiteThat – Cart / Review Your Order Page
 * Matches the exact design from the provided screenshots.
 * React component with self-contained CSS, fully animated buttons & micro-interactions.
 */
export default function Cart({ onNavigate }) {
  /* ─── State ─────────────────────────────────────────── */
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Pepperoni Feast',
      price: 15.49,
      qty: 1,
      image:
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 2,
      name: 'Margherita Classic',
      price: 12.99,
      qty: 2,
      image:
        'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=200&q=80',
    },
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [checkoutPulse, setCheckoutPulse] = useState(false);
  const [removedItem, setRemovedItem] = useState(null);
  const [cartCleared, setCartCleared] = useState(false);
  const checkoutRef = useRef(null);

  /* ─── Derived values ──────────────────────────────── */
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryFee = cartItems.length ? 2.99 : 0;
  const tax = +(subtotal * 0.08).toFixed(2);
  const discount = promoApplied ? 5.0 : 0;
  const total = +(subtotal + deliveryFee + tax - discount).toFixed(2);
  const itemCount = cartItems.reduce((s, i) => s + i.qty, 0);

  /* ─── Handlers ────────────────────────────────────── */
  const changeQty = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setRemovedItem(id);
    setTimeout(() => {
      setCartItems((prev) => prev.filter((i) => i.id !== id));
      setRemovedItem(null);
    }, 350);
  };

  const clearCart = () => {
    setCartCleared(true);
    setTimeout(() => {
      setCartItems([]);
      setCartCleared(false);
    }, 400);
  };

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'BITE10') {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
      setPromoApplied(false);
      setTimeout(() => setPromoError(false), 2000);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleCheckout = () => {
    setCheckoutPulse(true);
    setTimeout(() => setCheckoutPulse(false), 600);
    alert(`Checkout initiated! Total: $${total.toFixed(2)}`);
  };

  /* ─── Pulse animation trigger on mount ──────────────*/
  useEffect(() => {
    const t = setTimeout(() => setCheckoutPulse(true), 1200);
    const t2 = setTimeout(() => setCheckoutPulse(false), 1800);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  /* ═══════════════════════════════════════════════════ */
  /*  RENDER                                             */
  /* ═══════════════════════════════════════════════════ */
  return (
    <div className="bt-root">
      {/* ── Injected Styles ── */}
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* ══════════ NAVBAR ══════════ */}
      <header className="bt-navbar">
        <div className="bt-container bt-navbar__inner">
          {/* Logo */}
          <div className="bt-logo" style={{ cursor: 'pointer' }} onClick={() => onNavigate && onNavigate('orders')}>
            <div className="bt-logo__icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                <line x1="6" y1="1" x2="6" y2="4" />
                <line x1="10" y1="1" x2="10" y2="4" />
                <line x1="14" y1="1" x2="14" y2="4" />
              </svg>
            </div>
            <span className="bt-logo__text">bite<span>That</span></span>
          </div>

          {/* Search */}
          <div className="bt-search">
            <svg className="bt-search__icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" placeholder="Search restaurants or dishes..." className="bt-search__input" />
          </div>

          {/* Nav Links */}
          <nav className="bt-nav">
            <a href="#" className="bt-nav__link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Home
            </a>
            <a href="#" className="bt-nav__link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M3 15h18M9 3v18" />
              </svg>
              Restaurants
            </a>
            <a href="#" className="bt-nav__link" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('orders'); }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              Orders
            </a>
          </nav>

          {/* Cart + Login */}
          <div className="bt-actions">
            <button className="bt-cart-btn" aria-label="Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="bt-cart-badge">{Math.max(itemCount, 0) || 3}</span>
            </button>
            <button className="bt-login-btn" onClick={() => alert('Login modal would open here.')}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Login
            </button>
          </div>
        </div>
      </header>

      {/* ══════════ MAIN CONTENT ══════════ */}
      <main className="bt-main">
        <div className="bt-container bt-cart-grid">

          {/* ── LEFT COLUMN ── */}
          <div className="bt-cart-left">
            {/* Page heading */}
            <div className="bt-page-heading">
              <span className="bt-page-tag">YOUR CART</span>
              <h1 className="bt-page-title">Review your order</h1>
              <p className="bt-page-sub">
                {cartItems.length > 0
                  ? `${itemCount} item${itemCount !== 1 ? 's' : ''} ready to be delivered.`
                  : 'Your cart is empty.'}
              </p>
            </div>

            {cartItems.length > 0 ? (
              <>
                {/* Restaurant Card */}
                <div className={`bt-restaurant-card ${cartCleared ? 'bt-fade-out' : ''}`}>
                  {/* Card header */}
                  <div className="bt-rc-header">
                    <div>
                      <span className="bt-rc-from">FROM</span>
                      <h2 className="bt-rc-name">Domino's Pizza</h2>
                    </div>
                    <div className="bt-rc-eta">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      25–40 min
                    </div>
                  </div>

                  <div className="bt-rc-divider" />

                  {/* Cart items */}
                  <div className="bt-items-list">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className={`bt-item ${removedItem === item.id ? 'bt-item--removing' : ''}`}
                      >
                        <img src={item.image} alt={item.name} className="bt-item__img" />

                        <div className="bt-item__info">
                          <p className="bt-item__name">{item.name}</p>
                          <p className="bt-item__unit">${item.price.toFixed(2)} each</p>
                          <button
                            className="bt-item__remove"
                            onClick={() => removeItem(item.id)}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                              <path d="M10 11v6M14 11v6" />
                              <path d="M9 6V4h6v2" />
                            </svg>
                            Remove
                          </button>
                        </div>

                        {/* Qty controls */}
                        <div className="bt-item__qty-controls">
                          <button
                            className="bt-qty-btn"
                            onClick={() => changeQty(item.id, -1)}
                            aria-label="Decrease quantity"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                          </button>
                          <span className="bt-qty-num">{item.qty}</span>
                          <button
                            className="bt-qty-btn bt-qty-btn--plus"
                            onClick={() => changeQty(item.id, 1)}
                            aria-label="Increase quantity"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                              <line x1="12" y1="5" x2="12" y2="19" />
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                          </button>
                        </div>

                        <p className="bt-item__total">
                          ${(item.price * item.qty).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear cart */}
                <button className="bt-clear-btn" onClick={clearCart}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4h6v2" />
                  </svg>
                  Clear entire cart
                </button>
              </>
            ) : (
              /* Empty cart state */
              <div className="bt-empty-cart">
                <div className="bt-empty-cart__icon">🛒</div>
                <h3 className="bt-empty-cart__title">Your cart is empty</h3>
                <p className="bt-empty-cart__sub">Add some delicious food to get started!</p>
                <button className="bt-btn-primary" style={{ marginTop: '20px' }} onClick={() => alert('Browse restaurants')}>
                  Browse Restaurants →
                </button>
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="bt-cart-right">

            {/* Delivery Address */}
            <div className="bt-panel">
              <div className="bt-delivery">
                <div className="bt-delivery__label">DELIVER TO</div>
                <div className="bt-delivery__body">
                  <div className="bt-delivery__pin">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="bt-delivery__info">
                    <p className="bt-delivery__address">Home · 221B Baker Street</p>
                    <p className="bt-delivery__sub">London · 20–30 min</p>
                  </div>
                  <button className="bt-change-btn">Change</button>
                </div>
              </div>
            </div>

            {/* Promo Code */}
            <div className="bt-panel">
              <div className="bt-promo">
                <div className="bt-promo__head">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                  Have a promo code?
                </div>
                <div className="bt-promo__row">
                  <input
                    type="text"
                    placeholder="Try BITE10"
                    className={`bt-promo__input ${promoError ? 'bt-promo__input--error' : ''} ${promoApplied ? 'bt-promo__input--success' : ''}`}
                    value={promoCode}
                    onChange={(e) => { setPromoCode(e.target.value); setPromoError(false); }}
                    onKeyDown={(e) => e.key === 'Enter' && applyPromo()}
                    disabled={promoApplied}
                  />
                  <button
                    className={`bt-apply-btn ${promoApplied ? 'bt-apply-btn--applied' : ''}`}
                    onClick={promoApplied ? () => { setPromoApplied(false); setPromoCode(''); } : applyPromo}
                  >
                    {promoApplied ? '✓ Applied' : 'Apply'}
                  </button>
                </div>
                {promoError && <p className="bt-promo__msg bt-promo__msg--error">Invalid code. Try BITE10!</p>}
                {promoApplied && <p className="bt-promo__msg bt-promo__msg--success">🎉 $5.00 discount applied!</p>}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bt-panel bt-summary">
              <h3 className="bt-summary__title">Order summary</h3>

              <div className="bt-summary__row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="bt-summary__row">
                <span>Delivery fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="bt-summary__row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              {promoApplied && (
                <div className="bt-summary__row bt-summary__row--discount">
                  <span>Discount (BITE10)</span>
                  <span>–$5.00</span>
                </div>
              )}

              <div className="bt-summary__divider" />

              <div className="bt-summary__total-row">
                <span className="bt-summary__total-label">Total</span>
                <span className="bt-summary__total-amount">${total.toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              <button
                ref={checkoutRef}
                className={`bt-checkout-btn ${checkoutPulse ? 'bt-checkout-btn--pulse' : ''}`}
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                Checkout · ${total.toFixed(2)}
              </button>

              <p className="bt-summary__secure">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Secure checkout · Paying is safe with biteThat
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ══════════ DEALS / NEWSLETTER SECTION ══════════ */}
      <section className="bt-deals-section">
        <div className="bt-container bt-deals-grid">

          {/* Left: Subscribe */}
          <div className="bt-deals-left">
            <div className="bt-deals-logo">
              <div className="bt-deals-logo__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                  <line x1="6" y1="1" x2="6" y2="4" />
                  <line x1="10" y1="1" x2="10" y2="4" />
                  <line x1="14" y1="1" x2="14" y2="4" />
                </svg>
              </div>
              <span className="bt-deals-logo__text">bite<span>That</span></span>
            </div>

            <span className="bt-deals-tag">STAY IN THE LOOP</span>
            <h2 className="bt-deals-title">
              Get the best deals <span>delivered</span> to your inbox
            </h2>

            <div className="bt-deals-ratings">
              <div className="bt-stars">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} width="20" height="20" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className="bt-deals-rating-text">4.8 · 2M+ Reviews</span>
            </div>

            <form className="bt-subscribe-form" onSubmit={handleSubscribe}>
              <div className="bt-subscribe-pill">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="bt-subscribe-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="bt-subscribe-btn">
                  Subscribe
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
              {subscribed && (
                <p className="bt-subscribe-success">🎉 You're subscribed! Deals incoming.</p>
              )}
            </form>
          </div>

          {/* Right: App download */}
          <div className="bt-deals-right">
            <span className="bt-deals-tag">ORDER ON THE GO</span>
            <div className="bt-app-btns">
              <a href="#" className="bt-app-btn" onClick={(e) => { e.preventDefault(); alert('App Store'); }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.49-.62.71-1.16 1.85-1.01 2.96 1.09.09 2.22-.57 2.94-1.39z"/>
                </svg>
                <div className="bt-app-btn__text">
                  <small>Download on the</small>
                  <strong>App Store</strong>
                </div>
              </a>
              <a href="#" className="bt-app-btn" onClick={(e) => { e.preventDefault(); alert('Google Play'); }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14.4 8.5c.6.35.6 1.25 0 1.6L4.6 21.3c-.66.5-1.6.03-1.6-.8z"/>
                </svg>
                <div className="bt-app-btn__text">
                  <small>Get it on</small>
                  <strong>Google Play</strong>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="bt-footer">
        <div className="bt-container">
          <div className="bt-footer-grid">

            {/* Brand */}
            <div className="bt-footer-brand">
              <div className="bt-footer-logo">
                <div className="bt-footer-logo__icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                    <line x1="6" y1="1" x2="6" y2="4" />
                    <line x1="10" y1="1" x2="10" y2="4" />
                    <line x1="14" y1="1" x2="14" y2="4" />
                  </svg>
                </div>
                <span className="bt-footer-logo__text">bite<span>That</span></span>
              </div>
              <p className="bt-footer-desc">
                Order delicious food from your favourite restaurants with lightning-fast delivery and exclusive deals.
              </p>
              <button className="bt-footer-promo">
                <span>⚡</span> Free delivery on first order
              </button>
              <div className="bt-social-row">
                {[
                  {
                    label: 'Instagram',
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    ),
                  },
                  {
                    label: 'YouTube',
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.62z" />
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                      </svg>
                    ),
                  },
                  {
                    label: 'Twitter',
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                      </svg>
                    ),
                  },
                  {
                    label: 'Email',
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    ),
                  },
                ].map(({ label, icon }) => (
                  <a key={label} href="#" className="bt-social-link" title={label} onClick={(e) => e.preventDefault()}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Explore */}
            <div className="bt-footer-col">
              <h4 className="bt-footer-col__title">Explore</h4>
              <ul className="bt-footer-links">
                {['Restaurants', 'Top Rated', 'Categories', 'Offers', 'Gift Cards'].map((l) => (
                  <li key={l}>
                    <a href="#" className="bt-footer-link" onClick={(e) => e.preventDefault()}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="bt-footer-col">
              <h4 className="bt-footer-col__title">Company</h4>
              <ul className="bt-footer-links">
                {['About', 'Careers', 'Blog', 'Contact', 'Privacy'].map((l) => (
                  <li key={l}>
                    <a href="#" className="bt-footer-link" onClick={(e) => e.preventDefault()}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Partners */}
            <div className="bt-footer-col">
              <h4 className="bt-footer-col__title">Partners</h4>
              <ul className="bt-footer-links">
                {['Add Restaurant', 'Partner Dashboard', 'Delivery Partner', 'Developer API'].map((l) => (
                  <li key={l}>
                    <a href="#" className="bt-footer-link" onClick={(e) => e.preventDefault()}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div className="bt-footer-col">
              <h4 className="bt-footer-col__title">Help</h4>
              <ul className="bt-footer-links">
                {['Support', 'Track Order', 'Refund Policy', 'Terms', 'FAQs'].map((l) => (
                  <li key={l}>
                    <a href="#" className="bt-footer-link" onClick={(e) => e.preventDefault()}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bt-footer-divider" />
          <div className="bt-footer-bottom">
            <span>© 2026 biteThat. Freshness in every bite.</span>
            <span>Made with ❤️ for food lovers</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   STYLES — Self-contained CSS matching the screenshot design
   ══════════════════════════════════════════════════════════ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

/* ── CSS Variables ─────────────────────────────────────── */
:root {
  --clr-purple:        #7C3AED;
  --clr-purple-light:  #EDE9FE;
  --clr-purple-dark:   #6D28D9;
  --clr-purple-glow:   rgba(124,58,237,0.22);
  --clr-bg:            #F5F3FF;
  --clr-bg-card:       #FFFFFF;
  --clr-dark:          #0D0B1A;
  --clr-text:          #1A1523;
  --clr-muted:         #6B7280;
  --clr-faint:         #9CA3AF;
  --clr-border:        #E5E7EB;
  --clr-green:         #10B981;
  --clr-red:           #EF4444;
  --clr-yellow:        #F59E0B;
  --clr-gold:          #FEDF39;
  --shadow-card:       0 1px 3px rgba(0,0,0,.04), 0 8px 24px rgba(124,58,237,.04);
  --shadow-btn:        0 4px 14px rgba(124,58,237,.28);
  --shadow-btn-hover:  0 8px 24px rgba(124,58,237,.4);
  --radius-card:       20px;
  --radius-pill:       9999px;
  --transition:        all 0.25s cubic-bezier(.4,0,.2,1);
}

/* ── Reset ─────────────────────────────────────────────── */
.bt-root *, .bt-root *::before, .bt-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.bt-root {
  font-family: 'Outfit', 'Plus Jakarta Sans', sans-serif;
  background: var(--clr-bg);
  color: var(--clr-text);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

/* ── Container ─────────────────────────────────────────── */
.bt-container {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ════════════════════════════════════════
   NAVBAR
   ════════════════════════════════════════ */
.bt-navbar {
  background: #fff;
  border-bottom: 1px solid var(--clr-border);
  position: sticky;
  top: 0;
  z-index: 200;
  box-shadow: 0 2px 20px rgba(0,0,0,.04);
  animation: slideDown .4s ease-out;
}
@keyframes slideDown {
  from { transform: translateY(-100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

.bt-navbar__inner {
  display: flex;
  align-items: center;
  gap: 24px;
  height: 72px;
}

/* Logo */
.bt-logo { display: flex; align-items: center; gap: 10px; cursor: pointer; flex-shrink: 0; }
.bt-logo__icon {
  width: 38px; height: 38px;
  background: var(--clr-purple);
  border-radius: 11px;
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  box-shadow: 0 4px 12px var(--clr-purple-glow);
  transition: var(--transition);
}
.bt-logo__icon:hover { transform: rotate(-6deg) scale(1.08); }
.bt-logo__text { font-size: 22px; font-weight: 800; color: var(--clr-text); letter-spacing: -.3px; }
.bt-logo__text span { color: var(--clr-purple); }

/* Search */
.bt-search { position: relative; flex: 1; max-width: 360px; }
.bt-search__icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--clr-faint); pointer-events: none; }
.bt-search__input {
  width: 100%;
  padding: 11px 20px 11px 46px;
  border: 1.5px solid var(--clr-border);
  border-radius: var(--radius-pill);
  font-family: inherit; font-size: 14.5px;
  color: var(--clr-text); background: #FAFAFA;
  outline: none; transition: var(--transition);
}
.bt-search__input::placeholder { color: var(--clr-faint); }
.bt-search__input:focus { border-color: var(--clr-purple); background: #fff; box-shadow: 0 0 0 4px rgba(124,58,237,.1); }

/* Nav links */
.bt-nav { display: flex; align-items: center; gap: 28px; }
.bt-nav__link {
  display: flex; align-items: center; gap: 7px;
  color: var(--clr-text); text-decoration: none;
  font-size: 15px; font-weight: 500;
  padding: 4px 0; position: relative;
  transition: var(--transition);
}
.bt-nav__link::after {
  content: ''; position: absolute; bottom: -2px; left: 0;
  width: 0; height: 2.5px; background: var(--clr-purple);
  border-radius: var(--radius-pill); transition: var(--transition);
}
.bt-nav__link:hover { color: var(--clr-purple); }
.bt-nav__link:hover::after { width: 100%; }
.bt-nav__link--active { color: var(--clr-purple); font-weight: 600; }
.bt-nav__link--active::after { width: 100%; }

/* Cart + Login */
.bt-actions { display: flex; align-items: center; gap: 14px; margin-left: auto; }
.bt-cart-btn {
  width: 42px; height: 42px; border-radius: 50%;
  border: none; background: #F3EEFF; cursor: pointer;
  position: relative; display: flex; align-items: center; justify-content: center;
  color: var(--clr-purple); transition: var(--transition);
}
.bt-cart-btn:hover { background: var(--clr-purple-light); transform: translateY(-2px); box-shadow: 0 4px 12px var(--clr-purple-glow); }
.bt-cart-badge {
  position: absolute; top: -4px; right: -4px;
  background: var(--clr-purple); color: #fff;
  font-size: 10px; font-weight: 700;
  width: 18px; height: 18px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid #fff;
  animation: badgePop .3s cubic-bezier(.34,1.56,.64,1);
}
@keyframes badgePop { from { transform: scale(0); } to { transform: scale(1); } }

.bt-login-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 22px; border-radius: var(--radius-pill);
  background: var(--clr-purple); color: #fff;
  border: none; font-family: inherit; font-size: 14.5px; font-weight: 600;
  cursor: pointer; box-shadow: var(--shadow-btn); transition: var(--transition);
}
.bt-login-btn:hover { background: var(--clr-purple-dark); transform: translateY(-2px); box-shadow: var(--shadow-btn-hover); }
.bt-login-btn:active { transform: scale(.97); }

/* ════════════════════════════════════════
   MAIN / CART LAYOUT
   ════════════════════════════════════════ */
.bt-main {
  padding: 44px 0 72px;
  flex: 1;
  animation: fadeUp .5s ease-out;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.bt-cart-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 32px;
  align-items: start;
}

/* Page heading */
.bt-page-heading { margin-bottom: 28px; }
.bt-page-tag {
  font-size: 11px; font-weight: 700; letter-spacing: 2px;
  color: var(--clr-purple); text-transform: uppercase;
  display: inline-block; margin-bottom: 6px;
}
.bt-page-title { font-size: 38px; font-weight: 900; letter-spacing: -.8px; line-height: 1.1; margin-bottom: 6px; }
.bt-page-sub { font-size: 15px; color: var(--clr-muted); }

/* ── Restaurant card ───────────────────── */
.bt-restaurant-card {
  background: #fff; border-radius: var(--radius-card);
  border: 1.5px solid var(--clr-border);
  box-shadow: var(--shadow-card);
  overflow: hidden; margin-bottom: 16px;
  transition: var(--transition);
}
.bt-restaurant-card:hover { box-shadow: 0 12px 40px rgba(124,58,237,.08); }

.bt-rc-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 24px 16px;
}
.bt-rc-from {
  font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
  color: var(--clr-purple); text-transform: uppercase;
  display: block; margin-bottom: 2px;
}
.bt-rc-name { font-size: 22px; font-weight: 800; }
.bt-rc-eta {
  display: flex; align-items: center; gap: 6px;
  font-size: 14px; color: var(--clr-muted); font-weight: 500;
}
.bt-rc-divider { height: 1px; background: var(--clr-border); margin: 0 24px; }

/* Items */
.bt-items-list { padding: 8px 0 8px; }
.bt-item {
  display: flex; align-items: center; gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid #F3F4F6;
  transition: opacity .35s ease, transform .35s ease;
}
.bt-item:last-child { border-bottom: none; }
.bt-item--removing { opacity: 0; transform: translateX(20px); }

.bt-item__img {
  width: 72px; height: 72px; border-radius: 14px;
  object-fit: cover; flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,.08);
  transition: var(--transition);
}
.bt-item__img:hover { transform: scale(1.05); }

.bt-item__info { flex: 1; min-width: 0; }
.bt-item__name { font-size: 16px; font-weight: 700; margin-bottom: 3px; }
.bt-item__unit { font-size: 13px; color: var(--clr-muted); margin-bottom: 6px; }
.bt-item__remove {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 12.5px; color: var(--clr-red); font-weight: 600;
  background: none; border: none; cursor: pointer;
  padding: 2px 0; font-family: inherit;
  transition: var(--transition);
}
.bt-item__remove:hover { color: #DC2626; transform: translateX(2px); }

/* Qty controls */
.bt-item__qty-controls { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
.bt-qty-btn {
  width: 32px; height: 32px; border-radius: 50%;
  border: 1.5px solid var(--clr-border);
  background: #fff; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: var(--clr-text); transition: var(--transition);
}
.bt-qty-btn:hover { border-color: var(--clr-purple); color: var(--clr-purple); transform: scale(1.12); }
.bt-qty-btn:active { transform: scale(.9); }
.bt-qty-btn--plus:hover { background: var(--clr-purple-light); }
.bt-qty-num { font-size: 16px; font-weight: 700; min-width: 20px; text-align: center; }

.bt-item__total { font-size: 16px; font-weight: 800; min-width: 64px; text-align: right; flex-shrink: 0; }

/* Clear cart */
.bt-clear-btn {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 13.5px; color: var(--clr-red); font-weight: 600;
  background: none; border: none; cursor: pointer;
  font-family: inherit; padding: 4px 0;
  transition: var(--transition);
}
.bt-clear-btn:hover { color: #DC2626; gap: 10px; }

/* Fade-out animation */
.bt-fade-out { animation: fadeOut .4s ease forwards; }
@keyframes fadeOut { to { opacity: 0; transform: scale(.97); } }

/* Empty cart */
.bt-empty-cart {
  background: #fff; border-radius: var(--radius-card);
  border: 1.5px solid var(--clr-border);
  padding: 60px 32px; text-align: center;
  box-shadow: var(--shadow-card);
}
.bt-empty-cart__icon { font-size: 52px; margin-bottom: 16px; animation: wobble 2s ease-in-out infinite; }
@keyframes wobble {
  0%,100%{ transform: rotate(0); }
  25%    { transform: rotate(-8deg); }
  75%    { transform: rotate(8deg); }
}
.bt-empty-cart__title { font-size: 22px; font-weight: 800; margin-bottom: 6px; }
.bt-empty-cart__sub { font-size: 15px; color: var(--clr-muted); }

/* ── RIGHT COLUMN: Panels ──────────────── */
.bt-cart-right { display: flex; flex-direction: column; gap: 16px; }
.bt-panel {
  background: #fff; border-radius: var(--radius-card);
  border: 1.5px solid var(--clr-border);
  box-shadow: var(--shadow-card); overflow: hidden;
}

/* Delivery */
.bt-delivery { padding: 20px 22px; }
.bt-delivery__label { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; color: var(--clr-purple); text-transform: uppercase; margin-bottom: 10px; }
.bt-delivery__body { display: flex; align-items: center; gap: 12px; }
.bt-delivery__pin {
  width: 36px; height: 36px; border-radius: 10px;
  background: var(--clr-purple-light);
  display: flex; align-items: center; justify-content: center;
  color: var(--clr-purple); flex-shrink: 0;
}
.bt-delivery__info { flex: 1; }
.bt-delivery__address { font-size: 15px; font-weight: 700; margin-bottom: 2px; }
.bt-delivery__sub { font-size: 13px; color: var(--clr-muted); }
.bt-change-btn {
  font-size: 14px; font-weight: 700; color: var(--clr-purple);
  background: none; border: none; cursor: pointer; font-family: inherit;
  padding: 6px 10px; border-radius: 8px; transition: var(--transition);
}
.bt-change-btn:hover { background: var(--clr-purple-light); }

/* Promo */
.bt-promo { padding: 20px 22px; }
.bt-promo__head { display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 700; margin-bottom: 14px; }
.bt-promo__row { display: flex; gap: 10px; }
.bt-promo__input {
  flex: 1; padding: 10px 16px;
  border: 1.5px solid var(--clr-border);
  border-radius: var(--radius-pill);
  font-size: 14px; font-family: inherit;
  outline: none; transition: var(--transition); background: #FAFAFA;
}
.bt-promo__input:focus { border-color: var(--clr-purple); background: #fff; box-shadow: 0 0 0 3px rgba(124,58,237,.1); }
.bt-promo__input--error { border-color: var(--clr-red); animation: shake .4s ease; }
@keyframes shake {
  0%,100%{ transform: translateX(0); }
  25%    { transform: translateX(-6px); }
  75%    { transform: translateX(6px); }
}
.bt-promo__input--success { border-color: var(--clr-green); }
.bt-promo__input:disabled { opacity: .7; cursor: not-allowed; }

.bt-apply-btn {
  padding: 10px 20px; border-radius: var(--radius-pill);
  border: 1.5px solid var(--clr-purple); background: transparent;
  color: var(--clr-purple); font-size: 14px; font-weight: 700;
  font-family: inherit; cursor: pointer; white-space: nowrap;
  transition: var(--transition);
}
.bt-apply-btn:hover { background: var(--clr-purple-light); }
.bt-apply-btn:active { transform: scale(.96); }
.bt-apply-btn--applied { background: var(--clr-green); border-color: var(--clr-green); color: #fff; }
.bt-apply-btn--applied:hover { background: #059669; border-color: #059669; }

.bt-promo__msg { font-size: 12.5px; font-weight: 600; margin-top: 8px; }
.bt-promo__msg--error { color: var(--clr-red); }
.bt-promo__msg--success { color: var(--clr-green); }

/* Summary */
.bt-summary { padding: 24px 22px; }
.bt-summary__title { font-size: 18px; font-weight: 800; margin-bottom: 18px; }
.bt-summary__row { display: flex; justify-content: space-between; font-size: 14.5px; color: var(--clr-muted); margin-bottom: 12px; }
.bt-summary__row--discount { color: var(--clr-green); font-weight: 600; }
.bt-summary__divider { height: 1px; background: var(--clr-border); margin: 16px 0; }
.bt-summary__total-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 22px; }
.bt-summary__total-label { font-size: 16px; font-weight: 800; }
.bt-summary__total-amount { font-size: 30px; font-weight: 900; color: var(--clr-purple); letter-spacing: -.5px; }

/* Checkout button */
.bt-checkout-btn {
  width: 100%; padding: 16px;
  background: linear-gradient(135deg, var(--clr-purple) 0%, #9333EA 100%);
  color: #fff; border: none; border-radius: var(--radius-pill);
  font-size: 16px; font-weight: 700; font-family: inherit;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  cursor: pointer; box-shadow: var(--shadow-btn);
  transition: var(--transition);
  position: relative; overflow: hidden;
}
.bt-checkout-btn::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(135deg, #9333EA 0%, var(--clr-purple) 100%);
  opacity: 0; transition: opacity .3s;
}
.bt-checkout-btn:hover { transform: translateY(-2px); box-shadow: var(--shadow-btn-hover); }
.bt-checkout-btn:hover::after { opacity: 1; }
.bt-checkout-btn > * { position: relative; z-index: 1; }
.bt-checkout-btn:active { transform: scale(.98); }
.bt-checkout-btn:disabled { opacity: .55; cursor: not-allowed; transform: none; }
.bt-checkout-btn--pulse { animation: btnPulse .6s ease; }
@keyframes btnPulse {
  0%  { box-shadow: 0 0 0 0 rgba(124,58,237,.55); }
  50% { box-shadow: 0 0 0 16px rgba(124,58,237,0); transform: scale(1.02); }
  100%{ box-shadow: 0 0 0 0 rgba(124,58,237,0); transform: scale(1); }
}

.bt-summary__secure {
  font-size: 12px; color: var(--clr-faint); text-align: center;
  margin-top: 12px; display: flex; align-items: center; justify-content: center; gap: 5px;
}

.bt-btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 28px; border-radius: var(--radius-pill);
  background: var(--clr-purple); color: #fff; border: none;
  font-size: 15px; font-weight: 700; font-family: inherit;
  cursor: pointer; box-shadow: var(--shadow-btn); transition: var(--transition);
}
.bt-btn-primary:hover { background: var(--clr-purple-dark); transform: translateY(-2px); box-shadow: var(--shadow-btn-hover); }

/* ════════════════════════════════════════
   DEALS / NEWSLETTER SECTION
   ════════════════════════════════════════ */
.bt-deals-section {
  background: #fff;
  border-top: 1px solid var(--clr-border);
  padding: 72px 0;
}
.bt-deals-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

/* Logo in deals section */
.bt-deals-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; }
.bt-deals-logo__icon {
  width: 38px; height: 38px;
  background: var(--clr-purple); border-radius: 11px;
  display: flex; align-items: center; justify-content: center;
  color: #fff; box-shadow: 0 4px 12px var(--clr-purple-glow);
}
.bt-deals-logo__text { font-size: 22px; font-weight: 800; color: var(--clr-text); }
.bt-deals-logo__text span { color: var(--clr-purple); }

.bt-deals-tag { font-size: 11px; font-weight: 700; letter-spacing: 2px; color: var(--clr-purple); text-transform: uppercase; display: block; margin-bottom: 12px; }
.bt-deals-title { font-size: 42px; font-weight: 900; line-height: 1.12; letter-spacing: -.8px; margin-bottom: 20px; }
.bt-deals-title span { color: var(--clr-purple); }

.bt-deals-ratings { display: flex; align-items: center; gap: 10px; margin-bottom: 28px; }
.bt-stars { display: flex; gap: 3px; }
.bt-deals-rating-text { font-size: 15px; color: var(--clr-muted); font-weight: 600; }

.bt-subscribe-form { display: flex; flex-direction: column; }
.bt-subscribe-pill {
  display: flex; align-items: center;
  background: #F3F4F6; border-radius: var(--radius-pill);
  padding: 6px 6px 6px 20px; max-width: 460px;
  transition: var(--transition);
}
.bt-subscribe-pill:focus-within {
  background: #fff; box-shadow: 0 0 0 4px rgba(124,58,237,.1);
  border: 1px solid rgba(124,58,237,.25);
}
.bt-subscribe-input {
  flex: 1; border: none; background: transparent;
  font-size: 15px; outline: none; font-family: inherit; color: var(--clr-text);
}
.bt-subscribe-input::placeholder { color: var(--clr-faint); }
.bt-subscribe-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 24px; border-radius: var(--radius-pill);
  background: var(--clr-purple); color: #fff;
  border: none; font-size: 15px; font-weight: 700;
  font-family: inherit; cursor: pointer;
  box-shadow: 0 4px 10px rgba(124,58,237,.2); transition: var(--transition);
}
.bt-subscribe-btn:hover { background: var(--clr-purple-dark); box-shadow: 0 6px 18px rgba(124,58,237,.3); }
.bt-subscribe-btn:active { transform: scale(.97); }
.bt-subscribe-success { font-size: 13px; font-weight: 600; color: var(--clr-green); margin-top: 10px; }

/* App buttons */
.bt-deals-right { display: flex; flex-direction: column; gap: 20px; }
.bt-app-btns { display: flex; gap: 14px; flex-wrap: wrap; }
.bt-app-btn {
  display: flex; align-items: center; gap: 12px;
  background: #0D0B1A; color: #fff;
  text-decoration: none; padding: 12px 22px;
  border-radius: 14px; min-width: 160px;
  transition: var(--transition);
}
.bt-app-btn:hover { background: var(--clr-purple-dark); transform: translateY(-3px); box-shadow: 0 8px 24px rgba(124,58,237,.25); }
.bt-app-btn:active { transform: scale(.97); }
.bt-app-btn__text { display: flex; flex-direction: column; }
.bt-app-btn__text small { font-size: 10px; opacity: .7; letter-spacing: .5px; text-transform: uppercase; }
.bt-app-btn__text strong { font-size: 15px; font-weight: 700; }

/* ════════════════════════════════════════
   FOOTER
   ════════════════════════════════════════ */
.bt-footer {
  background: var(--clr-dark);
  color: #94A3B8;
  padding: 72px 0 36px;
}
.bt-footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 0.9fr 0.9fr 0.9fr 0.9fr;
  gap: 36px;
  margin-bottom: 48px;
}
.bt-footer-brand { display: flex; flex-direction: column; gap: 18px; }
.bt-footer-logo { display: flex; align-items: center; gap: 10px; }
.bt-footer-logo__icon {
  width: 36px; height: 36px; background: var(--clr-purple);
  border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #fff;
}
.bt-footer-logo__text { font-size: 21px; font-weight: 800; color: #fff; }
.bt-footer-logo__text span { color: #A78BFA; }
.bt-footer-desc { font-size: 14px; line-height: 1.65; color: #94A3B8; max-width: 240px; }
.bt-footer-promo {
  background: var(--clr-gold); color: #0D0B1A;
  padding: 10px 18px; border-radius: var(--radius-pill);
  font-size: 13px; font-weight: 700;
  display: inline-flex; align-items: center; gap: 8px;
  border: none; cursor: pointer; width: fit-content;
  transition: var(--transition);
}
.bt-footer-promo:hover { background: #E6C61F; transform: scale(1.03); }

.bt-social-row { display: flex; gap: 10px; }
.bt-social-link {
  width: 36px; height: 36px; border-radius: 50%;
  border: 1px solid rgba(255,255,255,.1);
  background: rgba(255,255,255,.02);
  display: flex; align-items: center; justify-content: center;
  color: #94A3B8; text-decoration: none;
  transition: var(--transition);
}
.bt-social-link:hover { background: var(--clr-purple); color: #fff; border-color: var(--clr-purple); transform: translateY(-3px); }

.bt-footer-col { display: flex; flex-direction: column; gap: 16px; }
.bt-footer-col__title { color: #A78BFA; font-size: 14.5px; font-weight: 700; }
.bt-footer-links { list-style: none; display: flex; flex-direction: column; gap: 11px; }
.bt-footer-link {
  color: #94A3B8; text-decoration: none; font-size: 14px; font-weight: 500;
  transition: var(--transition); display: inline-block;
}
.bt-footer-link:hover { color: #fff; padding-left: 4px; }

.bt-footer-divider { height: 1px; background: rgba(255,255,255,.06); margin-bottom: 32px; }
.bt-footer-bottom { display: flex; justify-content: space-between; font-size: 13px; color: #475569; }

/* ════════════════════════════════════════
   RESPONSIVE
   ════════════════════════════════════════ */
@media (max-width: 1024px) {
  .bt-cart-grid { grid-template-columns: 1fr; }
  .bt-cart-right { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .bt-summary { grid-column: 1 / -1; }
  .bt-footer-grid { grid-template-columns: 1fr 1fr 1fr; }
  .bt-footer-brand { grid-column: 1 / -1; }
}

@media (max-width: 768px) {
  .bt-navbar__inner { gap: 14px; }
  .bt-search { display: none; }
  .bt-nav { gap: 16px; }
  .bt-deals-grid { grid-template-columns: 1fr; gap: 40px; }
  .bt-deals-title { font-size: 32px; }
  .bt-page-title { font-size: 30px; }
  .bt-footer-grid { grid-template-columns: 1fr 1fr; }
  .bt-footer-brand { grid-column: 1 / -1; }
  .bt-cart-right { display: flex; flex-direction: column; }
  .bt-app-btns { flex-direction: column; }
  .bt-footer-bottom { flex-direction: column; gap: 8px; }
  .bt-item { flex-wrap: wrap; }
  .bt-item__total { width: 100%; text-align: right; border-top: 1px solid #F3F4F6; padding-top: 8px; margin-top: 4px; }
}

@media (max-width: 480px) {
  .bt-nav { display: none; }
  .bt-page-title { font-size: 26px; }
  .bt-footer-grid { grid-template-columns: 1fr; }
}
`;
