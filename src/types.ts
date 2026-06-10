export interface Detection {
  element: string;
  material: string;
  rating: "Low" | "Medium" | "High";
  ratingColor: "rose" | "amber" | "emerald";
  confidence: number;
  currentMaterial: string;
  recommendedMaterial: string;
  cost: string;
  carbonReductionPercent: number;
  durability: string;
  recyclability: string;
  bbox: number[]; // [x, y, w, h] representing visual coordinates
}

export interface RoomAnalysisData {
  overallScore: number;
  carbonFootprintKg: number;
  carbonReductionPotentialPercent: number;
  estimatedCostSavingsInr: number;
  energyEfficiencyRating: string;
  detections: Detection[];
  breakdownData: Array<{ name: string; current: number; recommended: number }>;
  radarData: Array<{ parameter: string; score: number; fullMark: number }>;
  iaq: {
    vocLevel: string;
    airQualityScore: number;
    ventilationEfficiency: number;
    healthRisk: string;
  };
  smartBuildingEnergy: Array<{ recommendation: string; impact: string; savings: number }>;
  sdgs: Array<{ goalNumber: number; goalName: string; metric: string }>;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
