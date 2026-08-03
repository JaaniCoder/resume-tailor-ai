import { ResumeData } from "@/types/resume";

export function SidebarTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="w-198.5 h-280.5 bg-white text-gray-800 font-sans flex overflow-hidden shadow-md">
      {/* Dark Sidebar */}
      <div className="w-70 bg-slate-900 text-slate-300 p-8 flex flex-col">
        <h1 className="text-3xl font-bold text-white mb-2 leading-none">{data.personalInfo.name}</h1>
        <h2 className="text-sm font-medium text-emerald-400 mb-8 uppercase tracking-wider">{data.personalInfo.title}</h2>
        
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Contact</h3>
        <div className="space-y-3 text-sm font-medium mb-10">
          <p className="break-all">{data.personalInfo.email}</p>
          <p>{data.personalInfo.phone}</p>
          <p>{data.personalInfo.location}</p>
        </div>

        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Education</h3>
        <div className="space-y-4 mb-10">
          {data.education.map((edu, i) => (
            <div key={i}>
              <p className="text-sm font-bold text-white mb-1">{edu.degree}</p>
              <p className="text-xs">{edu.school}</p>
              <p className="text-xs text-emerald-400 mt-1 font-semibold">{edu.dates}</p>
            </div>
          ))}
        </div>

        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Skills</h3>
        <div className="flex flex-col gap-2">
          {data.skills.map((skill, i) => (
            <div key={i} className="text-xs bg-slate-800 px-3 py-1.5 rounded text-white font-medium">
              {skill}
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Light Content */}
      <div className="flex-1 p-10 bg-slate-50">
        <div className="mb-10">
          <h3 className="text-2xl font-black text-slate-800 mb-4">About Me</h3>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">{data.summary}</p>
        </div>

        <div>
          <h3 className="text-2xl font-black text-slate-800 mb-6">Work Experience</h3>
          <div className="space-y-8">
            {data.experience.map((exp, i) => (
              <div key={i} className="relative pl-6">
                <div className="absolute w-0.5 h-full bg-slate-200 left-0 top-2"></div>
                <div className="absolute w-2 h-2 bg-emerald-500 rounded-full -left-0.75 top-2 shadow-[0_0_0_4px_#f8fafc]"></div>
                
                <h4 className="font-bold text-lg text-slate-900">{exp.role}</h4>
                <div className="flex gap-2 items-center text-sm mb-3">
                  <span className="font-bold text-slate-700">{exp.company}</span>
                  <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                  <span className="text-emerald-600 font-semibold">{exp.dates}</span>
                </div>
                
                <ul className="text-sm text-slate-600 space-y-1.5 list-none">
                  {exp.points.map((point, j) => (
                    <li key={j} className="relative pl-4">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-slate-300 rounded-sm"></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}