import { ResumeData } from "@/types/resume";

export function MinimalistTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="w-198.5 h-280.5 bg-white text-gray-800 font-sans p-12 overflow-hidden shadow-md">
      <header className="mb-10">
        <h1 className="text-5xl font-light text-gray-900 mb-2">{data.personalInfo.name}</h1>
        <h2 className="text-2xl font-medium text-gray-500 mb-4">{data.personalInfo.title}</h2>
        <div className="flex gap-4 text-sm text-gray-400">
          <span>{data.personalInfo.email}</span>•
          <span>{data.personalInfo.phone}</span>•
          <span>{data.personalInfo.location}</span>
        </div>
      </header>

      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-1 text-right">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">About</h3>
        </div>
        <div className="col-span-3">
          <p className="text-sm leading-loose text-gray-600">{data.summary}</p>
        </div>

        <div className="col-span-1 text-right mt-6">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Experience</h3>
        </div>
        <div className="col-span-3 mt-6 flex flex-col gap-8">
          {data.experience.map((exp, i) => (
            <div key={i}>
              <h4 className="text-lg font-medium text-gray-900">{exp.role}</h4>
              <p className="text-sm text-gray-500 mb-3">{exp.company} — {exp.dates}</p>
              <ul className="text-sm text-gray-600 flex flex-col gap-2">
                {exp.points.map((point, j) => <li key={j}>- {point}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="col-span-1 text-right mt-6">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Education</h3>
        </div>
        <div className="col-span-3 mt-6">
           {data.education.map((edu, i) => (
            <div key={i} className="mb-4">
              <h4 className="text-base font-medium text-gray-900">{edu.degree}</h4>
              <p className="text-sm text-gray-500">{edu.school} | {edu.dates}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}