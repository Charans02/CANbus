import { useState } from "react";

export default function Home() {
  const [rpm, setRpm] = useState(3000);
  const [speed, setSpeed] = useState(60);
  const [temp, setTemp] = useState(85);
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/telemetry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rpm, speed, engine_temp: temp }),
    });
    const data = await res.json();
    setStatus("Updated!");
    setTimeout(() => setStatus(""), 2000);
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>CAN Data Controller</h1>
      <label>RPM: </label>
      <input type="number" value={rpm} onChange={e => setRpm(Number(e.target.value))} />
      <br />
      <label>Speed: </label>
      <input type="number" value={speed} onChange={e => setSpeed(Number(e.target.value))} />
      <br />
      <label>Engine Temp: </label>
      <input type="number" value={temp} onChange={e => setTemp(Number(e.target.value))} />
      <br />
      <button onClick={handleSubmit}>Update Telemetry</button>
      <p>{status}</p>
    </main>
  );
}
