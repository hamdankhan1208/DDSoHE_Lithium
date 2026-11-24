---
name: Bug report
about: Create a report to help us improve
title: ''
labels: ''
assignees: ''

---

---
name: Bug Report
about: Report a bug in the DDSoHE dashboard, FastAPI backend, serial telemetry, or SoH forecasting models
title: "[BUG] "
labels: bug
assignees: ''
---

**Describe the bug**
A clear and concise description of what the bug is.

**Component Affected**
- [ ] Frontend (`client/` - React / Vite / Recharts)
- [ ] Backend (`DDSoH_Backend/` - FastAPI / REST / WebSockets)
- [ ] Serial Reader (`serial_reader.py` / Arduino hardware connection)
- [ ] SoH / Forecasting Models (`soh_xgboost_model.pkl` / `gru_soh_forecasting_model.pt`)

**To Reproduce**
Steps to reproduce the behavior:
1. Start the backend (`python main.py`) / frontend (`npm run dev`)
2. Connect hardware on port `...` (or run without hardware)
3. Navigate to `'...'` or call endpoint `'...'`
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Logs / Tracebacks / Screenshots**
Paste any FastAPI terminal output, serial connection errors, browser console logs, or screenshots here.

**Environment (please complete the following information):**
- **OS:** [e.g., Windows 11, Ubuntu 22.04]
- **Python Version:** [e.g., 3.12]
- **Node.js Version:** [e.g., 20.x]
- **Browser (if frontend):** [e.g., Chrome, Edge]
- **Hardware / Serial Port:** [e.g., Arduino connected on `COM4`, or no hardware connected]

**Additional context**
Add any other context about the problem here (e.g., cell configuration, baud rate, or sample telemetry payload).
