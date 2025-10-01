import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";


export default function SignIn() {
const nav = useNavigate();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [err, setErr] = useState("");


useEffect(() => {
// If already signed in, bounce to home (or wherever you want)
supabase.auth.getUser().then(({ data }) => {
if (data.user) nav("/", { replace: true });
});
}, [nav]);


async function onSubmit(e) {
e.preventDefault();
setErr("");
setLoading(true);
const { error } = await supabase.auth.signInWithPassword({ email, password });
setLoading(false);
if (error) return setErr(error.message);
nav("/", { replace: true });
}


return (
<div style={{ maxWidth: 420, margin: "60px auto", padding: "0 16px" }}>
<h2>Sign in</h2>
<form onSubmit={onSubmit} style={{ display: "grid", gap: 12, marginTop: 16 }}>
<label>
<div>Email</div>
<input
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
/>
</label>
<label>
<div>Password</div>
<input
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
/>
</label>
{err && <div style={{ color: "#b00", fontSize: 14 }}>{err}</div>}
<button disabled={loading} style={{ padding: "10px 14px", borderRadius: 10 }}>
{loading ? "Signing in…" : "Sign in"}
</button>
</form>
<div style={{ marginTop: 12, fontSize: 14 }}>
Don’t have an account? <Link to="/signup">Create one</Link>
</div>
</div>
);
}