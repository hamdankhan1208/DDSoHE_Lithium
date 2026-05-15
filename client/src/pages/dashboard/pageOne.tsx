import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface LiveData {
  timestamp: number;
  voltage_V: number;
  current_A: number;
  capacity_mAh: number;
  temperature_C: number;
}

const PageOneSection: React.FC = () => {
  const [data, setData] = useState<LiveData | null>(null);
  const [history, setHistory] = useState<LiveData[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false); // Track monitoring state

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws");
    ws.onmessage = (event) => {
      try {
        const parsed: LiveData = JSON.parse(event.data);
        setData(parsed);
        setHistory((prev) => [...prev, parsed]);
      } catch {
        console.error("Failed to parse WS message");
      }
    };
    return () => ws.close();
  }, []);

  // --- Button click handler
  const handleToggleMonitoring = async () => {
    try {
      if (isMonitoring) {
        await fetch("http://127.0.0.1:8000/stop_monitoring", { method: "POST" });
        console.log("Monitoring stopped");
      } else {
        await fetch("http://127.0.0.1:8000/start_monitoring", { method: "POST" });
        console.log("Monitoring started");
      }
      setIsMonitoring(!isMonitoring);
    } catch (err) {
      console.error("Failed to toggle monitoring", err);
    }
  };

  return (
    <div className="h-screen overflow-y-auto p-4">
      {data ? (
        <>
          {/* Row 1 */}
          <div className="grid grid-cols-3 gap-4 mt-6 mb-8 justify-items-center">
            {/* Time, Capacity, Temperature */}
            <div className="bg-black bg-opacity-50 p-4 rounded-lg shadow-lg text-center">
              <p className="text-sm text-cyan-300">Time</p>
              <p className="mt-1 text-lg font-bold text-white">
                {new Date(data.timestamp * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>
            <div className="bg-black bg-opacity-50 p-4 rounded-lg shadow-lg text-center">
              <p className="text-sm text-cyan-300">Capacity (mAh)</p>
              <p className="mt-1 text-lg font-bold text-white">
                {data.capacity_mAh.toFixed(2)}
              </p>
            </div>
            <div className="bg-black bg-opacity-50 p-4 rounded-lg shadow-lg text-center">
              <p className="text-sm text-cyan-300">Temperature (°C)</p>
              <p className="mt-1 text-lg font-bold text-white">
                {data.temperature_C.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Row 2 - Voltage, Button, Current */}
          <div className="grid grid-cols-3 gap-8 justify-items-center mb-12 items-center">
            {/* Voltage Gauge */}
            <div
              className="rounded-full"
              style={{
                width: 160,
                height: 160,
                boxShadow: "0 0 8px #00ffff, 0 0 16px #00ffff",
              }}
            >
              <CircularProgressbar
                value={data.voltage_V}
                maxValue={10}
                text={`${data.voltage_V.toFixed(2)} V`}
                styles={buildStyles({
                  textSize: "18px",
                  textColor: "#00ffff",
                  pathColor: "#1e90ff",
                  trailColor: "rgba(30,144,255,0.2)",
                  strokeLinecap: "round",
                })}
              />
            </div>

            {/*  Gauge  */}
            <div className="relative flex flex-col gap-2">
              <button
                onClick={handleToggleMonitoring}
                className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: "100px",   
                  height: "100px",  
                  opacity: 0,
                  pointerEvents: "auto",
                  cursor: "default",
                }}
              >
                Toggle Monitoring
              </button>
            </div>

            {/* Current Gauge */}
            <div
              className="rounded-full"
              style={{
                width: 160,
                height: 160,
                boxShadow: "0 0 8px #ffff00, 0 0 16px #ffff00",
              }}
            >
              <CircularProgressbar
                value={data.current_A}
                maxValue={10}
                text={`${data.current_A.toFixed(2)} A`}
                styles={buildStyles({
                  textSize: "18px",
                  textColor: "#ffff00",
                  pathColor: "#00ced1",
                  trailColor: "rgba(0,206,209,0.2)",
                  strokeLinecap: "round",
                })}
              />
            </div>
          </div>

          {/* Remaining graphs below... (no changes) */}

          {/* Voltage & Current over Time */}
          <div className="bg-black bg-opacity-50 p-4 rounded-lg shadow-lg mb-8">
            <h3 className="text-white font-semibold mb-2">
              Voltage & Current Over Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={history}>
                <CartesianGrid stroke="#444" strokeDasharray="3 3" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(ts) =>
                    new Date(ts * 1000).toLocaleTimeString([], {
                      minute: "2-digit",
                      second: "2-digit",
                    })
                  }
                  stroke="#888"
                />
                <YAxis domain={[0, 10]} stroke="#888" />
                <Tooltip
                  labelFormatter={(ts) =>
                    new Date(ts * 1000).toLocaleTimeString()
                  }
                  contentStyle={{ backgroundColor: "#333", border: "none" }}
                />
                <Line
                  type="monotone"
                  dataKey="voltage_V"
                  stroke="#00ffff"
                  dot={false}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="current_A"
                  stroke="#ffff00"
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Temperature over Time */}
          <div className="bg-black bg-opacity-50 p-4 rounded-lg shadow-lg mb-8">
            <h3 className="text-white font-semibold mb-2">
              Temperature Over Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={history}>
                <CartesianGrid stroke="#444" strokeDasharray="3 3" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(ts) =>
                    new Date(ts * 1000).toLocaleTimeString([], {
                      minute: "2-digit",
                      second: "2-digit",
                    })
                  }
                  stroke="#888"
                />
                <YAxis domain={[0, 60]} stroke="#888" />
                <Tooltip
                  labelFormatter={(ts) =>
                    new Date(ts * 1000).toLocaleTimeString()
                  }
                  contentStyle={{ backgroundColor: "#333", border: "none" }}
                />
                <Line
                  type="monotone"
                  dataKey="temperature_C"
                  stroke="#ff4500"
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Capacity over Time */}
          <div className="bg-black bg-opacity-50 p-4 rounded-lg shadow-lg">
            <h3 className="text-white font-semibold mb-2">
              Capacity Over Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={history}>
                <CartesianGrid stroke="#444" strokeDasharray="3 3" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(ts) =>
                    new Date(ts * 1000).toLocaleTimeString([], {
                      minute: "2-digit",
                      second: "2-digit",
                    })
                  }
                  stroke="#888"
                />
                <YAxis domain={[0, 3000]} stroke="#888" />
                <Tooltip
                  labelFormatter={(ts) =>
                    new Date(ts * 1000).toLocaleTimeString()
                  }
                  contentStyle={{ backgroundColor: "#333", border: "none" }}
                />
                <Line
                  type="monotone"
                  dataKey="capacity_mAh"
                  stroke="#00ff00"
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </>
      ) : (
        <p className="text-gray-400">Waiting for live data…</p>
      )}
    </div>
  );
};

export default PageOneSection;
