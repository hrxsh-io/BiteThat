import api from "./axios";

export const getRestaurants = () => {
  return api.get("/restaurants");
};

export const getRestaurantById = (id) => {
  return api.get(`/restaurants/${id}`);
};