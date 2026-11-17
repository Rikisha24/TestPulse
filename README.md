# TestPulse ⚡

> **Simulation-driven mobile app testing framework eliminating reliance on expensive physical device labs — purpose-built for extreme device, network, and multilingual mobile ecosystems.**

---

## 🎯 The Core Problem

India’s mobile ecosystem presents unique challenges for app creators and development teams:
- **8,000+ Fragmented Devices:** From flagship phones to low-spec budget phones (1GB–3GB RAM, slow eMMC 5.1 storage, low-tier chipsets like Unisoc and MediaTek Helio).
- **22 Official Languages:** Complex Indic script ligature rendering (Devanagari, Dravidian, Bengali) frequently causes text truncation, overflow, and layout breaks.
- **Diverse & Unpredictable Networks:** Deep rural 2G/Edge connections, congested metro 3G/4G, and packet loss rates exceeding 15%.
- **Prohibitive Costs of Existing Tools:** Cloud device farms like BrowserStack and SauceLabs cost \$200+/month per parallel device, making comprehensive testing inaccessible for Indian Startups, MSMEs, and student developers.
- **Manual Testing Delays:** Testing manually across device segments takes 3–7 days, causing delayed releases and negative 1-star Play Store reviews.

---

## 💡 The Solution: TestPulse

**TestPulse** is an asynchronous, simulation-first testing framework that emulates real-world Indian conditions directly in software:
1. **Simulation-Driven Execution:** Eliminates dependence on physical device racks, saving up to 98% in operational costs.
2. **India-Specific Device Profiles:** Ready-to-test presets for Indian budget phones (Redmi 9A, JioPhone Next, Samsung Galaxy A14, Realme C53, Rural 2G/Edge Sim, Low Memory 1GB Sim).
3. **Multilingual Text Rendering Validation:** Automated verification for Hindi, Tamil, Telugu, Kannada, Bengali, and Marathi font bounds.
4. **AI-Powered Diagnostics & Optimization Engine:** Pinpoints memory leaks, Bitmap decoding spikes, and API timeout causes before production deployment.
5. **Rapid Turnaround:** Reduces 3–7 day test cycles down to 10–20 minutes.

---

## 🏗 System Architecture

The TestPulse platform is structured into five cohesive layers:

```
┌────────────────────────────────────────────────────────┐
│                      Client Layer                      │
│   React.js · Tailwind CSS · Recharts · Lucide Icons    │
│  [Dashboard] [Projects] [Test Runs] [Devices] [Reports]│
└───────────────────────────┬────────────────────────────┘
                            │ REST / JSON
┌───────────────────────────▼────────────────────────────┐
│                    API Gateway                         │
│            Node.js + Express (Port 3001)               │
│        Route Dispatch · JWT Auth · Rate Limiting       │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                  Service Modules                       │
│    Project Svc · Test Orchestrator · Result Parser     │
│       Analytics Engine · AI Suggestion Generator       │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│               Test Execution Engine                    │
│   Maestro (YAML Flows) · Appium · Device Simulator    │
│ (Delays · 2G/3G Network Throttling · Low Memory Class) │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                    Data Layer                          │
│     MongoDB Atlas / JSON Store · Bull + Redis Queue    │
│     Projects · Device Profiles · Runs · Logs · Audits  │
└────────────────────────────────────────────────────────┘
```

---

## 🔄 End-to-End Workflow

1. **User Login:** Authenticate using JWT session or demo credentials.
2. **Select or Create Project:** Register application name, package ID, platform (Android/iOS), and version.
3. **Configure Test Run:**
   - Select Device Profile (e.g., Redmi 9A, JioPhone Next, 2G Edge).
   - Choose Framework (Maestro YAML Flows or Appium).
   - Set Regional Language (English, हिन्दी, தமிழ், తెలుగు, ಕನ್ನಡ, বাংলা, मराठी).
   - Set Network Condition (4G LTE, 3G Patchy, 2G Edge 200kbps, High Packet Loss).
   - Customize Maestro YAML flow or select pre-built templates (Checkout, UPI QR soundbox, Multilingual).
4. **API Dispatches Run:** Request stored and pushed to the background queue.
5. **Device Profile Applied:** Hardware delays, network throttling, and memory ceilings are enforced.
6. **Execution & Live Visualization:** The Maestro test runs with live terminal logs and real-time interactive Phone Emulator display.
7. **Result Parser:** Normalizes steps into a unified schema with millisecond timestamps and pass/fail states.
8. **AI Suggestions Generated:** Rule-based heuristics and AI recommendations provide actionable optimizations.
9. **Dashboard & Reports:** Instant updates with radar comparison charts, India readiness scores, and exportable reports.

---

## 💻 Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide React, Recharts, Radix UI
- **Backend & API:** Node.js, Express, CORS
- **Automation:** Maestro (YAML flows), Appium Driver Adapter
- **Job Orchestration:** Bull Queue + Redis architecture
- **Database:** MongoDB Atlas / Persistent JSON Store
- **Deployment:** Vercel (Frontend), Render / Railway (Backend)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
```bash
# Clone the repository
git clone https://github.com/sabinsathish/TestPulse.git
cd TestPulse

# Install dependencies
npm install
```

### Running the Application

#### Option 1: Full-Stack Mode (Single Port with Express Gateway)
```bash
# Build frontend and start the Express server
npm run build
npm start
```
Open [http://localhost:3001](http://localhost:3001) in your browser.

#### Option 2: Development Mode (Vite + Express API)
In terminal 1 (Backend API):
```bash
npm run server
```

In terminal 2 (Frontend with Hot Module Reload):
```bash
npm run dev
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 🧪 Included Demo Profiles & Flows

### Device Profiles
- **Pixel 8 Pro:** Android 14 · 12 GB RAM · Tensor G3 · 4G LTE (High-End)
- **Samsung Galaxy A14:** Android 13 · 4 GB RAM · Exynos 850 · 4G (Mid-Range)
- **Redmi 9A:** Android 12 · 2 GB RAM · Helio G25 · 3G · 2.5x Delay (Low-End)
- **JioPhone Next:** Pragati OS / Android 11 Go · 2 GB RAM · QM215 (Ultra-Budget)
- **Sim: Poor Network:** 2G / Edge · 200 kbps · 650ms RTT · 4.0x Delay
- **Sim: Low Memory:** Android 12 · 1 GB RAM · MT6739 · 3.0x Delay

### Pre-built Maestro Flows
1. **E-Commerce Checkout Journey:** Login, search, catalog scroll, cart add, and checkout under throttled network conditions.
2. **KiranaPay UPI Merchant Flow:** Soundbox handshake, dynamic QR code generation, simulated scan, and voice confirmation.
3. **Indic Multilingual Font Bounds:** Verifies Devanagari, Tamil, and Telugu text length and checks for button text overflow.
