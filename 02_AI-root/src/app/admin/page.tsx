"use client";

import { 
  Search, 
  Bell, 
  UserCircle, 
  LayoutDashboard, 
  Share2, 
  Database, 
  FileEdit, 
  Users, 
  ChevronDown, 
  TrendingUp, 
  Activity, 
  Cpu, 
  HardDrive, 
  RefreshCcw, 
  FileText, 
  AlertTriangle,
  Settings,
  MoreVertical,
  CheckCircle2,
  Clock,
  Terminal
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="font-body-md text-inverse-on-surface min-h-screen bg-[#0d0d0d] flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-[#1a1a1a] border-r border-white/5 flex flex-col shrink-0">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-10 h-10 rounded-lg bg-emerald-tech flex items-center justify-center">
                <Terminal className="text-black w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-white text-sm">A-Zip Admin</h2>
                <p className="text-[10px] text-white/40 font-technical-sm uppercase tracking-widest">통합 관리 시스템 V3.0</p>
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              <div className="mb-4">
                <a href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-emerald-tech font-bold text-sm border border-emerald-tech/20 transition-all cursor-pointer">
                  <LayoutDashboard className="w-4 h-4" />
                  대시보드
                </a>
              </div>

              <div className="flex flex-col gap-1">
                {[
                  { name: 'AI-FLOW 관리 (사이트 A)', icon: <Share2 className="w-4 h-4" />, sub: ["요약 피드 관리", "Zippy's Pick 설정"], href: "#" },
                  { name: 'AI-ROOT 관리 (사이트 B)', icon: <Database className="w-4 h-4" />, sub: ["LMS 코스 설정", "과제 및 평가 모니터링"], href: "#" },
                  { name: '통합 콘텐츠 에디터', icon: <FileEdit className="w-4 h-4" />, href: "/admin/editor" },
                  { name: '사용자 및 서비스 관리', icon: <Users className="w-4 h-4" />, sub: ["학점(Credit) 제어", "구독 플랜 관리"], href: "#" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col">
                    <a href={item.href} className="flex items-center justify-between px-4 py-3 rounded-xl text-white/40 hover:bg-white/5 hover:text-white transition-all text-sm cursor-pointer group">
                      <div className="flex items-center gap-3">
                        {item.icon}
                        {item.name}
                      </div>
                      {item.sub && <ChevronDown className="w-3 h-3 opacity-40 group-hover:opacity-100" />}
                    </a>
                    {item.sub && i < 2 && (
                       <div className="flex flex-col ml-11 mt-1 mb-2 gap-2">
                         {item.sub.map(s => (
                           <a key={s} href="#" className="text-xs text-white/20 hover:text-emerald-tech transition-colors">{s}</a>
                         ))}
                       </div>
                    )}
                  </div>
                ))}
              </div>
            </nav>
          </div>

          <div className="mt-auto p-8">
             <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:border-emerald-tech/30 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-tech/10 flex items-center justify-center">
                    <UserCircle className="w-5 h-5 text-emerald-tech" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-white">Zippy Root Admin</p>
                    <p className="text-[9px] text-white/20 uppercase tracking-tighter">Master Access</p>
                  </div>
                </div>
                <Settings className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
             </div>
          </div>
        </aside>

        {/* Main Dashboard Area */}
        <main className="flex-1 overflow-y-auto p-10 bg-[#0d0d0d]">
          <div className="max-w-7xl mx-auto flex flex-col gap-10">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-white">통합 관리자 대시보드</h1>
                <span className="px-2 py-0.5 bg-emerald-tech/10 text-emerald-tech border border-emerald-tech/20 rounded text-[10px] font-bold uppercase tracking-widest">Master_Root</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="시스템 검색..." 
                    className="bg-[#1a1a1a] border border-white/5 rounded-lg py-2 pl-10 pr-4 text-xs text-white w-64 focus:ring-1 focus:ring-emerald-tech focus:border-emerald-tech" 
                  />
                </div>
                <div className="relative">
                  <Bell className="w-5 h-5 text-white/40 cursor-pointer hover:text-white" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0d0d0d]"></div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10 cursor-pointer">
                   <UserCircle className="w-5 h-5 text-white/60" />
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-emerald-tech text-xs font-bold uppercase tracking-widest border-l-2 border-emerald-tech pl-3">사이트 통합 현황</h3>
                <span className="text-[10px] text-white/20 uppercase tracking-widest">마지막 업데이트: 1분 전</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: '전체 누적 방문자 (A+B)', value: '2,482,100', change: '+12.5%', color: 'text-emerald-tech', trend: 'up' },
                  { label: '금일 신규 가입자', value: '1,248', change: '+4.2%', color: 'text-orange-400', trend: 'up' },
                  { label: '활성 AI 에이전트 수', value: '54', status: '정상', color: 'text-blue-400' },
                  { label: '서버 리소스 상태', value: '24%', status: '여유로움', color: 'text-purple-400' }
                ].map((stat, i) => (
                  <div key={i} className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-technical-sm">{stat.label}</p>
                    <div className="flex items-end justify-between">
                      <h4 className="text-2xl font-bold text-white">{stat.value}</h4>
                      {stat.change && (
                        <span className={`text-[10px] font-bold ${stat.color} flex items-center gap-1`}>
                          {stat.change} <TrendingUp className="w-3 h-3" />
                        </span>
                      )}
                      {stat.status && (
                        <span className={`text-[10px] font-bold ${stat.color} px-2 py-0.5 bg-white/5 rounded uppercase`}>
                          {stat.status}
                        </span>
                      )}
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className={`h-full ${stat.color.replace('text-', 'bg-')} w-2/3`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Main Grid Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column (Lists) */}
              <div className="lg:col-span-5 flex flex-col gap-10">
                <section className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-bold text-white text-sm">금일 요약 업데이트 현황</h3>
                    <RefreshCcw className="w-4 h-4 text-white/20 cursor-pointer hover:text-emerald-tech" />
                  </div>
                  <div className="flex flex-col gap-4">
                    {[
                      { id: '01', title: '글로벌 테크 트렌드 Weekly', sub: '업데이트: 09:30 AM | 요약 12건', status: '완료' },
                      { id: '02', title: 'AI 비즈니스 모델 분석 보고서', sub: '업데이트: 11:15 AM | 요약 8건', status: '진행중' },
                      { id: '03', title: '국내외 투자 동향 Summary', sub: '업데이트: 대기중 | 요약 15건', status: '대기' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-white/10 transition-all cursor-pointer">
                         <div className="flex items-center gap-4">
                           <span className="text-xl font-bold text-white/20 group-hover:text-emerald-tech transition-colors">{item.id}</span>
                           <div>
                             <p className="text-sm font-bold text-white">{item.title}</p>
                             <p className="text-[10px] text-white/20 font-technical-sm">{item.sub}</p>
                           </div>
                         </div>
                         <span className={`text-[9px] font-bold px-2 py-1 rounded uppercase ${
                           item.status === '완료' ? 'text-emerald-tech bg-emerald-tech/10' :
                           item.status === '진행중' ? 'text-blue-400 bg-blue-400/10' : 'text-white/20 bg-white/10'
                         }`}>{item.status}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-8">
                  <h3 className="font-bold text-white text-sm mb-8">북마크 급상승 순위 (TOP 3)</h3>
                  <div className="flex flex-col gap-4">
                    {[
                      { rank: '1', title: 'Generative AI Overview', change: '+242%' },
                      { rank: '2', title: 'Next.js 14 Architecture', change: '+185%' },
                      { rank: '3', title: 'Rust for AI Performance', change: '+92%' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                         <div className="flex items-center gap-4">
                           <span className="text-sm font-bold text-emerald-tech">{item.rank}</span>
                           <p className="text-xs text-white/60">{item.title}</p>
                         </div>
                         <span className="text-[10px] font-bold text-emerald-tech">{item.change}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right Column (Table) */}
              <div className="lg:col-span-7">
                <section className="bg-[#1a1a1a] border border-white/5 rounded-3xl p-8 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-bold text-white text-sm">최근 학습 완료 유저 및 학점(CREDIT) 발생</h3>
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 cursor-pointer">
                      <span className="text-[10px] text-white/60 font-bold uppercase">전체 사이트</span>
                      <ChevronDown className="w-3 h-3 text-white/40" />
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-white/5">
                          <th className="pb-4 text-[10px] text-white/20 uppercase tracking-widest font-technical-sm">유저 ID</th>
                          <th className="pb-4 text-[10px] text-white/20 uppercase tracking-widest font-technical-sm">학습 코스</th>
                          <th className="pb-4 text-[10px] text-white/20 uppercase tracking-widest font-technical-sm">발생 학점</th>
                          <th className="pb-4 text-[10px] text-white/20 uppercase tracking-widest font-technical-sm text-right">처리 시각</th>
                          <th className="pb-4 text-[10px] text-white/20 uppercase tracking-widest font-technical-sm text-right">상태</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { id: 'user_0921', course: 'AI 기초 프로그래밍', credits: '+150 CR', time: '14:02:10', status: '지급완료' },
                          { id: 'alpha_tester', course: '고급 신경망 최적화', credits: '+450 CR', time: '13:58:24', status: '지급완료' },
                          { id: 'newbie_01', course: '데이터 시각화의 이해', credits: '+50 CR', time: '13:45:01', status: '승인대기', error: true },
                          { id: 'admin_test', course: '시스템 아키텍처 가이드', credits: '+200 CR', time: '13:20:15', status: '지급완료' },
                          { id: 'dev_zippy', course: 'LLM 프롬프트 엔지니어링', credits: '+300 CR', time: '12:55:40', status: '지급완료' }
                        ].map((row, i) => (
                          <tr key={i} className="border-b border-white/5 last:border-0 group hover:bg-white/5 transition-colors cursor-pointer">
                            <td className="py-4 text-xs text-white/60 font-technical-sm">{row.id}</td>
                            <td className="py-4 text-xs font-bold text-white">{row.course}</td>
                            <td className="py-4 text-xs font-bold text-orange-400">{row.credits}</td>
                            <td className="py-4 text-[10px] text-white/20 font-technical-sm text-right">{row.time}</td>
                            <td className="py-4 text-right">
                               <div className="flex items-center justify-end gap-2">
                                 <div className={`w-2 h-2 rounded-full ${row.error ? 'bg-red-500 animate-pulse' : 'bg-emerald-tech'}`}></div>
                                 <span className={`text-[10px] font-bold ${row.error ? 'text-red-400' : 'text-emerald-tech'}`}>{row.status}</span>
                               </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <button className="text-[10px] font-bold text-white/40 hover:text-emerald-tech transition-colors uppercase tracking-widest cursor-pointer">활동 로그 전체 보기</button>
                  </div>
                </section>
              </div>
            </div>

            {/* Footer Dashboard Tiles */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
               <section className="lg:col-span-7 bg-[#1a1a1a] border border-white/5 rounded-3xl p-8">
                  <h3 className="font-bold text-white text-sm mb-4">글로벌 시스템 헬스</h3>
                  <p className="text-xs text-white/40 mb-8 font-body-md">현재 모든 서브시스템이 정상 작동 중입니다. 특이사항 없음.</p>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-black/40 border border-white/5 rounded-2xl p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <Activity className="w-5 h-5 text-emerald-tech" />
                           <span className="text-[11px] font-bold text-white uppercase tracking-widest">API Status: Online</span>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-emerald-tech" />
                     </div>
                     <div className="bg-black/40 border border-white/5 rounded-2xl p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <Database className="w-5 h-5 text-purple-400" />
                           <span className="text-[11px] font-bold text-white uppercase tracking-widest">DB Sync: 100%</span>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-purple-400" />
                     </div>
                  </div>
               </section>

               <section className="lg:col-span-5 bg-[#1a1a1a] border border-white/5 rounded-3xl p-8">
                  <h3 className="font-bold text-white text-sm mb-8">빠른 시스템 도구</h3>
                  <div className="grid grid-cols-2 gap-4">
                     <button className="flex items-center justify-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-emerald-tech/30 transition-all text-[11px] font-bold text-white cursor-pointer group">
                        <RefreshCcw className="w-4 h-4 text-emerald-tech group-hover:rotate-180 transition-transform duration-500" />
                        캐시 지우기
                     </button>
                     <button className="flex items-center justify-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-emerald-tech/30 transition-all text-[11px] font-bold text-white cursor-pointer group">
                        <FileText className="w-4 h-4 text-white/40 group-hover:text-white" />
                        보고서 생성
                     </button>
                     <button className="flex items-center justify-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-emerald-tech/30 transition-all text-[11px] font-bold text-white cursor-pointer group">
                        <Users className="w-4 h-4 text-white/40 group-hover:text-white" />
                        데이터 동기화
                     </button>
                     <button className="flex items-center justify-center gap-3 p-4 bg-red-500/10 rounded-xl border border-red-500/20 hover:bg-red-500/20 transition-all text-[11px] font-bold text-red-400 cursor-pointer group">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        긴급 점검 모드
                     </button>
                  </div>
               </section>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#0d0d0d] border-t border-white/5 px-12 py-4 flex items-center justify-between">
         <p className="text-[10px] text-white/20 uppercase tracking-widest">© 2024 A-ZIP UNIFIED SYSTEMS. 모든 권리 보유.</p>
         <div className="flex gap-8 text-[10px] font-bold text-white/20 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">운영 정책</a>
            <a href="#" className="hover:text-white transition-colors">시스템 모니터링</a>
         </div>
      </footer>
    </div>
  );
}
