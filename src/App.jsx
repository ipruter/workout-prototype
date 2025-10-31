// src/App.jsx
import { Routes, Route, Link, Outlet } from "react-router-dom";
// pages
import Home from "./pages/Home.jsx";
import Heatmap from "./pages/HeatmapRegions.jsx";
import ThisWeeksWorkout from "./pages/ThisWeeksWorkout.jsx";
import TodaysWorkout from "./pages/TodaysWorkout.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import AuthCallback from "./pages/AuthCallback.jsx";


// auth guard
import RequireAuth from "./components/RequireAuth.jsx";

function AppLayout() {
  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 16px" }}>
      <h1>Workout Prototype</h1>
      <nav style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <Link to="/">Home</Link>
        <Link to="/heatmap">Custome Routine Builder</Link>
        <Link to="/week">This Week's Progress</Link>
        <Link to="/today">Generate Workout Session</Link>
        <Link to="/signin">Sign in</Link>
        <Link to="/signup">Sign up</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* public routes */}
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="auth/callback" element={<AuthCallback />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route index element={<Home />} />
          <Route path="heatmap" element={<Heatmap />} />
          <Route path="week" element={<ThisWeeksWorkout />} />
          <Route path="today" element={<TodaysWorkout />} />
        </Route>
      </Route>
    </Routes>
  );
}
