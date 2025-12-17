import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "./api";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const signup = async () => {
    const res = await fetch(API + "/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success) {
      alert("Account created. Please login.");
      nav("/");
    } else {
      alert(data.msg || "Signup failed");
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
                  <span>🧳</span> <span>Start your journey today</span>
                </div>
                <h2>Join thousands of happy travelers</h2>
                <p>
                  Create a free account to save trips, track bookings, and get
                  personalized destination ideas.
                </p>
              </div>
              <p style={{ fontSize: 13, opacity: 0.8 }}>
                Fast signup, secure accounts, no hassle.
              </p>
            </div>
          </div>

          <div className="auth-form">
            <h3>Create your account ✨</h3>
            <p>It only takes a few seconds.</p>

            <div className="input">
              <label>Username</label>
              <input
                placeholder="Choose a username"
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="input">
              <label>Password</label>
              <input
                type="password"
                placeholder="Create a password"
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <button className="btn-primary" onClick={signup}>
              Sign Up
            </button>

            <div className="auth-footer">
              Already have an account?{" "}
              <a href="/">Login</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
