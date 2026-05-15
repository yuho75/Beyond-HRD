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
        <a href="/" className="flex-none flex items-center gap-3 cursor-pointer group text-decoration-none">
          <div className="w-8 h-8 rounded bg-emerald-tech flex items-center justify-center font-bold text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]">R</div>
          <span className="font-extrabold tracking-tight text-xl text-emerald-tech" style={{ fontFamily: 'Inter, sans-serif' }}>AI-root</span>
        </a>
        
        <nav className="hidden lg:flex flex-1 justify-center items-center gap-8 px-4">
          {/* Categories */}
          <div className="flex items-center gap-8">
            <a className="font-technical-sm text-white/70 hover:text-emerald-tech transition-colors uppercase tracking-widest text-[11px] no-underline font-bold whitespace-nowrap" href="#">Commerce</a>
            <a className="font-technical-sm text-white/70 hover:text-emerald-tech transition-colors uppercase tracking-widest text-[11px] no-underline font-bold whitespace-nowrap" href="#">Education</a>
            <a className="font-technical-sm text-white/70 hover:text-emerald-tech transition-colors uppercase tracking-widest text-[11px] no-underline font-bold whitespace-nowrap" href="#">Media</a>
            <a className="font-technical-sm text-white/70 hover:text-emerald-tech transition-colors uppercase tracking-widest text-[11px] no-underline font-bold whitespace-nowrap" href="#">Lifestyle</a>
            <a className="font-technical-sm text-white/70 hover:text-emerald-tech transition-colors uppercase tracking-widest text-[11px] no-underline font-bold whitespace-nowrap" href="#">Business</a>
          </div>
          
          {/* Vertical Separator */}
          <div className="w-[1px] h-3 bg-white/10 mx-2"></div>

          {/* System Menus */}
          <div className="flex items-center gap-6">
            <a className="font-technical-sm text-white/20 hover:text-white transition-colors uppercase tracking-widest text-[10px] no-underline" href="/mypage">My Page</a>
            <a className="font-technical-sm text-white/20 hover:text-white transition-colors uppercase tracking-widest text-[10px] no-underline" href="/admin">Admin</a>
          </div>
        </nav>
        
        <div className="flex-none flex items-center justify-end gap-4">
          <div className="relative hidden xl:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
            <input 
              className="bg-white/5 border border-white/10 text-[11px] py-1.5 pl-9 pr-4 w-48 focus:ring-1 focus:ring-emerald-tech/50 focus:border-emerald-tech/50 rounded-md text-white transition-all focus:w-56" 
              placeholder="Search archive..." 
              type="text" 
            />
          </div>
          <button className="font-technical-sm uppercase tracking-widest px-4 py-2 bg-[#FF6B00] text-white rounded text-[10px] hover:bg-[#e65a00] transition-all active:scale-95 cursor-pointer border-none font-bold shadow-lg shadow-orange-900/20 whitespace-nowrap">
            로그인
          </button>
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

        <div className="flex flex-col gap-16 mt-8">
          {/* Grid Content */}
          <div className="flex flex-col gap-16 min-w-0">
            {/* Featured Guide (Large Card) */}
            <section>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
                <h2 className="text-[13px] font-bold text-white uppercase tracking-[0.2em] flex items-center gap-3">
                  <div className="w-1 h-4 bg-emerald-tech"></div>
                  Featured Guide
                </h2>
              </div>
              
              <a href="/content" className="relative z-10 block bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row gap-10 items-center hover:border-emerald-tech/30 transition-all group cursor-pointer no-underline">
                <div className="w-full md:w-1/2 aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden bg-gray-900 relative">
                  <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600" alt="Hero AI" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-tech/20 to-transparent mix-blend-overlay"></div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="bg-emerald-tech/20 text-emerald-tech text-[10px] px-2 py-0.5 font-bold uppercase border border-emerald-tech/30 rounded backdrop-blur-md">Advanced</div>
                    <div className="bg-purple-500 text-white text-[10px] px-2 py-0.5 font-bold uppercase rounded shadow-lg flex items-center gap-1">
                      <Lock className="w-3 h-3" /> PAID
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center py-6 pr-6">
                  <span className="inline-block px-3 py-1 bg-white/5 text-white/40 text-[10px] font-bold uppercase tracking-widest rounded-full self-start mb-4 border border-white/10">
                    Featured Report
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white mb-6 group-hover:text-emerald-tech transition-colors">
                    Large Language Model<br />Optimization for Enterprise
                  </h2>
                  <p className="text-lg text-white/40 mb-10 leading-relaxed max-w-md">
                    Deploying fine-tuned models for enterprise infrastructure. Learn the end-to-end pipeline for model quantization, optimization, and scaling.
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-tech/20 flex items-center justify-center text-emerald-tech font-bold">R</div>
                      <div>
                        <p className="font-bold text-sm text-white">Rowan Cheung</p>
                        <p className="text-xs text-white/40">Nov 24, 2024</p>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => toggleBookmark(101, e)}
                      className={`p-3 rounded-full backdrop-blur-md border border-white/10 transition-all ${bookmarks.includes(101) ? 'bg-emerald-tech text-black border-emerald-tech shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-black/40 text-white hover:bg-black/60'}`}
                    >
                      <Bookmark className="w-5 h-5" fill={bookmarks.includes(101) ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>
              </a>
            </section>

            {/* Category Sections */}
            {[
              { 
                name: "Commerce", 
                items: [
                  { id: 201, title: "AI 기반 초개인화 쇼핑 추천 시스템 구축", tag: "E-Commerce", color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/10", author: "Commerce Lab", status: 'PAID', thumb: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800" },
                  { id: 202, title: "재고 최적화를 위한 수요 예측 머신러닝", tag: "Logistics", color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/10", author: "Ops Team", status: 'PRO', thumb: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800" },
                  { id: 203, title: "가상 피팅룸: 생성형 AI와 패션 비즈니스", tag: "Fashion", color: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/10", author: "AI Design", status: 'FREE', thumb: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800" },
                  { id: 204, title: "무인 결제 시스템의 컴퓨터 비전 기술", tag: "Retail", color: "text-red-400", border: "border-red-500/20", bg: "bg-red-500/10", author: "Vision AI", status: 'PAID', thumb: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800" },
                ]
              },
              { 
                name: "Education", 
                items: [
                  { id: 301, title: "개인별 맞춤형 학습 경로 설계 AI", tag: "EdTech", color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/10", author: "Edu Tech", status: 'FREE', thumb: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800" },
                  { id: 302, title: "자동 채점 및 피드백 시스템의 한계", tag: "Automation", color: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/10", author: "Prof. Lee", status: 'PAID', thumb: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=800" },
                  { id: 303, title: "언어 학습을 위한 실시간 AI 튜터링", tag: "Language", color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/10", author: "Global Edu", status: 'PRO', thumb: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800" },
                  { id: 304, title: "교실 내 AI 도입 가이드라인", tag: "Policy", color: "text-red-400", border: "border-red-500/20", bg: "bg-red-500/10", author: "Gov AI", status: 'FREE', thumb: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800" },
                ]
              },
              { 
                name: "Media", 
                items: [
                  { id: 401, title: "영상 편집 자동화를 위한 AI 워크플로우", tag: "Production", color: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/10", author: "Studio X", status: 'PRO', thumb: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800" },
                  { id: 402, title: "가상 인플루언서 제작과 마케팅 전략", tag: "Influencer", color: "text-pink-400", border: "border-pink-500/20", bg: "bg-pink-500/10", author: "Social Lab", status: 'PAID', thumb: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800" },
                  { id: 403, title: "뉴스 요약 및 자동 기사 작성 AI", tag: "Journalism", color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/10", author: "News Tech", status: 'FREE', thumb: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800" },
                  { id: 404, title: "음원 생성 AI: 저작권과 비즈니스 기회", tag: "Audio", color: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/10", author: "Music AI", status: 'PAID', thumb: "https://images.unsplash.com/photo-1514525253344-9914f2553a1c?auto=format&fit=crop&q=80&w=800" },
                ]
              },
              { 
                name: "Lifestyle", 
                items: [
                  { id: 501, title: "스마트 홈 AI 비서의 진화", tag: "Smart Home", color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/10", author: "IoT Team", status: 'FREE', thumb: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800" },
                  { id: 502, title: "AI 기반 식단 및 건강 관리 솔루션", tag: "Health", color: "text-red-400", border: "border-red-500/20", bg: "bg-red-500/10", author: "Health AI", status: 'PAID', thumb: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800" },
                  { id: 503, title: "여행 계획 자동 최적화 시스템", tag: "Travel", color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/10", author: "Trip Planner", status: 'FREE', thumb: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800" },
                  { id: 504, title: "감정 인식 AI와 정신 건강 상담", tag: "Wellness", color: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/10", author: "Psych Lab", status: 'PRO', thumb: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" },
                ]
              },
              { 
                name: "Business", 
                items: [
                  { id: 601, title: "RAG를 활용한 기업 내부 지식 베이스 구축", tag: "Enterprise", color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/10", author: "Rowan Cheung", status: 'PRO', thumb: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
                  { id: 602, title: "AI 기반 계약서 자동 검토 및 법률 자문", tag: "Legal", color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/10", author: "Legal Tech", status: 'PAID', thumb: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800" },
                  { id: 603, title: "코드 리뷰 및 개발 자동화 도구 도입", tag: "DevOps", color: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/10", author: "Hardware Ops", status: 'FREE', thumb: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800" },
                  { id: 604, title: "기업용 AI 거버넌스 및 윤리 가이드라인", tag: "Governance", color: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/10", author: "Security Team", status: 'PRO', thumb: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800" },
                ]
              }
            ].map((section) => (
              <section key={section.name} className="mt-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
                  <h2 className="text-[13px] font-bold text-white uppercase tracking-[0.2em] flex items-center gap-3">
                     <div className="w-1 h-4 bg-emerald-tech"></div>
                     {section.name}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {section.items.map((item, i) => (
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
              </section>
            ))}
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
