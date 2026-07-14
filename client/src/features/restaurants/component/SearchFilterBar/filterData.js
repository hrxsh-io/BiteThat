
import {
  UtensilsCrossed,
  Star,
  Clock3,
  IndianRupee,
} from "lucide-react";

export const dropdowns = [
  {
    key: "cuisine",
    title: "Cuisine",
    icon: UtensilsCrossed,
    options: [
      "Pizza",
      "Burger",
      "Chinese",
      "Italian",
      "North Indian",
      "South Indian",
      "Cafe",
      "Desserts",
    ],
  },
  {
    key: "rating",
    title: "Rating",
    icon: Star,
    options: ["4.5+","4.0+","3.5+","3.0+"],
  },
  {
    key: "delivery",
    title: "Delivery",
    icon: Clock3,
    options: [
      "Under 20 min",
      "Under 30 min",
      "Under 45 min",
      "Under 60 min",
    ],
  },
  {
    key: "price",
    title: "Price",
    icon: IndianRupee,
    options: [
      "₹100-200",
      "₹200-300",
      "₹300-400",
      "₹400+",
    ],
  },
];

export const sortOptions = [
  "Recommended",
  "Highest Rated",
  "Fastest Delivery",
  "Price: Low → High",
  "Price: High → Low",
];
