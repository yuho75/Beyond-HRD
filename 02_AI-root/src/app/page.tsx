"use client";

import { Search, Grid, List, Terminal, UserCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="font-body-md text-inverse-on-surface min-h-screen bg-[#131313] flex flex-col">
      {/* Top Navigation */}
      <header className="h-16 flex items-center justify-between px-container-padding-editorial max-w-7xl mx-auto w-full border-b border-white/10 sticky top-0 bg-[#131313]/80 backdrop-blur-md z-30">
        <a href="/" className="flex-1 flex items-center gap-3 cursor-pointer group">
          <img src="/logo.png" alt="AI Root Logo" className="w-8 h-8 rounded group-hover:opacity-80 transition-opacity" />
          <span className="font-extrabold tracking-tight text-2xl text-emerald-tech" style={{ fontFamily: 'Inter, sans-serif' }}>AI-root</span>
        </a>
        
        <nav className="hidden lg:flex items-center gap-8">
          <a className="font-technical-sm text-surface-variant hover:text-emerald-tech transition-colors uppercase tracking-widest text-[11px]" href="#">AI 활용</a>
          <a className="font-technical-sm text-surface-variant hover:text-emerald-tech transition-colors uppercase tracking-widest text-[11px]" href="#">AI 창업</a>
          <a className="font-technical-sm text-surface-variant hover:text-emerald-tech transition-colors uppercase tracking-widest text-[11px]" href="/content">Content</a>
          <a className="font-technical-sm text-surface-variant hover:text-emerald-tech transition-colors uppercase tracking-widest text-[11px]" href="/mypage">My Page</a>
          <a className="font-technical-sm text-surface-variant hover:text-emerald-tech transition-colors uppercase tracking-widest text-[11px]" href="/admin">Admin</a>
        </nav>
        
        <div className="flex-1 flex items-center justify-end gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-variant w-5 h-5" />
            <input 
              className="bg-white/5 border border-white/10 text-technical-sm py-2 pl-10 pr-4 w-64 focus:ring-1 focus:ring-emerald-tech focus:border-emerald-tech rounded-lg text-white" 
              placeholder="Search archive..." 
              type="text" 
            />
          </div>
          <button className="font-technical-sm uppercase tracking-wider px-4 py-2 bg-[#FF6B00] text-white rounded hover:bg-[#e65a00] transition-transform active:scale-95 cursor-pointer">
            로그인
          </button>
          <UserCircle className="text-surface-variant cursor-pointer hover:text-white w-6 h-6" />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-container-padding-editorial max-w-7xl mx-auto w-full flex-grow flex flex-col gap-stack-lg">
        {/* Header */}
        <div className="flex items-end justify-between mt-8">
          <div>
            <h1 className="font-display-xl text-4xl md:text-5xl text-surface-bright mb-2">Technical Archive</h1>
            <p className="font-body-lg text-surface-variant max-w-2xl">
              High-density documentation and roadmaps for deep-tech AI integration. Curated by the technical team.
            </p>
          </div>
          <div className="hidden sm:block text-right">
            <span className="font-technical-sm uppercase text-emerald-tech tracking-widest block mb-1">Status: Online</span>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-tech animate-pulse"></span>
              <span className="font-technical-sm text-surface-bright">All Systems Nominal</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mt-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-8">
            <div>
              <h3 className="font-technical-sm uppercase tracking-widest text-surface-variant mb-4">Categories</h3>
              <div className="flex flex-col gap-3">
                {['All Topics', 'Business Operations', 'Coding & Engineering', 'Data Analysis', 'Marketing & Sales'].map((cat, i) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      defaultChecked={i === 0}
                      className="form-checkbox bg-transparent border-white/20 text-emerald-tech rounded focus:ring-emerald-tech/50 h-4 w-4" 
                    />
                    <span className={`font-technical-sm transition-colors ${i === 0 ? 'text-surface-bright' : 'text-white/60'} group-hover:text-emerald-tech`}>
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-technical-sm uppercase tracking-widest text-surface-variant mb-4">Skill Level</h3>
              <div className="flex flex-col gap-3">
                {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                  <label key={level} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="form-checkbox bg-transparent border-white/20 text-emerald-tech rounded focus:ring-emerald-tech/50 h-4 w-4" />
                    <span className="font-technical-sm text-white/60 group-hover:text-emerald-tech transition-colors">{level}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Grid Content */}
          <div className="flex-grow flex flex-col gap-stack-lg min-w-0">
            {/* Featured Guides */}
            <section className="mb-12">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <h2 className="font-headline-md text-surface-bright text-xl">Featured Guides</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a href="/content" className="group cursor-pointer bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-emerald-tech/50 transition-all flex flex-col">
                  <div className="h-48 bg-gradient-to-br from-emerald-tech/20 to-[#131313] border-b border-white/10 relative">
                    <div className="absolute top-4 left-4 bg-emerald-tech/10 text-emerald-tech text-[10px] px-2 py-0.5 font-technical-sm uppercase border border-emerald-tech/20 rounded">Advanced</div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-headline-md text-surface-bright mb-2 group-hover:text-emerald-tech transition-colors text-lg">Large Language Model Optimization</h3>
                    <p className="font-body-md text-surface-variant mb-6 flex-grow text-sm">Deploying fine-tuned models for enterprise infrastructure. Learn the end-to-end pipeline for model optimization.</p>
                    <div className="flex items-center gap-3 mt-auto">
                      <span className="font-technical-sm text-surface-bright text-xs">Rowan Cheung</span>
                    </div>
                  </div>
                </a>

                <div className="group cursor-pointer bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-emerald-tech/50 transition-all flex flex-col">
                  <div className="h-48 bg-gradient-to-br from-blue-500/20 to-[#131313] border-b border-white/10 relative">
                    <div className="absolute top-4 left-4 bg-blue-500/10 text-blue-400 text-[10px] px-2 py-0.5 font-technical-sm uppercase border border-blue-500/20 rounded">Intermediate</div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-headline-md text-surface-bright mb-2 group-hover:text-emerald-tech transition-colors text-lg">Vector Database Scaling Strategies</h3>
                    <p className="font-body-md text-surface-variant mb-6 flex-grow text-sm">High-performance retrieval for multi-agent systems and large scale RAG implementations.</p>
                    <div className="flex items-center gap-3 mt-auto">
                      <span className="font-technical-sm text-surface-bright text-xs">Zippy AI</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* All Guides */}
            <section>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <h2 className="font-headline-md text-surface-bright text-xl">All Guides</h2>
                <div className="hidden sm:flex gap-4">
                  <Grid className="text-emerald-tech cursor-pointer w-5 h-5" />
                  <List className="text-surface-variant cursor-pointer hover:text-emerald-tech w-5 h-5" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[
                  { title: "Prompt Injection & Security Audits", tag: "Security", color: "text-red-400", border: "border-red-500/20", bg: "bg-red-500/10", author: "Security Team" },
                  { title: "Custom GPU Kernel Development", tag: "Advanced", color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/10", author: "Hardware Ops" },
                  { title: "Intro to API Integration", tag: "Beginner", color: "text-white/60", border: "border-white/20", bg: "bg-white/10", author: "Rowan Cheung" }
                ].map((item, i) => (
                  <div key={i} className="group cursor-pointer bg-white/5 border border-white/5 rounded-xl overflow-hidden hover:bg-white/[0.08] hover:border-emerald-tech/30 transition-all flex flex-col">
                    <div className="h-32 bg-white/5 relative">
                      <div className={`absolute top-3 left-3 ${item.bg} ${item.color} text-[10px] px-2 py-0.5 font-technical-sm uppercase border ${item.border} rounded`}>
                        {item.tag}
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h4 className="font-headline-md text-[18px] leading-snug text-surface-bright mb-2 group-hover:text-emerald-tech transition-colors">{item.title}</h4>
                      <p className="font-technical-sm text-white/40 mb-4 line-clamp-2">Detailed implementation guide and technical roadmap.</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-technical-sm text-[11px] text-surface-bright">{item.author}</span>
                        <span className="font-technical-sm text-[10px] text-white/30">SEP 2024</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 flex justify-center border-t border-white/10 pt-8">
                <button className="px-8 py-3 border border-white/10 rounded-lg font-technical-sm uppercase tracking-widest text-white/60 hover:text-white hover:border-white transition-all cursor-pointer">
                  더보기
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-container-padding-editorial flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10 bg-inverse-surface mt-12">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-headline-md font-bold text-surface-bright">AI ROOT</span>
          <p className="font-body-md text-surface-variant text-[12px] opacity-60">© 2024 The Rundown AI, Inc. All rights reserved.</p>
        </div>
        <div className="flex gap-8">
          <a className="font-body-md text-surface-variant hover:text-emerald-tech transition-colors text-sm" href="#">Privacy Policy</a>
          <a className="font-body-md text-surface-variant hover:text-emerald-tech transition-colors text-sm" href="#">Terms &amp; Conditions</a>
        </div>
      </footer>

      {/* Floating UI Helper */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="bg-emerald-tech w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform group">
          <Terminal className="text-black w-6 h-6" />
          <div className="absolute right-16 bg-white p-2 rounded shadow-lg hidden group-hover:block whitespace-nowrap">
            <p className="text-black font-technical-sm uppercase text-[10px]">Launch Console</p>
          </div>
        </div>
      </div>
    </div>
  );
}
