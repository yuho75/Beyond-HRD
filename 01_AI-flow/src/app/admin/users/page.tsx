"use client";

import { 
  Search, 
  Users, 
  ChevronDown, 
  MoreVertical, 
  Mail, 
  ShieldCheck, 
  Trophy, 
  History, 
  RefreshCcw, 
  FileText, 
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Share2,
  Database,
  FileEdit,
  UserCircle,
  Settings,
  Terminal,
  Plus,
  Minus,
  CheckCircle2
} from "lucide-react";
import { useState } from "react";

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState<'users' | 'newsletter'>('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const users = [
    { id: 'user_0921', nickname: 'Zippy Root Admin', email: 'zippy@a-zip.com', credits: 2488, joined: '2024.01.12', status: 'Active' },
    { id: 'alpha_tester', nickname: 'Alpha', email: 'alpha@test.com', credits: 1250, joined: '2024.03.22', status: 'Active' },
    { id: 'newbie_01', nickname: 'Newbie', email: 'hello@world.com', credits: 450, joined: '2024.05.01', status: 'Pending' },
    { id: 'dev_zippy', nickname: 'Developer Z', email: 'dev@a-zip.com', credits: 5600, joined: '2023.12.15', status: 'Active' },
    { id: 'user_5521', nickname: 'Content Lover', email: 'clover@mail.com', credits: 890, joined: '2024.06.10', status: 'Banned' },
  ];

  return (
    <div className="font-body-md text-gray-900 min-h-screen bg-[#f8f9fa] flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (Consistent with Admin Dashboard) */}
        <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shrink-0">
          <div className="p-8">
            <a href="/" className="flex items-center gap-4 mb-12 group cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-emerald-tech flex items-center justify-center group-hover:scale-105 transition-transform">
                <Terminal className="text-black w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-sm">A-Zip Admin</h2>
                <p className="text-[10px] text-gray-500 font-technical-sm uppercase tracking-widest">통합 관리 시스템 V3.0</p>
              </div>
            </a>

            <nav className="flex flex-col gap-2">
              <div className="mb-4">
                <a href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-500 font-bold text-sm transition-all cursor-pointer">
                  <LayoutDashboard className="w-4 h-4" />
                  대시보드
                </a>
              </div>

              <div className="flex flex-col gap-1">
                {[
                  { name: '콘텐츠 피드 관리', icon: <Share2 className="w-4 h-4" />, href: "#" },
                  { name: 'LMS 코스 관리', icon: <Database className="w-4 h-4" />, href: "#" },
                  { name: '통합 콘텐츠 에디터', icon: <FileEdit className="w-4 h-4" />, href: "/admin/editor" },
                  { name: '사용자 및 서비스 관리', icon: <Users className="w-4 h-4" />, active: true, href: "/admin/users" },
                ].map((item, i) => (
                  <a 
                    key={i} 
                    href={item.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm cursor-pointer ${
                      item.active ? 'bg-gray-50 text-emerald-tech border border-emerald-tech/20' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {item.name}
                    </div>
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-10 bg-[#f8f9fa]">
          <div className="max-w-7xl mx-auto flex flex-col gap-10">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">사용자 및 서비스 관리</h1>
                <p className="text-xs text-gray-500 font-technical-sm uppercase tracking-widest">User Directory & Service Orchestration</p>
              </div>
              <div className="flex bg-white rounded-xl p-1 border border-gray-200">
                <button 
                  onClick={() => setActiveTab('users')}
                  className={`px-6 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'users' ? "bg-emerald-tech text-black" : "text-gray-500 hover:text-gray-900"}`}
                >
                  회원 관리
                </button>
                <button 
                  onClick={() => setActiveTab('newsletter')}
                  className={`px-6 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'newsletter' ? "bg-emerald-tech text-black" : "text-gray-500 hover:text-gray-900"}`}
                >
                  뉴스레터 (스티비)
                </button>
              </div>
            </div>

            {activeTab === 'users' ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* User List Table */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                      type="text" 
                      placeholder="닉네임 또는 이메일로 검색..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-sm text-gray-900 focus:ring-1 focus:ring-emerald-tech outline-none"
                    />
                  </div>

                  <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-2xl">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-200 bg-white/2">
                          <th className="p-6 text-[10px] text-gray-400 uppercase tracking-widest font-technical-sm">User Identity</th>
                          <th className="p-6 text-[10px] text-gray-400 uppercase tracking-widest font-technical-sm">Credits</th>
                          <th className="p-6 text-[10px] text-gray-400 uppercase tracking-widest font-technical-sm">Joined</th>
                          <th className="p-6 text-[10px] text-gray-400 uppercase tracking-widest font-technical-sm">Status</th>
                          <th className="p-6"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.filter(u => u.nickname.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())).map((user, i) => (
                          <tr 
                            key={i} 
                            onClick={() => setSelectedUser(user)}
                            className={`border-b border-gray-200 hover:bg-white/2 transition-colors cursor-pointer ${selectedUser?.id === user.id ? 'bg-gray-50' : ''}`}
                          >
                            <td className="p-6">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-300">
                                  <UserCircle className="w-6 h-6 text-gray-500" />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-gray-900">{user.nickname}</p>
                                  <p className="text-[10px] text-gray-400 font-technical-sm">{user.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-6">
                              <span className="text-sm font-bold text-emerald-tech">{user.credits.toLocaleString()} pt</span>
                            </td>
                            <td className="p-6">
                              <span className="text-xs text-gray-400 font-technical-sm">{user.joined}</span>
                            </td>
                            <td className="p-6">
                               <span className={`text-[9px] font-bold px-2 py-1 rounded uppercase ${
                                 user.status === 'Active' ? 'text-emerald-tech bg-emerald-tech/10' :
                                 user.status === 'Pending' ? 'text-blue-400 bg-blue-400/10' : 'text-red-400 bg-red-400/10'
                               }`}>{user.status}</span>
                            </td>
                            <td className="p-6 text-right">
                               <MoreVertical className="w-4 h-4 text-gray-400 inline-block" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Side Panel: User Detail & Control */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  {selectedUser ? (
                    <div className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col gap-8 shadow-2xl animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-tech/20 to-blue-500/20 flex items-center justify-center border border-gray-300">
                           <UserCircle className="w-10 h-10 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{selectedUser.nickname}</h3>
                          <p className="text-xs text-gray-500">{selectedUser.id}</p>
                        </div>
                      </div>

                      {/* Credit Control */}
                      <div className="flex flex-col gap-4">
                        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-emerald-tech" />
                          학점(CREDIT) 제어
                        </h4>
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col gap-6">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">현재 보유 학점</span>
                            <span className="text-2xl font-bold text-gray-900">{selectedUser.credits.toLocaleString()} <span className="text-xs text-gray-400 uppercase">pt</span></span>
                          </div>
                          <div className="flex gap-2">
                            <button className="flex-1 py-3 bg-emerald-tech/10 hover:bg-emerald-tech/20 border border-emerald-tech/30 rounded-xl text-emerald-tech text-xs font-bold flex items-center justify-center gap-2 transition-all">
                              <Plus className="w-4 h-4" /> 지급
                            </button>
                            <button className="flex-1 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-xs font-bold flex items-center justify-center gap-2 transition-all">
                              <Minus className="w-4 h-4" /> 차감
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* History Preview */}
                      <div className="flex flex-col gap-4">
                        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                          <History className="w-4 h-4 text-blue-400" />
                          학습 및 관심 이력
                        </h4>
                        <div className="flex flex-col gap-3">
                          {[
                            { title: 'Generative AI Overview', date: '2시간 전', type: 'Complete' },
                            { title: 'Next.js 14 Architecture', date: '1일 전', type: 'Bookmark' },
                            { title: 'SaaS Business Model', date: '3일 전', type: 'Complete' }
                          ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/2 rounded-xl border border-gray-200">
                               <div className="flex flex-col gap-0.5">
                                 <p className="text-xs font-bold text-gray-900 truncate max-w-[180px]">{item.title}</p>
                                 <p className="text-[10px] text-gray-400">{item.date}</p>
                               </div>
                               <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${item.type === 'Complete' ? 'text-emerald-tech bg-emerald-tech/10' : 'text-[#c5b3f9] bg-[#c5b3f9]/10'}`}>{item.type}</span>
                            </div>
                          ))}
                        </div>
                        <button className="text-center py-2 text-[10px] font-bold text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-widest">View Full History</button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white border border-gray-200 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center text-center gap-4 h-[600px]">
                      <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
                        <Users className="w-8 h-8 text-gray-900/10" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-500">회원을 선택해 주세요</h3>
                        <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">상세 프로필 조회 및 학점 제어,<br />학습 이력 모니터링이 가능합니다.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Newsletter Tab Content */
              <div className="max-w-4xl mx-auto w-full flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-emerald-tech" />
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Stibee Sync Status</h3>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-tech" />
                    </div>
                    <div className="flex flex-col gap-2">
                       <div className="flex items-end justify-between">
                         <span className="text-[10px] text-gray-500 uppercase font-technical-sm tracking-widest">Total Subscribers</span>
                         <span className="text-3xl font-bold text-gray-900">4,821</span>
                       </div>
                       <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden">
                         <div className="h-full bg-emerald-tech w-[85%]"></div>
                       </div>
                       <p className="text-[10px] text-gray-400 text-right mt-1">Last Sync: 2024.11.20 14:00</p>
                    </div>
                    <button className="w-full py-4 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-2xl flex items-center justify-center gap-3 transition-all group">
                       <RefreshCcw className="w-4 h-4 text-emerald-tech group-hover:rotate-180 transition-transform duration-500" />
                       <span className="text-xs font-bold text-gray-900">주소록 강제 동기화</span>
                    </button>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-400" />
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Newsletter Automation</h3>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      최신 콘텐츠를 기반으로 격주 뉴스레터 초안을 자동으로 생성합니다.
                    </p>
                    <div className="mt-auto flex flex-col gap-3">
                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-between">
                         <span className="text-[10px] text-gray-600 font-bold">11월 4주차 초안</span>
                         <span className="text-[9px] font-bold px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded uppercase">Ready</span>
                      </div>
                      <button className="w-full py-4 bg-emerald-tech text-black rounded-2xl flex items-center justify-center gap-3 font-bold text-xs hover:bg-emerald-tech/90 transition-all">
                         <Plus className="w-4 h-4" /> 새로운 뉴스레터 초안 생성
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-3xl p-8">
                  <h3 className="text-sm font-bold text-gray-900 mb-8 border-l-4 border-emerald-tech pl-4">최근 뉴스레터 발송 이력</h3>
                  <div className="flex flex-col gap-4">
                     {[
                       { title: '생성형 AI가 바꾸는 마케팅의 미래', date: '2024.11.06', openRate: '42.5%', clickRate: '12.8%' },
                       { title: '10월 4주차 비즈니스 아이디어 리포트', date: '2024.10.23', openRate: '38.2%', clickRate: '9.4%' }
                     ].map((item, i) => (
                       <div key={i} className="flex items-center justify-between p-6 bg-white/2 rounded-2xl border border-gray-200 group hover:border-gray-300 transition-all cursor-pointer">
                          <div className="flex flex-col gap-1">
                            <h4 className="text-sm font-bold text-gray-900 group-hover:text-emerald-tech transition-colors">{item.title}</h4>
                            <p className="text-[10px] text-gray-400 font-technical-sm">{item.date} 발송 완료</p>
                          </div>
                          <div className="flex gap-8">
                             <div className="flex flex-col items-end">
                               <span className="text-[10px] text-gray-400 uppercase font-technical-sm">Open</span>
                               <span className="text-xs font-bold text-emerald-tech">{item.openRate}</span>
                             </div>
                             <div className="flex flex-col items-end">
                               <span className="text-[10px] text-gray-400 uppercase font-technical-sm">Click</span>
                               <span className="text-xs font-bold text-blue-400">{item.clickRate}</span>
                             </div>
                             <ChevronRight className="w-4 h-4 text-gray-400 self-center" />
                          </div>
                       </div>
                     ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
