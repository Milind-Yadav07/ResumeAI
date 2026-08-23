<div align="center">

  <img src="public/ResumeAI-logo.png" alt="ResumeAI Logo" width="110" height="110" />

  # 🚀 ResumeAI
  ### *Next-Generation AI-Powered Resume Builder & ATS Analyzer*

  [![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

  <p align="center">
    <b>Empowering job seekers to land top-tier interviews with AI-tailored resumes and instant ATS compatibility scoring.</b>
    <br />
    <a href="#-key-features">Explore Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-api-endpoints-summary">API Docs</a>
  </p>

  <br />

  ![ResumeAI App Showcase](public/ProjectReadmeImage.png)

</div>

---

## 📌 Overview

**ResumeAI** is an end-to-end, full-stack web application designed to bridge the gap between job seekers and Applicant Tracking Systems (ATS). Powered by **Google Gemini AI**, ResumeAI analyzes resumes against target job descriptions, identifies missing keywords, calculates ATS compatibility scores, and suggests real-time bullet-point enhancements.

Whether you're crafting a new resume from scratch or optimizing an existing PDF, ResumeAI delivers pixel-perfect, recruiter-approved templates engineered for high readability and maximum ATS passing rates.

---

## ✨ Key Features

| Feature | Description | Emojis |
| :--- | :--- | :---: |
| **🤖 Gemini AI Optimization** | Generates high-impact action bullets, polishes professional summaries, and rewrites weak phrases instantly. | 🪄 🧠 |
| **🎯 Smart ATS Compatibility Matcher** | Upload job descriptions to receive a 0–100% compatibility score with detailed missing keyword alerts. | 📊 📈 |
| **🎨 Dynamic Template Engine** | Switch seamlessly between battle-tested, ATS-friendly resume templates with live visual preview. | 🖌️ 🖼️ |
| **📄 High-Precision PDF Export** | Render vector-quality downloadable PDFs built using `@react-pdf/renderer` & parse with `pdfjs-dist`. | 📥 📑 |
| **🔐 Enterprise-Grade Security** | Secure auth via JWT cookies, password hashing with `bcryptjs`, and strict input validation with `zod`. | 🔐 🛡️ |
| **⚡ Modern Animated UX** | Fluid UI experience with dynamic micro-interactions powered by `framer-motion` & `gsap`. | ✨ 💫 |
| **☁️ Cloud Document Sync** | Store and retrieve saved resumes securely via MongoDB Atlas & Cloudinary integration. | ☁️ 💾 |

---

## 🛠️ Tech Stack

### **Frontend (Client)**
* **Framework:** React 19 + TypeScript + Vite 7
* **Styling & UI:** Tailwind CSS 4 + Lucide Icons + Lottie Animations
* **State & Motion:** Framer Motion + GSAP + React Router v7
* **PDF Processing:** `@react-pdf/renderer` + `pdfjs-dist`
* **Notifications:** React Hot Toast

### **Backend (Server)**
* **Runtime:** Node.js (v18+) + Express.js (ESM / TypeScript)
* **Database & ORM:** MongoDB Atlas + Mongoose ORM
* **Artificial Intelligence:** `@google/generative-ai` (Gemini API)
* **Security & Middleware:** JWT, BcryptJS, Helmet, Express Rate Limit, Express Mongo Sanitize, Zod
* **Storage & Utilities:** Cloudinary API + Winston Logger + Morgan
* **Testing & Quality:** Vitest + Coverage v8 + ESLint

---

## 🏗️ Directory & Architecture Structure

```gcode
ResumeAI/
├── 📁 public/                 # Static assets, template previews & readme graphics
├── 📁 src/                    # Frontend React 19 application
│   ├── 📁 components/         # Shared UI components (Modals, Navbars, Buttons)
│   ├── 📁 context/            # React Global Context State (Auth, Resume State)
│   ├── 📁 features/           # Feature-based modular structure
│   │   ├── 📁 ats/            # ATS Analyzer & Score Dashboard
│   │   ├── 📁 auth/           # Login & Registration views
│   │   ├── 📁 builder/        # Interactive Builder canvas & editor
│   │   ├── 📁 dashboard/      # User project workspace
│   │   ├── 📁 home/           # Animated Landing Page
│   │   └── 📁 templates/      # Modern ATS Resume Templates
│   ├── 📁 hooks/              # Custom React Hooks
│   ├── 📁 services/           # Axios / Fetch API integrations
│   └── 📁 types/              # TypeScript Type definitions
│
├── 📁 server/                 # Express.js REST API Backend
│   ├── 📁 src/                # Backend Source Code
│   │   ├── 📁 config/         # Database & Cloud service configs
│   │   ├── 📁 controllers/    # API Endpoint Handlers
│   │   ├── 📁 middleware/     # Auth Guard, Rate Limiting, Error Handlers
│   │   ├── 📁 models/         # Mongoose Database Schemas
│   │   ├── 📁 routes/         # Modular Express Routes
│   │   ├── 📁 services/       # Gemini AI & Cloudinary Services
│   │   └── 📁 utils/          # Logger (Winston), Helpers & Zod Schemas
│   └── 📄 server.ts           # Server Entry Point
└── 📄 README.md
```

---

## 🚀 Getting Started

Follow these instructions to get **ResumeAI** running locally on your workstation.

### 📋 Prerequisites
* **Node.js** >= v18.0.0
* **npm** or **yarn**
* **MongoDB** (Local instance or MongoDB Atlas Connection String)
* **Google Gemini API Key** ([Get your free key here](https://aistudio.google.com/))

---

### 1️⃣ Installation & Setup

Clone the repository and install dependencies for both client and server:

```bash
# Clone the repository
git clone https://github.com/Milind-Yadav07/ResumeAI.git
cd ResumeAI

# Install client dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..
```

---

### 2️⃣ Environment Configuration

#### Client (`/.env`):
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

#### Server (`/server/.env`):
Create a `.env` file inside the `server/` directory:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://localhost:27017/resumeai
GEMINI_API_KEY=your_google_gemini_api_key_here
JWT_SECRET=your_super_secret_jwt_key_at_least_32_chars
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

### 3️⃣ Running the Application

#### Start Backend API Server:
```bash
cd server
npm run dev
```

#### Start Frontend Client (in a separate terminal):
```bash
npm run dev
```

Open your browser and navigate to **`http://localhost:5173`** to access **ResumeAI**.

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/v1/auth/register` | Register a new user account | ❌ |
| `POST` | `/api/v1/auth/login` | Authenticate user & retrieve session token | ❌ |
| `GET` | `/api/v1/auth/me` | Fetch authenticated user profile | ✅ |
| `GET` | `/api/v1/resumes` | Fetch all user saved resumes | ✅ |
| `POST` | `/api/v1/resumes` | Create a new resume document | ✅ |
| `GET` | `/api/v1/resumes/:id` | Fetch specific resume details | ✅ |
| `PUT` | `/api/v1/resumes/:id` | Update resume sections & content | ✅ |
| `DELETE` | `/api/v1/resumes/:id` | Delete a resume | ✅ |
| `POST` | `/api/v1/ats/analyze` | Analyze resume against job description via Gemini | ✅ |
| `POST` | `/api/v1/ats/enhance-bullet` | AI rewrite & optimize bullet points | ✅ |

---

## 🧪 Testing & Code Quality

The backend is backed by test suites using **Vitest**.

```bash
# Run unit & integration tests
cd server
npm run test

# Run tests with coverage
npm run test:coverage
```

---

## 🗺️ Roadmap & Future Features

- [ ] 🤖 **AI Cover Letter Generator** customized per job post.
- [ ] 💼 **One-Click LinkedIn Profile Importer**.
- [ ] 🌐 **Custom Public URLs & Portfolios** for candidate sharing.
- [ ] 📊 **Real-time Keyword Match Heatmap** for job descriptions.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.

---

<div align="center">
  <p>Designed & Developed with ❤️ by <b>Milind Yadav</b></p>
  <p>
    <a href="https://github.com/Milind-Yadav07">GitHub</a> •
    <a href="https://linkedin.com">LinkedIn</a>
  </p>
  <sub>⭐ If you find this project impressive, please consider giving it a star on GitHub! ⭐</sub>
</div>

