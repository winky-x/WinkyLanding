/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowRight, AudioLines, Eye, Cpu, Star, GitFork, Activity } from 'lucide-react';
import { LiquidButton, MetalButton } from './components/ui/liquid-glass-button';
import { ChatInput } from './components/ui/chat-input';
import { Toaster } from 'sonner';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string>("");
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const headingText = "AI That Sees, Hears, and Acts";
  const words = headingText.split(' ');

  return (
    <div className="min-h-screen relative font-sans text-slate-800">
      <Toaster />
      {/* Background Layer */}
      <div className="stars-container">
        <div className="stars"></div>
      </div>
      <div className="stars-luminescence"></div>

      {/* SECTION 1: HERO CONTAINER */}
      <div className="relative min-h-screen w-full flex items-center justify-center">
        <div className="w-full min-h-screen flex mx-auto">
          <div className="relative flex-1 flex flex-col overflow-hidden">
            {/* Background Video */}
            <video 
              className="absolute inset-0 w-full h-full object-cover z-0" 
              autoPlay 
              loop 
              muted 
              playsInline 
              poster="https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&q=80&w=2000"
            >
              <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260317_100335_dc625816-c3c1-4b00-b93e-4cb301cf5ea5.mp4" type="video/mp4" />
            </video>
            
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[2px] z-10 transition-all duration-1000"></div>

            {/* Navbar inside window */}
            <nav className="relative z-20 flex px-6 py-6 md:px-12 items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="relative flex items-center justify-center w-8 h-8 drop-shadow-[0_0_6px_rgba(250,230,235,0.5)]">
                  <svg viewBox="0 0 100 100" className="w-full h-full" fill="#fdf5f6" stroke="#dcb9be" strokeWidth="1.5" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M 50,10 C 40,30 30,45 10,50 C 30,55 40,70 50,90 C 60,70 70,55 90,50 C 70,45 60,30 50,10 Z M 50,35 C 53,42 58,47 65,50 C 58,53 53,58 50,65 C 47,58 42,53 35,50 C 42,47 47,42 50,35 Z" 
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-xl font-medium text-white tracking-tight">WinkyTalk</span>
              </div>
              
              <div className="hidden md:flex items-center liquid-glass-exact rounded-full px-2 py-1.5">
                <a href="#home" className="relative z-10 px-3.5 py-1.5 text-sm font-medium text-white/90 hover:text-white transition-colors">Home</a>
                <a href="#overview" className="relative z-10 px-3.5 py-1.5 text-sm font-medium text-white/90 hover:text-white transition-colors">Overview</a>
                <a href="#capabilities" className="relative z-10 px-3.5 py-1.5 text-sm font-medium text-white/90 hover:text-white transition-colors">Capabilities</a>
                <a href="#github" className="relative z-10 px-3.5 py-1.5 text-sm font-medium text-white/90 hover:text-white transition-colors">Github</a>
              </div>

              <div>
                <button className="btn-solid-white inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium cursor-pointer hidden sm:flex">
                  Get Started <ArrowRight className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </nav>

            {/* Hero Main Content */}
            <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 pb-20">
              <div className={`liquid-glass-exact px-3 py-2 rounded-full mb-8 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <span className="text-sm font-normal text-white/90">10K+ already subscribed</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-[76px] leading-[0.9] font-heading tracking-[-3px] text-[#120f0f] font-medium max-w-[48rem] mb-7 mx-auto drop-shadow-sm">
                {words.map((word, i) => (
                  <span 
                    key={i} 
                    className="inline-block mr-[0.25em] transition-all text-[#120f0f]"
                    style={{ 
                      opacity: isLoaded ? 1 : 0, 
                      filter: isLoaded ? 'blur(0)' : 'blur(10px)',
                      transform: isLoaded ? 'translateY(0)' : 'translateY(50px)',
                      transitionDelay: `${i * 100}ms`,
                      transitionDuration: '350ms',
                      transitionTimingFunction: 'ease'
                    }}
                  >
                    {word}
                  </span>
                ))}
              </h1>

              <p className={`text-[19px] text-[#241d1d] font-normal max-w-[42rem] tracking-[-0.05em] leading-[1.25] mb-8 mx-auto transition-all duration-600 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-5 blur-md'}`} style={{ transitionDelay: '800ms' }}>
                Interact naturally with a playful, hands-free AI. Command browser action, translate speech in real-time, and control system hardware without lifting a finger.
              </p>
            </div>
            
            {/* Chat Input attached to bottom */}
            <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[42rem] z-30 transition-all duration-600 ease-in-out px-4 ${isLoaded ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-5 blur-md'}`} style={{ transitionDelay: '1100ms' }}>
              <ChatInput 
                value={inputValue}
                onChange={setInputValue}
                onSend={(text, attachments) => { 
                  const url = new URL('https://winkytalk.vercel.app/');
                  if (text) url.searchParams.set('q', text);
                  if (selectedTool) url.searchParams.set('tool', selectedTool);
                  url.searchParams.set('auto_send', 'true');
                  
                  if (attachments && attachments.length > 0) {
                    try {
                      // Attempt to serialize to base64, storing in hash to bypass url limits if possible
                      const att = attachments.map(a => ({ data: a.data, mimeType: a.mimeType }));
                      url.hash = `attachments=${encodeURIComponent(JSON.stringify(att))}`;
                    } catch (e) {
                      console.error("Attachments too large");
                    }
                  }
                  
                  window.location.href = url.toString();
                }}
                voiceMode={voiceMode}
                isMuted={isMuted}
                onMuteChange={setIsMuted}
                selectedTool={selectedTool}
                onToolSelect={setSelectedTool}
              />
            </div>
            
          </div>
        </div>
      </div>

      {/* SECTION 2: VALUE PROPOSITIONS */}
      <section id="capabilities" className="py-24 px-4 sm:px-8 w-full min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <AudioLines className="w-8 h-8 text-blue-500 mb-6" />,
              title: "Natural Voice Agency",
              desc: "Equipped with advanced STT & TTS pipeline, WinkyTalk listens to your natural voice commands, processes the semantic context, and replies instantly."
            },
            {
              icon: <Eye className="w-8 h-8 text-pink-500 mb-6" />,
              title: "Vision & Spatial Awareness",
              desc: "Through direct web camera streams, WinkyTalk sees, object-classifies, and interprets the visual context of its immediate workspace."
            },
            {
              icon: <Cpu className="w-8 h-8 text-green-500 mb-6" />,
              title: "Hardware & Tool Actioning",
              desc: "Beyond browser limits, WinkyTalk interacts with locally connected development nodes, executing script-defined operations with browser-based automation."
            }
          ].map((item, idx) => (
            <div key={idx} className="liquid-glass-panel p-8 rounded-3xl transition-transform hover:-translate-y-1">
              {item.icon}
              <h3 className="text-xl font-medium tracking-tight mb-4 text-slate-900">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: PROOF, TESTIMONIALS & INTEGRATED FORM */}
      <section className="py-16 px-4 sm:px-8 w-full min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200" 
              alt="Hardware interface collaboration" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
          </div>
          
          <div className="flex flex-col justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-300 mb-6">
              <path d="M10 11L8 16H5L7 11V8H10V11ZM19 11L17 16H14L16 11V8H19V11Z" fill="currentColor"/>
            </svg>
            <blockquote className="text-2xl md:text-3xl font-medium tracking-tight leading-tight text-slate-900 mb-8">
              "Integrating WinkyTalk into our hardware pipeline completely changed how our developers interface with physical endpoints. It's the ultimate hand-free web agent."
            </blockquote>
            <p className="text-slate-500 font-medium tracking-wide text-sm uppercase mb-16">
              Alex Rivera, <span className="text-slate-400">Tech Lead @ OpenNodes</span>
            </p>

            <div className="liquid-glass-panel p-8 rounded-3xl bg-white/50">
              <h4 className="text-lg font-medium text-slate-900 mb-6">Experience the Agent</h4>
              <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full bg-white/60 border border-slate-200/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 placeholder:text-slate-400 transition-all"
                />
                <input 
                  type="email" 
                  placeholder="Work Email" 
                  className="w-full bg-white/60 border border-slate-200/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 placeholder:text-slate-400 transition-all"
                />
                <div className="mt-2 text-center w-max">
                  <MetalButton variant="gold" className="w-full px-8 py-6 rounded-xl font-medium tracking-wide">
                    Request Demo Access
                  </MetalButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SHOWCASE */}
      <section id="github" className="py-24 px-4 sm:px-8 w-full min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-medium tracking-tight text-slate-900 mb-16 text-center">
          A Quiet Place to See What's New.
        </h2>
        
        <div className="liquid-glass-panel p-8 md:p-12 rounded-[2.5rem] w-full max-w-4xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="flex flex-col items-start gap-4 flex-1">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
                <span className="font-medium text-sm">winky-x / winkywebagent</span>
              </div>
              <h3 className="text-2xl font-medium text-slate-900 tracking-tight">Open Source Automation Node</h3>
              <p className="text-slate-600 mb-6">Fully inspectable architecture. Check out our open-source browser interface node built for transparent execution and extensibility.</p>
              
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-white/60 rounded-full text-slate-700">
                  <Star className="w-3.5 h-3.5" /> 4.2k
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-white/60 rounded-full text-slate-700">
                  <GitFork className="w-3.5 h-3.5" /> 843
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-white/60 rounded-full text-green-700">
                  <Activity className="w-3.5 h-3.5" /> Active
                </div>
              </div>
            </div>
            
            <div className="shrink-0 pt-4 md:pt-0">
              <LiquidButton variant="outline" className="border-slate-300 text-slate-800 hover:bg-white min-w-[200px] h-14">
                Inspect Repository <ArrowRight className="w-4 h-4 ml-2" />
              </LiquidButton>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 text-center text-slate-500 text-sm">
        <p>© 2026 WinkyTalk Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
