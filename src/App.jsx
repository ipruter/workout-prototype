import { Routes, Route, Link, Outlet } from "react-router-dom";

// import your actual page components
import Home from "./pages/Home.jsx";
import Heatmap from "./pages/HeatmapRegions.jsx";          // adjust name if different
import ThisWeeksWorkout from "./pages/ThisWeeksWorkout.jsx";
import TodaysWorkout from "./pages/TodaysWorkout.jsx";

// NOTE: make sure there is NO inline `function Home() { ... }` left in this file.

function AppLayout() {
  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 16px" }}>
      <h1>Workout Prototype</h1>
      <nav style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <Link to="/">Home</Link>
        <Link to="/heatmap">Heatmap</Link>
        <Link to="/week">This week’s workout</Link>
        <Link to="/today">Today’s workout</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="heatmap" element={<Heatmap />} />
        <Route path="week" element={<ThisWeeksWorkout />} />
        <Route path="today" element={<TodaysWorkout />} />
      </Route>
    </Routes>
  );
}
