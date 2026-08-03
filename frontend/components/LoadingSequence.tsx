import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const loadingMessages = [
    "Extracting raw text from uploaded PDF...",
    "Analyzing target role requirements...",
    "Deploying Llama-3 optimization rules...",
    "Injecting industry-specific ATS keywords...",
    "Formatting layout engine..."
];

export default function LoadingSequence() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % loadingMessages.length);
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center py-16 space-y-8 animate-in fade-in duration-700">
            {/* Glowing Spinner */}
            <div className="relative flex items-center justify-center w-24 h-24 bg-emerald-50 dark:bg-emerald-500/10 rounded-full shadow-inner border border-emerald-100 dark:border-emerald-500/20">
                <div className="absolute inset-0 rounded-full bg-emerald-400/20 dark:bg-emerald-500/20 blur-xl animate-pulse" />
                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin relative z-10" />
            </div>

            {/* Animate Text Sequence */}
            <div className="h-8 relative w-full flex justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.p key={currentIndex} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0}} transition={{ duration: 0.4, ease: "easeOut" }} className="absolute text-base md:text-lg font-medium text-zinc-600 dark:text-zinc-300 text-center w-full">
                        {loadingMessages[currentIndex]}
                    </motion.p>
                </AnimatePresence>
            </div>
        </div>
    );
}