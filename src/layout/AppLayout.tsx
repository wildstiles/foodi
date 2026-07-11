import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Box,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import CasinoIcon from "@mui/icons-material/Casino";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const getValue = () => {
    if (location.pathname.includes("explore")) return 1;
    if (location.pathname.includes("decide")) return 2;
    if (location.pathname.includes("saved")) return 3;
    if (location.pathname.includes("profile")) return 4;

    return 0;
  };

  return (
    <Box sx={{ pb: 7 }}>
      <Outlet />

      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
        elevation={8}
      >
        <BottomNavigation
          value={getValue()}
          onChange={(event, newValue) => {
            const routes = ["/", "/explore", "/decide", "/saved", "/profile"];

            navigate(routes[newValue]);
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />

          <BottomNavigationAction label="Explore" icon={<MapIcon />} />

          <BottomNavigationAction label="Decide" icon={<CasinoIcon />} />

          <BottomNavigationAction label="Saved" icon={<FavoriteIcon />} />

          <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
