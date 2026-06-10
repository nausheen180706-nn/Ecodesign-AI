import React, { useState, useEffect } from "react";
import { Wind, CupSoda, Droplets, Activity, Zap, ShieldCheck, Thermometer, Radio, Brain, Sparkles } from "lucide-react";
import { RoomAnalysisData } from "../types";

interface IndoorAirAndSmartEnergyProps {
  data: RoomAnalysisData;
}

export default function IndoorAirAndSmartEnergy({ data }: IndoorAirAndSmartEnergyProps) {
  // Mini simulated live sensory states for IoT Digital Twin
  const [ambientTemp, setAmbientTemp] = useState(24.2);
  const [ambientHum, setAmbientHum] = useState(52);
  const [cumulativeEnergyWatts, setCumulativeEnergyWatts] = useState(120);
  const [waterDrawLpm, setWaterDrawLpm] = useState(1.4);

  useEffect(() => {
    // Smooth physical fluctuations representing live smart meters
    const timer = setInterval(() => {
      setAmbientTemp((prev) => +(prev + (Math.random() - 0.5) * 0.1).toFixed(1));
      setAmbientHum((prev) => Math.max(30, Math.min(80, Math.round(prev + (Math.random() - 0.5) * 2))));
      setCumulativeEnergyWatts((prev) => Math.max(60, Math.round(prev + (Math.random() - 0.5) * 10)));
      setWaterDrawLpm((prev) => Math.max(0.4, +(prev + (Math.random() - 0.5) * 0.15).toFixed(2)));
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-bold text-[#2F2F2F] tracking-tight font-display">
          Indoor Air & Digital Twin IoT
        </h2>
        <p className="text-sm text-[#8D8B87] font-mono mt-1 uppercase tracking-wider">
          Live Volatile Analytics & Smart Building Mesh Network
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* IAQ Panel (7 columns) */}
        <div className="lg:col-span-7 eco-glass rounded-3xl p-6 border border-white/70 shadow-lg shadow-[#556B2F]/3 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-display text-[#2F2F2F] flex items-center gap-2">
              <Wind className="w-5 h-5 text-[#556B2F]" />
              Indoor Air Quality (IAQ) Diagnostics
            </h3>
            <span className="text-[10px] uppercase font-mono tracking-wider font-bold bg-[#A3B18A]/20 text-[#556B2F] px-2.5 py-1 rounded-full">
              SENSORS ACTIVE
            </span>
          </div>

          {/* Dials row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center">
            {/* Dial 1: Air Quality Index */}
            <div className="p-4 rounded-2xl bg-white border border-[#8D8B87]/15 relative flex flex-col items-center justify-between space-y-3">
              <span className="text-[10px] font-mono text-[#8D8B87] uppercase">AQI Score</span>
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle cx="32" cy="32" r="28" className="stroke-[#E8DCCB]" strokeWidth="3" fill="none" />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    className="stroke-[#556B2F]"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 28}
                    strokeDashoffset={2 * Math.PI * 28 * (1 - data.iaq.airQualityScore / 100)}
                  />
                </svg>
                <span className="absolute text-sm font-bold font-mono text-[#556B2F]">
                  {data.iaq.airQualityScore}
                </span>
              </div>
              <span className="text-xs font-semibold text-amber-700">Moderate AQI</span>
            </div>

            {/* Dial 2: Ventilation Efficiency */}
            <div className="p-4 rounded-2xl bg-white border border-[#8D8B87]/15 relative flex flex-col items-center justify-between space-y-3">
              <span className="text-[10px] font-mono text-[#8D8B87] uppercase">Air Exchange Rate</span>
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle cx="32" cy="32" r="28" className="stroke-[#E8DCCB]" strokeWidth="3" fill="none" />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    className="stroke-[#A3B18A]"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 28}
                    strokeDashoffset={2 * Math.PI * 28 * (1 - data.iaq.ventilationEfficiency / 100)}
                  />
                </svg>
                <span className="absolute text-sm font-bold font-mono text-[#556B2F]">
                  {data.iaq.ventilationEfficiency}%
                </span>
              </div>
              <span className="text-xs font-semibold text-[#8D8B87]">Passive Refit Needed</span>
            </div>

            {/* Dial 3: VOC Levels */}
            <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-white border border-[#8D8B87]/15 relative flex flex-col items-center justify-between space-y-3">
              <span className="text-[10px] font-mono text-[#8D8B87] uppercase">VOC Indicator</span>
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-rose-800 leading-tight">
                  {data.iaq.vocLevel.split(" ")[0]}
                </span>
                <span className="text-[9px] text-[#8D8B87] font-mono">Formaldehyde grid</span>
              </div>
            </div>
          </div>

          {/* IAQ recommendations */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 space-y-2.5">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
              Pulmonary Remediation Protocol:
            </h4>
            <div className="text-xs text-amber-800 space-y-2 font-light">
              <p>
                • <strong>Zero-VOC Emulsion Walls</strong>: Swapping classic paint completely offsets long-term trace carcinogenic formaldehydes.
              </p>
              <p>
                • <strong>Afforest Corner Space</strong>: Positioning 3 Golden Pothos clusters improves biological formaldehyde capture capacity by up to 18%.
              </p>
            </div>
          </div>
        </div>

        {/* Smart Twin IoT Panel (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="eco-glass rounded-3xl p-6 border border-white/70 shadow-lg shadow-[#556B2F]/3 flex flex-col justify-between h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#556B2F]/10 via-transparent to-transparent">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-md font-bold font-display text-[#2F2F2F] flex items-center gap-1.5">
                  <Radio className="w-4.5 h-4.5 text-[#556B2F] animate-pulse" />
                  Smart Building Digital Twin
                </h3>
                <span className="text-[9px] font-mono font-bold bg-[#556B2F] text-[#F8F6F2] px-2 py-0.5 rounded uppercase">
                  Connected
                </span>
              </div>

              <p className="text-xs text-[#8D8B87] leading-relaxed">
                Active telemetry channels capturing physical characteristics across active interior loops in real-time.
              </p>

              {/* Fluctuating sensor metrics */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-[#8D8B87]/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <Thermometer className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[9px] text-[#8D8B87] font-mono uppercase">Telemeter Temp</span>
                    <span className="text-sm font-bold text-[#2F2F2F] font-mono">{ambientTemp} °C</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#8D8B87]/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Droplets className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[9px] text-[#8D8B87] font-mono uppercase">Humidit%</span>
                    <span className="text-sm font-bold text-[#2F2F2F] font-mono">{ambientHum} %rH</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#8D8B87]/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Zap className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[9px] text-[#8D8B87] font-mono uppercase">Energy Draw</span>
                    <span className="text-sm font-bold text-[#2F2F2F] font-mono">{cumulativeEnergyWatts} W</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#8D8B87]/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <CupSoda className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[9px] text-[#8D8B87] font-mono uppercase">Water flow</span>
                    <span className="text-sm font-bold text-[#2F2F2F] font-mono">{waterDrawLpm} L/min</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart summary */}
            <div className="mt-6 p-3 rounded-xl bg-[#556B2F]/5 border border-[#556B2F]/20 text-[10px] text-[#556B2F] font-mono flex items-center gap-2">
              <Brain className="w-4.5 h-4.5 text-[#556B2F] shrink-0" />
              <span>Digital twin fully synchronized. System load healthy.</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
