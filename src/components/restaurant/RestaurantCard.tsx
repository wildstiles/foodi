import "./RestaurantCard.css";
import type { Restaurant } from "../../types/restaurant";

type Props = {
  restaurant: Restaurant;
};

export default function RestaurantCard({ restaurant }: Props) {
  const openDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${restaurant.lat},${restaurant.lng}`,
      "_blank",
    );
  };

  return (
    <div className="restaurant-card">
      <div className="restaurant-card-header">
        <h3>{restaurant.restaurant}</h3>

        {restaurant.visited?.toLowerCase() === "yes" && (
          <span className="visited-badge">Visited</span>
        )}
      </div>

      <p className="restaurant-category">{restaurant.category}</p>

      <div className="restaurant-actions">
        <button className="foodi-button" onClick={openDirections}>
          🚗 Directions
        </button>
      </div>
    </div>
  );
}
