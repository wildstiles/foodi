import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./layout/AppLayout";

import Home from "./pages/Home";
import Map from "./pages/Map";
import Favorites from "./pages/Favorites";
import Decide from "./pages/Decide";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/explore" element={<Map />} />

          <Route path="/decide" element={<Decide />} />

          <Route path="/saved" element={<Favorites />} />

          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
