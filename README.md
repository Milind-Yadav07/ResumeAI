# ðŸŽ¯ AI-Powered Resume Builder & ATS Checker

A modern, full-stack, AI-enhanced resume builder that helps job seekers create ATS-optimized resumes and check their compatibility with job descriptions using Google Gemini AI.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![AI Powered](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)

---

## âœ¨ Features

### ðŸ“ Resume Builder
- **6 Professional Templates** â€” Executive, Creative, Minimalist, Corporate, Analyst, Showcase layouts
- **Real-time Preview** â€” See your resume update as you type
- **AI-Powered Enhancement** â€” Improve summaries, experience, and project descriptions using Gemini 2.5 Flash
- **PDF Export** â€” Download your resume as a professional PDF
- **Resume History** â€” Save and reload past resumes from your account

### ðŸ” ATS Checker
- **AI-Powered Analysis** â€” Upload your resume PDF and paste the job description for intelligent matching
- **Match Percentage** â€” Visual compatibility score
- **Missing Keywords Detection** â€” Identify keywords you should add
- **Improvement Suggestions** â€” Actionable recommendations

### ðŸ”’ Auth & Security
- JWT authentication stored in secure `httpOnly` cookies
- Route guards on all private pages
- Session validation on page load via `/auth/me` endpoint
- Rate limiting on all API endpoints (stricter on auth)

---

## ðŸ› ï¸ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite 7, TailwindCSS, Framer Motion |
| Backend | Node.js 18+, Express.js, Mongoose |
| Database | MongoDB (Atlas or local) |
| AI | Google Gemini 2.5 Flash (`@google/generative-ai`) |
| PDF | `@react-pdf/renderer`, `pdfjs-dist` |
| Auth | JWT, bcryptjs, httpOnly cookies |
| Logging | Winston |
| Validation | Zod |

---

## ðŸš€ Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9+
- A **MongoDB** database (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- A **Google Gemini API Key** ([Get one here](https://aistudio.google.com/app/apikey))

---

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/resume-ai.git
cd resume-ai
```

#### 2. Set up the Frontend

```bash
# Install frontend dependencies
npm install

# Copy the environment template
cp .env.example .env
```

Edit `.env`:
```
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

#### 3. Set up the Backend

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/resumeai
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=a_minimum_32_character_random_secret_string
JWT_EXPIRES_IN=7d
```

#### 4. Run the Application

Open **two terminals**:

**Terminal 1 â€” Backend**
```bash
cd server
npm run dev
```

**Terminal 2 â€” Frontend**
```bash
npm run dev
```

Then open **http://localhost:5173** in your browser.

---

## ðŸ“¦ Available Scripts

### Frontend (`/`)
| Script | Description |
|---|---|
| `npm run dev` | Start development server on port 5173 |
| `npm run build` | Build for production (type checks + bundle) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

### Backend (`/server`)
| Script | Description |
|---|---|
| `npm run dev` | Start backend with `--watch` (auto-reload) |
| `npm start` | Start backend for production |

---

## ðŸ“ Project Structure

```
resume-ai/
â”œâ”€â”€ src/                          # Frontend (React + TypeScript)
â”‚   â”œâ”€â”€ components/               # Shared UI components (Navbar, Button, PDFExport, ProtectedRoute)
â”‚   â”œâ”€â”€ context/                  # Auth & Resume React Context providers
â”‚   â”œâ”€â”€ features/                 # Feature-based modules
â”‚   â”‚   â”œâ”€â”€ auth/                 # Login, Signup pages & hooks
â”‚   â”‚   â”œâ”€â”€ builder/              # Resume builder page, forms, hooks
â”‚   â”‚   â”œâ”€â”€ dashboard/            # Saved resumes dashboard
â”‚   â”‚   â”œâ”€â”€ home/                 # Landing page
â”‚   â”‚   â”œâ”€â”€ ats/                  # ATS Checker page & hooks
â”‚   â”‚   â””â”€â”€ templates/            # 6 resume PDF templates
â”‚   â”œâ”€â”€ services/                 # API call utilities (auth, resume, ai)
â”‚   â”œâ”€â”€ types/                    # TypeScript interfaces & types
â”‚   â””â”€â”€ utils/                    # pdfParser utility
â”‚
â”œâ”€â”€ server/                       # Backend (Node.js + Express)
â”‚   â”œâ”€â”€ uploads/                  # Local PDF file storage (auto-created)
â”‚   â”œâ”€â”€ logs/                     # Winston log files
â”‚   â””â”€â”€ src/
â”‚       â”œâ”€â”€ config/               # DB connection, env validation
â”‚       â”œâ”€â”€ controllers/          # Route handler logic (auth, resume)
â”‚       â”œâ”€â”€ middleware/           # Auth guard, error handler, rate limiter, validator
â”‚       â”œâ”€â”€ models/               # Mongoose schemas (User, Resume)
â”‚       â”œâ”€â”€ modules/ai/           # AI module (controller, service, routes)
â”‚       â”œâ”€â”€ routes/               # Express routers (auth, resume)
â”‚       â”œâ”€â”€ services/             # Business logic (auth, resume)
â”‚       â””â”€â”€ utils/                # ApiError, ApiResponse, asyncHandler, logger
â”‚
â”œâ”€â”€ public/                       # Static assets
â”œâ”€â”€ .env.example                  # Frontend env template
â”œâ”€â”€ server/.env.example           # Backend env template
â”œâ”€â”€ package.json                  # Frontend dependencies
â””â”€â”€ vite.config.js                # Vite configuration
```

---

## ðŸ¤– AI Features

This application leverages **Google Gemini 2.5 Flash** via the backend (API key is never exposed to the client) for:

1. **Resume Summary Enhancement** â€” Transforms basic summaries into compelling, ATS-friendly professional statements
2. **Experience & Project Enhancement** â€” Rewrites bullet points to be more impactful
3. **ATS Compatibility Analysis** â€” Analyzes resume-job description match with keyword detection

---

## ðŸ”’ Security

- Gemini API key and JWT secrets are **server-side only** â€” never in frontend code
- JWT tokens are stored in `httpOnly`, `sameSite: strict` cookies
- All private API routes are protected with `protect` middleware
- Rate limiting: 10 auth requests / 15 min, 5 AI requests / min, 100 general requests / 15 min
- Input validation via Zod on all auth endpoints
- Helmet.js security headers on all responses
- Password field uses `select: false` in the Mongoose schema

---

## ⚠️ Known Issues

- PDF export requires a modern browser with Blob URL support
- AI features require an active internet connection and a valid Gemini API key
- Large PDF files (>5MB) may take longer to parse in the ATS checker

---

## 🚧 Future Enhancements

- [ ] Export in multiple formats (DOCX, TXT)
- [ ] Cover letter generator
- [ ] LinkedIn profile import
- [ ] Team/recruiter dashboard

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.

---

**★ If you found this project helpful, please give it a star!**
