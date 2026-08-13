"use client";

import { useState, useMemo, useEffect } from "react";
import { 
  Search, 
  Save, 
  Image as ImageIcon, 
  ChevronLeft, 
  Layout, 
  Globe, 
  Smartphone, 
  Monitor, 
  CheckCircle2,
  Terminal,
  LayoutDashboard,
  Share2,
  Database,
  FileEdit,
  Users,
  Sparkles,
  Check,
  Eye,
  Trash2,
  ClipboardPaste,
  Zap
} from "lucide-react";
import nextDynamic from "next/dynamic";
import { createClient } from "@supabase/supabase-js";
import "react-quill-new/dist/quill.snow.css";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://cvzzywvcglnlotqgdpfq.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2enp5d3ZjZ2xubG90cWdkcGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNDcyODAsImV4cCI6MjA1NzYyMzI4MH0.fake_anon_key";
const supabase = createClient(supabaseUrl, supabaseKey);

const ReactQuill = nextDynamic(async () => {
  const { default: RQ } = await import("react-quill-new");
  if (typeof window !== 'undefined') {
    (window as any).Quill = RQ.Quill;
    try {
      // @ts-ignore
      const { default: ImageResize } = await import("quill-image-resize-module-react");
      RQ.Quill.register("modules/imageResize", ImageResize);
    } catch (e) {
      // fallback
    }
  }
  return RQ;
}, { ssr: false });

