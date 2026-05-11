"use client";

import { ArrowRight, Mail, PlayCircle, Sparkles } from "lucide-react";

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
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--color-on-surface)] font-inter">
      {/* Navigation */}
      <nav className="fixed w-full z-50 glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full tech-gradient flex items-center justify-center">
              <Sparkles className="text-white w-4 h-4" />
            </div>
            <span className="font-jakarta font-bold text-xl tracking-tight text-[var(--color-primary)]">
              AI Flow
            </span>
          </div>
          <button className="bg-[var(--color-secondary-container)] text-[#666600] px-6 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-transform duration-200">
            Subscribe
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface-lowest)] shadow-sm mb-8 ghost-border">
            <span className="w-2 h-2 rounded-full bg-[var(--color-secondary-container)] animate-pulse"></span>
            <span className="text-xs font-bold tracking-wider text-[var(--color-on-surface-variant)] uppercase">Bi-weekly Curator</span>
          </div>
          <h1 className="font-jakarta text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight mb-8">
            The Digital Archive of <br />
            <span className="text-[var(--color-primary)]">AI Knowledge.</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-on-surface-variant)] mb-10 leading-relaxed max-w-2xl">
            We crawl, analyze, and summarize the top 20 AI creators on YouTube. 
            Get the signal, cut the noise. Delivered to your inbox every two weeks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center gap-2 tech-gradient text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
              <Mail className="w-5 h-5" />
              Join the Archive
            </button>
            <button className="flex items-center justify-center gap-2 bg-[var(--color-surface-lowest)] text-[var(--color-primary)] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors ghost-border">
              <PlayCircle className="w-5 h-5" />
              View Latest Summary
            </button>
          </div>
        </div>
      </section>

      {/* Curator Grid */}
      <section className="py-24 bg-[var(--color-surface-low)] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="font-jakarta text-3xl font-bold mb-4">Tracked Creators</h2>
              <p className="text-[var(--color-on-surface-variant)]">Monitoring the pulse of artificial intelligence.</p>
            </div>
            <button className="text-[var(--color-primary)] font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View All 20 <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {youtubers.map((yt, i) => (
              <div 
                key={i} 
                className="bg-[var(--color-surface-lowest)] rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary-fixed)] rounded-bl-full -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform"></div>
                
                <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-secondary-container)] text-[#666600] text-xs font-bold mb-6">
                  {yt.tag}
                </span>
                
                <h3 className="font-jakarta text-xl font-bold mb-2">{yt.name}</h3>
                <p className="text-[var(--color-on-surface-variant)] text-sm">{yt.topic}</p>
                
                <div className="mt-8 pt-6 border-t border-[var(--color-outline-variant)] border-opacity-20 flex justify-between items-center">
                  <span className="text-xs text-[var(--color-on-surface-variant)] font-medium">Last updated: 2 hrs ago</span>
                  <div className="w-8 h-8 rounded-full bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-primary)]">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="tech-gradient text-white py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-jakarta text-4xl font-bold mb-6">Ready to upgrade your AI diet?</h2>
          <p className="text-[#bfc2ff] mb-10 text-lg">Join 10,000+ founders and engineers who read AI Flow.</p>
          <div className="flex max-w-md mx-auto bg-white/10 p-2 rounded-2xl backdrop-blur-sm">
            <input 
              type="email" 
              placeholder="name@company.com" 
              className="bg-transparent flex-1 px-4 text-white placeholder-white/50 outline-none"
            />
            <button className="bg-[var(--color-secondary-container)] text-[#666600] px-6 py-3 rounded-xl font-bold">
              Subscribe
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
