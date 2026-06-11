"use client";

import { 
  Terminal, 
  UserCircle, 
  Layout, 
  Bookmark, 
  TrendingUp, 
  Settings,
  ChevronRight,
  CreditCard,
  Mail,
  ShieldCheck,
  User,
  Trash2,
  ToggleLeft,
  ToggleRight
} from "lucide-react";
import { useState } from "react";

export default function AccountSettings() {
  const [newsletterEnabled, setNewsletterEnabled] = useState(true);

  return (
    <div className="font-body-md text-gray-900 min-h-screen bg-[#f8f9fa] flex flex-col text-gray-100">
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
        <aside className="w-72 bg-[#131313] border-r border-gray-200 flex flex-col shrink-0">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-10 p-4 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c5b3f9] to-[#8a63f2] flex items-center justify-center">
                <Settings className="text-black w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">A-Zip User</p>
                <p className="text-[10px] text-purple-400 font-technical-sm uppercase tracking-widest">Account & Settings</p>
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              {[
                { name: '개인화 대시보드', icon: <Layout className="w-4 h-4" />, href: "/mypage" },
                { name: '나의 학습 저장소', icon: <Bookmark className="w-4 h-4" />, href: "/mypage/vault" },
                { name: '성장 리포트', icon: <TrendingUp className="w-4 h-4" />, href: "/mypage/growth" },
                { name: '계정 및 구독 관리', icon: <Settings className="w-4 h-4" />, href: "/mypage/settings", active: true },
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
          <div className="max-w-4xl mx-auto flex flex-col gap-10">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">계정 및 구독 관리</h1>
              <p className="text-gray-500 text-sm">멤버십 상태를 확인하고 개인 설정을 변경할 수 있습니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Membership Status */}
              <section className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <CreditCard className="w-5 h-5 text-[#c5b3f9]" />
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Membership Plan</h3>
                  </div>
                  <div className="bg-gray-50 border border-[#c5b3f9]/20 rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-[#c5b3f9] uppercase tracking-widest bg-[#c5b3f9]/10 px-2 py-0.5 rounded">Standard</span>
                      <span className="text-xs text-gray-500">다음 결제일: 2024.12.15</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">₩ 9,900 / <span className="text-sm text-gray-500">month</span></p>
                  </div>
                </div>
                <button className="w-full py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold transition-all">
                  멤버십 업그레이드 / 변경
                </button>
              </section>

              {/* Newsletter Settings */}
              <section className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <Mail className="w-5 h-5 text-[#c5b3f9]" />
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Newsletter (Stibee)</h3>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-2xl">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-bold text-gray-900">격주 뉴스레터 수신</p>
                      <p className="text-[10px] text-gray-500">A-Zip의 새로운 아이디어와 테크 리포트를 받아보세요.</p>
                    </div>
                    <button 
                      onClick={() => setNewsletterEnabled(!newsletterEnabled)}
                      className="transition-colors"
                    >
                      {newsletterEnabled ? (
                        <ToggleRight className="w-10 h-10 text-[#c5b3f9] cursor-pointer" />
                      ) : (
                        <ToggleLeft className="w-10 h-10 text-gray-700 cursor-pointer" />
                      )}
                    </button>
                  </div>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed mt-6">
                  * 스티비(Stibee)를 통해 매달 2회 발송됩니다. 수신 거부 시 주요 업데이트 알림을 받지 못할 수 있습니다.
                </p>
              </section>
            </div>

            {/* Account Settings */}
            <section className="bg-white border border-gray-200 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-10">
                <ShieldCheck className="w-5 h-5 text-[#c5b3f9]" />
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">General Account Settings</h3>
              </div>
              
              <div className="flex flex-col gap-1">
                {[
                  { label: '닉네임 수정', icon: <User className="w-4 h-4" />, value: 'Zippy Root Admin' },
                  { label: '비밀번호 변경', icon: <Settings className="w-4 h-4" />, value: '********' },
                  { label: '이메일 주소', icon: <Mail className="w-4 h-4" />, value: 'zippy@a-zip.com' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-5 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer group border-b border-gray-200 last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="text-gray-600 group-hover:text-[#c5b3f9] transition-colors">{item.icon}</div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">{item.label}</span>
                        <span className="text-sm text-gray-900 font-medium">{item.value}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-gray-900 transition-colors" />
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-10 border-t border-gray-200 flex items-center justify-between px-5">
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-bold text-gray-900">서비스 탈퇴</p>
                  <p className="text-[10px] text-gray-600">계정을 삭제하면 모든 학습 이력과 학점이 소멸됩니다.</p>
                </div>
                <button className="flex items-center gap-2 text-xs font-bold text-red-500/60 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                  탈퇴하기
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
