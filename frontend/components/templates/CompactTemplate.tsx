import { ResumeData } from "@/types/resume";

export function CompactTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="w-198.5 h-280.5 bg-white text-slate-800 font-sans p-8 overflow-hidden shadow-md flex flex-col">
      <header className="border-b-2 border-slate-800 pb-4 mb-4 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-tight text-slate-900 mb-1">{data.personalInfo.name}</h1>
        <h2 className="text-sm font-semibold text-slate-600 mb-2 uppercase tracking-widest">{data.personalInfo.title}</h2>
        <div className="flex justify-center gap-4 text-xs font-medium text-slate-500">
          <span>{data.personalInfo.email}</span>|
          <span>{data.personalInfo.phone}</span>|
          <span>{data.personalInfo.location}</span>
        </div>
      </header>

      <div className="flex gap-6 flex-1">
        {/* Left Column (Wider for Experience) */}
        <div className="w-2/3 flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-bold uppercase border-b border-slate-300 pb-1 mb-2 text-slate-900">Summary</h3>
            <p className="text-xs leading-snug text-justify">{data.summary}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase border-b border-slate-300 pb-1 mb-3 text-slate-900">Experience</h3>
            <div className="space-y-4">
              {data.experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-xs text-slate-900">{exp.role}</h4>
                    <span className="text-[10px] font-semibold text-slate-500">{exp.dates}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 mb-1.5">{exp.company}</p>
                  <ul className="list-disc list-outside ml-3 text-[11px] leading-snug space-y-0.5 text-slate-700 text-justify">
                    {exp.points.map((point, j) => <li key={j}>{point}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Narrow for Edu/Skills) */}
        <div className="w-1/3 flex flex-col gap-4 pl-4 border-l border-slate-200">
          <div>
            <h3 className="text-sm font-bold uppercase border-b border-slate-300 pb-1 mb-3 text-slate-900">Education</h3>
            <div className="space-y-3">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <h4 className="font-bold text-xs text-slate-900 leading-tight">{edu.degree}</h4>
                  <p className="text-[11px] text-slate-700 mt-0.5">{edu.school}</p>
                  <p className="text-[10px] text-slate-500 italic mt-0.5">{edu.dates}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase border-b border-slate-300 pb-1 mb-3 text-slate-900">Core Skills</h3>
            <ul className="flex flex-col gap-1.5">
              {data.skills.map((skill, i) => (
                <li key={i} className="text-xs font-medium text-slate-700 flex items-start gap-1.5">
                  <span className="text-slate-400">▹</span> {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}