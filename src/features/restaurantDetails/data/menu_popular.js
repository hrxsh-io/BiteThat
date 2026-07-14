import pizzaImage from '../../../assets/foods/pizza.jpeg';
import burgerImage from '../../../assets/foods/burger.jpeg';
import starterImage from '../../../assets/foods/chicken-tandoor.jpeg';

const menu = [
  /* PIZZA */
{
  id: 1,
  name: "Margherita",
  description: "Delicious margherita prepared with fresh ingredients.",
  category: "Pizza",
  price: 299,
  rating: 4.6,
  reviews: 800,
  prepTime: "10-15 min",
  image: pizzaImage,
  ai: true,
  bestseller: true,
  popular: true,
},
{
  id: 2,
  name: "Farmhouse",
  description: "Delicious farmhouse prepared with fresh ingredients.",
  category: "Pizza",
  price: 319,
  rating: 4.7,
  reviews: 937,
  prepTime: "11-16 min",
  image: pizzaImage,
  ai: false,
  bestseller: false,
  popular: true,
},
{
  id: 3,
  name: "Veggie Supreme",
  description: "Delicious veggie supreme prepared with fresh ingredients.",
  category: "Pizza",
  price: 339,
  rating: 4.8,
  reviews: 1074,
  prepTime: "12-17 min",
  image: pizzaImage,
  ai: true,
  bestseller: true,
  popular: true,
},
{
  id: 4,
  name: "Paneer Tikka",
  description: "Delicious paneer tikka prepared with fresh ingredients.",
  category: "Pizza",
  price: 359,
  rating: 4.9,
  reviews: 1211,
  prepTime: "13-18 min",
  image: pizzaImage,
  ai: false,
  bestseller: true,
  popular: true,
},

];

export default menu;