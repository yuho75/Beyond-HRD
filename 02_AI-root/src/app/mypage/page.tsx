"use client";

import { 
  Search, 
  Terminal, 
  UserCircle, 
  LogOut, 
  Bookmark, 
  PlayCircle, 
  CheckCircle, 
  Trophy, 
  CreditCard, 
  Settings, 
  ChevronRight,
  TrendingUp,
  MoreVertical,
  Bell,
  Clock,
  Layout
} from "lucide-react";

export default function MyPage() {
  return (
    <div className="font-body-md text-inverse-on-surface min-h-screen bg-[#0d0d0d] flex flex-col">
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
          <a className="font-technical-sm text-white border-b-2 border-white pb-1 uppercase tracking-widest text-xs" href="#">My Page</a>
        </nav>
        
        <div className="flex-1 flex items-center justify-end gap-6">
          <span className="font-technical-sm text-white/60 text-xs hidden sm:block">뉴스레터 무료 구독하기</span>
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
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <Trophy className="text-white w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">A-Zip Admin</p>
                <p className="text-[10px] text-purple-400 font-technical-sm uppercase tracking-widest">Premium Dark</p>
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              {[
                { name: '개인화 대시보드', icon: <Layout className="w-4 h-4" />, href: "/mypage", active: true },
                { name: '나의 학습 저장소', icon: <Bookmark className="w-4 h-4" />, href: "/mypage/vault" },
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

          <div className="mt-auto p-8 border-t border-white/5">
            <button className="flex items-center gap-3 text-white/40 hover:text-red-400 transition-colors font-technical-sm text-sm cursor-pointer">
              <LogOut className="w-4 h-4" />
              로그아웃
            </button>
          </div>
        </aside>

        {/* Main Content Scrollable */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#0d0d0d]">
          <div className="max-w-5xl mx-auto flex flex-col gap-10">
            
            {/* Welcome Banner */}
            <section className="bg-[#1a1a1a] rounded-3xl p-10 border border-white/5 relative overflow-hidden flex items-center justify-between">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
              
              <div className="flex items-center gap-8 z-10">
                <div className="relative">
                   <div className="w-24 h-24 rounded-full border-4 border-white/10 flex items-center justify-center p-1">
                     <div className="w-full h-full rounded-full bg-[#131313] flex items-center justify-center">
                        <UserCircle className="w-12 h-12 text-white/20" />
                     </div>
                   </div>
                   <div className="absolute -top-1 -right-1 bg-purple-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full border-2 border-[#1a1a1a]">AI MASTER</div>
                </div>
                
                <div>
                  <h1 className="text-3xl font-bold text-white mb-6">반가워요, 학습자님!</h1>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-[10px] font-technical-sm text-white/40 uppercase tracking-widest">
                      <span>Total Credits</span>
                      <span className="text-white"><span className="text-xl font-bold text-white">2,488</span> / 2,500</span>
                    </div>
                    <div className="w-80 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 w-[99%]"></div>
                    </div>
                    <p className="text-[10px] text-white/20 font-technical-sm mt-1">12pt left until next level!</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 w-80 z-10 cursor-pointer hover:bg-white/10 transition-all group">
                <p className="text-[10px] text-purple-400 font-technical-sm uppercase tracking-widest mb-2">Recommended Content</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-white">AI로 시작하는 자동화 부업</p>
                  <ChevronRight className="w-4 h-4 text-white/40 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </section>

            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1 flex flex-col gap-10">
                {/* Bookmarks Tabs */}
                <section>
                  <div className="flex items-center gap-8 border-b border-white/5 mb-8">
                    {['Bookmarks', 'In Progress', 'Completed'].map((tab, i) => (
                      <button key={tab} className={`pb-4 text-xs font-technical-sm uppercase tracking-widest transition-all cursor-pointer ${
                        i === 0 ? 'text-white border-b-2 border-[#c5b3f9]' : 'text-white/20 hover:text-white/60'
                      }`}>
                        {tab}
                      </button>
                    ))}
                    <div className="ml-auto flex gap-2">
                      <span className="text-[10px] font-technical-sm text-white/20 px-2 py-0.5 border border-white/5 rounded">#STARTUP</span>
                      <span className="text-[10px] font-technical-sm text-white/20 px-2 py-0.5 border border-white/5 rounded">#TECH</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { brand: 'AI-FLOW', title: '2024년 생성형 AI 트렌드 리포트 요약', time: '12 MINS', tag: 'TECH' },
                      { brand: 'AI-ROOT', title: '비즈니스 기획을 위한 프롬프트 엔지니어링', time: '45 MINS', tag: 'PLANNING' }
                    ].map((card, i) => (
                      <div key={i} className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 hover:border-white/20 transition-all cursor-pointer group relative overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                          <span className="text-[10px] font-technical-sm text-white/40 border border-white/10 px-2 py-0.5 rounded">{card.brand}</span>
                          <Bookmark className="w-4 h-4 text-[#c5b3f9] fill-[#c5b3f9]" />
                        </div>
                        <h4 className="text-base font-bold text-white mb-8 group-hover:text-[#c5b3f9] transition-colors leading-snug">
                          {card.title}
                        </h4>
                        <div className="flex items-center gap-4 text-[10px] font-technical-sm text-white/30 uppercase tracking-widest">
                           <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {card.time}</span>
                           <span className="flex items-center gap-1"><Terminal className="w-3 h-3" /> {card.tag}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Learning History Table */}
                <section>
                  <h2 className="text-xl font-bold text-white mb-8 border-l-4 border-[#c5b3f9] pl-4">Learning History</h2>
                  <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-white/5">
                          <th className="p-5 text-[10px] font-technical-sm text-white/20 uppercase tracking-widest">Content Title</th>
                          <th className="p-5 text-[10px] font-technical-sm text-white/20 uppercase tracking-widest">Type</th>
                          <th className="p-5 text-[10px] font-technical-sm text-white/20 uppercase tracking-widest">Credits</th>
                          <th className="p-5 text-[10px] font-technical-sm text-white/20 uppercase tracking-widest">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { title: 'LLM 기반 에이전트 구축 가이드', type: 'AI-ROOT', credits: '+50pt', date: '2024.11.20' },
                          { title: '유튜브 쇼츠 자동화 전략', type: 'AI-FLOW', credits: '+20pt', date: '2024.11.18' },
                          { title: '노션으로 만드는 AI 협업 툴', type: 'AI-ROOT', credits: '+50pt', date: '2024.11.15' }
                        ].map((row, i) => (
                          <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                            <td className="p-5 text-sm font-bold text-white">{row.title}</td>
                            <td className="p-5">
                              <span className="text-[9px] font-technical-sm text-white/40 border border-white/10 px-2 py-0.5 rounded uppercase">{row.type}</span>
                            </td>
                            <td className="p-5 text-sm font-bold text-purple-400">{row.credits}</td>
                            <td className="p-5 text-xs text-white/20 font-technical-sm">{row.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>

              {/* Right Sidebar Stats/Status */}
              <div className="w-full lg:w-80 shrink-0 flex flex-col gap-8">
                <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="font-technical-sm text-xs uppercase tracking-widest text-white/60">Growth Report</h3>
                    <MoreVertical className="w-4 h-4 text-white/20 cursor-pointer" />
                  </div>
                  
                  {/* Chart Placeholder */}
                  <div className="h-40 flex items-end gap-3 mb-10 px-2">
                    {[30, 60, 45, 80, 50, 90, 70].map((h, i) => (
                      <div key={i} className="flex-1 bg-white/5 rounded-t-sm relative group cursor-pointer">
                         <div 
                           className={`absolute bottom-0 left-0 right-0 rounded-t-sm transition-all duration-500 ${i === 6 ? 'bg-purple-500' : 'bg-white/10 group-hover:bg-white/20'}`} 
                           style={{ height: `${h}%` }}
                         ></div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-end justify-between mb-8">
                    <div>
                      <p className="text-[10px] text-white/20 font-technical-sm uppercase tracking-widest mb-1">Weekly Summary</p>
                      <p className="text-xs text-white/60">Total Learning Time</p>
                    </div>
                    <div className="text-right">
                       <span className="text-3xl font-bold text-white">4.2</span> <span className="text-xs text-white/20 uppercase">hrs</span>
                    </div>
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-4 flex gap-4 items-start">
                    <Bell className="w-5 h-5 text-purple-400 shrink-0 mt-1" />
                    <p className="text-xs text-purple-200/60 leading-relaxed">
                      지난주보다 <span className="text-purple-400 font-bold">15% 더 많은</span> 학습량을 기록하고 있어요! 조금만 더 하면 레벨업!
                    </p>
                  </div>
                </div>

                <div className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-8">
                  <h3 className="font-technical-sm text-[10px] uppercase tracking-widest text-white/20 mb-8">Account Status</h3>
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/60">Membership Plan</span>
                      <span className="text-[10px] font-technical-sm text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded-full uppercase tracking-tighter bg-purple-500/5">Premium Dark</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/60">Newsletter (Stibee)</span>
                      <div className="w-10 h-5 bg-[#c5b3f9] rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-3 h-3 bg-black rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="h-px bg-white/5 my-2"></div>
                    
                    {[
                      'Edit Nickname',
                      'Change Password',
                      'Billing History'
                    ].map((item) => (
                      <button key={item} className="flex items-center justify-between text-xs text-white/60 hover:text-white transition-all cursor-pointer group">
                        {item}
                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#0d0d0d] border-t border-white/5 px-12 py-8 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-white text-lg tracking-tight">A-Zip</span>
          <p className="text-[10px] text-white/20 uppercase tracking-widest">© 2024 A-ZIP. All rights reserved.</p>
        </div>
        <div className="flex gap-8 text-[10px] font-technical-sm text-white/40 uppercase tracking-widest">
           <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
           <a href="#" className="hover:text-white transition-colors">이용약관</a>
           <a href="#" className="hover:text-white transition-colors">고객센터</a>
        </div>
      </footer>
    </div>
  );
}
