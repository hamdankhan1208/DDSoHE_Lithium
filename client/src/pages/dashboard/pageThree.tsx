import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const PageThreeSection: React.FC = () => {
  const [formData, setFormData] = useState({
    future_datetime: "",
    current_datetime: "",
    proj_voltage: "",
    proj_current: "",
    proj_temp: "",
    proj_capacity: "",
    current_soh: "",
  });
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const resp = await axios.post(
        "http://127.0.0.1:8000/predict_future_soh",
        {
          future_datetime: formData.future_datetime,
          current_datetime: formData.current_datetime,
          proj_voltage: parseFloat(formData.proj_voltage),
          proj_current: parseFloat(formData.proj_current),
          proj_temp: parseFloat(formData.proj_temp),
          proj_capacity: parseFloat(formData.proj_capacity),
          current_soh: parseFloat(formData.current_soh),
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setResult(resp.data);
    } catch (err: any) {
      setError(err.response?.data || err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-6 pb-10">
        {/* first row: 4 columns */}
        <div className="grid grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <label className="block text-sm font-medium mb-1">
              Future DateTime
            </label>
            <input
              type="datetime-local"
              name="future_datetime"
              value={formData.future_datetime}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <label className="block text-sm font-medium mb-1">
              Current DateTime
            </label>
            <input
              type="datetime-local"
              name="current_datetime"
              value={formData.current_datetime}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <label className="block text-sm font-medium mb-1">
              Voltage (V)
            </label>
            <input
              type="number"
              step="0.01"
              name="proj_voltage"
              value={formData.proj_voltage}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <label className="block text-sm font-medium mb-1">
              Current (A)
            </label>
            <input
              type="number"
              step="0.01"
              name="proj_current"
              value={formData.proj_current}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>
        </div>

        {/* second row: 3 columns */}
        <div className="grid grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <label className="block text-sm font-medium mb-1">Temp (°C)</label>
            <input
              type="number"
              step="0.1"
              name="proj_temp"
              value={formData.proj_temp}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <label className="block text-sm font-medium mb-1">
              Capacity (Ah)
            </label>
            <input
              type="number"
              step="1"
              name="proj_capacity"
              value={formData.proj_capacity}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <label className="block text-sm font-medium mb-1">
              Current SOH (%)
            </label>
            <input
              type="number"
              step="0.1"
              name="current_soh"
              value={formData.current_soh}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>
        </div>

        <motion.button
          type="submit"
          className="w-full mb-6 px-6 py-3 bg-black border border-blue-900 text-white rounded-lg hover:bg-blue-700 transition rounded-3xl"

        >
          Predict Future SOH
        </motion.button>
      </form>

      {error && <p className="mt-4 text-red-500">Error: {error}</p>}
      {result && (
        <div className="overflow-x-auto">
          <table className="table-fixed w-full bg-white rounded-lg shadow-lg text-black">
            <colgroup>
              <col className="w-1/2" />
              <col className="w-1/2" />
            </colgroup>
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-6 text-left">Metric</th>
                <th className="py-3 px-6 text-left">Result</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-6 font-semibold">Predicted SoH (%)</td>
                <td className="py-3 px-6">
                  {result["Predicted SoH (%)"] != null
                    ? `${result["Predicted SoH (%)"]}%`
                    : "—"}
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-6 font-semibold">Health Status</td>
                <td className="py-3 px-6">{result["Health Status"] || "—"}</td>
              </tr>
              <tr>
                <td className="py-3 px-6 font-semibold align-top">Hazards</td>
                <td className="py-3 px-6">
                  {Array.isArray(result.Hazards) &&
                  result.Hazards.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {result.Hazards.map((h, i) => (
                        <li key={i}>{h}</li>
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
  );
};

export default PageThreeSection;
