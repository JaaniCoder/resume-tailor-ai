import { ResumeData } from "@/types/resume";

export function EmeraldTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="w-198.5 h-280.5 bg-white text-zinc-800 p-10 overflow-hidden shadow-md font-sans">
      <div className="flex items-center justify-between border-b-2 border-emerald-600 pb-6 mb-6">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tight">{data.personalInfo.name}</h1>
          <h2 className="text-lg font-semibold text-emerald-600 mt-1">{data.personalInfo.title}</h2>
        </div>
        <div className="text-right text-xs font-medium text-zinc-500 space-y-1">
          <p>{data.personalInfo.email}</p>
          <p>{data.personalInfo.phone}</p>
          <p>{data.personalInfo.location}</p>
        </div>
      </div>

      <p className="text-sm text-zinc-700 leading-relaxed font-medium mb-8 bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">{data.summary}</p>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
          <span className="text-emerald-500">❖</span> Experience
        </h3>
        <div className="space-y-6 pl-2">
          {data.experience.map((exp, i) => (
            <div key={i} className="relative border-l-2 border-emerald-100 pl-4">
              <div className="absolute w-2 h-2 bg-emerald-500 rounded-full -left-1.25 top-1.5"></div>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-base text-zinc-900">{exp.role}</h4>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">{exp.dates}</span>
              </div>
              <p className="text-sm font-semibold text-zinc-600 mb-2">{exp.company}</p>
              <ul className="list-disc list-outside ml-4 text-sm text-zinc-600 space-y-1">
                {exp.points.map((point, j) => <li key={j}>{point}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
            <span className="text-emerald-500">❖</span> Education
          </h3>
          <div className="space-y-4 pl-2">
            {data.education.map((edu, i) => (
              <div key={i}>
                <h4 className="font-bold text-sm text-zinc-900">{edu.degree}</h4>
                <p className="text-sm text-zinc-600">{edu.school}</p>
                <p className="text-xs font-medium text-emerald-600 mt-1">{edu.dates}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
            <span className="text-emerald-500">❖</span> Skills
          </h3>
          <div className="flex flex-wrap gap-2 pl-2">
            {data.skills.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-zinc-100 text-zinc-700 text-xs font-semibold rounded-md border border-zinc-200">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}