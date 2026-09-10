"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Bookmark, 
  Trophy, 
  Zap, 
  Flame, 
  Award, 
  Bell, 
  Clock, 
  Check, 
  Copy, 
  ExternalLink, 
  ChevronRight, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Lock, 
  ShieldCheck,
  PauseCircle,
  PlayCircle,
  SlidersHorizontal,
  User,
  ArrowUpRight,
  TrendingUp,
  FileText
} from "lucide-react";

interface BadgeItem {
  id: string;
  name: string;
  desc: string;
  icon: string;
  category: string;
  unlocked: boolean;
  unlockedDate?: string;
  progress?: string;
}

interface SavedPrompt {
  id: string;
  title: string;
  tool: string;
  prompt: string;
  sourceArticle: string;
  articleId: string;
  copiedCount: number;
}

interface LearningHistoryItem {
  id: string;
  title: string;
  category: string;
  date: string;
  xpEarned: number;
  completed: boolean;
}

const DEFAULT_CATEGORIES = [
  { 
    id: "basic", 
    name: "AI 기본 활용", 
    desc: "ChatGPT, 클로드 등 생성형 AI 필수 도구와 실무 프롬프트", 
    color: "bg-blue-50 text-blue-700 border-blue-200" 
  },
  { 
    id: "automation", 
    name: "AI 업무 자동화", 
    desc: "Make.com, n8n, 엑셀/스프레드시트 연동 및 반복 업무 자동화", 
    color: "bg-emerald-50 text-emerald-700 border-emerald-200" 
  },
  { 
    id: "creative", 
    name: "AI 크리에이티브", 
    desc: "미드저니, 런웨이, 감마(Gamma)를 활용한 영상·문서·PPT 제작", 
    color: "bg-purple-50 text-purple-700 border-purple-200" 
  },
  { 
    id: "agent", 
    name: "AI 에이전트", 
    desc: "목표를 스스로 수행하는 자율 AI 에이전트 구축 및 실전 활용", 
    color: "bg-orange-50 text-orange-700 border-orange-200" 
  },
  { 
    id: "trend", 
    name: "AI 리더십·트렌드", 
    desc: "글로벌 빅테크 동향 및 비즈니스 리더를 위한 AI 전략 인사이트", 
    color: "bg-slate-50 text-slate-700 border-slate-200" 
  },
  { 
    id: "monetize", 
    name: "AI 수익화", 
    desc: "1인 지식 비즈니스, AI 부업 실증 사례 및 파이프라인 구축", 
    color: "bg-amber-50 text-amber-700 border-amber-200" 
  }
];

const INITIAL_BADGES: BadgeItem[] = [
  {
    id: "b1",
    name: "첫 복붙 실습",
    desc: "아티클에서 첫 번째 실무 프롬프트를 성공적으로 복사했습니다.",
    icon: "📋",
    category: "실습",
    unlocked: true,
    unlockedDate: "2026.09.02"
  },
  {
    id: "b2",
    name: "자동화 개척자",
    desc: "업무 자동화 카테고리 아티클 3개 이상을 완독했습니다.",
    icon: "⚡",
    category: "역량",
    unlocked: true,
    unlockedDate: "2026.09.06"
  },
  {
    id: "b3",
    name: "4일 연속 스트릭",
    desc: "4일 연속으로 AIditor를 방문하여 실무 AI 지식을 학습했습니다.",
    icon: "🔥",
    category: "성실",
    unlocked: true,
    unlockedDate: "2026.09.10"
  },
  {
    id: "b4",
    name: "프롬프트 마스터",
    desc: "실무 프롬프트 복붙 실습을 총 20회 이상 진행했습니다.",
    icon: "🛠️",
    category: "실습",
    unlocked: true,
    unlockedDate: "2026.09.09"
  },
  {
    id: "b5",
    name: "AI 에이전트 연구원",
    desc: "에이전트 심화 아티클 5편을 정복하세요.",
    icon: "🤖",
    category: "역량",
    unlocked: false,
    progress: "3 / 5 완독 (60%)"
  },
  {
    id: "b6",
    name: "AIditor 올라운더",
    desc: "6대 핵심 카테고리 아티클을 골고루 완독하세요.",
    icon: "👑",
    category: "마스터",
    unlocked: false,
    progress: "4 / 6 카테고리 달성 (66%)"
  }
];

