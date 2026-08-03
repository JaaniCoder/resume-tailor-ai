import { ResumeData } from "@/types/resume";

export function CreativeTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="w-198.5 h-280.5 bg-zinc-50 font-sans overflow-hidden shadow-md flex flex-col">
      <div className="bg-linear-to-r from-pink-500 to-violet-600 p-12 text-white text-center">
        <h1 className="text-5xl font-bold mb-2">{data.personalInfo.name}</h1>
        <h2 className="text-xl font-medium opacity-90">{data.personalInfo.title}</h2>
      </div>

      <div className="flex-1 p-10 flex gap-8">
        <div className="w-2/3">
          <div className="mb-8">
             <h3 className="text-violet-600 font-bold text-xl mb-3 flex items-center gap-2">
               <span className="w-4 h-1 bg-pink-500 rounded-full"></span> Profile
             </h3>
             <p className="text-sm text-zinc-700 leading-relaxed">{data.summary}</p>
          </div>

          <div>
             <h3 className="text-violet-600 font-bold text-xl mb-4 flex items-center gap-2">
               <span className="w-4 h-1 bg-pink-500 rounded-full"></span> Experience
             </h3>
             <div className="space-y-6">
                {data.experience.map((exp, i) => (
                  <div key={i} className="relative pl-6 border-l-2 border-violet-200">
                    <div className="absolute w-3 h-3 bg-pink-500 rounded-full -left-1.75 top-1"></div>
                    <h4 className="font-bold text-zinc-800 text-lg">{exp.role}</h4>
                    <p className="text-sm text-violet-600 font-medium mb-2">{exp.company} | {exp.dates}</p>
                    <ul className="text-sm text-zinc-600 list-disc list-inside">
                      {exp.points.map((point, j) => <li key={j}>{point}</li>)}
                    </ul>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="w-1/3 bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
           <h3 className="text-violet-600 font-bold text-lg mb-4">Contact</h3>
           <div className="text-sm text-zinc-600 space-y-2 mb-8 border-b border-zinc-100 pb-8">
             <p>{data.personalInfo.email}</p>
             <p>{data.personalInfo.phone}</p>
             <p>{data.personalInfo.location}</p>
           </div>

           <h3 className="text-violet-600 font-bold text-lg mb-4">Education</h3>
           <div className="space-y-4 mb-8 border-b border-zinc-100 pb-8">
             {data.education.map((edu, i) => (
               <div key={i}>
                 <p className="font-bold text-sm text-zinc-800">{edu.degree}</p>
                 <p className="text-xs text-zinc-500">{edu.school}</p>
               </div>
             ))}
           </div>

           <h3 className="text-violet-600 font-bold text-lg mb-4">Skills</h3>
           <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span key={i} className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-md font-medium">{skill}</span>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}