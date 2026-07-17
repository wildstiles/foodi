import { useState } from "react";
import RestaurantCard from "../components/restaurant/RestaurantCard";
import RecommendationCard from "../components/RecommendationCard";
import { useRestaurants } from "../hooks/useRestaurants";
import PreferencePanel from "../components/preferences/PreferencePanel";
import { usePreferences } from "../hooks/usePreferences";

export default function Home() {
  const { restaurants, loading } = useRestaurants();

  const { preferences, setPreferences } = usePreferences();

  const [search, setSearch] = useState("");

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.restaurant.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="page-container">
        <h2>Loading restaurants...</h2>
      </div>
    );
  }

  return (
    <div className="page-container">
      <section className="home-header">
        <h1>Welcome back 🍔</h1>
        <p>Find your next favorite place to eat.</p>
      </section>

      <PreferencePanel
        preferences={preferences}
        setPreferences={setPreferences}
      />

      <RecommendationCard restaurants={restaurants} />

      <input
        className="foodi-search"
        placeholder="Search restaurants..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <section>
        <h2 className="section-title">Restaurants</h2>

        {filteredRestaurants.length === 0 ? (
          <p>No restaurants found.</p>
        ) : (
          filteredRestaurants.map((restaurant, index) => (
            <RestaurantCard
              key={restaurant.restaurant || index}
              restaurant={restaurant}
            />
          ))
        )}
      </section>
    </div>
  );
}
