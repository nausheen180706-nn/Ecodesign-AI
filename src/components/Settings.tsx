import React from "react";
import { Settings, Info, Key, ShieldCheck, HelpCircle, Server } from "lucide-react";

interface SettingsProps {
  apiKeyActive: boolean;
}

export default function SettingsView({ apiKeyActive }: SettingsProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-bold text-[#2F2F2F] tracking-tight font-display">
          Platform Configuration & Credentials
        </h2>
        <p className="text-sm text-[#8D8B87] font-mono mt-1 uppercase tracking-wider">
          System Secrets, Core Models, & API Grids
        </p>
      </div>

      <div className="max-w-4xl space-y-6">
        
        {/* API Credentials health Box */}
        <div className="eco-glass rounded-3xl p-6 border border-white/70 shadow-lg shadow-[#556B2F]/3 space-y-4">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-[#556B2F]" />
            <h3 className="text-lg font-bold font-display text-[#2F2F2F]">
              AI Secret Key Connectivity Tracker
            </h3>
          </div>

          <div className={`p-4 rounded-xl border flex items-center gap-4 ${
            apiKeyActive
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-amber-50 border-amber-200 text-amber-800"
          }`}>
            <Server className="w-6 h-6 shrink-0" />
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase block">
                Current API Key Health Rank
              </span>
              <p className="text-xs font-semibold">
                {apiKeyActive 
                  ? "GEMINI CORE: ACTIVE" 
                  : "RUNNING ON ADVANCED EMBEDDED SIMULATION METRIC"
                }
              </p>
              <p className="text-[11px] font-light text-slate-700 leading-snug">
                {apiKeyActive
                  ? "Multi-modal vision and custom base64 queries are running directly on the Gemini 3.5 Flash neural grid."
                  : "AI Studio will inject your private key automatically once you declare GEMINI_API_KEY in the Secrets panel."
                }
              </p>
            </div>
          </div>
        </div>

        {/* Integration Instructions */}
        <div className="eco-glass rounded-3xl p-6 border border-white/70 shadow-lg shadow-[#556B2F]/3 space-y-4">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-[#C96A4A]" />
            <h3 className="text-lg font-bold font-display text-[#2F2F2F]">
              How to configure your Gemini Key?
            </h3>
          </div>

          <div className="space-y-3.5 text-xs text-[#8D8B87] leading-relaxed font-light">
            <p>
              1. Locate the **Secrets** or **Settings** panel on your AI Studio workspace menu.
            </p>
            <p>
              2. Add a new variable declared exactly as: <strong className="text-slate-800 font-mono">GEMINI_API_KEY</strong>.
            </p>
            <p>
              3. Assign your Google API Key as the secret string. The server will hot-wire this into <strong className="text-slate-800 font-mono">process.env.GEMINI_API_KEY</strong> automatically without restarting any docker containers or exposing keys to browser network request panels!
            </p>
          </div>
        </div>

        {/* Technical Stack stats */}
        <div className="eco-glass rounded-3xl p-6 border border-white/70 shadow-lg shadow-[#556B2F]/3 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#556B2F]" />
            <h3 className="text-lg font-bold font-display text-[#2F2F2F]">
              Architectural Specifications
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-[10px] text-slate-700">
            <div className="p-3 bg-white border border-[#8D8B87]/10 rounded-xl">
              <span className="block text-[#8D8B87] uppercase">Front-end Frame</span>
              <span className="font-bold">React 19 + Vite 6</span>
            </div>
            <div className="p-3 bg-white border border-[#8D8B87]/10 rounded-xl">
              <span className="block text-[#8D8B87] uppercase">Back-end Logic</span>
              <span className="font-bold">Node + Express v4</span>
            </div>
            <div className="p-3 bg-white border border-[#8D8B87]/10 rounded-xl">
              <span className="block text-[#8D8B87] uppercase">Visual Layer</span>
              <span className="font-bold">Tailwind v4</span>
            </div>
            <div className="p-3 bg-white border border-[#8D8B87]/10 rounded-xl">
              <span className="block text-[#8D8B87] uppercase">Visual Charts</span>
              <span className="font-bold">Recharts UI Grid</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
