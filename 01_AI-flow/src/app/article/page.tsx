"use client";

import { Play, Share2, Bookmark, MessageSquare, Send, Globe, Link2 } from "lucide-react";

export default function ArticleDetail() {
  return (
    <main className="max-w-[800px] w-full px-6 py-16 flex flex-col items-center">
      
      {/* Article Metadata */}
      <div className="w-full flex flex-col items-center text-center mb-12">
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded">TECH</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span>Oct 25, 2024</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span>By Alex Mercer</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-12 leading-[1.1]" style={{ fontFamily: 'Inter, sans-serif' }}>
          The Dawn of Generative Intelligence: Beyond the Hype
        </h1>

        {/* Featured Image / Video Placeholder */}
        <div className="w-full aspect-video rounded-3xl overflow-hidden relative group cursor-pointer mb-16 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600" 
            alt="AI Neural Network" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
            <div className="w-20 h-20 bg-[#f97316] rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <Play className="text-white fill-white w-8 h-8 ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Zippy's Summary Box */}
      <section className="w-full bg-white border border-gray-100 rounded-3xl p-8 mb-16 shadow-sm relative overflow-hidden">

        <div className="flex items-center gap-3 mb-6">

          <h3 className="font-bold text-[#f97316] text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Zippy's 3-Line Summary</h3>
        </div>
        <ul className="flex flex-col gap-4">
          {[
            "Generative AI is shifting from a novelty creation tool to a core productivity engine integrated across all professional workflows.",
            "The true value lies not in replacement, but in 'collaborative intelligence'—where human creativity is augmented by machine processing.",
            "Sustainability and ethical data sourcing are emerging as the next critical hurdles for mass-market adoption in 2025."
          ].map((text, i) => (
            <li key={i} className="flex gap-4 items-start text-sm text-gray-600 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] mt-2 shrink-0"></span>
              {text}
            </li>
          ))}
        </ul>
      </section>

      {/* Article Content */}
      <article className="w-full text-lg text-gray-700 leading-relaxed font-body-md flex flex-col gap-10">
        <p>
          The landscape of artificial intelligence has undergone a seismic shift. What began as an experimental frontier of chatbots and image generators has rapidly matured into a sophisticated layer of global digital infrastructure. As we look beyond the initial wave of excitement, a more profound transformation is taking root—one that redefines our relationship with computation and creativity.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-4" style={{ fontFamily: 'Inter, sans-serif' }}>The Shift in Productivity</h2>

        <p>
          For decades, productivity software required humans to master complex interfaces—spreadsheets, design canvases, and code editors. Today, generative intelligence is flipping that script. Natural language is becoming the universal interface, allowing users to describe intent while the system manages execution.
        </p>

        <p>
          This transition is most evident in software engineering, where Large Language Models (LLMs) are now responsible for generating significant portions of boilerplate code. Developers are evolving into architects and reviewers, focusing on high-level system design while AI handles the syntactic heavy lifting. This isn't just about speed; it's about reducing the cognitive load that once barred millions from participating in the digital economy.
        </p>

        <div className="my-8 py-8 px-10 border-l-4 border-[#f97316] bg-gray-50 rounded-r-2xl italic text-xl text-gray-800">
          "We are moving from a world of tools that do what we tell them, to a world of agents that understand what we need."
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-4" style={{ fontFamily: 'Inter, sans-serif' }}>Creative Collaboration</h2>

        <p>
          Perhaps the most debated impact of AI is in the creative sector. Critics argue that generative models threaten the soul of artistic expression, while proponents see them as the ultimate "force multiplier" for imagination. The reality is settling somewhere in between: a new era of hybrid creation.
        </p>

        <p>
          Consider the modern design workflow. A designer might use AI to rapidly prototype twenty different visual directions in an afternoon—a task that previously took weeks. This doesn't replace the designer's eye; rather, it allows them to explore the "possibility space" with unprecedented breadth. The designer still makes the final choice, refines the nuances, and ensures the output aligns with human emotional resonance.
        </p>

        <p>
          As we move forward, the "Dawn of Generative Intelligence" will be marked not by the machines themselves, but by the new heights of human achievement they facilitate. The hype may fade, but the utility is only beginning to be understood.
        </p>
      </article>

      {/* Article Footer / Engagement */}
      <div className="w-full border-t border-gray-100 mt-20 pt-10 flex flex-col sm:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest cursor-pointer">
            <MessageSquare className="w-4 h-4" /> 12 Comments
          </button>
          <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest cursor-pointer">
            <Bookmark className="w-4 h-4" /> Save Article
          </button>
        </div>
        
        <div className="flex items-center gap-3">
           <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mr-2">Share</span>
           <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-900/20 hover:bg-gray-900/5 transition-all cursor-pointer">
             <Send className="w-4 h-4" />
           </button>
           <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-900/20 hover:bg-gray-900/5 transition-all cursor-pointer">
             <Globe className="w-4 h-4" />
           </button>
           <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-900/20 hover:bg-gray-900/5 transition-all cursor-pointer">
             <Link2 className="w-4 h-4" />
           </button>
        </div>
      </div>
    </main>
  );
}
