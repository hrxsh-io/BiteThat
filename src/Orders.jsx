import React, { useState } from 'react';

/**
 * BiteThat Orders Section Webpage
 * A self-contained, fully responsive React component matching the screenshot design.
 * Includes interactive tab switching, order search, reorder, rate order, and email subscription.
 */
export default function Orders({ onNavigate }) {
  // Page states
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [cartCount, setCartCount] = useState(3);

  // Mock Orders Data
  const ordersData = [
    {
      id: 'ORD-8842',
      restaurant: "Domino's Pizza",
      status: 'Active',
      statusText: 'On the way',
      date: 'Today, 12:42 PM',
      items: '1x Pepperoni Feast  •  2x Garlic Bread',
      price: 24.49,
      itemCount: 3,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
      tracker: {
        text: 'Rider is heading to you',
        eta: 'ETA 18 min',
        progress: 70
      }
    },
    {
      id: 'ORD-8756',
      restaurant: 'Sushi House',
      status: 'Delivered',
      statusText: 'Delivered',
      date: 'Mon, 7:02 PM',
      items: '1x Salmon Nigiri (8pc)  •  1x Miso Soup',
      price: 21.50,
      itemCount: 2,
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'ORD-8721',
      restaurant: 'Spice Garden',
      status: 'Cancelled',
      statusText: 'Cancelled',
      date: 'Sun, 1:30 PM',
      items: '1x Butter Chicken  •  2x Garlic Naan  •  1x Basmati Rice',
      price: 24.99,
      itemCount: 4,
      image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=400&q=80'
    }
  ];

  // Tab Filtering
  const filteredOrders = ordersData.filter(order => {
    // Filter by Tab
    if (activeTab !== 'All' && order.status !== activeTab) {
      return false;
    }
    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchRestaurant = order.restaurant.toLowerCase().includes(query);
      const matchItems = order.items.toLowerCase().includes(query);
      const matchId = order.id.toLowerCase().includes(query);
      return matchRestaurant || matchItems || matchId;
    }
    return true;
  });

  // Handle email subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 5000);
      setEmail('');
    }
  };

  // Actions handlers
  const handleReorder = (restaurant) => {
    alert(`Added items from ${restaurant} back into your cart!`);
    setCartCount(prev => prev + 1);
  };

  const handleRateOrder = (restaurant) => {
    alert(`Open rating dialog for ${restaurant}`);
  };

  const handleViewReceipt = (orderId) => {
    alert(`Viewing digital receipt for order ${orderId}`);
  };

  const handleTrackLive = (orderId) => {
    alert(`Opening live map tracking for order ${orderId}`);
  };

  return (
    <div className="bitethat-page-container">
      {/* Dynamic Style Injection for self-contained vanilla styling */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        :root {
          --primary-purple: #7F3DFF;
          --primary-purple-light: #F3E8FF;
          --primary-purple-dark: #6420EC;
          --bg-light: #F8F7FC;
          --text-dark: #0B0813;
          --text-gray: #718096;
          --text-light-gray: #A0AEC0;
          --border-color: #E2E8F0;
          --green-success: #10B981;
          --green-success-light: #E6FDF5;
          --red-danger: #EF4444;
          --red-danger-light: #FEE2E2;
          --yellow-accent: #FEDF39;
          --yellow-accent-dark: #E6C61F;
          --card-shadow: 0 4px 20px rgba(127, 61, 255, 0.02), 0 10px 40px rgba(0, 0, 0, 0.03);
          --navbar-shadow: 0 4px 30px rgba(0, 0, 0, 0.02);
          --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Base Resets */
        .bitethat-page-container {
          font-family: 'Outfit', 'Plus Jakarta Sans', sans-serif;
          color: var(--text-dark);
          background-color: var(--bg-light);
          min-height: 100vh;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
        }

        .bitethat-page-container * {
          box-sizing: border-box;
        }

        /* Typography & Layout */
        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Header Navbar */
        .navbar {
          background-color: #ffffff;
          border-bottom: 1px solid var(--border-color);
          box-shadow: var(--navbar-shadow);
          position: sticky;
          top: 0;
          z-index: 100;
          height: 80px;
          display: flex;
          align-items: center;
        }

        .navbar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          cursor: pointer;
        }

        .logo-icon-box {
          width: 40px;
          height: 40px;
          background-color: var(--primary-purple);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(127, 61, 255, 0.25);
        }

        .logo-text {
          font-size: 24px;
          font-weight: 800;
          color: var(--text-dark);
        }

        .logo-text span {
          color: var(--primary-purple);
        }

        .search-bar-container {
          position: relative;
          width: 100%;
          max-width: 380px;
        }

        .search-bar-container input {
          width: 100%;
          padding: 12px 20px 12px 48px;
          border-radius: 9999px;
          border: 1px solid var(--border-color);
          background-color: #FAFAFA;
          font-size: 15px;
          outline: none;
          font-family: inherit;
          color: var(--text-dark);
          transition: var(--transition-smooth);
        }

        .search-bar-container input:focus {
          border-color: var(--primary-purple);
          background-color: #ffffff;
          box-shadow: 0 0 0 4px rgba(127, 61, 255, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-light-gray);
          pointer-events: none;
          display: flex;
          align-items: center;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: var(--text-dark);
          font-weight: 500;
          font-size: 16px;
          position: relative;
          padding: 27px 0;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .nav-item:hover {
          color: var(--primary-purple);
        }

        .nav-item.active {
          color: var(--primary-purple);
          font-weight: 600;
        }

        .nav-item.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: var(--primary-purple);
          border-radius: 9999px;
        }

        .nav-icon {
          display: flex;
          align-items: center;
          font-size: 18px;
        }

        .cart-login-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .cart-button {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: #FAF9FF;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-purple);
          cursor: pointer;
          position: relative;
          transition: var(--transition-smooth);
        }

        .cart-button:hover {
          background-color: var(--primary-purple-light);
          transform: translateY(-2px);
        }

        .cart-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          background-color: var(--primary-purple);
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #ffffff;
        }

        .login-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          border-radius: 9999px;
          background-color: var(--primary-purple);
          color: #ffffff;
          border: none;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(127, 61, 255, 0.2);
          transition: var(--transition-smooth);
        }

        .login-btn:hover {
          background-color: var(--primary-purple-dark);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(127, 61, 255, 0.3);
        }

        /* Main Content Grid */
        .main-content {
          padding-top: 48px;
          padding-bottom: 80px;
          flex-grow: 1;
        }

        .heading-section {
          margin-bottom: 32px;
        }

        .my-orders-tag {
          color: var(--primary-purple);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
          display: inline-block;
        }

        .main-title {
          font-size: 40px;
          font-weight: 800;
          color: var(--text-dark);
          margin: 0 0 6px 0;
          letter-spacing: -0.5px;
        }

        .subtitle {
          color: var(--text-gray);
          font-size: 16px;
          margin: 0;
        }

        /* Filter Tabs */
        .tabs-container {
          border-bottom: 1px solid var(--border-color);
          display: flex;
          gap: 32px;
          margin-bottom: 32px;
        }

        .tab {
          border: none;
          background: none;
          padding: 12px 4px;
          font-size: 16px;
          font-weight: 600;
          color: var(--text-gray);
          cursor: pointer;
          position: relative;
          font-family: inherit;
          transition: var(--transition-smooth);
        }

        .tab:hover {
          color: var(--text-dark);
        }

        .tab.active {
          color: var(--primary-purple);
        }

        .tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: var(--primary-purple);
          border-radius: 9999px;
        }

        /* Order Cards List */
        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .order-card {
          background-color: #ffffff;
          border-radius: 24px;
          padding: 24px;
          box-shadow: var(--card-shadow);
          display: flex;
          gap: 24px;
          position: relative;
          transition: var(--transition-smooth);
        }

        .order-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(127, 61, 255, 0.05), 0 2px 10px rgba(0, 0, 0, 0.02);
        }

        .order-image-container {
          flex-shrink: 0;
        }

        .order-image {
          width: 130px;
          height: 130px;
          border-radius: 18px;
          object-fit: cover;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .order-details-container {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .order-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 6px;
        }

        .restaurant-name {
          font-size: 24px;
          font-weight: 700;
          color: var(--text-dark);
          margin: 0;
        }

        /* Badges */
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 600;
        }

        .status-badge.on-the-way {
          background-color: var(--primary-purple-light);
          color: var(--primary-purple);
        }

        .status-badge.delivered {
          background-color: var(--green-success-light);
          color: var(--green-success);
        }

        .status-badge.cancelled {
          background-color: var(--red-danger-light);
          color: var(--red-danger);
        }

        .order-meta-info {
          font-size: 14px;
          color: var(--text-light-gray);
          margin-bottom: 8px;
        }

        .order-items-list {
          font-size: 15px;
          color: var(--text-gray);
          margin-bottom: 12px;
          font-weight: 500;
        }

        /* Tracker Section for Live Orders */
        .order-tracker-section {
          margin-top: 10px;
          margin-bottom: 16px;
          background-color: #FAF9FF;
          padding: 14px 16px;
          border-radius: 16px;
          border: 1px dashed rgba(127, 61, 255, 0.15);
        }

        .tracker-status-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 600;
        }

        .tracker-status-text {
          color: var(--primary-purple);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .tracker-eta {
          color: var(--text-dark);
        }

        .progress-bar-container {
          width: 100%;
          height: 6px;
          background-color: var(--border-color);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background-color: var(--primary-purple);
          border-radius: 3px;
          animation: fillBar 1.5s ease-out forwards;
        }

        @keyframes fillBar {
          from { width: 0%; }
          to { width: var(--progress-pct); }
        }

        /* Action Buttons Row */
        .card-actions-row {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }

        .btn-action-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          border-radius: 9999px;
          border: 1.5px solid var(--primary-purple);
          background-color: transparent;
          color: var(--primary-purple);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .btn-action-outline:hover {
          background-color: var(--primary-purple-light);
        }

        .btn-action-solid {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 24px;
          border-radius: 9999px;
          border: none;
          background-color: var(--primary-purple);
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(127, 61, 255, 0.15);
          transition: var(--transition-smooth);
        }

        .btn-action-solid:hover {
          background-color: var(--primary-purple-dark);
          box-shadow: 0 6px 18px rgba(127, 61, 255, 0.25);
          transform: translateY(-1px);
        }

        /* Pricing Area (Right side of Card) */
        .order-pricing-section {
          text-align: right;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          min-width: 100px;
        }

        .price-text {
          font-size: 28px;
          font-weight: 800;
          color: var(--text-dark);
          margin-bottom: 2px;
        }

        .item-count-text {
          font-size: 13px;
          color: var(--text-light-gray);
          font-weight: 500;
        }

        /* Empty State */
        .empty-orders-state {
          text-align: center;
          padding: 60px 20px;
          background-color: #ffffff;
          border-radius: 24px;
          box-shadow: var(--card-shadow);
        }

        .empty-icon {
          font-size: 48px;
          color: var(--text-light-gray);
          margin-bottom: 16px;
        }

        /* Deals / Stay in the Loop Section */
        .deals-section {
          background-color: #ffffff;
          padding: 80px 0;
          border-top: 1px solid var(--border-color);
        }

        .deals-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 60px;
          align-items: center;
        }

        .deals-left {
          display: flex;
          flex-direction: column;
        }

        .deals-tag {
          color: var(--primary-purple);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .deals-title {
          font-size: 48px;
          font-weight: 800;
          line-height: 1.15;
          margin: 0 0 32px 0;
          letter-spacing: -1px;
        }

        .deals-title span {
          color: var(--primary-purple);
        }

        .subscribe-form-pill {
          display: flex;
          align-items: center;
          background-color: #F3F4F6;
          border-radius: 9999px;
          padding: 6px 6px 6px 24px;
          max-width: 480px;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
          transition: var(--transition-smooth);
        }

        .subscribe-form-pill:focus-within {
          background-color: #ffffff;
          box-shadow: 0 0 0 4px rgba(127, 61, 255, 0.1), inset 0 2px 4px rgba(0,0,0,0.02);
          border: 1px solid rgba(127, 61, 255, 0.2);
        }

        .subscribe-form-pill input {
          border: none;
          background: transparent;
          flex-grow: 1;
          font-size: 16px;
          outline: none;
          font-family: inherit;
          color: var(--text-dark);
          padding-right: 12px;
        }

        .btn-subscribe {
          background-color: var(--primary-purple);
          color: #ffffff;
          border: none;
          padding: 12px 28px;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: var(--transition-smooth);
          box-shadow: 0 4px 10px rgba(127, 61, 255, 0.15);
        }

        .btn-subscribe:hover {
          background-color: var(--primary-purple-dark);
          box-shadow: 0 6px 18px rgba(127, 61, 255, 0.25);
        }

        .subscribe-success-msg {
          color: var(--green-success);
          font-weight: 600;
          margin-top: 12px;
          font-size: 14px;
        }

        /* Order On The Go App Section */
        .deals-right {
          display: flex;
          flex-direction: column;
        }

        .app-download-title {
          color: var(--primary-purple);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .app-store-buttons {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }

        .app-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          background-color: #12101A;
          color: #ffffff;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 12px;
          width: 170px;
          transition: var(--transition-smooth);
        }

        .app-btn:hover {
          background-color: var(--primary-purple-dark);
          transform: translateY(-2px);
        }

        .app-btn-icon {
          font-size: 24px;
          display: flex;
          align-items: center;
        }

        .app-btn-text {
          display: flex;
          flex-direction: column;
        }

        .app-btn-subtitle {
          font-size: 10px;
          opacity: 0.7;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .app-btn-title {
          font-size: 14px;
          font-weight: 700;
        }

        .app-rating-container {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .rating-stars {
          display: flex;
          gap: 4px;
          color: #FFB01F;
          font-size: 16px;
        }

        .rating-text {
          font-size: 14px;
          color: var(--text-gray);
          font-weight: 600;
        }

        .rating-text span {
          color: var(--text-dark);
          font-weight: 700;
        }

        /* Footer Section */
        .footer {
          background-color: #0A0813;
          color: var(--text-light-gray);
          padding: 80px 0 40px 0;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 0.8fr 0.8fr 0.8fr;
          gap: 40px;
          margin-bottom: 60px;
        }

        .footer-brand-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .footer-logo-icon {
          width: 38px;
          height: 38px;
          background-color: var(--primary-purple);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
        }

        .footer-logo-text {
          font-size: 24px;
          font-weight: 800;
          color: #ffffff;
        }

        .footer-logo-text span {
          color: #A78BFA;
        }

        .footer-desc {
          font-size: 15px;
          line-height: 1.6;
          color: #94A3B8;
          margin: 0;
        }

        .footer-promo-pill {
          background-color: var(--yellow-accent);
          color: #0A0813;
          padding: 10px 18px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          width: fit-content;
          box-shadow: 0 4px 15px rgba(254, 223, 57, 0.15);
          transition: var(--transition-smooth);
        }

        .footer-promo-pill:hover {
          background-color: var(--yellow-accent-dark);
          transform: scale(1.02);
        }

        .social-icons-row {
          display: flex;
          gap: 12px;
        }

        .social-link {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          background-color: rgba(255,255,255,0.02);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94A3B8;
          text-decoration: none;
          transition: var(--transition-smooth);
        }

        .social-link:hover {
          background-color: var(--primary-purple);
          color: #ffffff;
          border-color: var(--primary-purple);
          transform: translateY(-3px);
        }

        /* Footer links styling */
        .footer-links-column {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .footer-col-title {
          color: #A78BFA;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: capitalize;
          margin: 0;
        }

        .footer-links-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-link {
          color: #94A3B8;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: var(--transition-smooth);
          cursor: pointer;
        }

        .footer-link:hover {
          color: #ffffff;
          padding-left: 4px;
        }

        .footer-link.highlighted {
          color: #A78BFA;
        }

        .footer-link.highlighted:hover {
          color: #C084FC;
        }

        /* Divider */
        .footer-divider {
          height: 1px;
          background-color: rgba(255,255,255,0.06);
          margin: 40px 0;
        }

        /* We Deliver In Cities section */
        .cities-section {
          margin-bottom: 40px;
        }

        .cities-title {
          color: #A78BFA;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .cities-list {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 24px;
        }

        .city-item {
          color: #94A3B8;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          transition: var(--transition-smooth);
          cursor: pointer;
        }

        .city-item:hover {
          color: #ffffff;
        }

        .city-item.more-cities {
          color: var(--yellow-accent);
          font-weight: 700;
        }

        .city-item.more-cities:hover {
          color: var(--yellow-accent-dark);
        }

        /* Bottom copyright bar */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          color: #475569;
        }

        /* Responsive Design Media Queries */
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1.5fr 1fr 1fr;
            gap: 30px;
          }
          .footer-grid > :first-child {
            grid-column: span 3;
          }
          .deals-grid {
            gap: 40px;
          }
          .deals-title {
            font-size: 40px;
          }
        }

        @media (max-width: 768px) {
          .navbar {
            height: auto;
            padding: 16px 0;
          }
          .navbar-content {
            flex-direction: column;
            gap: 16px;
            align-items: stretch;
          }
          .search-bar-container {
            max-width: 100%;
          }
          .nav-links {
            justify-content: space-between;
            gap: 10px;
            width: 100%;
          }
          .nav-item {
            padding: 10px 0;
          }
          .nav-item.active::after {
            bottom: 0;
          }
          .cart-login-section {
            justify-content: flex-end;
            width: 100%;
          }
          .main-content {
            padding-top: 24px;
          }
          .main-title {
            font-size: 32px;
          }
          .order-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .order-image {
            width: 100%;
            height: 200px;
          }
          .order-pricing-section {
            text-align: left;
            flex-direction: row;
            align-items: baseline;
            gap: 10px;
            width: 100%;
            border-top: 1px solid var(--border-color);
            padding-top: 12px;
          }
          .deals-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .deals-title {
            font-size: 32px;
          }
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-grid > * {
            grid-column: span 1 !important;
          }
        }
      `}} />

      {/* HEADER NAVBAR */}
      <header className="navbar">
        <div className="container navbar-content">
          {/* Logo */}
          <div className="logo-section" onClick={() => setActiveTab('All')}>
            <div className="logo-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <span className="logo-text">bite<span>That</span></span>
          </div>

          {/* Search Input */}
          <div className="search-bar-container">
            <span className="search-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search restaurants or dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Navigation Items */}
          <nav className="nav-links">
            <span className="nav-item">
              <span className="nav-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </span>
              Home
            </span>
            <span className="nav-item">
              <span className="nav-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3h18v18H3zM21 9H3M21 15H3M12 3v18"></path>
                </svg>
              </span>
              Restaurants
            </span>
            <span className="nav-item active">
              <span className="nav-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 11l3 3L22 4"></path>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
              </span>
              Orders
            </span>
          </nav>

          {/* Actions: Cart and Login */}
          <div className="cart-login-section">
            <button className="cart-button" title="View Cart" onClick={() => onNavigate && onNavigate('cart')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
            <button className="login-btn" onClick={() => alert('Opening Login Modal...')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Login
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        <div className="container">
          {/* Header titles */}
          <div className="heading-section">
            <span className="my-orders-tag">MY ORDERS</span>
            <h1 className="main-title">Order History</h1>
            <p className="subtitle">Track your live orders and revisit past cravings.</p>
          </div>

          {/* Filter Tabs */}
          <div className="tabs-container">
            {['All', 'Active', 'Delivered', 'Cancelled'].map((tab) => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* List of Orders */}
          <div className="orders-list">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div key={order.id} className="order-card">
                  {/* Left Side: Order Image */}
                  <div className="order-image-container">
                    <img src={order.image} alt={order.restaurant} className="order-image" />
                  </div>

                  {/* Middle Area: Order Details */}
                  <div className="order-details-container">
                    <div>
                      <div className="order-card-header">
                        <h3 className="restaurant-name">{order.restaurant}</h3>
                        <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                          {order.status === 'Active' && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                              <line x1="12" y1="22.08" x2="12" y2="12"></line>
                            </svg>
                          )}
                          {order.status === 'Delivered' && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          )}
                          {order.status === 'Cancelled' && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          )}
                          {order.statusText}
                        </span>
                      </div>
                      
                      {/* Sub-meta details */}
                      <div className="order-meta-info">
                        {order.id}  •  {order.date}
                      </div>

                      {/* Items row */}
                      <div className="order-items-list">
                        {order.items}
                      </div>
                    </div>

                    {/* Progress tracking section for Active items */}
                    {order.status === 'Active' && order.tracker && (
                      <div className="order-tracker-section">
                        <div className="tracker-status-line">
                          <span className="tracker-status-text">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            {order.tracker.text}
                          </span>
                          <span className="tracker-eta">{order.tracker.eta}</span>
                        </div>
                        <div className="progress-bar-container">
                          <div 
                            className="progress-bar-fill" 
                            style={{ 
                              '--progress-pct': `${order.tracker.progress}%`,
                              width: `${order.tracker.progress}%`
                            }} 
                          />
                        </div>
                      </div>
                    )}

                    {/* Buttons Row */}
                    <div className="card-actions-row">
                      <button className="btn-action-outline" onClick={() => handleViewReceipt(order.id)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="1" x2="12" y2="23"></line>
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                        View receipt
                      </button>

                      {order.status === 'Active' && (
                        <button className="btn-action-solid" onClick={() => handleTrackLive(order.id)}>
                          Track live
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </button>
                      )}

                      {order.status === 'Delivered' && (
                        <>
                          <button className="btn-action-outline" onClick={() => handleReorder(order.restaurant)}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
                            </svg>
                            Reorder
                          </button>
                          <button className="btn-action-outline" onClick={() => handleRateOrder(order.restaurant)}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            Rate order
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right Pricing Column */}
                  <div className="order-pricing-section">
                    <div className="price-text">${order.price.toFixed(2)}</div>
                    <div className="item-count-text">{order.itemCount} items</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-orders-state">
                <div className="empty-icon">🍽️</div>
                <h3>No orders found</h3>
                <p>We couldn't find any orders matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* DEALS BANNER & NEWSLETTER */}
      <section className="deals-section">
        <div className="container deals-grid">
          {/* Subscribe loop */}
          <div className="deals-left">
            <span className="deals-tag">STAY IN THE LOOP</span>
            <h2 className="deals-title">Get the best deals <span>delivered</span> to your inbox</h2>
            <form onSubmit={handleSubscribe} className="subscribe-form-pill">
              <input
                type="email"
                placeholder="your@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn-subscribe">
                Subscribe
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </form>
            {isSubscribed && <div className="subscribe-success-msg">🎉 Thank you for subscribing! Check your inbox soon.</div>}
          </div>

          {/* App download section */}
          <div className="deals-right">
            <span className="app-download-title">ORDER ON THE GO</span>
            <div className="app-store-buttons">
              {/* App Store button */}
              <a href="#appstore" className="app-btn" onClick={(e) => {e.preventDefault(); alert('Redirecting to App Store...')}}>
                <div className="app-btn-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.49-.62.71-1.16 1.85-1.01 2.96 1.09.09 2.22-.57 2.94-1.39z"/>
                  </svg>
                </div>
                <div className="app-btn-text">
                  <span className="app-btn-subtitle">Download on the</span>
                  <span className="app-btn-title">App Store</span>
                </div>
              </a>

              {/* Google Play button */}
              <a href="#playstore" className="app-btn" onClick={(e) => {e.preventDefault(); alert('Redirecting to Play Store...')}}>
                <div className="app-btn-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 5.27v13.46c0 .88.75 1.54 1.6 1.26l14.3-8.08a1.2 1.2 0 0 0 0-2.1L4.6 1.73A1.19 1.19 0 0 0 3 2.99v2.28z"/>
                  </svg>
                </div>
                <div className="app-btn-text">
                  <span className="app-btn-subtitle">Get it on</span>
                  <span className="app-btn-title">Google Play</span>
                </div>
              </a>
            </div>

            {/* Ratings */}
            <div className="app-rating-container">
              <div className="rating-stars">
                {[1,2,3,4,5].map(star => (
                  <span key={star}>★</span>
                ))}
              </div>
              <div className="rating-text">
                <span>4.8</span> • 2M+ Reviews
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            {/* Column 1: Brand Info */}
            <div className="footer-brand-column">
              <div className="footer-logo">
                <div className="footer-logo-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <span className="footer-logo-text">bite<span>That</span></span>
              </div>
              <p className="footer-desc">
                Order delicious food from your favourite restaurants with lightning-fast delivery and exclusive deals.
              </p>
              <div className="footer-promo-pill">
                <span>⚡</span> Free delivery on first order
              </div>
              <div className="social-icons-row">
                <a href="#instagram" className="social-link" title="Instagram" onClick={(e) => e.preventDefault()}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#youtube" className="social-link" title="YouTube" onClick={(e) => e.preventDefault()}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.62z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </a>
                <a href="#twitter" className="social-link" title="Twitter" onClick={(e) => e.preventDefault()}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="#email" className="social-link" title="Email" onClick={(e) => e.preventDefault()}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Explore */}
            <div className="footer-links-column">
              <h4 className="footer-col-title">Explore</h4>
              <ul className="footer-links-list">
                <li><span className="footer-link">Restaurants</span></li>
                <li><span className="footer-link">Top Rated</span></li>
                <li><span className="footer-link">Categories</span></li>
                <li><span className="footer-link">Offers</span></li>
                <li><span className="footer-link highlighted">Gift Cards</span></li>
              </ul>
            </div>

            {/* Column 3: Company */}
            <div className="footer-links-column">
              <h4 className="footer-col-title">Company</h4>
              <ul className="footer-links-list">
                <li><span className="footer-link">About</span></li>
                <li><span className="footer-link">Careers</span></li>
                <li><span className="footer-link">Blog</span></li>
                <li><span className="footer-link">Contact</span></li>
                <li><span className="footer-link">Privacy</span></li>
              </ul>
            </div>

            {/* Column 4: Partners */}
            <div className="footer-links-column">
              <h4 className="footer-col-title">Partners</h4>
              <ul className="footer-links-list">
                <li><span className="footer-link">Add Restaurant</span></li>
                <li><span className="footer-link">Partner Dashboard</span></li>
                <li><span className="footer-link">Delivery Partner</span></li>
                <li><span className="footer-link">Developer API</span></li>
              </ul>
            </div>

            {/* Column 5: Help */}
            <div className="footer-links-column">
              <h4 className="footer-col-title">Help</h4>
              <ul className="footer-links-list">
                <li><span className="footer-link">Support</span></li>
                <li><span className="footer-link">Track Order</span></li>
                <li><span className="footer-link">Refund Policy</span></li>
                <li><span className="footer-link">Terms</span></li>
                <li><span className="footer-link">FAQs</span></li>
              </ul>
            </div>
          </div>

          <hr className="footer-divider" />

          {/* Cities delivery section */}
          <div className="cities-section">
            <h5 className="cities-title">We Deliver In</h5>
            <div className="cities-list">
              {['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'].map((city) => (
                <span key={city} className="city-item">{city}</span>
              ))}
              <span className="city-item more-cities">+300 more cities</span>
            </div>
          </div>

          {/* Bottom Copyright line */}
          <div className="footer-bottom">
            <span>© 2026 biteThat. Freshness in every bite.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
