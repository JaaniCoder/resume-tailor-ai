import { ResumeData } from "@/types/resume";

export function ModernTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="w-198.5 h-280.5 bg-white text-gray-800 font-sans flex overflow-hidden shadow-md">
      {/* Sidebar */}
      <div className="w-1/3 bg-blue-900 text-white p-8">
        <h1 className="text-4xl font-bold leading-tight mb-2">{data.personalInfo.name}</h1>
        <h2 className="text-lg text-blue-200 mb-8">{data.personalInfo.title}</h2>
        
        <h3 className="text-sm font-bold tracking-wider text-blue-300 mb-2 uppercase">Contact</h3>
        <p className="text-sm mb-1">{data.personalInfo.email}</p>
        <p className="text-sm mb-1">{data.personalInfo.phone}</p>
        <p className="text-sm mb-8">{data.personalInfo.location}</p>

        <h3 className="text-sm font-bold tracking-wider text-blue-300 mb-2 uppercase">Skills</h3>
        <div className="flex flex-col gap-1">
          {data.skills.map((skill, i) => (
            <span key={i} className="text-sm bg-blue-800 px-2 py-1 rounded">{skill}</span>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="w-2/3 p-8">
        <h3 className="text-xl font-bold border-b-2 border-gray-200 pb-2 mb-4 text-blue-900">Profile</h3>
        <p className="text-sm leading-relaxed mb-8">{data.summary}</p>

        <h3 className="text-xl font-bold border-b-2 border-gray-200 pb-2 mb-4 text-blue-900">Experience</h3>
        <div className="flex flex-col gap-6 mb-8">
          {data.experience.map((exp, i) => (
            <div key={i}>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-gray-900">{exp.role}</h4>
                <span className="text-xs text-gray-500 font-medium">{exp.dates}</span>
              </div>
              <p className="text-sm text-blue-700 font-medium mb-2">{exp.company}</p>
              <ul className="list-disc list-inside text-sm flex flex-col gap-1 text-gray-700">
                {exp.points.map((point, j) => <li key={j}>{point}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-bold border-b-2 border-gray-200 pb-2 mb-4 text-blue-900">Education</h3>
        {data.education.map((edu, i) => (
          <div key={i} className="mb-4">
            <h4 className="font-bold text-gray-900">{edu.degree}</h4>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{edu.school}</span>
              <span>{edu.dates}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}