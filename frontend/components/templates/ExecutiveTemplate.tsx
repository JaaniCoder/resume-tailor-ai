import { ResumeData } from "@/types/resume";

export function ExecutiveTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="w-198.5 h-280.5 bg-slate-50 font-sans overflow-hidden shadow-md">
      <div className="bg-slate-800 text-white p-12 pb-8">
        <h1 className="text-4xl font-bold mb-2 tracking-wide">{data.personalInfo.name}</h1>
        <h2 className="text-xl text-slate-300 font-light mb-6">{data.personalInfo.title}</h2>
        <div className="flex justify-between text-sm text-slate-400 border-t border-slate-600 pt-4">
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </div>

      <div className="p-12">
        <p className="text-sm leading-relaxed text-slate-700 font-medium mb-8">{data.summary}</p>

        <h3 className="text-xl font-bold text-slate-800 mb-6 uppercase tracking-wider">Professional Experience</h3>
        <div className="flex flex-col gap-6 mb-8">
          {data.experience.map((exp, i) => (
            <div key={i} className="border-l-2 border-slate-300 pl-4">
              <h4 className="text-lg font-bold text-slate-800">{exp.role}</h4>
              <p className="text-sm text-slate-600 font-semibold mb-2">{exp.company} | {exp.dates}</p>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                {exp.points.map((point, j) => <li key={j}>{point}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4 uppercase tracking-wider">Education</h3>
            {data.education.map((edu, i) => (
              <div key={i}>
                <h4 className="font-bold text-slate-700">{edu.degree}</h4>
                <p className="text-sm text-slate-500">{edu.school} ({edu.dates})</p>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4 uppercase tracking-wider">Core Competencies</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded-full">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}