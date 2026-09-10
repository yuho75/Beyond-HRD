"use client";

import { useState, useEffect, Suspense } from "react";
import { Copy, ExternalLink, Check, Sparkles, Flame, Bookmark, ArrowRight, ChevronDown, SlidersHorizontal } from "lucide-react";
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

function resolveDifficulty(item: any, bodyObj: any): "초급" | "중급" | "고급" {
  if (bodyObj.difficulty && ["초급", "중급", "고급"].includes(bodyObj.difficulty)) {
    return bodyObj.difficulty;
  }
  const text = ((item.title || "") + " " + (bodyObj.badge || "") + " " + (bodyObj.chip || "")).toLowerCase();
  if (/에이전트|코딩|파이프라인|api|mcp|바이브/.test(text)) {
    return "고급";
  }
  if (/자동화|make|n8n|워크플로우|스프레드시트|vba|수익/.test(text)) {
    return "중급";
  }
  return "초급";
}

function HomeContent() {
  const searchParams = useSearchParams();
  const currentCat = searchParams.get("cat");

  const [selectedDifficulty, setSelectedDifficulty] = useState("전체");
  const [sortBy, setSortBy] = useState<"latest" | "recommended">("latest");
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    setVisibleCount(9);
  }, [currentCat, selectedDifficulty, sortBy]);

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
              const summary = bodyObj.one_line_summary || bodyObj.part1_storytelling?.intro_hook || "실제 시연 영상을 기반으로 검증한 실무 AI 활용 핵심 가이드입니다.";
              const difficulty = resolveDifficulty(item, bodyObj);
              return {
                id: item.id,
                title: cleanTitle,
                badge: bodyObj.badge || "AI 기본 활용",
                tag: bodyObj.chip || "#실무생산성",
                channel_name: bodyObj.source_channel_name || "AIditor 소스 풀",
                image: resolveCardThumbnail(item, bodyObj),
                href: `/article?id=${item.id}`,
                score: bodyObj.editor_rating?.total_score || 95,
                summary: summary,
                difficulty: difficulty
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

  // 1. Dynamic filter based on currentCat GNB parameter
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

  // 2. Filter by Difficulty
  if (selectedDifficulty !== "전체") {
    displayList = displayList.filter(a => a.difficulty === selectedDifficulty);
  }

  // 3. Sort by latest or recommended (score)
  if (sortBy === "recommended") {
    displayList = [...displayList].sort((a, b) => b.score - a.score);
  }

  const featuredArticle = displayList.length > 0 ? displayList[0] : null;
  const gridDisplayList = !currentCat && featuredArticle 
    ? displayList.filter((a) => a.id !== featuredArticle.id) 
    : displayList;

  return (
    <main className="w-full max-w-[1200px] px-6 py-8 flex flex-col gap-8">

      {/* 1. Today's Editor's Pick (와이드 헤드라인 카드 - Hero) */}
      {!currentCat && featuredArticle && (
        <section className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all group overflow-hidden">
          <Link href={featuredArticle.href} className="flex flex-col lg:flex-row items-stretch gap-6 sm:gap-8 cursor-pointer">
            {/* Left: 16:9 Wide Thumbnail */}
            <div className="w-full lg:w-[48%] aspect-[16/9] bg-gray-900 rounded-2xl overflow-hidden relative shrink-0 shadow-xs">
              <img 
                src={featuredArticle.image} 
                alt={featuredArticle.title} 
                onError={(e: any) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600";
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap z-10">
                <span className="bg-[#ea580c] text-white text-[11px] px-2.5 py-0.5 font-black rounded-md shadow-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3 fill-white" /> Today's Pick
                </span>
                <span className="bg-slate-900/90 text-white backdrop-blur-sm text-[10px] px-2 py-0.5 font-bold rounded shadow-xs">
                  {featuredArticle.badge}
                </span>
                <span className={`text-[10px] px-2 py-0.5 font-bold rounded shadow-xs text-white ${
                  featuredArticle.difficulty === "초급" 
                    ? "bg-blue-600" 
                    : featuredArticle.difficulty === "중급" 
                      ? "bg-amber-600" 
                      : "bg-purple-600"
                }`}>
                  {featuredArticle.difficulty}
                </span>
              </div>
            </div>

            {/* Right: Editorial Content */}
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    {featuredArticle.tag}
                  </span>
                  <span className="text-xs text-gray-400 font-semibold">• 에디터 실무 추천 {featuredArticle.score}점</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 group-hover:text-[#f97316] transition-colors leading-snug mb-3">
                  {featuredArticle.title}
                </h2>

                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
                  {featuredArticle.summary}
                </p>

                {/* 3 Core Benefit Chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-gray-50 text-gray-700 px-2.5 py-1 rounded-lg border border-gray-200/80">
                    <Check className="w-3 h-3 text-[#ea580c]" /> 실무 즉시 복붙 프롬프트
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-gray-50 text-gray-700 px-2.5 py-1 rounded-lg border border-gray-200/80">
                    <Check className="w-3 h-3 text-[#ea580c]" /> 3단계 핵심 시연 요약
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-gray-50 text-gray-700 px-2.5 py-1 rounded-lg border border-gray-200/80">
                    <Check className="w-3 h-3 text-[#ea580c]" /> 실제 업무 시간 단축 검증
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                  <span className="text-gray-400 font-normal">출처:</span>
                  <span className="truncate max-w-[180px]">{featuredArticle.channel_name}</span>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#ea580c] bg-orange-50 hover:bg-orange-100 border border-orange-200 px-3.5 py-1.5 rounded-xl transition-all shadow-2xs">
                  지금 읽기 <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

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

      {/* 2. Filter & Sort Bar (옵션 B: 난이도 필터 & 정렬) */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-gray-200">
        {/* Left: Difficulty Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-gray-500 mr-1 uppercase tracking-wider flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" /> 난이도:
          </span>
          {["전체", "초급", "중급", "고급"].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedDifficulty === diff
                  ? "bg-[#f97316] text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        {/* Right: Sort By */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto text-xs font-bold">
          <button
            onClick={() => setSortBy("latest")}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              sortBy === "latest"
                ? "bg-slate-900 text-white font-extrabold shadow-2xs"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            최신순
          </button>
          <button
            onClick={() => setSortBy("recommended")}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              sortBy === "recommended"
                ? "bg-[#ea580c] text-white font-extrabold shadow-2xs"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>실무추천순</span>
          </button>
        </div>
      </section>

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
        ) : gridDisplayList.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
            해당 조건에 등록된 아티클이 없습니다.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridDisplayList.slice(0, visibleCount).map((article, i) => (
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
                      <span className={`text-[10px] px-2 py-0.5 font-bold rounded shadow-sm backdrop-blur-sm ${
                        article.difficulty === "초급" 
                          ? "bg-blue-600/90 text-white" 
                          : article.difficulty === "중급" 
                            ? "bg-amber-600/90 text-white" 
                            : "bg-purple-600/90 text-white"
                      }`}>
                        {article.difficulty}
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
            {visibleCount < gridDisplayList.length && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-8 py-3 bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm rounded-xl border border-gray-200 shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer group"
                >
                  <span>더보기</span>
                  <span className="text-xs text-gray-400 font-normal">
                    ({Math.min(visibleCount, gridDisplayList.length)} / {gridDisplayList.length})
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Newsletter Subscription Banner */}
      {!currentCat && (
        <section className="mt-4 bg-orange-50/70 border border-orange-200/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 bg-orange-100 text-[#ea580c] font-extrabold text-[11px] rounded-md uppercase">매주 금요일 레터</span>
              <h3 className="font-extrabold text-lg text-gray-900">AIditor 주간 AI 실무 레시피 구독하기</h3>
            </div>
            <p className="text-xs text-gray-600">검증된 30개 국산 소스 풀의 핵심 AI 프롬프트와 업무자동화 팁을 이메일로 받아보세요.</p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <input 
              type="email" 
              placeholder="이메일 주소를 입력하세요" 
              className="px-4 py-2.5 rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-[#f97316] w-full md:w-64 text-sm bg-white shadow-2xs"
            />
            <button className="px-6 py-2.5 bg-[#f97316] text-white font-bold text-sm rounded-xl shadow-xs hover:bg-[#ea580c] transition-colors whitespace-nowrap cursor-pointer">
              구독하기
            </button>
          </div>
        </section>
      )}

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
