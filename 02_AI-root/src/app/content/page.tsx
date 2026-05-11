"use client";

import { 
  Search, 
  Terminal, 
  UserCircle, 
  Play, 
  ChevronRight, 
  Clock, 
  BookOpen, 
  Download, 
  Share2, 
  MessageSquare,
  Layout,
  Cpu,
  FileText,
  Settings
} from "lucide-react";

export default function ContentPage() {
  return (
    <div className="font-body-md text-inverse-on-surface min-h-screen bg-[#131313] flex flex-col">
      {/* Top Navigation */}
      <header className="h-16 flex items-center justify-between px-container-padding-editorial max-w-7xl mx-auto w-full border-b border-white/10 sticky top-0 bg-[#131313]/80 backdrop-blur-md z-50">
        <a href="/" className="flex-1 flex items-center gap-3 cursor-pointer group">
          <img src="/logo.png" alt="AI Root Logo" className="w-8 h-8 rounded group-hover:opacity-80 transition-opacity" />
          <span className="font-extrabold tracking-tight text-2xl text-emerald-tech" style={{ fontFamily: 'Inter, sans-serif' }}>AI-root</span>
        </a>
        
        <nav className="hidden lg:flex items-center gap-8">
          <a className="font-technical-sm text-surface-variant hover:text-emerald-tech transition-colors uppercase tracking-widest text-[11px]" href="/">Home</a>
          <a className="font-technical-sm text-surface-variant hover:text-emerald-tech transition-colors uppercase tracking-widest text-[11px]" href="#">AI 활용</a>
          <a className="font-technical-sm text-surface-variant hover:text-emerald-tech transition-colors uppercase tracking-widest text-[11px]" href="#">AI 창업</a>
          <a className="font-technical-sm text-emerald-tech border-b-2 border-emerald-tech pb-1 uppercase tracking-widest text-[11px]" href="#">Courses</a>
          <a className="font-technical-sm text-surface-variant hover:text-emerald-tech transition-colors uppercase tracking-widest text-[11px]" href="/mypage">My Page</a>
        </nav>
        
        <div className="flex-1 flex items-center justify-end gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-variant w-5 h-5" />
            <input 
              className="bg-white/5 border border-white/10 text-technical-sm py-2 pl-10 pr-4 w-64 focus:ring-1 focus:ring-emerald-tech focus:border-emerald-tech rounded-lg text-white" 
              placeholder="Search guide..." 
              type="text" 
            />
          </div>
          <button className="font-technical-sm uppercase tracking-wider px-4 py-2 bg-[#FF6B00] text-white rounded hover:bg-[#e65a00] transition-transform active:scale-95 cursor-pointer">
            로그인
          </button>
          <UserCircle className="text-surface-variant cursor-pointer hover:text-white w-6 h-6" />
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-white/10 hidden lg:flex flex-col p-6 gap-8 shrink-0">
          <div>
            <h3 className="font-technical-sm uppercase tracking-widest text-surface-variant mb-6 flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Navigation
            </h3>
            <div className="flex flex-col gap-1">
              {[
                { name: 'AI 도구 가이드', icon: <Cpu className="w-4 h-4" />, active: true },
                { name: '실전 프롬프트', icon: <Terminal className="w-4 h-4" /> },
                { name: '기술 문서', icon: <FileText className="w-4 h-4" /> },
                { name: '설정 가이드', icon: <Settings className="w-4 h-4" /> },
              ].map((item) => (
                <a 
                  key={item.name} 
                  href="#" 
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg font-technical-sm transition-all ${
                    item.active 
                      ? 'bg-emerald-tech/10 text-emerald-tech border border-emerald-tech/20' 
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-technical-sm uppercase tracking-widest text-surface-variant mb-6">Course Modules</h3>
            <div className="flex flex-col gap-4">
              {[
                { title: 'Intro to GenAI', duration: '12:40', completed: true },
                { title: 'Advanced RAG Systems', duration: '45:20', active: true },
                { title: 'Vector DB Selection', duration: '22:15' },
                { title: 'Deployment Patterns', duration: '38:50' },
              ].map((mod, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className={`flex items-center justify-between text-xs mb-1 ${mod.active ? 'text-emerald-tech' : 'text-white/40'}`}>
                    <span className="font-technical-sm uppercase tracking-tighter">Module 0{i+1}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {mod.duration}</span>
                  </div>
                  <div className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    mod.active 
                      ? 'bg-white/10 border-emerald-tech/50 text-white' 
                      : 'bg-white/5 border-white/5 text-white/60 hover:border-white/20'
                  }`}>
                    <p className="font-body-md text-sm">{mod.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 flex flex-col p-6 md:p-10 min-w-0">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[11px] font-technical-sm uppercase tracking-widest text-white/40 mb-8">
            <a href="/" className="hover:text-emerald-tech transition-colors">Archive</a>
            <ChevronRight className="w-3 h-3" />
            <a href="#" className="hover:text-emerald-tech transition-colors">Courses</a>
            <ChevronRight className="w-3 h-3" />
            <span className="text-emerald-tech">Advanced RAG Systems</span>
          </nav>

          {/* Title Section */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-emerald-tech/10 text-emerald-tech text-[10px] px-2 py-0.5 font-technical-sm uppercase border border-emerald-tech/20 rounded">Intermediate</span>
              <span className="text-white/40 text-[10px] font-technical-sm uppercase tracking-widest flex items-center gap-1">
                <Clock className="w-3 h-3" /> Updated 2 days ago
              </span>
            </div>
            <h1 className="font-display-xl text-4xl md:text-5xl text-surface-bright mb-4 leading-tight">
              Advanced RAG Systems: <br />
              <span className="text-emerald-tech">Scaling Retrieval for Agents</span>
            </h1>
            <p className="font-body-lg text-surface-variant max-w-3xl">
              Learn how to implement high-performance Retrieval-Augmented Generation using advanced indexing strategies, 
              hybrid search, and multi-agent coordination frameworks.
            </p>
          </div>

          {/* Video Player Section */}
          <div className="w-full aspect-video bg-black/40 rounded-2xl border border-white/10 overflow-hidden relative group mb-12">
            {/* Thumbnail / Gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-tech/20 via-transparent to-blue-500/10 opacity-50"></div>
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 bg-emerald-tech rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform cursor-pointer">
                <Play className="text-black fill-black w-8 h-8 ml-1" />
              </button>
            </div>

            {/* Video Controls Bar (Placeholder) */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-4">
                <Play className="w-5 h-5 text-white" />
                <div className="w-64 h-1 bg-white/20 rounded-full relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-emerald-tech rounded-full"></div>
                </div>
                <span className="text-[10px] text-white/60 font-technical-sm">15:20 / 45:20</span>
              </div>
              <div className="flex items-center gap-4">
                <Settings className="w-4 h-4 text-white/60" />
                <div className="w-8 h-4 bg-white/10 rounded-full border border-white/10"></div>
              </div>
            </div>
          </div>

          {/* Detailed Content Tabs/Sections */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
            <div className="xl:col-span-2 flex flex-col gap-10">
              <section>
                <h2 className="font-headline-md text-2xl text-surface-bright mb-6 flex items-center gap-3">
                  <BookOpen className="text-emerald-tech w-6 h-6" />
                  Overview & Key Concepts
                </h2>
                <div className="space-y-4 text-surface-variant font-body-md leading-relaxed">
                  <p>
                    Retrieval-Augmented Generation (RAG) has evolved beyond simple vector search. To build production-ready 
                    AI agents, we must solve for data freshness, retrieval accuracy, and context window optimization.
                  </p>
                  <p>
                    In this module, we explore the <span className="text-emerald-tech font-bold">Hybrid Search</span> approach, 
                    combining BM25 keyword matching with dense vector embeddings to ensure the highest relevance.
                  </p>
                </div>
              </section>

              <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="font-technical-sm uppercase tracking-widest text-emerald-tech mb-6">Technical Checklist</h3>
                <ul className="space-y-4">
                  {[
                    'Configure Vector Database (Pinecone/Milvus)',
                    'Implement Recursive Character Text Splitting',
                    'Setup Cohere Re-ranker for post-retrieval',
                    'Test with Multi-query Retriever',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-5 h-5 rounded border border-emerald-tech/50 flex items-center justify-center mt-0.5">
                        <div className="w-2.5 h-2.5 bg-emerald-tech rounded-sm"></div>
                      </div>
                      <span className="text-white/80 font-body-md text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Right Sidebar Assets */}
            <div className="flex flex-col gap-8">
              <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6">
                <h3 className="font-technical-sm uppercase tracking-widest text-surface-variant mb-6">Resources</h3>
                <div className="flex flex-col gap-3">
                  <button className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-emerald-tech/30 transition-all group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-emerald-tech" />
                      <div className="text-left">
                        <p className="text-white text-sm font-body-md">Lecture Notes.pdf</p>
                        <p className="text-white/40 text-[10px] font-technical-sm">2.4 MB</p>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-white/40 group-hover:text-emerald-tech" />
                  </button>
                  <button className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-emerald-tech/30 transition-all group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Terminal className="w-5 h-5 text-blue-400" />
                      <div className="text-left">
                        <p className="text-white text-sm font-body-md">Source Code (GitHub)</p>
                        <p className="text-white/40 text-[10px] font-technical-sm">Git Repository</p>
                      </div>
                    </div>
                    <Share2 className="w-4 h-4 text-white/40 group-hover:text-blue-400" />
                  </button>
                </div>
              </div>

              <div className="bg-emerald-tech/5 border border-emerald-tech/10 rounded-2xl p-6">
                <h3 className="font-technical-sm uppercase tracking-widest text-emerald-tech mb-4">Questions?</h3>
                <p className="text-white/60 text-sm font-body-md mb-6">
                  Join our technical community to discuss this module with other engineers.
                </p>
                <button className="w-full py-3 bg-emerald-tech text-black rounded-lg font-technical-sm uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-emerald-400 transition-colors cursor-pointer">
                  <MessageSquare className="w-4 h-4" />
                  Ask Community
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 px-container-padding-editorial flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10 bg-inverse-surface mt-auto">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-headline-md font-bold text-surface-bright">AI ROOT</span>
          <p className="font-body-md text-surface-variant text-[12px] opacity-60">© 2024 The Rundown AI, Inc. All rights reserved.</p>
        </div>
        <div className="flex gap-8">
          <a className="font-body-md text-surface-variant hover:text-emerald-tech transition-colors text-sm" href="#">Privacy Policy</a>
          <a className="font-body-md text-surface-variant hover:text-emerald-tech transition-colors text-sm" href="#">Terms & Conditions</a>
        </div>
      </footer>
    </div>
  );
}
