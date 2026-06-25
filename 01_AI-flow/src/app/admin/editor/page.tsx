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
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(async () => {
  const { default: RQ } = await import("react-quill-new");
  // @ts-ignore
  const { default: ImageResize } = await import("quill-image-resize-module-react");

  if (typeof window !== 'undefined') {
    (window as any).Quill = RQ.Quill;
  }

  RQ.Quill.register("modules/imageResize", ImageResize);
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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert("콘텐츠가 성공적으로 저장되었습니다.");
  };

  return (
    <div className="font-body-md text-gray-900 min-h-screen bg-[#f8f9fa] flex flex-col w-full">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (Consistent with Admin Dashboard) */}
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
                  { name: '콘텐츠 피드 관리', icon: <Share2 className="w-4 h-4" />, href: "#" },
                  { name: 'LMS 코스 관리', icon: <Database className="w-4 h-4" />, href: "#" },
                  { name: '통합 콘텐츠 에디터', icon: <FileEdit className="w-4 h-4" />, active: true, href: "/admin/editor" },
                  { name: '사용자 및 서비스 관리', icon: <Users className="w-4 h-4" />, href: "/admin/users" },
                ].map((item, i) => (
                  <a 
                    key={i} 
                    href={item.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm cursor-pointer ${
                      item.active ? 'bg-gray-50 text-emerald-tech border border-emerald-tech/20' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {item.name}
                    </div>
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-50">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Content Orchestration</span>
                <h1 className="text-sm font-bold text-gray-900">통합 콘텐츠 에디터</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white rounded-lg p-1 mr-4 border border-gray-200">
                <button 
                  onClick={() => setTargetSite("flow")}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${targetSite === "flow" ? "bg-emerald-tech text-black shadow-lg" : "text-gray-500 hover:text-gray-900"}`}
                >
                  AIditor
                </button>
                <button 
                  onClick={() => setTargetSite("root")}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${targetSite === "root" ? "bg-emerald-tech text-black shadow-lg" : "text-gray-500 hover:text-gray-900"}`}
                >
                  AIditor
                </button>
                <button 
                  onClick={() => setTargetSite("both")}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${targetSite === "both" ? "bg-emerald-tech text-black shadow-lg" : "text-gray-500 hover:text-gray-900"}`}
                >
                  Both
                </button>
              </div>
              
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-5 py-2 bg-emerald-tech text-black text-xs font-bold rounded-lg hover:bg-emerald-tech/90 transition-all shadow-lg shadow-emerald-tech/20 disabled:opacity-50"
              >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {isSaving ? "저장 중..." : "게시하기"}
              </button>
            </div>
          </header>

          <div className="flex-1 flex overflow-hidden bg-[#f8f9fa]">
            {/* Left Form Area */}
            <div className="flex-1 overflow-y-auto p-10 flex justify-center">
              <div className="w-full max-w-[900px] flex flex-col gap-8">
                
                {/* Title & Category Section */}
                <section className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col gap-6 shadow-2xl">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">콘텐츠 제목</label>
                    <input 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="제목을 입력하세요..." 
                      className="bg-transparent text-2xl font-bold text-gray-900 placeholder:text-gray-900/10 border-none focus:ring-0 p-0"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">카테고리</label>
                      <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:border-emerald-tech outline-none transition-colors appearance-none"
                      >
                        <option value="">카테고리 선택</option>
                        <option value="tech">Technology</option>
                        <option value="economy">Economy</option>
                        <option value="policy">Policy</option>
                        <option value="human">Humanism</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">발행 일시</label>
                      <input 
                        type="datetime-local" 
                        className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-emerald-tech"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-6 border-t border-gray-200">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">한줄 요약 (Summary)</label>
                    <textarea 
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      placeholder="독자에게 노출될 짧은 요약 문구를 작성하세요..."
                      className="bg-white border border-gray-300 rounded-2xl px-4 py-4 text-sm text-gray-900 min-h-[100px] focus:border-emerald-tech outline-none transition-colors resize-none"
                    />
                  </div>
                </section>

                {/* Rich Text Editor */}
                <section className="bg-white border border-gray-200 rounded-3xl flex flex-col shadow-2xl overflow-hidden min-h-[700px]">
                  <div className="px-8 py-4 border-b border-gray-200 bg-white/2 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Main Content Body</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-tech animate-pulse"></div>
                      <span className="text-[10px] text-gray-400 uppercase font-technical-sm">Auto-saving Enabled</span>
                    </div>
                  </div>
                  <div className="flex-1 bg-white">
                    <ReactQuill 
                      theme="snow"
                      value={content}
                      onChange={setContent}
                      modules={modules}
                      className="h-[600px] text-gray-900"
                    />
                  </div>
                </section>
              </div>
            </div>

            {/* Right Sidebar - Assets & Meta */}
            <div className="w-[380px] bg-white border-l border-gray-200 flex flex-col p-10 gap-10 overflow-y-auto">
              {/* Featured Image Upload */}
              <div className="flex flex-col gap-4">
                <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-emerald-tech" />
                  Featured Image
                </h3>
                <div 
                  className="w-full aspect-video rounded-2xl bg-white/2 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 hover:border-emerald-tech/50 transition-colors cursor-pointer relative overflow-hidden group"
                  onClick={() => document.getElementById('featured-image')?.click()}
                >
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <ImageIcon className="w-8 h-8 text-gray-900/10" />
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Upload Thumbnail</span>
                    </>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-[10px] text-gray-900 font-bold uppercase tracking-widest bg-emerald-tech text-black px-4 py-2 rounded-full">Change Image</span>
                  </div>
                </div>
                <input 
                  id="featured-image" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageChange}
                />
                <p className="text-[9px] text-gray-400 leading-relaxed font-technical-sm">
                  * RECOMMENDATION: 1600x900px (16:9)<br />
                  * LIMIT: 5MB (JPG, PNG, WebP)
                </p>
              </div>

              {/* Publishing Checklist */}
              <div className="flex flex-col gap-4">
                <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-tech" />
                  Publishing Checklist
                </h3>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "제목 및 카테고리 설정", checked: !!title && !!category },
                    { label: "대표 이미지 업로드", checked: !!previewImage },
                    { label: "본문 내용 작성 (최소 200자)", checked: content.length > 200 },
                    { label: "SEO 메타데이터 최적화", checked: true },
                    { label: "Zippy 요약 생성 완료", checked: targetSite === "flow" || targetSite === "both" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${item.checked ? "bg-emerald-tech/20 border-emerald-tech/40 text-emerald-tech" : "bg-white/2 border-gray-200 text-gray-900/10"}`}>
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      <span className={`text-[11px] font-bold uppercase tracking-wide ${item.checked ? "text-gray-600" : "text-gray-400"}`}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview Toggle */}
              <div className="mt-auto bg-gray-50 rounded-3xl p-8 border border-gray-200">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">Preview Mode</h4>
                <div className="grid grid-cols-3 gap-3">
                  <button className="aspect-square bg-white/2 rounded-2xl flex items-center justify-center hover:bg-emerald-tech/10 group transition-all border border-gray-200 hover:border-emerald-tech/30">
                    <Monitor className="w-5 h-5 text-gray-400 group-hover:text-emerald-tech" />
                  </button>
                  <button className="aspect-square bg-white/2 rounded-2xl flex items-center justify-center hover:bg-emerald-tech/10 group transition-all border border-gray-200 hover:border-emerald-tech/30">
                    <Smartphone className="w-5 h-5 text-gray-400 group-hover:text-emerald-tech" />
                  </button>
                  <button className="aspect-square bg-white/2 rounded-2xl flex items-center justify-center hover:bg-emerald-tech/10 group transition-all border border-gray-200 hover:border-emerald-tech/30">
                    <Globe className="w-5 h-5 text-gray-400 group-hover:text-emerald-tech" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
