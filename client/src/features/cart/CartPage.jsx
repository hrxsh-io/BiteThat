import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import CartProgress from "./components/CartProgress";
import CartItem from "./components/CartItem";
import DeliveryCard from "./components/DeliveryCard";
import CouponCard from "./components/CouponCard";
import BiteCoinsCard from "./components/BiteCoinsCard";
import OrderSummary from "./components/OrderSummary";
import AIRecommendationCarousel from "./components/AIRecommendationCarousel";
import StickyCheckout from "./components/StickyCheckout";

export default function CartPage() {
  /* ==========================================
      DEMO CART DATA
  ========================================== */

  const [cartItems, setCartItems] = useState([
    {
      id: 1,

      // Restaurant
      restaurant: "Domino's Pizza",
      restaurantRating: 4.7,
      delivery: "22 mins",
      distance: "2.1 km",
      restaurantLogo: "/restaurants/dominos.png",
      verified: true,

      // Food
      name: "Pepperoni Feast",
      description: "Fresh pepperoni with mozzarella cheese",
      image: "/foods/pizza.jpg",

      quantity: 2,
      price: 499,

      rating: 4.8,
      reviewCount: "2.3k",

      category: "Pizza",
      cuisine: "Italian",

      isVeg: false,

      tags: [
        "Medium",
        "Extra Cheese",
        "Bestseller",
      ],
    },

    {
      id: 2,

      // Restaurant
      restaurant: "Burger Factory",
      restaurantRating: 4.8,
      delivery: "18 mins",
      distance: "1.3 km",
      restaurantLogo: "/restaurants/burger-factory.png",
      verified: true,

      // Food
      name: "Chicken Burger",
      description: "Grilled chicken with spicy mayo",
      image: "/foods/burger.jpg",

      quantity: 1,
      price: 299,

      rating: 4.7,
      reviewCount: "1.6k",

      category: "Burger",
      cuisine: "American",

      isVeg: false,

      tags: [
        "Spicy",
        "Popular",
      ],
    },

    {
      id: 3,

      // Restaurant
      restaurant: "Starbucks",
      restaurantRating: 4.9,
      delivery: "16 mins",
      distance: "850 m",
      restaurantLogo: "/restaurants/starbucks.png",
      verified: true,

      // Food
      name: "Cold Coffee",
      description: "Creamy cold coffee with whipped cream",
      image: "/foods/coffee.jpg",

      quantity: 1,
      price: 199,

      rating: 4.9,
      reviewCount: "3.8k",

      category: "Beverage",
      cuisine: "Cafe",

      isVeg: true,

      tags: [
        "Cold",
        "Recommended",
      ],
    },

    {
      id: 4,

      // Restaurant
      restaurant: "The Belgian Waffle Co.",
      restaurantRating: 4.8,
      delivery: "24 mins",
      distance: "2.8 km",
      restaurantLogo: "/restaurants/waffle.png",
      verified: true,

      // Food
      name: "Chocolate Brownie",
      description: "Warm brownie served with chocolate sauce",
      image: "/foods/brownie.jpg",

      quantity: 1,
      price: 179,

      rating: 4.8,
      reviewCount: "1.2k",

      category: "Dessert",
      cuisine: "Desserts",

      isVeg: true,

      tags: [
        "Dessert",
        "Sweet",
      ],
    },
  ]);

  const [recommendations] = useState([
    {
      id: 101,
      restaurant: "Domino's Pizza",
      restaurantRating: 4.7,
      delivery: "22 mins",
      distance: "2.1 km",
      verified: true,

      name: "Garlic Bread",
      description: "Freshly baked garlic bread with herbs",
      image: "/foods/garlic-bread.jpg",

      price: 149,
      rating: 4.8,
      reviewCount: "1.5k",

      category: "Sides",
      cuisine: "Italian",

      isVeg: true,

      tags: ["Veg", "Popular"],
    },

    {
      id: 102,
      restaurant: "Burger Factory",
      restaurantRating: 4.8,
      delivery: "18 mins",
      distance: "1.3 km",
      verified: true,

      name: "French Fries",
      description: "Crispy golden fries with peri-peri seasoning",
      image: "/foods/fries.jpg",

      price: 129,
      rating: 4.7,
      reviewCount: "900",

      category: "Sides",
      cuisine: "American",

      isVeg: true,

      tags: ["Crispy", "Popular"],
    },

    {
      id: 103,
      restaurant: "Starbucks",
      restaurantRating: 4.9,
      delivery: "16 mins",
      distance: "850 m",
      verified: true,

      name: "Cold Coffee",
      description: "Creamy cold coffee with whipped cream",
      image: "/foods/coffee.jpg",

      price: 199,
      rating: 4.9,
      reviewCount: "2.1k",

      category: "Beverage",
      cuisine: "Cafe",

      isVeg: true,

      tags: ["Cold", "Recommended"],
    },

    {
      id: 104,
      restaurant: "The Belgian Waffle Co.",
      restaurantRating: 4.8,
      delivery: "24 mins",
      distance: "2.6 km",
      verified: true,

      name: "Chocolate Brownie",
      description: "Warm brownie served with chocolate sauce",
      image: "/foods/brownie.jpg",

      price: 179,
      rating: 4.8,
      reviewCount: "1.8k",

      category: "Dessert",
      cuisine: "Desserts",

      isVeg: true,

      tags: ["Dessert", "Sweet"],
    },
  ]);

  /* ==========================================
        COUPON & BITECOINS STATE
  ========================================== */

  const [couponDiscount, setCouponDiscount] = useState(0);
  const [coinDiscount, setCoinDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  /* ==========================================
        COUPON HANDLER
  ========================================== */

  const handleApplyCoupon = (coupon) => {
    setAppliedCoupon(coupon.code);

    switch (coupon.code) {
      case "BITETHAT10":
        setCouponDiscount(Math.min(subtotal * 0.1, 100));
        break;

      case "BITETHAT20":
        setCouponDiscount(Math.min(subtotal * 0.2, 250));
        break;

      case "WELCOME100":
        setCouponDiscount(100);
        break;

      case "FREEDELIVERY":
        setCouponDiscount(deliveryFee);
        break;

      default:
        setCouponDiscount(0);
    }

    toast.success(`${coupon.code} Applied`);
  };

  /* ==========================================
        CART ACTIONS
  ========================================== */

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            quantity: item.quantity + 1,
          }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    const item = cartItems.find((i) => i.id === id);

    if (!item) return;

    if (item.quantity === 1) {
      removeItem(id);
      return;
    }

    setCartItems((prev) =>
      prev.map((cartItem) =>
        cartItem.id === id
          ? {
            ...cartItem,
            quantity: cartItem.quantity - 1,
          }
          : cartItem
      )
    );
  };

  const removeItem = (id) => {
    const removedItem = cartItems.find(
      (item) => item.id === id
    );

    if (!removedItem) return;

    const remainingItems = cartItems.filter(
      (item) => item.id !== id
    );

    const restaurantStillExists = remainingItems.some(
      (item) =>
        item.restaurant === removedItem.restaurant
    );

    setCartItems(remainingItems);

    if (!restaurantStillExists) {
      toast.success(
        `${removedItem.restaurant} removed from cart`
      );
    } else {
      toast.success(`${removedItem.name} removed`);
    }
  };

  /* Remove Entire Restaurant */

  const removeRestaurant = (restaurant) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => item.restaurant !== restaurant
      )
    );

    toast.success(`${restaurant} removed`);
  };

  /* ==========================================
        ADD AI RECOMMENDATION
  ========================================== */

  const addAddon = (food) => {
    const existingItem = cartItems.find(
      (item) =>
        item.name === food.name &&
        item.restaurant === food.restaurant
    );

    if (existingItem) {
      increaseQuantity(existingItem.id);

      toast.success(`${food.name} quantity updated`);

      return;
    }

    setCartItems((prev) => [
      ...prev,
      {
        ...food,
        id: Date.now(),
        quantity: 1,
        reviewCount:
          food.reviewCount || "1k",
        verified:
          food.verified ?? true,
        tags: food.tags || [],
      },
    ]);

    toast.success(
      `${food.name} added from ${food.restaurant}`
    );
  };

  /* ==========================================
        PRICE CALCULATIONS
  ========================================== */

  const restaurants = useMemo(() => {
    return [...new Set(cartItems.map((i) => i.restaurant))];
  }, [cartItems]);

  const restaurantCount = restaurants.length;

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const deliveryFee = useMemo(() => {
    return subtotal >= 499 ? 0 : 49;
  }, [subtotal]);

  const tax = useMemo(() => {
    return Math.round(subtotal * 0.05);
  }, [subtotal]);

  const restaurantOffer = useMemo(() => {
    if (subtotal >= 2500) return 350;
    if (subtotal >= 1500) return 200;
    if (subtotal >= 1000) return 120;
    return 0;
  }, [subtotal]);

  const totalSavings = useMemo(() => {
    return (
      restaurantOffer +
      couponDiscount +
      coinDiscount
    );
  }, [
    restaurantOffer,
    couponDiscount,
    coinDiscount,
  ]);

  const total = useMemo(() => {
    return (
      subtotal +
      deliveryFee +
      tax -
      totalSavings
    );
  }, [
    subtotal,
    deliveryFee,
    tax,
    totalSavings,
  ]);

  const biteCoins = useMemo(() => {
    return Math.floor(total / 6);
  }, [total]);

  const totalItems = useMemo(() => {
    return cartItems.reduce(
      (count, item) =>
        count + item.quantity,
      0
    );
  }, [cartItems]);

  const averageDeliveryTime = useMemo(() => {
    if (!cartItems.length) return "0 mins";

    const times = cartItems.map((item) =>
      parseInt(item.delivery)
    );

    return `${Math.round(
      times.reduce((a, b) => a + b, 0) /
      times.length
    )} mins`;
  }, [cartItems]);

  /* ==========================================
        GROUP BY RESTAURANT
  ========================================== */

  const groupedCartItems = useMemo(() => {
    return cartItems.reduce((groups, item) => {
      if (!groups[item.restaurant]) {
        groups[item.restaurant] = [];
      }

      groups[item.restaurant].push(item);

      return groups;
    }, {});
  }, [cartItems]);

  const restaurantSummary = useMemo(() => {
    return Object.entries(groupedCartItems).map(
      ([restaurant, items]) => ({
        restaurant,

        itemCount: items.reduce(
          (count, item) =>
            count + item.quantity,
          0
        ),

        subtotal: items.reduce(
          (sum, item) =>
            sum +
            item.price * item.quantity,
          0
        ),

        delivery:
          items[0]?.delivery,

        rating:
          items[0]?.restaurantRating,

        distance:
          items[0]?.distance,
      })
    );
  }, [groupedCartItems]);

  /* ==========================================
        CHECKOUT
  ========================================== */

  const handleCheckout = () => {
    toast.success(
      `Proceeding to Payment • ₹${total}`
    );

    // setShowPaymentModal(true)
  };

  /* ==========================================
      JSX STARTS BELOW
      (Part 2 begins here)
  ========================================== */

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-violet-50 via-white to-violet-50 pb-28">

      {/* Background */}

      <div className="absolute left-1/2 top-0 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-violet-300/20 blur-[140px]" />
      <div className="absolute -left-32 top-32 h-72 w-72 rounded-full bg-violet-200/20 blur-[120px]" />
      <div className="absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-fuchsia-200/20 blur-[120px]" />

      <div className="relative mx-auto max-w-[1380px] px-5 py-6">

        {/* HEADER */}

        <div className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-center">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >

            <span className="rounded-full bg-violet-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-violet-700">
              BiteThat Checkout
            </span>

            <h1 className="mt-5 text-4xl font-extrabold text-gray-900">
              Review Your Order
            </h1>

            <p className="mt-3 max-w-xl text-gray-500">
              {restaurantCount} Restaurants • {totalItems} Items • ETA {averageDeliveryTime}
            </p>

          </motion.div>

          <CartProgress
            restaurants={restaurantCount}
            items={totalItems}
            total={total}
            eta={averageDeliveryTime}
          />

        </div>

        {/* PAGE */}

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_360px]">

          {/* LEFT */}

          <motion.section
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >

            {/* ORDER */}

            <section className="rounded-3xl border border-violet-100 bg-white p-6 shadow-xl">

              <div className="mb-8 flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold">
                    Your Cart
                  </h2>

                  <p className="mt-1 text-gray-500">
                    {restaurantCount} Restaurants • {totalItems} Items
                  </p>

                </div>

                <div className="rounded-full bg-violet-100 px-5 py-3 font-bold text-violet-700">
                  ₹{subtotal}
                </div>

              </div>

              <AnimatePresence>

                {cartItems.length ? (

                  Object.entries(groupedCartItems).map(
                    ([restaurant, items]) => (

                      <div
                        key={restaurant}
                        className="mb-10"
                      >

                        {/* Restaurant Header */}

                        <div className="mb-5 flex items-center justify-between rounded-3xl border border-violet-100 bg-gradient-to-r from-violet-50 to-fuchsia-50 p-5">

                          <div>

                            <h3 className="text-xl font-bold">

                              🍽 {restaurant}

                            </h3>

                            <p className="mt-1 text-sm text-gray-500">

                              {items.length} item{items.length > 1 && "s"}

                            </p>

                          </div>

                          <button
                            onClick={() =>
                              removeRestaurant(restaurant)
                            }
                            className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"
                          >
                            Remove
                          </button>

                        </div>

                        <div className="space-y-5">

                          {items.map((item) => (

                            <CartItem
                              key={item.id}
                              item={item}
                              onIncrease={() =>
                                increaseQuantity(item.id)
                              }
                              onDecrease={() =>
                                decreaseQuantity(item.id)
                              }
                              onRemove={() =>
                                removeItem(item.id)
                              }
                            />

                          ))}

                        </div>

                      </div>

                    )
                  )

                ) : (

                  <div className="rounded-3xl border border-dashed border-violet-200 py-20 text-center">

                    <h3 className="text-xl font-semibold">
                      Your cart is empty
                    </h3>

                    <p className="mt-3 text-gray-500">
                      Add delicious food to continue.
                    </p>

                  </div>

                )}

              </AnimatePresence>

            </section>

            <AIRecommendationCarousel
              items={recommendations}
              onAdd={addAddon}
            />

          </motion.section>

          {/* SIDEBAR */}

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-24 h-fit space-y-5"
          >

            <DeliveryCard
              eta={averageDeliveryTime}
            />

            <CouponCard
              appliedCoupon={appliedCoupon}
              onApplyCoupon={handleApplyCoupon}
            />

            <BiteCoinsCard
              availableCoins={320}
              onRedeem={setCoinDiscount}
            />

            <OrderSummary
              subtotal={subtotal}
              delivery={deliveryFee}
              tax={tax}
              restaurantOffer={restaurantOffer}
              couponDiscount={couponDiscount}
              coinDiscount={coinDiscount}
              total={total}
              biteCoins={biteCoins}
              onCheckout={handleCheckout}
            />

          </motion.aside>

        </div>

        <StickyCheckout
          total={total}
          eta={averageDeliveryTime}
          biteCoins={biteCoins}
          itemCount={totalItems}
          onCheckout={handleCheckout}
        />

      </div>

    </main>
  );
}

