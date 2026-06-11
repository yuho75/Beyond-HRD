"use client";

import React from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-1 flex items-center">
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <img src="/logo.png" alt="AI-flow Logo" className="w-8 h-8 rounded group-hover:opacity-80 transition-opacity" />
            <h1 className="font-extrabold tracking-tight text-2xl text-[#f97316]" style={{ fontFamily: 'Inter, sans-serif' }}>AI-flow</h1>
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
          <Link href="/admin" className={`transition-colors text-[#059669] hover:opacity-80 ${pathname.startsWith("/admin") ? "border-b-2 border-[#059669] pb-1" : ""}`}>
            Admin
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
    </header>
  );
}
