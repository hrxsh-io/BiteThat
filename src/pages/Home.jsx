import Hero from "../features/home/component/Hero";
import RestaurantCard from "../components/common/RestaurantCard";
import restaurants from "../data/restaurants";

const Home = () => {
  return (
    <>
      <Hero />

      {/* Restaurants Section */}

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">

        <div className="mb-10">

          <h2 className="text-4xl font-bold">
            Featured Restaurants
          </h2>

          <p className="text-gray-500 mt-2">
            Discover the best restaurants near you.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
            />
          ))}

        </div>

      </section>

      <section
        id="offers"
        className="py-28 bg-gradient-to-b from-white to-violet-50"
      >
        {/* Offers will go here */}
      </section>

    </>
  );
};

export default Home;