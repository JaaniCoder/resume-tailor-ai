import { ResumeData } from "@/types/resume";

export function RubyTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="w-198.5 h-280.5 bg-white text-gray-800 p-12 overflow-hidden shadow-md flex flex-col font-serif">
      <div className="border-t-10 border-rose-800 absolute top-0 left-0 right-0"></div>
      
      <header className="mb-8 pt-4">
        <h1 className="text-4xl font-bold text-rose-900 mb-1 uppercase tracking-wide">{data.personalInfo.name}</h1>
        <h2 className="text-lg text-gray-600 italic mb-4">{data.personalInfo.title}</h2>
        <div className="flex gap-4 text-xs font-sans text-gray-500 uppercase tracking-wider">
          <span>{data.personalInfo.phone}</span> • 
          <span>{data.personalInfo.email}</span> • 
          <span>{data.personalInfo.location}</span>
        </div>
      </header>

      <div className="mb-8">
        <h3 className="text-sm font-bold text-rose-800 uppercase tracking-widest border-b border-gray-300 pb-2 mb-3">Profile</h3>
        <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-bold text-rose-800 uppercase tracking-widest border-b border-gray-300 pb-2 mb-4">Professional Experience</h3>
        <div className="space-y-6">
          {data.experience.map((exp, i) => (
            <div key={i}>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-bold text-base text-gray-900">{exp.role}</h4>
                <span className="text-xs font-sans text-rose-700 font-bold">{exp.dates}</span>
              </div>
              <p className="text-sm italic text-gray-600 mb-2">{exp.company}</p>
              <ul className="list-disc list-outside ml-4 text-sm font-sans text-gray-700 space-y-1">
                {exp.points.map((point, j) => <li key={j}>{point}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-auto">
        <div>
          <h3 className="text-sm font-bold text-rose-800 uppercase tracking-widest border-b border-gray-300 pb-2 mb-4">Education</h3>
          {data.education.map((edu, i) => (
            <div key={i} className="mb-3">
              <h4 className="font-bold text-sm text-gray-900">{edu.degree}</h4>
              <p className="text-xs italic text-gray-600">{edu.school}</p>
              <p className="text-xs font-sans text-rose-700 font-bold mt-1">{edu.dates}</p>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-sm font-bold text-rose-800 uppercase tracking-widest border-b border-gray-300 pb-2 mb-4">Skills & Expertise</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2 font-sans text-xs font-medium text-gray-700">
            {data.skills.map((skill, i) => (
              <span key={i} className="bg-rose-50 px-2 py-1 rounded border border-rose-100">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}