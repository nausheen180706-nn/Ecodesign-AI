import React, { useState } from "react";
import { ArrowRight, Leaf, Eye, Trees, CheckCircle2, AlertCircle } from "lucide-react";
import { RoomAnalysisData } from "../types";

interface RoomRedesignProps {
  data: RoomAnalysisData;
}

export default function RoomRedesign({ data }: RoomRedesignProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const totalCurrentEmissions = data.breakdownData.reduce((acc, curr) => acc + curr.current, 0);
  const totalRecommendedEmissions = data.breakdownData.reduce((acc, curr) => acc + curr.recommended, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-bold text-[#2F2F2F] tracking-tight font-display">
          A/B Ecological Space Redesign
        </h2>
        <p className="text-sm text-[#8D8B87] font-mono mt-1 uppercase tracking-wider">
          Before vs. After Sustainability Comparison Layout
        </p>
      </div>

      {/* Metric comparison banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-center">
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100">
          <span className="block text-[10px] text-rose-800 uppercase tracking-wider">Baseline Footprint</span>
          <span className="text-2xl font-bold text-rose-700">{totalCurrentEmissions} kg CO₂</span>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-center">
          <span className="block text-[10px] text-emerald-800 uppercase tracking-wider">Refitted Carbon Target</span>
          <span className="text-2xl font-bold text-emerald-700">{totalRecommendedEmissions} kg CO₂</span>
        </div>
        <div className="p-4 rounded-2xl bg-[#556B2F] text-[#F8F6F2] font-semibold flex flex-col justify-center">
          <span className="block text-[10px] text-[#A3B18A] uppercase tracking-wider font-mono">Net Carbon Sparing</span>
          <span className="text-2xl font-bold">-{data.carbonReductionPotentialPercent}% mass saved</span>
        </div>
      </div>

      {/* Slider Split-Screen View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Before Design specification panel */}
        <div className="p-8 rounded-3xl bg-white border border-[#8D8B87]/15 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold tracking-wider text-rose-700 bg-rose-100 border border-rose-200 px-3 py-1 rounded-full uppercase">
              Baseline State
            </span>
            <AlertCircle className="w-5 h-5 text-rose-600" />
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#2F2F2F] font-display">
              Unoptimized Structural Design
            </h3>
            <p className="text-xs text-[#8D8B87] leading-relaxed">
              Standard build-out lacking active solar gains, featuring VOC composites emitting volatile trace polymers, Halogen warmers causing active thermal loss, and heavy chemical tiling.
            </p>

            <div className="pt-4 space-y-3 font-mono text-[11px] text-slate-700">
              <div className="p-3 bg-rose-50/40 rounded-xl flex items-center justify-between">
                <span>1. Flooring Material</span>
                <span className="font-semibold text-rose-800">Ceramic Glazed Tiles</span>
              </div>
              <div className="p-3 bg-rose-50/40 rounded-xl flex items-center justify-between">
                <span>2. Core Furniture</span>
                <span className="font-semibold text-rose-800">MDF Synthetic Timber</span>
              </div>
              <div className="p-3 bg-rose-50/40 rounded-xl flex items-center justify-between">
                <span>3. Active Lighting</span>
                <span className="font-semibold text-rose-800">Halogen Core Fixtures</span>
              </div>
              <div className="p-3 bg-rose-50/40 rounded-xl flex items-center justify-between">
                <span>4. Coating Volatiles</span>
                <span className="font-semibold text-rose-800">High-VOC Chemical Paints</span>
              </div>
            </div>
          </div>
        </div>

        {/* After Design specification panel */}
        <div className="p-8 rounded-3xl bg-emerald-50/30 border border-[#A3B18A]/25 shadow-sm space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#A3B18A]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-full uppercase">
              EcoDesign Refit State
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#556B2F] font-display">
              Sustainable Biological Design
            </h3>
            <p className="text-xs text-[#8D8B87] leading-relaxed">
              Incorporates daylight capturing apertures, low-VOC slate/lime-clay binders, bio-engineered carbon negative cork tiles, smart dimming LED frameworks, and oxygen yielding Botanical layouts.
            </p>

            <div className="pt-4 space-y-3 font-mono text-[11px] text-slate-700">
              <div className="p-3 bg-emerald-50/40 rounded-xl flex items-center justify-between">
                <span>1. Flooring Material</span>
                <span className="font-semibold text-emerald-800">Carbon Negative Cork / Bamboo</span>
              </div>
              <div className="p-3 bg-emerald-50/30 rounded-xl flex items-center justify-between">
                <span>2. Core Furniture</span>
                <span className="font-semibold text-emerald-800">FSC Solid Oak / Biocomposite</span>
              </div>
              <div className="p-3 bg-emerald-50/30 rounded-xl flex items-center justify-between">
                <span>3. Active Lighting</span>
                <span className="font-semibold text-emerald-800">Daylighting Sensor Smart LEDs</span>
              </div>
              <div className="p-3 bg-emerald-50/30 rounded-xl flex items-center justify-between">
                <span>4. Coating Volatiles</span>
                <span className="font-semibold text-emerald-800">Zero-VOC Silicate Paint</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
