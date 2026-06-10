import React from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { ShieldCheck, Flame, Scale, Zap, Wind, Award } from "lucide-react";
import { RoomAnalysisData } from "../types";

interface SustainabilityScoreProps {
  data: RoomAnalysisData;
}

export default function SustainabilityScore({ data }: SustainabilityScoreProps) {
  // Description parameter glossary
  const parameterTips: Record<string, { desc: string; icon: any; color: string }> = {
    "Carbon Impact": {
      desc: "Measures overall embodied CO2 emissions and greenhouse gas containment potential.",
      icon: Flame,
      color: "text-[#C96A4A]",
    },
    Recyclability: {
      desc: "Calculates composition percentages that can be safely recycled or composted.",
      icon: Scale,
      color: "text-[#556B2F]",
    },
    Durability: {
      desc: "Indicates service life (in years) resisting decay, structural wear, and surface aging.",
      icon: ShieldCheck,
      color: "text-[#A3B18A]",
    },
    "Energy Efficiency": {
      desc: "Vents, lighting, and window profiles which decrease external household wattage footprint.",
      icon: Zap,
      color: "text-amber-500",
    },
    "Indoor Air Quality": {
      desc: "Checks low formaldehyde discharge and active botanical ventilation levels.",
      icon: Wind,
      color: "text-emerald-500",
    },
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-[#2F2F2F] tracking-tight font-display">
          Sustainability Score Engine
        </h2>
        <p className="text-sm text-[#8D8B87] font-mono mt-1 uppercase tracking-wider">
          Multi-Criteria Bio-Structural Rating
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Gauge Card (Left - 5 columns) */}
        <div className="lg:col-span-5 eco-glass rounded-3xl p-6 border border-white/70 shadow-lg shadow-[#556B2F]/3 flex flex-col items-center justify-center text-center space-y-6">
          <h3 className="text-md font-bold font-display text-[#2F2F2F] self-start flex items-center gap-2">
            <Award className="w-5 h-5 text-[#556B2F]" />
            Unified Performance Score
          </h3>

          {/* Huge Circular Gauge */}
          <div className="relative flex items-center justify-center w-64 h-64">
            <svg className="w-full h-full transform -rotate-90">
              {/* Outer faint helper circle */}
              <circle
                cx="128"
                cy="128"
                r="100"
                className="stroke-[#E8DCCB]"
                strokeWidth="8"
                fill="none"
              />
              {/* Main Progress fill */}
              <circle
                cx="128"
                cy="128"
                r="100"
                className="stroke-[#556B2F]"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={2 * Math.PI * 100}
                strokeDashoffset={2 * Math.PI * 100 * (1 - data.overallScore / 100)}
                style={{ filter: "drop-shadow(0px 4px 6px rgba(85, 107, 47, 0.2))" }}
              />
            </svg>
            
            {/* Centered overall rating values */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#8D8B87] uppercase">
                EMISSIONS LEVEL
              </span>
              <span className="text-6xl font-black font-display text-[#2F2F2F] tracking-tighter">
                {data.overallScore}
              </span>
              <span className="text-xs font-semibold text-[#556B2F] font-mono uppercase bg-[#A3B18A]/20 px-2.5 py-0.5 rounded-full mt-1.5">
                Excellent (Grade A+)
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-[#8D8B87] max-w-sm font-light">
              This score aggregates active energy leakage, material VOC ratings, recyclability circles, and overall carbon mass values.
            </p>
          </div>
        </div>

        {/* Radar Parameters Grid Right (7 columns) */}
        <div className="lg:col-span-7 eco-glass rounded-3xl p-6 border border-white/70 shadow-lg shadow-[#556B2F]/3 flex flex-col justify-between">
          <div>
            <h3 className="text-md font-bold font-display text-[#2F2F2F] mb-4">
              Sustainability Matrix Analysis
            </h3>
            <p className="text-xs text-[#8D8B87] font-light mb-6">
              Radial vectors indicating structural strengths and unoptimized areas needing refurbishment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Radar chart - 5 cols */}
            <div className="md:col-span-6 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.radarData}>
                  <PolarGrid stroke="rgba(141, 139, 135, 0.2)" />
                  <PolarAngleAxis dataKey="parameter" stroke="#8D8B87" fontSize={9} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#8D8B87" fontSize={8} />
                  <Radar
                    name="Room Performance"
                    dataKey="score"
                    stroke="#556B2F"
                    fill="#556B2F"
                    fillOpacity={0.25}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Parameters list detail - 6 cols */}
            <div className="md:col-span-6 space-y-4">
              {data.radarData.map((item) => {
                const spec = parameterTips[item.parameter] || {
                  desc: "Standard metric check",
                  icon: Award,
                  color: "text-clay",
                };
                const IconComponent = spec.icon;
                return (
                  <div key={item.parameter} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 font-semibold text-[#2F2F2F]">
                        <IconComponent className={`w-3.5 h-3.5 ${spec.color}`} />
                        <span>{item.parameter}</span>
                      </div>
                      <span className="font-mono font-bold text-[#556B2F]">{item.score} / 100</span>
                    </div>

                    {/* Progress Slider */}
                    <div className="w-full bg-[#E8DCCB]/40 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#556B2F] h-full rounded-full"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
