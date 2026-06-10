import React, { useState, useRef, useEffect } from "react";
import { Send, Leaf, HelpCircle, User, Cpu, AlertCircle, Trash2, ArrowRight } from "lucide-react";
import { ChatMessage } from "../types";

interface AiAssistantProps {
  chatHistory: ChatMessage[];
  onSubmitMessage: (msg: string) => void;
  onClearHistory: () => void;
  isChatLoading: boolean;
}

export default function AiAssistant({
  chatHistory,
  onSubmitMessage,
  onClearHistory,
  isChatLoading,
}: AiAssistantProps) {
  const [userInput, setUserInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Suggestions list
  const helpQuestions = [
    "How can I reduce my room's carbon footprint?",
    "Which flooring is most sustainable?",
    "What is the best eco-friendly paint?",
    "Are bamboo fibers healthier than Nylon carpets?"
  ];

  // Auto-scroll on new messages
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isChatLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isChatLoading) return;
    onSubmitMessage(userInput.trim());
    setUserInput("");
  };

  return (
    <div className="space-y-8 animate-fade-in flex flex-col h-[78vh]">
      {/* Title block */}
      <div className="shrink-0 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#2F2F2F] tracking-tight font-display">
            AI Eco Assistant
          </h2>
          <p className="text-sm text-[#8D8B87] font-mono mt-1 uppercase tracking-wider">
            Conversational Sustainability Consultant
          </p>
        </div>

        {chatHistory.length > 1 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-2 px-3 py-1.5 border border-rose-200 hover:bg-rose-50 text-rose-700 rounded-xl text-xs font-mono font-bold hover:shadow-xs transition-all cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Reset Chat
          </button>
        )}
      </div>

      {/* Main chat layout */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Suggested Queries Left (4 cols) */}
        <div className="lg:col-span-4 shrink-0 flex flex-col justify-between space-y-6">
          <div className="eco-glass rounded-3xl p-6 border border-white/70 shadow-lg shadow-[#556B2F]/3 flex-1 space-y-4">
            <h4 className="text-xs font-mono font-bold text-[#8D8B87] uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#556B2F]" />
              Suggested Consultations
            </h4>
            <p className="text-xs text-[#8D8B87] leading-relaxed">
              Click any quick topic below to query the artificial neural consultant regarding carbon counts and materials.
            </p>

            <div className="space-y-2.5 pt-2">
              {helpQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => onSubmitMessage(q)}
                  className="w-full text-xs text-left p-3 rounded-xl border border-[#8D8B87]/15 hover:border-[#556B2F] bg-white text-[#2F2F2F] hover:text-[#556B2F] hover:shadow-xs font-medium cursor-pointer transition-all flex items-center justify-between gap-2 group"
                >
                  <span className="truncate">{q}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 text-[#C96A4A] group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Messaging Box Right (8 cols) */}
        <div className="lg:col-span-8 flex flex-col eco-glass rounded-3xl border border-white/70 shadow-xl shadow-[#556B2F]/3 overflow-hidden">
          
          {/* Header info */}
          <div className="p-4 border-b border-[#8D8B87]/10 flex items-center justify-between bg-black/5">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-wide text-[#556B2F] uppercase">
                Gemini 3.5 Core Node Active
              </span>
            </div>
            <span className="text-[10px] text-[#8D8B87] font-mono">
              Ask about low carbon building materials
            </span>
          </div>

          {/* Messages stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {chatHistory.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-4 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isUser ? "bg-[#C96A4A] text-white" : "bg-[#556B2F] text-white"
                  }`}>
                    {isUser ? <User className="w-4 h-4" /> : <Leaf className="w-4 h-4" />}
                  </div>

                  {/* Message body */}
                  <div className="space-y-1.5">
                    <div className={`p-4 rounded-2xl text-xs space-y-2 whitespace-pre-line leading-relaxed ${
                      isUser
                        ? "bg-[#C96A4A] text-white rounded-tr-none"
                        : "bg-white border border-[#8D8B87]/15 text-[#2F2F2F] rounded-tl-none shadow-xs"
                    }`}>
                      {msg.content}
                    </div>
                    <span className="block text-[9px] text-[#8D8B87] font-mono tracking-wider">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isChatLoading && (
              <div className="flex gap-4 max-w-[85%] mr-auto items-center">
                <div className="w-8 h-8 rounded-full bg-[#556B2F] text-white flex items-center justify-center shrink-0">
                  <Cpu className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#8D8B87]/15 text-xs text-[#8D8B87] rounded-tl-none flex items-center gap-2">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8D8B87] animate-[bounce_1.4s_infinite]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8D8B87] animate-[bounce_1.4s_infinite_0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8D8B87] animate-[bounce_1.4s_infinite_0.4s]" />
                  </span>
                  <span>AI is formulating eco-criteria parameters...</span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Form input bottom */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-[#8D8B87]/10 bg-white flex items-center gap-3">
            <input
              id="chat-user-input"
              type="text"
              required
              disabled={isChatLoading}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask questions (e.g. Is Slate flooring carbon neutral?)..."
              className="flex-1 text-xs px-4 py-3 bg-slate-50 border border-[#8D8B87]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#556B2F]/30 text-[#2F2F2F]"
            />
            <button
              id="submit-query"
              type="submit"
              disabled={isChatLoading || !userInput.trim()}
              className="p-3 bg-[#556B2F] hover:bg-[#556B2F]/90 text-white rounded-xl shadow shadow-[#556B2F]/20 disabled:opacity-40 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
