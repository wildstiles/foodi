import { useEffect, useState } from "react";

export type Restaurant = {
  restaurant: string;
  category: string;
  visited: string;
  lat: string;
  lng: string;
};

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/16j3tmiohrmsk")
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data);
        setLoading(false);
      });
  }, []);

  return {
    restaurants,
    loading,
  };
}
