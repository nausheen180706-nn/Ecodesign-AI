import React, { useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Clock, ShieldAlert, CheckCircle2, AlertTriangle, Layers3 } from "lucide-react";
import { RoomAnalysisData } from "../types";

interface LifeCycleAssessmentProps {
  data: RoomAnalysisData;
}

export default function LifeCycleAssessment({ data }: LifeCycleAssessmentProps) {
  const [selectedYears, setSelectedYears] = useState<5 | 10 | 20>(10);

  // Dynamic LCA calculator based on timeline
  const getTimelineData = (years: number) => {
    const list = [];
    const multiplier = data.carbonFootprintKg === 320 ? 0.6 : 1.0;
    
    // Growth slope simulation
    for (let i = 0; i <= years; i += years / 5) {
      const yearName = `Yr ${Math.round(i)}`;
      const baseEmissions = Math.round(540 * multiplier * (1 + 0.12 * i)); // ceramic degrades slightly
      const ecoEmissions = Math.round(310 * multiplier * (1 + 0.02 * i)); // bamboo locks carbon

      const baseCost = Math.round(15000 * i * (1 + 0.05 * i)); // composite maintenance + swap
      const ecoCost = Math.round(4200 * i * (1 + 0.01 * i));

      list.push({
        year: yearName,
        baseEmissions,
        ecoEmissions,
        baseMaintCost: baseCost,
        ecoMaintCost: ecoCost,
      });
    }
    return list;
  };

  const chartData = getTimelineData(selectedYears);

  // Carbon mass details based on timeline
  const lcaCarbonSaved = Math.round((540 - 310) * selectedYears * (data.carbonFootprintKg === 320 ? 0.6 : 1.0));
  const lcaCostSaved = Math.round(data.estimatedCostSavingsInr * selectedYears);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-bold text-[#2F2F2F] tracking-tight font-display">
          Life Cycle Assessment (LCA)
        </h2>
        <p className="text-sm text-[#8D8B87] font-mono mt-1 uppercase tracking-wider">
          Multi-Decade Ecological & Structural Decay Forecaster
        </p>
      </div>

      {/* Timeline Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-[#E8DCCB]/30 border border-[#8D8B87]/20">
        <div>
          <span className="block text-[10px] font-mono font-bold tracking-wider text-[#556B2F] uppercase">
            Forecast Interval
          </span>
          <h3 className="text-md font-bold text-[#2F2F2F]">
            Timeline Span: <span className="text-[#C96A4A]">{selectedYears} Years</span>
          </h3>
        </div>

        <div className="flex bg-white rounded-xl p-1 border border-[#8D8B87]/15">
          {([5, 10, 20] as const).map((years) => (
            <button
              key={years}
              onClick={() => setSelectedYears(years)}
              className={`px-5 py-2 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                selectedYears === years
                  ? "bg-[#556B2F] text-white shadow-sm"
                  : "text-[#2F2F2F] hover:text-[#556B2F]"
              }`}
            >
              {years} Years
            </button>
          ))}
        </div>
      </div>

      {/* Predictive graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Cumulative carbon chart (7 columns) */}
        <div className="lg:col-span-7 eco-glass rounded-3xl p-6 border border-white/70 shadow-lg shadow-[#556B2F]/3 space-y-4">
          <div>
            <h3 className="text-md font-bold font-display text-[#2F2F2F] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#556B2F]" />
              Cumulative Embodied Carbon Forecast
            </h3>
            <p className="text-xs text-[#8D8B87] font-light">
              Predicting the long-term impact on planetary warming.
            </p>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLcaBase" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C96A4A" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#C96A4A" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLcaEco" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#556B2F" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#556B2F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(141, 139, 135, 0.15)" />
                <XAxis dataKey="year" stroke="#8D8B87" fontSize={11} tickLine={false} />
                <YAxis stroke="#8D8B87" fontSize={11} tickLine={false} label={{ value: 'kg CO₂ Equivalent', angle: -90, position: 'insideLeft', style: { fill: '#8D8B87', fontSize: 10 } }} />
                <Tooltip contentStyle={{ background: "#F8F6F2", borderColor: "#8D8B87", borderRadius: 8, fontSize: 11 }} />
                <Legend iconSize={8} />
                <Area name="Unimproved baseline footprint" type="monotone" dataKey="baseEmissions" stroke="#C96A4A" fillOpacity={1} fill="url(#colorLcaBase)" strokeWidth={1.5} />
                <Area name="EcoDesign biological footprint" type="monotone" dataKey="ecoEmissions" stroke="#556B2F" fillOpacity={1} fill="url(#colorLcaEco)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Financial & Material Decay Indicators (5 columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="eco-glass rounded-3xl p-6 border border-white/70 shadow-lg shadow-[#556B2F]/3 flex-1 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-md font-bold font-display text-[#2F2F2F] flex items-center gap-2">
                <Layers3 className="w-4.5 h-4.5 text-[#556B2F]" />
                LCA Metric Analysis
              </h3>
              <p className="text-xs text-[#8D8B87] leading-relaxed">
                Summary of environmental parameters computed over the active {selectedYears}-year lifecycle projection.
              </p>

              <div className="pt-2 space-y-4 font-mono text-[11px] text-slate-700">
                <div className="flex items-start justify-between border-b border-[#8D8B87]/10 pb-3">
                  <div>
                    <span className="block font-bold text-slate-900">Total Net CO₂ Saved</span>
                    <span className="text-[10px] text-[#8D8B87]">Refitted atmospheric volume avoided</span>
                  </div>
                  <span className="text-xs font-bold text-[#556B2F] px-1.5 py-0.5 rounded bg-[#556B2F]/10">{lcaCarbonSaved} kg CO₂</span>
                </div>

                <div className="flex items-start justify-between border-b border-[#8D8B87]/10 pb-3">
                  <div>
                    <span className="block font-bold text-slate-900">Preventative Maintenance savings</span>
                    <span className="text-[10px] text-[#8D8B87]">Excludes heavy structural refits</span>
                  </div>
                  <span className="text-xs font-bold text-[#C96A4A] px-1.5 py-0.5 rounded bg-[#C96A4A]/10">₹{lcaCostSaved.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <span className="block font-bold text-slate-900">Replacement Impact Factor</span>
                    <span className="text-[10px] text-[#8D8B87]">Landfill contribution on wear</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 px-1.5 py-0.5 rounded bg-emerald-100 border border-emerald-200">Carbon Negative</span>
                </div>
              </div>
            </div>

            {/* Warn box */}
            <div className="p-3.5 rounded-xl bg-orange-50 border border-orange-100 flex items-start gap-2.5 text-[10px] text-orange-800 font-light">
              <AlertTriangle className="w-4.5 h-4.5 text-orange-600 shrink-0" />
              <span>
                Standard MDF furniture degrades in {selectedYears > 10 ? "under 10 years" : "early years"}, causing critical aggregate replacement cycles that dump composite formaldehydes into the local ecosystem.
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
