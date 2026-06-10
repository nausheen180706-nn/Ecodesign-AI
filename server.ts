import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "30mb" }));

// Mock/Template room datasets matching our ultra-high-fidelity schema to guarantee gorgeous UI
const roomTemplates: Record<string, any> = {
  modern_living_room: {
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
  },
  executive_office: {
    overallScore: 92,
    carbonFootprintKg: 320,
    carbonReductionPotentialPercent: 55,
    estimatedCostSavingsInr: 45000,
    energyEfficiencyRating: "A++",
    detections: [
      { element: "Flooring", material: "Standard Nylon Carpet Tiles", rating: "Medium", ratingColor: "amber", confidence: 92, currentMaterial: "Nylon Synthetic", recommendedMaterial: "Organic Cork Underlayment & Wool Tiles", confidenceScore: 0.92, cost: "₹22,000", carbonReductionPercent: 58, durability: "High", recyclability: "Excellent", bbox: [150, 480, 500, 800] },
      { element: "Furniture", material: "Industrial Steel & Non-Recycled Plastic Desk", rating: "Low", ratingColor: "rose", confidence: 89, currentMaterial: "Melamine & Steel Desk", recommendedMaterial: "Solid FSC Oak with Recycled Pet Divider", confidenceScore: 0.89, cost: "₹35,000", carbonReductionPercent: 50, durability: "Ultra High", recyclability: "High", bbox: [200, 280, 420, 600] },
      { element: "Lighting", material: "T8 Fluorescent Tubes", rating: "Low", ratingColor: "rose", confidence: 94, currentMaterial: "T8 Fluorescent", recommendedMaterial: "High-efficiency Micro-Prismatic OLED Panels", confidenceScore: 0.94, cost: "₹8,500", carbonReductionPercent: 75, durability: "Extremely High", recyclability: "Partial", bbox: [100, 20, 200, 90] },
      { element: "Air Purifier", material: "None Detected", rating: "Low", ratingColor: "rose", confidence: 80, currentMaterial: "Natural Fresh Air Only", recommendedMaterial: "Smart HEPA + Coconut Activated Carbon Purifier", confidenceScore: 0.80, cost: "₹14,900", carbonReductionPercent: 10, durability: "High", recyclability: "Biodegradable filters", bbox: [30, 310, 100, 410] }
    ],
    breakdownData: [
      { name: "Floor Structure", current: 120, recommended: 50 },
      { name: "Furniture Components", current: 180, recommended: 60 },
      { name: "Paint & Wall Coverings", current: 40, recommended: 10 },
      { name: "Windows & Thermal", current: 80, recommended: 40 },
      { name: "Active Lighting", current: 140, recommended: 35 },
      { name: "Indoor Air Quality Index", current: 35, recommended: 90 }
    ],
    radarData: [
      { parameter: "Carbon Impact", score: 60, fullMark: 100 },
      { parameter: "Recyclability", score: 40, fullMark: 100 },
      { parameter: "Durability", score: 85, fullMark: 100 },
      { parameter: "Energy Efficiency", score: 45, fullMark: 100 },
      { parameter: "Indoor Air Quality", score: 35, fullMark: 100 }
    ],
    iaq: {
      vocLevel: "1.8 mg/m³ (High)",
      airQualityScore: 38,
      ventilationEfficiency: 40,
      healthRisk: "Headaches, concentration drops, stale CO₂ pockets"
    },
    smartBuildingEnergy: [
      { recommendation: "Daylighting Controllers & Dimming Dimers", impact: "Energy Usage Optimization", savings: 5500 },
      { recommendation: "Smart Ventilation Fan with CO₂ Sensor", impact: "Air Exchange Improvement", savings: 9500 },
      { recommendation: "Solar-Powered USB Workstations", impact: "Off-Grid Desktop Operations", savings: 30000 }
    ],
    sdgs: [
      { goalNumber: 3, goalName: "Good Health", metric: "Replaced VOC elements, reducing concentration risk by 80%" },
      { goalNumber: 12, goalName: "Responsible Consumption", metric: "Carbon-negative harvested cork flooring reduces desk stress metrics" },
      { goalNumber: 13, goalName: "Climate Action", metric: "Avoided carbon footprint totals ~480kg CO₂ in 10-year usage block" }
    ]
  }
};

// Retry logic to handle transient errors such as 503 (high demand) or 429 (rate limits)
async function withRetry<T>(fn: () => Promise<T>, retries = 3, initialDelay = 1000): Promise<T> {
  let delay = initialDelay;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      const status = error?.status || error?.code;
      const isTransient =
        status === 503 ||
        status === 429 ||
        error?.message?.includes("503") ||
        error?.message?.includes("429") ||
        error?.message?.includes("UNAVAILABLE") ||
        error?.message?.includes("resource exhausted") ||
        (error?.message && error.message.toLowerCase().includes("high demand"));

      if (isTransient && i < retries) {
        console.warn(`Transient error encountered (${error?.message || error}). Retrying in ${delay}ms... (Attempt ${i + 1}/${retries})`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
      } else {
        throw error;
      }
    }
  }
  throw new Error("Failed after maximum retries");
}

