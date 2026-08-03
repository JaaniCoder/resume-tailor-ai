import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from "../components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ATS Resume AI | Land Your Dream Job",
  description: "Bypass the filters and land the interview. Upload your resume, target a job role, and let our proprietary AI rewrite your bullets, optimize your keywords, and generate ATS-friendly PDFs in seconds.",
  keywords: ["Resume AI", "ATS Optimizer", "Cover Letter Generator", "Job Search", "Nextjs", "SaaS"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "ATS Resume AI | Land Your Dream Job",
    description: "Bypass the filters and land the interview. Let our proprietary AI rewrite your bullets and optimize your keywords in seconds.",
    url: "https://your-future-domain.com",
    siteName: "ATS Resume AI",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "ATS Resume AI Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ATS Resume AI | Bypass the ATS",
    description: "AI-powered resume tailoring, ATS scoring, and pixel-perfect PDF generation.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}