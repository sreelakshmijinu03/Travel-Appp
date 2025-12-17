import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();
  const username = localStorage.getItem("username") || "Traveler";
  const isAdmin = localStorage.getItem("is_admin") === "1";

  const logout = () => {
    localStorage.clear();
    nav("/");
  };

  return (
    <>
      <div className="navbar">
        <h1>✈️ TravelBuddy</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: 14 }}>Hi, {username}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <div
        style={{
          padding: "32px 24px 12px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
          gap: "24px",
          alignItems: "center"
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 12px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.7)",
              fontSize: 13,
              marginBottom: 10
            }}
          >
            <span>🔥</span>
            <span>Winter sale – up to 30% off trips</span>
          </div>
          <h2
            style={{
              fontSize: 32,
              lineHeight: 1.2,
              marginBottom: 10,
              color: "#222"
            }}
          >
            Find your next <span style={{ color: "#ff6b35" }}>escape</span> in
            just a few clicks.
          </h2>
          <p style={{ fontSize: 15, color: "#444", marginBottom: 18 }}>
            Browse handpicked destinations, choose your travel dates, and book a
            complete trip in minutes. Perfect for quick weekend getaways or
            long holidays.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              className="btn-primary"
              onClick={() => nav("/pick")}
              style={{ padding: "10px 22px" }}
            >
              Explore destinations
            </button>
            {isAdmin && (
              <button
                onClick={() => nav("/admin")}
                style={{
                  padding: "10px 22px",
                  borderRadius: 999,
                  border: "1px solid #ff6b35",
                  background: "#fff",
                  color: "#ff6b35",
                  cursor: "pointer"
                }}
              >
                Admin: View bookings
              </button>
            )}
          </div>
        </div>

        <div
          style={{
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: "0 16px 40px rgba(0,0,0,0.2)",
            minHeight: 220,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1526779259212-939e64788e3c?auto=format&fit=crop&w=1000&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative"
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.5), rgba(255,107,53,0.4))"
            }}
          />
        </div>
      </div>
    </>
  );
}
