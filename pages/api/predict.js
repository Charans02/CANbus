// /api/predict.js
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const features = req.body.features; // Example: [24.3, 55.2, 0.03, 1.12, 0.0]
  if (!features || !Array.isArray(features)) {
    return res.status(400).json({ error: 'Invalid features format' });
  }

  // Save features to temp JSON file
  const inputPath = path.join(process.cwd(), 'temp_input.json');
  fs.writeFileSync(inputPath, JSON.stringify({ features }));

  // Run Python script
  const python = spawn('python', ['predictor.py']);

  python.stderr.on('data', (data) => console.error(`stderr: ${data}`));

  let result = '';
  python.stdout.on('data', (data) => {
    result += data.toString();
  });

  python.on('close', (code) => {
    if (code !== 0) return res.status(500).json({ error: 'Prediction failed' });

    try {
      const output = JSON.parse(result);
      return res.status(200).json(output);
    } catch (e) {
      return res.status(500).json({ error: 'Invalid prediction output' });
    }
  });
}