const INITIAL_PROMPTS: SavedPrompt[] = [
  {
    id: "p1",
    title: "직장인 3분 보고서 요약 프롬프트",
    tool: "ChatGPT",
    prompt: "다음 비즈니스 회의록 및 자료를 [1. 핵심 결론], [2. 실행 액션 아이템(담당자 및 기한)], [3. 잠재 리스크] 3단계로 명확하고 간결하게 5줄 이내로 요약해 줘.",
    sourceArticle: "직장인을 위한 ChatGPT 실무 활용: 3분 만에 끝내는 업무 효율 극대화 전략",
    articleId: "1",
    copiedCount: 14
  },
  {
    id: "p2",
    title: "Make.com 유튜브-노션 자동 아카이빙 웹훅",
    tool: "Make.com",
    prompt: "{\n  \"action\": \"create_page\",\n  \"database_id\": \"{{notion_db}}\",\n  \"properties\": {\n    \"Title\": \"{{1.snippet.title}}\",\n    \"Creator\": \"{{1.snippet.channelTitle}}\",\n    \"Date\": \"{{formatDate(now; 'YYYY-MM-DD')}}\"\n  }\n}",
    sourceArticle: "Make.com으로 챗GPT 워크플로우 자동화하기",
    articleId: "2",
    copiedCount: 8
  },
  {
    id: "p3",
    title: "감마(Gamma) 고품질 발표자료 기획 개요",
    tool: "Gamma AI",
    prompt: "타겟: 임원진 보고용. 주제: 2026년 하반기 사내 AI 도구 도입 전략. 슬라이드 7장 분량으로 장표별 명확한 제목과 3개 핵심 불릿포인트를 구조화해 줘.",
    sourceArticle: "파워포인트 없이 5분 만에 고품질 발표 자료 만드는 AI, 감마(Gamma)",
    articleId: "3",
    copiedCount: 6
  }
];

