"use client";

import { Play, Share2, Bookmark, Check, Star, Sparkles, ExternalLink, Copy } from "lucide-react";
import { useState } from "react";

export default function ArticleDetail() {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const samplePrompt = `# 파트 1: 영상 분석 & 팩트체크
소규모 매장을 운영하거나 유튜브 채널을 시작할 때 가장 큰 걸림돌 중 하나가 바로 '음악 저작권'입니다. 이번 영상에서는 구글의 최신 음악 생성 AI인 Lyria...

핵심 팩트체크:
1. 3분 길이의 완곡 생성: 작곡 지식이 전혀 없어도 구글 Lyria 모델을 통해 최대 3분 길이의 완성도 높은 곡을 생성할 수 있습니다.
2. 역대급 가성비: 3분 분량의 곡을 생성하는 데 드는 비용은 약 108원 수준으로, 상업적 가치가 있는 재화를 매우 저렴하게 생산할 수 있습니다.
3. 에이전틱 솔루션: 사람이 일일이 작업하는 대신, AI 에이전트(Antigravity)가 트렌드 분석부터 이미지 생성, 유튜브 업로드까지 전 과정을 스스로 수행합니다.

# 파트 2: 더 알아보기 & 독자 액션 가이드
비개발자 직장인이 AI 기술을 활용해 어떻게 실질적인 가치를 만들 수 있을까요? 단순히 기능을 아는 것을 넘어 '돈이 되는 워크플로우'를 이해하는 것이 핵심입니다.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(samplePrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="max-w-[900px] w-full px-6 py-12 flex flex-col items-center mx-auto">
      
      {/* Article Header & Badges */}
      <div className="w-full flex flex-col items-start mb-8 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-md">
            AI 따라하기
          </span>
          <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-bold rounded-md">
            #수익자동화
          </span>
          <span className="text-xs text-gray-400 font-medium ml-auto">
            출처 채널: CONNECT AI LAB | 2026.08.13
          </span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
          [AI 따라하기] 구글 Lyria로 3분 만에 저작권 프리 음악 만들기
        </h1>

        <p className="text-gray-600 text-base leading-relaxed">
          저작권 걱정 없이 곡당 100원대로 나만의 배경음악을 무제한 만드는 최고의 실무 가이드
        </p>
      </div>

      {/* Featured YouTube Video Box - Inline Player */}
      <div className="w-full aspect-video rounded-2xl overflow-hidden relative group mb-10 shadow-lg border border-gray-200 bg-black">
        {isPlaying ? (
          <iframe
            src="https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&rel=0"
            title="Google Lyria Music AI Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        ) : (
          <div 
            onClick={() => setIsPlaying(true)}
            className="w-full h-full relative cursor-pointer group"
          >
            <img 
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200" 
              alt="Google Lyria Music AI" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center flex-col gap-3 text-white">
              <div className="w-16 h-16 bg-[#f97316] rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Play className="text-white fill-white w-7 h-7 ml-1" />
              </div>
              <span className="font-bold text-sm bg-black/60 px-4 py-1.5 rounded-full border border-white/20">
                ▶ 클릭하여 현재 페이지에서 바로 영상 재생하기 (CONNECT AI LAB)
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Editor Ratings Box */}
      <section className="w-full bg-slate-900 text-white rounded-2xl p-6 md:p-8 mb-10 shadow-md">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-lg text-amber-400">AIditor 에디터 평가 (별점 5.0)</h3>
          </div>
          <span className="text-xs text-slate-400">대상: 스타터 (0~3년 차)</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "활용 난이도", score: "5 / 5" },
            { label: "시간 절약 효과", score: "5 / 5" },
            { label: "비용 부담", score: "5 / 5 (곡당 100원)" },
            { label: "실무 적용성", score: "5 / 5" }
          ].map((item, i) => (
            <div key={i} className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 text-center">
              <span className="text-xs text-slate-400 font-medium block mb-1">{item.label}</span>
              <span className="text-sm font-bold text-amber-300 flex items-center justify-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {item.score}
              </span>
            </div>
          ))}
        </div>

        <p className="text-sm text-slate-300 bg-slate-950/60 p-4 rounded-xl border border-slate-800 leading-relaxed">
          💬 <strong className="text-amber-300">에디터 총평:</strong> 별점 5.0 / 저작권 걱정 없이 곡당 100원대로 나만의 배경음악을 무제한 만드는 최고의 실무 가이드입니다.
        </p>
      </section>

      {/* Key Takeaways (Editor Picks) */}
      <section className="w-full bg-amber-50 border border-amber-200/80 rounded-2xl p-6 md:p-8 mb-10 shadow-sm">
        <h3 className="font-bold text-amber-900 text-lg mb-4 flex items-center gap-2">
          📌 에디터 픽 3가지 (Key Takeaways)
        </h3>
        <ul className="flex flex-col gap-3">
          {[
            "에디터 픽 1: 구글 Lyria로 3분 만에 저작권 프리 완곡 무한 생성",
            "에디터 픽 2: AI 에이전트로 트렌드 분석부터 업로드까지 100% 자동화",
            "에디터 픽 3: 곡당 100원대로 구축하는 초소형 1인 기업 수익 모델"
          ].map((text, i) => (
            <li key={i} className="flex gap-3 items-start text-sm text-amber-950 font-medium leading-relaxed">
              <span className="w-2 h-2 rounded-full bg-[#f97316] mt-2 shrink-0"></span>
              {text}
            </li>
          ))}
        </ul>
      </section>

      {/* Execution Guide (Step-by-step) */}
      <section className="w-full bg-white border border-gray-200 rounded-2xl p-6 md:p-8 mb-10 shadow-sm">
        <h3 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-2">
          🎯 독자 실천 가이드 (Execution Guide)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { step: "Step 01", title: "첫 곡 생성", desc: "구글 제미나이(Lyria)에 접속해 영상 속 프롬프트 템플릿으로 첫 곡을 생성합니다." },
            { step: "Step 02", title: "플랫폼 검증", desc: "생성된 음원을 유튜브나 배경음악 서비스 플랫폼에 업로드하여 반응을 확인합니다." },
            { step: "Step 03", title: "자동화 시스템 구축", desc: "구글 AI 스튜디오 API와 에이전트 기능을 연동해 제작 과정을 자동화합니다." }
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex flex-col gap-2">
              <span className="text-xs font-bold text-[#f97316]">{item.step}</span>
              <h4 className="font-bold text-sm text-gray-900">{item.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2-Part Full Content Asset & Copy Button */}
      <section className="w-full bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-base text-slate-200">📋 뉴닉 스타일 2파트 마크다운 리포트 (복붙용)</h3>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 bg-[#f97316] hover:bg-[#ea580c] text-white px-4 py-2 rounded-lg font-bold text-xs transition-all shadow cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "복사완료!" : "1초 복사하기"}
          </button>
        </div>

        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
          {samplePrompt}
        </div>
      </section>

    </main>
  );
}
