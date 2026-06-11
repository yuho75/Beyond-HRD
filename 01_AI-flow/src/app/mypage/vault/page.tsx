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
    <div className="font-body-md text-gray-900 min-h-screen bg-[#f8f9fa] flex flex-col w-full">

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shrink-0">
          <div className="p-8">
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
                      ? 'bg-[#f97316] text-white font-bold shadow-[0_0_20px_rgba(197,179,249,0.2)]' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
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
        <main className="flex-1 overflow-y-auto p-10 bg-[#f8f9fa]">
          <div className="max-w-5xl mx-auto flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">나의 학습 저장소</h1>
                <p className="text-gray-500 text-sm">보관 중인 아이디어와 학습 이력을 한눈에 확인하세요.</p>
              </div>
              <div className="flex bg-white rounded-xl p-1 border border-gray-200">
                <button 
                  onClick={() => setActiveTab('bookmarks')}
                  className={`px-6 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === 'bookmarks' ? "bg-[#f97316] text-white shadow-lg" : "text-gray-500 hover:text-gray-300"}`}
                >
                  Bookmarks
                </button>
                <button 
                  onClick={() => setActiveTab('history')}
                  className={`px-6 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === 'history' ? "bg-[#f97316] text-white shadow-lg" : "text-gray-500 hover:text-gray-300"}`}
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
                  className={`px-4 py-1.5 rounded-full text-[11px] font-bold border transition-all shrink-0 cursor-pointer ${filter === cat ? "bg-gray-100 border-white/20 text-gray-900" : "bg-transparent border-gray-200 text-gray-500 hover:border-gray-300"}`}
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
                  <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#f97316]/30 transition-all group flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${item.site === 'AI-ROOT' ? 'bg-orange-500/10 text-orange-400' : 'bg-orange-500/10 text-orange-400'}`}>{item.site}</span>
                        <Bookmark className="w-4 h-4 text-[#f97316] fill-[#f97316]" />
                      </div>
                      <h3 className="text-base font-bold text-gray-900 mb-4 group-hover:text-[#f97316] transition-colors leading-tight">{item.title}</h3>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <span className="text-[10px] text-gray-600 font-technical-sm">{item.date}</span>
                      <button className="text-[10px] text-[#f97316] font-bold flex items-center gap-1 hover:underline cursor-pointer">
                        READ <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200 bg-white/20">
                      <th className="p-5 text-[10px] font-technical-sm text-gray-500 uppercase tracking-widest">Content Name</th>
                      <th className="p-5 text-[10px] font-technical-sm text-gray-500 uppercase tracking-widest">Source</th>
                      <th className="p-5 text-[10px] font-technical-sm text-gray-500 uppercase tracking-widest text-right">Earned pt</th>
                      <th className="p-5 text-[10px] font-technical-sm text-gray-500 uppercase tracking-widest text-right">Date</th>
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
                      <tr key={i} className="border-b border-gray-200 hover:bg-gray-50 transition-colors group cursor-pointer">
                        <td className="p-5">
                          <p className="text-sm font-bold text-gray-900 group-hover:text-[#f97316] transition-colors">{row.title}</p>
                        </td>
                        <td className="p-5">
                           <span className="text-[9px] font-bold text-gray-500 border border-gray-300 px-2 py-0.5 rounded">{row.source}</span>
                        </td>
                        <td className="p-5 text-right">
                          <span className="text-sm font-bold text-[#f97316]">{row.pt}</span>
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
