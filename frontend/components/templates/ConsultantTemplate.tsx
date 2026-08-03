import { ResumeData } from "@/types/resume";

export function ConsultantTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="w-198.5 h-280.5 bg-white text-black font-sans p-10 overflow-hidden shadow-md">
      <div className="border-4 border-black p-6 h-full flex flex-col">
        <header className="border-b-4 border-black pb-4 mb-4 text-center">
          <h1 className="text-4xl font-black uppercase tracking-widest">{data.personalInfo.name}</h1>
          <h2 className="text-sm font-bold uppercase tracking-widest mt-2">{data.personalInfo.title}</h2>
        </header>

        <div className="flex justify-between border-b-2 border-black pb-4 mb-4 text-xs font-bold uppercase">
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.location}</span>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium leading-relaxed text-justify">{data.summary}</p>
        </div>

        <div className="border-t-4 border-black pt-4 mb-4 flex-1">
          <h3 className="text-xl font-black uppercase tracking-widest mb-4">Professional Experience</h3>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between font-bold border-b border-black pb-1 mb-2">
                  <h4 className="text-base uppercase">{exp.company}</h4>
                  <span className="text-sm">{exp.dates}</span>
                </div>
                <h5 className="text-sm font-bold italic mb-2">{exp.role}</h5>
                <ul className="list-square list-outside ml-4 text-sm font-medium space-y-1">
                  {exp.points.map((point, j) => <li key={j}>{point}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t-4 border-black pt-4 grid grid-cols-2 gap-6 mt-auto">
          <div>
            <h3 className="text-base font-black uppercase tracking-widest mb-3 border-b border-black pb-1">Education</h3>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-2">
                <h4 className="font-bold text-sm">{edu.degree}</h4>
                <p className="text-xs font-medium">{edu.school}</p>
                <p className="text-xs italic font-bold">{edu.dates}</p>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-base font-black uppercase tracking-widest mb-3 border-b border-black pb-1">Areas of Expertise</h3>
            <p className="text-xs font-bold leading-relaxed">
              {data.skills.join("  |  ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}