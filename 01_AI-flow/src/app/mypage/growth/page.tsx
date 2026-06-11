"use client";

import { 
  Terminal, 
  UserCircle, 
  Layout, 
  Bookmark, 
  TrendingUp, 
  Settings,
  ChevronRight,
  Trophy,
  Target,
  BarChart3,
  CheckCircle2
} from "lucide-react";

export default function GrowthTracking() {
  return (
    <div className="font-body-md text-gray-900 min-h-screen bg-[#f8f9fa] flex flex-col">
      {/* Top Navigation */}
      <header className="h-16 flex items-center justify-between px-8 border-b border-gray-200 sticky top-0 bg-[#f8f9fa]/80 backdrop-blur-md z-50">
        <div className="flex-1 flex items-center gap-3">
          <a href="/" className="flex items-center gap-3 cursor-pointer group">
            <span className="font-extrabold tracking-tight text-xl text-gray-900">AI ROOT</span>
          </a>
        </div>
        <nav className="hidden lg:flex items-center gap-8">
          <a className="font-technical-sm text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-widest text-xs" href="#">AI-Flow</a>
          <a className="font-technical-sm text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-widest text-xs" href="#">AI-Root</a>
          <a className="font-technical-sm text-gray-900 border-b-2 border-white pb-1 uppercase tracking-widest text-xs" href="/mypage">My Page</a>
        </nav>
        <div className="flex-1 flex items-center justify-end gap-6">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-white/20 cursor-pointer">
            <UserCircle className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shrink-0">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-10 p-4 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c5b3f9] to-[#8a63f2] flex items-center justify-center">
                <TrendingUp className="text-black w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">A-Zip User</p>
                <p className="text-[10px] text-purple-400 font-technical-sm uppercase tracking-widest">Growth Tracking</p>
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              {[
                { name: '개인화 대시보드', icon: <Layout className="w-4 h-4" />, href: "/mypage" },
                { name: '나의 학습 저장소', icon: <Bookmark className="w-4 h-4" />, href: "/mypage/vault" },
                { name: '성장 리포트', icon: <TrendingUp className="w-4 h-4" />, href: "/mypage/growth", active: true },
                { name: '계정 및 구독 관리', icon: <Settings className="w-4 h-4" />, href: "/mypage/settings" },
              ].map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-technical-sm text-sm transition-all cursor-pointer ${
                    item.active 
                      ? 'bg-[#c5b3f9] text-black font-bold shadow-[0_0_20px_rgba(197,179,249,0.2)]' 
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
          <div className="max-w-5xl mx-auto flex flex-col gap-10">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">성장 리포트</h1>
              <p className="text-gray-500 text-sm">당신의 학습 성취도와 목표 달성 현황을 분석합니다.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Weekly Stats */}
              <div className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl p-8 flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-[#c5b3f9]" />
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Weekly Learning Activity</h3>
                  </div>
                  <select className="bg-transparent text-[10px] text-gray-500 border border-gray-300 rounded-lg px-2 py-1 outline-none">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>
                
                <div className="flex-1 flex items-end justify-between gap-4 h-48 mb-8 px-4">
                  {[
                    { day: 'MON', val: 40 },
                    { day: 'TUE', val: 75 },
                    { day: 'WED', val: 30 },
                    { day: 'THU', val: 90 },
                    { day: 'FRI', val: 55 },
                    { day: 'SAT', val: 20 },
                    { day: 'SUN', val: 65 },
                  ].map((item, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                      <div className="w-full bg-gray-50 rounded-t-lg relative overflow-hidden h-full min-h-[150px]">
                         <div 
                          className={`absolute bottom-0 left-0 right-0 rounded-t-lg transition-all duration-700 delay-${i*100} ${item.day === 'THU' ? 'bg-[#c5b3f9]' : 'bg-gray-100 group-hover:bg-white/20'}`}
                          style={{ height: `${item.val}%` }}
                         ></div>
                      </div>
                      <span className="text-[10px] text-gray-600 font-bold">{item.day}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Total Contents</span>
                    <span className="text-xl font-bold text-gray-900">24</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Avg. Time</span>
                    <span className="text-xl font-bold text-gray-900">32m</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Peak Day</span>
                    <span className="text-xl font-bold text-[#c5b3f9]">Thursday</span>
                  </div>
                </div>
              </div>

              {/* Level & Goals */}
              <div className="flex flex-col gap-8">
                <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-3xl p-8 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full border-4 border-[#c5b3f9]/20 flex items-center justify-center mb-6 relative">
                    <Trophy className="w-10 h-10 text-[#c5b3f9]" />
                    <div className="absolute -bottom-2 bg-white border border-[#c5b3f9] px-3 py-0.5 rounded-full text-[10px] font-bold text-[#c5b3f9]">LV. 12</div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">AI 기획자</h4>
                  <p className="text-xs text-gray-500 mb-6 uppercase tracking-widest font-technical-sm">Next Level: AI Master</p>
                  <div className="w-full space-y-2">
                    <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-widest px-1">
                      <span>Progress</span>
                      <span>88%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                      <div className="h-full bg-[#c5b3f9] w-[88%] shadow-[0_0_10px_rgba(197,179,249,0.5)]"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col gap-6">
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                    <Target className="w-4 h-4 text-orange-400" />
                    Today's Target
                  </h4>
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-col gap-3">
                    <p className="text-xs text-gray-300 leading-relaxed">
                      "다음 학점까지 <span className="text-[#c5b3f9] font-bold">12pt</span> 남았어요! 이 아티클을 읽고 레벨업 하세요."
                    </p>
                    <a href="#" className="flex items-center justify-between text-[10px] font-bold text-[#c5b3f9] hover:underline group">
                      추천 콘텐츠 보기
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Completed Courses */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-8 border-l-4 border-[#c5b3f9] pl-4">이수 완료 과정 (Course Progress)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'AI 비즈니스 모델 입문', modules: '12/12', date: '2024.11.05', status: 'Completed' },
                  { title: 'LLM 프롬프트 디자인 마스터', modules: '8/10', date: 'In Progress', status: 'Learning' },
                  { title: '노코드 AI 서비스 구축하기', modules: '5/15', date: 'In Progress', status: 'Learning' },
                ].map((item, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-between group hover:border-gray-300 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-[#c5b3f9]/10 text-[#c5b3f9]'}`}>
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#c5b3f9] transition-colors">{item.title}</h4>
                        <p className="text-[10px] text-gray-500 font-technical-sm uppercase tracking-widest mt-1">Modules: {item.modules} | {item.date}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-gray-900 transition-colors" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
