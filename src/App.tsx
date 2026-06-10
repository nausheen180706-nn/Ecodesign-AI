/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import LandingHero from "./components/LandingHero";
import DashboardOverview from "./components/DashboardOverview";
import RoomAnalyzer from "./components/RoomAnalyzer";
import CarbonFootprint from "./components/CarbonFootprint";
import SustainabilityScore from "./components/SustainabilityScore";
import RecommendationEngine from "./components/RecommendationEngine";
import RoomRedesign from "./components/RoomRedesign";
import LifeCycleAssessment from "./components/LifeCycleAssessment";
import IndoorAirAndSmartEnergy from "./components/IndoorAirAndSmartEnergy";
import SdgImpact from "./components/SdgImpact";
import AiAssistant from "./components/AiAssistant";
import SettingsView from "./components/Settings";
import { RoomAnalysisData, ChatMessage } from "./types";
import { Leaf, ArrowLeft, Key, Sparkles } from "lucide-react";

export default function App() {
  const [inApp, setInApp] = useState(false);
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyActive, setApiKeyActive] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Active Sustainability analysis data state
  const [roomData, setRoomData] = useState<RoomAnalysisData>({
    overallScore: 88,
    carbonFootprintKg: 540,
    carbonReductionPotentialPercent: 42,
    estimatedCostSavingsInr: 32000,
    energyEfficiencyRating: "A+",
    detections: [
      { element: "Flooring", material: "Ceramic Tile", rating: "Medium", ratingColor: "amber", confidence: 94, currentMaterial: "Ceramic Tile", recommendedMaterial: "Bamboo Flooring", confidenceScore: 0.94, cost: "₹18,500", carbonReductionPercent: 45, durability: "High", recyclability: "High", bbox: [120, 450, 480, 780] },
      { element: "Furniture", material: "MDF Composite Wood", rating: "Low", ratingColor: "rose", confidence: 88, currentMaterial: "MDF Composite Wood", recommendedMaterial: "Reclaimed Wood / Bamboo Sofa", confidenceScore: 0.88, cost: "₹24,000", carbonReductionPercent: 65, durability: "Medium", recyclability: "Excellent", bbox: [220, 250, 450, 680] },
      { element: "Wall Paint", material: "Standard VOC Latex", rating: "Low", ratingColor: "rose", confidence: 91, currentMaterial: "Standard Latex", recommendedMaterial: "Low VOC Clay-Based Paint", confidenceScore: 0.91, cost: "₹4,200", carbonReductionPercent: 78, durability: "Medium", recyclability: "Biodegradable", bbox: [40, 10, 400, 320] },
      { element: "Windows", material: "Single Glazed Aluminum", rating: "Medium", ratingColor: "amber", confidence: 85, currentMaterial: "Single-Pane Alum", recommendedMaterial: "Double Glazed Low-E Wood Frame", confidenceScore: 0.85, cost: "₹38,000", carbonReductionPercent: 35, durability: "Very High", recyclability: "Fully Recyclable", bbox: [300, 80, 500, 420] },
      { element: "Lighting", material: "Halogen Fixtures", rating: "Low", ratingColor: "rose", confidence: 96, currentMaterial: "Halogen Bulbs", recommendedMaterial: "Smart Dimming LED Fixtures", confidenceScore: 0.96, cost: "₹2,500", carbonReductionPercent: 82, durability: "Extremely High", recyclability: "Partial", bbox: [150, 5, 250, 80] },
      { element: "Indoor Plants", material: "None Detected", rating: "Low", ratingColor: "rose", confidence: 75, currentMaterial: "Empty Corner", recommendedMaterial: "Golden Pothos & Snake Plants", confidenceScore: 0.75, cost: "₹1,200", carbonReductionPercent: 12, durability: "Biological", recyclability: "100% Organic", bbox: [420, 420, 480, 550] }
    ],
    breakdownData: [
      { name: "Floor Structure", current: 180, recommended: 65 },
      { name: "Furniture Components", current: 210, recommended: 45 },
      { name: "Paint & Wall Coverings", current: 90, recommended: 15 },
      { name: "Windows & Thermal", current: 140, recommended: 60 },
      { name: "Active Lighting", current: 120, recommended: 20 },
      { name: "Indoor Air Quality Index", current: 40, recommended: 85 }
    ],
    radarData: [
      { parameter: "Carbon Impact", score: 45, fullMark: 100 },
      { parameter: "Recyclability", score: 35, fullMark: 100 },
      { parameter: "Durability", score: 70, fullMark: 100 },
      { parameter: "Energy Efficiency", score: 50, fullMark: 100 },
      { parameter: "Indoor Air Quality", score: 40, fullMark: 100 }
    ],
    iaq: {
      vocLevel: "1.2 mg/m³ (Moderate)",
      airQualityScore: 52,
      ventilationEfficiency: 48,
      healthRisk: "Mild respiratory sensitives"
    },
    smartBuildingEnergy: [
      { recommendation: "LED Smart Bulbs & Daylighting Sensors", impact: "High Energy Reduction", savings: 4800 },
      { recommendation: "Double Glazing Refit for Windows", impact: "Thermal Loss Reduction", savings: 12000 },
      { recommendation: "Eco-Smart Thermostat Integration", impact: "Optimized HVAC Duty-cycle", savings: 15200 }
    ],
    sdgs: [
      { goalNumber: 11, goalName: "Sustainable Cities", metric: "Decreased embodied room footprint by ~220kg CO₂e" },
      { goalNumber: 12, goalName: "Responsible Consumption", metric: "100% transition to bio-degradable or circular materials" },
      { goalNumber: 13, goalName: "Climate Action", metric: "Lifecycle savings equivalent to planting 15 mature cedar trees" }
    ]
  });

  // Chat conversation state
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I am your EcoDesign AI assistant. Let me help you analyze carbon footprints, check VOC emission levels, and suggest sustainable interior solutions.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
  ]);

  // Probe API key configuration
  useEffect(() => {
    async function checkApiKey() {
      try {
        // Just send a small default ping request to verify
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "PING_KEY_CHECK" })
        });
        const val = await res.json();
        if (val && !val.simulated) {
          setApiKeyActive(true);
        }
      } catch (err) {
        console.log("Telemetry check error:", err);
      }
    }
    checkApiKey();
  }, []);

  const handleStartFromHero = (action: "upload" | "analyze") => {
    setInApp(true);
    if (action === "upload") {
      setCurrentTab("room-analysis");
    } else {
      setCurrentTab("dashboard");
    }
  };

  // Predefined Baseline template triggers (Instant client switch + Express fetch)
  const handleSelectTemplate = async (templateId: "modern_living_room" | "executive_office") => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/analyze-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId })
      });
      const result = await res.json();
      if (result.success && result.data) {
        setRoomData(result.data);
      }
    } catch (e) {
      console.error("Template switch error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  // Custom base64 uploading logic (Gemini real vision or engine fallback simulation)
  const handleCustomImageUpload = async (imageBase64: string, desc: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/analyze-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64, customDescription: desc })
      });
      const result = await res.json();
      if (result.success && result.data) {
        setRoomData(result.data);
        setCurrentTab("room-analysis");
      }
    } catch (err) {
      console.error("Custom image process error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Formulating and sending chat message to LLM
  const handleSendMessage = async (msg: string) => {
    const formattedHistory = chatHistory.map((h) => ({
      role: h.role,
      content: h.content,
    }));

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      content: msg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setIsChatLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history: formattedHistory })
      });
      const data = await res.json();
      if (data.success) {
        const assistantMsg: ChatMessage = {
          id: Math.random().toString(),
          role: "assistant",
          content: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatHistory((prev) => [...prev, assistantMsg]);
      }
    } catch (error) {
      console.error("Chat communication failure:", error);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleClearHistory = () => {
    setChatHistory([
      {
        id: "welcome",
        role: "assistant",
        content: "Hello! I am your EcoDesign AI assistant. Let me help you analyze carbon footprints, check VOC emission levels, and suggest sustainable interior solutions.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2] font-sans antialiased text-[#2F2F2F]">
      {/* Top Banner indicating Gemini secrets configuration */}
      <div className="bg-[#E8DCCB] border-b border-[#8D8B87]/30 text-xs px-4 py-2 flex items-center justify-between z-40 relative">
        <div className="flex items-center gap-2.5">
          <Leaf className="w-4 h-4 text-[#556B2F]" />
          <span>
            {apiKeyActive 
              ? "GEMINI AUDITOR: ONLINE (Full-Stack Mode Connected)"
              : "Demo Mode Active - Configure process.env.GEMINI_API_KEY in Settings Secrets file for live custom room checks!"
            }
          </span>
        </div>
        {!inApp ? (
          <button
            onClick={() => handleStartFromHero("analyze")}
            className="text-[10px] font-mono font-bold uppercase hover:underline flex items-center gap-1 cursor-pointer"
          >
            Access Dashboard Workspaces &rarr;
          </button>
        ) : (
          <button
            onClick={() => setInApp(false)}
            className="text-[10px] font-mono font-bold uppercase hover:underline flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Landing page
          </button>
        )}
      </div>

      {/* Conditional Layout selection */}
      {!inApp ? (
        <LandingHero onStart={handleStartFromHero} />
      ) : (
        <div className="flex min-h-screen relative pl-64">
          
          {/* Permanent rounded sidebar navigation */}
          <Sidebar
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            overallScore={roomData.overallScore}
          />

          {/* Core Content Workspace */}
          <main className="flex-1 p-8 sm:p-12 max-w-6xl mx-auto overflow-y-auto h-screen scrollbar-thin">
            {currentTab === "dashboard" && (
              <DashboardOverview data={roomData} onNavigate={setCurrentTab} />
            )}
            
            {currentTab === "room-analysis" && (
              <RoomAnalyzer
                data={roomData}
                isLoading={isLoading}
                onSelectTemplate={handleSelectTemplate}
                onCustomImageUpload={handleCustomImageUpload}
              />
            )}

            {currentTab === "carbon-footprint" && (
              <CarbonFootprint data={roomData} />
            )}

            {currentTab === "sustainability-score" && (
              <SustainabilityScore data={roomData} />
            )}

            {currentTab === "recommendations" && (
              <RecommendationEngine data={roomData} />
            )}

            {currentTab === "room-redesign" && (
              <RoomRedesign data={roomData} />
            )}

            {currentTab === "air-quality" && (
              <IndoorAirAndSmartEnergy data={roomData} />
            )}

            {currentTab === "lca" && (
              <LifeCycleAssessment data={roomData} />
            )}

            {currentTab === "sdg-impact" && (
              <SdgImpact data={roomData} />
            )}

            {currentTab === "ai-assistant" && (
              <AiAssistant
                chatHistory={chatHistory}
                onSubmitMessage={handleSendMessage}
                onClearHistory={handleClearHistory}
                isChatLoading={isChatLoading}
              />
            )}

            {currentTab === "smart-building" && (
              <IndoorAirAndSmartEnergy data={roomData} />
            )}

            {currentTab === "settings" && (
              <SettingsView apiKeyActive={apiKeyActive} />
            )}
          </main>
        </div>
      )}
    </div>
  );
}

