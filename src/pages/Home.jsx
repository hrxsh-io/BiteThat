import Hero from "../features/home/component/Hero";
import restaurants from "../data/restaurants";
import foods from "../data/food";

import CuisineSection from "../features/home/component/CuisineSection";
import FoodSection from "../features/home/component/FoodSection";
import RestaurantSection from "../features/home/component/RestaurantSection";
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

      <FoodSection foods={foods}/>

      {/* ================= FEATURED RESTAURANTS ================= */}

      <RestaurantSection />
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