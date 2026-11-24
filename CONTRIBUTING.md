# Contributing to DDSoHE

Thank you for your interest in contributing to **DDSoHE** (`github.com/hamdankhan1208/DDSoHE_Lithium`), a battery diagnostics and state-of-health (SoH) dashboard for 18650 cells powered by a React/Vite frontend and a FastAPI backend. Contributions across frontend visualization, backend APIs and serial telemetry, model training/forecasting, and documentation are all welcome.

---

## Code of Conduct

Please keep all issues, discussions, and pull requests respectful, constructive, and inclusive. Focus feedback on technical quality, reproducibility, safety, and clear documentation.

---

## Project Architecture at a Glance

- **`client/`**: React + Vite frontend built with TypeScript, Tailwind CSS, Recharts, and WebSockets for live telemetry and visualizations (`client/src/`).
- **`DDSoH_Backend/`**: FastAPI server (`main.py`) that reads hardware serial data (`serial_reader.py`), manages WebSocket broadcasts (`websocket_manager.py`), maintains shared runtime state (`globals.py`), and exposes REST endpoints for SoH prediction and forecasting.
- **Pre-trained Models**: Includes `soh_xgboost_model.pkl` and `gru_soh_forecasting_model.pt` inside `DDSoH_Backend/`.

---

## Prerequisites & Local Setup

### Prerequisites
- **Frontend**: Node.js and npm.
- **Backend**: Python 3.12+ and dependencies listed in `DDSoH_Backend/requirements.txt` (including `fastapi`, `uvicorn`, `pyserial`, `httpx`, `xgboost`, `scikit-learn`, `torch`, `pandas`, and `pytz`).

### Installation

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/DDSoHE_Lithium.git
   cd DDSoHE_Lithium
   ```

2. **Set up the backend environment:**
   ```powershell
   cd DDSoH_Backend
   .\venv\Scripts\python.exe -m pip install -r requirements.txt
   ```
   *(If you use a different virtual environment or OS shell, activate your Python 3.12+ environment and install `requirements.txt` accordingly.)*

3. **Set up the frontend dependencies:**
   ```bash
   cd client
   npm install
   ```

---

## Running & Testing Locally

Start the backend first so the FastAPI server, REST/WebSocket endpoints, and serial monitor are active before launching the UI:

1. **Start the backend:**
   ```powershell
   cd DDSoH_Backend
   .\venv\Scripts\python.exe main.py
   ```
   Verify the API docs at `http://127.0.0.1:8000/docs`.

2. **Start the frontend:**
   ```bash
   cd client
   npm run dev
   ```
   Open the dashboard at `http://localhost:5173`.

> **Hardware Note:** Live battery graphs and telemetry depend on serial data from connected Arduino/serial hardware (configured to `COM4` by default on Windows). Without physical serial hardware connected, the backend can still start and retry the serial connection, but live telemetry and graphs will not display live values.

---

## How You Can Contribute

- **Frontend (`client/`)**: Improve UI components, Recharts visualizations, Tailwind styling, TypeScript types, or WebSocket client handling.
- **Backend & Serial Telemetry (`DDSoH_Backend/`)**: Enhance serial parsing/reconnection resilience in `serial_reader.py`, WebSocket handling in `websocket_manager.py`, runtime state in `globals.py`, or FastAPI endpoints in `main.py`.
- **SoH & Forecasting Models**: Add or refine training pipelines, evaluation metrics, feature engineering, or model artifacts (`soh_xgboost_model.pkl`, `gru_soh_forecasting_model.pt`) for 18650 cell diagnostics.
- **Bug Reports & Docs**: Report reproducible bugs, clarify port/environment configuration, or expand setup and architecture documentation.

---

## Contribution Guidelines

- **Avoid data leakage in ML/SoH changes**: Clearly document train/validation/test splits (such as cell-wise or cycle-wise splits) and ensure scaling or future cycle data does not leak across splits.
- **Handle serial & hardware gracefully**: Make serial port settings configurable rather than hardcoding machine-specific ports where possible, and ensure missing hardware does not crash the backend.
- **Keep large artifacts and secrets out of Git**: Avoid committing raw datasets, large checkpoints, credentials, or local environment folders unless intended by the repository.
- **Update dependencies cleanly**: If you add a Python or npm package, update `DDSoH_Backend/requirements.txt` or `client/package.json` / lockfile as appropriate.

---

## Making Changes & Submitting a Pull Request

1. Create a new branch from `main` (or the repository's default branch):
   ```bash
   git checkout -b feat/your-change-name
   ```
2. Make focused, clean edits and test your changes against both the backend (`http://127.0.0.1:8000/docs`) and frontend (`http://localhost:5173`).
3. Push your branch to your fork and open a Pull Request against `hamdankhan1208/DDSoHE_Lithium`.
4. In your PR description, summarize:
   - What changed and why.
   - Any serial/hardware setup or mock testing used to verify the change.
   - Any new configuration options or dependencies added.

---

## Reporting Issues

When opening an issue, include:
- A clear summary of the problem and expected vs. actual behavior.
- Steps to reproduce it.
- Your OS, Python/Node versions, serial port/hardware setup (if applicable), and any console/terminal logs or tracebacks.
