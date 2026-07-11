import { Box, Typography, Card, CardContent, Button } from "@mui/material";

export default function Home() {
  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        🍔 Foodi
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Good Evening 👋
      </Typography>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">🎲 Can't decide?</Typography>

          <Typography color="text.secondary">
            Let Foodi pick a restaurant for you.
          </Typography>

          <Button variant="contained" fullWidth sx={{ mt: 2 }}>
            Pick For Me
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">📍 Nearby Restaurants</Typography>

          <Typography color="text.secondary">
            Your closest restaurants will appear here.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
