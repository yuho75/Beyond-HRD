"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [clickCount, setClickCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
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
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-1 flex items-center">
          <Link href="/" onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer group">
            <img src="/logo.png" alt="AIditor Logo" className="w-8 h-8 rounded group-hover:opacity-80 transition-opacity" />
            <h1 className="font-extrabold tracking-tight text-2xl text-[#f97316]" style={{ fontFamily: 'Inter, sans-serif' }}>AIditor</h1>
          </Link>
        </div>

        {/* Center: Nav Menu */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-4 xl:gap-6 text-[9px] lg:text-[10px] xl:text-[11px] font-bold uppercase tracking-widest text-gray-400 flex-1 justify-center whitespace-nowrap">
          <Link href="/category/commerce" className={`transition-colors hover:text-gray-900 ${pathname.includes("/commerce") ? "text-gray-900 border-b-2 border-[#f97316] pb-1" : ""}`}>
            Commerce
          </Link>
          <Link href="/category/education" className={`transition-colors hover:text-gray-900 ${pathname.includes("/education") ? "text-gray-900 border-b-2 border-[#f97316] pb-1" : ""}`}>
            Education
          </Link>
          <Link href="/category/media" className={`transition-colors hover:text-gray-900 ${pathname.includes("/media") ? "text-gray-900 border-b-2 border-[#f97316] pb-1" : ""}`}>
            Media
          </Link>
          <Link href="/category/lifestyle" className={`transition-colors hover:text-gray-900 ${pathname.includes("/lifestyle") ? "text-gray-900 border-b-2 border-[#f97316] pb-1" : ""}`}>
            Lifestyle
          </Link>
          <Link href="/category/business" className={`transition-colors hover:text-gray-900 ${pathname.includes("/business") ? "text-gray-900 border-b-2 border-[#f97316] pb-1" : ""}`}>
            Business
          </Link>

          <div className="w-[1px] h-3 bg-gray-300"></div>

          <Link href="/category/insights" className={`transition-colors hover:text-gray-900 ${pathname.includes("/insights") ? "text-gray-900 border-b-2 border-[#f97316] pb-1" : ""}`}>
            Insights
          </Link>

          <div className="w-[1px] h-3 bg-gray-300"></div>

          <Link href="/mypage" className={`transition-colors text-[#059669] hover:opacity-80 ${pathname.startsWith("/mypage") ? "border-b-2 border-[#059669] pb-1" : ""}`}>
            My Page
          </Link>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <Search className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-900" />
          <button className="text-sm font-medium text-indigo-600 border border-indigo-200 px-4 py-1.5 rounded hover:bg-indigo-50 transition-colors cursor-pointer">
            Login
          </button>
          <button className="text-sm font-medium text-white bg-[#f97316] px-4 py-1.5 rounded hover:bg-[#ea580c] transition-colors shadow-sm cursor-pointer">
            Subscribe
          </button>
        </div>
      </div>

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
