import { ResumeData } from "@/types/resume";

export function StartupTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="w-[794px] h-[1122px] bg-white text-black font-sans p-10 border-l-[16px] border-yellow-400 overflow-hidden shadow-md">
      <header className="mb-8 border-b-4 border-black pb-6">
        <h1 className="text-6xl font-black uppercase tracking-tighter leading-none mb-2">{data.personalInfo.name}</h1>
        <h2 className="text-2xl font-bold text-gray-600">{data.personalInfo.title}</h2>
      </header>

      <div className="flex gap-8 mb-8 text-sm font-bold bg-gray-100 p-4">
        <span>{data.personalInfo.email}</span>
        <span>{data.personalInfo.phone}</span>
        <span>{data.personalInfo.location}</span>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-black uppercase mb-2">Summary</h3>
        <p className="text-base font-medium leading-relaxed">{data.summary}</p>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-black uppercase mb-4">Experience</h3>
        <div className="space-y-6">
          {data.experience.map((exp, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-2 bg-black text-white p-2">
                <h4 className="font-bold text-lg">{exp.role} @ {exp.company}</h4>
                <span className="text-sm font-mono">{exp.dates}</span>
              </div>
              <ul className="list-square list-inside text-sm space-y-1 ml-2">
                {exp.points.map((point, j) => <li key={j}> {point}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-black uppercase mb-4">Tech Stack</h3>
        <p className="text-base font-bold leading-relaxed">{data.skills.join("  /  ")}</p>
      </div>
    </div>
  );
}