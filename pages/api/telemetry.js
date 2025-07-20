let telemetryData = {
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
};

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(telemetryData);
  } else if (req.method === "POST") {
    const {
      speed_kmph,
      rpm,
      engine_temp_c,
      throttle_,
      brake_status,
      steering_angle_deg,
      battery_voltage_v,
      fuel_rate_lph,
      gear_position,
      ambient_temp_c,
    } = req.body;

    telemetryData = {
      speed_kmph,
      rpm,
      engine_temp_c,
      throttle_,
      brake_status,
      steering_angle_deg,
      battery_voltage_v,
      fuel_rate_lph,
      gear_position,
      ambient_temp_c,
    };

    res.status(200).json({ status: "updated", telemetryData });
  } else {
    res.status(405).end();
  }
}
