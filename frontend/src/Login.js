import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "./api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = async () => {
    const res = await fetch(API + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.success) {
      // ✅ CORRECTED: read from data.user
      localStorage.setItem("uid", data.user.id);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem(
        "is_admin",
        data.user.is_admin ? "1" : "0"
      );

      // redirect
      if (data.user.is_admin) {
        nav("/admin");
      } else {
        nav("/home");
      }
    } else {
      alert(data.msg || "Invalid login");
    }
  };

  return (
    <>
      <div className="navbar">
        <h1>✈️ TravelBuddy</h1>
      </div>

      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-image">
            <div className="auth-image-overlay" />
            <div className="auth-image-content">
              <div>
                <div className="auth-badge">
                  <span>🌍</span> <span>Plan your next escape</span>
                </div>
                <h2>Discover beautiful destinations</h2>
                <p>
                  Log in to book trips, track your plans, and explore curated
                  experiences around the world.
                </p>
              </div>
              <p style={{ fontSize: 13, opacity: 0.8 }}>
                Trusted by travelers worldwide for simple &amp; fast bookings.
              </p>
            </div>
          </div>

          <div className="auth-form">
            <h3>Welcome back 👋</h3>
            <p>Sign in to continue your travel journey.</p>

            <div className="input">
              <label>Username</label>
              <input
                placeholder="Enter username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>

            <div className="input">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <button className="btn-primary" onClick={login}>
              Login
            </button>

            <div className="auth-footer">
              New here? <a href="/signup">Create an account</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
