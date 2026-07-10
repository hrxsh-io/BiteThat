export const orderStats = [
  {
    id: 1,
    title: "Total Orders",
    value: "58",
    icon: "Package",
    color: "violet",
  },
  {
    id: 2,
    title: "Money Saved",
    value: "₹2,460",
    icon: "BadgePercent",
    color: "emerald",
  },
  {
    id: 3,
    title: "Favorite Restaurant",
    value: "Domino's",
    icon: "Heart",
    color: "rose",
  },
  {
    id: 4,
    title: "BiteCoins",
    value: "860",
    icon: "Coins",
    color: "amber",
  },
];

export const achievements = [
  {
    id: 1,
    title: "Pizza Lover",
    icon: "🍕",
    description: "Ordered pizza 10+ times",
  },
  {
    id: 2,
    title: "Food Explorer",
    icon: "🌎",
    description: "Tried 15 restaurants",
  },
  {
    id: 3,
    title: "Weekend Foodie",
    icon: "🔥",
    description: "Ordered every weekend",
  },
];

export const orders = [
  {
    id: "BT102458",

    restaurant: "Domino's Pizza",

    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200",

    status: "outForDelivery",

    paymentStatus: "paid",

    placedAt: "Today • 7:30 PM",

    eta: "14 mins",

    progress: 76,

    total: 649,

    rider: {
      name: "Rahul Kumar",
      phone: "+91 9876543210",
      rating: 4.9,
      vehicle: "MH12 AB 4567",
      avatar: "https://i.pravatar.cc/150?img=12",
    },

    timeline: [
      {
        title: "Order Confirmed",
        completed: true,
      },
      {
        title: "Preparing Food",
        completed: true,
      },
      {
        title: "Picked Up",
        completed: true,
      },
      {
        title: "Out For Delivery",
        completed: true,
      },
      {
        title: "Delivered",
        completed: false,
      },
    ],

    items: [
      {
        name: "Pepperoni Feast",
        quantity: 1,
      },
      {
        name: "Garlic Bread",
        quantity: 2,
      },
      {
        name: "Coke",
        quantity: 1,
      },
    ],
  },

  {
    id: "BT102431",

    restaurant: "Burger King",

    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200",

    status: "delivered",

    paymentStatus: "paid",

    placedAt: "Yesterday",

    total: 499,

    rating: 5,

    items: [
      {
        name: "Whopper",
        quantity: 1,
      },
      {
        name: "French Fries",
        quantity: 1,
      },
      {
        name: "Coke",
        quantity: 1,
      },
    ],
  },

  {
    id: "BT102390",

    restaurant: "KFC",

    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=1200",

    status: "delivered",

    paymentStatus: "paid",

    placedAt: "3 days ago",

    total: 799,

    rating: 4,

    items: [
      {
        name: "Chicken Bucket",
        quantity: 1,
      },
      {
        name: "Popcorn Chicken",
        quantity: 1,
      },
    ],
  },

  {
    id: "BT102351",

    restaurant: "Subway",

    image:
      "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=1200",

    status: "cancelled",

    paymentStatus: "refunded",

    refundStatus: "Completed",

    placedAt: "Last Week",

    total: 379,

    items: [
      {
        name: "Veggie Delight",
        quantity: 1,
      },
    ],
  },
];

export const orderStatus = {
  pending: "pending",
  confirmed: "confirmed",
  preparing: "preparing",
  pickedUp: "pickedUp",
  outForDelivery: "outForDelivery",
  delivered: "delivered",
  cancelled: "cancelled",
};