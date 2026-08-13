"use client";

import { useState } from "react";
import { UserCircle, Copy, ExternalLink, Check, Sparkles } from "lucide-react";

export default function Home() {
  const [selectedJob, setSelectedJob] = useState("직무 공통");
  const [copied, setCopied] = useState(false);

  const jobs = ["직무 공통", "기획·PM", "마케터", "인사·HR", "재무·회계", "디자인·BX", "1인기업"];

  const samplePrompt = `Act as a senior marketer. Please analyze [제품명] target audience and generate 5 punchy headline copy ideas for [마케팅 채널].`;

  const handleCopy = () => {
    navigator.clipboard.writeText(samplePrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const latestDispatches = [
    { tag: "#수익자동화", badge: "AI 따라하기", title: "[AI 따라하기] 구글 Lyria로 3분 만에 저작권 프리 음악 만들기", date: "2026.08.13", color: "bg-emerald-100 text-emerald-700", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600", href: "/article" },
    { tag: "#복붙용_프롬프트", badge: "AI/업무생산성", title: "주 5시간 절약하는 챗GPT 마케팅 보고서 프롬프트 15선", date: "2026.07.30", color: "bg-orange-100 text-orange-700", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600" },
    { tag: "#자동화_시나리오", badge: "생성형 AI & 업무자동화", title: "n8n으로 이메일 수신 시 구글 시트 자동 기록 10초 완성", date: "2026.07.29", color: "bg-emerald-100 text-emerald-700", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600" },
    { tag: "#자연어_레시피", badge: "AI 에이전트 & 바이브코딩", title: "코딩 없이 말로 만드는 나만의 카카오톡 AI 비서 에이전트", date: "2026.07.28", color: "bg-blue-100 text-blue-700", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600" },
    { tag: "#업무_템플릿", badge: "일잘러의 업무스킬", title: "엑셀 칼퇴 서식: AI 함수로 데이터 1초 만에 자동 정형화", date: "2026.07.27", color: "bg-indigo-100 text-indigo-700", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=600" },
    { tag: "#자연어_레시피", badge: "AI CREATIVE", title: "미드저니 & Sora로 5분 만에 사내 홍보 포스터·영상 제작", date: "2026.07.26", color: "bg-purple-100 text-purple-700", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600" },
    { tag: "#보고서_작성법", badge: "리더십 & AX 전략", title: "2026년 기업 AI 전환(AX) 리더가 알아야 할 AGI 대응 전략", date: "2026.07.25", color: "bg-teal-100 text-teal-700", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600" },
    { tag: "#복붙용_프롬프트", badge: "비즈니스 & 커리어", title: "1인 기업인을 위한 AI 지식자산 수익화 파이프라인 구축", date: "2026.07.24", color: "bg-rose-100 text-rose-700", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600" }
  ];

  return (
    <main className="w-full max-w-[1200px] px-6 py-8 flex flex-col gap-8">

      {/* Sub Filter Bar (Demand 3-Axis) */}
      <section className="flex flex-wrap items-center gap-2 pb-4 border-b border-gray-200">
        <span className="text-xs font-bold text-gray-400 mr-2 uppercase tracking-wider">직무 선택:</span>
        {jobs.map((job) => (
          <button
            key={job}
            onClick={() => setSelectedJob(job)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedJob === job
                ? "bg-[#f97316] text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {job}
          </button>
        ))}
      </section>

      {/* Hero Section: 1초 원클릭 복붙 상자 */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-slate-700 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-amber-400/20 text-amber-300 text-xs font-bold rounded-md flex items-center gap-1 border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" /> ⚡ 10초 칼퇴 원클릭 복붙 프롬프트
          </span>
          <span className="text-xs text-slate-400 font-medium">[추천 대상: {selectedJob}]</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
          보고서·기획서 10분 만에 끝내는 실무 전용 AI 레시피
        </h2>

        {/* 복붙 상자 (Copy-Paste Asset Box) */}
        <div className="bg-slate-950/80 border border-slate-700/80 rounded-xl p-5 mb-6 font-mono text-sm leading-relaxed text-slate-200 shadow-inner relative">
          <p>
            Act as a senior marketer. Analyze target audience for{" "}
            <span className="bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-bold border border-amber-400/40">[제품명]</span>{" "}
            and write 5 headline copy ideas for{" "}
            <span className="bg-sky-400/20 text-sky-300 px-2 py-0.5 rounded font-bold border border-sky-400/40">[마케팅 채널]</span>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 bg-[#f97316] hover:bg-[#ea580c] text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-md cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "복사되었습니다! 챗GPT에 붙여넣으세요" : "📋 1초 원클릭 복사하기"}
          </button>
          <a
            href="https://chatgpt.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-bold text-sm transition-all shadow-md cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            🚀 챗GPT 새탭에서 열기
          </a>
        </div>
      </section>

      {/* Zippy Subscription Banner */}
      <section className="bg-[#ffedd5] rounded-2xl p-8 border border-orange-100 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div className="flex-1 z-10">
          <h3 className="text-xl font-bold text-gray-900 mb-1">AIditor 뉴스레터 구독하기</h3>
          <p className="text-sm text-orange-900/80 max-w-lg">
            55개 검증 채널의 매일 아침 최신 AI 꿀팁을 직장인 5분 요약으로 가장 먼저 받아보세요.
          </p>
        </div>
        
        <div className="flex w-full md:w-auto gap-2 z-10">
          <input 
            type="email" 
            placeholder="이메일 주소를 입력하세요" 
            className="px-4 py-2.5 rounded border border-orange-200 focus:outline-none focus:ring-2 focus:ring-[#f97316] w-full md:w-64 text-sm bg-white"
          />
          <button className="px-6 py-2.5 bg-[#f97316] text-white font-bold text-sm rounded shadow-sm hover:bg-[#ea580c] transition-colors whitespace-nowrap cursor-pointer">
            구독하기
          </button>
        </div>
      </section>

      {/* Latest Dispatches Grid */}
      <section className="mt-4">
        <div className="flex items-end justify-between mb-6 pb-2 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">최신 아티클 & 복붙 레시피</h2>
          <button className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">
            전체 보기
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestDispatches.map((article, i) => (
            <div key={i} className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="h-40 bg-gray-900 relative">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                  <span className="bg-slate-900/90 text-white text-[10px] px-2 py-0.5 font-bold rounded">
                    {article.badge}
                  </span>
                  <span className={`${article.color} text-[10px] px-2 py-0.5 font-bold rounded`}>
                    {article.tag}
                  </span>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-[15px] leading-tight text-gray-900 mb-6 group-hover:text-[#f97316] transition-colors">
                  {article.title}
                </h3>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">{article.date}</span>
                  <span className="text-xs text-emerald-600 font-bold">1초 복사 가능 📋</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}

