export default function Home() {
  return (
    <>
      <div className="nav">
        <h2>✈️ Welcome to Travel App</h2>
      </div>
      <div className="container">
        <div className="card">
          <p>Plan your dream vacation easily!</p>
          <a href="/pick">
            <button>Explore Destinations</button>
          </a>
        </div>
      </div>
    </>
  );
}
