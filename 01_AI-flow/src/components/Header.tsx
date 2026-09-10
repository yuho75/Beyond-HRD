"use client";

import React, { useState, Suspense } from "react";
import { Search, Menu, X, Sparkles, Flame, Bookmark } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const MAIN_CATEGORIES = [
  { name: "AI 기본 활용", href: "/?cat=AI 기본 활용" },
  { name: "AI 업무 자동화", href: "/?cat=AI 업무 자동화" },
  { name: "AI 크리에이티브", href: "/?cat=AI 크리에이티브" },
  { name: "AI 에이전트", href: "/?cat=AI 에이전트" },
  { name: "AI 리더십·트렌드", href: "/?cat=AI 리더십·트렌드" },
  { name: "AI 수익화", href: "/?cat=AI 수익화" },
];

const SPECIAL_MENUS = [
  { name: "컬렉션", href: "/?cat=컬렉션", icon: Bookmark },
  { name: "BEST", href: "/?cat=BEST", icon: Flame },
];

function HeaderContent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCat = searchParams.get("cat");

  const [clickCount, setClickCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [adminPw, setAdminPw] = useState("");

  const handleLogoClick = (e: React.MouseEvent) => {
    const newCount = clickCount + 1;
    if (newCount >= 7) {
      e.preventDefault();
      setShowModal(true);
      setClickCount(0);
    } else {
      setClickCount(newCount);
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
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Left: Logo */}
        <div className="shrink-0 flex items-center">
          <Link href="/" onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer group">
            <img src="/logo.png" alt="AIditor Logo" className="w-8 h-8 rounded group-hover:opacity-80 transition-opacity" />
            <h1 className="font-extrabold tracking-tight text-2xl text-[#f97316]" style={{ fontFamily: 'Inter, sans-serif' }}>
              AIditor
            </h1>
          </Link>
        </div>

        {/* Center: 6 Final Main Categories + 컬렉션 / BEST */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-3.5 text-[13px] xl:text-[14px] font-bold text-gray-700 justify-center whitespace-nowrap">
          {MAIN_CATEGORIES.map((cat) => {
            const isActive = currentCat === cat.name;
            return (
              <Link
                key={cat.name}
                href={cat.href}
                className={`px-1.5 py-1 transition-all rounded hover:text-[#f97316] ${
                  isActive
                    ? "text-[#f97316] border-b-2 border-[#f97316] font-extrabold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {cat.name}
              </Link>
            );
          })}

          {/* Divider */}
          <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>

          {/* Special Menus */}
          {SPECIAL_MENUS.map((menu) => {
            const isActive = currentCat === menu.name;
            const Icon = menu.icon;
            return (
              <Link
                key={menu.name}
                href={menu.href}
                className={`flex items-center gap-1 px-2 py-1 transition-all rounded ${
                  menu.name === "BEST"
                    ? isActive 
                      ? "text-red-600 font-extrabold border-b-2 border-red-500" 
                      : "text-red-500 hover:text-red-600 hover:bg-red-50"
                    : isActive
                      ? "text-[#f97316] font-extrabold border-b-2 border-[#f97316]"
                      : "text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{menu.name}</span>
              </Link>
            );
          })}

          {/* Divider */}
          <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>

          {/* My Page */}
          <Link
            href="/mypage"
            className={`transition-colors text-[#059669] hover:opacity-80 font-bold px-1.5 py-1 ${
              pathname.startsWith("/mypage") ? "border-b-2 border-[#059669]" : ""
            }`}
          >
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
          <div className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">카테고리</div>
          <nav className="flex flex-col gap-3.5 text-sm font-bold text-gray-800 mb-6">
            {MAIN_CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-1 transition-colors hover:text-[#f97316] ${
                  currentCat === cat.name ? "text-[#f97316] font-extrabold" : ""
                }`}
              >
                {cat.name}
              </Link>
            ))}

            <div className="w-full h-[1px] bg-gray-200 my-2"></div>

            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">스페셜</div>
            {SPECIAL_MENUS.map((menu) => (
              <Link
                key={menu.name}
                href={menu.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-1 transition-colors flex items-center gap-1.5 ${
                  menu.name === "BEST" ? "text-red-500" : "text-indigo-600"
                }`}
              >
                <menu.icon className="w-4 h-4" />
                <span>{menu.name}</span>
              </Link>
            ))}

            <div className="w-full h-[1px] bg-gray-200 my-2"></div>

            <Link
              href="/mypage"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 text-[#059669] hover:opacity-80"
            >
              My Page
            </Link>
          </nav>

          <div className="flex flex-col gap-3 mt-auto">
            <button className="w-full text-center text-sm font-medium text-indigo-600 border border-indigo-200 px-4 py-2.5 rounded-lg hover:bg-indigo-50 transition-colors">
              Login
            </button>
            <button className="w-full text-center text-sm font-medium text-white bg-[#f97316] px-4 py-2.5 rounded-lg hover:bg-[#ea580c] transition-colors shadow-sm">
              Subscribe
            </button>
          </div>
        </div>
      )}

      {/* Admin Login Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-80 flex flex-col gap-5">
            <h2 className="text-xl font-bold text-gray-900 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
              Admin Console
            </h2>
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

export default function Header() {
  return (
    <Suspense fallback={<header className="w-full bg-white border-b border-gray-200 h-16" />}>
      <HeaderContent />
    </Suspense>
  );
}
