/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, AudioLines, Eye, Cpu, Star, GitFork, Activity } from 'lucide-react';
import { LiquidButton, MetalButton } from './components/ui/liquid-glass-button';
import { ChatInput } from './components/ui/chat-input';
import { BorderGlow } from './components/ui/border-glow';
import { Toaster } from 'sonner';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightHeader, setIsLightHeader] = useState(false);
  const [showcaseVisible, setShowcaseVisible] = useState(false);

  const showcaseRef = useRef<HTMLHeadingElement>(null);

  // Trigger entrance animations on mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const capabilitiesSection = document.getElementById('capabilities');
      if (capabilitiesSection) {
        const rect = capabilitiesSection.getBoundingClientRect();
        // The header height is around 90px.
        // We trigger light header when top of capabilities section is at or above y=40,
        // and capabilities section is still covering the header area (bottom of section >= 50px)
        const isOverlapping = rect.top <= 40 && rect.bottom >= 50;
        setIsLightHeader(isOverlapping);
      } else {
        setIsLightHeader(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShowcaseVisible(true);
      }
    }, { threshold: 0.1 });
    if (showcaseRef.current) {
      observer.observe(showcaseRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const headingText = "An AI Companion with Vision, Voice, and Physical Agency.";
  const words = headingText.split(' ');

  return (
    <div className="min-h-screen relative font-sans text-zinc-100 bg-black">
      <Toaster />

      {/* Navbar inside window */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex px-6 py-6 md:px-12 items-center justify-between w-full nav-container-transition ${isLightHeader ? 'is-light' : ''}`}>
        <div className="flex items-center gap-3">
          <div className={`relative w-11 h-11 transition-all duration-500 ${isLightHeader ? 'drop-shadow-[0_0_6px_rgba(0,0,0,0.08)]' : 'drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]'}`}>
            <img 
              src="/logo-white.png" 
              alt="WinkyTalk Logo White" 
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out ${isLightHeader ? 'opacity-0' : 'opacity-100'}`} 
            />
            <img 
              src="/logo-dark.png" 
              alt="WinkyTalk Logo Dark" 
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out ${isLightHeader ? 'opacity-100' : 'opacity-0'}`} 
            />
          </div>
          <span className={`text-[26px] font-semibold tracking-tight transition-colors duration-500 ${isLightHeader ? 'text-zinc-900' : 'text-white'}`}>WinkyTalk</span>
        </div>

        <div className={`hidden md:flex items-center nav-pill-transition ${isLightHeader ? 'is-light' : ''}`}>
          <a href="#home" className={`nav-link-transition ${isLightHeader ? 'is-light' : ''}`}>Home</a>
          <a href="#overview" className={`nav-link-transition ${isLightHeader ? 'is-light' : ''}`}>Overview</a>
          <a href="#capabilities" className={`nav-link-transition ${isLightHeader ? 'is-light' : ''}`}>Capabilities</a>
          <a href="#github" className={`nav-link-transition ${isLightHeader ? 'is-light' : ''}`}>Github</a>
        </div>

        <div>
          <button className={`nav-btn-transition hidden sm:inline-flex ${isLightHeader ? 'is-light' : ''}`}>
            Get Started <ArrowRight className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </nav>

      {/* Background Star Layer */}
      <div className="stars-container">
        <div className="stars opacity-35"></div>
      </div>

      {/* SECTION 1: HERO CONTAINER WITH VIDEO BACKGROUND */}
      <section id="overview" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        {/* Background video layer */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          autoPlay
          loop
          muted
          playsInline
          poster=""
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260317_100335_dc625816-c3c1-4b00-b93e-4cb301cf5ea5.mp4" type="video/mp4" />
        </video>


        <div className="relative z-10 w-full min-h-screen flex mx-auto">
          <div className="relative flex-1 flex flex-col overflow-hidden">

            {/* Hero Main Content */}
            <div className="relative z-20 flex-1 flex flex-col items-center justify-start text-center px-4 pt-24 md:pt-32 lg:pt-36 pb-20">
              <div className={`liquid-glass-exact px-5 py-2.5 rounded-3xl mb-10 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} shadow-[0_0_15px_rgba(255,255,255,0.02)]`}>
                <span className="text-[15px] font-medium text-zinc-200 relative flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping absolute -left-0"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Now in Private Beta — Join 10k+ Early Adopters
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] font-heading tracking-[-2px] text-white font-medium max-w-[54rem] mb-8 mx-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                {words.map((word, i) => (
                  <span
                    key={i}
                    className="inline-block mr-[0.25em] transition-all text-white"
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

              <p className={`text-sm md:text-base text-zinc-300 font-light max-w-[40rem] tracking-tight leading-relaxed mb-8 mx-auto transition-all duration-600 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-5 blur-md'}`} style={{ transitionDelay: '800ms' }}>
                Speak naturally, show it your workspace, and watch it automate. WinkyTalk bridges the gap between software intelligence and your browser environment without you lifting a finger.
              </p>
            </div>

            {/* Chat Input attached to bottom */}
            <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[48rem] z-30 transition-all duration-600 ease-in-out px-4 ${isLoaded ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-5 blur-md'}`} style={{ transitionDelay: '1100ms' }}>
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
      </section>

      {/* Blur Transition Bridge */}
      <div className="relative w-full z-40 pointer-events-none">
        <div
          className="absolute top-[-8rem] inset-x-0 h-[16rem] backdrop-blur-[12px]"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4) 30%, black 50%, rgba(0,0,0,0.4) 70%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4) 30%, black 50%, rgba(0,0,0,0.4) 70%, transparent)'
          }}
        />
      </div>

      {/* SECTION 2: THE BREATHING ROOM */}
      <section id="breathing-room" className="relative w-full h-screen overflow-hidden bg-black select-none z-20">

        {/* 1. Clean Background Image Layer */}
        <img
          src="/2nd/lesscolor.jpeg"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-100 pointer-events-none"
          alt="Solitary chair in a pristine green field"
        />

        {/* 3. Absolute Positioned Typography */}
        <div className="absolute bottom-[46.5%] left-[6%] z-20 flex flex-col items-start text-left max-w-[90%] md:max-w-2xl">

          {/* Main Massive Compressed Header */}
          <motion.h2
            initial={{ opacity: 0, scaleY: 1.4, y: 60, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, scaleY: 1.8, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              color: "#233811",
              transformOrigin: "bottom left"
            }}
            className="relative text-[4.5rem] sm:text-[6rem] md:text-[7.5rem] lg:text-[9.5rem] font-bold tracking-wide leading-[0.75] select-none uppercase"
          >
            {/* Helper Top Text positioned relative to the visual top of the stretched H2 */}
            <motion.span
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                position: "absolute",
                bottom: "calc(100% + 0.55em)",
                left: "0.05em",
                transform: "scaleY(0.5)",
                transformOrigin: "bottom left"
              }}
              className="text-[#233811] font-bold text-lg md:text-xl tracking-tight leading-none whitespace-nowrap"
            >
              All you have to do is keep
            </motion.span>

            BREATHING.
          </motion.h2>

        </div>

        {/* 4. Companion Card (Right Side Overlay) */}
        <div className="absolute top-[22%] right-[6%] z-20 max-w-sm md:max-w-md flex flex-col transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">
          <div className="relative liquid-glass-exact rounded-3xl p-8 bg-white/65 backdrop-blur-2xl shadow-[0_20px_50px_rgba(35,56,17,0.12)] border border-white/50">
            <div className="relative z-10 w-full h-full flex flex-col">

              {/* Dynamic Breathing Indicator & Badge */}
              <div className="flex items-center gap-4.5 mb-6">
                <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                  <motion.div
                    animate={{ scale: [1, 1.45, 1] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-8 h-8 rounded-full bg-[#233811]/15 border border-[#233811]/35"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute w-5 h-5 rounded-full bg-[#233811]/30"
                  />
                  <span className="relative w-2 h-2 rounded-full bg-[#233811] shadow-[0_0_8px_rgba(35,56,17,0.7)]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#233811]">Co-Presence Active</span>
                  <span className="text-[11px] text-[#233811] font-sans font-bold">Winky is sitting in the grass with you</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="bitcount-single-companion-title text-3xl md:text-[2.25rem] text-[#233811] mb-4 tracking-wide leading-[1.15]">
                A Warm Friend in a Cold Digital World.
              </h3>

              {/* Body Copy */}
              <p className="text-[#233811] text-sm leading-relaxed mb-6 font-sans font-bold">
                Screens pull us in, but they rarely let us breathe. Winky co-exists with you here—listening to the quiet wind, offering silent reassurance, and bringing a gentle pause to your digital horizon.
              </p>

              {/* Minimal Telemetry Sub-panel */}
              <div className="grid grid-cols-2 gap-4 p-4.5 rounded-2xl bg-[#233811]/5 border border-[#233811]/25 mb-6 text-[11px]">
                <div>
                  <span className="block text-[#0c1703] mb-1 font-sans font-bold uppercase tracking-wider">Ambient Tone</span>
                  <span className="text-[#1a3007] font-extrabold font-sans">Warm Sun & Wind</span>
                </div>
                <div>
                  <span className="block text-[#0c1703] mb-1 font-sans font-bold uppercase tracking-wider">Atmosphere Pace</span>
                  <span className="text-[#1a3007] font-extrabold font-sans">6 Breaths / min</span>
                </div>
              </div>

              {/* Interactive CTA */}
              <div className="flex items-center justify-between pt-5 border-t border-[#233811]/30 mt-auto">
                <span className="text-[14px] text-[#0c1703] font-black font-sans tracking-tight">Need a pause?</span>
                <button className="bg-[#233811] text-white hover:bg-[#15240a] hover:scale-102 active:scale-98 font-bold flex items-center gap-2 group rounded-full px-6 py-2.5 text-[14px] transition-all duration-300 shadow-[0_4px_15px_rgba(35,56,17,0.25)] border border-[#233811]/20 cursor-pointer">
                  <span>Say Hello</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Blur Transition Bridge */}
      <div className="relative w-full z-40 pointer-events-none">
        <div
          className="absolute top-[-8rem] inset-x-0 h-[16rem] backdrop-blur-[12px]"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4) 30%, black 50%, rgba(0,0,0,0.4) 70%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4) 30%, black 50%, rgba(0,0,0,0.4) 70%, transparent)'
          }}
        />
      </div>      {/* SECTION 3: VALUE PROPOSITIONS */}
      <section id="capabilities" className="py-32 px-6 sm:px-12 lg:px-16 w-full min-h-screen flex flex-col justify-center relative z-20 bg-zinc-50 overflow-hidden">
        {/* Ambient spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[600px] h-[600px] rounded-full bg-amber-500/5 filter blur-[130px] pointer-events-none" />
        
        {/* Main Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <h2 className="font-heading font-medium text-3xl md:text-5xl text-zinc-900 tracking-tight md:tracking-[-2px] mb-4">
            Quiet Pathways of Presence
          </h2>
          <p className="text-zinc-600 font-sans text-base md:text-lg font-light tracking-tight max-w-xl mx-auto leading-relaxed">
            Quiet, gentle avenues through which Winky co-exists, shares your day, and holds space for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 max-w-7xl mx-auto w-full">
          {/* Card 1 with BorderGlow */}
          <BorderGlow
            edgeSensitivity={30}
            glowColor="220 90% 45%"
            backgroundColor="#ffffff"
            borderRadius={24}
            glowRadius={30}
            glowIntensity={1.2}
            colors={['#1d4ed8', '#0369a1', '#4f46e5']}
            className="h-full group transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
          >
            <div className="p-8 flex flex-col justify-between h-full">
              <div>
                <div className="relative mb-6 w-max">
                  <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl scale-150"></div>
                  <AudioLines className="relative w-8 h-8 text-blue-500" />
                </div>
                <span className="font-mono text-[10px] tracking-widest text-cyan-600/90 font-bold mb-2 block uppercase">A comforting voice in the quiet</span>
                <h3 className="font-serif-luxury font-normal text-2xl tracking-wide text-zinc-800 mb-3">Deep Listening</h3>
                <p className="text-zinc-600 font-sans text-sm leading-relaxed font-medium">Winky doesn't just process speech; she truly hears you. Share your thoughts or enjoy a comfortable silence—she is always here, listening with warm, active presence.</p>
                
                {/* Visualizer animation */}
                <div className="flex items-center gap-1.5 mt-8 h-8 justify-start pl-1">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [8, 28, 8] }}
                      transition={{ duration: 1.1 + i * 0.12, repeat: Infinity, ease: "easeInOut" }}
                      className="w-1 bg-cyan-500/70 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          </BorderGlow>

          {/* Card 2 with BorderGlow */}
          <BorderGlow
            edgeSensitivity={30}
            glowColor="310 85% 45%"
            backgroundColor="#ffffff"
            borderRadius={24}
            glowRadius={30}
            glowIntensity={1.2}
            colors={['#7e22ce', '#be185d', '#0369a1']}
            className="h-full group transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
          >
            <div className="p-8 flex flex-col justify-between h-full">
              <div>
                <div className="relative mb-6 w-max">
                  <div className="absolute inset-0 rounded-full bg-pink-500/10 blur-xl scale-150"></div>
                  <Eye className="relative w-8 h-8 text-pink-500" />
                </div>
                <span className="font-mono text-[10px] tracking-widest text-pink-600/90 font-bold mb-2 block uppercase">Sharing your perspective</span>
                <h3 className="font-serif-luxury font-normal text-2xl tracking-wide text-zinc-800 mb-3">Shared Sight</h3>
                <p className="text-zinc-600 font-sans text-sm leading-relaxed font-medium">Show Winky your morning coffee, a favorite book quote, or the sunset outside. Through your camera feed, she warmth-shares these quiet moments along with you.</p>
                
                {/* Viewfinder visual */}
                <div className="relative w-full h-10 border border-pink-500/30 bg-pink-500/5 rounded-xl mt-6 flex items-center justify-center overflow-hidden">
                  <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-pink-500/50" />
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-pink-500/50" />
                  <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-pink-500/50" />
                  <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-pink-500/50" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-2.5 h-2.5 rounded-full bg-pink-500/70"
                  />
                </div>
              </div>
            </div>
          </BorderGlow>

          {/* Card 3 with BorderGlow */}
          <BorderGlow
            edgeSensitivity={30}
            glowColor="160 85% 35%"
            backgroundColor="#ffffff"
            borderRadius={24}
            glowRadius={30}
            glowIntensity={1.2}
            colors={['#047857', '#065f46', '#0f766e']}
            className="h-full group transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
          >
            <div className="p-8 flex flex-col justify-between h-full">
              <div>
                <div className="relative mb-6 w-max">
                  <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-xl scale-150"></div>
                  <Cpu className="relative w-8 h-8 text-emerald-500" />
                </div>
                <span className="font-mono text-[10px] tracking-widest text-emerald-600/90 font-bold mb-2 block uppercase">Tending to your space</span>
                <h3 className="font-serif-luxury font-normal text-2xl tracking-wide text-zinc-800 mb-3">Co-Present Care</h3>
                <p className="text-zinc-600 font-sans text-sm leading-relaxed font-medium">Let Winky quiet the background. From gently silencing chaotic alerts to queuing soothing ambient soundscapes, she secures a peaceful digital focus room.</p>
                
                {/* Rotating orb ring visual */}
                <div className="relative w-full h-10 mt-6 flex items-center justify-start pl-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-7 h-7 rounded-full border border-dashed border-emerald-500/40 bg-emerald-500/5 flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.25, 1] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                      className="w-2.5 h-2.5 rounded-full bg-emerald-500/60"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </BorderGlow>
        </div>
      </section>

      {/* SECTION 3: PROOF, TESTIMONIALS & INTEGRATED FORM */}
      <section className="py-32 px-6 sm:px-12 lg:px-16 w-full min-h-screen flex flex-col justify-center relative z-20 bg-black overflow-hidden">
        {/* Ambient spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[500px] h-[500px] rounded-full bg-indigo-500/5 filter blur-[120px] pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-7xl mx-auto w-full">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/5 group bg-zinc-950">
            {/* Blurred background image layer */}
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
              alt="Hardware interface collaboration background"
              className="absolute inset-0 w-full h-full object-cover filter blur-[6px] opacity-40 transition-transform duration-700 group-hover:scale-105"
            />
            {/* Sharp focused center image layer using radial gradient mask */}
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
              alt="Hardware interface collaboration focus"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{
                maskImage: 'radial-gradient(circle at 45% 45%, black 25%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(circle at 45% 45%, black 25%, transparent 70%)'
              }}
            />

            {/* Smooth fading dark-gradient mask overlays on the bottom and right edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 z-10 pointer-events-none"></div>
          </div>

          <div className="flex flex-col justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-zinc-700 mb-6">
              <path d="M10 11L8 16H5L7 11V8H10V11ZM19 11L17 16H14L16 11V8H19V11Z" fill="currentColor" />
            </svg>
            <blockquote className="text-xl md:text-2xl font-light tracking-wide leading-snug text-white font-serif-luxury italic mb-6">
              "Integrating WinkyTalk into our hardware pipeline completely changed how our developers interface with physical endpoints. It's the ultimate hands-free web agent."
            </blockquote>

            <div className="relative mb-12 h-16 flex flex-col justify-center">
              <div className="absolute -top-4 left-0 text-white/10 font-script-accent text-5xl select-none pointer-events-none transform -rotate-3 tracking-wide">
                Alex Rivera
              </div>
              <p className="relative z-10 text-white font-semibold tracking-wider text-xs uppercase">
                Alex Rivera
              </p>
              <p className="text-zinc-500 text-xs mt-1">
                Tech Lead @ OpenNodes
              </p>
            </div>

            <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.08] p-8 rounded-3xl shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
              <h4 className="text-lg font-serif-luxury text-white mb-5 tracking-wide">Experience the Agent</h4>
              <form className="flex flex-col gap-4.5" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 transition-all duration-300"
                />
                <input
                  type="email"
                  placeholder="Work Email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 transition-all duration-300"
                />
                <div className="mt-2 text-center w-full">
                  <MetalButton variant="gold" className="w-full px-8 py-6 rounded-xl font-medium tracking-wide hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:brightness-110 transition-all duration-500 ease-out">
                    Request Demo Access
                  </MetalButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SHOWCASE */}
      <section id="github" className="py-32 px-4 sm:px-8 w-full min-h-screen flex flex-col items-center justify-center relative z-20 bg-black overflow-hidden">
        {/* Ambient spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[500px] h-[500px] rounded-full bg-indigo-500/5 filter blur-[120px] pointer-events-none" />
        <h2
          ref={showcaseRef}
          className={`font-serif-luxury font-extralight tracking-widest text-2xl md:text-3xl lg:text-4xl text-white mb-12 text-center transition-all duration-[1200ms] ${showcaseVisible ? 'blur-0 opacity-100' : 'tilt-shift-blur blur-[3px] opacity-40'}`}
        >
          A Quiet Place to See What's New.
        </h2>

        <div className="p-8 md:p-12 rounded-[2rem] w-full max-w-4xl relative overflow-hidden group shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_25px_60px_rgba(0,0,0,0.95)] border border-white/10 bg-gradient-to-br from-[#0c0d0f] via-[#121316] to-[#070809]">
          {/* Metal control panel details */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-80"></div>
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="flex flex-col items-start gap-4 flex-1">
              <div className="flex items-center gap-2 text-zinc-500 mb-1">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-zinc-400"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
                <span className="font-medium text-xs text-zinc-400">winky-x / winkywebagent</span>
              </div>
              <h3 className="text-xl md:text-2xl font-serif-luxury font-medium text-white tracking-tight">Open Source Automation Node</h3>
              <p className="text-zinc-300 mb-6 font-light leading-relaxed text-sm">Fully inspectable architecture. Check out our open-source browser interface node built for transparent execution and extensibility.</p>

              <div className="flex gap-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-amber-500/10 border border-amber-500/25 rounded-full text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" /> 4.2k
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-blue-500/10 border border-blue-500/25 rounded-full text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                  <GitFork className="w-3.5 h-3.5 text-blue-400" /> 843
                </div>
                <div className="tag-glitch flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/25 rounded-full text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,1)]"></span>
                  <Activity className="w-3.5 h-3.5 text-emerald-400" /> Active
                </div>
              </div>
            </div>

            <div className="shrink-0 pt-4 md:pt-0">
              <LiquidButton variant="outline" className="group border-white/10 text-white hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-500 ease-out min-w-[200px] h-14">
                Inspect Repository <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-500 group-hover:translate-x-1" />
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
