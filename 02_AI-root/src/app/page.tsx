"use client";

import { BookOpen, Lightbulb, TrendingUp, Users, ArrowRight } from "lucide-react";

export default function Home() {
  const modules = [
    {
      title: "AI Learning Hub",
      desc: "Master prompt engineering, fine-tuning, and practical implementations.",
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-[#e0e0ff]", // primary_fixed
      textColor: "text-[#00006e]" // on_primary_fixed
    },
    {
      title: "Business Ideas",
      desc: "Curated, high-potential AI business models and execution guides.",
      icon: <Lightbulb className="w-6 h-6" />,
      color: "bg-[#eaea00]", // secondary_fixed
      textColor: "text-[#1d1d00]" // on_secondary_fixed
    },
    {
      title: "Civilization Insights",
      desc: "Deep analysis on the societal impact of the lightweight civilization shift.",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-[#ffdad4]", // tertiary_fixed
      textColor: "text-[#410000]" // on_tertiary_fixed
    },
    {
      title: "Company PR",
      desc: "Discover top AI startups, tools, and enterprise solutions.",
      icon: <Users className="w-6 h-6" />,
      color: "bg-[#ffffff]", // surface_container_lowest
      textColor: "text-[#00004c]" // primary
    }
  ];

  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--color-on-surface)] font-inter">
      {/* Navigation */}
      <nav className="fixed w-full z-50 glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] flex items-center justify-center shadow-lg">
              <span className="font-jakarta font-bold text-xl text-white">R</span>
            </div>
            <span className="font-jakarta font-bold text-xl tracking-tight text-[var(--color-primary)]">
              AI Root
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[var(--color-on-surface-variant)] font-medium text-sm">
            <a href="#" className="hover:text-[var(--color-primary)] transition-colors">Learning</a>
            <a href="#" className="hover:text-[var(--color-primary)] transition-colors">Ideas</a>
            <a href="#" className="hover:text-[var(--color-primary)] transition-colors">Insights</a>
            <a href="#" className="hover:text-[var(--color-primary)] transition-colors">Companies</a>
          </div>
          <button className="bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-transform duration-200">
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto relative">
        <div className="absolute right-0 top-20 w-[500px] h-[500px] bg-[var(--color-primary-fixed)] rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[60vh]">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-secondary-container)] text-[#666600] font-bold text-xs uppercase tracking-wider mb-8">
              The Foundation of AI
            </div>
            <h1 className="font-jakarta text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight mb-8">
              Rooted in <br/>
              <span className="text-[var(--color-primary)]">Intelligence.</span>
            </h1>
            <p className="text-lg text-[var(--color-on-surface-variant)] mb-10 leading-relaxed max-w-lg">
              Your comprehensive ecosystem for AI education, innovative business models, and strategic insights for the lightweight civilization.
            </p>
            
            <div className="flex items-center gap-4">
              <button className="tech-gradient text-white px-8 py-4 rounded-xl font-bold text-lg hover:-translate-y-1 transition-transform shadow-xl shadow-[var(--color-primary-container)]/20">
                Explore Modules
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 relative">
            {modules.map((mod, i) => (
              <div 
                key={i}
                className={`${mod.color} ${mod.textColor} p-8 rounded-3xl ${i % 2 !== 0 ? 'mt-12' : ''} hover:scale-105 transition-transform duration-300 shadow-sm`}
              >
                <div className="mb-6 opacity-80">{mod.icon}</div>
                <h3 className="font-jakarta text-xl font-bold mb-3">{mod.title}</h3>
                <p className="text-sm opacity-80 leading-relaxed">{mod.desc}</p>
                <div className="mt-8 flex justify-end">
                  <ArrowRight className="w-5 h-5 opacity-50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insight Banner */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-[var(--color-primary-container)] rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden text-center text-white">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          <h2 className="font-jakarta text-4xl md:text-5xl font-bold mb-6 relative z-10">Join the AI Vanguard</h2>
          <p className="text-xl text-[#bfc2ff] mb-10 max-w-2xl mx-auto relative z-10">
            Promote your AI enterprise, share your insights, and connect with a network of forward-thinking innovators.
          </p>
          <button className="bg-[var(--color-secondary-container)] text-[#666600] px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform duration-200 relative z-10 shadow-xl shadow-[#e7e700]/20">
            Register Company
          </button>
        </div>
      </section>
    </main>
  );
}
