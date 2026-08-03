"use client";
import { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { TemplateSelector } from "@/components/TemplateSelector";
import { useResumeStore } from "../../store/useResumeStore";
import { RenderTemplate } from "@/components/RenderTemplate";
import {
  Briefcase,
  FileText,
  Loader2,
  History,
  PlusCircle,
  Moon,
  Sun,
  Zap,
  Settings2,
  ChevronDown,
  Bot,
  Send,
  Sparkles,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import LoadingSequence from "@/components/LoadingSequence";
import {
  saveResume,
  getUserResumes,
  syncUserAndGetCredits,
  deductCredit,
  getMasterResumeUrl,
  saveMasterResumeUrl,
  deleteUserResume,
} from "../actions";
import confetti from "canvas-confetti";
import { UploadDropzone } from "@/utils/uploadthing";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"create" | "history" | "analytics">("create");
  const [file, setFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [isGeneratingCL, setIsGeneratingCL] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [showCLModal, setShowCLModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [credits, setCredits] = useState<number | null>(null);
  const [customSkills, setCustomSkills] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isTweaking, setIsTweaking] = useState(false);
  const [chatHistory, setChatHistory] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([]);
  const [masterUrl, setMasterUrl] = useState<string | null>(null);
  const [useMaster, setUseMaster] = useState(false);

  const { resumeData, setResumeData } = useResumeStore();
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const { theme, setTheme } = useTheme();
  const [isProUser, setIsProUser] = useState(false);

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // LinkedIn States
  const [linkedinText, setLinkedinText] = useState<string | null>(null);
  const [isGeneratingLI, setIsGeneratingLI] = useState(false);
  const [showLIModal, setShowLIModal] = useState(false);
  const [copiedLI, setCopiedLI] = useState(false);
  const [liError, setLiError] = useState("");

  // Scraper States
  const [jobUrl, setJobUrl] = useState("");
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeError, setScrapeError] = useState("");

  const FREE_TEMPLATES = ["modern", "classic", "minimalist"];

  const handleTemplateChange = (templateId: string) => {
    if (!FREE_TEMPLATES.includes(templateId) && !isProUser) {
      setShowUpgradeModal(true);
      return;
    }
    setSelectedTemplate(templateId);
  };

  useEffect(() => {
    setIsMounted(true);
    loadHistory();
    loadCredits();
    loadMasterResume();
  }, []);

  useEffect(() => {
    if (resumeData?.ats_insights?.match_score >= 80) {
      const duration = 3000;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#10b981", "#06b6d4", "#ffffff"],
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [resumeData]);

  const loadHistory = async () => {
    const result = await getUserResumes();
    if (result.success && result.resumes) setHistory(result.resumes);
  };

  const loadCredits = async () => {
    const result = (await syncUserAndGetCredits()) as {
      success: boolean;
      credits: number;
      isPro?: boolean;
    };
    if (result.success) {
      setCredits(result.credits);
      setIsProUser(result.isPro === true || result.credits > 10);
    }
  };

  const loadMasterResume = async () => {
    const res = await getMasterResumeUrl();
    if (res.success && res.url) {
      setMasterUrl(res.url);
      setUseMaster(true);
    }
  };

  const handleGenerateCoverLetter = async () => {
    if (!resumeData) return;
    setIsGeneratingCL(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/generate-cover-letter",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            target_role: targetRole,
            company_name: companyName || "Hiring Manager",
            job_description: jobDescription,
            resume_json: resumeData,
          }),
        },
      );

      const result = await response.json();
      if (response.ok && result.cover_letter) {
        setCoverLetter(result.cover_letter);
      } else {
        alert("Failed to generate cover letter.");
      }
    } catch {
      alert("Network error while generating cover letter.");
    } finally {
      setIsGeneratingCL(false);
    }
  };

  const handleGenerateLinkedIn = async () => {
    if (!resumeData) return;
    setIsGeneratingLI(true);
    setLiError(""); // Reset errors
    setShowLIModal(true); 

    try {
      const response = await fetch("http://127.0.0.1:8000/api/generate-linkedin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume_json: resumeData }),
      });

      const result = await response.json();
      if (response.ok && result.linkedin_text) {
        setLinkedinText(result.linkedin_text);
      } else {
        setLiError(result.detail || "Failed to generate LinkedIn profile.");
      }
    } catch {
      setLiError("Network error. Is your FastAPI backend running?");
    } finally {
      setIsGeneratingLI(false);
    }
  };

  const onUpgrade = async () => {
    try {
      const response = await fetch("/api/checkout", { method: "POST" });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error("Payment redirects failed:", error);
    }
  };

  const handleScrapeJD = async () => {
    if (!jobUrl.trim()) return;
    setIsScraping(true);
    setScrapeError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/scrape-jd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: jobUrl }),
      });
      const data = await response.json();

      if (response.ok) {
        setJobDescription(data.text);
        setJobUrl("");
      } else {
        setScrapeError(data.detail || "Failed to fetch URL.");
      }
    } catch {
      setScrapeError("Network error. Is your backend running?");
    } finally {
      setIsScraping(false);
    }
  }

  const generateResume = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetRole.trim()) return setError("Please enter a target job role.");
    if (credits !== null && credits <= 0)
      return setError(
        "You are out of credits! Upgrade to Pro to generate more resumes.",
      );

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("target_role", targetRole);
    formData.append("job_description", jobDescription);
    formData.append("custom_skills", customSkills);
    formData.append("custom_instructions", customInstructions);

    if (useMaster && masterUrl) {
      formData.append("file_url", masterUrl);
    } else if (file) {
      formData.append("file", file);
    } else {
      setLoading(false);
      return setError("Please provide a PDF resume or use your Master Resume.");
    }

    try {
      const [response] = await Promise.all([
        fetch("http://127.0.0.1:8000/api/generate-resume", {
          method: "POST",
          body: formData,
        }),
        new Promise((resolve) => setTimeout(resolve, 4500)),
      ]);

      const result = await response.json();

      if (response.ok) {
        // DEDUCT CREDIT ONLY ON SUCCESS
        const creditCheck = await deductCredit();
        if (!creditCheck.success) {
          setError(creditCheck.error || "Failed to process credit.");
          setLoading(false);
          return;
        }

        setCredits((prev) => (prev !== null ? prev - 1 : null));
        setResumeData(result.data);

        const payloadToSave = {
          ...result.data,
          template_used: selectedTemplate,
        };
        await saveResume(targetRole, JSON.stringify(payloadToSave));
        await loadHistory();
      } else {
        setError(result.detail || "Failed to generate resume.");
      }
    } catch {
      setError("Network error. Make sure your FastAPI backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // --- AI TWEAKING (Charges 1 Credit on Success) ---
  const handleTweakSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !resumeData || isTweaking) return;

    if (credits !== null && credits <= 0) {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "You are out of credits! Upgrade to Pro to tweak your resume.",
        },
      ]);
      return;
    }

    const userMessage = chatInput.trim();
    setChatInput("");
    setIsTweaking(true);
    setChatHistory((prev) => [...prev, { role: "user", text: userMessage }]);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/tweak-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          current_json: resumeData,
          user_instruction: userMessage,
        }),
      });

      const result = await response.json();

      if (response.ok && result.data) {
        // Only deduct a credit if they are NOT a Pro User
        if (!isProUser) {
          const creditCheck = await deductCredit();
          if (!creditCheck.success) {
            setChatHistory((prev) => [
              ...prev,
              {
                role: "assistant",
                text: creditCheck.error || "Failed to process credit.",
              },
            ]);
            setIsTweaking(false);
            return;
          }
          setCredits((prev) => (prev !== null ? prev - 1 : null));
        }
        setResumeData(result.data);
        setChatHistory((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "Updated your resume! Check out the live preview.",
          },
        ]);

        const payloadToSave = {
          ...result.data,
          template_used: selectedTemplate,
        };
        await saveResume(targetRole, JSON.stringify(payloadToSave));
      } else {
        setChatHistory((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "Failed to apply edits. Please try rephrasing.",
          },
        ]);
      }
    } catch {
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", text: "Network error. Check backend server." },
      ]);
    } finally {
      setIsTweaking(false);
    }
  };

  const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

  // --- NATIVE REACT-TO-PRINT SETUP ---
  const resumeRef = useRef<HTMLDivElement>(null);
  const downloadHighResPDF = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: `ATS_Resume_${targetRole.replace(/\s+/g, "_")}`,
  });

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans flex flex-col items-center p-6 pt-24 transition-colors">
      {/* Header / Nav */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center max-w-4xl w-full mx-auto">
        <div className="flex bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1 rounded-xl gap-1 shadow-sm">
          <button
            onClick={() => setActiveTab("create")}
            className={`flex items-center gap-2 px-4 cursor-pointer py-2 text-sm font-medium rounded-lg transition-all ${activeTab === "create" ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"}`}
          >
            <PlusCircle size={16} /> Builder
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex items-center gap-2 px-4 cursor-pointer py-2 text-sm font-medium rounded-lg transition-all ${activeTab === "history" ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"}`}
          >
            <History size={16} /> History
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-2 px-4 cursor-pointer py-2 text-sm font-medium rounded-lg transition-all ${activeTab === "analytics" ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"}`}
          >
            <TrendingUp size={16} /> Analytics
          </button>
        </div>
        <div className="flex items-center gap-4">
          {!isProUser && (
            <button
              onClick={onUpgrade}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-linear-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-full shadow-sm transition-all cursor-pointer animate-in fade-in"
            >
              <Sparkles size={14} className="fill-white" />
              <span className="text-xs font-bold tracking-wider">UPGRADE</span>
            </button>
          )}
          
          {isProUser && (
            <div className="px-3 py-1.5 bg-linear-to-r from-amber-400 to-orange-500 text-white rounded-full shadow-sm flex items-center gap-1 cursor-default animate-in fade-in zoom-in">
              <Sparkles size={14} className="fill-white" />
              <span className="text-xs font-bold tracking-wider">PRO</span>
            </div>
          )}

          {/* Credit Badge */}
          {credits !== null && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full shadow-sm">
              <Zap
                size={14}
                className={
                  credits > 0
                    ? "text-amber-500 fill-amber-500"
                    : "text-zinc-400"
                }
              />
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                {credits} Credits
              </span>
            </div>
          )}

          {/* Theme Toggle & User Button */}
          {isMounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 cursor-pointer rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 transition-all shadow-sm"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full p-1 shadow-sm">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>

      <div
        className={`w-full ${!resumeData && activeTab === "create" ? "max-w-2xl" : "max-w-6xl"} bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-12 shadow-xl backdrop-blur-sm mt-4 transition-colors`}
      >
        {activeTab === "create" ? (
          <>
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                ATS{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">
                  Resume AI
                </span>
              </h1>
            </div>

            {!resumeData ? (
              loading ? (
                <LoadingSequence />
              ) : (
                <form onSubmit={generateResume} className="space-y-6">
                  {/* Target Role & JD Matcher */}
                  <div className="space-y-4 bg-white dark:bg-zinc-900/40 p-5 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
                    <div className="space-y-2">
                      <label className="text-sm font-bold flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
                        <Briefcase size={16} className="text-emerald-500" />{" "}
                        Target Job Role <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        placeholder="e.g., Senior Full Stack Developer"
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/50 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-bold flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
                          <FileText size={16} className="text-indigo-500" />{" "}
                          Target Job Description <span className="text-xs text-zinc-400 font-normal">(Optional)</span>
                        </label>
                      </div>

                      {/* NEW: URL Scraper Input */}
                      <div className="flex flex-col gap-2 p-3 bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/10 rounded-xl">
                        <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">⚡ Auto-Fill via URL</p>
                        <div className="flex gap-2">
                          <input
                            type="url"
                            value={jobUrl}
                            onChange={(e) => setJobUrl(e.target.value)}
                            placeholder="https://company.com/job-posting"
                            className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500/50 text-zinc-900 dark:text-zinc-100"
                          />
                          <button
                            type="button"
                            onClick={handleScrapeJD}
                            disabled={isScraping || !jobUrl}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                          >
                            {isScraping ? <Loader2 size={16} className="animate-spin" /> : "Fetch"}
                          </button>
                        </div>
                        {scrapeError && <p className="text-xs text-red-500 font-medium">{scrapeError}</p>}
                      </div>

                      <div className="relative flex items-center py-2">
                        <div className="grow border-t border-zinc-200 dark:border-zinc-800"></div>
                        <span className="shrink-0 px-3 text-xs text-zinc-400 font-semibold uppercase">Or paste text</span>
                        <div className="grow border-t border-zinc-200 dark:border-zinc-800"></div>
                      </div>

                      <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the job description here. The AI will extract keywords and tailor your resume bullets to match..."
                        rows={3}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500/50 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Template Picker */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold flex items-center gap-2">
                      <FileText size={16} className="text-emerald-500" /> Design
                      Template (Top 3 are Free!)
                    </label>
                    <div className="w-full overflow-x-auto pb-4 snap-x border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950/50 p-4">
                      <div className="w-max">
                        <TemplateSelector
                          selectedTemplate={selectedTemplate}
                          onSelect={handleTemplateChange}
                        />
                      </div>
                    </div>

                    
                  </div>

                  {/* Upload / Master Resume */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold flex items-center gap-2">
                        <FileText size={16} className="text-cyan-500" /> Current
                        Resume
                      </label>
                      {masterUrl && (
                        <button
                          type="button"
                          onClick={() => setUseMaster(!useMaster)}
                          className="text-xs font-semibold cursor-pointer text-emerald-500 hover:underline"
                        >
                          {useMaster
                            ? "Upload new file"
                            : "Use Cloud Master Resume"}
                        </button>
                      )}
                    </div>

                    {useMaster && masterUrl ? (
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-emerald-500 text-white rounded-lg">
                            <Sparkles size={18} />
                          </div>
                          <div>
                            <p className="text-xs font-bold">
                              Master Resume Synced
                            </p>
                            <p className="text-[11px] text-zinc-500">
                              Stored securely
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] bg-emerald-500 text-white font-bold px-2 py-1 rounded-md">
                            Active
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setMasterUrl(null);
                              setUseMaster(false);
                            }}
                            className="p-1.5 text-red-500 hover:bg-red-500/20 rounded-md cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-2 transition-all">
                        <UploadDropzone
                          endpoint="pdfUploader"
                          appearance={{
                            container: {
                              border: "none",
                              background: "transparent",
                              padding: "2rem",
                              cursor: "pointer",
                            },
                            label: {
                              color: "#10b981",
                              fontWeight: "600",
                              fontSize: "1.1rem",
                            },
                            allowedContent: {
                              color: "#71717a",
                              marginBottom: "1rem",
                            },
                            button: {
                              background: "#10b981",
                              color: "white",
                              padding: "0.5rem 1.5rem",
                              borderRadius: "0.75rem",
                              fontWeight: "bold",
                              cursor: "pointer",
                              transition: "all 0.2s",
                            },
                          }}
                          onClientUploadComplete={async (res) => {
                            if (res && res[0]) {
                              await saveMasterResumeUrl(res[0].url);
                              setMasterUrl(res[0].url);
                              setUseMaster(true);
                              setError("");
                            }
                          }}
                          onUploadError={(error: Error) => {
                            setError(`Upload Failed: ${error.message}`);
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
                      {error}
                    </div>
                  )}

                  {/* Advanced Settings */}
                  <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900/50">
                    <button
                      type="button"
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="w-full px-4 py-3 flex items-center justify-between text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Settings2 size={16} className="text-indigo-500" />{" "}
                        Advanced AI Tweaks
                      </div>
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${showAdvanced ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={`px-4 space-y-4 overflow-hidden transition-all ${showAdvanced ? "max-h-96 py-4 border-t border-zinc-200 dark:border-zinc-800" : "max-h-0"}`}
                    >
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold">
                          Force Include Skills
                        </label>
                        <input
                          type="text"
                          value={customSkills}
                          placeholder="Next.js, FastAPI, Cassandra"
                          onChange={(e) => setCustomSkills(e.target.value)}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500/50"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold">
                          Custom Instructions
                        </label>
                        <textarea
                          value={customInstructions}
                          onChange={(e) =>
                            setCustomInstructions(e.target.value)
                          }
                          rows={2}
                          placeholder="Your custom instructions for your resume tweak"
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500/50 resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {credits !== null && credits <= 0 ? (
                    <div className="p-6 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 rounded-2xl text-center shadow-inner">
                      <h3 className="text-lg font-bold mb-1">
                        Out of Free Credits!
                      </h3>
                      <button
                        type="button"
                        onClick={onUpgrade}
                        className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2"
                      >
                        <Zap size={18} className="fill-white" /> Upgrade to Pro
                        ($9)
                      </button>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-zinc-900 dark:bg-zinc-100 text-white cursor-pointer dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-white font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98] disabled:opacity-50"
                    >
                      Generate ATS Resume
                    </button>
                  )}
                </form>
              )
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 max-w-5xl mx-auto">
                {/* Two Column Result View */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-8">
                  {/* LEFT COL: ATS Insights & Chatbot */}
                  <div className="space-y-6">
                    {/* ATS Score & Keyword Insights */}
                    {resumeData.ats_insights && (
                      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-4 animate-in fade-in slide-in-from-left-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-bold dark:text-white flex items-center gap-2">
                              <Zap size={16} className={resumeData.ats_insights.match_score >= 80 ? "text-emerald-500 fill-emerald-500" : "text-amber-500 fill-amber-500"} /> 
                              ATS Match Score
                            </h4>
                            <p className="text-[11px] text-zinc-500 mt-1">
                              Based on industry standards & target JD
                            </p>
                          </div>
                          
                          {/* Animated Radial SVG Progress Bar */}
                          <div className="relative w-16 h-16 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-zinc-100 dark:text-zinc-800" />
                              <circle 
                                cx="50" cy="50" r="40" 
                                stroke="currentColor" strokeWidth="8" fill="transparent" 
                                strokeDasharray={251.2} 
                                strokeDashoffset={251.2 - (251.2 * (resumeData.ats_insights.match_score || 0)) / 100} 
                                className={`${resumeData.ats_insights.match_score >= 80 ? 'text-emerald-500' : resumeData.ats_insights.match_score >= 60 ? 'text-amber-500' : 'text-red-500'} transition-all duration-1500 ease-out`} 
                                strokeLinecap="round"
                              />
                            </svg>
                            <span className="absolute text-sm font-black dark:text-white">
                              {resumeData.ats_insights.match_score}%
                            </span>
                          </div>
                        </div>

                        {/* Keyword Chips */}
                        <div className="space-y-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/50">
                          {resumeData.ats_insights.matched_keywords?.length > 0 && (
                            <div>
                              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                                Keywords Optimized
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {resumeData.ats_insights.matched_keywords.slice(0, 8).map((kw: string, i: number) => (
                                  <span key={i} className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] rounded-full font-semibold border border-emerald-200 dark:border-emerald-500/20">
                                    {kw}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {resumeData.ats_insights.missing_keywords_added?.length > 0 && (
                            <div className="pt-2">
                              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                                AI Added Missing Skills
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {resumeData.ats_insights.missing_keywords_added.slice(0, 6).map((kw: string, i: number) => (
                                  <span key={i} className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] rounded-full font-semibold border border-indigo-200 dark:border-indigo-500/20">
                                    + {kw}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Chatbot Editor */}
                    <div className="bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-4">
                      <div className="flex items-center gap-2 border-b border-zinc-200 pb-3">
                        <div className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg">
                          <Bot size={18} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold dark:text-white">
                            AI Copilot Editor
                          </h4>
                          <p className="text-[11px] text-zinc-500">
                            {isProUser
                              ? "Unlimited AI Tweaks (PRO)"
                              : "1 Credit per successful tweak."}
                          </p>
                        </div>
                      </div>
                      <div className="max-h-64 overflow-y-auto space-y-2 text-xs pr-1">
                        <div className="bg-zinc-200/50 dark:bg-zinc-900 p-2.5 rounded-lg">
                          👋 Need to tweak anything? Tell me what to change!
                        </div>
                        {chatHistory.map((msg, idx) => (
                          <div
                            key={idx}
                            className={`p-2.5 rounded-lg max-w-[90%] ${msg.role === "user" ? "bg-emerald-500 text-white ml-auto text-right" : "bg-zinc-200/50 dark:bg-zinc-900 mr-auto"}`}
                          >
                            {msg.text}
                          </div>
                        ))}
                        {isTweaking && (
                          <div className="flex items-center gap-2 text-zinc-400 italic text-xs p-1">
                            <Loader2 size={12} className="animate-spin" />{" "}
                            Rewriting JSON payload...
                          </div>
                        )}
                      </div>
                      <form
                        onSubmit={handleTweakSubmit}
                        className="flex gap-2 pt-1"
                      >
                        <input
                          type="text"
                          placeholder="e.g. 'Add Docker to skills'"
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          disabled={isTweaking}
                          className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500/50"
                        />
                        <button
                          type="submit"
                          disabled={isTweaking || !chatInput.trim()}
                          className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl cursor-pointer disabled:opacity-50"
                        >
                          <Send size={14} />
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* RIGHT COL: Native PDF Render & Download */}
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 rounded-xl p-3 shadow-sm">
                      <span className="text-sm font-bold">Live Template:</span>
                      <select
                        value={selectedTemplate}
                        onChange={(e) => handleTemplateChange(e.target.value)}
                        className="bg-white dark:bg-zinc-950 border border-zinc-300 cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium"
                      >
                        {/* Free */}
                        <option value="modern">The Modern</option>
                        <option value="classic">The Classic</option>
                        <option value="minimalist">The Minimalist</option>
                        {/* Pro */}
                        <option value="executive">The Executive (PRO)</option>
                        <option value="startup">The Startup (PRO)</option>
                        <option value="creative">The Creative (PRO)</option>
                        <option value="elegant">The Elegant (PRO)</option>
                        <option value="technical">The Technical (PRO)</option>
                        <option value="academic">The Academic (PRO)</option>
                        <option value="timeline">The Timeline (PRO)</option>
                        <option value="compact">The Compact (PRO)</option>
                        <option value="ruby">The Ruby (PRO)</option>
                        <option value="emerald">The Emerald (PRO)</option>
                        <option value="consultant">The Consultant (PRO)</option>
                        <option value="sidebar">The Sidebar (PRO)</option>
                      </select>
                    </div>

                    

                    {/* Scale Preview */}
                    <div className="w-full h-150 md:h-200 rounded-2xl overflow-y-auto overflow-x-hidden border border-zinc-200 dark:border-zinc-800 shadow-inner bg-zinc-200 dark:bg-zinc-800/80 flex justify-center relative">
                      <div className="absolute top-4 origin-top scale-[0.45] md:scale-[0.65] pb-32">
                        <div className="bg-white shadow-2xl transition-all">
                          {isMounted ? (
                            <div
                              className="relative bg-white shadow-2xl"
                              style={{ width: "794px" }}
                            >
                              <RenderTemplate
                                templateId={selectedTemplate}
                                data={resumeData}
                              />

                              {/* Visual Indicator for Bottom of Page 1 (A4 Height is 1122px) */}
                              <div
                                className="absolute left-0 w-full border-b-2 border-dashed border-red-500 z-50 pointer-events-none"
                                style={{ top: "1122px" }}
                              >
                                <span className="absolute -bottom-4 right-2 text-red-600 font-bold text-xs bg-red-50 px-2 py-1 rounded shadow-sm border border-red-200 uppercase tracking-widest">
                                  ↑ End of Page 1 ↑
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div
                              className="flex items-center justify-center bg-white"
                              style={{ width: "794px", height: "1122px" }}
                            >
                              <Loader2
                                className="animate-spin text-zinc-400"
                                size={40}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Hidden Native Print Container */}
                    <div style={{ display: "none" }}>
                      <div ref={resumeRef}>
                        <RenderTemplate
                          templateId={selectedTemplate}
                          data={resumeData}
                        />
                      </div>
                    </div>

                    {isMounted && (
                      <button
                        onClick={() => downloadHighResPDF()}
                        className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 cursor-pointer font-bold py-4 rounded-xl shadow-lg hover:bg-zinc-800 dark:hover:bg-white transition-all active:scale-[0.98]"
                      >
                        Download ATS-Friendly PDF
                      </button>
                    )}

                    {/* Action Buttons (Cover Letter & LinkedIn) */}
                    {isMounted && resumeData && (
                      <div className="flex gap-3 mt-3">
                        <button
                          onClick={() => setShowCLModal(true)}
                          className="flex-1 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Sparkles size={18}/> Cover Letter
                        </button>
                        
                        <button
                          onClick={() => {
                            if (!linkedinText) handleGenerateLinkedIn();
                            else setShowLIModal(true);
                          }}
                          className="flex-1 bg-[#0A66C2] hover:bg-[#084e96] text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <LinkedinIcon size={18}/> LinkedIn Export
                        </button>
                      </div>
                    )}

                    {/* LinkedIn Modal */}
                    {showLIModal && (
                      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] flex flex-col">
                          <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-3">
                            <h3 className="text-lg font-bold flex items-center gap-2 text-zinc-900 dark:text-white">
                              <LinkedinIcon className="text-[#0A66C2]" size={20}/> LinkedIn Profile Generator
                            </h3>
                            <button onClick={() => setShowLIModal(false)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 font-bold cursor-pointer">✕</button>
                          </div>

                          {liError ? (
                            <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                              <div className="p-4 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-full mb-2">
                                <span className="font-black text-2xl">!</span>
                              </div>
                              <p className="text-sm font-bold text-red-500">{liError}</p>
                              <button 
                                onClick={handleGenerateLinkedIn} 
                                className="mt-2 px-6 py-2.5 bg-zinc-100 hover:bg-zinc-200 cursor-pointer dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl text-sm font-bold transition-all"
                              >
                                Try Again
                              </button>
                            </div>
                          ) : isGeneratingLI ? (
                            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                              <Loader2 className="animate-spin text-[#0A66C2]" size="{40}"/>
                              <p className="text-sm font-semibold text-zinc-500">Formatting for LinkedIn...</p>
                            </div>
                          ) : (
                            <div className="space-y-4 flex-1 flex flex-col overflow-hidden">
                              <textarea
                                readOnly
                                value={linkedinText || ""}
                                className="w-full flex-1 min-h-100 p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-sans leading-relaxed resize-none focus:outline-none dark:text-zinc-200"
                              />
                              <div className="flex gap-3">
                                <button
                                  onClick={() => { 
                                    if (linkedinText) {
                                      navigator.clipboard.writeText(linkedinText); 
                                      setCopiedLI(true);
                                      setTimeout(() => setCopiedLI(false), 2000);
                                    }
                                  }}
                                  className={`flex-1 font-bold py-2.5 rounded-xl text-sm cursor-pointer transition-all duration-300 ${
                                    copiedLI 
                                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                                      : "bg-[#0A66C2] hover:bg-[#084e96] text-white"
                                  }`}
                                >
                                  {copiedLI ? "Copied! Ready to paste ✓" : "Copy to Clipboard"}
                                </button>
                                <button
                                  onClick={handleGenerateLinkedIn}
                                  className="px-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-semibold py-2.5 rounded-xl text-sm cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                >
                                  Regenerate
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Cover Letter Modal */}
                    {showCLModal && (
                      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] flex flex-col">
                          <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-3">
                            <h3 className="text-lg font-bold flex items-center gap-2 text-zinc-900 dark:text-white">
                              <Sparkles className="text-indigo-500" size={20} />{" "}
                              AI Cover Letter Generator
                            </h3>
                            <button
                              onClick={() => setShowCLModal(false)}
                              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 font-bold cursor-pointer"
                            >
                              ✕
                            </button>
                          </div>

                          {!coverLetter ? (
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                  Company / Recipient Name (Optional)
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g. Google or Hiring Team"
                                  value={companyName}
                                  onChange={(e) =>
                                    setCompanyName(e.target.value)
                                  }
                                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm"
                                />
                              </div>
                              <button
                                onClick={handleGenerateCoverLetter}
                                disabled={isGeneratingCL}
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all flex justify-center items-center gap-2 cursor-pointer disabled:opacity-50"
                              >
                                {isGeneratingCL ? (
                                  <Loader2 className="animate-spin" size={18} />
                                ) : (
                                  "Draft Cover Letter"
                                )}
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-4 flex-1 flex flex-col overflow-hidden">
                              <textarea
                                readOnly
                                value={coverLetter}
                                className="w-full flex-1 min-h-75 p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-sans leading-relaxed resize-none focus:outline-none dark:text-zinc-200"
                              />
                              <div className="flex gap-3">
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(coverLetter);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                  }}
                                  className={`flex-1 font-bold py-2.5 rounded-xl text-sm cursor-pointer transition-all duration-300 ${
                                    copied
                                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                                      : "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950"
                                  }`}
                                >
                                  {copied
                                    ? "Copied to Clipboard! ✓"
                                    : "Copy to Clipboard"}
                                </button>
                                <button
                                  onClick={() => setCoverLetter(null)}
                                  className="px-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-semibold py-2.5 rounded-xl text-sm cursor-pointer"
                                >
                                  Regenerate
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setResumeData(null)}
                  className="text-sm text-zinc-500 hover:text-zinc-900 mt-8 cursor-pointer font-medium block mx-auto"
                >
                  ← Create Another Resume
                </button>
              </div>
            )}
          </>
        ) : activeTab === "analytics" ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 max-w-5xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-2">Performance Analytics</h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">Track your job search momentum and ATS performance.</p>
            </div>

            {history.length === 0 ? (
              <div className="text-center py-12 text-zinc-400 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900/30">
                <TrendingUp size={40} className="mx-auto mb-3 opacity-40" />
                <p className="text-sm">Generate some resumes to see your analytics!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Top Stat Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Stat 1: Total Generations */}
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center mb-4">
                      <FileText size={24} />
                    </div>
                    <h3 className="text-4xl font-black text-zinc-900 dark:text-white mb-1">{history.length}</h3>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Total Resumes</p>
                  </div>

                  {/* Stat 2: Average ATS Score */}
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                      <Zap size={24} className="fill-emerald-500" />
                    </div>
                    <h3 className="text-4xl font-black text-zinc-900 dark:text-white mb-1">
                      {Math.round(
                        history
                          .map((h) => h.jsonData?.ats_insights?.match_score || 0)
                          .filter((score) => score > 0)
                          .reduce((a, b, _, arr) => a + b / arr.length, 0) || 0
                      )}%
                    </h3>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Average Match Score</p>
                  </div>

                  {/* Stat 3: Unique Roles */}
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 bg-purple-50 dark:bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center mb-4">
                      <Briefcase size={24} />
                    </div>
                    <h3 className="text-4xl font-black text-zinc-900 dark:text-white mb-1">
                      {Array.from(new Set(history.map((h) => h.targetRole))).length}
                    </h3>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Roles Targeted</p>
                  </div>
                </div>

                {/* Recent Scores Timeline */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                  <h4 className="text-sm font-bold mb-4 text-zinc-900 dark:text-white">Recent Match Scores</h4>
                  <div className="space-y-4">
                    {history.slice(0, 5).map((item, idx) => {
                      const score = item.jsonData?.ats_insights?.match_score || 0;
                      return (
                        <div key={idx} className="flex items-center gap-4">
                          <p className="w-1/3 text-xs font-semibold text-zinc-600 dark:text-zinc-300 truncate">
                            {item.targetRole || "Untitled"}
                          </p>
                          <div className="flex-1 h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                              style={{ width: `${score}%` }}
                            />
                          </div>
                          <span className="w-8 text-right text-xs font-bold text-zinc-500">{score}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                Saved Generations
              </h2>
            </div>
            {history.length === 0 ? (
              <div className="text-center py-12 text-zinc-400 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900/30">
                <History size={40} className="mx-auto mb-3 opacity-40" />
                <p className="text-sm">No saved resumes.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-emerald-300 dark:hover:border-emerald-700 transition-all shadow-sm"
                  >
                    <div>
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {item.targetRole || "Untitled Resume"}
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setResumeData(item.jsonData);
                          setSelectedTemplate(
                            item.jsonData.template_used || "modern",
                          );
                          setActiveTab("create");
                        }}
                        className="px-4 py-2 cursor-pointer bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold text-sm border border-emerald-200 dark:border-emerald-500/20 rounded-lg transition-all shadow-sm"
                      >
                        View & Download
                      </button>

                      <button
                        onClick={async () => {
                          if (
                            confirm(
                              "Are you sure you want to delete this saved resume?",
                            )
                          ) {
                            const res = await deleteUserResume(item.id);
                            if (res.success) loadHistory();
                            else alert(res.error || "Failed to delete resume.");
                          }
                        }}
                        className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all border border-transparent hover:border-red-200 dark:hover:border-red-900 cursor-pointer"
                        title="Delete Resume"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {/* Pro Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-md w-full p-8 text-center shadow-2xl relative">
            <button onClick={() => setShowUpgradeModal(false)} className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 font-bold cursor-pointer">✕</button>
            
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
              <Sparkles size={32} className="text-amber-500 fill-amber-500" />
            </div>
            
            <h3 className="text-2xl font-black mb-3 text-zinc-900 dark:text-white">Unlock Pro Templates</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
              Upgrade to Premium to instantly unlock 12 exclusive ATS-optimized designs, unlimited AI tweaking, and 75 generation credits.
            </p>
            
            <button
              onClick={onUpgrade}
              className="w-full bg-linear-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
            >
              <Zap size={18} className="fill-white" /> Upgrade to Pro ($9)
            </button>
            <button onClick={() => setShowUpgradeModal(false)} className="mt-5 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 font-semibold cursor-pointer">
              Maybe later
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
