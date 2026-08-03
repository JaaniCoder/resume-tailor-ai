import { create } from 'zustand';

interface ResumeStore {
  resumeData: any | null;
  setResumeData: (data: any) => void;
  clearResumeData: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resumeData: null,
  setResumeData: (data) => set({ resumeData: data }),
  clearResumeData: () => set({ resumeData: null }),
}));