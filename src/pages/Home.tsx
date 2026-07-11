import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Button,
  Chip,
} from "@mui/material";

import RestaurantCard from "../components/RestaurantCard";
import { useRestaurants } from "../hooks/useRestaurants";
import { useLocation } from "../hooks/useLocation";
import { getDistanceMiles } from "../utils/distance";
import { pickRestaurant } from "../utils/pickRestaurant";

export default function Home() {
  const { restaurants, loading } = useRestaurants();
  const location = useLocation();

  const [picked, setPicked] = useState<any>(null);

  const nearbyRestaurants = location
    ? restaurants
        .map((r) => {
          const distance =
            r.lat && r.lng
              ? getDistanceMiles(
                  location.lat,
                  location.lng,
                  Number(r.lat),
                  Number(r.lng),
                )
              : 999;

          return {
            ...r,
            distance,
          };
        })
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5)
    : [];

  return (
    <Box p={2}>
      <Typography variant="h4" fontWeight="bold">
        🍔 Foodi
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Good Evening 👋
      </Typography>

      <TextField fullWidth placeholder="Search restaurants..." sx={{ mb: 3 }} />

      {/* Pick For Me Card */}
      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Typography variant="h6">🎲 Can't decide?</Typography>

          <Typography color="text.secondary">
            Let Foodi choose somewhere for you.
          </Typography>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => {
              const result = pickRestaurant(restaurants, location);
              setPicked(result);
            }}
          >
            Pick For Me
          </Button>
        </CardContent>
      </Card>

      {/* Recommendation */}
      {picked && (
        <Card
          sx={{
            mb: 3,
            borderRadius: 3,
            bgcolor: "#FFF8E1",
          }}
        >
          <CardContent>
            <Typography variant="h6">🎉 Foodi picked:</Typography>

            <Typography variant="h5" fontWeight="bold">
              {picked.restaurant}
            </Typography>

            <Typography color="text.secondary">{picked.category}</Typography>
          </CardContent>
        </Card>
      )}

      {/* Nearby */}
      <Typography variant="h5" mb={2}>
        📍 Nearby
      </Typography>

      {loading ? (
        <Typography>Loading restaurants...</Typography>
      ) : (
        nearbyRestaurants.map((r) => (
          <RestaurantCard
            key={r.restaurant}
            restaurant={r.restaurant}
            category={r.category}
            distance={r.distance.toFixed(1)}
          />
        ))
      )}

      {/* Categories */}
      <Typography variant="h5" mt={4} mb={2}>
        🏷 Categories
      </Typography>

      <Box display="flex" gap={1} flexWrap="wrap">
        <Chip label="🍕 Pizza" />
        <Chip label="🍔 Burgers" />
        <Chip label="☕ Coffee" />
        <Chip label="🍣 Sushi" />
        <Chip label="🥩 Steak" />
        <Chip label="🌮 Mexican" />
        <Chip label="🍜 Asian" />
        <Chip label="🥞 Breakfast" />
      </Box>
    </Box>
  );
}
