import { useEffect, useState } from "react";
import FoodiMap from "./components/FoodiMap";
import { getDistanceMiles } from "./utils/distance";

type Restaurant = {
  restaurant: string;
  category: string;
  visited: string;
  lat: string;
  lng: string;
  tags?: string;
};

export default function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "visited" | "want" | "favorites"
  >("all");

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortByDistance, setSortByDistance] = useState(false);

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [pickedRestaurant, setPickedRestaurant] = useState<Restaurant | null>(
    null
  );

  // Load data
  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/16j3tmiohrmsk")
      .then((res) => res.json())
      .then((data) => setRestaurants(data));
  }, []);

  // Favorites persistence
  useEffect(() => {
    const saved = localStorage.getItem("foodi-favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("foodi-favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  const toggleFavorite = (name: string) => {
    setFavorites((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  // Smart base filtering
  const baseFiltered = restaurants.filter((r) => {
    const matchesSearch = r.restaurant
      .toLowerCase()
      .includes(search.toLowerCase());

    const isVisited = r.visited?.toLowerCase() === "yes";
    const isFavorite = favorites.includes(r.restaurant);

    const matchesFilter =
      filter === "all"
        ? true
        : filter === "visited"
        ? isVisited
        : filter === "want"
        ? !isVisited
        : filter === "favorites"
        ? isFavorite
        : true;

    const matchesTag = !selectedTag
      ? true
      : (r.tags || "").toLowerCase().includes(selectedTag.toLowerCase());

    return matchesSearch && matchesFilter && matchesTag;
  });

  // Distance helper
  const getDistance = (r: Restaurant) => {
    if (!userLocation) return Infinity;
    return getDistanceMiles(
      userLocation.lat,
      userLocation.lng,
      Number(r.lat),
      Number(r.lng)
    );
  };

  const sorted = [...baseFiltered];

  if (sortByDistance && userLocation) {
    sorted.sort((a, b) => getDistance(a) - getDistance(b));
  }

  // 🎯 SMART PICKER
  const pickSmart = (mode: string) => {
    let pool = [...baseFiltered];

    if (pool.length === 0) return;

    switch (mode) {
      case "closest-unvisited":
        pool = pool.filter((r) => r.visited?.toLowerCase() !== "yes");
        pool.sort((a, b) => getDistance(a) - getDistance(b));
        break;

      case "favorites-nearby":
        pool = pool.filter((r) => favorites.includes(r.restaurant));
        pool.sort((a, b) => getDistance(a) - getDistance(b));
        break;

      case "random":
      default:
        break;
    }

    const choice = pool[Math.floor(Math.random() * pool.length)];

    setPickedRestaurant(choice);
  };

  // Tags
  const allTags = Array.from(
    new Set(
      restaurants.flatMap((r) =>
        (r.tags || "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      )
    )
  );

  return (
    <div
      style={{
        padding: 16,
        maxWidth: 520,
        margin: "0 auto",
        fontFamily: "system-ui",
      }}
    >
      <h1>Foodi 🍔</h1>

      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: 10 }}
      />

      {/* FILTERS */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("visited")}>Visited</button>
        <button onClick={() => setFilter("want")}>Want</button>
        <button onClick={() => setFilter("favorites")}>⭐ Favorites</button>

        <button onClick={() => setSortByDistance(!sortByDistance)}>
          {sortByDistance ? "Default" : "Closest"}
        </button>
      </div>

      {/* SMART PICKERS */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
        <button onClick={() => pickSmart("random")}>🎲 Random</button>

        <button onClick={() => pickSmart("closest-unvisited")}>
          📍 Closest New
        </button>

        <button onClick={() => pickSmart("favorites-nearby")}>
          ⭐ Favorites Nearby
        </button>
      </div>

      {/* TAGS */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            style={{
              padding: "4px 10px",
              borderRadius: 999,
              border: "1px solid #ddd",
              background: selectedTag === tag ? "#2563eb" : "white",
              color: selectedTag === tag ? "white" : "black",
              fontSize: 12,
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* RESULT */}
      {pickedRestaurant && (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            border: "2px solid #2563eb",
            borderRadius: 10,
            background: "#f8fafc",
          }}
        >
          <strong>🎯 Recommendation</strong>
          <p>{pickedRestaurant.restaurant}</p>
        </div>
      )}

      {/* MAP */}
      <FoodiMap restaurants={sorted} />

      {/* LIST */}
      {sorted.map((r, i) => {
        const isFav = favorites.includes(r.restaurant);

        const distance = userLocation
          ? getDistanceMiles(
              userLocation.lat,
              userLocation.lng,
              Number(r.lat),
              Number(r.lng)
            ).toFixed(1)
          : null;

        return (
          <div
            key={i}
            style={{
              padding: 12,
              marginBottom: 10,
              border: "1px solid #eee",
              borderRadius: 10,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>{r.restaurant}</strong>

              <button onClick={() => toggleFavorite(r.restaurant)}>
                {isFav ? "⭐" : "☆"}
              </button>
            </div>

            <p>{r.category}</p>
            <small>{r.visited}</small>

            {distance && <p>📍 {distance} mi</p>}

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lng}`}
              target="_blank"
            >
              🚗 Directions
            </a>
          </div>
        );
      })}
    </div>
  );
}
