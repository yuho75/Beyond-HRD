"use client";

import { Search, Grid, List, Terminal, UserCircle, Bookmark, Lock, Globe } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [bookmarks, setBookmarks] = useState<number[]>([0, 2]);

  const toggleBookmark = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  return (
    <div className="font-body-md text-inverse-on-surface min-h-screen bg-[#131313] flex flex-col text-white">
      {/* Top Navigation */}
      <header className="h-16 flex items-center justify-between px-8 max-w-7xl mx-auto w-full border-b border-white/10 sticky top-0 bg-[#131313]/80 backdrop-blur-md z-30">
        <a href="/" className="flex-1 flex items-center gap-3 cursor-pointer group text-decoration-none">
          <div className="w-8 h-8 rounded bg-emerald-tech flex items-center justify-center font-bold text-black">R</div>
          <span className="font-extrabold tracking-tight text-2xl text-emerald-tech" style={{ fontFamily: 'Inter, sans-serif' }}>AI-root</span>
        </a>
        
        <nav className="hidden lg:flex items-center gap-8">
          <a className="font-technical-sm text-white/40 hover:text-emerald-tech transition-colors uppercase tracking-widest text-[11px] no-underline" href="#">AI 활용</a>
          <a className="font-technical-sm text-white/40 hover:text-emerald-tech transition-colors uppercase tracking-widest text-[11px] no-underline" href="#">AI 창업</a>
          <a className="font-technical-sm text-white/40 hover:text-emerald-tech transition-colors uppercase tracking-widest text-[11px] no-underline" href="/content">Content</a>
          <a className="font-technical-sm text-white/40 hover:text-emerald-tech transition-colors uppercase tracking-widest text-[11px] no-underline" href="/mypage">My Page</a>
          <a className="font-technical-sm text-white/40 hover:text-emerald-tech transition-colors uppercase tracking-widest text-[11px] no-underline" href="/admin">Admin</a>
        </nav>
        
        <div className="flex-1 flex items-center justify-end gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
            <input 
              className="bg-white/5 border border-white/10 text-technical-sm py-2 pl-10 pr-4 w-64 focus:ring-1 focus:ring-emerald-tech focus:border-emerald-tech rounded-lg text-white" 
              placeholder="Search archive..." 
              type="text" 
            />
          </div>
          <button className="font-technical-sm uppercase tracking-wider px-4 py-2 bg-[#FF6B00] text-white rounded hover:bg-[#e65a00] transition-transform active:scale-95 cursor-pointer border-none font-bold">
            로그인
          </button>
          <UserCircle className="text-white/40 cursor-pointer hover:text-white w-6 h-6" />
        </div>
      </header>

      {/* Main Content */}
      <main className="px-8 py-12 max-w-7xl mx-auto w-full flex-grow flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Technical Archive</h1>
            <p className="text-white/60 max-w-2xl text-lg leading-relaxed">
              High-density documentation and roadmaps for deep-tech AI integration. Curated by the technical team for rapid enterprise scaling.
            </p>
          </div>
          <div className="hidden sm:block text-right">
            <span className="font-technical-sm uppercase text-emerald-tech tracking-widest block mb-2 text-xs">System Status: Online</span>
            <div className="flex items-center gap-2 justify-end">
              <span className="h-2 w-2 rounded-full bg-emerald-tech animate-pulse"></span>
              <span className="font-technical-sm text-white text-xs font-bold">All Systems Nominal</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mt-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-10">
            <div>
              <h3 className="font-technical-sm uppercase tracking-widest text-white/20 mb-6 text-[10px] font-bold">Categories</h3>
              <div className="flex flex-col gap-4">
                {['All Topics', 'Business Operations', 'Coding & Engineering', 'Data Analysis', 'Marketing & Sales'].map((cat, i) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      defaultChecked={i === 0}
                      className="accent-emerald-tech h-4 w-4 rounded border-white/10 bg-white/5" 
                    />
                    <span className={`text-sm transition-colors ${i === 0 ? 'text-white font-bold' : 'text-white/40'} group-hover:text-emerald-tech`}>
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-technical-sm uppercase tracking-widest text-white/20 mb-6 text-[10px] font-bold">Skill Level</h3>
              <div className="flex flex-col gap-4">
                {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                  <label key={level} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="accent-emerald-tech h-4 w-4 rounded border-white/10 bg-white/5" />
                    <span className="text-sm text-white/40 group-hover:text-emerald-tech transition-colors">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <h4 className="text-xs font-bold text-white mb-2">PRO 멤버십 전용</h4>
              <p className="text-[11px] text-white/40 leading-relaxed mb-4">모든 유료 가이드와 시크릿 로드맵을 확인하시려면 멤버십을 업그레이드하세요.</p>
              <button className="w-full py-2 bg-emerald-tech text-black text-[10px] font-bold rounded-lg uppercase tracking-wider hover:bg-emerald-tech/80 transition-colors">Upgrade Now</button>
            </div>
          </aside>

          {/* Grid Content */}
          <div className="flex-grow flex flex-col gap-16 min-w-0">
            {/* Featured Guides */}
            <section>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
                <h2 className="text-xl font-bold text-white uppercase tracking-widest flex items-center gap-3">
                  <div className="w-1 h-6 bg-emerald-tech"></div>
                  Featured Guides
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Featured Card 1 */}
                <a href="/content" className="group cursor-pointer bg-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden hover:border-emerald-tech/30 transition-all flex flex-col shadow-2xl relative no-underline">
                  <div className="h-56 relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60" alt="LLM" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent opacity-60"></div>
                    <div className="absolute top-4 left-4 flex gap-2">
                       <div className="bg-emerald-tech/20 text-emerald-tech text-[10px] px-2 py-0.5 font-bold uppercase border border-emerald-tech/30 rounded backdrop-blur-md">Advanced</div>
                       <div className="bg-purple-500 text-white text-[10px] px-2 py-0.5 font-bold uppercase rounded shadow-lg flex items-center gap-1">
                         <Lock className="w-3 h-3" /> PAID
                       </div>
                    </div>
                    <button 
                      onClick={(e) => toggleBookmark(101, e)}
                      className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md border border-white/10 transition-all ${bookmarks.includes(101) ? 'bg-emerald-tech text-black border-emerald-tech shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-black/40 text-white hover:bg-black/60'}`}
                    >
                      <Bookmark className="w-4 h-4" fill={bookmarks.includes(101) ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-tech transition-colors leading-tight">Large Language Model Optimization</h3>
                    <p className="text-white/40 mb-8 flex-grow text-sm leading-relaxed line-clamp-3">Deploying fine-tuned models for enterprise infrastructure. Learn the end-to-end pipeline for model quantization, optimization, and scaling.</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-tech/20 flex items-center justify-center text-[10px] text-emerald-tech font-bold">R</div>
                        <span className="text-xs text-white/60 font-bold">Rowan Cheung</span>
                      </div>
                      <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest font-technical-sm">Nov 2024</span>
                    </div>
                  </div>
                </a>

                {/* Featured Card 2 */}
                <div className="group cursor-pointer bg-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden hover:border-emerald-tech/30 transition-all flex flex-col shadow-2xl relative no-underline">
                  <div className="h-56 relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1620712943543-bcc4628c9757?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60" alt="Vector DB" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent opacity-60"></div>
                    <div className="absolute top-4 left-4 flex gap-2">
                       <div className="bg-blue-500/20 text-blue-400 text-[10px] px-2 py-0.5 font-bold uppercase border border-blue-500/30 rounded backdrop-blur-md">Intermediate</div>
                       <div className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 font-bold uppercase rounded shadow-lg flex items-center gap-1">
                         <Globe className="w-3 h-3" /> FREE
                       </div>
                    </div>
                    <button 
                      onClick={(e) => toggleBookmark(102, e)}
                      className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md border border-white/10 transition-all ${bookmarks.includes(102) ? 'bg-emerald-tech text-black border-emerald-tech shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-black/40 text-white hover:bg-black/60'}`}
                    >
                      <Bookmark className="w-4 h-4" fill={bookmarks.includes(102) ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-tech transition-colors leading-tight">Vector Database Scaling Strategies</h3>
                    <p className="text-white/40 mb-8 flex-grow text-sm leading-relaxed line-clamp-3">High-performance retrieval for multi-agent systems and large scale RAG implementations. Understanding Pinecone, Milvus and Weaviate.</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] text-blue-400 font-bold">Z</div>
                        <span className="text-xs text-white/60 font-bold">Zippy AI</span>
                      </div>
                      <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest font-technical-sm">Oct 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* All Guides */}
            <section>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
                <h2 className="text-xl font-bold text-white uppercase tracking-widest flex items-center gap-3">
                   <div className="w-1 h-6 bg-emerald-tech"></div>
                   All Guides
                </h2>
                <div className="hidden sm:flex gap-4">
                  <Grid className="text-emerald-tech cursor-pointer w-5 h-5" />
                  <List className="text-white/20 cursor-pointer hover:text-emerald-tech w-5 h-5" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {[
                  { id: 0, title: "Prompt Injection & Security Audits", tag: "Security", color: "text-red-400", border: "border-red-500/20", bg: "bg-red-500/10", author: "Security Team", status: 'PRO', thumb: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" },
                  { id: 1, title: "Custom GPU Kernel Development", tag: "Advanced", color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/10", author: "Hardware Ops", status: 'PAID', thumb: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" },
                  { id: 2, title: "Intro to API Integration", tag: "Beginner", color: "text-white/60", border: "border-white/20", bg: "bg-white/10", author: "Rowan Cheung", status: 'FREE', thumb: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800" },
                  { id: 3, title: "Automating Content with GPT-4o", tag: "Creative", color: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/10", author: "Zippy AI", status: 'FREE', thumb: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800" },
                  { id: 4, title: "AI-Driven Market Analysis", tag: "Business", color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/10", author: "Rowan Cheung", status: 'PAID', thumb: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
                  { id: 5, title: "Ethics in Generative AI", tag: "Humanism", color: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/10", author: "A-Zip Ethics", status: 'FREE', thumb: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800" }
                ].map((item, i) => (
                  <div key={i} className="group cursor-pointer bg-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden hover:bg-white/[0.04] hover:border-emerald-tech/30 transition-all flex flex-col relative no-underline">
                    <div className="h-40 relative overflow-hidden bg-white/5">
                      <img src={item.thumb} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-50" alt={item.title} />
                      <div className={`absolute top-3 left-3 ${item.bg} ${item.color} text-[9px] px-2 py-0.5 font-bold uppercase border ${item.border} rounded backdrop-blur-md`}>
                        {item.tag}
                      </div>
                      <button 
                        onClick={(e) => toggleBookmark(item.id, e)}
                        className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md border border-white/10 transition-all ${bookmarks.includes(item.id) ? 'bg-emerald-tech text-black border-emerald-tech' : 'bg-black/40 text-white hover:bg-black/60'}`}
                      >
                        <Bookmark className="w-3.5 h-3.5" fill={bookmarks.includes(item.id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-base font-bold text-white group-hover:text-emerald-tech transition-colors line-clamp-2 leading-tight flex-1 mr-4">{item.title}</h4>
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${
                          item.status === 'FREE' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
                          item.status === 'PAID' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 
                          'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                        }`}>{item.status}</span>
                      </div>
                      <p className="text-white/30 text-xs mb-6 line-clamp-2 leading-relaxed">Detailed technical breakdown and step-by-step implementation guide.</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-[10px] font-bold text-white/60">{item.author}</span>
                        <span className="text-[9px] text-white/20 uppercase font-technical-sm tracking-widest">SEP 2024</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-16 flex justify-center border-t border-white/5 pt-12">
                <button className="px-10 py-4 border border-white/10 rounded-xl font-bold uppercase tracking-widest text-white/40 hover:text-emerald-tech hover:border-emerald-tech transition-all cursor-pointer bg-white/2">
                  더보기 (Load More)
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 bg-[#0d0d0d] mt-24">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-emerald-tech flex items-center justify-center font-bold text-black text-xs">R</div>
            <span className="font-bold text-white tracking-widest">AI ROOT</span>
          </div>
          <p className="text-white/20 text-[11px] font-technical-sm">© 2024 The Rundown AI, Inc. High-Density Technical Archive.</p>
        </div>
        <div className="flex gap-10">
          <a className="text-white/40 hover:text-emerald-tech transition-colors text-xs uppercase tracking-widest font-bold no-underline" href="#">Privacy Policy</a>
          <a className="text-white/40 hover:text-emerald-tech transition-colors text-xs uppercase tracking-widest font-bold no-underline" href="#">Terms & Conditions</a>
        </div>
      </footer>

      {/* Floating UI Helper */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="bg-emerald-tech w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer hover:scale-110 transition-transform group">
          <Terminal className="text-black w-6 h-6" />
          <div className="absolute right-16 bg-white p-3 rounded-xl shadow-2xl hidden group-hover:block animate-in fade-in slide-in-from-right-4">
            <p className="text-black font-bold uppercase text-[10px] tracking-widest">Launch Debug Console</p>
          </div>
        </div>
      </div>
    </div>
  );
}
