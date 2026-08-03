import { ModernTemplate } from "./templates/ModernTemplate";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { MinimalistTemplate } from "./templates/MinimalistTemplate";
import { ExecutiveTemplate } from "./templates/ExecutiveTemplate";
import { StartupTemplate } from "./templates/StartupTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { ElegantTemplate } from "./templates/ElegantTemplate";
import { TechnicalTemplate } from "./templates/TechnicalTemplate";
import { AcademicTemplate } from "./templates/AcademicTemplate";
import { TimelineTemplate } from "./templates/TimelineTemplate";
import { CompactTemplate } from "./templates/CompactTemplate";
import { RubyTemplate } from "./templates/RubyTemplate";
import { EmeraldTemplate } from "./templates/EmeraldTemplate";
import { ConsultantTemplate } from "./templates/ConsultantTemplate";
import { SidebarTemplate } from "./templates/SidebarTemplate";
import { ResumeData } from "@/types/resume";

interface Props {
  templateId: string;
  data: ResumeData;
}

export function RenderTemplate({ templateId, data }: Props) {
  switch (templateId) {
    case "modern": return <ModernTemplate data={data} />;
    case "classic": return <ClassicTemplate data={data} />;
    case "minimalist": return <MinimalistTemplate data={data} />;
    case "executive": return <ExecutiveTemplate data={data} />;
    case "startup": return <StartupTemplate data={data} />;
    case "creative": return <CreativeTemplate data={data} />;
    case "elegant": return <ElegantTemplate data={data} />;
    case "technical": return <TechnicalTemplate data={data} />;
    case "academic": return <AcademicTemplate data={data} />;
    case "timeline": return <TimelineTemplate data={data} />;
    case "compact": return <CompactTemplate data={data} />;
    case "ruby": return <RubyTemplate data={data} />;
    case "emerald": return <EmeraldTemplate data={data} />;
    case "consultant": return <ConsultantTemplate data={data} />;
    case "sidebar": return <SidebarTemplate data={data} />;
    default: return <ModernTemplate data={data} />;
  }
}