# Security Policy

## Supported Versions

Security updates are currently provided for the latest active development branch (`main`) of **DDSoHE**. Older snapshots and unmaintained forks are not supported.

| Version / Branch | Supported          |
| ---------------- | ------------------ |
| `main` (Latest)  | :white_check_mark: |
| Older commits    | :x:                |

## Scope & Hardware/Telemetry Considerations

Because **DDSoHE** interfaces with physical 18650 lithium-ion battery hardware over serial connections (`pyserial`), exposes local/network FastAPI REST and WebSocket endpoints, and loads serialized machine learning artifacts (`.pkl` and `.pt`), we take both software and hardware-interface security seriously.

Relevant areas include:
- **Serial & Hardware Interface (`DDSoH_Backend/serial_reader.py`)**: Malformed serial input handling, port configuration exposure, or unintended command execution.
- **Backend API & WebSockets (`DDSoH_Backend/main.py`, `websocket_manager.py`)**: Unauthorized access, injection flaws, or denial-of-service vectors when exposed beyond `localhost`.
- **Model & Dependency Supply Chain**: Unsafe deserialization (e.g., untrusted `.pkl` / PyTorch checkpoints) or known vulnerabilities in Python (`requirements.txt`) and Node (`client/package.json`) dependencies.
- **Frontend (`client/`)**: Cross-site scripting (XSS) or unsafe handling of live telemetry streams.

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues, discussions, or pull requests.**

Instead, please report them privately using one of the following methods:
1. **GitHub Private Vulnerability Reporting (Preferred):** Navigate to the **Security** tab of `github.com/hamdankhan1208/DDSoHE_Lithium` and click **"Report a vulnerability"** to submit a private advisory.
2. **Direct Maintainer Contact:** If private vulnerability reporting is not enabled on the repository, reach out directly to the repository owner (`@hamdankhan1208`) via GitHub with the subject line `[SECURITY] DDSoHE Vulnerability Report`.

### What to Include in Your Report
To help us triage and reproduce the issue quickly, please include:
- A clear description of the vulnerability and its potential impact.
- The affected component(s) (e.g., `DDSoH_Backend/`, `client/`, model loading, or serial reader).
- Step-by-step instructions or a proof-of-concept (PoC) to reproduce the issue.
- Your environment details (OS, Python/Node versions, and browser if applicable).

### Response Timeline & Disclosure Process
- **Acknowledgment:** You can expect an initial acknowledgment of your report within **48–72 hours**.
- **Updates:** We will provide status updates at least once every **7 days** while investigating and developing a fix.
- **Resolution:**
  - **If accepted:** We will work on a patch, credit you in the release/advisory notes (unless you prefer to remain anonymous), and coordinate public disclosure once the fix is merged into `main`.
  - **If declined:** We will explain why the behavior is considered expected, out of scope (such as physical access to a local development machine or physical battery hardware tampering), or non-exploitable.

## Safe Deployment Best Practices

- **Localhost Binding:** By default, run the FastAPI backend (`127.0.0.1:8000`) and Vite dev server (`localhost:5173`) bound to local loopback interfaces unless proper authentication, TLS, and CORS restrictions are configured.
- **Trusted Model Files Only:** Only load `.pkl` (`soh_xgboost_model.pkl`) and `.pt` (`gru_soh_forecasting_model.pt`) model files from trusted sources, as pickle and PyTorch deserialization can execute arbitrary code if tampered with.
- **Battery Safety:** Software-based State of Health (SoH) estimates and forecasts are for diagnostic and research purposes only and must not replace dedicated hardware Battery Management System (BMS) safety cutoffs for 18650 cells.