export default function UnifiedEditor() {
  const [drafts, setDrafts] = useState<any[]>([]);
  const [selectedDraftId, setSelectedDraftId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [badge, setBadge] = useState("AI 따라하기");
  const [chip, setChip] = useState("#수익자동화");
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [loadingDrafts, setLoadingDrafts] = useState(true);

  // Quick Paste & Ingest State
  const [quickPaste, setQuickPaste] = useState("");
  const [isQuickIngesting, setIsQuickIngesting] = useState(false);

  // Fetch all Drafts from Supabase
  useEffect(() => {
    async function fetchDrafts() {
      setLoadingDrafts(true);
      try {
        const { data, error } = await supabase
          .from("contents")
          .select("*")
          .order("created_at", { ascending: false });

        if (data) {
          setDrafts(data);
          if (data.length > 0) {
            loadDraftIntoEditor(data[0]);
          }
        }
      } catch (e) {
        console.error("Failed to fetch drafts", e);
      } finally {
        setLoadingDrafts(false);
      }
    }
    fetchDrafts();
  }, []);

  const loadDraftIntoEditor = (item: any) => {
    setSelectedDraftId(item.id);
    setTitle(item.title || "");
    let bodyObj: any = {};
    try {
      bodyObj = typeof item.body === "string" ? JSON.parse(item.body) : item.body;
    } catch (e) {
      bodyObj = { raw: item.body };
    }
    setBadge(bodyObj.badge || "AI 따라하기");
    setChip(bodyObj.chip || "#복붙용_프롬프트");
    setPrompt(bodyObj.copy_paste_asset || bodyObj.prompt || "");
    setContent(bodyObj.editor_comment || bodyObj.summary_points?.join("\n") || item.body || "");
  };

  const handleQuickIngest = async () => {
    if (!quickPaste.trim()) {
      alert("Opal 결과물 JSON이나 마크다운 텍스트를 먼저 붙여넣어 주세요.");
      return;
    }
    setIsQuickIngesting(true);
    try {
      let parsed: any = {};
      try {
        parsed = JSON.parse(quickPaste);
      } catch (e) {
        parsed = { title: "Opal 생성 아티클", body: quickPaste };
      }

      const itemTitle = parsed.title || "[AI 따라하기] Opal 생성 아티클";
      const bodyObj = {
        title: itemTitle,
        tier1_category: parsed.tier1_category || "AI/업무생산성",
        tier2_tools: parsed.tier2_tools || ["Opal"],
        tier3_tags: parsed.tier3_tags || ["#복붙용_프롬프트"],
        demand_job: parsed.demand_job || ["직무 공통"],
        demand_level: parsed.demand_level || "스타터(0~3년)",
        badge: parsed.display_primary_badge || "AI 따라하기",
        chip: parsed.display_primary_chip || "#복붙용_프롬프트",
        copy_paste_asset: parsed.copy_paste_asset || "Act as a senior AI editor...",
        editor_rating: parsed.editor_rating || { ease_of_use: 5, time_saving: 5, cost_effort: 4, practicality: 5 },
        editor_comment: parsed.editor_comment || "Opal 자동 생성 아티클입니다.",
        summary_points: parsed.summary_points || ["Opal 핵심 포인트 1", "Opal 핵심 포인트 2"]
      };

      const payload = {
        title: itemTitle,
        body: JSON.stringify(bodyObj),
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
        status: "Draft"
      };

      const { data, error } = await supabase
        .from("contents")
        .insert([payload])
        .select();

      if (error) {
        alert("입고 중 오류 발생: " + error.message);
      } else {
        alert("⚡ 1초 자동 입고 완료! 검수 대기 목록에 바로 추가되었습니다.");
        setQuickPaste("");
        if (data && data.length > 0) {
          setDrafts(prev => [data[0], ...prev]);
          loadDraftIntoEditor(data[0]);
        }
      }
    } catch (e: any) {
      alert("오류 발생: " + e.message);
    } finally {
      setIsQuickIngesting(false);
    }
  };

  const handlePublish = async () => {
    if (!selectedDraftId) {
      alert("발행할 아티클을 먼저 선택해 주세요.");
      return;
    }
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("contents")
        .update({ status: "Published" })
        .eq("id", selectedDraftId);

      if (error) {
        alert("발행 중 오류 발생: " + error.message);
      } else {
        alert("🎉 검수 완료! 실시간 라이브 사이트에 성공적으로 발행(노출)되었습니다!");
        setDrafts(prev => prev.map(d => d.id === selectedDraftId ? { ...d, status: "Published" } : d));
      }
    } catch (e: any) {
      alert("오류 발생: " + e.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedDraftId) {
      alert("삭제할 아티클을 먼저 선택해 주세요.");
      return;
    }
    if (!confirm("정말 이 아티클을 Supabase DB에서 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.")) {
      return;
    }
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("contents")
        .delete()
        .eq("id", selectedDraftId);

      if (error) {
        alert("삭제 중 오류 발생: " + error.message);
      } else {
        alert("🗑️ 해당 아티클이 Supabase DB에서 깔끔하게 삭제되었습니다!");
        const updated = drafts.filter(d => d.id !== selectedDraftId);
        setDrafts(updated);
        if (updated.length > 0) {
          loadDraftIntoEditor(updated[0]);
        } else {
          setSelectedDraftId(null);
          setTitle("");
          setBadge("");
          setChip("");
          setPrompt("");
          setContent("");
        }
      }
    } catch (e: any) {
      alert("오류 발생: " + e.message);
    } finally {
      setIsSaving(false);
    }
  };

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }],
      ['link', 'image', 'video', 'clean'],
    ],
  }), []);

  return (
    <div className="font-body-md text-gray-900 min-h-screen bg-[#f8f9fa] flex flex-col w-full">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shrink-0">
          <div className="p-8">
            <a href="/" className="flex items-center gap-4 mb-12 group cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-[#f97316] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Terminal className="text-white w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-sm">AIditor Admin</h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">검수 & 발행 콘솔 V1.0</p>
              </div>
            </a>

            <nav className="flex flex-col gap-2">
              <div className="mb-4">
                <a href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-500 font-bold text-sm transition-all cursor-pointer">
                  <LayoutDashboard className="w-4 h-4" />
                  대시보드
                </a>
              </div>

              <div className="flex flex-col gap-1">
                <a href="/admin/editor" className="flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm cursor-pointer bg-orange-50 text-[#f97316] font-bold border border-orange-200">
                  <div className="flex items-center gap-3">
                    <FileEdit className="w-4 h-4" />
                    콘텐츠 검수 & 발행
                  </div>
                </a>
                <a href="/admin/users" className="flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm cursor-pointer text-gray-500 hover:bg-gray-50 hover:text-gray-900">
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4" />
                    사용자 및 서비스 관리
                  </div>
                </a>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Editor Area */}
        <main className="flex-1 overflow-y-auto p-10 bg-[#f8f9fa]">
          <div className="max-w-5xl mx-auto flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI 생성 아티클 검수센터</h1>
                <p className="text-xs text-gray-500 mt-1">Opal 또는 AI가 생성한 아티클을 검수하여 승인(OK)하면 실시간 라이브 사이트에 노출됩니다.</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleDelete}
                  disabled={isSaving || !selectedDraftId}
                  className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  삭제하기
                </button>
                <button 
                  onClick={handlePublish}
                  disabled={isSaving || !selectedDraftId}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm cursor-pointer disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {isSaving ? "승인 및 발행 중..." : "🚀 최종 승인 (라이브 노출)"}
                </button>
              </div>
            </div>

            {/* Quick Ingest Box for Opal */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-700 shadow-md flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Opal / AI 생성 결과 1초 원클릭 자동 입고
                </h2>
                <span className="text-xs text-slate-400">Opal 화면의 결과를 복사해서 붙여넣으시면 1초 만에 검수 대기목록으로 입고됩니다.</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <textarea 
                  rows={2}
                  value={quickPaste}
                  onChange={(e) => setQuickPaste(e.target.value)}
                  placeholder="Opal 우측 상단 복사 아이콘을 눌러 생성 결과를 여기에 붙여넣으세요 (Ctrl+V)..."
                  className="flex-1 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#f97316]"
                />
                <button 
                  onClick={handleQuickIngest}
                  disabled={isQuickIngesting}
                  className="flex items-center justify-center gap-2 bg-[#f97316] hover:bg-[#ea580c] text-white px-5 py-3 rounded-xl font-bold text-xs transition-all shrink-0 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  <ClipboardPaste className="w-4 h-4" />
                  {isQuickIngesting ? "입고 중..." : "⚡ 1초 자동 입고하기"}
                </button>
              </div>
            </div>

            {/* Draft Selector List */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#f97316]" />
                  검수 대기중인 아티클 목록 ({drafts.length}건)
                </h2>
                <span className="text-xs text-gray-400">클릭하여 선택 후 수정, 승인 또는 삭제할 수 있습니다.</span>
              </div>

              {loadingDrafts ? (
                <div className="text-xs text-gray-400 p-4">아티클 목록을 불러오는 중...</div>
              ) : drafts.length === 0 ? (
                <div className="text-xs text-gray-400 p-4 border border-dashed border-gray-200 rounded-xl text-center">
                  현재 검수 대기 중인 아티클이 없습니다.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {drafts.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => loadDraftIntoEditor(item)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between gap-2 ${selectedDraftId === item.id ? 'border-[#f97316] bg-orange-50/50 shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-sm text-gray-900 line-clamp-1">{item.title}</h3>
                        <span className={`text-[10px] px-2 py-0.5 font-bold rounded shrink-0 ${item.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {item.status === 'Published' ? '🟢 노출중 (OK)' : '🟡 검수대기 (Draft)'}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-400">생성일: {new Date(item.created_at).toLocaleString('ko-KR')}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Editor Workspace */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">아티클 제목</label>
                <input 
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목을 입력하세요..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f97316] font-bold text-base bg-[#f8f9fa]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">뱃지 카테고리</label>
                  <input 
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f97316] text-sm bg-[#f8f9fa]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">해시태그 칩</label>
                  <input 
                    type="text"
                    value={chip}
                    onChange={(e) => setChip(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f97316] text-sm bg-[#f8f9fa]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">1초 복붙 프롬프트 (Copy-Paste Prompt)</label>
                <textarea 
                  rows={3}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f97316] font-mono text-xs leading-relaxed bg-[#f8f9fa]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">본문 및 가이드 내용</label>
                <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
                  <ReactQuill 
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    className="h-64 mb-12"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <a href="/article" target="_blank" className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors">
                  <Eye className="w-4 h-4" /> 미리보기 화면 새창으로 열기
                </a>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleDelete}
                    disabled={isSaving || !selectedDraftId}
                    className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    삭제하기
                  </button>
                  <button 
                    onClick={handlePublish}
                    disabled={isSaving || !selectedDraftId}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {isSaving ? "승인 및 발행 중..." : "🚀 최종 승인 (라이브 노출)"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
