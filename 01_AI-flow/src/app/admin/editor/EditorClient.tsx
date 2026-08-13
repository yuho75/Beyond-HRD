// v2.3.0 - Added Bulk Deletion & Multi-Select Checkboxes
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
  CheckSquare,
  Square,
  AlertTriangle
} from "lucide-react";
import nextDynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

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
  const [filterStatus, setFilterStatus] = useState<"Draft" | "Published" | "All">("Draft");
  const [selectedDraftId, setSelectedDraftId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [badge, setBadge] = useState("AI 따라하기");
  const [chip, setChip] = useState("#수익자동화");
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [loadingDrafts, setLoadingDrafts] = useState(true);

  // Filtered drafts by active tab
  const filteredDrafts = useMemo(() => {
    if (filterStatus === "Draft") {
      return drafts.filter(d => d.status === "Draft" || !d.status);
    }
    if (filterStatus === "Published") {
      return drafts.filter(d => d.status === "Published");
    }
    return drafts;
  }, [drafts, filterStatus]);

  // Fetch all Drafts from Supabase via server API
  useEffect(() => {
    async function fetchDrafts() {
      setLoadingDrafts(true);
      try {
        const res = await fetch("/api/ingest");
        const json = await res.json();
        if (json.success && json.data) {
          setDrafts(json.data);
          const initialPending = json.data.filter((d: any) => d.status === "Draft" || !d.status);
          if (initialPending.length > 0) {
            loadDraftIntoEditor(initialPending[0]);
          } else if (json.data.length > 0) {
            loadDraftIntoEditor(json.data[0]);
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

    // Format Full Rich AIditor Article Body matching D_final_strategy.md spec
    const summaryList = bodyObj.summary_points?.map((p: string) => `<li style="margin-bottom: 6px;"><strong>${p}</strong></li>`).join("") 
      || `<li><strong>에디터 픽 1: 실무 AI 프롬프트 템플릿 적용법</strong></li><li><strong>에디터 픽 2: 반복 업무를 90% 줄여주는 노코드 세팅법</strong></li><li><strong>에디터 픽 3: 3분 칼퇴 보장 가이드</strong></li>`;

    const comment = bodyObj.editor_comment || "별점 5.0 / 실무 적용 가이드입니다.";
    const actionGuides = bodyObj.action_guides?.map((g: string, idx: number) => `<p style="margin-bottom: 8px;"><strong>Step 0${idx+1}:</strong> ${g.replace(/^Step \d+:\s*/, "")}</p>`).join("") 
      || `<p><strong>Step 01:</strong> 상단 복붙 프롬프트를 챗GPT/Claude에 입력합니다.</p><p><strong>Step 02:</strong> 업무 서식과 결합하여 자동 요약을 수행합니다.</p><p><strong>Step 03:</strong> 사내 보고서 및 실무에 즉시 반영합니다.</p>`;

    const channelName = bodyObj.source_channel_name || "AIditor 소스 풀";
    const channelUrl = bodyObj.source_video_url || "https://youtube.com";

    const richArticleHtml = `
      <h3 style="color: #0f172a; font-size: 1.125rem; font-weight: 700; margin-bottom: 8px;">📌 에디터 픽 (핵심 3줄 요약)</h3>
      <ul style="padding-left: 20px; color: #334155; margin-bottom: 16px;">
        ${summaryList}
      </ul>

      <h3 style="color: #0f172a; font-size: 1.125rem; font-weight: 700; margin-bottom: 8px;">⭐ 에디터 팩트체크 & 총평</h3>
      <div style="background-color: #f8fafc; border-left: 4px solid #f97316; padding: 12px 16px; border-radius: 4px; margin-bottom: 16px;">
        <p style="color: #1e293b; margin: 0; font-weight: 600;">${comment}</p>
      </div>

      <h3 style="color: #0f172a; font-size: 1.125rem; font-weight: 700; margin-bottom: 8px;">🚀 비개발자 3단계 실천 액션 가이드</h3>
      <div style="color: #334155; line-height: 1.6; margin-bottom: 16px;">
        ${actionGuides}
      </div>

      <h3 style="color: #0f172a; font-size: 1.125rem; font-weight: 700; margin-bottom: 8px;">📺 소스 풀 원본 출처</h3>
      <p style="color: #64748b; font-size: 0.875rem;">
        출처 채널: <strong>${channelName}</strong> | 
        <a href="${channelUrl}" target="_blank" rel="noopener noreferrer" style="color: #f97316; text-decoration: underline;">유튜브 원본 영상 보러가기 ↗</a>
      </p>
    `.trim();

    setContent(richArticleHtml);
  };

  const toggleSelectId = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const currentTabIds = filteredDrafts.map(d => String(d.id));
    const allSelected = currentTabIds.length > 0 && currentTabIds.every(id => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds(prev => prev.filter(id => !currentTabIds.includes(id)));
    } else {
      const combined = new Set([...selectedIds, ...currentTabIds]);
      setSelectedIds(Array.from(combined));
    }
  };

  const handlePublish = async () => {
    if (!selectedDraftId) {
      alert("발행할 아티클을 먼저 선택해 주세요.");
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch("/api/ingest", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedDraftId, status: "Published" })
      });
      const json = await res.json();
      if (json.success) {
        alert("🎉 검수 완료! 실시간 라이브 사이트에 성공적으로 발행(노출)되었습니다!");
        setDrafts(prev => prev.map(d => d.id === selectedDraftId ? { ...d, status: "Published" } : d));
      } else {
        alert("발행 오류: " + (json.error || "알 수 없는 오류"));
      }
    } catch (e: any) {
      alert("오류 발생: " + e.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSingle = async () => {
    if (!selectedDraftId) {
      alert("삭제할 아티클을 선택해 주세요.");
      return;
    }
    if (!confirm("정말 이 아티클을 Supabase DB에서 삭제하시겠습니까?")) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/ingest", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedDraftId })
      });
      const json = await res.json();
      if (json.success) {
        alert("🗑️ 해당 아티클이 삭제되었습니다.");
        const updated = drafts.filter(d => String(d.id) !== String(selectedDraftId));
        setDrafts(updated);
        setSelectedIds(prev => prev.filter(id => id !== String(selectedDraftId)));
        if (updated.length > 0) loadDraftIntoEditor(updated[0]);
        else {
          setSelectedDraftId(null);
          setTitle(""); setBadge(""); setChip(""); setPrompt(""); setContent("");
        }
      }
    } catch (e: any) {
      alert("삭제 오류: " + e.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      alert("삭제할 아티클을 1개 이상 체크박스로 선택해 주세요.");
      return;
    }
    if (!confirm(`선택한 ${selectedIds.length}개의 아티클을 정말 일괄 삭제하시겠습니까?`)) {
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch("/api/ingest", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds })
      });
      const json = await res.json();
      if (json.success) {
        alert(`🗑️ 선택한 ${selectedIds.length}개의 아티클이 성공적으로 일괄 삭제되었습니다!`);
        const updated = drafts.filter(d => !selectedIds.includes(String(d.id)));
        setDrafts(updated);
        setSelectedIds([]);
        if (updated.length > 0) {
          loadDraftIntoEditor(updated[0]);
        } else {
          setSelectedDraftId(null);
          setTitle(""); setBadge(""); setChip(""); setPrompt(""); setContent("");
        }
      } else {
        alert("일괄 삭제 오류: " + (json.error || "알 수 없는 오류"));
      }
    } catch (e: any) {
      alert("오류 발생: " + e.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePurgeAll = async () => {
    if (!confirm("🚨 정말로 DB의 모든 테스트 아티클 데이터를 전체 삭제(초기화)하시겠습니까?")) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/ingest", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleteAll: true })
      });
      const json = await res.json();
      if (json.success) {
        alert("💥 모든 테스트 데이터가 성공적으로 전체 삭제되었습니다!");
        setDrafts([]);
        setSelectedIds([]);
        setSelectedDraftId(null);
        setTitle(""); setBadge(""); setChip(""); setPrompt(""); setContent("");
      }
    } catch (e: any) {
      alert("초기화 오류: " + e.message);
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

  const handleManualTriggerCollect = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/cron/auto-collect", { method: "POST" });
      const data = await res.json();
      if (data && data.success) {
        alert(data.message);
        const refreshRes = await fetch("/api/ingest");
        const refreshJson = await refreshRes.json();
        if (refreshJson.success && refreshJson.data) {
          setDrafts(refreshJson.data);
          if (refreshJson.data.length > 0) loadDraftIntoEditor(refreshJson.data[0]);
        }
      } else {
        alert("수집 실패: " + (data?.error || "알 수 없는 오류"));
      }
    } catch (e: any) {
      alert("수집 오류: " + (e.message || "서버 통신 오류"));
    } finally {
      setIsSaving(false);
    }
  };

  const isAllCurrentTabSelected = filteredDrafts.length > 0 && filteredDrafts.every(d => selectedIds.includes(String(d.id)));

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
                <p className="text-xs text-gray-500 mt-1">Opal 및 AI가 수집/생성한 아티클을 검수하여 승인(OK)하면 실시간 라이브 사이트에 노출됩니다.</p>
              </div>
              <div className="flex items-center gap-3">
                {selectedIds.length > 0 && (
                  <button 
                    onClick={handleBulkDelete}
                    disabled={isSaving}
                    className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer shadow-sm animate-pulse"
                  >
                    <Trash2 className="w-4 h-4" />
                    선택한 {selectedIds.length}개 일괄 삭제
                  </button>
                )}
                <button 
                  onClick={handleDeleteSingle}
                  disabled={isSaving || !selectedDraftId}
                  className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  단일 삭제
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

            {/* Status Filter Tabs & Selector List */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#f97316]" />
                  <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                    <button
                      onClick={() => setFilterStatus("Draft")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${filterStatus === "Draft" ? "bg-amber-500 text-white shadow-2xs" : "text-gray-600 hover:text-gray-900"}`}
                    >
                      🟡 검수 대기중 ({drafts.filter(d => d.status === "Draft" || !d.status).length})
                    </button>
                    <button
                      onClick={() => setFilterStatus("Published")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${filterStatus === "Published" ? "bg-emerald-600 text-white shadow-2xs" : "text-gray-600 hover:text-gray-900"}`}
                    >
                      🟢 승인/발행 완료 ({drafts.filter(d => d.status === "Published").length})
                    </button>
                    <button
                      onClick={() => setFilterStatus("All")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${filterStatus === "All" ? "bg-slate-800 text-white shadow-2xs" : "text-gray-600 hover:text-gray-900"}`}
                    >
                      📋 전체 ({drafts.length})
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleSelectAll}
                    disabled={filteredDrafts.length === 0}
                    className="text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-40"
                  >
                    {isAllCurrentTabSelected ? <CheckSquare className="w-4 h-4 text-[#f97316]" /> : <Square className="w-4 h-4 text-gray-400" />}
                    {isAllCurrentTabSelected ? "전체 선택 해제" : "현재 탭 전체 선택"}
                  </button>

                  {selectedIds.length > 0 && (
                    <button
                      onClick={handleBulkDelete}
                      disabled={isSaving}
                      className="text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      선택 {selectedIds.length}개 일괄 삭제
                    </button>
                  )}

                  <button
                    onClick={handlePurgeAll}
                    disabled={isSaving || drafts.length === 0}
                    className="text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-2 rounded-xl flex items-center gap-1 transition-all cursor-pointer disabled:opacity-40"
                    title="모든 구버전 테스트 데이터를 전체 삭제합니다"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    전체 초기화
                  </button>

                  <button 
                    onClick={handleManualTriggerCollect}
                    disabled={isSaving}
                    className="text-xs font-bold text-[#f97316] bg-orange-50 hover:bg-orange-100 border border-orange-200 px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                  >
                    ⚡ 1초 즉시 수집 테스트
                  </button>
                </div>
              </div>

              {loadingDrafts ? (
                <div className="text-xs text-gray-400 p-4">아티클 목록을 불러오는 중...</div>
              ) : filteredDrafts.length === 0 ? (
                <div className="text-xs text-gray-400 p-6 border border-dashed border-gray-200 rounded-xl text-center">
                  {filterStatus === "Draft" ? "🎉 현재 검수 대기 중인 아티클이 없습니다! 모든 아티클이 승인되었습니다." : "해당 항목의 아티클이 없습니다."}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
                  {filteredDrafts.map((item) => {
                    const itemIdStr = String(item.id);
                    const isChecked = selectedIds.includes(itemIdStr);
                    const isSelected = String(selectedDraftId) === itemIdStr;
                    return (
                      <div 
                        key={item.id}
                        onClick={() => loadDraftIntoEditor(item)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${isSelected ? 'border-[#f97316] bg-orange-50/50 shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                      >
                        <input 
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => toggleSelectId(itemIdStr)}
                          onClick={(e) => e.stopPropagation()}
                          className="mt-1 w-4 h-4 text-[#f97316] focus:ring-[#f97316] rounded border-gray-300 cursor-pointer accent-[#f97316]"
                        />
                        <div className="flex-1 flex flex-col justify-between gap-2 overflow-hidden">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-bold text-sm text-gray-900 line-clamp-1">{item.title}</h3>
                            <span className={`text-[10px] px-2 py-0.5 font-bold rounded shrink-0 ${item.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                              {item.status === 'Published' ? '🟢 노출중 (OK)' : '🟡 검수대기 (Draft)'}
                            </span>
                          </div>
                          <span className="text-[11px] text-gray-400">생성일: {new Date(item.created_at).toLocaleString('ko-KR')}</span>
                        </div>
                      </div>
                    );
                  })}
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
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f97316] font-bold text-lg text-gray-900 bg-gray-50/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">뱃지 카테고리</label>
                  <input 
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f97316] text-sm bg-gray-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">해시태그 칩</label>
                  <input 
                    type="text"
                    value={chip}
                    onChange={(e) => setChip(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f97316] text-sm bg-gray-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">📋 원클릭 복붙 프롬프트 레시피</label>
                <textarea 
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="프롬프트 레시피 내용..."
                  className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f97316] font-mono text-xs text-gray-800 bg-gray-900 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">본문 세부 구성 리포트 (WYSIWYG 에디터)</label>
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  <ReactQuill 
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    className="min-h-[300px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
