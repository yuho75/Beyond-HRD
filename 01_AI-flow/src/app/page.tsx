"use client";

import { useState, useEffect, Suspense } from "react";
import { Copy, ExternalLink, Check, Sparkles, Flame, Bookmark, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const TOPIC_CARD_THUMBNAILS: Record<string, string> = {
  "일잘러 장피엠": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
  "오빠두엑셀": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=600",
  "알린 ALINN": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600",
  "평범한 사업가": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600",
  "행글라이터": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600",
  "진한별의 AI 연구소": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
  "CONNECT AI LAB": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
  "AI 알려주는 남자 데브남": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600",
  "시민개발자 구씨": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=600",
  "디자인하는AI": "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600"
};

function resolveCardThumbnail(item: any, bodyObj: any): string {
  if (item.thumbnail && typeof item.thumbnail === "string" && item.thumbnail.startsWith("http")) {
    return item.thumbnail;
  }
  const channelName = bodyObj.source_channel_name || "";
  if (channelName && TOPIC_CARD_THUMBNAILS[channelName]) {
    return TOPIC_CARD_THUMBNAILS[channelName];
  }
  const vid = item.video_url || item.url || "";
  const match = vid.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (match && match[1]) {
    return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  }
  return "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600";
}

function HomeContent() {
  const searchParams = useSearchParams();
  const currentCat = searchParams.get("cat");

  const [selectedJob, setSelectedJob] = useState("직무 공통");
  const [copied, setCopied] = useState(false);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    setVisibleCount(9);
  }, [currentCat, selectedJob]);

  const jobs = ["직무 공통", "기획·PM", "마케터", "인사·HR", "재무·회계", "디자인·BX", "1인기업"];
  const samplePrompt = `Act as a senior marketer. Please analyze [제품명] target audience and generate 5 punchy headline copy ideas for [마케팅 채널].`;

  useEffect(() => {
    async function loadContents() {
      setLoading(true);
      try {
        const res = await fetch("/api/ingest");
        const json = await res.json();
        if (json.success && json.data) {
          const publishedOnly = json.data.filter((item: any) => item.status === "Published");
          if (publishedOnly.length > 0) {
            const parsed = publishedOnly.map((item: any) => {
              let bodyObj: any = {};
              try {
                bodyObj = typeof item.body === "string" ? JSON.parse(item.body) : item.body;
              } catch(e) {}
              const rawTitle = item.title || "";
              const cleanTitle = rawTitle.replace(/^\[[^\]]+\]\s*/, "").trim();
              return {
                id: item.id,
                title: cleanTitle,
                badge: bodyObj.badge || "AI 기본 활용",
                tag: bodyObj.chip || "#실무생산성",
                channel_name: bodyObj.source_channel_name || "AIditor 소스 풀",
                image: resolveCardThumbnail(item, bodyObj),
                href: `/article?id=${item.id}`,
                score: bodyObj.editor_rating?.total_score || 95
              };
            });
            setArticles(parsed);
          } else {
            setArticles([]);
          }
        }
      } catch (e) {
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }
    loadContents();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(samplePrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dynamic filter based on currentCat GNB parameter
  let displayList = articles;
  if (currentCat) {
    if (currentCat === "BEST") {
      displayList = [...articles].sort((a, b) => b.score - a.score);
    } else if (currentCat === "컬렉션") {
      displayList = articles.filter(a => 
        a.tag?.includes("자동화") || a.tag?.includes("영상") || a.badge?.includes("에이전트") || a.badge?.includes("수익")
      );
    } else {
      displayList = articles.filter(a => {
        const b = a.badge || "";
        if (currentCat === "AI 기본 활용") return b.includes("기본 활용") || b.includes("도구 활용");
        if (currentCat === "AI 업무 자동화") return b.includes("업무 자동화") || b.includes("자동화");
        if (currentCat === "AI 크리에이티브") return b.includes("크리에이티브") || b.includes("문서 제작") || b.includes("영상");
        if (currentCat === "AI 에이전트") return b.includes("에이전트");
        if (currentCat === "AI 리더십·트렌드") return b.includes("트렌드") || b.includes("리더십");
        if (currentCat === "AI 수익화") return b.includes("수익화") || a.title?.includes("돈 버는") || a.tag?.includes("수익");
        return b === currentCat;
      });
    }
  }

  return (
    <main className="w-full max-w-[1200px] px-6 py-8 flex flex-col gap-8">

      {/* Sub Filter Bar (Jobs) */}
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

      {/* Category Active Banner (when category selected in GNB) */}
      {currentCat && (
        <div className="flex items-center justify-between bg-orange-50/90 border border-orange-200 rounded-xl px-5 py-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 bg-[#f97316] text-white text-xs font-extrabold rounded-md shadow-xs flex items-center gap-1">
              {currentCat === "BEST" ? <Flame className="w-3.5 h-3.5" /> : currentCat === "컬렉션" ? <Bookmark className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
              {currentCat === "BEST" ? "인기 랭킹" : currentCat === "컬렉션" ? "에디터 큐레이션" : "대메뉴 카테고리"}
            </span>
            <span className="font-extrabold text-gray-900 text-base">
              {currentCat}
            </span>
            <span className="text-xs text-gray-500 font-semibold">
              총 {displayList.length}건의 실무 아티클
            </span>
          </div>
          <Link 
            href="/" 
            className="text-xs font-bold text-gray-500 hover:text-gray-900 bg-white border border-gray-200 px-3 py-1 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            전체 피드 보기 ✕
          </Link>
        </div>
      )}

      {/* Hero Section (Hidden if specific category is selected, or shown cleanly) */}
      {!currentCat && (
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-slate-700 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-amber-400/20 text-amber-300 text-xs font-bold rounded-md flex items-center gap-1 border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" /> ⚡ 10초 칼퇴 원클릭 복붙 프롬프트
            </span>
            <span className="text-xs text-slate-400 font-medium">[추천 대상: {selectedJob}]</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
            구글 Lyria로 3분 만에 저작권 프리 음악 만들기
          </h2>

          <div className="bg-slate-950/80 rounded-xl p-4 md:p-5 border border-slate-800 mb-6 font-mono text-xs text-slate-300 relative group">
            <pre className="whitespace-pre-wrap font-sans leading-relaxed text-slate-200">
              {samplePrompt}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 bg-[#f97316] hover:bg-[#ea580c] text-white px-3.5 py-1.5 rounded-lg font-sans font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : null}
              {copied ? "복사 완료!" : "1초 전체 복사 📋"}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 font-medium flex-wrap gap-2">
            <span>※ 챗GPT, Claude, Gemini에 입력 후 [제품명]만 바꿔서 즉시 활용하세요.</span>
            <Link href="/article" className="text-amber-400 hover:underline flex items-center gap-1 font-bold">
              실무 적용 가이드 보러가기 ↗
            </Link>
          </div>
        </section>
      )}

      {/* Newsletter Subscription Banner */}
      {!currentCat && (
        <section className="bg-orange-50/60 border border-orange-100 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 bg-orange-100 text-[#f97316] font-extrabold text-[11px] rounded uppercase">매주 금요일 레터</span>
              <h3 className="font-extrabold text-lg text-gray-900">AIditor 주간 AI 실무 레시피 구독하기</h3>
            </div>
            <p className="text-xs text-gray-600">검증된 30개 국산 소스 풀의 핵심 AI 프롬프트와 업무자동화 팁을 이메일로 받아보세요.</p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
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
      )}

      {/* Latest Dispatches Grid */}
      <section className="mt-2">
        <div className="flex items-end justify-between mb-6 pb-2 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {currentCat ? `${currentCat} 아티클` : "최신 아티클"}
            </h2>
          </div>
          {currentCat && (
            <Link href="/" className="text-sm font-semibold text-[#f97316] hover:underline flex items-center gap-1 cursor-pointer">
              전체 목록 보기 <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-72 rounded-xl bg-gray-100 animate-pulse border border-gray-200" />
            ))}
          </div>
        ) : displayList.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
            해당 카테고리에 등록된 아티클이 없습니다.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayList.slice(0, visibleCount).map((article, i) => (
                <Link href={article.href || "/article"} key={i} className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col">
                  <div className="aspect-[16/9] w-full bg-gray-900 relative overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      onError={(e: any) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600";
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    {/* Top Badges / Hashtag Chips */}
                    <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap z-10">
                      <span className="bg-slate-900/90 backdrop-blur-sm text-white text-[10px] px-2.5 py-0.5 font-bold rounded shadow-sm">
                        {article.badge}
                      </span>
                      <span className="bg-emerald-500/90 text-white backdrop-blur-sm text-[10px] px-2.5 py-0.5 font-bold rounded shadow-sm">
                        {article.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow justify-between gap-3">
                    <h3 className="font-bold text-[16px] leading-snug text-gray-900 group-hover:text-[#f97316] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold border-t border-gray-100 pt-2.5">
                      <span className="text-gray-400 font-normal">출처:</span>
                      <span className="text-gray-700 font-bold truncate">{article.channel_name}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < displayList.length && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-8 py-3 bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm rounded-xl border border-gray-200 shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer group"
                >
                  <span>더보기</span>
                  <span className="text-xs text-gray-400 font-normal">
                    ({Math.min(visibleCount, displayList.length)} / {displayList.length})
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>
            )}
          </>
        )}
      </section>

    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="w-full max-w-[1200px] px-6 py-12 text-center text-gray-400">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
