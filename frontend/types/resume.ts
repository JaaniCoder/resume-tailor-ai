export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  experience: Array<{
    role: string;
    company: string;
    dates: string;
    points: string[];
  }>;
  education: Array<{
    degree: string;
    school: string;
    dates: string;
  }>;
  skills: string[];
}

export const DUMMY_DATA: ResumeData = {
  personalInfo: {
    name: "Alex Carter",
    title: "Senior Full-Stack Developer",
    email: "alex@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA"
  },
  summary: "Innovative software engineer with 6+ years of experience building scalable web applications. Adept at bridging the gap between frontend aesthetics and backend architecture.",
  experience: [
    {
      role: "Lead Software Engineer",
      company: "TechNova Solutions",
      dates: "2021 - Present",
      points: [
        "Architected a microservices backend in Python/FastAPI, reducing server costs by 30%.",
        "Led a team of 4 developers to ship the flagship React application 2 weeks ahead of schedule.",
      ]
    },
    {
      role: "Frontend Developer",
      company: "Creative Web Agency",
      dates: "2018 - 2021",
      points: [
        "Built responsive interfaces for 12+ client websites using Next.js and Tailwind CSS.",
        "Improved accessibility scores across all client portfolios to 99+ Lighthouse ratings."
      ]
    }
  ],
  education: [
    {
      degree: "B.S. in Computer Science",
      school: "University of California",
      dates: "2014 - 2018"
    }
  ],
  skills: ["React", "Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL", "AWS"]
};