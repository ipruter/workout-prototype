import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";


export default function SignUp() {
const nav = useNavigate();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirm, setConfirm] = useState("");
const [loading, setLoading] = useState(false);
const [err, setErr] = useState("");
const [info, setInfo] = useState("");


useEffect(() => {
supabase.auth.getUser().then(({ data }) => {
if (data.user) nav("/", { replace: true });
});
}, [nav]);


async function onSubmit(e) {
e.preventDefault();
setErr("");
setInfo("");
if (password !== confirm) return setErr("Passwords do not match");


setLoading(true);
const { error } = await supabase.auth.signUp({ email, password });
setLoading(false);
if (error) return setErr(error.message);


// Depending on your Supabase Auth settings, the user may need to confirm email.
setInfo("Account created. Check your email to confirm, then sign in.");
}

return (
<div style={{ maxWidth: 420, margin: "60px auto", padding: "0 16px" }}>
<h2>Create account</h2>
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
minLength={6}
style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
/>
</label>
<label>
<div>Confirm password</div>
<input
type="password"
value={confirm}
onChange={(e) => setConfirm(e.target.value)}
required
minLength={6}
style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
/>
</label>
{err && <div style={{ color: "#b00", fontSize: 14 }}>{err}</div>}
{info && <div style={{ color: "#084", fontSize: 14 }}>{info}</div>}
<button disabled={loading} style={{ padding: "10px 14px", borderRadius: 10 }}>
{loading ? "Creating…" : "Create account"}
</button>
</form>
<div style={{ marginTop: 12, fontSize: 14 }}>
Already have an account? <Link to="/signin">Sign in</Link>
</div>
</div>
);
}