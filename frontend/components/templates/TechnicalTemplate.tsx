import { ResumeData } from "@/types/resume";

export function TechnicalTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="w-198.5 h-280.5 bg-slate-900 text-gray-300 font-mono p-10 overflow-hidden shadow-md">
      <div className="border border-green-500 p-6 mb-6 rounded">
        <h1 className="text-3xl font-bold text-green-400 mb-2">{`${data.personalInfo.name.replace(" ", "_")}`}</h1>
        <h2 className="text-lg text-blue-400 mb-4">{`${data.personalInfo.title}`}</h2>
        <div className="text-sm text-gray-400 flex flex-col gap-1">
          <span>{`${data.personalInfo.email}`}</span>
          <span>{`${data.personalInfo.phone}`}</span>
          <span>{`${data.personalInfo.location}`}</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl text-green-400 mb-2 border-b border-slate-700 pb-1">Summary</h3>
        <p className="text-sm leading-relaxed">{data.summary}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl text-green-400 mb-4 border-b border-slate-700 pb-1">Experience</h3>
        <div className="space-y-6">
          {data.experience.map((exp, i) => (
            <div key={i}>
              <div className="flex justify-between text-blue-300 font-bold mb-2">
                <h4>{`${exp.company}`}</h4>
                <span className="text-yellow-200">{exp.dates}</span>
              </div>
              <p className="text-sm text-purple-400 mb-2">{exp.role}</p>
              <ul className="text-sm space-y-1 list-none">
                {exp.points.map((point, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-green-500">{`-`}</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl text-green-400 mb-2 border-b border-slate-700 pb-1">Skills</h3>
        <p className="text-sm text-yellow-300">{data.skills.map(s => `${s}`).join(", ")}</p>
      </div>
    </div>
  );
}