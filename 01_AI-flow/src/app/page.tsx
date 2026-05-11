"use client";

import { ArrowRight, Mail, PlayCircle, MousePointerClick, Sparkles } from "lucide-react";

export default function Home() {
  const youtubers = [
    { name: "AI Explained", topic: "Research & Paper Analysis", tag: "Deep Dive" },
    { name: "Matt Wolfe", topic: "AI Tools & News", tag: "Weekly Wrap" },
    { name: "Two Minute Papers", topic: "Simulations & AI Papers", tag: "Visual AI" },
    { name: "Matthew Berman", topic: "LLMs & Local AI", tag: "Tutorials" },
    { name: "Wes Roth", topic: "AI News & AGI", tag: "News" },
    { name: "Fireship", topic: "Developer News", tag: "Tech" },
  ];

  return (
    <main className="min-h-screen bg-surface text-on-surface">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <Sparkles className="text-white w-4 h-4" />
            </div>
            <span className="font-serif font-bold text-2xl tracking-tight text-primary-container">
              AI Flow
            </span>
          </div>
          <button className="primary-btn text-sm">
            Subscribe
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-lowest border border-outline-variant/30 shadow-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse"></span>
            <span className="text-xs font-bold tracking-wider text-on-surface-variant uppercase">Bi-weekly Curator</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-8 text-primary-container">
            The Digital Archive of <br />
            <span className="text-electric-blue">AI Knowledge.</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant mb-10 leading-relaxed max-w-2xl mx-auto">
            We crawl, analyze, and summarize the top 20 AI creators on YouTube. 
            Get the signal, cut the noise. Delivered to your inbox every two weeks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="primary-btn gap-2 text-lg px-8 py-4">
              <Mail className="w-5 h-5" />
              Join the Archive
            </button>
            <button className="secondary-btn gap-2 text-lg px-8 py-4">
              <PlayCircle className="w-5 h-5" />
              View Latest Summary
            </button>
          </div>
        </div>
      </section>

      {/* Curator Bento Grid */}
      <section className="py-24 bg-surface-container-low px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="font-serif text-4xl font-bold mb-4 text-primary-container">Tracked Creators</h2>
              <p className="text-on-surface-variant text-lg">Monitoring the pulse of artificial intelligence.</p>
            </div>
            <button className="text-electric-blue font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View All 20 <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {youtubers.map((yt, i) => (
              <div 
                key={i} 
                className="bento-card group"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-surface-container text-primary-container text-xs font-bold uppercase tracking-wider">
                    {yt.tag}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline-variant group-hover:bg-electric-blue group-hover:text-white transition-colors duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                
                <h3 className="font-serif text-2xl font-bold mb-3 text-primary-container group-hover:text-electric-blue transition-colors">{yt.name}</h3>
                <p className="text-on-surface-variant text-sm mb-6">{yt.topic}</p>
                
                <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-center">
                  <span className="text-xs text-outline-variant font-medium uppercase tracking-wider">Last updated: 2 hrs ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="bg-primary-container text-white py-24 px-6 text-center relative overflow-hidden">
        {/* Zippy Stamp / Decorative Element */}
        <div className="absolute top-10 right-10 zippy-stamp scale-150 opacity-20 hidden md:flex">
          <MousePointerClick className="w-6 h-6" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Ready to upgrade your AI diet?</h2>
          <p className="text-on-primary-container mb-10 text-xl font-light">Join 10,000+ founders and engineers who read AI Flow.</p>
          <div className="flex flex-col sm:flex-row max-w-lg mx-auto bg-white/10 p-2 rounded-2xl backdrop-blur-sm gap-2">
            <input 
              type="email" 
              placeholder="name@company.com" 
              className="bg-transparent flex-1 px-4 py-3 text-white placeholder-white/60 outline-none"
            />
            <button className="primary-btn shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
