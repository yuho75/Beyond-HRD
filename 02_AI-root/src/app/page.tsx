"use client";

import { 
  Zap, 
  Search, 
  Lock, 
  Bookmark, 
  Layout, 
  Users, 
  Settings, 
  MessageSquare, 
  Play, 
  ExternalLink,
  Grid,
  List,
  Terminal,
  UserCircle,
  Globe,
  Menu,
  X
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [bookmarks, setBookmarks] = useState<number[]>([0, 2]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleBookmark = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  const featuredItems = [
    { 
      id: 201, 
      category: "Commerce",
      label: "Commerce",
      title: "AI 기반 초개인화 쇼핑 추천 시스템 구축", 
      desc: "Revolutionizing retail with deep learning. Implement real-time recommendation engines that boost conversion by 40%.",
      tag: "E-Commerce", 
      status: 'PRO', 
      thumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1600",
      author: "Commerce Lab",
      date: "Nov 22, 2024"
    },
    { 
      id: 301, 
      category: "Education",
      label: "Education",
      title: "개인별 맞춤형 학습 경로 설계 AI", 
      desc: "The future of learning is adaptive. Build AI agents that understand student progress and tailor curriculum in real-time.",
      tag: "EdTech", 
      status: 'FREE', 
      thumb: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1600",
      author: "Edu Tech",
      date: "Nov 18, 2024"
    },
    { 
      id: 401, 
      category: "Media",
      label: "Media",
      title: "영상 편집 자동화를 위한 AI 워크플로우", 
      desc: "Automate your production pipeline with generative AI. A complete guide to AI-driven video editing and synthesis.",
      tag: "Production", 
      status: 'PRO', 
      thumb: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1600",
      author: "Studio X",
      date: "Nov 20, 2024"
    },
    { 
      id: 501, 
      category: "Lifestyle",
      label: "Lifestyle",
      title: "스마트 홈 AI 비서의 진화와 미래", 
      desc: "Seamlessly integrate AI into your daily life. Explore the latest advancements in smart home automation and ambient computing.",
      tag: "Smart Home", 
      status: 'FREE', 
      thumb: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1600",
      author: "IoT Team",
      date: "Nov 16, 2024"
    },
    { 
      id: 601, 
      category: "Business",
      label: "Business",
      title: "RAG를 활용한 기업 내부 지식 베이스 구축", 
      desc: "Deploying fine-tuned models for enterprise infrastructure. Learn the end-to-end pipeline for model quantization, optimization, and scaling.",
      tag: "Enterprise", 
      status: 'PAID', 
      thumb: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1600",
      author: "Rowan Cheung",
      date: "Nov 24, 2024"
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % featuredItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredItems.length]);

  const activeItem = featuredItems[activeIdx];

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
            <a className="font-technical-sm text-emerald-tech hover:text-white transition-colors uppercase tracking-widest text-[10px] no-underline font-bold" href="/mypage">My Page</a>
            <a className="font-technical-sm text-emerald-tech hover:text-white transition-colors uppercase tracking-widest text-[10px] no-underline font-bold" href="/admin">Admin</a>
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
          <button className="hidden sm:block font-technical-sm uppercase tracking-widest px-4 py-2 bg-[#FF6B00] text-white rounded text-[10px] hover:bg-[#e65a00] transition-all active:scale-95 cursor-pointer border-none font-bold shadow-lg shadow-orange-900/20 whitespace-nowrap">
            로그인
          </button>
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-white/70 hover:text-emerald-tech hover:bg-white/5 rounded-md transition-all"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#0a0a0a] z-[100] lg:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
        <div className="flex flex-col h-full pt-20 px-8 gap-8 relative">
          {/* Close Button inside Overlay */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-5 right-8 p-2 text-white/50 hover:text-white rounded-full bg-white/5 transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col gap-6 mt-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-tech/50 border-b border-white/5 pb-2">Categories</p>
            {['Commerce', 'Education', 'Media', 'Lifestyle', 'Business'].map((item) => (
              <a key={item} href="#" className="text-3xl font-bold text-white hover:text-emerald-tech transition-colors py-1" onClick={() => setIsMobileMenuOpen(false)}>
                {item}
              </a>
            ))}
          </div>
          
          <div className="flex flex-col gap-4 mt-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#00E5FF]/50 border-b border-white/5 pb-2">Management</p>
            <a href="#" className="text-xl font-bold text-[#00E5FF] hover:brightness-125 transition-all" onClick={() => setIsMobileMenuOpen(false)}>My Page</a>
            <a href="#" className="text-xl font-bold text-[#00E5FF] hover:brightness-125 transition-all" onClick={() => setIsMobileMenuOpen(false)}>Admin</a>
          </div>

          <button className="mt-auto mb-12 w-full py-4 bg-[#FF6B00] text-white rounded-xl text-sm font-bold uppercase tracking-widest shadow-xl shadow-orange-900/20" onClick={() => setIsMobileMenuOpen(false)}>
            로그인
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-8 pt-8 pb-12 max-w-7xl mx-auto w-full flex-grow flex flex-col gap-12">
        <div className="flex flex-col gap-16">
          {/* Grid Content */}
          <div className="flex flex-col gap-16 min-w-0">
            {/* Featured Section (Slider) */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Card (Left) */}
              <div className="flex-1">
                <a href="/content" className="relative block bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row gap-8 items-center hover:border-emerald-tech/30 transition-all group cursor-pointer no-underline overflow-hidden">
                  <div className="w-full md:w-[68%] aspect-video rounded-xl overflow-hidden bg-gray-900 relative flex-none">
                    <img key={activeItem.id} src={activeItem.thumb} alt={activeItem.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 animate-in fade-in zoom-in-95" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-tech/20 to-transparent mix-blend-overlay"></div>
                    <div className="absolute top-4 left-4 flex gap-2">
                      <div className="bg-emerald-tech/20 text-emerald-tech text-[10px] px-2 py-0.5 font-bold uppercase border border-emerald-tech/30 rounded backdrop-blur-md">{activeItem.tag}</div>
                      <div className="bg-purple-500 text-white text-[10px] px-2 py-0.5 font-bold uppercase rounded shadow-lg flex items-center gap-1">
                        <Lock className="w-3 h-3" /> {activeItem.status}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-center py-2">
                    <span className="inline-block px-3 py-1 bg-white/5 text-white/40 text-[10px] font-bold uppercase tracking-widest rounded-full self-start mb-3 border border-white/10 animate-in slide-in-from-left-4">
                      {activeItem.label}
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold leading-tight text-white mb-3 group-hover:text-emerald-tech transition-colors animate-in slide-in-from-left-6">
                      {activeItem.title}
                    </h2>
                    <p className="text-sm text-white/40 mb-5 leading-relaxed line-clamp-3 animate-in slide-in-from-left-8">
                      {activeItem.desc}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-tech/20 flex items-center justify-center text-emerald-tech text-xs font-bold uppercase">{activeItem.author[0]}</div>
                        <div>
                          <p className="font-bold text-xs text-white">{activeItem.author}</p>
                          <p className="text-[10px] text-white/40">{activeItem.date}</p>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => toggleBookmark(activeItem.id, e)}
                        className={`p-2.5 rounded-full backdrop-blur-md border border-white/10 transition-all ${bookmarks.includes(activeItem.id) ? 'bg-emerald-tech text-black border-emerald-tech shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-black/40 text-white hover:bg-black/60'}`}
                      >
                        <Bookmark className="w-4 h-4" fill={bookmarks.includes(activeItem.id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </div>
                </a>
              </div>

              {/* Slider Navigation (Right) */}
              <div className="w-full lg:w-[280px] flex flex-col">
                {featuredItems.map((item, idx) => (
                  <button 
                    key={item.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`text-left py-4 px-5 transition-all border-l-2 cursor-pointer group/nav ${
                      activeIdx === idx 
                        ? 'border-emerald-tech bg-emerald-tech/5' 
                        : 'border-white/5 hover:border-white/20 hover:bg-white/[0.02]'
                    }`}
                  >
                    <span className={`block text-[9px] font-bold uppercase tracking-[0.2em] mb-2 transition-colors ${
                      activeIdx === idx ? 'text-emerald-tech' : 'text-white/30 group-hover/nav:text-white/50'
                    }`}>
                      {item.label}
                    </span>
                    <h3 className={`text-[13px] font-bold leading-tight transition-colors ${
                      activeIdx === idx ? 'text-white' : 'text-white/40 group-hover/nav:text-white/60'
                    }`}>
                      {item.title}
                    </h3>
                  </button>
                ))}
              </div>
            </div>

            {/* Category Sections */}
            {[
              { 
                name: "Commerce", 
                items: [
                  { id: 201, title: "AI 기반 초개인화 쇼핑 추천 시스템 구축", tag: "E-Commerce", color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/10", author: "Commerce Lab", status: 'PAID', thumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800" },
                  { id: 202, title: "재고 최적화를 위한 수요 예측 머신러닝", tag: "Logistics", color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/10", author: "Ops Team", status: 'PRO', thumb: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" },
                  { id: 203, title: "가상 피팅룸: 생성형 AI와 패션 비즈니스", tag: "Fashion", color: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/10", author: "AI Design", status: 'FREE', thumb: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800" },
                  { id: 204, title: "무인 결제 시스템의 컴퓨터 비전 기술", tag: "Retail", color: "text-red-400", border: "border-red-500/20", bg: "bg-red-500/10", author: "Vision AI", status: 'PAID', thumb: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=800" },
                ]
              },
              { 
                name: "Education", 
                items: [
                  { id: 301, title: "개인별 맞춤형 학습 경로 설계 AI", tag: "EdTech", color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/10", author: "Edu Tech", status: 'FREE', thumb: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800" },
                  { id: 302, title: "자동 채점 및 피드백 시스템의 한계", tag: "Automation", color: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/10", author: "Prof. Lee", status: 'PAID', thumb: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800" },
                  { id: 303, title: "언어 학습을 위한 실시간 AI 튜터링", tag: "Language", color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/10", author: "Global Edu", status: 'PRO', thumb: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800" },
                  { id: 304, title: "교실 내 AI 도입 가이드라인", tag: "Policy", color: "text-red-400", border: "border-red-500/20", bg: "bg-red-500/10", author: "Gov AI", status: 'FREE', thumb: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800" },
                ]
              },
              { 
                name: "Media", 
                items: [
                  { id: 401, title: "영상 편집 자동화를 위한 AI 워크플로우", tag: "Production", color: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/10", author: "Studio X", status: 'PRO', thumb: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800" },
                  { id: 402, title: "가상 인플루언서 제작과 마케팅 전략", tag: "Influencer", color: "text-pink-400", border: "border-pink-500/20", bg: "bg-pink-500/10", author: "Social Lab", status: 'PAID', thumb: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800" },
                  { id: 403, title: "뉴스 요약 및 자동 기사 작성 AI", tag: "Journalism", color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/10", author: "News Tech", status: 'FREE', thumb: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800" },
                  { id: 404, title: "음원 생성 AI: 저작권과 비즈니스 기회", tag: "Audio", color: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/10", author: "Music AI", status: 'PAID', thumb: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800" },
                ]
              },
              { 
                name: "Lifestyle", 
                items: [
                  { id: 501, title: "스마트 홈 AI 비서의 진화", tag: "Smart Home", color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/10", author: "IoT Team", status: 'FREE', thumb: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800" },
                  { id: 502, title: "AI 기반 식단 및 건강 관리 솔루션", tag: "Health", color: "text-red-400", border: "border-red-500/20", bg: "bg-red-500/10", author: "Health AI", status: 'PAID', thumb: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800" },
                  { id: 503, title: "여행 계획 자동 최적화 시스템", tag: "Travel", color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/10", author: "Trip Planner", status: 'FREE', thumb: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800" },
                  { id: 504, title: "감정 인식 AI와 정신 건강 상담", tag: "Wellness", color: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/10", author: "Psych Lab", status: 'PRO', thumb: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" },
                ]
              },
              { 
                name: "Business", 
                items: [
                  { id: 601, title: "RAG를 활용한 기업 내부 지식 베이스 구축", tag: "Enterprise", color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/10", author: "Rowan Cheung", status: 'PRO', thumb: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800" },
                  { id: 602, title: "AI 기반 계약서 자동 검토 및 법률 자문", tag: "Legal", color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/10", author: "Legal Tech", status: 'PAID', thumb: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800" },
                  { id: 603, title: "코드 리뷰 및 개발 자동화 도구 도입", tag: "DevOps", color: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/10", author: "Hardware Ops", status: 'FREE', thumb: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800" },
                  { id: 604, title: "기업용 AI 거버넌스 및 윤리 가이드라인", tag: "Governance", color: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/10", author: "Security Team", status: 'PRO', thumb: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
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
                        <img src={item.thumb} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" alt={item.title} />
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
