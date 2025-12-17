// src/DestinationPicker.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "./api";

const images = {
  Bali:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  Dubai:
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
  Paris:
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80"
};

export default function DestinationPicker() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(API + "/destinations");
        if (!res.ok) {
          throw new Error("HTTP " + res.status);
        }
        const data = await res.json();
        console.log("DESTINATIONS FROM API:", data);
        if (Array.isArray(data)) {
          setDestinations(data);
        } else {
          setDestinations([]);
          setError("Destinations response is not an array");
        }
      } catch (e) {
        console.error("Error loading destinations", e);
        setError("Failed to load destinations");
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <div className="navbar">
        <h1>✈️ TravelBuddy</h1>
      </div>

      <div className="page">
        <h2 className="section-title">Choose your destination 🌍</h2>
        <p style={{ marginBottom: 16 }}>
          Pick from curated packages with handpicked experiences.
        </p>

        {loading && <p>Loading destinations...</p>}
        {error && !loading && (
          <p style={{ color: "red", marginBottom: 12 }}>{error}</p>
        )}
        {!loading && !error && destinations.length === 0 && (
          <p>No destinations found in database.</p>
        )}

        <div className="dest-grid">
          {destinations.map(d => (
            <div className="dest-card" key={d.id}>
              <img src={images[d.name]} alt={d.name} />
              <div className="dest-body">
                <h3>{d.name}</h3>
                <div className="dest-meta">{d.country}</div>
                <div className="dest-price-days">
                  ₹ {d.price} • {d.days} days
                </div>
                <div className="dest-details">
                  {d.details || "Beautiful trip with guided experiences."}
                </div>
                <button onClick={() => nav(`/book?id=${d.id}`)}>
                  Book now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
