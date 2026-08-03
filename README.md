# 🚀 ATS Resume AI SaaS
### *Build ATS-Optimized Resumes with AI. Land More Interviews.*

<p align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe)
![Clerk](https://img.shields.io/badge/Clerk-Authentication-6C47FF?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss)

</p>

<p align="center">

**An enterprise-grade AI SaaS platform that intelligently tailors resumes for Applicant Tracking Systems (ATS), generates professional cover letters, optimizes LinkedIn profiles, and dramatically improves job application success using Large Language Models.**

</p>

---

# ✨ Overview

Finding a job today is no longer about writing a good resume.

Most resumes never reach recruiters because they're filtered by **Applicant Tracking Systems (ATS)** before a human even sees them.

ATS Resume AI solves this problem by using **Large Language Models (Llama-3)** to analyze job descriptions and intelligently rewrite resumes while preserving the user's actual experience.

Instead of keyword stuffing, the platform performs contextual optimization to maximize ATS compatibility without sacrificing readability.

Designed with scalability in mind, ATS Resume AI combines:

- 🤖 AI-powered Resume Optimization
- 📄 ATS Score Prediction
- 🌐 Job Description Scraping
- 💼 Cover Letter Generation
- 🔗 LinkedIn Optimization
- 💳 SaaS Subscription System
- 📊 Resume Analytics

---

# 🌟 Features

## 🤖 AI Resume Tailoring

Upload your resume and paste a Job Description.

The AI:

- Rewrites bullet points
- Improves action verbs
- Adds ATS-friendly keywords
- Keeps information truthful
- Preserves formatting
- Generates recruiter-ready content

---

## 📄 ATS Score Analyzer

Receive an estimated ATS compatibility score based on:

- Keyword Matching
- Skills Alignment
- Experience Relevance
- Resume Structure
- Readability
- Industry Standards

---

## 🌐 Smart Job Description Scraper

Paste a Job URL from platforms like:

- Greenhouse
- Lever
- Workday
- Company Career Pages

The backend automatically:

- Downloads the page
- Cleans HTML
- Removes advertisements
- Extracts meaningful job requirements
- Sends optimized text to the AI engine

---

## ✍ AI Cover Letter Generator

Generate personalized cover letters that:

- Match the target role
- Reference company values
- Highlight relevant achievements
- Maintain professional tone
- Avoid generic AI writing patterns

---

## 🔗 LinkedIn Profile Optimizer

Transform resume content into LinkedIn-friendly sections including:

- Headline
- About Section
- Experience
- Skills
- Featured Keywords

---

## 📄 PDF Resume Generator

Generate beautiful ATS-friendly resumes using:

- Pixel-perfect layouts
- Clean typography
- Optimized spacing
- Recruiter-friendly formatting
- Browser-based PDF rendering

---

## 💳 SaaS Billing

Complete subscription workflow including:

- Clerk Authentication
- Protected Routes
- Stripe Checkout
- Stripe Webhooks
- Credit System
- Premium Plans

---

## 🌙 Modern UI

- Dark Mode
- Light Mode
- Responsive Design
- Smooth Animations
- Mobile Friendly
- Clean Dashboard

---

# 🛠 Tech Stack

## Frontend

| Technology | Purpose |
|------------|----------|
| Next.js 14 | App Router |
| React | UI |
| TypeScript | Type Safety |
| TailwindCSS | Styling |
| Lucide React | Icons |
| next-themes | Theme Switching |
| React PDF | PDF Rendering |

---

## Backend

| Technology | Purpose |
|------------|----------|
| FastAPI | API |
| Python | Backend |
| BeautifulSoup4 | Scraping |
| SoupSieve | HTML Parsing |
| PyMuPDF | PDF Processing |
| Groq API | AI |
| Llama-3-70B | Resume Generation |

---

## Database

| Technology | Purpose |
|------------|----------|
| PostgreSQL | Database |
| Prisma ORM | ORM |

---

## Infrastructure

| Technology | Purpose |
|------------|----------|
| Clerk | Authentication |
| Stripe | Payments |
| UploadThing | Cloud Storage |
| Vercel | Frontend Hosting |
| Render | Backend Hosting |

---

# 🏗 Architecture

```
                   ┌───────────────────────────────┐
                   │          Client Layer         │
                   │        Next.js 14 App         │
                   └──────────────┬────────────────┘
                                  │
                    Authentication │ Theme │ Upload
                                  │
                   ┌──────────────▼────────────────┐
                   │         FastAPI API           │
                   │ Request Validation & Routing  │
                   └──────────────┬────────────────┘
                                  │
               ┌──────────────────┼──────────────────┐
               │                  │                  │
               ▼                  ▼                  ▼
        Groq Llama-3      Resume Parser      JD Scraper
               │                  │                  │
               └──────────────┬─────────────────────┘
                              ▼
                    Structured Resume JSON
                              │
                              ▼
                     PostgreSQL + Prisma
                              │
                              ▼
                     React PDF Generator
                              │
                              ▼
                       ATS Optimized PDF
```

---

# ⚡ Workflow

```text
Upload Resume
        │
        ▼
Extract PDF Text
        │
        ▼
Paste Job Description
        │
        ▼
Job Description Cleaning
        │
        ▼
Groq Llama-3 Analysis
        │
        ▼
Resume Optimization
        │
        ▼
ATS Score Generation
        │
        ▼
Cover Letter Generation
        │
        ▼
Generate Final PDF
```

---

# 📁 Project Structure

```
ATS-Resume-AI/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── hooks/
│   ├── public/
│   ├── prisma/
│   └── styles/
│
├── backend/
│   ├── main.py
│   └── requirements.txt
│
├── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/JaaniCoder/resume-tailor-ai.git

cd resume-tailor-ai
```

---

# Frontend Setup

```bash
cd frontend

npm install
```

Create

```
.env.local
```

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

DATABASE_URL=
```

Run Prisma

```bash
npx prisma generate

npx prisma db push
```

Run Frontend

```bash
npm run dev
```

---

# Backend Setup

```bash
cd backend

python -m venv venv
```

Windows

```bash
venv\Scripts\activate
```

macOS/Linux

```bash
source venv/bin/activate
```

Install Packages

```bash
pip install -r requirements.txt
```

Create

```
.env
```

```env
GROQ_API_KEY=

DATABASE_URL=
```

Run Backend

```bash
uvicorn main:app --reload
```

---

# 🔥 Core Highlights

- Enterprise-grade Architecture
- AI Powered Resume Optimization
- ATS Keyword Extraction
- Dynamic Resume Rewriting
- AI Cover Letters
- LinkedIn Optimization
- SaaS Billing System
- Stripe Integration
- Clerk Authentication
- PDF Processing
- FastAPI Backend
- Next.js App Router
- PostgreSQL Database
- Prisma ORM
- Responsive Dashboard
- Production Ready

---

# 📊 Future Roadmap

- Resume Version History
- AI Interview Preparation
- AI Mock Interviews
- Recruiter Dashboard
- Resume Analytics
- Portfolio Generator
- Multi-language Support
- AI Resume Templates
- Chrome Extension
- Browser Plugin

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository

2. Create your feature branch

```bash
git checkout -b feature/AmazingFeature
```

3. Commit your changes

```bash
git commit -m "Add Amazing Feature"
```

4. Push to your branch

```bash
git push origin feature/AmazingFeature
```

5. Open a Pull Request

---

# ⭐ Support

If you found this project helpful,

please consider giving it a ⭐ on GitHub.

It motivates future open-source development.

---

# 📄 License

Distributed under the MIT License.

See the **LICENSE** file for more information.

---

# 👨‍💻 Author

**Jitin Sharma**

AI • Full Stack Developer • Machine Learning Enthusiast

GitHub: [JaaniCoder](https://github.com/JaaniCoder)

LinkedIn: [Jitin Sharma](https://linkedin.com/in/jitin-sharma-5191ba2aa)

---

<p align="center">

### ⭐ If this project helped you, don't forget to Star the Repository ⭐

Made with ❤️ using **Next.js, FastAPI, PostgreSQL, Prisma, Groq AI, Clerk, Stripe and Tailwind CSS**

</p>
