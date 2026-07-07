import React, { useState } from 'react';

/**
 * BiteThat – User Profile Dashboard
 * A self-contained, fully responsive profile page.
 * Includes interactive tab switching, editable profile fields, saved cards, and settings.
 */
export default function Profile({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('account');
  const [isEditing, setIsEditing] = useState(false);

  // User details state
  const [user, setUser] = useState({
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    phone: '+1 (555) 234-5678',
    address: '42 Main Street, Apt 3B, New York, NY 10001',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    walletBalance: 48.50,
    totalOrders: 27,
    savedPlaces: 4,
  });

  // Edited user state
  const [editUser, setEditUser] = useState({ ...user });

  // Saved Addresses State
  const [addresses, setAddresses] = useState([
    { id: 1, type: 'Home', address: '42 Main Street, Apt 3B, New York, NY 10001', isDefault: true },
    { id: 2, type: 'Work', address: '75 Wall Street, Floor 18, New York, NY 10005', isDefault: false },
  ]);

  // Saved Cards State
  const [cards, setCards] = useState([
    { id: 1, type: 'visa', number: '•••• •••• •••• 4242', expiry: '12/28', holder: 'SARAH JENKINS' },
    { id: 2, type: 'mastercard', number: '•••• •••• •••• 9876', expiry: '05/27', holder: 'SARAH JENKINS' },
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promoOffers: false,
    newsletter: true,
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser({ ...editUser });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditUser({ ...user });
    setIsEditing(false);
  };

  return (
    <div className="profile-page-container">
      {/* Self-contained CSS */}
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* HEADER NAVBAR */}
      <header className="profile-navbar">
        <div className="profile-container navbar-content">
          {/* Logo */}
          <div className="logo-section" onClick={() => onNavigate && onNavigate('orders')}>
            <div className="logo-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <span className="logo-text">bite<span>That</span></span>
          </div>

          {/* Navigation Items */}
          <nav className="nav-links">
            <span className="nav-item" onClick={() => onNavigate && onNavigate('orders')}>
              Home
            </span>
            <span className="nav-item" onClick={() => onNavigate && onNavigate('orders')}>
              Restaurants
            </span>
            <span className="nav-item" onClick={() => onNavigate && onNavigate('orders')}>
              Orders
            </span>
          </nav>

          {/* Actions: Cart and Logout */}
          <div className="navbar-actions">
            <button className="cart-button" title="View Cart" onClick={() => onNavigate && onNavigate('cart')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </button>
            <button className="logout-btn" onClick={() => onNavigate && onNavigate('login')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* PROFILE CONTENT */}
      <main className="profile-main">
        <div className="profile-container main-grid">
          
          {/* LEFT SIDEBAR: PROFILE CARD & TAB SWITCHER */}
          <div className="sidebar-col">
            {/* User Main Card */}
            <div className="user-profile-card">
              <div className="avatar-wrapper">
                <img src={user.avatar} alt={user.name} className="avatar-img" />
                <button className="edit-avatar-btn" title="Change Avatar" onClick={() => alert('Change avatar feature would open here.')}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                </button>
              </div>
              <h2 className="profile-name">{user.name}</h2>
              <p className="profile-email">{user.email}</p>

              {/* Stats Row */}
              <div className="profile-stats-row">
                <div className="stat-box">
                  <span className="stat-val">{user.totalOrders}</span>
                  <span className="stat-label">Orders</span>
                </div>
                <div className="stat-box divider-box">
                  <span className="stat-val">${user.walletBalance.toFixed(2)}</span>
                  <span className="stat-label">Wallet</span>
                </div>
                <div className="stat-box">
                  <span className="stat-val">{user.savedPlaces}</span>
                  <span className="stat-label">Places</span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="profile-nav-tabs">
              <button
                className={`tab-link ${activeTab === 'account' ? 'active' : ''}`}
                onClick={() => { setActiveTab('account'); handleCancelEdit(); }}
              >
                <svg className="tab-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                My Account
              </button>
              <button
                className={`tab-link ${activeTab === 'addresses' ? 'active' : ''}`}
                onClick={() => { setActiveTab('addresses'); handleCancelEdit(); }}
              >
                <svg className="tab-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Saved Addresses
              </button>
              <button
                className={`tab-link ${activeTab === 'payments' ? 'active' : ''}`}
                onClick={() => { setActiveTab('payments'); handleCancelEdit(); }}
              >
                <svg className="tab-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
                Payment Methods
              </button>
              <button
                className={`tab-link ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => { setActiveTab('settings'); handleCancelEdit(); }}
              >
                <svg className="tab-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                Settings
              </button>
            </div>
          </div>

          {/* RIGHT VIEWPORT: ACTIVE TAB WORKSPACE */}
          <div className="content-col">
            
            {/* TABS CONTAINER */}
            <div className="details-viewport animate-fade-in">
              
              {/* TAB 1: ACCOUNT DETAILS */}
              {activeTab === 'account' && (
                <div>
                  <div className="tab-header">
                    <h3 className="tab-title">Account Details</h3>
                    <p className="tab-subtitle">Manage your personal details and contact credentials.</p>
                  </div>

                  <form onSubmit={handleSaveProfile} className="profile-form">
                    <div className="form-grid-fields">
                      {/* Name */}
                      <div className="profile-form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          value={editUser.name}
                          onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                          disabled={!isEditing}
                          className="profile-input"
                        />
                      </div>

                      {/* Email */}
                      <div className="profile-form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          value={editUser.email}
                          onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                          disabled={!isEditing}
                          className="profile-input"
                        />
                      </div>

                      {/* Phone */}
                      <div className="profile-form-group">
                        <label>Phone Number</label>
                        <input
                          type="text"
                          value={editUser.phone}
                          onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                          disabled={!isEditing}
                          className="profile-input"
                        />
                      </div>

                      {/* Default Address */}
                      <div className="profile-form-group col-span-2">
                        <label>Delivery Address</label>
                        <textarea
                          rows="2"
                          value={editUser.address}
                          onChange={(e) => setEditUser({ ...editUser, address: e.target.value })}
                          disabled={!isEditing}
                          className="profile-textarea"
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="form-actions-row">
                      {isEditing ? (
                        <>
                          <button type="button" className="btn-secondary" onClick={handleCancelEdit}>
                            Cancel
                          </button>
                          <button type="submit" className="btn-primary">
                            Save Changes
                          </button>
                        </>
                      ) : (
                        <button type="button" className="btn-primary" onClick={() => setIsEditing(true)}>
                          Edit Profile
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 2: SAVED ADDRESSES */}
              {activeTab === 'addresses' && (
                <div>
                  <div className="tab-header address-header">
                    <div>
                      <h3 className="tab-title">Saved Addresses</h3>
                      <p className="tab-subtitle">Easily toggle and select your active delivery destinations.</p>
                    </div>
                    <button className="add-address-btn" onClick={() => alert('New address dialogue.')}>
                      + Add New
                    </button>
                  </div>

                  <div className="addresses-list">
                    {addresses.map((addr) => (
                      <div key={addr.id} className={`address-card ${addr.isDefault ? 'default' : ''}`}>
                        <div className="address-card-header">
                          <span className="address-type">
                            {addr.type === 'Home' ? (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                              </svg>
                            ) : (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                              </svg>
                            )}
                            {addr.type}
                          </span>
                          {addr.isDefault && <span className="default-badge">DEFAULT</span>}
                        </div>
                        <p className="address-text">{addr.address}</p>
                        <div className="address-card-actions">
                          <button className="edit-btn">Edit</button>
                          <button className="delete-btn">Delete</button>
                          {!addr.isDefault && <button className="set-default-btn">Set Default</button>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: PAYMENT METHODS */}
              {activeTab === 'payments' && (
                <div>
                  <div className="tab-header address-header">
                    <div>
                      <h3 className="tab-title">Payment Methods</h3>
                      <p className="tab-subtitle">Manage cards on file for checkout credentials.</p>
                    </div>
                    <button className="add-address-btn" onClick={() => alert('New card dialogue.')}>
                      + Add Card
                    </button>
                  </div>

                  <div className="cards-grid">
                    {cards.map((card) => (
                      <div key={card.id} className={`credit-card-item ${card.type}`}>
                        <div className="card-top">
                          <span className="card-chip"></span>
                          <span className="card-logo-badge">{card.type.toUpperCase()}</span>
                        </div>
                        <div className="card-number">{card.number}</div>
                        <div className="card-bottom">
                          <div className="card-meta">
                            <span className="lbl">CARD HOLDER</span>
                            <span className="val">{card.holder}</span>
                          </div>
                          <div className="card-meta">
                            <span className="lbl">EXPIRES</span>
                            <span className="val">{card.expiry}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: SETTINGS */}
              {activeTab === 'settings' && (
                <div>
                  <div className="tab-header">
                    <h3 className="tab-title">Notification Settings</h3>
                    <p className="tab-subtitle">Choose how you'd like to receive status updates and deals.</p>
                  </div>

                  <div className="settings-options-list">
                    <div className="setting-toggle-row">
                      <div className="toggle-label-sec">
                        <h4>Order Status Updates</h4>
                        <p>Receive notifications when your order status changes.</p>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={notifications.orderUpdates}
                          onChange={(e) => setNotifications({ ...notifications, orderUpdates: e.target.checked })}
                        />
                        <span className="slider-switch"></span>
                      </label>
                    </div>

                    <div className="setting-toggle-row">
                      <div className="toggle-label-sec">
                        <h4>Promotional Offers</h4>
                        <p>Get notified about local deals, discounts, and menu launches.</p>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={notifications.promoOffers}
                          onChange={(e) => setNotifications({ ...notifications, promoOffers: e.target.checked })}
                        />
                        <span className="slider-switch"></span>
                      </label>
                    </div>

                    <div className="setting-toggle-row">
                      <div className="toggle-label-sec">
                        <h4>BiteThat Newsletters</h4>
                        <p>Receive monthly updates about food trends and system news.</p>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={notifications.newsletter}
                          onChange={(e) => setNotifications({ ...notifications, newsletter: e.target.checked })}
                        />
                        <span className="slider-switch"></span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

const STYLES = `
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
    --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .profile-page-container {
    font-family: 'Outfit', 'Plus Jakarta Sans', sans-serif;
    background-color: var(--bg-light);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    color: var(--text-dark);
  }

  .profile-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    box-sizing: border-box;
  }

  /* Header Navbar */
  .profile-navbar {
    background-color: #ffffff;
    border-bottom: 1px solid var(--border-color);
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

  .nav-links {
    display: flex;
    align-items: center;
    gap: 32px;
  }

  .nav-item {
    font-weight: 500;
    font-size: 16px;
    cursor: pointer;
    color: var(--text-dark);
    transition: var(--transition-smooth);
  }

  .nav-item:hover {
    color: var(--primary-purple);
  }

  .navbar-actions {
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
    transition: var(--transition-smooth);
  }

  .cart-button:hover {
    background-color: var(--primary-purple-light);
    transform: translateY(-2px);
  }

  .logout-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 9999px;
    border: 1px solid var(--border-color);
    background: #ffffff;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-gray);
    cursor: pointer;
    transition: var(--transition-smooth);
  }

  .logout-btn:hover {
    background-color: #FFF5F5;
    color: #E53E3E;
    border-color: #FED7D7;
  }

  /* Main Workspace */
  .profile-main {
    padding-top: 48px;
    padding-bottom: 80px;
    flex-grow: 1;
  }

  .main-grid {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 40px;
    align-items: start;
  }

  /* User profile card & Sidebar */
  .sidebar-col {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .user-profile-card {
    background-color: #ffffff;
    border: 1px solid var(--border-color);
    border-radius: 24px;
    padding: 32px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01), 0 10px 30px rgba(0, 0, 0, 0.02);
  }

  .avatar-wrapper {
    position: relative;
    margin-bottom: 16px;
  }

  .avatar-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid var(--primary-purple-light);
  }

  .edit-avatar-btn {
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 28px;
    height: 28px;
    background-color: var(--primary-purple);
    border: 2px solid #ffffff;
    border-radius: 50%;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(127, 61, 255, 0.2);
    transition: var(--transition-smooth);
  }

  .edit-avatar-btn:hover {
    background-color: var(--primary-purple-dark);
    transform: scale(1.08);
  }

  .profile-name {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 4px 0;
    color: var(--text-dark);
    text-align: center;
  }

  .profile-email {
    font-size: 14px;
    color: var(--text-gray);
    margin: 0 0 24px 0;
    text-align: center;
  }

  .profile-stats-row {
    display: grid;
    grid-template-columns: 1fr 1.2fr 1fr;
    width: 100%;
    border-top: 1px solid var(--border-color);
    padding-top: 20px;
  }

  .stat-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .stat-box.divider-box {
    border-left: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
  }

  .stat-val {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-dark);
  }

  .stat-label {
    font-size: 12px;
    color: var(--text-light-gray);
    margin-top: 4px;
    font-weight: 500;
  }

  /* Navigation tab buttons */
  .profile-nav-tabs {
    background-color: #ffffff;
    border: 1px solid var(--border-color);
    border-radius: 20px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
  }

  .tab-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    border-radius: 12px;
    background: none;
    border: none;
    color: var(--text-gray);
    font-size: 15px;
    font-weight: 600;
    text-align: left;
    cursor: pointer;
    transition: var(--transition-smooth);
  }

  .tab-link:hover {
    background-color: var(--bg-light);
    color: var(--primary-purple);
  }

  .tab-link.active {
    background-color: var(--primary-purple-light);
    color: var(--primary-purple);
  }

  .tab-icon {
    flex-shrink: 0;
  }

  /* Right workspace details box */
  .details-viewport {
    background-color: #ffffff;
    border: 1px solid var(--border-color);
    border-radius: 24px;
    padding: 40px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01), 0 10px 30px rgba(0, 0, 0, 0.02);
  }

  .tab-header {
    margin-bottom: 32px;
  }

  .tab-header.address-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 20px;
  }

  .tab-title {
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 6px 0;
    color: var(--text-dark);
  }

  .tab-subtitle {
    font-size: 14px;
    color: var(--text-gray);
    margin: 0;
  }

  /* Editable Form Settings */
  .profile-form {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .form-grid-fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px 24px;
  }

  .col-span-2 {
    grid-column: span 2;
  }

  .profile-form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .profile-form-group label {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-dark);
  }

  .profile-input, .profile-textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--border-color);
    border-radius: 12px;
    font-family: inherit;
    font-size: 15px;
    color: var(--text-dark);
    background-color: #FAF9FF;
    outline: none;
    transition: var(--transition-smooth);
  }

  .profile-input:disabled, .profile-textarea:disabled {
    background-color: #FAF9FF;
    border-color: #FAF9FF;
    color: var(--text-gray);
    cursor: not-allowed;
  }

  .profile-input:focus, .profile-textarea:focus {
    border-color: var(--primary-purple);
    background-color: #ffffff;
    box-shadow: 0 0 0 4px rgba(127, 61, 255, 0.1);
  }

  .form-actions-row {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }

  .btn-primary {
    background-color: var(--primary-purple);
    color: #ffffff;
    border: none;
    border-radius: 12px;
    padding: 12px 24px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition-smooth);
    box-shadow: 0 4px 12px rgba(127, 61, 255, 0.15);
  }

  .btn-primary:hover {
    background-color: var(--primary-purple-dark);
    transform: translateY(-1px);
  }

  .btn-secondary {
    background-color: #ffffff;
    color: var(--text-gray);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 12px 24px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition-smooth);
  }

  .btn-secondary:hover {
    background-color: var(--bg-light);
    color: var(--text-dark);
  }

  .add-address-btn {
    background-color: var(--primary-purple-light);
    color: var(--primary-purple);
    border: none;
    border-radius: 12px;
    padding: 10px 18px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: var(--transition-smooth);
  }

  .add-address-btn:hover {
    background-color: var(--primary-purple);
    color: #ffffff;
  }

  /* Address List Section */
  .addresses-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 24px;
  }

  .address-card {
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 20px;
    position: relative;
    transition: var(--transition-smooth);
  }

  .address-card.default {
    border-color: var(--primary-purple);
    background-color: #FAF9FF;
  }

  .address-card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }

  .address-type {
    font-size: 14px;
    font-weight: 700;
    color: var(--text-dark);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .default-badge {
    background-color: var(--primary-purple);
    color: #ffffff;
    font-size: 10px;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 6px;
    letter-spacing: 0.5px;
  }

  .address-text {
    font-size: 15px;
    color: var(--text-gray);
    margin: 0 0 16px 0;
    line-height: 1.5;
  }

  .address-card-actions {
    display: flex;
    gap: 16px;
  }

  .address-card-actions button {
    background: none;
    border: none;
    font-size: 13px;
    font-weight: 600;
    color: var(--text-gray);
    cursor: pointer;
    padding: 0;
    transition: var(--transition-smooth);
  }

  .address-card-actions button:hover {
    color: var(--primary-purple);
  }

  .address-card-actions button.delete-btn:hover {
    color: #E53E3E;
  }

  .address-card-actions button.set-default-btn {
    color: var(--primary-purple);
  }

  /* Cards Grid Section */
  .cards-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 24px;
  }

  .credit-card-item {
    background: linear-gradient(135deg, #1E1B4B 0%, #312E81 100%);
    border-radius: 20px;
    padding: 24px;
    aspect-ratio: 1.58 / 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #ffffff;
    position: relative;
    box-shadow: 0 8px 24px rgba(49, 46, 129, 0.15);
  }

  .credit-card-item.mastercard {
    background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-chip {
    width: 36px;
    height: 26px;
    background: linear-gradient(135deg, #F3F4F6 0%, #D1D5DB 100%);
    border-radius: 6px;
  }

  .card-logo-badge {
    font-weight: 800;
    font-size: 16px;
    letter-spacing: 1px;
    font-style: italic;
  }

  .card-number {
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 2px;
    font-family: 'Courier New', Courier, monospace;
    text-align: center;
    margin: 20px 0;
  }

  .card-bottom {
    display: flex;
    justify-content: space-between;
  }

  .card-meta {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .card-meta .lbl {
    font-size: 9px;
    color: #94A3B8;
    font-weight: 600;
  }

  .card-meta .val {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  /* Settings Settings Switches */
  .settings-options-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 24px;
  }

  .setting-toggle-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--border-color);
  }

  .toggle-label-sec h4 {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 4px 0;
    color: var(--text-dark);
  }

  .toggle-label-sec p {
    font-size: 13px;
    color: var(--text-gray);
    margin: 0;
  }

  /* Slider switch stylings */
  .switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 28px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider-switch {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #CBD5E1;
    transition: .4s;
    border-radius: 34px;
  }

  .slider-switch:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  input:checked + .slider-switch {
    background-color: var(--primary-purple);
  }

  input:focus + .slider-switch {
    box-shadow: 0 0 1px var(--primary-purple);
  }

  input:checked + .slider-switch:before {
    transform: translateX(20px);
  }

  .animate-fade-in {
    animation: fadeIn 0.4s ease-out forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Responsive styling styling queries */
  @media (max-width: 900px) {
    .main-grid {
      grid-template-columns: 1fr;
      gap: 30px;
    }
  }

  @media (max-width: 768px) {
    .profile-navbar {
      height: auto;
      padding: 16px 0;
    }
    .navbar-content {
      flex-direction: column;
      gap: 16px;
      align-items: stretch;
    }
    .nav-links {
      justify-content: space-between;
      gap: 10px;
      width: 100%;
    }
    .navbar-actions {
      justify-content: flex-end;
      width: 100%;
    }
    .profile-main {
      padding-top: 24px;
    }
    .details-viewport {
      padding: 24px;
    }
    .form-grid-fields {
      grid-template-columns: 1fr;
    }
    .col-span-2 {
      grid-column: span 1;
    }
    .cards-grid {
      grid-template-columns: 1fr;
    }
  }
`;
