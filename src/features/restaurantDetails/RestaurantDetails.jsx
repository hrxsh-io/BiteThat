import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import RestaurantHero from "./components/RestaurantHero";
import OfferCarousel from "./components/OfferCarousel";
import StickyTabs from "./components/StickyTabs";
import PopularDishes from "./components/PopularDishes";
import MenuAccordion from "./components/MenuAccordion";
import Reviews from "./components/Reviews";
import Gallery from "./components/Gallery";
import SimilarRestaurants from "./components/SimilarRestaurants";
import FloatingCart from "./components/FloatingCart";
import MenuCardSkeleton from "./components/loading/MenuCardSkeleton";

import menu from "./data/menu";

export default function RestaurantDetails() {
  // Loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  
  /* ==========================================================
      DEMO RESTAURANT DATA
  ========================================================== */

  const restaurant = useMemo(
    () => ({
      id: 1,
      name: "Burger Palace",
      cuisine: "American • Burgers • Fast Food",
      rating: 4.8,
      reviews: 2864,
      deliveryTime: "20–30 mins",
      priceForTwo: 450,
      distance: "2.3 km",
      isOpen: true,
      closingTime: "11:00 PM",

      coverImage:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600",

      logo:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",

      description:
        "Premium handcrafted burgers made with fresh ingredients, signature sauces, and perfectly toasted buns.",

      offers: [
        {
          id: 1,
          title: "40% OFF",
          subtitle: "Up to ₹120",
        },
        {
          id: 2,
          title: "FREE DELIVERY",
          subtitle: "On orders above ₹299",
        },
        {
          id: 3,
          title: "5x BiteCoins",
          subtitle: "Weekend Special",
        },
      ],
    }),
    []
  );

  /* ==========================================================
      PAGE STATE
  ========================================================== */

  const [favorite, setFavorite] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const [activeTab, setActiveTab] = useState("overview");

  /* ==========================================================
      SECTION REFERENCES
  ========================================================== */

  const overviewRef = useRef(null);
  const popularRef = useRef(null);
  const menuRef = useRef(null);
  const reviewsRef = useRef(null);
  const galleryRef = useRef(null);

  const sections = useMemo(
    () => [
      {
        id: "overview",
        label: "Overview",
        ref: overviewRef,
      },
      {
        id: "popular",
        label: "Popular",
        ref: popularRef,
      },
      {
        id: "menu",
        label: "Menu",
        ref: menuRef,
      },
      {
        id: "reviews",
        label: "Reviews",
        ref: reviewsRef,
      },
      {
        id: "gallery",
        label: "Gallery",
        ref: galleryRef,
      },
    ],
    []
  );

  /* ==========================================================
      SCROLL TO SECTION
  ========================================================== */

  const scrollToSection = (id) => {
    const section = sections.find((item) => item.id === id);

    if (!section?.ref?.current) return;

    section.ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /* ==========================================================
      ACTIVE TAB DETECTION
  ========================================================== */

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      sections.forEach((section) => {
        if (!section.ref.current) return;

        const top = section.ref.current.offsetTop;
        const height = section.ref.current.offsetHeight;

        if (
          scrollPosition >= top &&
          scrollPosition < top + height
        ) {
          setActiveTab(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  /* ==========================================================
      CART HANDLERS
  ========================================================== */

  const addToCart = (food) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === food.id);

      if (exists) {
        return prev.map((item) =>
          item.id === food.id
            ? {
              ...item,
              quantity: item.quantity + 1,
            }
            : item
        );
      }

      return [
        ...prev,
        {
          ...food,
          quantity: 1,
        },
      ];
    });
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  /* ==========================================================
      PAGE
  ========================================================== */

  return (
    <main className="min-h-screen bg-[#faf8ff]">
      {/* HERO */}

      <RestaurantHero
        restaurant={restaurant}
        favorite={favorite}
        onFavorite={() => setFavorite((prev) => !prev)}
      />

      {/* STICKY TABS */}

      <StickyTabs
        sections={sections}
        activeTab={activeTab}
        onTabClick={scrollToSection}
      />

      {/* CONTENT */}
      <div className="flex w-full gap-6 px-4 lg:px-5 py-4">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 space-y-6"
        >

          {/* OVERVIEW */}

          <section
            id="overview"
            ref={overviewRef}
          >
            <OfferCarousel
              offers={restaurant.offers}
            />
          </section>

          {/* POPULAR */}

          <section
            id="popular"
            ref={popularRef}
          >
            <PopularDishes
              foods={menu}
              onAdd={addToCart}
            />
          </section>

          {/* MENU */}

          <section
            id="menu"
            ref={menuRef}
          >
            {loading ? (
              <div className="space-y-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <MenuCardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <MenuAccordion
                menu={menu}
                onAdd={addToCart}
              />
            )}
          </section>

          {/* REVIEWS */}

          <section
            id="reviews"
            ref={reviewsRef}
          >
            <Reviews />
          </section>

          {/* GALLERY */}

          <section
            id="gallery"
            ref={galleryRef}
          >
            <Gallery />
          </section>

          {/* SIMILAR */}

          <SimilarRestaurants />

        </motion.div>
      </div>

      {/* MOBILE CART */}

      <FloatingCart
        cartItems={cartItems}
        total={cartTotal}
      />
    </main>
  );
}