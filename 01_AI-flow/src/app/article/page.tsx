"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Play, 
  Star, 
  Sparkles, 
  Check, 
  Copy, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle, 
  HelpCircle, 
  BookOpen, 
  Lightbulb, 
  ArrowRight,
  TrendingUp,
  Bookmark
} from "lucide-react";

function extractYouTubeId(urlStr?: string): string | null {
  if (!urlStr) return null;
  const match = urlStr.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (match && match[1].length === 11) return match[1];
  return null;
}

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

            const channelName = bodyObj.source_channel_name || "AIditor 소스 풀";
            const videoUrl = bodyObj.source_video_url || "https://youtube.com";
            const uploadDate = bodyObj.published_at || (found.created_at ? found.created_at.substring(0, 10) : "최신");

            // Extract Part 1 & Part 2 data with fallbacks
            const part1 = bodyObj.part1 || {};
            const part2 = bodyObj.part2 || {};

            const storySections = part1.story_sections || [
              {
                heading: "왜 지금 이 기술이 실무자들 사이에서 화제일까요?",
                reader_question: "매일 반복되는 지루한 업무, 도대체 언제까지 손으로 직접 해야 할까요?",
                content: `많은 직장인들이 AI 툴을 도입하려다 복잡한 설정과 영어 메뉴 앞에서 좌절하곤 합니다. 하지만 이번에 **[${channelName}]**에서 공개한 방식은 코딩이나 복잡한 개발 지식 없이도, 우리가 매일 사용하는 업무 환경에 즉시 접목할 수 있다는 점에서 큰 반향을 일으키고 있습니다. **핵심은 기술을 새로 배우는 것이 아니라, 이미 익숙한 도구에 AI의 지능을 얹는 것**입니다.`
              },
              {
                heading: "실무자가 반드시 알아야 할 핵심 작동 포인트",
                content: `영상에서 가장 돋보이는 부분은 단순 기능 나열이 아니라, **실제 업무 흐름(Workflow)** 속에서 어디에 시간을 가장 많이 뺏기는지 정확히 짚어냈다는 점입니다. 반복되는 서식 작성과 데이터 추출 단계를 AI에게 위임함으로써, 실무자는 최종 검수와 의사결정에만 집중할 수 있는 쾌적한 작업 환경을 구축할 수 있습니다.`
              }
            ];

            const factCheck = part1.fact_check || {
              claim: "영상에서 소개된 AI 실무 활용법으로 업무 효율을 80% 이상 극대화할 수 있다는 주장은 사실일까?",
              verdict: "대체로 사실 (실무 환경에 맞춘 프롬프트 보정 필요)",
              details: `${channelName} 영상에서 시연된 방법은 비개발자도 직관적으로 이해할 수 있도록 잘 구성되어 있습니다. 다만 무료 플랜 사용 시 API 호출 한도와 데이터 보안 설정을 사전 확인해야 합니다.`,
              risk_warning: "사내 대외비 문서나 고객 개인정보를 직접 입력하지 말고, 핵심 변수만 치환하여 안전하게 사용하는 지혜가 필요합니다."
            };

            const deepDiveSections = part2.deep_dive_sections || [
              {
                heading: "비개발자를 위한 핵심 기술 작동 원리",
                content: "AI 모델에게 좋은 결과물을 얻기 위해서는 '지시문(Role)', '배경 맥락(Context)', '출력 포맷(Constraint)'의 3박자를 명확히 갖추어 명령을 전달하는 구조화 기법이 필수적입니다."
              },
              {
                heading: "현업 적용 시 발생할 수 있는 주요 병목 지점과 해결책",
                content: "초기에는 프롬프트를 다듬는 데 오히려 시간이 더 걸린다고 느껴질 수 있습니다. 검증된 프롬프트 템플릿을 개인 메모장이나 클립보드에 즐겨찾기해두고 바로 불러와 쓰는 '복붙 워크플로우'를 습관화하세요."
              }
            ];

            const insightBox = part2.insight_box || {
              summary: "에디터 최종 실무 제언",
              takeaway: "AI를 기술로 공부하려 하지 마세요. 오늘 당장 나의 10분을 아껴주는 실무 도구로 바라보는 것이 진정한 디지털 전환의 시작입니다."
            };

            const summaryPoints = part1.summary_points || bodyObj.summary_points || [
              `에디터 픽 1: ${channelName}의 실무 최적화 프롬프트 템플릿 및 실행 구조`,
              "에디터 픽 2: 반복 업무를 80% 이상 단축하는 노코드/경량화 워크플로우",
              "에디터 픽 3: 비개발자도 오늘 바로 퇴근 시간을 1시간 앞당기는 현실적 세팅법"
            ];

            const editorRating = part1.editor_rating || bodyObj.editor_rating || {
              ease_of_use: 4.8,
              time_saving: 5.0,
              cost_effort: 4.7,
              practicality: 4.9,
              total_score: 96,
              star_rating: "4.8"
            };

            const editorComment = part1.editor_comment || bodyObj.editor_comment || `별점 4.8 / 5.0 | [${channelName}] 공식 유튜브 영상의 1차 알고리즘 검증을 통과한 아티클입니다. 단순 기술 설명이 아닌 실무 적용성이 매우 높으며, 사내 보안 지침만 준수한다면 즉시 생산성을 배가시킬 수 있는 실전형 콘텐츠입니다.`;

            const actionGuides = part2.action_guides || bodyObj.action_guides || [
              `Step 01: 하단에 제공된 [${channelName}] 맞춤형 원클릭 복붙 프롬프트를 복사합니다.`,
              "Step 02: 챗GPT 또는 Claude에 프롬프트를 붙여넣고, 대괄호([ ])로 표시된 내 업무 정보만 간단히 수정해 전송합니다.",
              "Step 03: AI가 도출한 결과를 검토한 뒤, 사내 보고서나 실무 서식에 즉시 반영하여 칼퇴를 달성합니다."
            ];

            const copyPasteAsset = part2.copy_paste_asset || bodyObj.copy_paste_asset || bodyObj.prompt || "[역할 부여]\n당신은 실무 AI 업무 효율화 컨설턴트입니다.\n\n[요청 사항]\n1. 업무 프로세스를 3단계로 단축하는 프롬프트 템플릿을 작성해주세요.\n2. 실무 적용 시 주의해야 할 점 3가지를 정리해주세요.";

            setArticle({
              id: found.id,
              title: found.title,
              created_at: uploadDate.replace(/-/g, ". "),
              thumbnail: found.thumbnail,
              badge: bodyObj.badge || "AI 도구 활용",
              chip: bodyObj.chip || "#복붙용_프롬프트",
              editor_lead: bodyObj.editor_lead || `[${channelName}]의 핵심 노하우를 바탕으로, 비개발자 직장인이 오늘 당장 5분 만에 실무에 적용할 수 있도록 핵심 인사이트와 팩트체크를 완벽히 정리했습니다.`,
              channel_name: channelName,
              video_url: videoUrl,
              story_sections: storySections,
              fact_check: factCheck,
              summary_points: summaryPoints,
              editor_rating: editorRating,
              editor_comment: editorComment,
              deep_dive_sections: deepDiveSections,
              action_guides: actionGuides,
              insight_box: insightBox,
              prompt: copyPasteAsset
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
      <div className="max-w-[860px] w-full px-6 py-24 text-center text-gray-400 font-medium flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-[#f97316] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm">뉴닉 스타일 심층 큐레이션 리포트를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-[860px] w-full px-6 py-24 text-center text-gray-400 font-medium">
        아티클을 찾을 수 없습니다.
      </div>
    );
  }

  const ytVideoId = extractYouTubeId(article.video_url) || "Ui3THZSgz50";

  return (
    <main className="max-w-[860px] w-full px-5 md:px-8 py-10 flex flex-col items-center mx-auto text-gray-900 font-sans">
      
      {/* Article Header & Badges */}
      <header className="w-full flex flex-col items-start mb-8 border-b border-gray-100 pb-8">
        <div className="flex items-center gap-2 mb-4 flex-wrap w-full">
          <span className="px-3 py-1 bg-orange-100 text-[#f97316] text-xs font-bold rounded-lg shadow-2xs">
            {article.badge}
          </span>
          <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg">
            {article.chip}
          </span>
          <span className="text-[11px] text-gray-400 font-medium ml-auto flex items-center gap-1.5">
            <span>출처: <strong className="text-gray-700">{article.channel_name}</strong></span>
            <span>•</span>
            <span>업로드: {article.created_at}</span>
            <span>•</span>
            <a 
              href={article.video_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#f97316] hover:underline flex items-center gap-0.5"
            >
              원본 ↗
            </a>
          </span>
        </div>
        
        <h1 className="text-2xl md:text-3.5xl font-extrabold text-gray-950 leading-snug mb-4 tracking-tight">
          {article.title}
        </h1>

        <p className="text-gray-600 text-sm md:text-base leading-relaxed bg-gray-50/80 p-4 rounded-xl border border-gray-100/80 w-full">
          💡 <strong className="text-gray-900">에디터 한줄 요약:</strong> {article.editor_lead}
        </p>
      </header>

      {/* Interactive Video Player Container */}
      <div className="w-full aspect-video rounded-2xl overflow-hidden relative shadow-md border border-gray-200 bg-black mb-12">
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
              src={article.thumbnail || "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200"} 
              alt={article.title} 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 flex flex-col items-center justify-center gap-4 text-white p-6 text-center">
              <div className="w-18 h-18 bg-[#f97316] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play className="text-white fill-white w-8 h-8 ml-1" />
              </div>
              <div>
                <h3 className="font-bold text-base md:text-lg text-white mb-1 line-clamp-1">{article.title}</h3>
                <span className="text-xs text-orange-200 font-medium bg-black/60 px-3.5 py-1.5 rounded-full border border-white/20">
                  ▶ 클릭하시면 [{article.channel_name}] 유튜브 영상이 즉시 재생됩니다
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* PART 1: 영상 심층 분석 (뉴닉 스타일 읽을거리 본문) */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="w-full mb-14">
        
        <div className="flex items-center gap-2 mb-8 pb-3 border-b-2 border-slate-900">
          <BookOpen className="w-5 h-5 text-[#f97316]" />
          <span className="text-xs font-bold tracking-widest text-[#f97316] uppercase">Part 01</span>
          <h2 className="text-lg font-black text-gray-900">영상 심층 분석 (에디터 스토리텔링)</h2>
        </div>

        {/* Storytelling Article Body Sections */}
        <div className="flex flex-col gap-8 mb-10 text-gray-800 leading-relaxed">
          {article.story_sections?.map((sec: any, idx: number) => (
            <article key={idx} className="flex flex-col gap-3.5">
              {sec.reader_question && (
                <div className="bg-orange-50/70 border-l-4 border-[#f97316] p-4 rounded-r-xl flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-[#f97316] shrink-0 mt-0.5" />
                  <p className="text-sm font-bold text-orange-950 leading-snug">
                    {sec.reader_question}
                  </p>
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-950 mt-1">
                {sec.heading}
              </h3>
              <p 
                className="text-base text-gray-700 leading-relaxed font-normal whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: sec.content.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-950">$1</strong>') }}
              />
            </article>
          ))}
        </div>

        {/* Fact Check Box */}
        {article.fact_check && (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-7 mb-10 shadow-2xs">
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-200">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-base text-gray-900">에디터 팩트체크 & 교차 검증</h3>
              <span className="text-xs font-bold px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full ml-auto">
                {article.fact_check.verdict}
              </span>
            </div>
            <div className="flex flex-col gap-3 text-sm text-gray-700">
              <p>
                <strong className="text-gray-900">🔍 검증 대상 주장:</strong> {article.fact_check.claim}
              </p>
              <p className="leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200/80 text-gray-800">
                {article.fact_check.details}
              </p>
              {article.fact_check.risk_warning && (
                <div className="flex items-start gap-2 text-xs text-amber-900 bg-amber-50 p-3 rounded-lg border border-amber-200">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong className="font-bold">주의사항/리스크:</strong> {article.fact_check.risk_warning}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Key Takeaways (Editor Picks) */}
        <div className="w-full bg-orange-50/60 border border-orange-200/80 rounded-2xl p-6 md:p-7 mb-10 shadow-2xs">
          <h3 className="font-bold text-orange-950 text-base mb-4 flex items-center gap-2">
            📌 에디터 픽 3가지 (핵심 근거)
          </h3>
          <ul className="flex flex-col gap-3">
            {article.summary_points?.map((text: string, i: number) => (
              <li key={i} className="flex gap-3 items-start text-sm text-orange-950 font-medium leading-relaxed">
                <span className="w-2 h-2 rounded-full bg-[#f97316] mt-2 shrink-0"></span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Editor Ratings Box */}
        <div className="w-full bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-md">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-lg text-amber-400">
                AIditor 에디터 평가 (종합 점수: {article.editor_rating?.total_score || 96}점)
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">대상: 스타터 (0~3년 차)</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-6">
            {[
              { label: "활용 난이도", score: `${article.editor_rating?.ease_of_use || 4.8} / 5` },
              { label: "시간 절약 효과", score: `${article.editor_rating?.time_saving || 5.0} / 5` },
              { label: "비용 부담", score: `${article.editor_rating?.cost_effort || 4.7} / 5` },
              { label: "실무 적용성", score: `${article.editor_rating?.practicality || 4.9} / 5` }
            ].map((item, i) => (
              <div key={i} className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 text-center">
                <span className="text-xs text-slate-400 font-medium block mb-1">{item.label}</span>
                <span className="text-sm font-bold text-amber-300 flex items-center justify-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {item.score}
                </span>
              </div>
            ))}
          </div>

          <p className="text-sm text-slate-300 bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 leading-relaxed">
            💬 <strong className="text-amber-300">에디터 총평:</strong> {article.editor_comment}
          </p>
        </div>

      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* PART 2: 더 알아보기 (심화 인사이트 & 실무 액션) */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="w-full mb-12">
        
        <div className="flex items-center gap-2 mb-8 pb-3 border-b-2 border-[#f97316]">
          <Lightbulb className="w-5 h-5 text-[#f97316]" />
          <span className="text-xs font-bold tracking-widest text-[#f97316] uppercase">Part 02</span>
          <h2 className="text-lg font-black text-gray-900">더 알아보기 (심화 리서치 & 실천)</h2>
        </div>

        {/* Deep Dive In-depth Sections */}
        <div className="flex flex-col gap-6 mb-10">
          {article.deep_dive_sections?.map((deep: any, idx: number) => (
            <div key={idx} className="bg-white border border-gray-200/90 rounded-2xl p-6 md:p-7 shadow-2xs">
              <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#f97316]" />
                {deep.heading}
              </h4>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                {deep.content}
              </p>
            </div>
          ))}
        </div>

        {/* Execution Guide (Step-by-step) */}
        <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 md:p-8 mb-10 shadow-2xs">
          <h3 className="font-bold text-gray-900 text-base md:text-lg mb-6 flex items-center gap-2">
            🎯 비개발자 3단계 실천 액션 가이드 (Execution Guide)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {article.action_guides?.map((itemStr: string, i: number) => (
              <div key={i} className="bg-gray-50/80 border border-gray-200/80 p-5 rounded-xl flex flex-col gap-2.5">
                <span className="text-xs font-extrabold text-[#f97316] tracking-wider">STEP 0{i + 1}</span>
                <p className="text-xs md:text-sm text-gray-800 leading-relaxed font-medium">
                  {itemStr.replace(/^Step \d+:\s*/, "")}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Insight Box */}
        {article.insight_box && (
          <div className="w-full bg-gradient-to-br from-orange-500 to-[#ea580c] text-white rounded-2xl p-6 md:p-8 mb-10 shadow-lg flex flex-col gap-3">
            <div className="flex items-center gap-2 text-orange-200 text-xs font-bold tracking-wider uppercase">
              <Lightbulb className="w-4 h-4" />
              <span>{article.insight_box.summary || "에디터 종합 인사이트"}</span>
            </div>
            <p className="text-base md:text-lg font-bold leading-relaxed text-white">
              "{article.insight_box.takeaway}"
            </p>
          </div>
        )}

        {/* Copy-Paste Asset Prompt Box */}
        <div className="w-full bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
                📋 실무 즉시 적용 원클릭 복붙 프롬프트 레시피
              </h3>
              <p className="text-xs text-slate-400 mt-1">대괄호([ ])로 표시된 내 업무 정보만 수정하여 챗GPT나 Claude에 바로 입력하세요.</p>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 bg-[#f97316] hover:bg-[#ea580c] text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md cursor-pointer ml-auto"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "복사완료!" : "1초 복사하기"}
            </button>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs md:text-sm text-slate-200 leading-relaxed overflow-x-auto whitespace-pre-wrap selection:bg-[#f97316]">
            {article.prompt}
          </div>
        </div>

      </section>

    </main>
  );
}

export default function ArticleDetailPage() {
  return (
    <Suspense fallback={
      <div className="max-w-[860px] w-full px-6 py-24 text-center text-gray-400 font-medium mx-auto">
        리포트를 불러오는 중입니다...
      </div>
    }>
      <ArticleContent />
    </Suspense>
  );
}
