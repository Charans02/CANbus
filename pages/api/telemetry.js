let telemetryData = {
  rpm: 3000,
  speed: 60,
  engine_temp: 85,
};

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(telemetryData);
  } else if (req.method === "POST") {
    const { rpm, speed, engine_temp } = req.body;
    telemetryData = { rpm, speed, engine_temp };
    res.status(200).json({ status: "updated", telemetryData });
  } else {
    res.status(405).end();
  }
}
