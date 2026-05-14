# 🎯 AI-Powered Resume Builder & ATS Checker

A modern, AI-enhanced resume builder that helps job seekers create ATS-optimized resumes and check their compatibility with job descriptions using Google Gemini AI.

![Resume Builder](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![AI Powered](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)

## ✨ Features

### 📝 Resume Builder
- **Multiple Professional Templates** - Choose from Column and Row layout designs
- **Real-time Preview** - See your resume update as you type
- **AI-Powered Summary** - Generate compelling professional summaries with Google Gemini AI
- **Comprehensive Sections** - Personal Info, Summary, Skills, Experience, Education, Projects, Achievements
- **PDF Export** - Download your resume as a professional PDF document
- **ATS-Optimized** - Built with Applicant Tracking System compatibility in mind

### 🌐 <a href="https://resumeai-ats.netlify.app/">Live Demo ✨</a>
<br>

### 🔍 ATS Checker
- **AI-Powered Analysis** - Upload your resume and job description for intelligent matching
- **Match Percentage** - Get a compatibility score with visual circular progress indicator
- **Missing Keywords Detection** - Identify important keywords you should add
- **Improvement Suggestions** - Receive actionable recommendations to enhance your resume
- **PDF Support** - Upload and analyze PDF resumes

### 🎨 Premium UI/UX
- **Modern Design** - Glassmorphism effects, gradient backgrounds, and smooth animations
- **Dark Mode** - Professional dark theme with vibrant accents
- **Responsive Layout** - Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations** - Powered by Framer Motion for delightful interactions
- **Custom Typography** - Google Fonts (Inter + Outfit) for professional appearance

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.4
- **Routing:** React Router DOM v7
- **Animations:** Framer Motion
- **AI Integration:** Google Generative AI (Gemini 2.5 Flash)
- **PDF Generation:** @react-pdf/renderer
- **PDF Parsing:** pdfjs-dist
- **Icons:** Lucide React
- **State Management:** React Context API

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/resume-builder.git
   cd resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Add your Google Gemini API key to `.env`:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Usage

### Building a Resume

1. Click **"Build Career Resume"** on the landing page
2. Select your preferred template (Column or Row layout)
3. Fill in your information in the form sections:
   - Personal Information
   - Professional Summary (use AI enhancement!)
   - Skills
   - Work Experience
   - Education
   - Projects
   - Achievements
4. Watch the real-time preview update
5. Click **"Download PDF"** to export your resume

### Checking ATS Compatibility

1. Click **"Scan ATS Compatibility"** on the landing page
2. Paste the job description in the left panel
3. Upload your resume PDF in the right panel
4. Click **"Check ATS Score"**
5. Review your match percentage, missing keywords, and improvement suggestions

## 📁 Project Structure

```
resume-builder/
├── src/
│   ├── components/          # Reusable components
│   │   ├── layout/         # Layout components (Button, etc.)
│   │   └── PDFExport.jsx   # PDF export component
│   ├── context/            # React Context for state management
│   │   └── ResumeContext.jsx
│   ├── pages/              # Page components
│   │   ├── LandingPage.jsx
│   │   ├── FormatSelection.jsx
│   │   ├── ResumeBuilder.jsx
│   │   └── ATSChecker.jsx
│   ├── templates/          # Resume templates
│   │   ├── ColumnTemplate.jsx
│   │   ├── RowTemplate.jsx
│   │   └── Template.css
│   ├── utils/              # Utility functions
│   │   ├── gemini.js       # Google Gemini AI integration
│   │   └── pdfParser.js    # PDF text extraction
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── .env.example            # Environment variable template
├── package.json
└── vite.config.js
```

## 🤖 AI Features

This application leverages **Google Gemini 2.5 Flash** for:

1. **Resume Summary Enhancement** - Transforms basic summaries into compelling, ATS-friendly professional statements
2. **ATS Compatibility Analysis** - Analyzes resume-job description match with intelligent keyword detection
3. **Improvement Recommendations** - Provides actionable suggestions to improve resume quality

## 🎨 Design Philosophy

- **Premium Aesthetics** - Modern glassmorphism, gradients, and glow effects
- **User-Centric** - Intuitive interface with clear visual hierarchy
- **Performance** - Optimized with Vite for fast load times
- **Accessibility** - Semantic HTML and keyboard navigation support
- **Responsive** - Mobile-first approach with breakpoints for all devices

## 🔒 Security

- API keys are stored in environment variables (never committed to git)
- `.env` file is excluded via `.gitignore`
- Use `.env.example` as a template for required environment variables

## 🐛 Known Issues

- PDF export requires modern browser with print support
- AI features require active internet connection
- Large PDF files may take longer to parse

## 🚧 Future Enhancements

- [ ] Multiple resume templates (Modern, Classic, Creative)
- [ ] Save/Load resume data to local storage
- [ ] Export in multiple formats (DOCX, TXT)
- [ ] User authentication for cloud storage
- [ ] Resume version history
- [ ] Cover letter generator
- [ ] LinkedIn profile import

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Google Gemini AI for powerful AI capabilities
- Framer Motion for smooth animations
- Lucide React for beautiful icons
- React PDF Renderer for PDF generation

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

**⭐ If you found this project helpful, please give it a star!**
