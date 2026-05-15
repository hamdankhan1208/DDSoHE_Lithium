import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

interface SohRequest {
  voltage_V: number;
  current_A: number;
  temperature_C: number;
  capacity_mAh: number;
}

interface SohResponse {
  state_of_health_percent: number;
  battery_health: string;
  recommendation: string;
  warnings: string[];
}

interface LiveData {
  timestamp: number;
  voltage_V: number;
  current_A: number;
  capacity_mAh: number;
  temperature_C: number;
}

const PredictSOH: React.FC = () => {
  const [formData, setFormData] = useState<SohRequest>({
    voltage_V: 0,
    current_A: 0,
    temperature_C: 0,
    capacity_mAh: 0,
  });
  const [result, setResult] = useState<SohResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fields = [
    { name: "voltage_V", label: "Voltage (V)", step: "0.01" },
    { name: "current_A", label: "Current (A)", step: "0.01" },
    { name: "temperature_C", label: "Temperature (°C)", step: "0.1" },
    { name: "capacity_mAh", label: "Capacity (Ah)", step: "1" },
  ] as const;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const resp = await axios.post<SohResponse>(
        "http://127.0.0.1:8000/predict_soh",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      setResult(resp.data);
    } catch (err) {
      console.error("Prediction error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🆕 New function to fetch live data
  const handleUseLiveData = async () => {
    try {
      const resp = await fetch("http://127.0.0.1:8000/get_latest_live_data");
      const latestData = await resp.json();
      console.log("Fetched Live Data:", latestData);
  
      setFormData({
        voltage_V: parseFloat(latestData.voltage_V.toFixed(2)),
        current_A: parseFloat(latestData.current_A.toFixed(2)),
        temperature_C: parseFloat(latestData.temperature_C.toFixed(2)),
        capacity_mAh: parseFloat((latestData.capacity_mAh / 1000).toFixed(3)),
      });
    } catch (err) {
      console.error("Failed to fetch live data", err);
    }
  };
  

  return (
    <div className="p-8 flex justify-center">
      <div className="w-full max-w-[800px]">
        {/* Four fields in a row with staggered fade-in */}
        <div className="grid grid-cols-4 gap-6 mb-4">
          {fields.map(({ name, label, step }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="flex flex-col"
            >
              <label htmlFor={name} className="mb-1 font-medium text-gray-300">
                {label}
              </label>
              <input
                id={name}
                name={name}
                type="number"
                step={step}
                value={(formData as any)[name]}
                onChange={handleChange}
                placeholder={label}
                className="w-full border rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </motion.div>
          ))}
        </div>

        {/* 🆕 Button to use Live Data */}
        <button
          onClick={handleUseLiveData}
          className="w-full mb-4 px-6 py-3 bg-black border border-green-700 text-white rounded-lg hover:bg-green-700 transition rounded-3xl"
        >
          Use Live Data
        </button>

        {/* Predict Button */}
        <button
          onClick={handlePredict}
          className="w-full mb-6 px-6 py-3 bg-black border border-blue-900 text-white rounded-lg hover:bg-blue-700 transition rounded-3xl"
        >
          {loading ? "Predicting..." : "Predict SOH"}
        </button>

        {/* Result table */}
        {result && (
          <div className="overflow-x-auto">
            <table className="table-fixed w-full bg-white rounded-lg shadow-lg">
              <colgroup>
                <col className="w-1/2" />
                <col className="w-1/2" />
              </colgroup>
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="py-3 px-6 text-left">Metric</th>
                  <th className="py-3 px-6 text-left">Result</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                <tr className="border-b">
                  <td className="py-3 px-6 font-semibold">State of Health (%)</td>
                  <td className="py-3 px-6">{result.state_of_health_percent.toFixed(2)}%</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-6 font-semibold">Battery Health</td>
                  <td className="py-3 px-6">{result.battery_health}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-6 font-semibold">Recommendation</td>
                  <td className="py-3 px-6">{result.recommendation}</td>
                </tr>
                <tr>
                  <td className="py-3 px-6 font-semibold">Warnings</td>
                  <td className="py-3 px-6 break-words">
                    {result?.warnings?.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {result.warnings.map((w, idx) => (
                          <li key={idx}>{w}</li>
                        ))}
                      </ul>
                    ) : (
                      "None"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictSOH;
