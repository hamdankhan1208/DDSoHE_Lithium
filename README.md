# DDSoHE

DDSoHE is a battery diagnostics and state-of-health dashboard for 18650 cells. It combines a React/Vite frontend with a FastAPI backend to visualize live battery telemetry and make health and forecasting predictions.

## Project structure

- `client/`
  - React + Vite frontend
  - Uses TypeScript, Tailwind CSS, Recharts, and WebSocket communication for live updates.
- `DDSoH_Backend/`
  - FastAPI backend server
  - Reads serial data from hardware, broadcasts data via WebSocket, and exposes REST endpoints for state-of-health prediction and future forecasting.
  - Includes pre-trained models: `soh_xgboost_model.pkl` and `gru_soh_forecasting_model.pt`.

## Important hardware note

The dashboard and live graphs require hardware data from the serial reader. Without the Arduino/serial hardware connected on the configured port (Windows `COM4` by default), the backend can still run, but the live graph data and telemetry feed will not display meaningful values.

## Requirements

### Frontend

- Node.js
- npm

### Backend

- Python 3.12+ (project contains a `venv/` under `DDSoH_Backend/`)
- `fastapi`
- `uvicorn`
- `pyserial`
- `httpx`
- `xgboost`
- `scikit-learn`
- `torch`
- `pandas`
- `pytz`

## Setup

### Frontend

```bash
cd client
npm install
```

### Backend

```powershell
cd DDSoH_Backend
.\venv\Scripts\python.exe -m pip install -r requirements.txt
```

## Run

### Start backend

```powershell
cd DDSoH_Backend
.\venv\Scripts\python.exe main.py
```

Then open:

- `http://127.0.0.1:8000/docs`

### Start frontend

```bash
cd client
npm run dev
```

Then open:

- `http://localhost:5173`

## Notes

- `DDSoH_Backend/main.py` launches the FastAPI app and also starts the serial monitor at startup.
- If the serial port is not available, the backend will retry the connection, but live telemetry and graphs will not populate.
- The frontend expects the backend API and WebSocket to be available to show live graphs and predictions.

## File highlights

- `DDSoH_Backend/main.py` — FastAPI application entrypoint
- `DDSoH_Backend/serial_reader.py` — reads serial data and broadcasts to WebSocket clients
- `DDSoH_Backend/websocket_manager.py` — manages active WebSocket connections
- `DDSoH_Backend/globals.py` — shared runtime state for latest data
- `client/src/` — React components and pages

## Recommended workflow

1. Start the backend first.
2. Confirm `http://127.0.0.1:8000/docs` is available.
3. Start the frontend.
4. Visit `http://localhost:5173` and monitor the dashboard.

> Without the physical serial hardware, the graphs will not show live battery telemetry.
