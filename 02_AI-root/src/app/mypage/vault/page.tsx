"use client";

import { 
  Search, 
  Terminal, 
  UserCircle, 
  LogOut, 
  Bookmark, 
  Clock, 
  Layout, 
  TrendingUp, 
  Settings,
  Filter,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

export default function ContentVault() {
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'history'>('bookmarks');
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Startup', 'Tech', 'Planning', 'Design'];

  return (
    <div className="font-body-md text-inverse-on-surface min-h-screen bg-[#0d0d0d] flex flex-col text-gray-100">
      {/* Top Navigation */}
      <header className="h-16 flex items-center justify-between px-8 border-b border-white/5 sticky top-0 bg-[#0d0d0d]/80 backdrop-blur-md z-50">
        <div className="flex-1 flex items-center gap-3">
          <a href="/" className="flex items-center gap-3 cursor-pointer group">
            <span className="font-extrabold tracking-tight text-xl text-white">AI ROOT</span>
          </a>
        </div>
        <nav className="hidden lg:flex items-center gap-8">
          <a className="font-technical-sm text-white/40 hover:text-white transition-colors uppercase tracking-widest text-xs" href="#">AI-Flow</a>
          <a className="font-technical-sm text-white/40 hover:text-white transition-colors uppercase tracking-widest text-xs" href="#">AI-Root</a>
          <a className="font-technical-sm text-white border-b-2 border-white pb-1 uppercase tracking-widest text-xs" href="/mypage">My Page</a>
        </nav>
        <div className="flex-1 flex items-center justify-end gap-6">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/20 cursor-pointer">
            <UserCircle className="w-6 h-6 text-white/60" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-[#131313] border-r border-white/5 flex flex-col shrink-0">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-10 p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c5b3f9] to-[#8a63f2] flex items-center justify-center">
                <Bookmark className="text-black w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">A-Zip User</p>
                <p className="text-[10px] text-purple-400 font-technical-sm uppercase tracking-widest">Content Vault</p>
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              {[
                { name: '개인화 대시보드', icon: <Layout className="w-4 h-4" />, href: "/mypage" },
                { name: '나의 학습 저장소', icon: <Bookmark className="w-4 h-4" />, href: "/mypage/vault", active: true },
                { name: '성장 리포트', icon: <TrendingUp className="w-4 h-4" />, href: "/mypage/growth" },
                { name: '계정 및 구독 관리', icon: <Settings className="w-4 h-4" />, href: "/mypage/settings" },
              ].map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-technical-sm text-sm transition-all cursor-pointer ${
                    item.active 
                      ? 'bg-[#c5b3f9] text-black font-bold shadow-[0_0_20px_rgba(197,179,249,0.2)]' 
                      : 'text-white/40 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-10 bg-[#0d0d0d]">
          <div className="max-w-5xl mx-auto flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">나의 학습 저장소</h1>
                <p className="text-gray-500 text-sm">보관 중인 아이디어와 학습 이력을 한눈에 확인하세요.</p>
              </div>
              <div className="flex bg-[#1a1a1a] rounded-xl p-1 border border-white/5">
                <button 
                  onClick={() => setActiveTab('bookmarks')}
                  className={`px-6 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'bookmarks' ? "bg-[#c5b3f9] text-black shadow-lg" : "text-gray-500 hover:text-gray-300"}`}
                >
                  Bookmarks
                </button>
                <button 
                  onClick={() => setActiveTab('history')}
                  className={`px-6 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'history' ? "bg-[#c5b3f9] text-black shadow-lg" : "text-gray-500 hover:text-gray-300"}`}
                >
                  History
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <Filter className="w-4 h-4 text-gray-600 mr-2 shrink-0" />
              {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-bold border transition-all shrink-0 ${filter === cat ? "bg-white/10 border-white/20 text-white" : "bg-transparent border-white/5 text-gray-500 hover:border-white/10"}`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>

            {activeTab === 'bookmarks' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { site: 'AI-ROOT', title: 'SaaS 비즈니스를 위한 AI 에이전트 설계안', category: 'Startup', date: '2024.11.20' },
                  { site: 'AI-FLOW', title: '유튜브 요약: 2025 AI 반도체 전망', category: 'Tech', date: '2024.11.18' },
                  { site: 'AI-ROOT', title: '노코드 툴과 AI를 결합한 업무 자동화', category: 'Planning', date: '2024.11.15' },
                  { site: 'AI-FLOW', title: '테슬라 FSD V12 핵심 분석 요약', category: 'Tech', date: '2024.11.12' },
                  { site: 'AI-ROOT', title: 'AI 기반 퍼스널 브랜딩 전략 코스', category: 'Design', date: '2024.11.10' },
                ].filter(item => filter === 'All' || item.category === filter).map((item, i) => (
                  <div key={i} className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 hover:border-[#c5b3f9]/30 transition-all group flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${item.site === 'AI-ROOT' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-orange-500/10 text-orange-400'}`}>{item.site}</span>
                        <Bookmark className="w-4 h-4 text-[#c5b3f9] fill-[#c5b3f9]" />
                      </div>
                      <h3 className="text-base font-bold text-white mb-4 group-hover:text-[#c5b3f9] transition-colors leading-tight">{item.title}</h3>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-[10px] text-gray-600 font-technical-sm">{item.date}</span>
                      <button className="text-[10px] text-[#c5b3f9] font-bold flex items-center gap-1 hover:underline">
                        READ <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/20">
                      <th className="p-5 text-[10px] font-technical-sm text-white/40 uppercase tracking-widest">Content Name</th>
                      <th className="p-5 text-[10px] font-technical-sm text-white/40 uppercase tracking-widest">Source</th>
                      <th className="p-5 text-[10px] font-technical-sm text-white/40 uppercase tracking-widest text-right">Earned pt</th>
                      <th className="p-5 text-[10px] font-technical-sm text-white/40 uppercase tracking-widest text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { title: 'Generative AI Overview', source: 'AI-ROOT', pt: '+50pt', date: '2024.11.20' },
                      { title: 'Next.js 14 Architecture Summary', source: 'AI-FLOW', pt: '+20pt', date: '2024.11.19' },
                      { title: 'AI Copywriting Bootcamp', source: 'AI-ROOT', pt: '+150pt', date: '2024.11.18' },
                      { title: 'OpenAI DevDay Highlights', source: 'AI-FLOW', pt: '+20pt', date: '2024.11.17' },
                      { title: 'Data Visualization with AI', source: 'AI-ROOT', pt: '+50pt', date: '2024.11.16' },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer">
                        <td className="p-5">
                          <p className="text-sm font-bold text-white group-hover:text-[#c5b3f9] transition-colors">{row.title}</p>
                        </td>
                        <td className="p-5">
                           <span className="text-[9px] font-bold text-gray-500 border border-white/10 px-2 py-0.5 rounded">{row.source}</span>
                        </td>
                        <td className="p-5 text-right">
                          <span className="text-sm font-bold text-[#c5b3f9]">{row.pt}</span>
                        </td>
                        <td className="p-5 text-right text-xs text-gray-600 font-technical-sm">
                          {row.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
