import Hero from "../features/home/component/Hero";

import foods from "../data/food";

import CuisineSection from "../features/home/component/CuisineSection";
import FoodSection from "../features/home/component/FoodSection";
import FeaturedRestaurantSection from "../features/home/component/FeaturedRestaurantSection";
import OfferBanner from "../features/home/component/OfferBanner";
import WhyChooseBiteThat from "../features/home/component/WhyChooseBiteThat";
import Testimonials from "../features/home/component/Testimonials";

const Home = () => {
  return (
    <>
      {/* ================= HERO ================= */}
      <Hero />

      {/* ================= BROWSE BY CUISINES ================= */}
      <CuisineSection />

      {/* ================= POPULAR THIS WEEK ================= */}
      <FoodSection foods={foods} />

      {/* ================= FEATURED RESTAURANTS ================= */}
      <FeaturedRestaurantSection />

      {/* ================= OFFER BANNER ================= */}
      <OfferBanner />

      {/* ================= WHY CHOOSE BITETHAT ================= */}
      <WhyChooseBiteThat />

      {/* ================= CUSTOMER REVIEWS ================= */}
      <Testimonials />
    </>
  );
};

export default Home;