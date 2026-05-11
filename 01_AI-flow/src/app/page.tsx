"use client";

import { Search } from "lucide-react";

export default function Home() {
  const latestDispatches = [
    { tag: "Hardware", title: "The Silicon Squeeze: A Global Update", date: "Oct 23, 2024", color: "bg-indigo-100 text-indigo-700" },
    { tag: "Software", title: "Open Source AI: A New Paradigm", date: "Oct 22, 2024", color: "bg-orange-100 text-orange-700" },
    { tag: "Robotics", title: "Boston Dynamics Drops New Model", date: "Oct 21, 2024", color: "bg-slate-100 text-slate-700" },
    { tag: "Policy", title: "EU AI Act: What You Need to Know", date: "Oct 20, 2024", color: "bg-red-100 text-red-700" },
    { tag: "Hardware", title: "TSMC Earnings Report Breakdown", date: "Oct 19, 2024", color: "bg-indigo-100 text-indigo-700" },
    { tag: "Software", title: "New Transformer Architecture Detailed", date: "Oct 18, 2024", color: "bg-orange-100 text-orange-700" },
    { tag: "Robotics", title: "Agility Robotics Secures Series C", date: "Oct 17, 2024", color: "bg-slate-100 text-slate-700" },
    { tag: "Policy", title: "Copyright Claims in the GenAI Era", date: "Oct 16, 2024", color: "bg-red-100 text-red-700" },
    { tag: "Hardware", title: "Nvidia's Next Move", date: "Oct 15, 2024", color: "bg-indigo-100 text-indigo-700" },
    { tag: "Software", title: "Fine-Tuning Strategies Analyzed", date: "Oct 14, 2024", color: "bg-orange-100 text-orange-700" },
    { tag: "Robotics", title: "Automation in Agriculture", date: "Oct 13, 2024", color: "bg-slate-100 text-slate-700" },
    { tag: "Policy", title: "The Ethics of AI in Hiring", date: "Oct 12, 2024", color: "bg-red-100 text-red-700" }
  ];

  return (
    <div className="font-body-md text-on-background min-h-screen bg-[#f8f9fa] flex flex-col items-center">
      
      {/* Top Header / Nav */}
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="AI-flow Logo" className="w-8 h-8 rounded" />
              <h1 className="font-extrabold tracking-tight text-2xl text-[#f97316]" style={{ fontFamily: 'Inter, sans-serif' }}>AI-flow</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600">
              <a href="#" className="hover:text-gray-900 transition-colors">Politics</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Economy</a>
              <a href="#" className="hover:text-gray-900 transition-colors">World</a>
              <a href="#" className="text-gray-900 border-b-2 border-[#f97316] pb-[2px]">Tech</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Science</a>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <Search className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-900" />
            <button className="text-sm font-medium text-indigo-600 border border-indigo-200 px-4 py-1.5 rounded hover:bg-indigo-50 transition-colors">
              Login
            </button>
            <button className="text-sm font-medium text-white bg-[#f97316] px-4 py-1.5 rounded hover:bg-[#ea580c] transition-colors shadow-sm">
              Subscribe
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-[1200px] px-6 py-8 flex flex-col gap-8">
        
        {/* Hero Section */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-10 items-center">
          <div className="w-full md:w-1/2 aspect-[4/3] rounded-xl overflow-hidden bg-gray-900 relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-red-900/40 to-transparent mix-blend-overlay"></div>
             {/* Placeholder for the red cube abstract image */}
             <div className="w-full h-full flex items-center justify-center text-white/20">
               [Hero Image: Red Cubes]
             </div>
          </div>
          
          <div className="w-full md:w-1/2 flex flex-col justify-center py-6 pr-6">
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-full self-start mb-4">
              Featured Report
            </span>
            <h2 className="font-display-xl text-4xl md:text-5xl font-bold leading-tight text-gray-900 mb-6">
              The Dawn of<br />Generative<br />Intelligence
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-md">
              How new foundation models are reshaping the global economy and what it means for the future of work.
            </p>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <div className="w-6 h-6 bg-gray-400 rounded-full opacity-50"></div>
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900">Alex Mercer</p>
                <p className="text-xs text-gray-500">Oct 24, 2024</p>
              </div>
            </div>
          </div>
        </section>

        {/* Zippy Subscription Banner */}
        <section className="bg-[#ffedd5] rounded-2xl p-8 border border-orange-100 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-sm">
          {/* Faint Zippy background icon */}
          <div className="absolute -right-10 -bottom-10 opacity-20 pointer-events-none">
            <img src="/zippy.png" alt="Zippy Face Background" className="w-[200px] h-[200px] object-contain opacity-20" />
          </div>
          
          <div className="w-16 h-16 shrink-0 bg-white rounded-full shadow-sm flex items-center justify-center z-10 overflow-hidden p-2">
            <img src="/zippy.png" alt="Zippy Face" className="w-full h-full object-contain" />
          </div>
          
          <div className="flex-1 z-10">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Hello, I'm Zippy!</h3>
            <p className="text-sm text-orange-900/80 max-w-lg">
              Get the sharpest AI insights delivered directly to your inbox every morning. No fluff, just the signal.
            </p>
          </div>
          
          <div className="flex w-full md:w-auto gap-2 z-10">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-2.5 rounded border border-orange-200 focus:outline-none focus:ring-2 focus:ring-[#f97316] w-full md:w-64 text-sm bg-white"
            />
            <button className="px-6 py-2.5 bg-[#f97316] text-white font-bold text-sm rounded shadow-sm hover:bg-[#ea580c] transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </section>

        {/* Latest Dispatches Grid */}
        <section className="mt-4">
          <div className="flex items-end justify-between mb-6 pb-2 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Latest Dispatches</h2>
            <button className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
              View All
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestDispatches.map((article, i) => (
              <div key={i} className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col">
                <div className="h-40 bg-gray-900 relative">
                   <div className="w-full h-full flex items-center justify-center text-white/10 text-xs">
                     [Card Image]
                   </div>
                   <div className={`absolute top-3 left-3 ${article.color} text-[10px] px-2 py-0.5 font-bold uppercase rounded`}>
                     {article.tag}
                   </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-[15px] leading-tight text-gray-900 mb-6 group-hover:text-[#f97316] transition-colors">
                    {article.title}
                  </h3>
                  <div className="mt-auto">
                    <span className="text-xs text-gray-400 font-medium">{article.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-[1200px] mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-8">
            <span className="font-bold text-xl text-gray-900">The Pulse</span>
            <div className="hidden md:flex gap-4 text-xs font-semibold text-gray-500">
              <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Contact Us</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Editorial Guidelines</a>
            </div>
          </div>
          <div>
            <span className="text-xs text-gray-400">© 2024 The Pulse. Editorial Modernism for the Informed Mind.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
