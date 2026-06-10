import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Trees, ShieldAlert, CheckCircle2, Leaf, Heart } from "lucide-react";
import { RoomAnalysisData } from "../types";

interface CarbonFootprintProps {
  data: RoomAnalysisData;
}

export default function CarbonFootprint({ data }: CarbonFootprintProps) {
  const [activeChart, setActiveChart] = useState<"bar" | "pie">("bar");

  // Format data for Pie chart breakdown
  const pieData = data.breakdownData.map((item) => ({
    name: item.name,
    value: item.current,
  }));

  // Theme support colors
  const COLORS = [
    "#556B2F", // Olive Green
    "#A3B18A", // Sage Green
    "#C96A4A", // Warm Terracotta
    "#8D8B87", // Clay Gray
    "#E8DCCB", // Sand Beige
    "#2F2F2F"  // Soft Charcoal
  ];

  const totalCurrentEmissions = data.breakdownData.reduce((acc, curr) => acc + curr.current, 0);
  const totalRecommendedEmissions = data.breakdownData.reduce((acc, curr) => acc + curr.recommended, 0);
  const realSavings = totalCurrentEmissions - totalRecommendedEmissions;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title block */}
      <div>
        <h2 className="text-3xl font-bold text-[#2F2F2F] tracking-tight font-display">
          Embodied Carbon Footprint Engine
        </h2>
        <p className="text-sm text-[#8D8B87] font-mono mt-1 uppercase tracking-wider">
          Life-Cycle Material Carbon Auditing & Reductions
        </p>
      </div>

      {/* Hero Carbon Banner card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-[#2F2F2F] text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#556B2F] opacity-15 blur-3xl" />
        <div className="absolute bottom-0 left-20 w-60 h-60 rounded-full bg-[#C96A4A] opacity-10 blur-3xl" />

        {/* Big Metrics */}
        <div className="md:col-span-2 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#556B2F]/45 border border-[#556B2F]/50 text-[#A3B18A] text-[10px] font-bold font-mono tracking-wider rounded-lg uppercase">
            <Trees className="w-3.5 h-3.5" />
            Active Decarbonization Audit
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight font-display text-[#E8DCCB]">
            Achieve up to <span className="text-[#A3B18A]">{data.carbonReductionPotentialPercent}% Reductions</span>
          </h3>
          <p className="text-xs text-[#8D8B87] max-w-sm leading-relaxed">
            By shifting high-CO₂ ceramic tiles, synthetic paints, and MDF cores to circular biological resources.
          </p>
        </div>

        <div className="border-t md:border-t-0 md:border-l border-[#8D8B87]/20 pt-4 md:pt-0 md:pl-6 space-y-2">
          <div className="text-xs text-[#8D8B87] uppercase tracking-wider font-mono">Current Footprint</div>
          <p className="text-3xl font-bold text-[#C96A4A] font-display">{totalCurrentEmissions} kg</p>
          <span className="block text-[10px] text-rose-300 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            Unoptimized building standard
          </span>
        </div>

        <div className="border-t md:border-t-0 md:border-l border-[#8D8B87]/20 pt-4 md:pt-0 md:pl-6 space-y-2">
          <div className="text-xs text-[#8D8B87] uppercase tracking-wider font-mono">Recommended Footprint</div>
          <p className="text-3xl font-bold text-[#A3B18A] font-display">{totalRecommendedEmissions} kg</p>
          <span className="block text-[10px] text-emerald-300 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Optimal biological standard
          </span>
        </div>
      </div>

      {/* Visualizations Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Comparison Plot Left (7 columns) */}
        <div className="lg:col-span-7 eco-glass rounded-3xl p-6 border border-white/70 shadow-lg shadow-[#556B2F]/3 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold font-display text-[#2F2F2F]">
                Embodied Carbon Breakdown by Sector
              </h4>
              <p className="text-xs text-[#8D8B87] font-light">
                Comparing current construction standards to eco-friendly circular alternatives.
              </p>
            </div>

            {/* Toggle view controls */}
            <div className="inline-flex rounded-lg p-1 bg-[#E8DCCB]/30 border border-[#8D8B87]/15 font-mono text-[10px]">
              <button
                onClick={() => setActiveChart("bar")}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                  activeChart === "bar" ? "bg-[#556B2F] text-white shadow" : "text-[#2F2F2F]"
                }`}
              >
                Bar Chart
              </button>
              <button
                onClick={() => setActiveChart("pie")}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                  activeChart === "pie" ? "bg-[#556B2F] text-white shadow" : "text-[#2F2F2F]"
                }`}
              >
                Pie Chart
              </button>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {activeChart === "bar" ? (
                <BarChart data={data.breakdownData} margin={{ top: 20, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(141, 139, 135, 0.15)" />
                  <XAxis dataKey="name" stroke="#8D8B87" fontSize={10} tickLine={false} />
                  <YAxis stroke="#8D8B87" fontSize={10} tickLine={false} label={{ value: 'Embodied Carbon (kg CO₂e)', angle: -90, position: 'insideLeft', style: { fill: '#8D8B87', fontSize: 10 } }} />
                  <Tooltip contentStyle={{ background: "#F8F6F2", borderColor: "#8D8B87", borderRadius: 8, fontSize: 11 }} />
                  <Legend iconSize={8} />
                  <Bar name="Current Materials (kg)" dataKey="current" fill="#C96A4A" radius={[4, 4, 0, 0]} />
                  <Bar name="Eco-Recommended Materials (kg)" dataKey="recommended" fill="#556B2F" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <PieChart>
                  <Tooltip contentStyle={{ background: "#F8F6F2", borderColor: "#8D8B87", borderRadius: 8, fontSize: 11 }} />
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend iconSize={8} layout="vertical" align="right" verticalAlign="middle" />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Material-wise Emission Chart Side (5 columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="eco-glass rounded-3xl p-6 border border-white/70 shadow-lg shadow-[#556B2F]/3 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-md font-bold font-display text-[#2F2F2F] flex items-center gap-2">
                <Leaf className="w-4.5 h-4.5 text-[#556B2F]" />
                Eco Efficiency Analysis
              </h4>
              <p className="text-xs text-[#8D8B87] leading-relaxed">
                Emboded carbon figures signify the combined total of greenhouse gases emitted to extract, refine, transport, and install building components.
              </p>

              {/* Emissions reduction stack */}
              <div className="space-y-3.5 pt-2">
                <div className="flex items-center justify-between border-b border-[#8D8B87]/15 pb-2.5">
                  <div>
                    <span className="block text-xs font-semibold text-[#2F2F2F]">Biogenic Capture</span>
                    <span className="text-[10px] text-[#8D8B87] font-mono">Organic cork, wool, slate mats</span>
                  </div>
                  <span className="text-xs font-bold text-[#556B2F] font-mono">-{realSavings} kg CO₂</span>
                </div>

                <div className="flex items-center justify-between border-b border-[#8D8B87]/15 pb-2.5">
                  <div>
                    <span className="block text-xs font-semibold text-[#2F2F2F]">Annual Trees Extrapolated</span>
                    <span className="text-[10px] text-[#8D8B87] font-mono">Biological equivalents over 15y</span>
                  </div>
                  <span className="text-xs font-bold text-[#C96A4A] font-mono">15 mature trees</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-semibold text-[#2F2F2F]">Estimated Life Cycle Recovery</span>
                    <span className="text-[10px] text-[#8D8B87] font-mono">FSC lumber and biopolymers</span>
                  </div>
                  <span className="text-xs font-bold text-[#556B2F] font-mono">Infinite loops</span>
                </div>
              </div>
            </div>

            {/* Smart info badge */}
            <div className="mt-6 p-3 rounded-xl bg-[#E8DCCB]/30 border border-[#8D8B87]/20 flex items-start gap-2.5 text-[10px] text-[#2F2F2F] font-light">
              <Heart className="w-4.5 h-4.5 text-[#C96A4A] shrink-0" />
              <span>
                By selecting <strong>Low VOC</strong> and bio-based products, you prevent localized volatile concentrations other than directly minimizing macro-emissions.
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
