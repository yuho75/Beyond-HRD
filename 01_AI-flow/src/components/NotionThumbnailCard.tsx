"use client";

import React from "react";
import {
  Zap,
  Cpu,
  CheckCircle2,
  Terminal,
  Sparkles,
  FileText,
  Target,
  Bot,
  Rocket,
  Palette,
  Wand2,
  TrendingUp,
  Brain,
  Briefcase,
  Coins,
  ArrowRight,
  Workflow
} from "lucide-react";

interface NotionThumbnailCardProps {
  title: string;
  category: string;
  difficulty: string;
  channelName?: string;
  className?: string;
}

const CATEGORY_CONFIGS: Record<
  string,
  {
    subtitle: string;
    badgeColor: string;
    accentColor: string;
    steps: { name: string; desc: string; icon: React.ComponentType<{ className?: string }> }[];
  }
> = {
  "AI 업무 자동화": {
    subtitle: "AI AUTOMATION PULSE",
    badgeColor: "bg-orange-50 text-[#ea580c] border-orange-200",
    accentColor: "text-[#ea580c]",
    steps: [
      { name: "트리거 감지", desc: "실시간 이벤트", icon: Zap },
      { name: "Make·n8n", desc: "워크플로우 연결", icon: Workflow },
      { name: "자동화 완료", desc: "보고서·알림 도출", icon: CheckCircle2 },
    ],
  },
  "AI 도구 활용": {
    subtitle: "PRACTICAL AI TOOLKIT",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    accentColor: "text-blue-600",
    steps: [
      { name: "프롬프트 입력", desc: "컨텍스트 지정", icon: Terminal },
      { name: "AI 엔진 분석", desc: "Claude·GPT 요약", icon: Sparkles },
      { name: "실무 산출물", desc: "엑셀·문서 도출", icon: FileText },
    ],
  },
  "AI 기본 활용": {
    subtitle: "PRACTICAL AI TOOLKIT",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    accentColor: "text-blue-600",
    steps: [
      { name: "프롬프트 입력", desc: "컨텍스트 지정", icon: Terminal },
      { name: "AI 엔진 분석", desc: "Claude·GPT 요약", icon: Sparkles },
      { name: "실무 산출물", desc: "엑셀·문서 도출", icon: FileText },
    ],
  },
  "AI 에이전트": {
    subtitle: "AUTONOMOUS AGENT SYSTEM",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    accentColor: "text-purple-600",
    steps: [
      { name: "목표 설정", desc: "작업 가이드 부여", icon: Target },
      { name: "자율 실행", desc: "MCP·툴 체이닝", icon: Bot },
      { name: "미션 완수", desc: "최종 결과 납품", icon: Rocket },
    ],
  },
  "AI 크리에이티브": {
    subtitle: "AI CREATIVE PRODUCTION",
    badgeColor: "bg-pink-50 text-pink-700 border-pink-200",
    accentColor: "text-pink-600",
    steps: [
      { name: "컨셉 기획", desc: "스토리보드 설계", icon: Palette },
      { name: "생성 AI 변환", desc: "이미지·영상 합성", icon: Wand2 },
      { name: "콘텐츠 완성", desc: "상세페이지 납품", icon: Sparkles },
    ],
  },
  "AI 리더십·트렌드": {
    subtitle: "STRATEGIC TECH INSIGHTS",
    badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
    accentColor: "text-teal-600",
    steps: [
      { name: "시장 트렌드", desc: "글로벌 테크 흐름", icon: TrendingUp },
      { name: "기술 핵심", desc: "비즈니스 기회 분석", icon: Brain },
      { name: "도입 전략", desc: "조직 내재화 가이드", icon: Briefcase },
    ],
  },
  "AI 수익화": {
    subtitle: "AI MONETIZATION PLAYBOOK",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    accentColor: "text-emerald-600",
    steps: [
      { name: "니즈 발굴", desc: "시장 페인포인트", icon: Coins },
      { name: "AI 빌딩", desc: "서비스·프로덕트 구축", icon: Cpu },
      { name: "수익 파이프라인", desc: "자동화 매출 창출", icon: CheckCircle2 },
    ],
  },
};

export default function NotionThumbnailCard({
  title,
  category,
  difficulty,
  channelName,
  className = "",
}: NotionThumbnailCardProps) {
  const config = CATEGORY_CONFIGS[category] || CATEGORY_CONFIGS["AI 업무 자동화"];

  return (
    <div
      className={`w-full h-full relative overflow-hidden flex items-center justify-center p-2.5 sm:p-3 bg-[#f8fafc] border-b border-gray-200 select-none group-hover:bg-[#f1f5f9] transition-colors ${className}`}
      style={{
        backgroundImage: "radial-gradient(#e2e8f0 1px, transparent 1px)",
        backgroundSize: "14px 14px",
      }}
    >
      {/* Central Floating Notion Card */}
      <div className="w-full h-full bg-white rounded-lg border border-gray-200/90 shadow-[0_2px_6px_rgba(0,0,0,0.03)] p-2.5 sm:p-3 flex flex-col justify-between overflow-hidden">
        {/* Card Header */}
        <div className="flex items-center justify-between text-[10px] pb-1.5 border-b border-gray-100">
          <div className="flex items-center gap-1.5 font-bold">
            <span className="w-3.5 h-3.5 bg-black text-white text-[8px] font-black rounded flex items-center justify-center tracking-tighter">
              N
            </span>
            <span className="text-gray-800 tracking-tight font-extrabold text-[11px]">
              {category}
            </span>
          </div>
          <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase">
            {config.subtitle}
          </span>
        </div>

        {/* Card Body: 3 Step Minimal Flow Diagram */}
        <div className="my-auto py-1">
          <div className="grid grid-cols-3 gap-1 relative items-center">
            {config.steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center relative px-0.5">
                  {/* Step Icon Box */}
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center shadow-2xs mb-1 group-hover:scale-105 transition-transform">
                    <StepIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${config.accentColor}`} />
                  </div>
                  {/* Step Title */}
                  <div className="text-[10px] sm:text-[11px] font-black text-gray-800 leading-tight">
                    {step.name}
                  </div>
                  {/* Micro Description */}
                  <div className="text-[8px] sm:text-[9px] text-gray-400 font-medium leading-tight mt-0.5 hidden xs:block truncate max-w-full">
                    {step.desc}
                  </div>

                  {/* Connecting Arrow */}
                  {idx < 2 && (
                    <div className="absolute -right-2 top-3 sm:top-3.5 text-gray-300 pointer-events-none z-10">
                      <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Card Footer: Metadata note */}
        <div className="pt-1.5 border-t border-gray-100 flex items-center justify-between text-[9px] sm:text-[10px] text-gray-400">
          <div className="flex items-center gap-1.5 font-medium truncate max-w-[65%]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
            <span className="text-gray-600 font-semibold truncate">{channelName || "AIditor Curation"}</span>
          </div>
          <span className="text-[#ea580c] font-bold shrink-0 flex items-center gap-0.5">
            워크플로우 가이드 →
          </span>
        </div>
      </div>
    </div>
  );
}
