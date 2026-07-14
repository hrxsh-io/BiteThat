import {
  Instagram,
  Youtube,
  Twitter,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import logo from "../../assets/logo.jpeg";
import { FaApple } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      {/* ================= Newsletter ================= */}

      <section className="bg-white py-14">
        <div className="max-w-[1400px] mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          {/* ================= Left ================= */}

          <div>

            {/* Logo */}

            <div className="flex items-center gap-3 mb-8">

              <img
                src={logo}
                alt="BiteThat"
                className="w-9 h-9 rounded-full"
              />

              <h2 className="text-2xl font-bold">
                <span className="text-violet-600">bite</span>
                <span className="text-slate-900">That</span>
              </h2>

            </div>

            <p className="uppercase tracking-[0.25em] text-violet-600 font-semibold text-xs mb-4">
              STAY IN THE LOOP
            </p>

            <h2
              className="text-[32px] md:text-[36px] lg:text-[40px] leading-[1.2] font-bold text-slate-900"
              style={{ fontFamily: "Playfair Display" }}
            >
              Get the best deals{" "}
              <span className="text-violet-600">delivered</span>
              <br />
              to your inbox
            </h2>

            {/* Email */}

            <div className="mt-10 flex max-w-lg rounded-2xl overflow-hidden border border-violet-200 shadow-sm">

              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-violet-50 px-6 py-4 text-base text-slate-700 placeholder:text-gray-500 outline-none"
              />

              <button className="bg-violet-600 hover:bg-violet-700 transition text-white px-8 text-base font-semibold">
                Subscribe →
              </button>

            </div>

          </div>

          {/* ================= Right ================= */}

          <div className="flex flex-col items-start lg:items-end">

            <div>

              <p className="uppercase tracking-[0.28em] text-violet-600 font-semibold text-base mb-5">
                ORDER ON THE GO
              </p>

              <div className="flex flex-wrap gap-3">

                {/* App Store */}

                <button className="bg-[#21193A] rounded-[22px] px-5 py-3 hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <FaApple className="text-white text-2xl" />

                    <div className="text-left">
                      <p className="text-[10px] text-gray-400">
                        Download on the
                      </p>

                      <h4 className="text-white text-lg font-semibold leading-none mt-1">
                        App Store
                      </h4>
                    </div>
                  </div>
                </button>

                {/* Google Play */}

                <button className="bg-[#21193A] rounded-[22px] px-5 py-3 hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <FaGooglePlay className="text-white text-2xl" />

                    <div className="text-left">
                      <p className="text-[10px] text-gray-400">
                        Get it on
                      </p>

                      <h4 className="text-white text-lg font-semibold leading-none mt-1">
                        Google Play
                      </h4>
                    </div>
                  </div>
                </button>

              </div>

              {/* Rating */}

              <div className="flex items-center gap-3 mt-6">

                <div className="flex text-yellow-400 text-lg tracking-wide">
                  ★★★★★
                </div>

                <p className="text-gray-500 text-base font-medium">
                  4.8 • 2M+ Reviews
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= Main Footer ================= */}

      <section className="w-full px-6 lg:px-10 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] gap-x-20 gap-y-12">

          {/* ================= Logo ================= */}

          <div>

            <div className="flex items-center gap-3 mb-5">

              <img
                src={logo}
                alt="BiteThat"
                className="w-11 h-11 rounded-full object-cover"
              />

              <h2 className="text-2xl font-extrabold tracking-tight">
                <span className="text-violet-500">bite</span>
                <span>That</span>
              </h2>

            </div>

            <p className="text-gray-400 text-[14px] leading-7 max-w-sm mb-7">
              Order delicious food from your favourite restaurants with
              lightning-fast delivery and exclusive deals.
            </p>

            {/* Delivery Badge */}

            <div className="inline-flex items-center gap-2 bg-yellow-400 text-black rounded-full px-5 py-2 text-sm font-semibold whitespace-nowrap mb-8">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
              </svg>

              Free delivery on first order

            </div>

            {/* Social Icons */}

            <div className="flex gap-3">

              {[
                <Instagram size={18} />,
                <Youtube size={18} />,
                <Twitter size={18} />,
                <Mail size={18} />,
              ].map((icon, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center cursor-pointer
            text-gray-300
            hover:bg-violet-600
            hover:text-white
            hover:-translate-y-1
            transition-all duration-300"
                >
                  {icon}
                </div>
              ))}

            </div>

          </div>

          {/* ================= Explore ================= */}

          <div>

            <h3 className="text-violet-500 font-semibold text-lg mb-5">
              Explore
            </h3>

            <ul className="space-y-3 text-[14px]">

              {[
                "Restaurants",
                "Top Rated",
                "Categories",
                "Offers",
                "Gift Cards",
              ].map((item) => (

                <li
                  key={item}
                  className="text-gray-400 cursor-pointer transition-all duration-300 hover:text-white hover:translate-x-1"
                >
                  {item}
                </li>

              ))}

            </ul>

          </div>

          {/* ================= Company ================= */}

          <div>

            <h3 className="text-violet-500 font-semibold text-lg mb-5">
              Company
            </h3>

            <ul className="space-y-3 text-[14px]">

              {[
                "About",
                "Careers",
                "Blog",
                "Contact",
                "Privacy",
              ].map((item) => (

                <li
                  key={item}
                  className="text-gray-400 cursor-pointer transition-all duration-300 hover:text-white hover:translate-x-1"
                >
                  {item}
                </li>

              ))}

            </ul>

          </div>

          {/* ================= Partners ================= */}

          <div>

            <h3 className="text-violet-500 font-semibold text-lg mb-5">
              Partners
            </h3>

            <ul className="space-y-3 text-[14px]">

              {[
                "Add Restaurant",
                "Partner Dashboard",
                "Delivery Partner",
                "Developer API",
              ].map((item) => (

                <li
                  key={item}
                  className="text-gray-400 cursor-pointer transition-all duration-300 hover:text-white hover:translate-x-1"
                >
                  {item}
                </li>

              ))}

            </ul>

          </div>

          {/* ================= Help ================= */}

          <div>

            <h3 className="text-violet-500 font-semibold text-lg mb-5">
              Help
            </h3>

            <ul className="space-y-3 text-[14px]">

              {[
                "Support",
                "Track Order",
                "Refund Policy",
                "Terms",
                "FAQs",
              ].map((item) => (

                <li
                  key={item}
                  className="text-gray-400 cursor-pointer transition-all duration-300 hover:text-white hover:translate-x-1"
                >
                  {item}
                </li>

              ))}

            </ul>

          </div>

        </div>

      </section>
      {/* ================= Cities ================= */}

      <section className="border-t border-slate-700">
        <div className="w-full px-6 lg:px-10 py-8">
          <h4 className="text-gray-400 uppercase tracking-widest mb-4">
            We Deliver In
          </h4>

          <div className="flex flex-wrap gap-5 text-gray-400">
            <span>Mumbai</span>
            <span>Delhi</span>
            <span>Bengaluru</span>
            <span>Hyderabad</span>
            <span>Pune</span>
            <span>Ahmedabad</span>
            <span>Jaipur</span>
            <span>Lucknow</span>

            <span className="text-yellow-400 font-semibold">
              +300 more cities
            </span>
          </div>
        </div>
      </section>

      {/* ================= Bottom Footer ================= */}

      <section className="border-t border-slate-700">
        <div className="w-full px-6 lg:px-10 py-6 flex flex-col lg:flex-row justify-between gap-6">
          <div className="flex flex-wrap gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-violet-500" />
              +91 98765 43210
            </div>

            <div className="flex items-center gap-2">
              <Mail size={18} className="text-violet-500" />
              hello@bitethat.com
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-violet-500" />
              Gwalior, India
            </div>
          </div>

          <div className="text-gray-500">
            © 2026 BiteThat. All rights reserved.
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;