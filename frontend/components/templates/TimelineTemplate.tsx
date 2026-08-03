import { ResumeData } from "@/types/resume";

export function TimelineTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="w-198.5 h-280.5 bg-white text-gray-800 font-sans p-12 overflow-hidden shadow-md">
      <div className="mb-10 text-right border-r-4 border-red-500 pr-6">
        <h1 className="text-5xl font-black text-gray-900 mb-2">{data.personalInfo.name}</h1>
        <h2 className="text-xl font-bold text-red-500 mb-2">{data.personalInfo.title}</h2>
        <p className="text-sm text-gray-500">{data.personalInfo.email} | {data.personalInfo.phone}</p>
      </div>

      <div className="mb-10 pl-6">
        <p className="text-sm text-gray-600 font-medium leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">{data.summary}</p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1.75 top-2 bottom-0 w-0.5 bg-red-200"></div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-6 pl-6">Experience</h3>
          <div className="space-y-8">
            {data.experience.map((exp, i) => (
              <div key={i} className="relative pl-8">
                {/* Timeline Dot */}
                <div className="absolute left-0 top-1.5 w-4 h-4 bg-red-500 rounded-full border-4 border-white shadow"></div>
                <div className="bg-white">
                  <h4 className="font-bold text-lg text-gray-800">{exp.role}</h4>
                  <p className="text-sm font-bold text-red-500 mb-2">{exp.company} <span className="text-gray-400 font-normal ml-2">{exp.dates}</span></p>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    {exp.points.map((point, j) => <li key={j}>{point}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Education</h3>
          <div className="space-y-4 mb-8">
             {data.education.map((edu, i) => (
               <div key={i} className="bg-red-50 p-3 rounded-lg border-l-4 border-red-400">
                 <p className="font-bold text-sm text-gray-800">{edu.degree}</p>
                 <p className="text-xs text-gray-600 mb-1">{edu.school}</p>
                 <p className="text-xs text-red-400 font-bold">{edu.dates}</p>
               </div>
             ))}
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-6">Skills</h3>
          <div className="flex flex-col gap-2">
             {data.skills.map((skill, i) => (
               <div key={i} className="w-full bg-gray-100 rounded-full h-6 flex items-center px-3 text-xs font-bold text-gray-700">
                 {skill}
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}