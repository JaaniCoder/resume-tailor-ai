"use client";

import { TemplateThumbnail } from "./TemplateThumbnail";
import { DUMMY_DATA } from "@/types/resume";

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

const TEMPLATES = [
  { id: "modern", name: "The Modern", component: ModernTemplate },
  { id: "classic", name: "The Classic", component: ClassicTemplate },
  { id: "minimalist", name: "The Minimalist", component: MinimalistTemplate },
  { id: "executive", name: "The Executive", component: ExecutiveTemplate },
  { id: "startup", name: "The Startup", component: StartupTemplate },
  { id: "creative", name: "The Creative", component: CreativeTemplate },
  { id: "elegant", name: "The Elegant", component: ElegantTemplate },
  { id: "technical", name: "The Technical", component: TechnicalTemplate },
  { id: "academic", name: "The Academic", component: AcademicTemplate },
  { id: "timeline", name: "The Timeline", component: TimelineTemplate },
  { id: "compact", name: "The Compact", component: CompactTemplate },
  { id: "ruby", name: "The Ruby", component: RubyTemplate },
  { id: "emerald", name: "The Emerald", component: EmeraldTemplate },
  { id: "consultant", name: "The Consultant", component: ConsultantTemplate },
  { id: "sidebar", name: "The Sidebar", component: SidebarTemplate },
];

const FREE_TEMPLATES = ["modern", "classic", "minimalist"];

interface Props {
  selectedTemplate: string;
  onSelect: (id: string) => void;
}

export function TemplateSelector({ selectedTemplate, onSelect }: Props) {
  return (
    <div className="flex gap-6">
      {TEMPLATES.map((tpl) => {
        const Component = tpl.component;
        const isPremium = !FREE_TEMPLATES.includes(tpl.id);

        return (
          <div key={tpl.id} className="relative">
            {isPremium && (
              <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-30 shadow-md">
                PRO
              </div>
            )}
            <TemplateThumbnail
              name={tpl.name}
              isSelected={selectedTemplate === tpl.id}
              onClick={() => onSelect(tpl.id)}
            >
              <Component data={DUMMY_DATA} />
            </TemplateThumbnail>
          </div>
        );
      })}
    </div>
  );
}
