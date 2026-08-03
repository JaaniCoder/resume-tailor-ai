import { ResumeData } from "@/types/resume";

export function ElegantTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="w-198.5 h-280.5 bg-[#FAFAFA] text-zinc-800 p-12 overflow-hidden shadow-md">
      <header className="border-b-[3px] border-emerald-800 pb-6 mb-6">
        <h1 className="text-4xl font-serif text-emerald-900 mb-1">{data.personalInfo.name}</h1>
        <h2 className="text-lg font-sans tracking-widest text-zinc-500 uppercase">{data.personalInfo.title}</h2>
      </header>

      <div className="flex gap-10 mb-8 text-sm font-sans text-zinc-600 justify-center">
        <span>{data.personalInfo.email}</span>
        <span>{data.personalInfo.phone}</span>
        <span>{data.personalInfo.location}</span>
      </div>

      <p className="text-sm leading-loose font-serif italic text-zinc-700 mb-8 text-center px-10">&ldquo;{data.summary}&rdquo;</p>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <h3 className="text-xl font-serif text-emerald-900 border-b border-zinc-300 pb-2 mb-4">Professional History</h3>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <h4 className="font-bold font-sans text-zinc-800">{exp.role}</h4>
                <p className="text-sm font-sans text-emerald-700 mb-2">{exp.company} • {exp.dates}</p>
                <ul className="text-sm font-serif list-disc list-outside ml-4 space-y-1 text-zinc-600">
                  {exp.points.map((point, j) => <li key={j}>{point}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1">
          <h3 className="text-xl font-serif text-emerald-900 border-b border-zinc-300 pb-2 mb-4">Education</h3>
          <div className="space-y-4 mb-8">
            {data.education.map((edu, i) => (
              <div key={i}>
                <p className="font-bold font-sans text-sm text-zinc-800">{edu.degree}</p>
                <p className="text-xs font-serif text-zinc-600">{edu.school}</p>
                <p className="text-xs font-serif text-zinc-500 italic">{edu.dates}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-serif text-emerald-900 border-b border-zinc-300 pb-2 mb-4">Expertise</h3>
          <ul className="text-sm font-serif space-y-2 text-zinc-700">
             {data.skills.map((skill, i) => (
               <li key={i}>• {skill}</li>
             ))}
          </ul>
        </div>
      </div>
    </div>
  );
}