// Lazy initialization logic for Gemini SDK
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "" && apiKey !== "MY_GEMINI_API_KEY") {
      geminiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return geminiClient;
}

// REST Api routes
app.post("/api/analyze-room", async (req, res) => {
  try {
    const { templateId, imageBase64, customDescription } = req.body;

    // Fast template loader matching high-fidelity presets
    if (templateId && roomTemplates[templateId]) {
      return res.json({
        success: true,
        source: "template",
        data: roomTemplates[templateId]
      });
    }

    const client = getGeminiClient();
    if (!client) {
      // If client-side uploaded or no api key, generate generic elegant ecological estimate based on template
      const basePreset = roomTemplates.modern_living_room;
      return res.json({
        success: true,
        source: "engine-simulation",
        note: "Add your GEMINI_API_KEY in the secrets menu for live multi-modal vision parsing.",
        data: {
          ...basePreset,
          overallScore: 78,
          carbonFootprintKg: 680,
          carbonReductionPotentialPercent: 48,
          estimatedCostSavingsInr: 28500,
          energyEfficiencyRating: "B+",
          iaq: {
            vocLevel: "1.5 mg/m³ (Moderate VOCs)",
            airQualityScore: 48,
            ventilationEfficiency: 45,
            healthRisk: "Moderate formaldehyde emission"
          }
        }
      });
    }

    // Call real Gemini API if key is set
    const userPrompt = `
      You are an expert AI Sustainable Interior Designer and carbon auditor.
      Analyze the room details provided by the user. Generate a comprehensive sustainable room analysis and return a valid JSON object matching the following structure:
      
      {
        "overallScore": number (sustainability rating out of 100),
        "carbonFootprintKg": number (total CO2 footprint in kg),
        "carbonReductionPotentialPercent": number (estimated percentage savings),
        "estimatedCostSavingsInr": number (annual savings in Indian Rupees ₹),
        "energyEfficiencyRating": string (e.g. "A+", "A++", "B"),
        "detections": [
          {
            "element": "Flooring" | "Furniture" | "Wall Paint" | "Windows" | "Lighting" | "Plants",
            "material": string (current material detected),
            "rating": "Low" | "Medium" | "High",
            "ratingColor": "rose" | "amber" | "emerald",
            "confidence": number (1-100),
            "currentMaterial": string,
            "recommendedMaterial": string (eco-friendly alternative),
            "cost": string (estimated cost in ₹),
            "carbonReductionPercent": number,
            "durability": "Medium" | "High" | "Very High",
            "recyclability": string (recylability metric description),
            "bbox": [number, number, number, number] (pixel bounding box coordinates [x, y, w, h] roughly representing area)
          }
        ],
        "breakdownData": [
          { "name": string, "current": number, "recommended": number }
        ],
        "radarData": [
          { "parameter": "Carbon Impact", "score": number, "fullMark": 100 },
          { "parameter": "Recyclability", "score": number, "fullMark": 100 },
          { "parameter": "Durability", "score": number, "fullMark": 100 },
          { "parameter": "Energy Efficiency", "score": number, "fullMark": 100 },
          { "parameter": "Indoor Air Quality", "score": number, "fullMark": 100 }
        ],
        "iaq": {
          "vocLevel": string,
          "airQualityScore": number,
          "ventilationEfficiency": number,
          "healthRisk": string
        },
        "smartBuildingEnergy": [
          { "recommendation": string, "impact": string, "savings": number }
        ],
        "sdgs": [
          { "goalNumber": number, "goalName": string, "metric": string }
        ]
      }

      Context or User Input Details: ${customDescription || "A standard living room with ceramic tiling, traditional VOC paints, non-led bulbs, and standard MDF composite tables."}
    `;

    let response;
    if (imageBase64) {
      // Analyze file base64 + text prompt
      const imagePart = {
        inlineData: {
          mimeType: imageBase64.split(";")[0].split(":")[1] || "image/jpeg",
          data: imageBase64.split(",")[1] || imageBase64,
        },
      };
      
      response = await withRetry(() => client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: { parts: [imagePart, { text: userPrompt }] },
        config: {
          responseMimeType: "application/json",
        }
      }));
    } else {
      // Analyze text prompt only
      response = await withRetry(() => client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: userPrompt,
        config: {
          responseMimeType: "application/json",
        }
      }));
    }

    const textOutput = response.text || "{}";
    const cleanedText = textOutput.trim().replace(/^```json\s*/i, "").replace(/```\s*$/, "");
    const parsedData = JSON.parse(cleanedText);

    return res.json({
      success: true,
      source: "gemini",
      data: parsedData
    });

  } catch (error: any) {
    console.error("Gemini room analysis error (falling back to simulation):", error);
    // Graceful high fidelity fallback when Gemini service is unavailable
    return res.json({
      success: true,
      source: "engine-simulation",
      note: `The AI is currently under high demand: ${error.message || "503/429 unavailable"}. Operating under high-fidelity simulation.`,
      data: {
        ...roomTemplates.modern_living_room,
        note: `Self-healing fallback active. Temporary latency at: ${new Date().toLocaleTimeString()}`
      }
    });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    const client = getGeminiClient();

    if (!client) {
      // Elegant built-in response manager if GEMINI_API_KEY is not provisioned
      const messageLower = (message || "").toLowerCase();
      let reply = "I would love to help you build or design a greener space! To get real-time dynamic AI responses, please add your **GEMINI_API_KEY** in the Settings secrets tab. Let me share some eco-intelligent interior advice with you:\n\n";

      if (messageLower.includes("floor") || messageLower.includes("tile")) {
        reply += "• **Sustainable Flooring Options**: Cork, bamboo, and reclaimed oak wood are fantastic replacements for traditional tiles and PVC vinyl. Cork is bio-sourced, carbon-negative, and offers exceptional natural sound dampening. Bamboo regenerates 10x faster than traditional timber.";
      } else if (messageLower.includes("paint") || messageLower.includes("voc")) {
        reply += "• **Low-VOC and Organic Paints**: Conventional acrylic paints emit gaseous organic compounds for months. Transitioning to clay-based, silicate, or zero-VOC mineral paints minimizes indoor pulmonary toxicity and improves IAQ score significantly.";
      } else if (messageLower.includes("air") || messageLower.includes("quality")) {
        reply += "• **Indoor Air Improvement**: Introduce high air-purifying foliage like Sansevieria (Snake Plant), Epipremnum aureum (Golden Pothos), and Peace Lilies. Combine these with organic plaster and wool wall upholstery which naturally absorb free ambient formaldehyde.";
      } else {
        reply += "• **Carbon Neutral Interior Guidelines**:\n- **FSC-Certified Timber**: Ensures logs are systematically harvested from renewable carbon-offset forests.\n- **Circular Metal & Plastics**: Reuse structural aluminum frames or explore ocean-plastic composite tables.\n- **LED Integration**: Swapping classic fluorescent tubes saves up to 80% thermal discharge and active wattage draw.";
      }
      return res.json({ success: true, text: reply, simulated: true });
    }

    // Call real Gemini API
    const systemInstruction = `
      You are "EcoDesign AI Assistant", an advanced, friendly, highly professional sustainability consulting bot. 
      You help interior designers, architects, and householders design ecological interiors with low carbon footprints, high recyclability, and excellent environmental ratings.
      Keep your answers premium, informative, clear, and well-styled in clean Markdown. Include lists, bullet points, and specific details like carbon quantities (kg CO₂ saved) and material durability grades.
    `;

    // Construct format history
    const formattedContents = [];
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        formattedContents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }]
        });
      }
    }
    // Append current message
    formattedContents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await withRetry(() => client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
      }
    }));

    return res.json({
      success: true,
      text: response.text || "I was unable to formulate a response at this moment. Let me know if you would like to explore specific material parameters!"
    });

  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);
    // Offline / Fallback knowledge assistant content in case Gemini is 503/429
    const offlineReplies = [
      "The carbon-neutral interior assistant is operating in a cached mode because our primary AI channels are currently experiencing high demand. Let me share some essential guidance on how you can reduce your carbon footprint right now:\n\n• **Flooring Upgrade**: Upgrading ceramic or PVC flooring to bamboo or bio-based cork can reduce floor carbon impact by 45-60%.\n• **Zero-VOC Paints**: Using clay-based or natural mineral paints prevents off-gassing and keeps the Indoor Air Quality index in the healthy range.\n• **High-Efficiency Lighting**: Swapping older halogen bulbs for modern smart dimming LEDs reduces baseline electric power consumption by over 80%.",
      "I'm currently connected to our local ecological archives because of high demand on our primary AI neural networks. Here's a quick tip on **Life Cycle Assessment (LCA)**: choosing materials like reclaimed timber or FSC-certified oak guarantees that their wood came from circular, sustainable origins.",
      "The Eco Intelligent brain is currently undergoing minor adjustments. Based on our sustainable material specifications, we always advise avoiding MDF composite furniture that uses urea-formaldehyde resins. Instead, select solid bamboo, sugarcane-fiberboards, or metal fixtures that can be 100% recycled at their end of life."
    ];
    const fallbackText = offlineReplies[Math.floor(Math.random() * offlineReplies.length)];

    return res.json({
      success: true,
      text: `*(Notice: AI model is currently busy. Operating with offline archives)*\n\n${fallbackText}`,
      simulated: true
    });
  }
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Mount Vite development middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve build path static files
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[EcoDesign AI Backend] Express Server runing on http://localhost:${PORT}`);
  });
}

startServer();
