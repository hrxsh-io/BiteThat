import { useState } from "react";
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ChevronRight,
  Star,
  Zap,
} from "lucide-react";

const LogoSVG = ({ className }: { className?: string }) => (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 154.943434 39.105092"
    preserveAspectRatio="xMidYMid meet"
    className={className}
    aria-label="Brand logo"
  >
    <g
      transform="translate(-43.056566,93.865291) scale(0.100000,-0.100000)"
      fill="currentColor"
      stroke="none"
    >
      <path d="M1321 924 c-17 -12 -21 -22 -17 -40 6 -23 4 -24 -21 -18 -16 4 -45 13 -67 21 -52 18 -80 16 -99 -5 -24 -26 -21 -44 11 -75 32 -31 44 -33 66 -11 15 14 16 6 16 -85 0 -83 -3 -101 -15 -101 -21 0 -19 -22 5 -43 14 -12 38 -17 80 -17 64 0 72 8 45 44 -11 14 -15 47 -15 116 l0 97 30 -5 30 -4 0 -94 c0 -56 -4 -94 -10 -94 -15 0 -12 -29 4 -46 18 -17 107 -19 124 -2 9 9 12 9 12 0 0 -19 109 -16 117 3 5 14 7 14 22 0 10 -8 28 -15 42 -15 137 -1 139 0 151 24 l10 24 22 -25 c28 -33 73 -34 98 -3 24 30 23 42 -7 64 -20 15 -25 28 -25 62 0 40 2 44 25 44 14 0 25 5 25 11 0 7 -11 22 -25 35 -14 13 -25 26 -25 29 0 12 -29 35 -43 35 -8 0 -18 -11 -21 -25 -4 -16 -13 -25 -27 -25 -26 0 -35 -26 -15 -45 10 -11 16 -34 16 -66 0 -53 -16 -66 -26 -21 -22 101 -50 132 -120 132 -65 0 -108 -52 -72 -88 9 -9 8 -16 -5 -30 -9 -10 -18 -32 -18 -48 -1 -16 -5 1 -9 39 -8 83 -42 127 -97 127 -31 0 -33 2 -33 35 0 19 -4 35 -10 35 -5 0 -10 7 -10 15 0 8 -7 15 -16 15 -9 0 -27 9 -41 20 -31 24 -33 24 -62 4z m55 -16 c4 -7 3 -8 -4 -4 -8 5 -10 2 -6 -8 3 -9 9 -15 12 -14 47 6 52 -1 52 -63 l0 -60 22 15 c12 9 32 16 44 16 38 0 52 -29 56 -117 3 -78 2 -83 -17 -83 -18 0 -20 7 -20 85 0 65 -4 88 -15 95 -21 14 -28 12 -50 -10 -16 -16 -20 -33 -20 -95 0 -71 -1 -75 -22 -75 -23 0 -23 0 -20 142 3 139 3 142 -16 125 -10 -9 -22 -17 -27 -17 -5 0 0 7 11 15 18 14 18 14 -8 15 -20 0 -28 5 -28 18 0 10 3 22 7 25 10 11 41 8 49 -5z m-223 -28 c-27 -11 -30 -18 -6 -16 23 1 29 -32 8 -40 -9 -4 -24 0 -33 9 -14 15 -14 18 3 37 10 11 25 20 34 19 10 0 8 -3 -6 -9z m117 -25 c37 -9 46 -14 28 -14 l-28 -1 0 -119 c0 -105 2 -120 18 -124 9 -3 -8 -5 -38 -5 -30 0 -47 2 -37 5 15 4 17 19 17 133 0 93 -3 130 -12 133 -22 9 -4 7 52 -8z m648 -76 l27 -2 -28 -4 -28 -4 3 -87 c3 -80 5 -87 23 -85 18 2 18 2 -2 -8 -44 -23 -53 -7 -53 91 0 79 -2 90 -17 91 -15 0 -14 2 4 11 13 6 26 20 30 32 7 19 8 19 11 -6 3 -22 9 -28 30 -29z m-168 -9 c16 -16 20 -33 20 -96 0 -66 2 -75 16 -70 14 5 15 4 4 -9 -32 -38 -58 -1 -54 76 4 68 -12 102 -51 110 -29 6 -29 7 8 8 25 1 43 -5 57 -19z m-77 -24 c5 -13 -10 -36 -25 -36 -4 0 -12 10 -19 21 -7 13 -7 19 -1 15 6 -3 13 -2 17 4 9 14 22 12 28 -4z m47 -18 c0 -19 -2 -20 -10 -8 -13 19 -13 30 0 30 6 0 10 -10 10 -22z m-220 -52 c0 -46 -4 -65 -14 -69 -8 -3 -17 -3 -20 0 -9 10 -7 79 4 107 17 45 30 29 30 -38z m195 7 c-30 -8 -45 -23 -45 -48 0 -35 25 -51 57 -36 23 11 25 10 13 -3 -17 -21 -69 -20 -92 1 -41 37 -6 94 57 92 21 -1 24 -3 10 -6z m23 -50 c-2 -10 -11 -19 -21 -21 -16 -3 -17 -1 -7 17 13 25 33 28 28 4z" />
      <path d="M463 893 c-36 -5 -41 -16 -18 -39 12 -12 15 -41 15 -130 0 -95 -3 -114 -15 -114 -21 0 -19 -22 4 -42 13 -11 40 -17 83 -18 93 -2 96 -2 117 19 19 19 20 19 40 0 26 -24 121 -28 121 -5 0 8 -4 18 -10 21 -6 3 -10 48 -10 101 0 66 -4 94 -12 94 -9 0 -9 3 0 12 17 17 14 39 -8 66 -25 30 -64 27 -68 -6 -2 -13 2 -30 8 -38 10 -11 9 -14 -9 -14 -28 0 -40 -29 -18 -42 13 -7 17 -24 17 -78 0 -86 -16 -93 -22 -10 -4 52 -9 65 -38 95 -23 24 -43 35 -62 35 -25 0 -28 3 -28 35 0 19 -4 35 -10 35 -5 0 -10 7 -10 15 0 15 -5 15 -67 8z m49 -80 c1 -38 0 -88 -1 -113 -3 -57 12 -96 39 -105 30 -9 47 9 54 58 12 89 -22 150 -63 113 -24 -22 -28 -15 -5 8 23 23 57 19 84 -9 20 -21 24 -37 24 -80 0 -43 -4 -59 -24 -80 -27 -29 -65 -32 -92 -8 -11 9 -18 11 -18 5 0 -7 -9 -12 -20 -12 -19 0 -20 7 -20 139 0 102 -3 141 -12 144 -7 3 2 6 20 6 l32 1 2 -67z m241 45 c6 -19 -3 -38 -18 -38 -18 0 -28 17 -21 35 7 18 33 20 39 3z m-1 -196 c3 -66 1 -72 -17 -72 -19 0 -20 6 -17 90 3 81 2 90 -15 91 -10 1 -4 4 12 8 34 7 32 12 37 -117z m-162 29 c0 -59 -7 -81 -26 -81 -17 0 -20 81 -4 111 18 33 30 21 30 -30z" />
      <path d="M852 825 c-7 -15 -20 -25 -32 -25 -22 0 -29 -35 -8 -42 7 -3 14 -38 17 -91 5 -70 10 -89 26 -101 30 -23 71 -20 92 8 l19 23 28 -23 c26 -23 48 -29 91 -24 45 4 87 70 61 96 -13 12 -13 18 -1 40 16 31 11 49 -23 87 -21 22 -34 27 -71 27 -25 0 -55 -7 -65 -15 -25 -19 -46 -19 -46 0 0 8 -7 15 -15 15 -8 0 -15 5 -15 11 0 13 -25 39 -38 39 -5 0 -14 -11 -20 -25z m51 -46 c22 -2 22 -2 0 -6 -22 -4 -23 -9 -23 -94 0 -91 7 -106 34 -67 9 12 16 18 16 14 0 -16 -32 -46 -50 -46 -32 0 -40 22 -40 107 0 72 -2 83 -17 83 -13 1 -11 5 8 15 15 8 30 22 35 32 6 15 8 14 12 -9 2 -20 9 -28 25 -29z m195 -5 c50 -35 12 -94 -60 -94 -34 0 -38 -2 -38 -27 0 -30 25 -63 49 -63 9 0 28 7 41 16 l25 16 -24 -21 c-71 -63 -162 24 -129 125 20 59 87 83 136 48z m-152 -50 c-3 -9 -6 -31 -6 -50 0 -24 -5 -34 -15 -34 -11 0 -15 12 -15 50 0 44 2 50 21 50 15 0 19 -4 15 -16z m154 -82 c0 -15 -24 -32 -47 -32 -16 0 -23 6 -23 20 0 16 7 20 35 20 19 0 35 -4 35 -8z" />
      <path d="M1010 761 c-5 -11 -10 -32 -10 -46 0 -23 3 -26 31 -23 38 4 54 26 45 61 -8 33 -50 38 -66 8z m60 -25 c0 -16 -28 -42 -36 -33 -8 7 14 47 26 47 6 0 10 -6 10 -14z" />
    </g>
  </svg>
);

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter / X", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

