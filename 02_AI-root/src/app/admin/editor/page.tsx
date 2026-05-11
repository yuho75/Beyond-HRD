"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Save, Image as ImageIcon, ChevronLeft, Layout, Globe, Smartphone, Monitor, CheckCircle2 } from "lucide-react";
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
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex flex-col">
      {/* Top Header */}
      <header className="h-16 bg-[#111] border-b border-gray-800 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <a href="/admin" className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </a>
          <div className="h-6 w-[1px] bg-gray-800 mx-2"></div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">A-Zip Admin</span>
            <h1 className="text-sm font-bold text-white">통합 콘텐츠 에디터</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#1a1a1a] rounded-lg p-1 mr-4">
            <button 
              onClick={() => setTargetSite("flow")}
              className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${targetSite === "flow" ? "bg-[#f97316] text-white shadow-lg" : "text-gray-500 hover:text-gray-300"}`}
            >
              AI-flow
            </button>
            <button 
              onClick={() => setTargetSite("root")}
              className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${targetSite === "root" ? "bg-[#f97316] text-white shadow-lg" : "text-gray-500 hover:text-gray-300"}`}
            >
              AI-root
            </button>
            <button 
              onClick={() => setTargetSite("both")}
              className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${targetSite === "both" ? "bg-[#f97316] text-white shadow-lg" : "text-gray-500 hover:text-gray-300"}`}
            >
              Both
            </button>
          </div>
          
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2 bg-[#f97316] text-white text-xs font-bold rounded-lg hover:bg-[#ea580c] transition-all shadow-lg shadow-[#f97316]/20 disabled:opacity-50"
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? "저장 중..." : "게시하기"}
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Form Area */}
        <div className="flex-1 overflow-y-auto p-10 flex justify-center">
          <div className="w-full max-w-[900px] flex flex-col gap-8">
            
            {/* Title & Category Section */}
            <section className="bg-[#111] border border-gray-800 rounded-2xl p-8 flex flex-col gap-6 shadow-xl">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">콘텐츠 제목</label>
                <input 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목을 입력하세요..." 
                  className="bg-transparent text-2xl font-bold text-white placeholder:text-gray-700 border-none focus:ring-0 p-0"
                />
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-800/50">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">카테고리</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-gray-300 focus:border-[#f97316] outline-none transition-colors"
                  >
                    <option value="">카테고리 선택</option>
                    <option value="tech">Technology</option>
                    <option value="economy">Economy</option>
                    <option value="policy">Policy</option>
                    <option value="human">Humanism</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">발행 일시</label>
                  <input 
                    type="datetime-local" 
                    className="bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-gray-300 outline-none focus:border-[#f97316]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-4 border-t border-gray-800/50">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">한줄 요약 (Summary)</label>
                <textarea 
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="독자에게 노출될 짧은 요약 문구를 작성하세요..."
                  className="bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-300 min-h-[80px] focus:border-[#f97316] outline-none transition-colors resize-none"
                />
              </div>
            </section>

            {/* Rich Text Editor */}
            <section className="bg-[#111] border border-gray-800 rounded-2xl flex flex-col shadow-xl overflow-hidden min-h-[700px]">
              <div className="px-6 py-4 border-b border-gray-800 bg-[#161616] flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Main Content Body</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse"></div>
                  <span className="text-[10px] text-gray-500">Auto-saving...</span>
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
        <div className="w-[380px] bg-[#111] border-l border-gray-800 flex flex-col p-8 gap-10 overflow-y-auto">
          {/* Featured Image Upload */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[11px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#f97316]" />
              Featured Image
            </h3>
            <div 
              className="w-full aspect-video rounded-xl bg-[#1a1a1a] border-2 border-dashed border-gray-800 flex flex-col items-center justify-center gap-3 hover:border-[#f97316]/50 transition-colors cursor-pointer relative overflow-hidden group"
              onClick={() => document.getElementById('featured-image')?.click()}
            >
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <ImageIcon className="w-8 h-8 text-gray-700" />
                  <span className="text-[10px] text-gray-600 font-bold uppercase tracking-wider">Upload Thumbnail</span>
                </>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-[10px] text-white font-bold uppercase tracking-widest bg-black/60 px-4 py-2 rounded-full">Change Image</span>
              </div>
            </div>
            <input 
              id="featured-image" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageChange}
            />
            <p className="text-[9px] text-gray-500 leading-relaxed">
              * 권장 사이즈: 1600x900px<br />
              * 용량 제한: 5MB 이하 (JPG, PNG, WebP)
            </p>
          </div>

          {/* Publishing Checklist */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[11px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#f97316]" />
              Publishing Checklist
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { label: "제목 및 카테고리 설정", checked: !!title && !!category },
                { label: "대표 이미지 업로드", checked: !!previewImage },
                { label: "본문 내용 작성 (최소 200자)", checked: content.length > 200 },
                { label: "SEO 메타데이터 최적화", checked: true },
                { label: "Zippy 요약 생성 완료", checked: targetSite === "flow" || targetSite === "both" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${item.checked ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-500" : "bg-gray-800 border-gray-700 text-gray-600"}`}>
                    <CheckCircle2 className="w-2.5 h-2.5" />
                  </div>
                  <span className={`text-[11px] ${item.checked ? "text-gray-300" : "text-gray-500"}`}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preview Toggle */}
          <div className="mt-auto bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 text-center">Preview Mode</h4>
            <div className="grid grid-cols-3 gap-2">
              <button className="aspect-square bg-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors">
                <Monitor className="w-4 h-4 text-gray-500" />
              </button>
              <button className="aspect-square bg-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors">
                <Smartphone className="w-4 h-4 text-gray-500" />
              </button>
              <button className="aspect-square bg-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors">
                <Globe className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
