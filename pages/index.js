import { useState } from "react";

export default function Home() {
  const [data, setData] = useState({
    speed_kmph: 60,
    rpm: 3000,
    engine_temp_c: 90,
    throttle_: 40,
    brake_status: 0,
    steering_angle_deg: 10,
    battery_voltage_v: 13.5,
    fuel_rate_lph: 6,
    gear_position: 3,
    ambient_temp_c: 30,
  });

  const [status, setStatus] = useState("");

  const handleChange = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/telemetry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setStatus("Updated!");
    setTimeout(() => setStatus(""), 2000);
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>CAN Telemetry Controller</h1>
      {Object.entries(data).map(([key, val]) => (
        <div key={key} style={{ margin: "0.5rem 0" }}>
          <label style={{ textTransform: "capitalize" }}>{key.replace(/_/g, " ").replace("throttle_", "throttle (%)")}: </label>
          <input
            type="number"
            value={val}
            onChange={e => handleChange(key, Number(e.target.value))}
          />
        </div>
      ))}
      <button onClick={handleSubmit} style={{ marginTop: "1rem" }}>Update Telemetry</button>
      <p>{status}</p>
    </main>
  );
}
