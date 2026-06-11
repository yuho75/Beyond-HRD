import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-auto py-8">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-8">
          <span className="font-extrabold text-xl text-[#f97316]" style={{ fontFamily: 'Inter, sans-serif' }}>AIditor</span>
          <div className="hidden md:flex gap-4 text-xs font-semibold text-gray-500">
            <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Contact Us</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Editorial Guidelines</a>
          </div>
        </div>
        <div>
          <span className="text-xs text-gray-400">© 2024 AIditor. Editorial Modernism for the Informed Mind.</span>
        </div>
      </div>
    </footer>
  );
}