const footerLinks = [
  {
    heading: "Explore",
    links: [
      "Restaurants Near You",
      "Cuisines",
      "Top Rated",
      "New Arrivals",
      "Offers & Deals",
      "Gift Cards",
    ],
  },
  {
    heading: "Company",
    links: [
      "About Us",
      "Careers",
      "Press & Media",
      "Blog",
      "Investor Relations",
      "Sustainability",
    ],
  },
  {
    heading: "For Partners",
    links: [
      "Add Your Restaurant",
      "Partner Dashboard",
      "Delivery Partner",
      "Advertise With Us",
      "API for Developers",
    ],
  },
  {
    heading: "Help",
    links: [
      "Help Center",
      "Track Your Order",
      "Cancellation Policy",
      "Refund Policy",
      "Privacy Policy",
      "Terms of Service",
    ],
  },
];

const cities = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Kochi",
];

export default function App() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-background font-['DM_Sans',sans-serif]">
      {/* Newsletter + app download strip */}
      <div className="border-t-2 border-primary/20 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
            {/* Newsletter */}
            <div className="flex-1 max-w-lg">
              {/* BiteDash brand lockup */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                  <Zap size={16} className="text-white" />
                </div>
                <LogoSVG className="h-6 w-auto text-foreground" />
              </div>

              <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold mb-2">
                Stay in the loop
              </p>
              <h2 className="text-2xl lg:text-3xl font-['Fraunces',serif] text-foreground font-semibold leading-snug mb-4">
                Get the best deals{" "}
                <span className="text-primary">delivered</span> to your inbox
              </h2>

              {subscribed ? (
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                  <Star size={14} className="fill-accent text-accent" />
                  <span>{"You're on the list — expect great things!"}</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex items-stretch gap-0 max-w-sm"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-secondary text-foreground placeholder-muted-foreground text-sm px-4 py-3 rounded-l-lg border border-border border-r-0 focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-primary text-white px-5 py-3 rounded-r-lg text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    Subscribe
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>

            {/* App download */}
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold">
                Order on the go
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="flex items-center gap-2.5 bg-foreground text-white rounded-xl px-4 py-3 hover:bg-foreground/90 active:scale-95 transition-all"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div>
                    <div className="text-[9px] opacity-70 leading-none">Download on the</div>
                    <div className="text-sm font-semibold leading-tight">App Store</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2.5 bg-foreground text-white rounded-xl px-4 py-3 hover:bg-foreground/90 active:scale-95 transition-all"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M3.18 23.76c.3.17.65.2.98.09l11.5-6.63-2.5-2.5-9.98 9zm15.36-8.89L5.76 7.94c-.34-.2-.75-.2-1.09 0L3 8.87l.01 6.26 1.67.97 14-7.99-1.14-1.24zM19.82 10.7l-2.5-1.44-2.81 2.75 2.81 2.75 2.52-1.46c.71-.41.71-1.43-.02-1.6zM4.2.24L14.66 8.6l-2.5 2.5L3.18.34C3.5.18 3.87.2 4.2.24z" />
                  </svg>
                  <div>
                    <div className="text-[9px] opacity-70 leading-none">Get it on</div>
                    <div className="text-sm font-semibold leading-tight">Google Play</div>
                  </div>
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={11} className="fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  4.8 · 2M+ reviews
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer — deep navy from the design system */}
      <footer
        style={{ backgroundColor: "#1A1528" }}
        className="text-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Nav columns */}
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12 pt-12 pb-10 border-b border-white/10">
            {/* Brand col */}
            <div className="flex flex-col gap-6">
              <div>
                {/* Logo in white */}
                <LogoSVG className="h-7 w-auto text-white" />
                <p className="mt-4 text-sm text-white/55 leading-relaxed max-w-[190px]">
                  Discover the best food from thousands of restaurants near you.
                </p>
              </div>

              {/* Gold accent tagline */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold w-fit"
                style={{ backgroundColor: "#FFCC00", color: "#1A1528" }}
              >
                <Zap size={11} />
                Free delivery on first order
              </div>

              {/* Socials */}
              <div className="flex items-center gap-2">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-white/15 text-white/60 hover:border-primary hover:text-primary transition-colors"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerLinks.map(({ heading, links }) => (
                <div key={heading}>
                  <h3
                    className="text-xs uppercase tracking-[0.16em] font-semibold mb-4"
                    style={{ color: "#7C4DFF" }}
                  >
                    {heading}
                  </h3>
                  <ul className="space-y-2.5">
                    {links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm text-white/55 hover:text-white transition-colors flex items-center gap-1 group"
                        >
                          <ChevronRight
                            size={10}
                            className="opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all"
                            style={{ color: "#FFCC00" }}
                          />
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Cities */}
          <div className="py-6 border-b border-white/10">
            <p className="text-xs uppercase tracking-[0.16em] text-white/40 font-semibold mb-3">
              We deliver in
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {cities.map((city) => (
                <a
                  key={city}
                  href="#"
                  className="text-xs text-white/50 hover:text-white transition-colors"
                >
                  {city}
                </a>
              ))}
              <a
                href="#"
                className="text-xs font-semibold hover:underline transition-colors"
                style={{ color: "#FFCC00" }}
              >
                + 300 more cities
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="py-6 border-b border-white/10 flex flex-col sm:flex-row gap-4 sm:gap-8">
            <a
              href="tel:+918001234567"
              className="flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors"
            >
              <Phone size={13} style={{ color: "#7C4DFF" }} />
              +91 800 123 4567
            </a>
            <a
              href="mailto:hello@bitedash.com"
              className="flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors"
            >
              <Mail size={13} style={{ color: "#7C4DFF" }} />
              hello@bitedash.com
            </a>
            <span className="flex items-center gap-2 text-sm text-white/55">
              <MapPin size={13} style={{ color: "#7C4DFF" }} />
              Bengaluru, India · Mon–Sun 24/7
            </span>
          </div>

          {/* Bottom bar */}
          <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/35">
              © 2026 BiteDash Technologies Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {["Privacy", "Terms", "Cookies", "Sitemap"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs text-white/35 hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
