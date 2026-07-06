import burger from "../assets/foods/burger.jpeg";
import pizza from "../assets/foods/pizza.jpeg";
import butterChicken from "../assets/foods/butter-chicken.jpeg";
import tandooriChicken from "../assets/foods/chicken-tandoor.jpeg";

const foods = [
  {
    id: 1,
    name: "Classic Cheese Burger",
    category: "BURGERS",
    rating: 4.8,
    deliveryTime: "20-30 min",
    image: burger,
  },

  {
    id: 2,
    name: "Margherita Pizza",
    category: "PIZZA",
    rating: 4.7,
    deliveryTime: "20-30 min",
    image: pizza,
  },

  {
    id: 3,
    name: "Butter Chicken",
    category: "INDIAN",
    rating: 4.9,
    deliveryTime: "25-35 min",
    image: butterChicken,
  },

  {
    id: 4,
    name: "Chicken Tandoor",
    category: "INDIAN",
    rating: 4.8,
    deliveryTime: "25-35 min",
    image: tandooriChicken,
  },

  {
    id: 5,
    name: "Masala Bhindi",
    category: "INDIAN",
    rating: 4.6,
    deliveryTime: "15-25 min",
    image: burger, // burger image
  },

  {
    id: 6,
    name: "Paneer Tikka",
    category: "INDIAN",
    rating: 4.8,
    deliveryTime: "20-30 min",
    image: burger, // burger image
  },

  {
    id: 7,
    name: "Chicken Biryani",
    category: "INDIAN",
    rating: 4.9,
    deliveryTime: "30-40 min",
    image: burger,
  },

  {
    id: 8,
    name: "Veg Hakka Noodles",
    category: "CHINESE",
    rating: 4.5,
    deliveryTime: "20-30 min",
    image: burger,
  },

  {
    id: 9,
    name: "Chole Bhature",
    category: "INDIAN",
    rating: 4.7,
    deliveryTime: "20-30 min",
    image: burger,
  },

  {
    id: 10,
    name: "Masala Dosa",
    category: "SOUTH INDIAN",
    rating: 4.8,
    deliveryTime: "15-20 min",
    image: burger,
  },

  {
    id: 11,
    name: "Sushi Roll",
    category: "JAPANESE",
    rating: 4.7,
    deliveryTime: "25-35 min",
    image: burger,
  },

  {
    id: 12,
    name: "Chocolate Brownie",
    category: "DESSERT",
    rating: 4.9,
    deliveryTime: "15-20 min",
    image: burger,
  },
];

export default foods;