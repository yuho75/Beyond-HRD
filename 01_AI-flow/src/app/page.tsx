"use client";

import { Search, User, Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="font-body-md text-on-background min-h-screen bg-background">
      {/* Top Header / Nav */}
      <header className="border-b border-outline/20 sticky top-0 bg-background/90 backdrop-blur-md z-30">
        <div className="max-w-7xl mx-auto px-container-padding flex flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between h-14 text-xs font-technical-sm tracking-wider uppercase border-b border-outline/10 text-on-surface-variant">
            <div className="flex gap-4">
              <span>VOL. 42</span>
              <span>•</span>
              <span>OCT 24, 2024</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="cursor-pointer hover:text-primary transition-colors">LOGIN</span>
              <span className="cursor-pointer hover:text-primary transition-colors">SUBSCRIBE</span>
            </div>
          </div>
          
          {/* Main Nav */}
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4 flex-1">
              <Search className="w-5 h-5 text-on-surface cursor-pointer hover:text-primary transition-colors" />
            </div>
            
            <div className="flex-1 flex justify-center">
              <h1 className="font-headline-lg font-bold text-4xl tracking-tight text-on-surface">AI-flow</h1>
            </div>
            
            <div className="flex-1 flex justify-end gap-6 font-technical-sm text-sm font-semibold tracking-wide text-on-surface-variant">
              <a href="#" className="hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1">POLITICS</a>
              <a href="#" className="hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1">ECONOMY</a>
              <a href="#" className="hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1">WORLD</a>
              <a href="#" className="hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1">TECH</a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-container-padding py-10 flex flex-col lg:flex-row gap-8">
        {/* Left Column - Hero Article */}
        <div className="flex-1 flex flex-col gap-6 lg:pr-8 lg:border-r lg:border-outline/20">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest self-start rounded-sm">
            Cover Story
          </div>
          
          <h2 className="font-display-xl text-5xl md:text-6xl font-bold leading-tight tracking-tight text-on-surface">
            The Dawn of<br />Generative Intelligence
          </h2>
          
          <p className="font-body-lg text-xl leading-relaxed text-on-surface-variant">
            How autonomous agents are restructuring corporate hierarchies and redefining what it means to "work" in the 21st century.
          </p>
          
          <div className="aspect-video bg-surface-container-high rounded-xl overflow-hidden mt-4 shadow-sm border border-outline/10 group cursor-pointer relative">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10"></div>
            <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary/40 font-headline-md">
              [ Hero Image ]
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-2">
            <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden flex items-center justify-center border border-outline/20">
               <User className="w-5 h-5 text-on-surface-variant" />
            </div>
            <div>
              <p className="font-technical-sm font-bold text-sm">By Zippy AI</p>
              <p className="font-technical-sm text-xs text-on-surface-variant">Chief Intelligence Editor</p>
            </div>
          </div>
        </div>

        {/* Right Column - Secondary Content */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-10">
          {/* Subscription Module */}
          <div className="bg-surface-container border border-outline/20 p-6 rounded-xl relative overflow-hidden shadow-sm group hover:border-primary/50 transition-colors">
            {/* Background pattern */}
            <div className="absolute -right-10 -top-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <svg width="150" height="150" viewBox="0 0 100 100" className="text-primary fill-current">
                <circle cx="50" cy="50" r="40" />
              </svg>
            </div>
            
            <h3 className="font-headline-md font-bold text-xl mb-2 relative z-10">Daily Intelligence Brief</h3>
            <p className="font-body-md text-sm text-on-surface-variant mb-6 relative z-10">
              Get the most critical AI developments delivered straight to your inbox before the market opens.
            </p>
            
            <div className="flex flex-col gap-3 relative z-10">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full pl-9 pr-4 py-3 bg-background border border-outline/30 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-body-md"
                />
              </div>
              <button className="w-full py-3 bg-primary text-on-primary font-technical-sm font-bold tracking-wider uppercase text-sm rounded hover:bg-primary-hover active:scale-95 transition-all shadow-md">
                Subscribe Now
              </button>
            </div>
          </div>

          {/* Latest Dispatches */}
          <div>
            <h3 className="font-technical-sm font-bold uppercase tracking-widest text-xs border-b-2 border-primary pb-2 mb-6 inline-block">
              Latest Dispatches
            </h3>
            
            <div className="flex flex-col gap-6">
              {[
                { time: "2 hours ago", title: "OpenAI Announces New Enterprise Integration Tools", tag: "Tech" },
                { time: "5 hours ago", title: "The Economic Impact of Automated Legal Discovery", tag: "Economy" },
                { time: "Yesterday", title: "EU Parliament Passes Comprehensive AI Regulatory Framework", tag: "Politics" }
              ].map((article, i) => (
                <div key={i} className="group cursor-pointer border-b border-outline/10 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-technical-sm text-xs text-primary font-bold">{article.tag}</span>
                    <span className="font-technical-sm text-xs text-on-surface-variant">{article.time}</span>
                  </div>
                  <h4 className="font-headline-md font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                    {article.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-outline/20 mt-12 bg-surface-container py-12">
        <div className="max-w-7xl mx-auto px-container-padding flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-headline-lg font-bold text-2xl text-on-surface">AI-flow</span>
            <span className="font-body-md text-sm text-on-surface-variant">© 2024 AI-flow Media. All rights reserved.</span>
          </div>
          <div className="flex gap-6 font-technical-sm text-sm font-bold text-on-surface-variant">
            <a href="#" className="hover:text-primary transition-colors">About Us</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
