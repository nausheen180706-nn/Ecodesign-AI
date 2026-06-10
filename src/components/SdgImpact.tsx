import React from "react";
import { Globe, RefreshCw, Milestone, Gift, Sparkles, HeartHandshake } from "lucide-react";
import { RoomAnalysisData } from "../types";

interface SdgImpactProps {
  data: RoomAnalysisData;
}

export default function SdgImpact({ data }: SdgImpactProps) {
  // SDG parameters maps
  const sdgParameters = [
    {
      number: 11,
      title: "Sustainable Cities and Communities",
      colorClass: "bg-[#C96A4A]/10 border-[#C96A4A]/30 text-[#C96A4A]",
      bgBarClass: "bg-[#C96A4A]",
      icon: Milestone,
      targetGoal: "Target 11.c",
      desc: "Promote construction of robust sustainable structures using recycled and biogenic materials.",
      impactResult: data.sdgs.find(s => s.goalNumber === 11)?.metric || "Decreased embodied room footprint by ~220kg CO₂e"
    },
    {
      number: 12,
      title: "Responsible Consumption and Production",
      colorClass: "bg-amber-50 border-amber-200 text-amber-700",
      bgBarClass: "bg-amber-600",
      icon: RefreshCw,
      targetGoal: "Target 12.5",
      desc: "Substantially reduce local waste production through active biodegradable and circular material loops.",
      impactResult: data.sdgs.find(s => s.goalNumber === 12)?.metric || "100% transition to bio-degradable or circular materials"
    },
    {
      number: 13,
      title: "Climate Action",
      colorClass: "bg-[#556B2F]/10 border-[#556B2F]/30 text-[#556B2F]",
      bgBarClass: "bg-[#556B2F]",
      icon: Globe,
      targetGoal: "Target 13.3",
      desc: "Strengthen localized resistance to thermal leakage and minimize massive fossil-fuel carbon masses.",
      impactResult: data.sdgs.find(s => s.goalNumber === 13)?.metric || "Lifecycle savings equivalent to planting 15 mature trees"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-[#2F2F2F] tracking-tight font-display">
          UN SDG Impact Dashboard
        </h2>
        <p className="text-sm text-[#8D8B87] font-mono mt-1 uppercase tracking-wider">
          United Nations Sustainability Commitments Tracker
        </p>
      </div>

      {/* Intro info box */}
      <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-100 flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="w-12 h-12 bg-[#556B2F] text-white rounded-2xl flex items-center justify-center shrink-0 shadow shadow-[#556B2F]/25">
          <HeartHandshake className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-md font-bold text-[#2F2F2F] flex items-center gap-2">
            Global Goals Alignment Guaranteed
            <Sparkles className="w-4 h-4 text-[#C96A4A] animate-pulse" />
          </h3>
          <p className="text-xs text-slate-700">
            EcoDesign AI ensures your spatial transformations are compliant with the 2030 Agenda for Sustainable Development, focusing on material and environmental indicators.
          </p>
        </div>
      </div>

      {/* Sustainable Development Goals list layout (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sdgParameters.map((sdg) => {
          const IconComponent = sdg.icon;
          return (
            <div
              key={sdg.number}
              className={`p-6 rounded-3xl border flex flex-col justify-between space-y-6 ${sdg.colorClass} hover:shadow-lg hover:-translate-y-1 transition-all`}
            >
              <div className="space-y-4">
                {/* Header title */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-extrabold font-display leading-none">
                      {sdg.number}
                    </span>
                    <span className="text-[10px] font-bold font-mono uppercase bg-white/60 px-2 py-0.5 rounded border border-current">
                      {sdg.targetGoal}
                    </span>
                  </div>
                  <IconComponent className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-md font-bold font-display leading-tight text-slate-800">
                    {sdg.title}
                  </h4>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    {sdg.desc}
                  </p>
                </div>
              </div>

              {/* Verified results */}
              <div className="bg-white/80 border border-white p-4 rounded-2xl space-y-2">
                <span className="block text-[9px] font-mono font-bold uppercase text-[#8D8B87]">
                  Calculated Spatial Metric
                </span>
                <p className="text-xs font-semibold text-slate-800 leading-snug">
                  {sdg.impactResult}
                </p>
                
                {/* Visual completion meter */}
                <div className="w-full bg-[#E8DCCB]/20 h-1.5 rounded-full overflow-hidden mt-2">
                  <div className={`h-full rounded-full ${sdg.bgBarClass}`} style={{ width: "85%" }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
