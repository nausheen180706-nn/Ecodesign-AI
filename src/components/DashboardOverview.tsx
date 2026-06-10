import React, { useState } from "react";
import {
  TrendingDown,
  ChevronRight,
  Leaf,
  Activity,
  Zap,
  DollarSign,
  ShieldAlert,
  ArrowRight
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { RoomAnalysisData } from "../types";

interface DashboardOverviewProps {
  data: RoomAnalysisData;
  onNavigate: (tab: string) => void;
}

export default function DashboardOverview({ data, onNavigate }: DashboardOverviewProps) {
  const [trendView, setTrendView] = useState<"carbon" | "savings">("carbon");

  // Trend predictions mock data for interactive toggle
  const performanceTrendData = [
    { year: "Year 0", carbonCurrent: 540, carbonRec: 540, savingsCurrent: 0, savingsRec: 0 },
    { year: "Year 2", carbonCurrent: 520, carbonRec: 310, savingsCurrent: 4000, savingsRec: 64000 },
    { year: "Year 4", carbonCurrent: 512, carbonRec: 290, savingsCurrent: 8200, savingsRec: 128000 },
    { year: "Year 6", carbonCurrent: 505, carbonRec: 282, savingsCurrent: 12600, savingsRec: 192000 },
    { year: "Year 8", carbonCurrent: 498, carbonRec: 275, savingsCurrent: 16800, savingsRec: 256000 },
    { year: "Year 10", carbonCurrent: 490, carbonRec: 270, savingsCurrent: 21000, savingsRec: 320000 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title block */}
      <div>
        <h2 className="text-3xl font-bold text-[#2F2F2F] tracking-tight font-display">
          Environmental Core Analysis
        </h2>
        <p className="text-sm text-[#8D8B87] font-mono tracking-wide uppercase mt-1">
          Acoustics, Carbon, Lifetimes, and Active Energy Integration
        </p>
      </div>

      {/* 5 Modular Glassmorphism KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        
        {/* Card 1: Carbon Footprint */}
        <div className="eco-glass rounded-2xl p-5 shadow-[#556B2F]/3 border border-white/60 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs text-[#8D8B87] font-mono uppercase tracking-wider">Carbon Footprint</span>
            <div className="w-8 h-8 rounded-lg bg-[#C96A4A]/20 flex items-center justify-center text-[#C96A4A]">
              <TrendingDown className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold font-display text-[#2F2F2F]">
              {data.carbonFootprintKg} <span className="text-xs font-sans font-normal text-[#8D8B87]">kg CO₂e</span>
            </h3>
            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#556B2F] bg-[#A3B18A]/20 px-1.5 py-0.5 rounded mt-2">
              <span>-{data.carbonReductionPotentialPercent}% Potential</span>
            </div>
          </div>
        </div>

        {/* Card 2: Sustainability Score */}
        <div className="eco-glass rounded-2xl p-5 shadow-[#556B2F]/3 border border-white/60 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs text-[#8D8B87] font-mono uppercase tracking-wider">Eco-Score</span>
            <div className="w-8 h-8 rounded-lg bg-[#556B2F]/20 flex items-center justify-center text-[#556B2F]">
              <Activity className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-12 h-12 transform -rotate-90">
                <circle cx="24" cy="24" r="20" className="stroke-[#E8DCCB]" strokeWidth="3" fill="transparent" />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  className="stroke-[#556B2F]"
                  strokeWidth="3"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 20}
                  strokeDashoffset={2 * Math.PI * 20 * (1 - data.overallScore / 100)}
                />
              </svg>
              <span className="absolute text-[11px] font-mono font-bold text-[#556B2F]">{data.overallScore}</span>
            </div>
            <div>
              <div className="text-lg font-bold font-display text-[#2F2F2F]">{data.overallScore}/100</div>
              <span className="block text-[10px] uppercase font-mono tracking-wide text-[#556B2F] font-semibold">Grade {data.energyEfficiencyRating}</span>
            </div>
          </div>
        </div>

        {/* Card 3: Carbon Reduction Potential */}
        <div className="eco-glass rounded-2xl p-5 shadow-[#556B2F]/3 border border-white/60 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs text-[#8D8B87] font-mono uppercase tracking-wider">Reduction Potential</span>
            <div className="w-8 h-8 rounded-lg bg-[#A3B18A]/30 flex items-center justify-center text-[#556B2F]">
              <Leaf className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold font-display text-[#556B2F]">
              {data.carbonReductionPotentialPercent}%
            </h3>
            <span className="block text-[10px] text-[#8D8B87] mt-1 italic">Through circular refitting</span>
          </div>
        </div>

        {/* Card 4: Estimated Cost Savings */}
        <div className="eco-glass rounded-2xl p-5 shadow-[#556B2F]/3 border border-white/60 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs text-[#8D8B87] font-mono uppercase tracking-wider">Annual Saving</span>
            <div className="w-8 h-8 rounded-lg bg-[#E8DCCB] text-[#556B2F] flex items-center justify-center font-bold">
              ₹
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold font-display text-[#2F2F2F]">
              ₹{data.estimatedCostSavingsInr.toLocaleString("en-IN")}
            </h3>
            <span className="block text-[10px] text-[#A3B18A] font-semibold mt-1">Smart building payback</span>
          </div>
        </div>

        {/* Card 5: Energy Rating */}
        <div className="eco-glass rounded-2xl p-5 shadow-[#556B2F]/3 border border-white/60 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs text-[#8D8B87] font-mono uppercase tracking-wider">Energy Rating</span>
            <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-[#2F2F2F]">
              <Zap className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black font-display text-[#C96A4A]">
              {data.energyEfficiencyRating}
            </h3>
            <span className="block text-[10px] text-[#8D8B87] mt-1">Class A Efficiency</span>
          </div>
        </div>

      </div>

      {/* Interactive Charts Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Trend chart Left (8 columns) */}
        <div className="lg:col-span-8 eco-glass rounded-3xl p-6 border border-white/70 shadow-lg shadow-[#556B2F]/3 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-bold font-display text-[#2F2F2F]">
                10-Year Lifecycle Predictions
              </h4>
              <p className="text-xs text-[#8D8B87] font-light">
                Visualizing cumulative performance changes post-reconstruction
              </p>
            </div>

            {/* Toggle controls */}
            <div className="inline-flex rounded-lg p-1 bg-[#E8DCCB]/30 border border-[#8D8B87]/15">
              <button
                onClick={() => setTrendView("carbon")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  trendView === "carbon"
                    ? "bg-[#556B2F] text-white shadow"
                    : "text-[#2F2F2F] hover:text-[#556B2F]"
                }`}
              >
                Emissions (CO₂)
              </button>
              <button
                onClick={() => setTrendView("savings")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  trendView === "savings"
                    ? "bg-[#556B2F] text-white shadow"
                    : "text-[#2F2F2F] hover:text-[#556B2F]"
                }`}
              >
                Savings Curve (₹)
              </button>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              {trendView === "carbon" ? (
                <AreaChart data={performanceTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUnimproved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8D8B87" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#8D8B87" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorImproved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#556B2F" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#556B2F" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(141, 139, 135, 0.15)" />
                  <XAxis dataKey="year" stroke="#8D8B87" fontSize={11} tickLine={false} />
                  <YAxis stroke="#8D8B87" fontSize={11} tickLine={false} label={{ value: 'kg CO₂', angle: -90, position: 'insideLeft', style: { fill: '#8D8B87', fontSize: 10 } }} />
                  <Tooltip contentStyle={{ background: "#F8F6F2", borderColor: "#8D8B87", borderRadius: 8, fontSize: 12 }} />
                  <Legend iconSize={8} />
                  <Area name="Normal Baseline Space" type="monotone" dataKey="carbonCurrent" stroke="#8D8B87" fillOpacity={1} fill="url(#colorUnimproved)" strokeWidth={1.5} />
                  <Area name="Refitted Eco Space" type="monotone" dataKey="carbonRec" stroke="#556B2F" fillOpacity={1} fill="url(#colorImproved)" strokeWidth={2.5} />
                </AreaChart>
              ) : (
                <AreaChart data={performanceTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C96A4A" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#C96A4A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(141, 139, 135, 0.15)" />
                  <XAxis dataKey="year" stroke="#8D8B87" fontSize={11} tickLine={false} />
                  <YAxis stroke="#8D8B87" fontSize={11} tickLine={false} label={{ value: 'Payback amount (₹)', angle: -90, position: 'insideLeft', style: { fill: '#8D8B87', fontSize: 10 } }} />
                  <Tooltip contentStyle={{ background: "#F8F6F2", borderColor: "#C96A4A", borderRadius: 8, fontSize: 12 }} />
                  <Legend iconSize={8} />
                  <Area name="Cumulative Refitting Financial Return" type="monotone" dataKey="savingsRec" stroke="#C96A4A" fillOpacity={1} fill="url(#colorSavings)" strokeWidth={2.5} />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Audit Tips Right (4 columns) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div className="eco-glass rounded-3xl p-6 border border-white/70 shadow-lg shadow-[#556B2F]/3 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#556B2F]/10 flex items-center justify-center text-[#556B2F]">
                <Leaf className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold font-display text-[#2F2F2F]">
                Real-Time Eco Diagnostics
              </h4>
              <p className="text-xs text-[#8D8B87] leading-relaxed">
                Your selected room design incorporates ceramic structures, composite woods, and standard latex coatings that contribute substantially to localized synthetic emission grids.
              </p>
              
              <div className="pt-3 space-y-2.5">
                <div className="flex items-center gap-2.5 text-xs text-[#2F2F2F]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C96A4A]" />
                  <span>VOC levels exceed certified targets by 0.2mg/m³</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#2F2F2F]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#556B2F]" />
                  <span>Low-E glazes can reduce cooling loss by 35%</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate("room-analysis")}
              className="mt-6 w-full flex items-center justify-between px-4 py-3 bg-[#2F2F2F] hover:bg-[#2F2F2F]/90 text-[#F8F6F2] text-xs font-semibold rounded-xl transition-all cursor-pointer group"
            >
              Unlock Computer Vision Analysis
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>

      {/* Featured Smart Building IoT Block */}
      <div className="eco-glass rounded-3xl p-6 border border-white/70 shadow-lg shadow-[#556B2F]/3 grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#A3B18A]/10 via-transparent to-transparent">
        <div className="md:col-span-2 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-wider font-semibold text-[#556B2F] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#556B2F] animate-pulse" />
            Active Digital Twin Connected
          </div>
          <h3 className="text-xl font-bold font-display text-[#2F2F2F]">
            Future Smart Building Core Integration
          </h3>
          <p className="text-xs text-[#8D8B87] max-w-xl">
            Synchronize direct sensor reads (VOCs, particulate levels, energy draws, and thermal losses) with EcoDesign AI to visualize actual multi-faceted life cycle results automatically and securely.
          </p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => onNavigate("smart-building")}
            className="flex items-center gap-2.5 px-5 py-3.5 bg-white hover:bg-[#E8DCCB]/20 text-[#556B2F] border border-[#556B2F]/20 font-semibold rounded-xl text-xs shadow-sm hover:shadow transition-all cursor-pointer"
          >
            Explore Digital Twin
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
