import { Link, Routes, Route } from "react-router-dom";
import HeatmapRegions from "./pages/HeatmapRegions.jsx";

function Home() { return <h2>Home</h2>; }

export default function App() {
  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 16px" }}>
      <h1>Workout Prototype</h1>
      <nav style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <Link to="/">Home</Link>
        <Link to="/heatmap">Heatmap</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/heatmap" element={<HeatmapRegions />} />
      </Routes>
    </div>
  );
}
