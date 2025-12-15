import { useEffect, useState } from "react";
import { API } from "./api";

const images = {
  Bali: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  Dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
  Paris: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
};

export default function DestinationPicker() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetch(API + "/destinations")
      .then(res => res.json())
      .then(data => setDestinations(data));
  }, []);

  return (
    <>
      <div className="nav">
        <h2>🌎 Choose Your Destination</h2>
      </div>

      <div className="destinations">
        {destinations.map(d => (
          <div className="dest-card" key={d.id}>
            <img src={images[d.name]} alt={d.name} />
            <div>
              <h3>{d.name}</h3>
              <p>{d.country}</p>
              <p>₹ {d.price}</p>
              <a href={`/book?id=${d.id}`}>
                <button>Book Now</button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
