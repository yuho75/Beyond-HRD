"use client";

import { use } from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";

const categoryMap: Record<string, string> = {
  c1: "AI/업무생산성",
  c2: "업무자동화",
  c3: "AI에이전트",
  c4: "업무스킬",
  c5: "AI CREATIVE",
  c6: "AX전략",
  c7: "비즈니스",
};

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const catName = categoryMap[resolvedParams.id] || "AI 인사이트";

  return (
    <main className="w-full max-w-[1200px] px-6 py-12 flex flex-col gap-8 mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> 홈으로 돌아가기
        </Link>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col gap-3">
        <span className="px-3 py-1 bg-orange-100 text-[#f97316] text-xs font-bold rounded-md w-fit flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> 카테고리 리포트
        </span>
        <h1 className="text-3xl font-extrabold text-gray-900">{catName}</h1>
        <p className="text-sm text-gray-500">
          {catName} 분야의 최신 AI 꿀팁과 실무 프롬프트 모음입니다.
        </p>
      </div>

      <section className="bg-slate-900 text-white rounded-2xl p-8 text-center border border-slate-700">
        <h2 className="text-xl font-bold mb-2">⚡ Opal 최신 아티클 추천</h2>
        <p className="text-sm text-slate-300 mb-6">구글 Lyria로 3분 만에 저작권 프리 음악 만들기 리포트를 확인해 보세요.</p>
        <Link href="/article" className="inline-flex items-center gap-2 bg-[#f97316] hover:bg-[#ea580c] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md">
          🚀 Opal 정리 리포트 보러가기
        </Link>
      </section>
    </main>
  );
}
