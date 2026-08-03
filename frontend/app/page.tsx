import Link from "next/link";
import {
  ArrowRight,
  Zap,
  FileText,
  CheckCircle,
  Check,
} from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle"; // Make sure this path matches your setup!

export default async function LandingPage() {
  const { userId } = await auth();
  if (userId) {
    redirect("/dashboard");
  }

  return (
    // Dynamic background and text colors
    <main className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-emerald-500/30 pb-24 overflow-x-hidden transition-colors duration-300">
      
      {/* --- NAVIGATION --- */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto relative z-50">
        <div className="text-xl font-extrabold tracking-tight">
          ATS <span className="text-emerald-500">Resume AI</span>
        </div>
        <div className="flex gap-2 sm:gap-4 items-center">
          <ThemeToggle />
          <Link
            href="/sign-in"
            className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            href="/sign-up"
            className="px-5 py-2.5 text-sm font-bold bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* --- 1. HERO TEXT --- */}
      <section className="pt-20 pb-16 px-6 flex flex-col items-center text-center max-w-4xl mx-auto relative z-20">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-8 shadow-sm transition-colors">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Powered by Llama-3 & Groq
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-zinc-900 dark:text-white">
          Bypass the filters. <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-cyan-600 dark:from-emerald-400 dark:to-cyan-500">
            Land the interview.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed mb-10 transition-colors">
          Upload your existing resume, target a specific job role, and let our
          proprietary AI rewrite your bullets, optimize your keywords, and
          format your layout in seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/sign-up"
            className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 font-bold rounded-full transition-all shadow-[0_0_40px_rgba(16,185,129,0.2)] dark:shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.4)] hover:-translate-y-1 flex items-center justify-center gap-2 text-lg"
          >
            Start Generating for Free <ArrowRight size={20} />
          </Link>
          <p className="text-sm text-zinc-500 sm:hidden mt-2">
            No credit card required
          </p>
        </div>
      </section>

      {/* --- 2. HERO MOCKUP (MAC BROWSER WINDOW) --- */}
      <section className="px-4 relative z-20 pb-16">
        <div className="max-w-5xl mx-auto relative">
          <div className="absolute inset-0 top-1/4 bg-emerald-500/10 dark:bg-emerald-500/20 blur-[120px] rounded-full -z-10"></div>
          
          {/* Mac Browser Frame */}
          <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800/50 p-1 shadow-2xl shadow-zinc-200 dark:shadow-emerald-900/20 ring-1 ring-zinc-200 dark:ring-white/10 backdrop-blur-sm transition-colors">
            <div className="rounded-lg bg-white dark:bg-zinc-950 overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-colors">
              
              {/* Fake Mac Header */}
              <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900/80 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
                <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                <div className="h-3 w-3 rounded-full bg-amber-500/80"></div>
                <div className="h-3 w-3 rounded-full bg-emerald-500/80"></div>
                <div className="mx-auto text-[10px] font-medium text-zinc-500 flex items-center gap-1 bg-white dark:bg-zinc-800/50 px-3 py-1 rounded-md shadow-sm dark:shadow-none">
                  🔒 localhost:3000/dashboard
                </div>
              </div>

              {/* --- The Mockup Images (Theme Toggled) --- */}
              
              {/* Light Mode Image (Hidden in Dark Mode) */}
              <Image
                src="/dashboard-mockup-light.png"
                alt="ATS Resume AI Dashboard Preview"
                width={1200}
                height={800}
                className="w-full h-auto object-cover opacity-95 transition-opacity hover:opacity-100 dark:hidden"
                priority
              />
              
              {/* Dark Mode Image (Hidden in Light Mode) */}
              <Image
                src="/dashboard-mockup-dark.png"
                alt="ATS Resume AI Dashboard Preview"
                width={1200}
                height={800}
                className="w-full h-auto object-cover opacity-95 transition-opacity hover:opacity-100 hidden dark:block"
                priority
              />

            </div>
          </div>
        </div>
      </section>

      {/* --- 3. CORE FEATURES GRID --- */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Instant Generation</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
              Powered by LPUs, your resume is completely analyzed and rewritten
              in under 2 seconds. No loading screens, just results.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-600 dark:text-cyan-400 shadow-inner">
              <CheckCircle size={24} />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">ATS Match Scoring</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
              See exactly how well your new resume matches the job description
              with our circular progress dashboard and keyword breakdown.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-inner">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Pixel-Perfect PDFs</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
              Choose between Traditional Executive or Modern Minimalist layouts.
              Our React-PDF engine compiles everything natively in the browser.
            </p>
          </div>
        </div>
      </section>

      {/* --- 4. HOW IT WORKS --- */}
      <section className="max-w-6xl mx-auto px-4 py-24 relative">
        <div className="mb-20 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-6 tracking-tight">
            From upload to interview in <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400">
              3 simple steps.
            </span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
            We eliminated the busywork. Focus on applying, let our AI handle the formatting and keyword optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-0.5 bg-linear-to-r from-zinc-100 via-emerald-500/30 to-zinc-100 dark:from-zinc-900 dark:via-emerald-500/50 dark:to-zinc-900 z-0 transition-colors"></div>

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center text-center p-8 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl backdrop-blur-sm transition-all hover:-translate-y-2 hover:shadow-xl dark:hover:bg-zinc-900">
            <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              <span className="text-emerald-500 font-black text-3xl">1</span>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Upload Resume</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Drop in your existing PDF. Our engine extracts your experience, education, and skills instantly.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center text-center p-8 bg-zinc-50 dark:bg-zinc-900 border border-emerald-500/30 rounded-3xl backdrop-blur-sm shadow-xl dark:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all hover:-translate-y-2 md:-mt-4">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/10 dark:shadow-emerald-500/20">
              <span className="text-emerald-600 dark:text-emerald-400 font-black text-3xl">2</span>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Target & Optimize</h3>
            <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
              Paste a Job Description URL. Llama-3 rewrites your bullets to perfectly match the ATS keywords.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center text-center p-8 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl backdrop-blur-sm transition-all hover:-translate-y-2 hover:shadow-xl dark:hover:bg-zinc-900">
            <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              <span className="text-emerald-500 font-black text-3xl">3</span>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Export & Apply</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Download a pixel-perfect ATS PDF, copy your generated cover letter, and sync it to LinkedIn.
            </p>
          </div>
        </div>
      </section>

      {/* --- 5. PRICING --- */}
      <section className="mx-auto max-w-5xl px-4 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-6 tracking-tight">
            Simple, transparent pricing.
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
            Start building for free. Upgrade only when you need absolute premium power.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
          {/* Free Tier */}
          <div className="flex flex-col p-10 bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-[2.5rem] backdrop-blur-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-sm dark:shadow-none">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Basic</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">Perfect for testing the AI and generating your first resume.</p>
            <div className="mb-8 flex items-baseline gap-2">
              <span className="text-5xl font-black text-zinc-900 dark:text-white">$0</span>
              <span className="text-zinc-500 font-medium">/ free forever</span>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-center gap-3 text-zinc-600 dark:text-zinc-300 text-sm">
                <Check size={18} className="text-emerald-500 shrink-0" /> 10 AI Generation Credits
              </li>
              <li className="flex items-center gap-3 text-zinc-600 dark:text-zinc-300 text-sm">
                <Check size={18} className="text-emerald-500 shrink-0" /> 3 Standard PDF Templates
              </li>
              <li className="flex items-center gap-3 text-zinc-600 dark:text-zinc-300 text-sm">
                <Check size={18} className="text-emerald-500 shrink-0" /> Basic ATS Scoring
              </li>
              <li className="flex items-center gap-3 text-zinc-600 dark:text-zinc-300 text-sm">
                <Check size={18} className="text-emerald-500 shrink-0" /> Copy & Paste JD Input
              </li>
            </ul>
            <Link
              href="/sign-up"
              className="w-full block text-center bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold py-4 rounded-2xl transition-all"
            >
              Start for Free
            </Link>
          </div>

          {/* Pro Tier (Remains Dark even in Light Mode for emphasis) */}
          <div className="flex flex-col p-10 bg-zinc-900 border border-amber-500/40 rounded-[2.5rem] relative shadow-2xl shadow-amber-900/20 transform md:scale-105">
            <div className="absolute -top-4 inset-x-0 flex justify-center">
              <span className="bg-linear-to-r from-amber-400 to-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
                Most Popular
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
            <p className="text-amber-200/60 text-sm mb-6">For serious job seekers who want every advantage.</p>
            <div className="mb-8 flex items-baseline gap-2">
              <span className="text-5xl font-black text-white">$9</span>
              <span className="text-zinc-400 font-medium">/ one-time</span>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-center gap-3 text-white font-medium text-sm">
                <Check size={18} className="text-amber-500 shrink-0" /> 75 AI Generation Credits
              </li>
              <li className="flex items-center gap-3 text-white font-medium text-sm">
                <Check size={18} className="text-amber-500 shrink-0" /> 12 Premium Executive Templates
              </li>
              <li className="flex items-center gap-3 text-white font-medium text-sm">
                <Check size={18} className="text-amber-500 shrink-0" /> Unlimited AI Tweaking
              </li>
              <li className="flex items-center gap-3 text-white font-medium text-sm">
                <Check size={18} className="text-amber-500 shrink-0" /> Automated JD Web Scraper
              </li>
              <li className="flex items-center gap-3 text-white font-medium text-sm">
                <Check size={18} className="text-amber-500 shrink-0" /> AI Cover Letter Generator
              </li>
              <li className="flex items-center gap-3 text-white font-medium text-sm">
                <Check size={18} className="text-amber-500 shrink-0" /> LinkedIn Profile Exporter
              </li>
            </ul>
            <Link
              href="/sign-up"
              className="w-full block text-center bg-linear-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:-translate-y-1"
            >
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </section>
      
      {/* --- 6. TECH STACK STRIP --- */}
      <section className="border-y border-zinc-200 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/30 py-10 backdrop-blur-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase mb-6">
            Engineered for speed & scale using
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 dark:opacity-50 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100">
            <span className="text-lg md:text-xl font-extrabold text-zinc-800 dark:text-zinc-300 tracking-tight flex items-center gap-2">
              <span className="text-white bg-black px-1.5 py-0.5 rounded-sm border border-zinc-700 text-sm leading-none">▲</span> Next.js
            </span>
            <span className="text-lg md:text-xl font-extrabold text-zinc-800 dark:text-zinc-300 tracking-tight">
              <span className="text-blue-500">Fast</span>API
            </span>
            <span className="text-lg md:text-xl font-extrabold tracking-tight text-blue-500 dark:text-blue-400">
              PostgreSQL
            </span>
            <span className="text-lg md:text-xl font-extrabold text-zinc-800 dark:text-zinc-300 tracking-tight">
              Prisma
            </span>
            <span className="text-lg md:text-xl font-extrabold text-emerald-500 dark:text-emerald-400 tracking-tight">
              Llama-3
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}