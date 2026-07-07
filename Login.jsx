import React, { useState } from 'react';

/* ── Eye icons ───────────────────────────────────────────────────────────── */
const EyeOpen = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const EyeOff = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

/* ── Zig-zag divider SVG path ────────────────────────────────────────────────
   viewBox "0 0 40 100", preserveAspectRatio="none" stretches to full height.
   Left half is filled with the brand purple; the right edge is a zig-zag.
   Each tooth is 10 units tall, left peak at x=5, right peak at x=35.
────────────────────────────────────────────────────────────────────────── */
const ZIG_PATH =
  'M 0 0 L 0 100 L 20 100 ' +
  'L 35 95 L 5 85 L 35 75 L 5 65 ' +
  'L 35 55 L 5 45 L 35 35 L 5 25 ' +
  'L 35 15 L 5 5 L 20 0 Z';

/* ── Main component ──────────────────────────────────────────────────────── */
export default function Login({ onNavigate }) {
  const [isLogin, setIsLogin]       = useState(true);
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [name, setName]             = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [showPwd, setShowPwd]       = useState(false);
  const [showCPwd, setShowCPwd]     = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [success, setSuccess]       = useState(false);

  const strength = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();
  const strColors = ['','#ef4444','#f97316','#22c55e','#6366f1'];
  const strLabels = ['','Weak','Fair','Good','Strong'];

  const submit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill all fields.'); return; }
    if (!isLogin && !name)   { setError('Please enter your name.'); return; }
    if (!isLogin && password !== confirmPwd) { setError('Passwords do not match.'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false); setSuccess(true);
      setTimeout(() => { setSuccess(false); onNavigate && onNavigate('profile'); }, 800);
    }, 1400);
  };

  const toggle = () => { setIsLogin(v => !v); setError(''); setName(''); setConfirmPwd(''); };

  return (
    <div className="ln-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ═══ LEFT — Brand panel ═══════════════════════════════════════════ */}
      <div className="ln-brand">

        {/* Logo */}
        <div className="ln-logo">
          <div className="ln-logo-ico">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <span className="ln-logo-txt">bite<em>That</em></span>
        </div>

        {/* Headline */}
        <div className="ln-headline">
          <h1>Delicious food,<br/>delivered to<br/>your door.</h1>
          <p>Order from 200+ restaurants and get it delivered in under 25 minutes.</p>
        </div>

        {/* Illustration */}
        <div className="ln-illus-wrap">
          <img src="/food_illustration.png" alt="Food delivery" className="ln-illus" />
        </div>

        {/* Stats */}
        <div className="ln-stats">
          <div className="ln-stat"><strong>50K+</strong><span>Foodies</span></div>
          <div className="ln-stat-sep"/>
          <div className="ln-stat"><strong>200+</strong><span>Restaurants</span></div>
          <div className="ln-stat-sep"/>
          <div className="ln-stat"><strong>25 min</strong><span>Avg. Delivery</span></div>
        </div>

      </div>

      {/* ═══ ZIG-ZAG DIVIDER ══════════════════════════════════════════════ */}
      <div className="ln-zigzag" aria-hidden="true">
        <svg
          viewBox="0 0 40 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <path d={ZIG_PATH} fill="#7C3AED" />
        </svg>
      </div>

      {/* ═══ RIGHT — Form panel ═══════════════════════════════════════════ */}
      <div className={`ln-form-panel${success ? ' ln-form-panel--ok' : ''}`}>

        {/* Close */}
        <button className="ln-close" onClick={() => onNavigate && onNavigate('orders')} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Mobile logo */}
        <div className="ln-mobile-logo" onClick={() => onNavigate && onNavigate('orders')}>
          <div className="ln-mob-ico">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <span>bite<em>That</em></span>
        </div>

        <div className="ln-form-inner">

          {/* Heading */}
          <div className="ln-head">
            <h2>{isLogin ? 'Welcome Back! 👋' : 'Join BiteThat'}</h2>
            <p>{isLogin ? 'Sign in to track orders and reorder favourites' : 'Create your account and start ordering now'}</p>
          </div>

          {/* Tabs */}
          <div className="ln-tabs">
            <button className={`ln-tab${isLogin ? ' ln-tab--on' : ''}`} onClick={() => { setIsLogin(true); setError(''); }}>Sign In</button>
            <button className={`ln-tab${!isLogin ? ' ln-tab--on' : ''}`} onClick={() => { setIsLogin(false); setError(''); }}>Sign Up</button>
            <div className="ln-tab-ink" style={{ left: isLogin ? '4px' : 'calc(50%)' }} />
          </div>

          {/* Error */}
          {error && <div className="ln-error" role="alert">{error}</div>}

          {/* Form */}
          <form onSubmit={submit} className="ln-form" noValidate>

            {!isLogin && (
              <div className="ln-field ln-fade">
                <label htmlFor="ln-name">Full Name</label>
                <div className="ln-inp-wrap">
                  <svg className="ln-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input id="ln-name" type="text" placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} required={!isLogin} disabled={loading}/>
                </div>
              </div>
            )}

            <div className="ln-field">
              <label htmlFor="ln-email">Email Address</label>
              <div className="ln-inp-wrap">
                <svg className="ln-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <input id="ln-email" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required disabled={loading}/>
              </div>
            </div>

            <div className="ln-field">
              <label htmlFor="ln-pwd">Password</label>
              <div className="ln-inp-wrap">
                <svg className="ln-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input id="ln-pwd" type={showPwd ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required disabled={loading}/>
                <button type="button" className="ln-eye" onClick={() => setShowPwd(v => !v)} tabIndex={-1}>{showPwd ? <EyeOff/> : <EyeOpen/>}</button>
              </div>
              {!isLogin && password && (
                <div className="ln-str ln-fade">
                  {[1,2,3,4].map(n => <div key={n} className="ln-str-seg" style={{ background: n <= strength ? strColors[strength] : '#e5e7eb' }}/>)}
                  <span style={{ color: strColors[strength], fontSize: 11, fontWeight: 700 }}>{strLabels[strength]}</span>
                </div>
              )}
            </div>

            {!isLogin && (
              <div className="ln-field ln-fade">
                <label htmlFor="ln-cpwd">Confirm Password</label>
                <div className="ln-inp-wrap">
                  <svg className="ln-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <input id="ln-cpwd" type={showCPwd ? 'text' : 'password'} placeholder="••••••••" value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} required={!isLogin} disabled={loading}/>
                  <button type="button" className="ln-eye" onClick={() => setShowCPwd(v => !v)} tabIndex={-1}>{showCPwd ? <EyeOff/> : <EyeOpen/>}</button>
                </div>
                {confirmPwd && confirmPwd !== password && <p className="ln-mismatch">Passwords do not match</p>}
              </div>
            )}

            {isLogin && (
              <div className="ln-opts">
                <label className="ln-check">
                  <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(v => !v)} disabled={loading}/>
                  <span className="ln-chk"/>
                  Remember me
                </label>
                <a href="#" className="ln-forgot" onClick={e => { e.preventDefault(); alert('Reset link sent 📧'); }}>Forgot password?</a>
              </div>
            )}

            <button type="submit" id="ln-submit" className={`ln-btn${success ? ' ln-btn--ok' : ''}`} disabled={loading}>
              {loading
                ? <><span className="ln-spinner"/> <span>Just a sec…</span></>
                : success ? '✓ Welcome!'
                : isLogin ? 'Sign In →' : 'Create Account →'}
            </button>
          </form>

          {/* Divider */}
          <div className="ln-div"><span/><em>or continue with</em><span/></div>

          {/* Social */}
          <div className="ln-social">
            <button id="ln-google" className="ln-soc" onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); onNavigate && onNavigate('profile'); }, 1200); }} disabled={loading}>
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button id="ln-facebook" className="ln-soc" onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); onNavigate && onNavigate('profile'); }, 1200); }} disabled={loading}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              Facebook
            </button>
          </div>

          <p className="ln-footer">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button type="button" className="ln-link" onClick={toggle} disabled={loading}>{isLogin ? 'Sign Up' : 'Sign In'}</button>
          </p>

        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --p:     #7C3AED;   /* single uniform brand purple */
    --pd:    #6D28D9;   /* hover state — one shade darker, same hue */
    --pl:    #EDE9FE;
    --plr:   #F5F3FF;
    --bg:    #FAFAFA;
    --ink:   #111827;
    --sub:   #6B7280;
    --muted: #9CA3AF;
    --line:  #E5E7EB;
    --ease:  cubic-bezier(.4,0,.2,1);
  }

  /* ── Root ─────────────────────────────────────────────────────────── */
  .ln-root {
    font-family: 'Inter', system-ui, sans-serif;
    height: 100vh;
    min-height: 560px;
    display: flex;
    overflow: hidden;
    position: relative;
    background: #fff;
  }

  /* ══════════════════════════════════════════════════════════════════
     BRAND PANEL — left 50%, single flat purple
  ══════════════════════════════════════════════════════════════════ */
  .ln-brand {
    flex: 0 0 50%;
    /* One flat, uniform purple — no gradient */
    background: #7C3AED;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    /* Right padding leaves room for the 40px zig-zag SVG that overhangs */
    padding: 44px 56px 44px 44px;
    gap: 22px;
    position: relative;
    overflow: hidden;
  }

  /* Very subtle inner shadow so the image pops, but NO color shift */
  .ln-brand::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 70% 80% at 50% 50%, rgba(255,255,255,.06) 0%, transparent 70%);
    pointer-events: none;
  }

  /* Logo ─────────────────────────────────────────────────────── */
  .ln-logo {
    display: flex; align-items: center; justify-content: center; gap: 10px;
    z-index: 2;
  }
  .ln-logo-ico {
    width: 40px; height: 40px;
    background: rgba(255,255,255,.18);
    border: 1.5px solid rgba(255,255,255,.30);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    color: #fff;
  }
  .ln-logo-txt { font-size: 22px; font-weight: 800; color: #fff; letter-spacing: -.5px; }
  .ln-logo-txt em { color: #ddd6fe; font-style: normal; }

  /* Headline ─────────────────────────────────────────────────── */
  .ln-headline { z-index: 2; }
  .ln-headline h1 {
    font-size: clamp(22px, 2.6vw, 34px);
    font-weight: 800; color: #fff;
    line-height: 1.22; letter-spacing: -.7px;
    margin-bottom: 10px;
  }
  .ln-headline p {
    font-size: 13px; color: rgba(255,255,255,.65);
    line-height: 1.65; max-width: 240px; margin: 0 auto;
  }

  /* Illustration ─────────────────────────────────────────────── */
  .ln-illus-wrap {
    z-index: 2;
    display: flex; align-items: center; justify-content: center;
    width: 100%;
  }
  .ln-illus {
    max-width: 220px; width: 100%; height: auto;
    object-fit: contain;
    filter: drop-shadow(0 12px 28px rgba(0,0,0,.28));
    animation: illusFloat 5s ease-in-out infinite;
  }
  @keyframes illusFloat {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-10px); }
  }

  /* Stats ────────────────────────────────────────────────────── */
  .ln-stats {
    display: flex; align-items: center; justify-content: center; gap: 18px;
    background: rgba(255,255,255,.12);
    border: 1px solid rgba(255,255,255,.20);
    border-radius: 14px;
    padding: 12px 22px;
    z-index: 2;
  }
  .ln-stat { display: flex; flex-direction: column; align-items: center; gap: 2px; }
  .ln-stat strong { font-size: 15px; font-weight: 700; color: #fff; letter-spacing: -.3px; }
  .ln-stat span   { font-size: 10.5px; color: rgba(255,255,255,.55); font-weight: 500; }
  .ln-stat-sep    { width: 1px; height: 26px; background: rgba(255,255,255,.20); }

  /* ══════════════════════════════════════════════════════════════════
     ZIG-ZAG DIVIDER
     40px wide, absolutely centred on the 50% boundary.
     The SVG viewBox is "0 0 40 100" with preserveAspectRatio=none,
     so it stretches to fill the full viewport height.
     The path fills the LEFT portion with the same brand purple.
  ══════════════════════════════════════════════════════════════════ */
  .ln-zigzag {
    position: absolute;
    left: calc(50% - 20px); /* centre the 40px svg on the boundary */
    top: 0;
    width: 40px;
    height: 100%;
    z-index: 20;
    pointer-events: none;
  }

  /* ══════════════════════════════════════════════════════════════════
     FORM PANEL — right side, white
  ══════════════════════════════════════════════════════════════════ */
  .ln-form-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* Left pad offsets the ~20px zig-zag overhang for optical centering */
    padding: 40px 44px 40px 60px;
    background: #ffffff;
    overflow-y: auto;
    position: relative;
    transition: background .4s;
  }
  .ln-form-panel--ok { background: #f0fdf4; }

  /* Close */
  .ln-close {
    position: absolute; top: 20px; right: 20px;
    width: 30px; height: 30px; border-radius: 50%;
    background: transparent; border: 1.5px solid var(--line);
    display: flex; align-items: center; justify-content: center;
    color: var(--muted); cursor: pointer;
    transition: all .2s var(--ease);
  }
  .ln-close:hover { background: var(--pl); color: var(--p); border-color: var(--pl); transform: rotate(90deg); }

  /* Mobile logo */
  .ln-mobile-logo {
    display: none;
    align-items: center; gap: 8px;
    margin-bottom: 22px; cursor: pointer;
    font-size: 18px; font-weight: 800; color: var(--ink); letter-spacing: -.3px;
  }
  .ln-mobile-logo em { color: var(--p); font-style: normal; }
  .ln-mob-ico {
    width: 28px; height: 28px; background: var(--p); border-radius: 8px;
    display: flex; align-items: center; justify-content: center; color: #fff;
  }

  /* Inner form — max-width so it doesn't stretch too wide */
  .ln-form-inner {
    width: 100%; max-width: 350px;
    animation: slideIn .38s var(--ease) both;
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(16px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  /* Heading */
  .ln-head { margin-bottom: 20px; }
  .ln-head h2 {
    font-size: 24px; font-weight: 800; color: var(--ink);
    letter-spacing: -.5px; margin-bottom: 5px;
  }
  .ln-head p { font-size: 13px; color: var(--sub); line-height: 1.55; }

  /* Pill tabs */
  .ln-tabs {
    position: relative; display: flex;
    background: var(--plr); border-radius: 11px;
    padding: 4px; margin-bottom: 20px;
  }
  .ln-tab {
    flex: 1; padding: 8px;
    border: none; background: transparent;
    font-family: inherit; font-size: 13px; font-weight: 600;
    color: var(--muted); cursor: pointer;
    border-radius: 8px; position: relative; z-index: 2;
    transition: color .2s;
  }
  .ln-tab--on { color: var(--p); }
  .ln-tab-ink {
    position: absolute; top: 4px; bottom: 4px;
    width: calc(50% - 4px);
    background: #fff; border-radius: 8px;
    box-shadow: 0 1px 6px rgba(0,0,0,.08);
    transition: left .25s var(--ease);
    pointer-events: none;
  }

  /* Error */
  .ln-error {
    background: #fef2f2; border: 1px solid #fecaca;
    color: #b91c1c; border-radius: 10px;
    padding: 8px 12px; font-size: 12.5px; font-weight: 500;
    margin-bottom: 12px;
  }

  /* Form rows */
  .ln-form { display: flex; flex-direction: column; gap: 12px; }
  .ln-field { display: flex; flex-direction: column; gap: 5px; }
  .ln-field label { font-size: 12px; font-weight: 600; color: var(--ink); }

  /* Inputs */
  .ln-inp-wrap { position: relative; display: flex; align-items: center; }
  .ln-ico {
    position: absolute; left: 12px; color: var(--muted);
    pointer-events: none; transition: color .18s;
  }
  .ln-inp-wrap:focus-within .ln-ico { color: var(--p); }
  .ln-inp-wrap input {
    width: 100%; padding: 11px 12px 11px 35px;
    border: 1.5px solid var(--line); border-radius: 10px;
    background: var(--bg); font-size: 13.5px; color: var(--ink);
    outline: none; font-family: inherit;
    transition: border-color .18s, box-shadow .18s, background .18s;
  }
  .ln-inp-wrap input::placeholder { color: var(--muted); }
  .ln-inp-wrap input:focus {
    border-color: var(--p); background: #fff;
    box-shadow: 0 0 0 3px rgba(124,58,237,.1);
  }
  .ln-eye {
    position: absolute; right: 11px;
    background: none; border: none; color: var(--muted);
    cursor: pointer; display: flex; align-items: center;
    padding: 0; transition: color .18s;
  }
  .ln-eye:hover { color: var(--p); }

  /* Password strength */
  .ln-str { display: flex; align-items: center; gap: 5px; margin-top: 4px; }
  .ln-str-seg { height: 3px; flex: 1; border-radius: 3px; transition: background .3s; }
  .ln-mismatch { font-size: 11.5px; color: #ef4444; font-weight: 500; margin-top: 2px; }

  /* Remember / forgot */
  .ln-opts { display: flex; justify-content: space-between; align-items: center; font-size: 12.5px; }
  .ln-check {
    display: flex; align-items: center; gap: 7px; cursor: pointer;
    color: var(--sub); position: relative; padding-left: 20px; user-select: none;
  }
  .ln-check input { position: absolute; opacity: 0; width: 0; height: 0; }
  .ln-chk {
    position: absolute; left: 0; width: 14px; height: 14px;
    background: #fafafa; border: 1.5px solid var(--line);
    border-radius: 4px; transition: all .18s;
  }
  .ln-check:hover .ln-chk { border-color: var(--p); }
  .ln-check input:checked ~ .ln-chk { background: var(--p); border-color: var(--p); }
  .ln-chk::after {
    content:''; position:absolute; display:none;
    left:3px; top:0; width:5px; height:8px;
    border:solid #fff; border-width:0 2px 2px 0; transform:rotate(45deg);
  }
  .ln-check input:checked ~ .ln-chk::after { display: block; }
  .ln-forgot { color: var(--p); font-weight: 600; text-decoration: none; font-size: 12.5px; }
  .ln-forgot:hover { color: var(--pd); }

  /* Submit button */
  .ln-btn {
    background: var(--p);
    color: #fff; border: none; border-radius: 10px; padding: 12px;
    font-size: 14px; font-weight: 700; cursor: pointer; font-family: inherit;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; margin-top: 6px;
    box-shadow: 0 4px 16px rgba(124,58,237,.28);
    transition: all .2s var(--ease);
  }
  .ln-btn:hover { background: var(--pd); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(124,58,237,.36); }
  .ln-btn:active { transform: translateY(0); }
  .ln-btn:disabled { opacity: .75; cursor: not-allowed; transform: none; }
  .ln-btn--ok { background: #16a34a !important; box-shadow: 0 4px 14px rgba(22,163,74,.25) !important; }
  .ln-spinner {
    width: 14px; height: 14px;
    border: 2px solid rgba(255,255,255,.35); border-top-color: #fff;
    border-radius: 50%; animation: spin .7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Divider */
  .ln-div { display: flex; align-items: center; gap: 10px; margin: 16px 0 12px; }
  .ln-div span { flex: 1; height: 1px; background: var(--line); }
  .ln-div em { font-style: normal; font-size: 11.5px; color: var(--muted); white-space: nowrap; }

  /* Social */
  .ln-social { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; margin-bottom: 14px; }
  .ln-soc {
    display: flex; align-items: center; justify-content: center; gap: 7px;
    padding: 9px; border-radius: 9px;
    background: #fff; border: 1.5px solid var(--line);
    font-family: inherit; font-size: 12.5px; font-weight: 600; color: var(--ink);
    cursor: pointer; transition: all .18s var(--ease);
  }
  .ln-soc:hover { border-color: var(--p); background: var(--plr); transform: translateY(-1px); }

  /* Footer */
  .ln-footer { text-align: center; font-size: 12.5px; color: var(--sub); }
  .ln-link {
    background: none; border: none; color: var(--p); font-weight: 700;
    cursor: pointer; font-size: inherit; font-family: inherit; padding: 0;
  }
  .ln-link:hover { color: var(--pd); text-decoration: underline; }

  /* Fade-in utility */
  .ln-fade { animation: fadeUp .25s var(--ease) both; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }

  /* ══════════════════════════════════════════════════════════════════
     RESPONSIVE
  ══════════════════════════════════════════════════════════════════ */
  @media (max-width: 860px) {
    .ln-root { flex-direction: column; height: auto; min-height: 100vh; }
    .ln-brand {
      flex: 0 0 auto;
      padding: 32px 24px 60px;
      gap: 18px;
    }
    .ln-illus { max-width: 170px; }
    .ln-zigzag { display: none; }
    /* Bottom zig-zag via clip-path on pseudo-element */
    .ln-brand::after {
      content: '';
      position: absolute;
      bottom: -1px; left: 0; right: 0; height: 50px;
      background: #fff;
      clip-path: polygon(
        0% 100%, 5% 0%, 10% 100%, 15% 0%, 20% 100%,
        25% 0%, 30% 100%, 35% 0%, 40% 100%, 45% 0%,
        50% 100%, 55% 0%, 60% 100%, 65% 0%, 70% 100%,
        75% 0%, 80% 100%, 85% 0%, 90% 100%, 95% 0%, 100% 100%
      );
    }
    .ln-form-panel { padding: 36px 24px 32px; justify-content: flex-start; }
    .ln-mobile-logo { display: flex; }
  }
  @media (max-width: 480px) {
    .ln-brand { padding: 26px 18px 56px; }
    .ln-headline h1 { font-size: 22px; }
    .ln-illus { max-width: 140px; }
    .ln-stats { gap: 10px; padding: 10px 14px; }
    .ln-form-panel { padding: 28px 16px; }
  }
`;
