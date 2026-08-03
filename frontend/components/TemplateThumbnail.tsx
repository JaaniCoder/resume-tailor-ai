import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

export function TemplateThumbnail({ children, name, isSelected, onClick }: Props) {
  return (
    <button
      type="button" // CRITICAL: Prevents the button from triggering the form submit
      onClick={onClick}
      className="flex flex-col items-center group cursor-pointer focus:outline-none w-[200px]"
    >
      <div className={`
        relative w-[198.5px] h-[280.5px] overflow-hidden rounded-xl transition-all duration-200 border-2
        ${isSelected 
          ? 'border-emerald-500 ring-4 ring-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-105 z-10' 
          : 'border-zinc-300 dark:border-zinc-700 shadow-sm hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-md'}
      `}>
        
        {/* The scaling div - We force bg-white here so the template stays bright in dark mode */}
        <div className="absolute top-0 left-0 origin-top-left scale-[0.25] select-none pointer-events-none bg-white">
          {children}
        </div>
        
        {/* Invisible overlay ensures the entire card is clickable */}
        <div className="absolute inset-0 z-20 bg-transparent"></div>
      </div>
      
      {/* Updated Text Colors for Dark Mode */}
      <p className={`mt-4 font-bold text-sm transition-colors ${
        isSelected 
          ? 'text-emerald-600 dark:text-emerald-400' 
          : 'text-zinc-600 dark:text-zinc-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-300'
      }`}>
        {name}
      </p>
    </button>
  );
}