const INITIAL_HISTORY: LearningHistoryItem[] = [
  {
    id: "h1",
    title: "직장인을 위한 ChatGPT 실무 활용: 3분 만에 끝내는 업무 효율 극대화 전략",
    category: "AI 기본 활용",
    date: "오늘 (2026.09.10)",
    xpEarned: 25,
    completed: true
  },
  {
    id: "h2",
    title: "파워포인트 없이 5분 만에 고품질 발표 자료 만드는 AI, 감마(Gamma)",
    category: "AI 크리에이티브",
    date: "어제 (2026.09.09)",
    xpEarned: 20,
    completed: true
  },
  {
    id: "h3",
    title: "AI 에이전트, 보고서 작성부터 자료 통합까지: Make.com 워크플로우",
    category: "AI 업무 자동화",
    date: "2026.09.08",
    xpEarned: 30,
    completed: true
  },
  {
    id: "h4",
    title: "텍스트에서 영상까지, 실패 없는 AI 비디오 제작 5단계",
    category: "AI 크리에이티브",
    date: "2026.09.07",
    xpEarned: 20,
    completed: true
  }
];

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<"vault" | "growth" | "subscriptions">("vault");
  const [vaultSubTab, setVaultSubTab] = useState<"bookmarks" | "prompts" | "history">("bookmarks");
  
  // Gamification stats
  const [currentXp, setCurrentXp] = useState(380);
  const targetXp = 500;
  const currentLevel = "Lv.3 실무 자동화 빌더";
  const streakDays = 4;
  
  // Interactive subscriptions state
  const [subscriptions, setSubscriptions] = useState<Record<string, boolean>>({
    basic: true,
    automation: true,
    creative: true,
    agent: true,
    trend: false,
    monetize: true
  });
  
  // Subscription Pause state
  const [isPaused, setIsPaused] = useState(false);
  const [pausePeriod, setPausePeriod] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Copied alert for prompts
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Bookmarks state
  const [bookmarkedArticles, setBookmarkedArticles] = useState<any[]>([]);
  const [loadingBookmarks, setLoadingBookmarks] = useState(true);

  // Load subscriptions & bookmarks from storage / API
  useEffect(() => {
    const savedSubs = localStorage.getItem("aiditor_subscriptions");
    if (savedSubs) {
      try {
        setSubscriptions(JSON.parse(savedSubs));
      } catch (e) {}
    }
    const savedPause = localStorage.getItem("aiditor_sub_paused");
    if (savedPause) {
      setIsPaused(savedPause === "true");
      setPausePeriod(localStorage.getItem("aiditor_pause_period") || "2주간 쉬어가기");
    }

    // Load recent published articles for bookmarks showcase
    async function loadSampleBookmarks() {
      try {
        const res = await fetch("/api/ingest");
        const json = await res.json();
        if (json.success && json.data) {
          const published = json.data.filter((item: any) => item.status === "Published");
          const items = published.slice(0, 3).map((item: any) => {
            let bodyObj: any = {};
            try {
              bodyObj = typeof item.body === "string" ? JSON.parse(item.body) : item.body;
            } catch (e) {}
            return {
              id: item.id,
              title: item.title?.replace(/^\[[^\]]+\]\s*/, "") || "",
              badge: bodyObj.badge || "AI 기본 활용",
              tag: bodyObj.chip || "#실무생산성",
              channel_name: bodyObj.source_channel_name || "AIditor 소스 풀",
              image: item.thumbnail || "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600",
              href: `/article?id=${item.id}`,
              savedAt: "2026.09.09 저장"
            };
          });
          setBookmarkedArticles(items);
        }
      } catch (e) {
      } finally {
        setLoadingBookmarks(false);
      }
    }
    loadSampleBookmarks();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleToggleSub = (catId: string) => {
    const next = { ...subscriptions, [catId]: !subscriptions[catId] };
    setSubscriptions(next);
    localStorage.setItem("aiditor_subscriptions", JSON.stringify(next));
    triggerToast(`[${DEFAULT_CATEGORIES.find(c => c.id === catId)?.name}] 알림 설정이 저장되었습니다.`);
  };

  const handlePauseSubscription = (period: string) => {
    setIsPaused(true);
    setPausePeriod(period);
    localStorage.setItem("aiditor_sub_paused", "true");
    localStorage.setItem("aiditor_pause_period", period);
    triggerToast(`뉴스레터 발송이 ${period} 동안 일시정지되었습니다.`);
  };

  const handleResumeSubscription = () => {
    setIsPaused(false);
    setPausePeriod(null);
    localStorage.removeItem("aiditor_sub_paused");
    localStorage.removeItem("aiditor_pause_period");
    triggerToast("뉴스레터 구독이 정상적으로 재개되었습니다.");
  };

  const handleCopyPrompt = (prompt: SavedPrompt) => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopiedId(prompt.id);
    setCurrentXp(prev => Math.min(targetXp, prev + 5));
    triggerToast(`프롬프트가 복사되었습니다! (+5 XP 획득)`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRemoveBookmark = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarkedArticles(prev => prev.filter(item => item.id !== id));
    triggerToast("북마크가 해제되었습니다.");
  };

  return (
    <div className="w-full max-w-[1200px] px-4 sm:px-6 py-8 flex flex-col gap-8">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-sm font-semibold border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Header: Profile & Gamification XP Card */}
      <section className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          
          {/* User Profile & Level Badge */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#f97316] to-amber-400 p-0.5 shadow-md">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden">
                  <User className="w-10 h-10 text-slate-700" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white shadow-sm flex items-center gap-1">
                <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
                <span>{streakDays}일</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">학습자님</h1>
                <span className="bg-orange-100 text-[#ea580c] font-bold text-xs px-2.5 py-0.5 rounded-full border border-orange-200">
                  {currentLevel}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                실무 활용 프롬프트를 복붙하고 실습하며 성장하는 AIditor 회원
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs font-semibold text-gray-400">
                <span>계정: user@aiditor.io</span>
                <span>•</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 구독 활성화 상태
                </span>
              </div>
            </div>
          </div>

          {/* Gamification Progress Bar */}
          <div className="w-full md:w-80 bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-gray-600 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-[#f97316] fill-[#f97316]" /> AI 역량 경험치 (XP)
              </span>
              <span className="font-extrabold text-gray-900">
                <span className="text-[#f97316]">{currentXp}</span> / {targetXp} XP
              </span>
            </div>
            {/* Progress Track */}
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-[#f97316] rounded-full transition-all duration-500 shadow-xs"
                style={{ width: `${(currentXp / targetXp) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-gray-500">
              <span>다음 레벨(Lv.4 AI 에이전트 마스터)까지</span>
              <span className="font-bold text-gray-700">{targetXp - currentXp} XP 남음</span>
            </div>
          </div>

        </div>

        {/* Quick Metrics Bar */}
        <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-semibold">완독 아티클</p>
              <p className="text-lg font-bold text-gray-900">14편</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Copy className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-semibold">복붙 실습</p>
              <p className="text-lg font-bold text-gray-900">28회</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-semibold">보유 뱃지</p>
              <p className="text-lg font-bold text-gray-900">4개</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#ea580c] flex items-center justify-center">
              <Flame className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-semibold">연속 학습</p>
              <p className="text-lg font-bold text-gray-900">{streakDays}일째 불꽃 유지</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main 3-Tab Navigation Bar */}
      <section className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("vault")}
          className={`flex items-center gap-2 px-6 py-3.5 font-bold text-sm border-b-2 transition-all cursor-pointer ${
            activeTab === "vault"
              ? "border-[#f97316] text-[#f97316]"
              : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>나의 학습 & 북마크</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-semibold">
            {bookmarkedArticles.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("growth")}
          className={`flex items-center gap-2 px-6 py-3.5 font-bold text-sm border-b-2 transition-all cursor-pointer ${
            activeTab === "growth"
              ? "border-[#f97316] text-[#f97316]"
              : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>성장 & 뱃지 리포트</span>
          <span className="text-xs bg-orange-100 text-[#ea580c] px-2 py-0.5 rounded-full font-bold">
            Lv.3
          </span>
        </button>

        <button
          onClick={() => setActiveTab("subscriptions")}
          className={`flex items-center gap-2 px-6 py-3.5 font-bold text-sm border-b-2 transition-all cursor-pointer ${
            activeTab === "subscriptions"
              ? "border-[#f97316] text-[#f97316]"
              : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>뉴스레터 & 구독 관리</span>
          {isPaused && (
            <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
              일시정지 중
            </span>
          )}
        </button>
      </section>

      {/* ========================================================================= */}
      {/* TAB 1: 나의 학습 & 북마크 (Learning Vault)                                */}
      {/* ========================================================================= */}
      {activeTab === "vault" && (
        <div className="flex flex-col gap-6">
          {/* Sub-Tab Filter */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setVaultSubTab("bookmarks")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  vaultSubTab === "bookmarks"
                    ? "bg-gray-900 text-white shadow-xs"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                북마크한 아티클 ({bookmarkedArticles.length})
              </button>

              <button
                onClick={() => setVaultSubTab("prompts")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  vaultSubTab === "prompts"
                    ? "bg-gray-900 text-white shadow-xs"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                저장한 프롬프트 레시피 ({INITIAL_PROMPTS.length})
              </button>

              <button
                onClick={() => setVaultSubTab("history")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  vaultSubTab === "history"
                    ? "bg-gray-900 text-white shadow-xs"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                최근 학습 히스토리 ({INITIAL_HISTORY.length})
              </button>
            </div>

            <Link href="/" className="text-xs font-bold text-[#f97316] hover:underline flex items-center gap-1">
              아티클 더 둘러보기 <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Sub-Tab 1: Bookmarks Grid (3 Columns) */}
          {vaultSubTab === "bookmarks" && (
            <div>
              {loadingBookmarks ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map(n => (
                    <div key={n} className="h-64 rounded-xl bg-gray-100 animate-pulse border border-gray-200" />
                  ))}
                </div>
              ) : bookmarkedArticles.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-400 flex flex-col items-center gap-3">
                  <Bookmark className="w-10 h-10 text-gray-300" />
                  <p className="font-semibold text-gray-600">아직 저장된 북마크 아티클이 없습니다.</p>
                  <p className="text-xs text-gray-400">아티클 상세 페이지에서 북마크 아이콘을 눌러 실무에 필요한 글을 저장해 보세요.</p>
                  <Link href="/" className="mt-2 px-5 py-2.5 bg-[#f97316] text-white text-xs font-bold rounded-xl hover:bg-[#ea580c] transition-colors">
                    최신 아티클 보러가기
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookmarkedArticles.map((article) => (
                    <Link 
                      href={article.href} 
                      key={article.id} 
                      className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col cursor-pointer"
                    >
                      <div className="aspect-[16/9] w-full bg-gray-900 relative overflow-hidden">
                        <img 
                          src={article.image} 
                          alt={article.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap z-10">
                          <span className="bg-slate-900/90 backdrop-blur-sm text-white text-[10px] px-2.5 py-0.5 font-bold rounded shadow-sm">
                            {article.badge}
                          </span>
                          <span className="bg-emerald-500/90 text-white backdrop-blur-sm text-[10px] px-2.5 py-0.5 font-bold rounded shadow-sm">
                            {article.tag}
                          </span>
                        </div>
                        {/* Bookmark Button */}
                        <button
                          onClick={(e) => handleRemoveBookmark(article.id, e)}
                          title="북마크 해제"
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 backdrop-blur-sm text-[#f97316] hover:bg-slate-900 flex items-center justify-center transition-colors z-10"
                        >
                          <Bookmark className="w-4 h-4 fill-[#f97316]" />
                        </button>
                      </div>
                      
                      <div className="p-4 flex flex-col flex-grow justify-between gap-3">
                        <h3 className="font-bold text-[16px] leading-snug text-gray-900 group-hover:text-[#f97316] transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-2.5">
                          <span className="text-gray-600 font-bold truncate">출처: {article.channel_name}</span>
                          <span className="text-gray-400 text-[11px] shrink-0">{article.savedAt}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Sub-Tab 2: Saved Prompts Showcase */}
          {vaultSubTab === "prompts" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {INITIAL_PROMPTS.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-xs hover:border-orange-200 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-orange-50 text-[#ea580c] font-extrabold text-[11px] px-2.5 py-0.5 rounded-full border border-orange-200">
                        {item.tool}
                      </span>
                      <span className="text-[11px] text-gray-400 font-semibold flex items-center gap-1">
                        <Copy className="w-3 h-3" /> 복붙 {item.copiedCount}회
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm mb-2.5 leading-snug">
                      {item.title}
                    </h4>
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 text-xs font-mono text-gray-700 whitespace-pre-wrap line-clamp-4 leading-relaxed">
                      {item.prompt}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-[11px] text-gray-400 truncate max-w-[170px]" title={item.sourceArticle}>
                      출처: {item.sourceArticle}
                    </span>
                    <button
                      onClick={() => handleCopyPrompt(item)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        copiedId === item.id
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-[#f97316] text-white hover:bg-[#ea580c]"
                      }`}
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>복사완료!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>복붙하기</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Sub-Tab 3: Learning History Timeline */}
          {vaultSubTab === "history" && (
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/70 text-xs font-bold text-gray-500">
                    <th className="p-4 pl-6">학습 콘텐츠</th>
                    <th className="p-4">카테고리</th>
                    <th className="p-4">획득 경험치</th>
                    <th className="p-4">학습 일시</th>
                    <th className="p-4 pr-6 text-right">상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {INITIAL_HISTORY.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 pl-6 font-bold text-gray-900 max-w-md truncate">
                        {row.title}
                      </td>
                      <td className="p-4">
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 font-semibold">
                          {row.category}
                        </span>
                      </td>
                      <td className="p-4 font-extrabold text-[#ea580c]">
                        +{row.xpEarned} XP
                      </td>
                      <td className="p-4 text-xs text-gray-500 font-medium">
                        {row.date}
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> 완독 완료
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: 성장 & 뱃지 리포트 (Gamification)                                   */}
      {/* ========================================================================= */}
      {activeTab === "growth" && (
        <div className="flex flex-col gap-8">
          
          {/* Level Roadmap Overview */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <span className="text-orange-400 font-bold text-xs uppercase tracking-wider">AIditor Learning Pathway</span>
                <h3 className="text-2xl font-bold mt-1 text-white">나의 AI 실무 성장 단계</h3>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  아티클을 완독하고 프롬프트를 실습할 때마다 XP가 쌓이며, 다음 단계의 칭호와 특별 뱃지가 해금됩니다.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-4 py-2.5 bg-white/10 rounded-xl border border-white/10 text-center">
                  <p className="text-[10px] text-slate-400">현재 등급</p>
                  <p className="text-sm font-extrabold text-orange-400">Lv.3 빌더</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
                <div className="px-4 py-2.5 bg-white/5 rounded-xl border border-white/5 text-center opacity-70">
                  <p className="text-[10px] text-slate-400">다음 등급</p>
                  <p className="text-sm font-extrabold text-white">Lv.4 마스터</p>
                </div>
              </div>
            </div>

            {/* 4-Step Level Steps */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-700/60">
              {[
                { step: "Lv.1", title: "AI 비기너", desc: "생성형 AI 기본 개념 습득", status: "completed" },
                { step: "Lv.2", title: "프롬프트 입문자", desc: "실무 프롬프트 10회 복붙", status: "completed" },
                { step: "Lv.3", title: "자동화 빌더", desc: "업무 자동화 파이프라인 실습", status: "current" },
                { step: "Lv.4", title: "AI 에이전트 마스터", desc: "자율 에이전트 구축 및 응용", status: "locked" },
              ].map((lvl, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-2xl border transition-all ${
                    lvl.status === "completed"
                      ? "bg-slate-800/80 border-emerald-500/40"
                      : lvl.status === "current"
                        ? "bg-orange-900/30 border-[#f97316] shadow-sm"
                        : "bg-slate-800/40 border-slate-700/40 opacity-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-black ${lvl.status === "current" ? "text-orange-400" : "text-slate-400"}`}>
                      {lvl.step}
                    </span>
                    {lvl.status === "completed" && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    {lvl.status === "current" && <Flame className="w-4 h-4 text-[#f97316] fill-[#f97316]" />}
                    {lvl.status === "locked" && <Lock className="w-3.5 h-3.5 text-slate-500" />}
                  </div>
                  <h4 className="font-bold text-sm text-white">{lvl.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1">{lvl.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Badge Grid Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">획득 뱃지 컬렉션</h3>
                <p className="text-xs text-gray-500">학습 활동을 통해 수집한 뱃지 리스트입니다. (총 6개 중 4개 획득)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {INITIAL_BADGES.map((badge) => (
                <div 
                  key={badge.id} 
                  className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                    badge.unlocked
                      ? "bg-white border-gray-200 shadow-xs hover:border-orange-300"
                      : "bg-gray-50/70 border-dashed border-gray-300 opacity-75"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
                        badge.unlocked ? "bg-orange-50 border border-orange-200 shadow-xs" : "bg-gray-200 grayscale"
                      }`}>
                        {badge.icon}
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        badge.unlocked ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-gray-200 text-gray-500"
                      }`}>
                        {badge.unlocked ? "획득 완료" : "잠금 상태"}
                      </span>
                    </div>

                    <h4 className="font-bold text-gray-900 text-base mb-1">
                      {badge.name}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {badge.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px]">
                    {badge.unlocked ? (
                      <span className="text-gray-400 font-medium">달성일: {badge.unlockedDate}</span>
                    ) : (
                      <span className="text-[#ea580c] font-bold">{badge.progress}</span>
                    )}
                    <span className="text-gray-400 font-semibold">{badge.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: 뉴스레터 & 구독 관리 (Newneek Benchmark Spec)                     */}
      {/* ========================================================================= */}
      {activeTab === "subscriptions" && (
        <div className="flex flex-col gap-8">
          
          {/* Top Banner: Retention Pause Mechanism */}
          <div className={`rounded-3xl p-6 sm:p-8 border transition-all ${
            isPaused 
              ? "bg-amber-50 border-amber-300" 
              : "bg-white border-gray-200 shadow-xs"
          }`}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">
                    {isPaused ? "뉴스레터 발송이 일시정지 중입니다" : "바쁜 일정으로 메일이 부담스러우신가요?"}
                  </h3>
                  {isPaused && (
                    <span className="bg-amber-200 text-amber-900 text-xs font-black px-2.5 py-0.5 rounded-full">
                      {pausePeriod}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 max-w-xl leading-relaxed">
                  {isPaused
                    ? "일시정지 기간 동안에는 뉴스레터 발송이 중단되며, 원하실 때 언제든 즉시 재개할 수 있습니다."
                    : "구독을 완전히 취소하는 대신, 원하는 기간 동안 메일 발송을 잠시 멈추고 쉬어갈 수 있습니다."}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {isPaused ? (
                  <button
                    onClick={handleResumeSubscription}
                    className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>구독 즉시 재개하기</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handlePauseSubscription("2주간 쉬어가기")}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl border border-gray-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <PauseCircle className="w-3.5 h-3.5" />
                      <span>2주 일시정지</span>
                    </button>
                    <button
                      onClick={() => handlePauseSubscription("1달간 쉬어가기")}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl border border-gray-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <PauseCircle className="w-3.5 h-3.5" />
                      <span>1달 일시정지</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Category-by-Category ON/OFF Toggles (6 Confirmed Categories) */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="mb-6 pb-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">카테고리별 맞춤 수신 설정</h3>
              <p className="text-xs text-gray-500 mt-1">
                원하는 실무 분야만 선택하여 뉴스레터를 받아보실 수 있습니다. 불필요한 카테고리는 꺼두셔도 됩니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DEFAULT_CATEGORIES.map((cat) => {
                const isChecked = !!subscriptions[cat.id];
                return (
                  <div 
                    key={cat.id} 
                    className="p-4 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all flex items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${cat.color}`}>
                          {cat.name}
                        </span>
                        {isChecked && (
                          <span className="text-[10px] text-emerald-600 font-bold">수신 중</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 leading-snug">
                        {cat.desc}
                      </p>
                    </div>

                    {/* Toggle Switch */}
                    <button
                      onClick={() => handleToggleSub(cat.id)}
                      className={`w-12 h-6.5 rounded-full transition-colors relative cursor-pointer shrink-0 p-0.5 ${
                        isChecked ? "bg-[#f97316]" : "bg-gray-300"
                      }`}
                      aria-label={`${cat.name} 수신 토글`}
                    >
                      <div 
                        className={`w-5.5 h-5.5 rounded-full bg-white shadow-md transition-transform ${
                          isChecked ? "translate-x-5.5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Account Settings / Termination Support */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col gap-4">
            <h3 className="text-base font-bold text-gray-900">계정 및 보안</h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-gray-600">
              <div>
                <p className="font-semibold text-gray-800">이메일 계정: user@aiditor.io</p>
                <p className="text-gray-400 mt-0.5">뉴스레터 수신 주소 및 북마크 데이터가 이 계정에 안전하게 동기화됩니다.</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => triggerToast("비밀번호 재설정 이메일이 발송되었습니다.")}
                  className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 font-semibold cursor-pointer"
                >
                  비밀번호 변경
                </button>
                <button 
                  onClick={() => triggerToast("로그아웃되었습니다.")}
                  className="px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 font-semibold cursor-pointer"
                >
                  로그아웃
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
