import React, { useState, useRef } from "react";
import { Upload, Camera, AlertCircle, Sparkles, Wand2, Eye, Info, CheckCircle2 } from "lucide-react";
import { Detection, RoomAnalysisData } from "../types";

interface RoomAnalyzerProps {
  data: RoomAnalysisData;
  isLoading: boolean;
  onSelectTemplate: (templateId: "modern_living_room" | "executive_office") => void;
  onCustomImageUpload: (imageBase64: string, desc: string) => void;
}

export default function RoomAnalyzer({
  data,
  isLoading,
  onSelectTemplate,
  onCustomImageUpload,
}: RoomAnalyzerProps) {
  const [selectedBboxId, setSelectedBboxId] = useState<number | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [customDescription, setCustomDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onCustomImageUpload(reader.result, customDescription || `A standard indoor space featuring ${file.name}`);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Get active hero image path based on score or current template selection
  const isOffice = data.carbonFootprintKg === 320;
  const roomImage = isOffice 
    ? "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600"
    : "/src/assets/images/living_room_hero_1780929723048.png";

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-bold text-[#2F2F2F] tracking-tight font-display">
          Computer Vision AI Analyzer
        </h2>
        <p className="text-sm text-[#8D8B87] font-mono mt-1 uppercase tracking-wider">
          Real-Time Neural Detection & Material Audit Engine
        </p>
      </div>

      {/* Grid: Upload & Bounding Box Workspace Left, Vision Details Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Computer Vision view: Left (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="eco-glass rounded-3xl p-6 border border-white/70 shadow-xl shadow-[#556B2F]/3">
            <h3 className="text-lg font-bold font-display text-[#2F2F2F] mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#556B2F]" />
              Active Target Visualizer
            </h3>

            {/* Neural Box Container */}
            <div className="relative rounded-2xl overflow-hidden bg-black/5 aspect-[4/3] border border-[#8D8B87]/20 flex items-center justify-center">
              {isLoading ? (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 rounded-full border-4 border-[#556B2F] border-t-transparent animate-spin" />
                  <div className="text-center">
                    <p className="text-sm font-bold text-[#2F2F2F]">Gemini Auditing Space...</p>
                    <p className="text-xs text-[#8D8B87] font-mono mt-1 animate-pulse">Running Neural Grid Partitioning</p>
                  </div>
                </div>
              ) : null}

              {/* Underlying Image */}
              <img
                src={roomImage}
                alt="Analyzed Space"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Simulated Neural Scan Lines */}
              <div className="absolute inset-x-0 h-1 bg-[#556B2F]/35 top-0 animate-[bounce_5s_infinite] pointer-events-none" />

              {/* SVG Bounding Boxes Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {data.detections.map((det, index) => {
                  const [x, y, w, h] = det.bbox || [50, 50, 100, 100];
                  // Let x, y represent relative values inside parent absolute grid (since bbox can vary, we map them as percentage estimates)
                  const styleLeft = `${(x / 5.5).toFixed(1)}%`;
                  const styleTop = `${(y / 5).toFixed(1)}%`;
                  const styleWidth = `${(w / 4.8).toFixed(1)}%`;
                  const styleHeight = `${(h / 4).toFixed(1)}%`;

                  const isSelected = selectedBboxId === index;

                  return (
                    <div
                      key={index}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedBboxId(isSelected ? null : index)}
                      className={`absolute rounded-lg border-2 pointer-events-auto cursor-pointer transition-all ${
                        isSelected
                          ? "border-[#C96A4A] bg-[#C96A4A]/20 ring-4 ring-[#C96A4A]/20 scale-102 z-20"
                          : "border-[#556B2F] bg-[#556B2F]/10 hover:border-[#C96A4A] hover:bg-[#C96A4A]/10"
                      }`}
                      style={{
                        left: styleLeft,
                        top: styleTop,
                        width: styleWidth,
                        height: styleHeight,
                      }}
                      title={`${det.element}: ${det.material}`}
                    >
                      {/* Bbox Tag */}
                      <span className={`absolute -top-6 left-0 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white shadow select-none ${
                        isSelected ? "bg-[#C96A4A]" : "bg-[#556B2F]"
                      }`}>
                        {det.element} ({det.confidence}%)
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Floating Tooltip detail */}
              {selectedBboxId !== null && (
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#2F2F2F]/95 backdrop-blur border border-white/10 text-white shadow-2xl z-20 animate-fade-in flex flex-col sm:flex-row sm:items-center justify-between gap-4 pointer-events-auto">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-wider text-[#A3B18A] uppercase font-bold">
                      Neural Focus Map
                    </span>
                    <h4 className="text-sm font-bold text-[#F8F6F2]">
                      {data.detections[selectedBboxId].element} : <span className="text-[#E8DCCB]">{data.detections[selectedBboxId].material}</span>
                    </h4>
                    <p className="text-xs text-[#8D8B87]">
                      Recommended: <span className="text-[#A3B18A] font-semibold">{data.detections[selectedBboxId].recommendedMaterial}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="block text-xs text-[#8D8B87]">Carbon Saved</span>
                      <span className="text-sm font-bold text-[#A3B18A] font-mono">-{data.detections[selectedBboxId].carbonReductionPercent}% CO₂</span>
                    </div>
                    <button
                      onClick={() => setSelectedBboxId(null)}
                      className="p-1 text-[#8D8B87] hover:text-white transition-colors cursor-pointer"
                    >
                      <span className="sr-only">Close modal</span>
                      &times;
                    </button>
                  </div>
                </div>
              )}
            </div>

            <p className="text-center text-[11px] text-[#8D8B87] font-mono mt-3">
              *Click on bounding labels or table rows to overlay real-time eco substitution calculations.
            </p>
          </div>
        </div>

        {/* Neural Control Center: Right (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick template loader and Manual Upload Area */}
          <div className="eco-glass rounded-3xl p-6 border border-white/70 shadow-lg shadow-[#556B2F]/3 space-y-6">
            <h3 className="text-md font-bold font-display text-[#2F2F2F] flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-[#C96A4A]" />
              Scan Workspace
            </h3>

            {/* Template Toggle selectors */}
            <div className="grid grid-cols-2 gap-3">
              <button
                id="template-living-room"
                onClick={() => onSelectTemplate("modern_living_room")}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  !isOffice
                    ? "bg-[#556B2F]/15 border-[#556B2F] text-[#556B2F] font-semibold"
                    : "border-[#8D8B87]/20 hover:bg-[#8D8B87]/10 text-[#2F2F2F]"
                }`}
              >
                <span className="block text-[10px] font-mono font-bold text-[#C96A4A] uppercase">Baseline 1</span>
                <span className="text-xs">Modern Living Room</span>
              </button>

              <button
                id="template-office"
                onClick={() => onSelectTemplate("executive_office")}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  isOffice
                    ? "bg-[#556B2F]/15 border-[#556B2F] text-[#556B2F] font-semibold"
                    : "border-[#8D8B87]/20 hover:bg-[#8D8B87]/10 text-[#2F2F2F]"
                }`}
              >
                <span className="block text-[10px] font-mono font-bold text-[#C96A4A] uppercase">Baseline 2</span>
                <span className="text-xs">Executive Office</span>
              </button>
            </div>

            {/* Drag & Drop area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileSelect}
              className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                isDragOver ? "border-[#556B2F] bg-[#556B2F]/5" : "border-[#8D8B87]/30 hover:bg-black/5"
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden"
              />
              <Upload className="w-10 h-10 text-[#8D8B87] mb-2" />
              <p className="text-xs font-semibold text-[#2F2F2F]">Drag and Drop Room Image</p>
              <p className="text-[10px] text-[#8D8B87] font-mono mt-1">PNG, JPG or WEBP up to 10MB</p>
              <p className="text-[10px] text-[#C96A4A] font-semibold font-mono mt-2 flex items-center gap-1 bg-[#C96A4A]/10 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3" />
                Base64 Real-time Extraction
              </p>
            </div>

            {/* Optional Custom Description */}
            <div className="space-y-1.5">
              <label htmlFor="custom-room-desc" className="block text-[11px] font-mono text-[#8D8B87] uppercase">Custom Room Context (Optional)</label>
              <input
                id="custom-room-desc"
                type="text"
                placeholder="e.g. Traditional kitchen with heavy granite countertops..."
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-[#8D8B87]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#556B2F]/30 text-[#2F2F2F]"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Material Identification Module */}
      <div className="eco-glass rounded-3xl p-6 border border-white/70 shadow-lg shadow-[#556B2F]/3 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold font-display text-[#2F2F2F]">
              Detected Material & Building Component Log
            </h3>
            <p className="text-xs text-[#8D8B87] font-light">
              Detailed list of neural findings with custom carbon savings and recyclability audits.
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold bg-[#A3B18A]/20 text-[#556B2F] px-2.5 py-1 rounded-full uppercase tracking-wider">
            Verified Integrity
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#8D8B87]/10 text-[#8D8B87] font-mono uppercase text-[10px]">
                <th className="py-3 px-4 font-semibold">Element</th>
                <th className="py-3 px-4 font-semibold">Current Material</th>
                <th className="py-3 px-4 font-semibold">Confidence</th>
                <th className="py-3 px-4 font-semibold">Recommended Eco-Alternative</th>
                <th className="py-3 px-4 font-semibold text-center">Sustainability Rating</th>
                <th className="py-3 px-4 font-semibold text-right">CO₂ Reduction Potential</th>
              </tr>
            </thead>
            <tbody>
              {data.detections.map((det, index) => {
                const isSelected = selectedBboxId === index;
                return (
                  <tr
                    key={index}
                    onClick={() => setSelectedBboxId(isSelected ? null : index)}
                    className={`border-b border-[#8D8B87]/5 cursor-pointer transition-all ${
                      isSelected 
                        ? "bg-[#C96A4A]/5 hover:bg-[#C96A4A]/10 font-medium" 
                        : "hover:bg-black/5"
                    }`}
                  >
                    <td className="py-3.5 px-4 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        det.rating === "Low" ? "bg-rose-500" : det.rating === "Medium" ? "bg-amber-500" : "bg-emerald-500"
                      }`} />
                      <span className="text-[#2F2F2F] font-medium">{det.element}</span>
                    </td>
                    <td className="py-3.5 px-4 text-[#8D8B87]">{det.material}</td>
                    <td className="py-3.5 px-4 font-mono font-medium text-[#2F2F2F]">{det.confidence}%</td>
                    <td className="py-3.5 px-4 text-[#556B2F] font-medium">{det.recommendedMaterial}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        det.rating === "High"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : det.rating === "Medium"
                          ? "bg-amber-100 text-amber-800 border border-amber-200"
                          : "bg-rose-100 text-rose-800 border border-rose-200"
                      }`}>
                        {det.rating}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-[#556B2F] font-mono">
                      -{det.carbonReductionPercent}% CO₂
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
