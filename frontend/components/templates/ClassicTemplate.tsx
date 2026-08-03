import { ResumeData } from "@/types/resume";

export function ClassicTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="w-198.5 h-280.5 bg-white text-black font-serif p-12 overflow-hidden shadow-md">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold uppercase tracking-wide mb-2">{data.personalInfo.name}</h1>
        <p className="text-sm">
          {data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.location}
        </p>
      </div>

      <div className="mb-6">
        <p className="text-sm leading-relaxed">{data.summary}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase border-b border-black mb-3">Experience</h2>
        <div className="flex flex-col gap-4">
          {data.experience.map((exp, i) => (
            <div key={i}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold">{exp.company}</h3>
                <span className="text-sm">{exp.location || data.personalInfo.location}</span>
              </div>
              <div className="flex justify-between items-baseline italic mb-2">
                <h4>{exp.role}</h4>
                <span className="text-sm">{exp.dates}</span>
              </div>
              <ul className="list-disc list-inside text-sm flex flex-col gap-1 pl-4">
                {exp.points.map((point, j) => <li key={j}>{point}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase border-b border-black mb-3">Education</h2>
        {data.education.map((edu, i) => (
          <div key={i} className="flex justify-between items-baseline mb-2">
            <div>
              <h3 className="font-bold">{edu.school}</h3>
              <p className="italic text-sm">{edu.degree}</p>
            </div>
            <span className="text-sm">{edu.dates}</span>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-bold uppercase border-b border-black mb-3">Skills</h2>
        <p className="text-sm">{data.skills.join(", ")}</p>
      </div>
    </div>
  );
}