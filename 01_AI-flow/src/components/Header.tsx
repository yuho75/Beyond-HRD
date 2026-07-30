"use client";

import React, { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [clickCount, setClickCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [adminPw, setAdminPw] = useState("");

  const handleLogoClick = (e: React.MouseEvent) => {
    const newCount = clickCount + 1;
    if (newCount >= 7) {
      e.preventDefault(); // Prevent navigating to "/" when triggering modal
      setShowModal(true);
      setClickCount(0);
    } else {
      setClickCount(newCount);
      // Reset click count after 2 seconds if not clicked again
      setTimeout(() => {
        setClickCount((prev) => (prev === newCount ? 0 : prev));
      }, 2000);
    }
  };

  const handleAdminLogin = () => {
    if (adminId === "admin" && adminPw === "admin123") {
      setShowModal(false);
      setAdminId("");
      setAdminPw("");
      router.push("/admin");
    } else {
      alert("Invalid ID or Password.");
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <div className="shrink-0 flex items-center">
          <Link href="/" onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer group">
            <img src="/logo.png" alt="AIditor Logo" className="w-8 h-8 rounded group-hover:opacity-80 transition-opacity" />
            <h1 className="font-extrabold tracking-tight text-2xl text-[#f97316]" style={{ fontFamily: 'Inter, sans-serif' }}>AIditor</h1>
          </Link>
        </div>

        {/* Center: Nav Menu (No scrollbar, full space) */}
        <nav className="hidden lg:flex items-center gap-4.5 text-[13px] xl:text-[14px] font-bold text-gray-700 justify-center whitespace-nowrap">
          <Link href="/category/c1" className={`transition-colors hover:text-[#f97316] ${pathname.includes("/c1") ? "text-[#f97316] border-b-2 border-[#f97316] pb-1" : ""}`}>
            AI/업무생산성
          </Link>
          <Link href="/category/c2" className={`transition-colors hover:text-[#f97316] ${pathname.includes("/c2") ? "text-[#f97316] border-b-2 border-[#f97316] pb-1" : ""}`}>
            업무자동화
          </Link>
          <Link href="/category/c3" className={`transition-colors hover:text-[#f97316] ${pathname.includes("/c3") ? "text-[#f97316] border-b-2 border-[#f97316] pb-1" : ""}`}>
            AI에이전트
          </Link>
          <Link href="/category/c4" className={`transition-colors hover:text-[#f97316] ${pathname.includes("/c4") ? "text-[#f97316] border-b-2 border-[#f97316] pb-1" : ""}`}>
            업무스킬
          </Link>
          <Link href="/category/c5" className={`transition-colors hover:text-[#f97316] ${pathname.includes("/c5") ? "text-[#f97316] border-b-2 border-[#f97316] pb-1" : ""}`}>
            AI CREATIVE
          </Link>
          <Link href="/category/c6" className={`transition-colors hover:text-[#f97316] ${pathname.includes("/c6") ? "text-[#f97316] border-b-2 border-[#f97316] pb-1" : ""}`}>
            AX전략
          </Link>
          <Link href="/category/c7" className={`transition-colors hover:text-[#f97316] ${pathname.includes("/c7") ? "text-[#f97316] border-b-2 border-[#f97316] pb-1" : ""}`}>
            비즈니스
          </Link>

          <div className="w-[1px] h-3 bg-gray-300 mx-1"></div>

          <Link href="/mypage" className={`transition-colors text-[#059669] hover:opacity-80 ${pathname.startsWith("/mypage") ? "border-b-2 border-[#059669] pb-1" : ""}`}>
            My Page
          </Link>
        </nav>

        {/* Right: Actions & Mobile Menu Toggle */}
        <div className="shrink-0 flex items-center gap-3">
          <Search className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-900" />
          <button className="hidden md:block text-xs lg:text-sm font-semibold text-indigo-600 border border-indigo-200 px-3 py-1.5 rounded hover:bg-indigo-50 transition-colors cursor-pointer">
            Login
          </button>
          <button className="hidden md:block text-xs lg:text-sm font-semibold text-white bg-[#f97316] px-3.5 py-1.5 rounded hover:bg-[#ea580c] transition-colors shadow-sm cursor-pointer">
            Subscribe
          </button>
          {/* Mobile Hamburger Button */}
          <button 
            className="lg:hidden p-1 text-gray-600 hover:text-gray-900 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 flex flex-col p-6 overflow-y-auto">
          <nav className="flex flex-col gap-5 text-sm font-bold text-gray-700 mb-8">
            <Link href="/category/c1" onClick={() => setIsMobileMenuOpen(false)} className={`transition-colors hover:text-[#f97316] ${pathname.includes("/c1") ? "text-[#f97316]" : ""}`}>AI/업무생산성</Link>
            <Link href="/category/c2" onClick={() => setIsMobileMenuOpen(false)} className={`transition-colors hover:text-[#f97316] ${pathname.includes("/c2") ? "text-[#f97316]" : ""}`}>생성형 AI & 업무자동화</Link>
            <Link href="/category/c3" onClick={() => setIsMobileMenuOpen(false)} className={`transition-colors hover:text-[#f97316] ${pathname.includes("/c3") ? "text-[#f97316]" : ""}`}>AI 에이전트 & 바이브코딩</Link>
            <Link href="/category/c4" onClick={() => setIsMobileMenuOpen(false)} className={`transition-colors hover:text-[#f97316] ${pathname.includes("/c4") ? "text-[#f97316]" : ""}`}>일잘러의 업무스킬 (오피스·문서)</Link>
            <Link href="/category/c5" onClick={() => setIsMobileMenuOpen(false)} className={`transition-colors hover:text-[#f97316] ${pathname.includes("/c5") ? "text-[#f97316]" : ""}`}>AI CREATIVE (이미지·영상)</Link>
            <Link href="/category/c6" onClick={() => setIsMobileMenuOpen(false)} className={`transition-colors hover:text-[#f97316] ${pathname.includes("/c6") ? "text-[#f97316]" : ""}`}>리더십 & AX 전략</Link>
            <Link href="/category/c7" onClick={() => setIsMobileMenuOpen(false)} className={`transition-colors hover:text-[#f97316] ${pathname.includes("/c7") ? "text-[#f97316]" : ""}`}>비즈니스 & 커리어 (수익화)</Link>
            <div className="w-12 h-[1px] bg-gray-200"></div>
            <Link href="/mypage" onClick={() => setIsMobileMenuOpen(false)} className={`transition-colors text-[#059669] hover:opacity-80 ${pathname.startsWith("/mypage") ? "text-[#059669]" : ""}`}>My Page</Link>
          </nav>

          <div className="flex flex-col gap-4 mt-auto">
            <button className="w-full text-center text-sm font-medium text-indigo-600 border border-indigo-200 px-4 py-3 rounded-lg hover:bg-indigo-50 transition-colors">
              Login
            </button>
            <button className="w-full text-center text-sm font-medium text-white bg-[#f97316] px-4 py-3 rounded-lg hover:bg-[#ea580c] transition-colors shadow-sm">
              Subscribe
            </button>
          </div>
        </div>
      )}

      {/* Admin Login Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-80 flex flex-col gap-5">
            <h2 className="text-xl font-bold text-gray-900 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>Admin Console</h2>
            <div className="flex flex-col gap-3">
              <input 
                type="text" 
                placeholder="Admin ID" 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f97316] focus:bg-white transition-colors"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
              />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f97316] focus:bg-white transition-colors"
                value={adminPw}
                onChange={(e) => setAdminPw(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
              />
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAdminLogin}
                className="px-6 py-2 text-sm font-bold bg-[#f97316] text-white rounded-lg hover:bg-[#ea580c] transition-colors shadow-sm"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
