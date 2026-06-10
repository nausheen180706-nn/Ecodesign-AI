import React from "react";
import { ArrowRight, Leaf, ShieldAlert, CheckCircle2, Zap, DollarSign, Award, ThumbsUp } from "lucide-react";
import { RoomAnalysisData } from "../types";

interface RecommendationEngineProps {
  data: RoomAnalysisData;
}

export default function RecommendationEngine({ data }: RecommendationEngineProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-bold text-[#2F2F2F] tracking-tight font-display">
          AI Eco Refitting Recommendations
        </h2>
        <p className="text-sm text-[#8D8B87] font-mono mt-1 uppercase tracking-wider">
          Material Swaps & Active Smart Energy Modules
        </p>
      </div>

      {/* Grid: Material Recommendations Left (8 columns equivalent), Energy Recommendations Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Core Material Swapping (8 columns) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="eco-glass rounded-3xl p-6 border border-white/70 shadow-lg shadow-[#556B2F]/3">
            <h3 className="text-lg font-bold font-display text-[#2F2F2F] mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-[#556B2F]" />
              Material Transmutation Recommendations
            </h3>
            <p className="text-xs text-[#8D8B87] font-light mb-6">
              Transition from non-recycled polymers and aggregates to modern bio-reclaimable architectural structures.
            </p>

            <div className="space-y-4">
              {data.detections.map((det, index) => {
                if (det.material.toLowerCase().includes("none detected")) return null;
                return (
                  <div
                    key={index}
                    className="p-5 rounded-2xl bg-white border border-[#8D8B87]/15 hover:border-[#556B2F]/30 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    {/* Swap visualization */}
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8D8B87] uppercase">
                        <span>{det.element} refit</span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="px-3 py-1 bg-rose-50 text-rose-800 border border-rose-100 text-xs rounded-lg font-medium flex items-center gap-1">
                          <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                          {det.material}
                        </span>
                        <ArrowRight className="w-4 h-4 text-[#8D8B87]" />
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs rounded-lg font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          {det.recommendedMaterial}
                        </span>
                      </div>
                    </div>

                    {/* Specifications badges */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="block text-[10px] text-[#8D8B87] font-mono uppercase">Cost</span>
                        <span className="font-semibold text-[#2F2F2F]">{det.cost}</span>
                      </div>

                      <div>
                        <span className="block text-[10px] text-[#8D8B87] font-mono uppercase">CO₂ Saving</span>
                        <span className="font-bold text-[#556B2F] font-mono">-{det.carbonReductionPercent}%</span>
                      </div>

                      <div>
                        <span className="block text-[10px] text-[#8D8B87] font-mono uppercase">Lifespan</span>
                        <span className="font-semibold text-slate-700">{det.durability}</span>
                      </div>

                      <div>
                        <span className="block text-[10px] text-[#8D8B87] font-mono uppercase">Circular Grade</span>
                        <span className="font-semibold text-[#A3B18A] uppercase">{det.recyclability.split(" ")[0]}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Smart Active Energy (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="eco-glass rounded-3xl p-6 border border-white/70 shadow-lg shadow-[#556B2F]/3 flex flex-col justify-between h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#C96A4A]/5 via-transparent to-transparent">
            <div className="space-y-4">
              <h3 className="text-md font-bold font-display text-[#2F2F2F] flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#C96A4A]" />
                Smart Building Grid Module
              </h3>
              <p className="text-xs text-[#8D8B87] leading-relaxed">
                Projected annual paybacks achieved through thermodynamic sensor configurations and double glazing.
              </p>

              {/* Energy recommendation cards */}
              <div className="pt-3 space-y-3.5">
                {data.smartBuildingEnergy.map((energy, index) => (
                  <div key={index} className="p-4 rounded-xl bg-white border border-[#8D8B87]/10 space-y-2 hover:shadow-sm transition-all">
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#C96A4A] uppercase">
                      <span>Refit Option {index + 1}</span>
                      <span className="px-1.5 py-0.5 bg-[#C96A4A]/10 text-[#C96A4A] rounded">Active Node</span>
                    </div>
                    <h4 className="text-xs font-semibold text-[#2F2F2F] leading-snug">
                      {energy.recommendation}
                    </h4>
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-[#8D8B87]/5">
                      <span className="text-[#8D8B87] text-[10px] uppercase font-mono">{energy.impact}</span>
                      <span className="font-mono font-bold text-[#556B2F]">₹{energy.savings.toLocaleString("en-IN")}/yr</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Annual savings box */}
            <div className="mt-6 pt-4 border-t border-[#8D8B87]/15">
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-[10px] text-[#8D8B87] font-mono uppercase">Combined payback</span>
                  <span className="text-xl font-bold font-display text-[#2F2F2F]">
                    ₹{data.estimatedCostSavingsInr.toLocaleString("en-IN")}/yr
                  </span>
                </div>
                <div id="btn-payback-calc" className="w-10 h-10 rounded-full bg-[#556B2F] text-white flex items-center justify-center shadow shadow-[#556B2F]/20 cursor-pointer">
                  <ThumbsUp className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
