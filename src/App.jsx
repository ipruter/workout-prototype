import { useEffect, useState } from "react";
import { Routes, Route, Navigate, Outlet, Link } from "react-router-dom";
import { supabase } from "./lib/supabaseClient";

import HeatmapRegions from "./pages/HeatmapRegions.jsx";
import ThisWeeksWorkout from "./pages/ThisWeeksWorkout.jsx";
import TodaysWorkout from "./pages/TodaysWorkout.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";

// Example Home if you need one
function Home() { return <h2>Home</h2>; }

// --- auth guard ---
function RequireAuth({ children }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setReady(true);
    });
    const sub = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.data.subscription.unsubscribe();
  }, []);

  if (!ready) return <div style={{ padding: 20 }}>Loading…</div>;
  return user ? children : <Navigate to="/signin" replace />;
}

// --- layouts ---
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

function AuthLayout() {
  return (
    <div style={{ maxWidth: 420, margin: "60px auto", padding: "0 16px" }}>
      <Outlet />
    </div>
  );
}

// --- routes ---
export default function App() {
  return (
    <Routes>
      {/* public auth pages (NO NAV) */}
      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      {/* app pages (WITH NAV) */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/heatmap" element={<RequireAuth><HeatmapRegions /></RequireAuth>} />
        <Route path="/week" element={<RequireAuth><ThisWeeksWorkout /></RequireAuth>} />
        <Route path="/today" element={<RequireAuth><TodaysWorkout /></RequireAuth>} />
      </Route>

      {/* catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
