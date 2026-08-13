"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Play, Star, Sparkles, Check, Copy, ExternalLink, RefreshCw } from "lucide-react";

function extractYouTubeId(urlStr?: string): string | null {
  if (!urlStr) return null;
  const match = urlStr.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (match && match[1].length === 11) return match[1];
  return null;
}

const CHANNEL_TOPIC_IMAGES: Record<string, string> = {
  "일잘러 장피엠": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
  "오빠두엑셀": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200",
  "알린 ALINN": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
  "평범한 사업가": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1200",
  "행글라이터": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200",
  "진한별의 AI 연구소": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
  "CONNECT AI LAB": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
  "AI 알려주는 남자 데브남": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200",
  "시민개발자 구씨": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1200",
  "디자인하는AI": "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200"
};

function ArticleContent() {
  const searchParams = useSearchParams();
  const articleId = searchParams.get("id");

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    async function loadArticle() {
      setLoading(true);
      try {
        const res = await fetch("/api/ingest");
        const json = await res.json();
        if (json.success && json.data) {
          let found = null;
          if (articleId) {
            found = json.data.find((item: any) => String(item.id) === String(articleId));
          }
          if (!found && json.data.length > 0) {
            found = json.data[0];
          }
          if (found) {
            let bodyObj: any = {};
            try {
              bodyObj = typeof found.body === "string" ? JSON.parse(found.body) : found.body;
            } catch (e) {
              bodyObj = { raw: found.body };
            }
            setArticle({
              id: found.id,
              title: found.title,
              created_at: new Date(found.created_at).toISOString().split("T")[0].replace(/-/g, "."),
              thumbnail: found.thumbnail,
              badge: bodyObj.badge || "AI 따라하기",
              chip: bodyObj.chip || "#수익자동화",
              prompt: bodyObj.copy_paste_asset || bodyObj.prompt || "Act as an AI consultant...",
              editor_comment: bodyObj.editor_comment || "에디터 실무 가이드 총평입니다.",
              summary_points: bodyObj.summary_points || [
                "에디터 픽 1: 실무 AI 프롬프트 템플릿 1초 적용",
                "에디터 픽 2: 반복 업무를 90% 줄여주는 노코드 워크플로우",
                "에디터 픽 3: 비개발자도 바로 적용 가능한 3분 칼퇴 가이드"
              ],
              action_guides: bodyObj.action_guides || [
                "Step 01: 제공된 복붙 프롬프트를 챗GPT/Claude에 입력합니다.",
                "Step 02: 업무 데이터와 결합하여 요약 결과를 자동 추출합니다.",
                "Step 03: 사내 보고서 및 실무 프로세스에 즉시 반영합니다."
              ],
              channel_name: bodyObj.source_channel_name || "AIditor 소스 풀",
              video_url: bodyObj.source_video_url || "https://youtube.com"
            });
          }
        }
      } catch (e) {
        console.error("Failed to load article detail", e);
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [articleId]);

  const handleCopy = () => {
    if (!article?.prompt) return;
    navigator.clipboard.writeText(article.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-[900px] w-full px-6 py-20 text-center text-gray-400 font-medium">
        아티클 리포트를 불러오는 중입니다...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-[900px] w-full px-6 py-20 text-center text-gray-400 font-medium">
        아티클을 찾을 수 없습니다.
      </div>
    );
  }

  const ytVideoId = extractYouTubeId(article.video_url) || "8NlhX_4-LqA";
  const displayImage = CHANNEL_TOPIC_IMAGES[article.channel_name] || "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200";

  return (
    <main className="max-w-[900px] w-full px-6 py-12 flex flex-col items-center mx-auto">
      
      {/* Article Header & Badges */}
      <div className="w-full flex flex-col items-start mb-8 border-b border-gray-200 pb-8">
        <div className="flex items-center gap-2 mb-4 flex-wrap w-full">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-md">
            {article.badge}
          </span>
          <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-bold rounded-md">
            {article.chip}
          </span>
          <span className="text-xs text-gray-400 font-medium ml-auto">
            출처 채널: <strong>{article.channel_name}</strong> | {article.created_at}
          </span>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-4">
          {article.title}
        </h1>

        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          {article.editor_comment}
        </p>
      </div>

      {/* Interactive Video Player Container with Poster Preview Fallback */}
      <div className="w-full flex flex-col gap-3 mb-10">
        <div className="w-full aspect-video rounded-2xl overflow-hidden relative shadow-lg border border-gray-200 bg-black">
          {isPlaying ? (
            <iframe
              src={`https://www.youtube.com/embed/${ytVideoId}?autoplay=1&rel=0`}
              title={article.title}
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
                src={article.thumbnail && article.thumbnail.startsWith("http") ? article.thumbnail : displayImage} 
                alt={article.title} 
                className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 flex flex-col items-center justify-center gap-4 text-white p-6 text-center">
                <div className="w-20 h-20 bg-[#f97316] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="text-white fill-white w-9 h-9 ml-1" />
                </div>
                <div>
                  <h3 className="font-bold text-base md:text-lg text-white mb-1 shadow-sm line-clamp-1">{article.title}</h3>
                  <span className="text-xs text-orange-200 font-medium bg-black/60 px-3 py-1 rounded-full border border-white/20">
                    ▶ 클릭하시면 [{article.channel_name}] 영상이 플레이어에서 바로 재생됩니다
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 px-2 flex-wrap gap-2">
          <span>※ 채널 소유자의 유튜브 퍼가기 제한 시 아래 주황색 원본 링크로 1초 재생이 가능합니다.</span>
          <button
            onClick={() => window.open(article.video_url, "_blank")}
            className="font-bold text-[#f97316] hover:underline flex items-center gap-1 cursor-pointer bg-orange-50 px-3.5 py-1.5 rounded-lg border border-orange-200 shadow-2xs"
          >
            <ExternalLink className="w-4 h-4" /> YouTube에서 [{article.channel_name}] 원본 영상 1초 재생 ↗
          </button>
        </div>
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
            { label: "비용 부담", score: "5 / 5" },
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
          💬 <strong className="text-amber-300">에디터 총평:</strong> {article.editor_comment}
        </p>
      </section>

      {/* Key Takeaways (Editor Picks) */}
      <section className="w-full bg-amber-50 border border-amber-200/80 rounded-2xl p-6 md:p-8 mb-10 shadow-sm">
        <h3 className="font-bold text-amber-900 text-lg mb-4 flex items-center gap-2">
          📌 에디터 픽 3가지 (Key Takeaways)
        </h3>
        <ul className="flex flex-col gap-3">
          {article.summary_points.map((text: string, i: number) => (
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
          {article.action_guides.map((itemStr: string, i: number) => (
            <div key={i} className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex flex-col gap-2">
              <span className="text-xs font-bold text-[#f97316]">Step 0{i + 1}</span>
              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                {itemStr.replace(/^Step \d+:\s*/, "")}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Copy-Paste Asset Prompt Box */}
      <section className="w-full bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-base text-slate-200">📋 실무 적용 원클릭 복붙 프롬프트 레시피</h3>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 bg-[#f97316] hover:bg-[#ea580c] text-white px-4 py-2 rounded-lg font-bold text-xs transition-all shadow cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "복사완료!" : "1초 복사하기"}
          </button>
        </div>

        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
          {article.prompt}
        </div>
      </section>

    </main>
  );
}

export default function ArticleDetail() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-400">로딩 중...</div>}>
      <ArticleContent />
    </Suspense>
  );
}
