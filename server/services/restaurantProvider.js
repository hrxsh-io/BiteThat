const GOOGLE_PLACES_URL =
  "https://places.googleapis.com/v1/places:searchNearby";

const GOOGLE_TEXT_SEARCH_URL =
  "https://places.googleapis.com/v1/places:searchText";

const FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.location",
  "places.rating",
  "places.userRatingCount",
  "places.photos",
  "places.primaryType",
  "places.types",
  "places.currentOpeningHours",
  "places.websiteUri",
  "places.googleMapsUri",
].join(",");

// ==========================================
// Helper
// ==========================================

const googleRequest = async (url, body) => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    throw new Error("GOOGLE_PLACES_API_KEY is missing");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": FIELD_MASK,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Google Places API error:", data);

    throw new Error(
      data?.error?.message || "Google Places request failed"
    );
  }

  return data;
};

// ==========================================
// Normalize Google place
// ==========================================

const normalizePlace = (place) => {
  return {
    id: place.id,

    name: place.displayName?.text || "Unnamed Restaurant",

    address: place.formattedAddress || "",

    location: {
      latitude: place.location?.latitude ?? null,
      longitude: place.location?.longitude ?? null,
    },

    rating: place.rating ?? null,

    reviewCount: place.userRatingCount ?? 0,

    primaryType: place.primaryType || "",

    types: place.types || [],

    openingHours: place.currentOpeningHours || null,

    website: place.websiteUri || "",

    googleMapsUrl: place.googleMapsUri || "",

    photos:
      place.photos?.map((photo) => ({
        name: photo.name,
        widthPx: photo.widthPx,
        heightPx: photo.heightPx,
      })) || [],
  };
};

// ==========================================
// Nearby Restaurants
// ==========================================

const getNearbyRestaurants = async ({
  latitude,
  longitude,
  radius = 5000,
  maxResultCount = 20,
  rankPreference = "POPULARITY",
}) => {
  const body = {
    includedTypes: ["restaurant"],

    maxResultCount: Math.min(Number(maxResultCount), 20),

    rankPreference,

    locationRestriction: {
      circle: {
        center: {
          latitude: Number(latitude),
          longitude: Number(longitude),
        },
        radius: Number(radius),
      },
    },
  };

  const data = await googleRequest(GOOGLE_PLACES_URL, body);

  return (data.places || []).map(normalizePlace);
};

// ==========================================
// Search Restaurants
// ==========================================

const searchRestaurants = async ({
  query,
  latitude,
  longitude,
  maxResultCount = 20,
}) => {
  const body = {
    textQuery: query,

    includedType: "restaurant",

    pageSize: Math.min(Number(maxResultCount), 20),
  };

  // Add location bias when coordinates are available
  if (latitude !== undefined && longitude !== undefined) {
    body.locationBias = {
      circle: {
        center: {
          latitude: Number(latitude),
          longitude: Number(longitude),
        },
        radius: 10000,
      },
    };
  }

  const data = await googleRequest(
    GOOGLE_TEXT_SEARCH_URL,
    body
  );

  return (data.places || []).map(normalizePlace);
};

module.exports = {
  getNearbyRestaurants,
  searchRestaurants,
};