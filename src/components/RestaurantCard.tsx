import { Card, CardContent, Typography, Box, Button } from "@mui/material";

type Props = {
  restaurant: string;
  category: string;
  distance?: string;
};

export default function RestaurantCard({
  restaurant,
  category,
  distance,
}: Props) {
  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6">{restaurant}</Typography>

        <Typography color="text.secondary">{category}</Typography>

        {distance && (
          <Typography color="text.secondary">
            📍 {distance} miles away
          </Typography>
        )}

        <Box mt={2}>
          <Button variant="outlined" size="small">
            Directions
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
