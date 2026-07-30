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
  Users
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
  const [targetSite, setTargetSite] = useState<"flow" | "root" | "both">("flow");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }],
      ['link', 'image', 'video', 'clean'],
    ],
    imageResize: {
      parament: 'root',
      modules: ['Resize', 'DisplaySize']
    }
  }), []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert("콘텐츠가 성공적으로 저장되었습니다.");
  };

  return (
    <div className="font-body-md text-gray-900 min-h-screen bg-[#f8f9fa] flex flex-col w-full">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shrink-0">
          <div className="p-8">
            <a href="/" className="flex items-center gap-4 mb-12 group cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-emerald-tech flex items-center justify-center group-hover:scale-105 transition-transform">
                <Terminal className="text-black w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-sm">A-Zip Admin</h2>
                <p className="text-[10px] text-gray-500 font-technical-sm uppercase tracking-widest">통합 관리 시스템 V3.0</p>
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
                {[
                  { name: '콘텐츠 피드 관리', icon: <Share2 className="w-4 h-4" />, sub: ["요약 피드 관리", "Zippy's Pick 설정"], href: "#" },
                  { name: 'LMS 코스 관리', icon: <Database className="w-4 h-4" />, sub: ["LMS 코스 설정", "과제 및 평가 모니터링"], href: "#" },
                  { name: '통합 콘텐츠 에디터', icon: <FileEdit className="w-4 h-4" />, href: "/admin/editor" },
                  { name: '사용자 및 서비스 관리', icon: <Users className="w-4 h-4" />, sub: ["학점(Credit) 제어", "구독 플랜 관리"], href: "/admin/users" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col">
                    <a href={item.href} className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm cursor-pointer group ${item.href === '/admin/editor' ? 'bg-gray-50 text-emerald-tech font-bold border border-emerald-tech/20' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                      <div className="flex items-center gap-3">
                        {item.icon}
                        {item.name}
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Editor Area */}
        <main className="flex-1 overflow-y-auto p-10 bg-[#f8f9fa]">
          <div className="max-w-5xl mx-auto flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">통합 콘텐츠 에디터</h1>
                <p className="text-xs text-gray-500 mt-1">AIditor 포털 및 AI-Root 교재 아티클 통합 발행 콘솔</p>
              </div>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 bg-[#f97316] hover:bg-[#ea580c] text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {isSaving ? "저장 중..." : "발행하기"}
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">아티클 제목</label>
                <input 
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목을 입력하세요..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg font-bold focus:outline-none focus:border-[#f97316]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">본문 에디터</label>
                <div className="min-h-[400px]">
                  <ReactQuill 
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    className="h-[350px] mb-12"
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
