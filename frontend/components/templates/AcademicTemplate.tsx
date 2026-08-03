import { ResumeData } from "@/types/resume";

export function AcademicTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="w-198.5 h-280.5 bg-white text-black font-serif p-14 overflow-hidden shadow-md">
      <div className="text-center mb-8 border-b-2 border-black pb-4">
        <h1 className="text-3xl font-bold mb-1">{data.personalInfo.name}</h1>
        <p className="text-sm">{data.personalInfo.location} • {data.personalInfo.phone} • {data.personalInfo.email}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold bg-gray-200 px-2 py-1 mb-2 uppercase">Abstract / Summary</h2>
        <p className="text-sm leading-tight text-justify">{data.summary}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold bg-gray-200 px-2 py-1 mb-3 uppercase">Education</h2>
        {data.education.map((edu, i) => (
          <div key={i} className="mb-2 flex justify-between text-sm">
            <div>
              <span className="font-bold">{edu.degree}</span>, {edu.school}
            </div>
            <span>{edu.dates}</span>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold bg-gray-200 px-2 py-1 mb-3 uppercase">Professional Appointments</h2>
        <div className="space-y-4">
          {data.experience.map((exp, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-bold">{exp.role}, {exp.company}</span>
                <span>{exp.dates}</span>
              </div>
              <ul className="list-disc list-outside ml-4 text-xs space-y-1">
                {exp.points.map((point, j) => <li key={j}>{point}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold bg-gray-200 px-2 py-1 mb-2 uppercase">Technical Proficiencies</h2>
        <p className="text-sm">{data.skills.join(" • ")}</p>
      </div>
    </div>
  );
}