import React from "react";
import {
  LayoutDashboard,
  Camera,
  Trees,
  ShieldCheck,
  Layers,
  Sparkles,
  Wind,
  Clock,
  Globe,
  HelpCircle,
  Cpu,
  Settings,
  Leaf
} from "lucide-react";

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  overallScore: number;
}

export default function Sidebar({ currentTab, setCurrentTab, overallScore }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard Overview", icon: LayoutDashboard },
    { id: "room-analysis", label: "AI Room Analysis", icon: Camera },
    { id: "carbon-footprint", label: "Carbon Footprint", icon: Trees },
    { id: "sustainability-score", label: "Sustainability Score", icon: ShieldCheck },
    { id: "recommendations", label: "Material Recommendations", icon: Layers },
    { id: "room-redesign", label: "Room Redesign (A/B)", icon: Sparkles },
    { id: "air-quality", label: "Indoor Air Quality", icon: Wind },
    { id: "lca", label: "Life Cycle Assessment", icon: Clock },
    { id: "sdg-impact", label: "SDG Impact", icon: Globe },
    { id: "ai-assistant", label: "AI Eco Assistant", icon: HelpCircle },
    { id: "smart-building", label: "Future Smart Building", icon: Cpu },
    { id: "settings", label: "Platform Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#556B2F] text-white flex flex-col h-screen fixed top-0 left-0 border-r border-white/10 z-20">
      {/* Brand Header */}
      <div className="p-4 border-b border-white/10 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center text-white shadow-sm">
          <Leaf className="w-4.5 h-4.5 text-[#E8DCCB]" />
        </div>
        <div>
          <h1 className="text-lg font-bold font-display tracking-tighter leading-tight text-white">
            EcoDesign <span className="text-[#E8DCCB]">AI</span>
          </h1>
          <span className="text-[9px] font-mono tracking-widest text-[#E8DCCB]/80 uppercase block">
            Smart Building Tech
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 text-left cursor-pointer group ${
                isActive
                  ? "bg-white/15 text-white shadow-sm font-semibold"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <IconComponent
                className={`w-4 h-4 shrink-0 transition-transform duration-150 ${
                  isActive ? "scale-105 text-[#E8DCCB]" : "text-white/60 group-hover:text-white"
                }`}
              />
              <span className="truncate">{item.label}</span>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#E8DCCB] ml-auto animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Sustainability Quick Gauge Footer */}
      <div className="p-4 border-t border-white/10 bg-black/10">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center shrink-0">
            {/* Minimal Circular Progress Indicator */}
            <svg className="w-10 h-10 transform -rotate-90">
              <circle
                cx="20"
                cy="20"
                r="16"
                className="stroke-white/10"
                strokeWidth="2.5"
                fill="transparent"
              />
              <circle
                cx="20"
                cy="20"
                r="16"
                className="stroke-[#E8DCCB]"
                strokeWidth="2.5"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 16}
                strokeDashoffset={2 * Math.PI * 16 * (1 - overallScore / 100)}
              />
            </svg>
            <span className="absolute text-[9px] font-bold font-mono text-white">
              {overallScore}%
            </span>
          </div>
          <div className="min-w-0">
            <div className="text-[9px] font-mono uppercase tracking-wider text-white/50">
              Space Eco-Score
            </div>
            <div className="text-xs text-[#E8DCCB] font-medium truncate">
               Excellent Performance
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
