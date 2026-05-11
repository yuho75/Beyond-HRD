"use client";

import { BookOpen, Lightbulb, TrendingUp, Users, ArrowRight, MousePointerClick } from "lucide-react";

export default function Home() {
  const modules = [
    {
      title: "AI Learning Hub",
      desc: "Master prompt engineering, fine-tuning, and practical implementations.",
      icon: <BookOpen className="w-6 h-6" />,
      tag: "Education",
    },
    {
      title: "Business Ideas",
      desc: "Curated, high-potential AI business models and execution guides.",
      icon: <Lightbulb className="w-6 h-6" />,
      tag: "Strategy",
    },
    {
      title: "Civilization Insights",
      desc: "Deep analysis on the societal impact of the lightweight civilization shift.",
      icon: <TrendingUp className="w-6 h-6" />,
      tag: "Research",
    },
    {
      title: "Company PR",
      desc: "Discover top AI startups, tools, and enterprise solutions.",
      icon: <Users className="w-6 h-6" />,
      tag: "Ecosystem",
    }
  ];

  return (
    <main className="min-h-screen bg-surface text-on-surface">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Original Logo preserved */}
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <span className="font-sans font-bold text-xl text-white">R</span>
            </div>
            <span className="font-serif font-bold text-2xl tracking-tight text-primary-container">
              AI Root
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-on-surface-variant font-medium text-sm">
            <a href="#" className="hover:text-primary-container transition-colors">Learning</a>
            <a href="#" className="hover:text-primary-container transition-colors">Ideas</a>
            <a href="#" className="hover:text-primary-container transition-colors">Insights</a>
            <a href="#" className="hover:text-primary-container transition-colors">Companies</a>
          </div>
          <button className="primary-btn text-sm">
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-lowest border border-outline-variant/30 shadow-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-green animate-pulse"></span>
            <span className="text-xs font-bold tracking-wider text-on-surface-variant uppercase">The Foundation of AI</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-8 text-primary-container">
            Rooted in <br />
            <span className="text-emerald-green">Intelligence.</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant mb-10 leading-relaxed max-w-2xl mx-auto">
            Your comprehensive ecosystem for AI education, innovative business models, and strategic insights for the lightweight civilization.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="primary-btn gap-2 text-lg px-8 py-4">
              Explore Modules
            </button>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="py-24 bg-surface-container-low px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="font-serif text-4xl font-bold mb-4 text-primary-container">Core Modules</h2>
              <p className="text-on-surface-variant text-lg">Navigating the next era of technological advancement.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((mod, i) => (
              <div 
                key={i} 
                className="bento-card group flex flex-col justify-between min-h-[240px]"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-surface-container text-primary-container text-xs font-bold uppercase tracking-wider">
                    {mod.tag}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-outline-variant group-hover:bg-emerald-green group-hover:text-white transition-colors duration-300">
                    {mod.icon}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-3 text-primary-container group-hover:text-emerald-green transition-colors">{mod.title}</h3>
                  <p className="text-on-surface-variant text-base mb-6 leading-relaxed">{mod.desc}</p>
                </div>
                
                <div className="pt-4 border-t border-outline-variant/20 flex justify-end items-center">
                  <ArrowRight className="w-5 h-5 text-outline-variant group-hover:text-emerald-green group-hover:-translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insight Banner */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-primary-container rounded-[2rem] p-12 md:p-20 relative overflow-hidden text-center text-white">
          <div className="absolute top-10 right-10 zippy-stamp scale-150 opacity-20 hidden md:flex">
            <MousePointerClick className="w-6 h-6" />
          </div>
          
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 relative z-10">Join the AI Vanguard</h2>
          <p className="text-on-primary-container mb-10 text-xl font-light max-w-2xl mx-auto relative z-10">
            Promote your AI enterprise, share your insights, and connect with a network of forward-thinking innovators.
          </p>
          <button className="primary-btn relative z-10 px-10 py-4 text-lg">
            Register Company
          </button>
        </div>
      </section>
    </main>
  );
}
