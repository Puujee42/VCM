"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { 
  Trophy, Clock, Calendar, MapPin, ArrowUpRight, Activity, 
  CheckCircle2, Shield, Zap, MoreHorizontal, ChevronRight, Loader2,
  Settings, Plane, Globe
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useLanguage } from "../context/LanguageContext";

// --- BRAND CONFIG ---
const BRAND = {
  RED: "#E31B23",
  RED_SOFT: "rgba(227, 27, 35, 0.1)",
  GREEN: "#00C896",
  GREEN_SOFT: "rgba(0, 200, 150, 0.1)",
};

// --- SUB-COMPONENT: THEMED CARD ---
const DashboardCard = ({ children, className = "", delay = 0, isDark }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className={`relative backdrop-blur-xl border rounded-[2.5rem] p-6 overflow-hidden transition-all duration-500 group
      ${isDark 
        ? "bg-[#0F172A]/60 border-white/5 shadow-2xl shadow-black/40 hover:border-white/10" 
        : "bg-white border-slate-100 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(227,27,35,0.1)] hover:border-slate-200"} 
      ${className}`}
  >
    {/* Subtle Inner Glow on Hover */}
    <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:to-[${BRAND.RED_SOFT}] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
    {children}
  </motion.div>
);

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const { language: lang } = useLanguage();
  const { theme } = useTheme();
  
  const [mounted, setMounted] = useState(false);
  const [greeting, setGreeting] = useState("");
  
  // Mock Data (Replace with API later)
  const data = {
    profile: {
      fullName: user?.firstName ? `${user.firstName} ${user.lastName || ''}` : "Traveler",
      status: "Verified Member",
      id: "MEMBER-2025"
    },
    stats: {
      level: "Explorer",
      nextLevel: "Globetrotter",
      points: 750,
      targetPoints: 1000,
      hours: 12,
      badges: [1, 2, 3]
    },
    nextEvent: {
      title: { en: "Visa Workshop", mn: "Визний Зөвлөгөө" },
      date: "2025-02-15T14:00:00",
      location: { en: "Main Office", mn: "Төв Оффис" }
    },
    recentActivity: [
      { type: "event", title: "Joined 'German Club'", date: "2025-01-20", points: 50 },
      { type: "doc", title: "Uploaded Passport", date: "2025-01-18", points: 100 },
    ]
  };

  useEffect(() => setMounted(true), []);
  const isDark = mounted && (theme === "dark" || !theme);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting(lang === 'mn' ? "Өглөөний мэнд" : "Good Morning");
    else if (hour < 18) setGreeting(lang === 'mn' ? "Өдрийн мэнд" : "Good Afternoon");
    else setGreeting(lang === 'mn' ? "Оройн мэнд" : "Good Evening");
  }, [lang]);

  if (!mounted || !isLoaded) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-700 ${isDark ? "bg-[#0F172A]" : "bg-[#FAFAFA]"}`}>
        <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 animate-spin" style={{ color: BRAND.RED }} />
            <p className={`text-xs font-black uppercase tracking-[0.2em] ${isDark ? "text-slate-500" : "text-slate-400"}`}>Loading Experience...</p>
        </div>
      </div>
    );
  }

  const progressPercent = Math.min((data.stats.points / data.stats.targetPoints) * 100, 100);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(lang === 'mn' ? 'mn-MN' : 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 pt-28 pb-12 px-6 overflow-x-hidden font-sans selection:bg-[#E31B23] selection:text-white
      ${isDark ? "bg-[#0F172A] text-white" : "bg-[#FAFAFA] text-slate-900"}`}>
      
      {/* --- ATMOSPHERE --- */}
      <div className="absolute inset-0 pointer-events-none fixed">
         {/* Red Accent Blob */}
         <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[200px] opacity-[0.05]" style={{ backgroundColor: BRAND.RED }} />
         {/* Green Accent Blob */}
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.05]" style={{ backgroundColor: BRAND.GREEN }} />
         <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center gap-3 mb-2">
                 <div className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_#00C896]" style={{ backgroundColor: BRAND.GREEN }} />
                 <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: BRAND.GREEN }}>
                    {lang === 'mn' ? 'ИДЭВХТЭЙ ГИШҮҮН' : 'ACTIVE MEMBER'}
                 </p>
              </div>
              <h1 className={`text-4xl md:text-6xl font-black tracking-tighter leading-none mb-1
                ${isDark ? "text-white" : "text-slate-900"}`}>
                 {greeting}, <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${BRAND.RED}, #FF6B6B)` }}>
                    {data.profile.fullName}
                 </span>
              </h1>
           </motion.div>

           <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-3">
              <Link href="/events" className="group relative px-8 py-4 rounded-2xl overflow-hidden transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1" style={{ backgroundColor: BRAND.RED, boxShadow: `0 10px 20px -5px ${BRAND.RED_SOFT}` }}>
                 <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                 <span className="relative z-10 text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                    <Calendar size={14} />
                    {lang === 'mn' ? 'Арга Хэмжээ' : 'Schedule'}
                 </span>
              </Link>
              <button className={`p-4 border rounded-2xl transition-all active:scale-95 group
                ${isDark ? "border-white/10 hover:bg-white/5 text-white" : "border-slate-200 bg-white text-slate-400 hover:text-slate-900 hover:border-slate-300"}`}>
                 <Settings size={18} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>
           </motion.div>
        </div>

        {/* --- DASHBOARD GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-4 gap-6">
           
           {/* A. TRAVELER ID CARD (TRACKER) */}
           <DashboardCard isDark={isDark} className="md:col-span-3 lg:col-span-2 row-span-2 !p-0 border-t-4" style={{ borderColor: BRAND.RED }}>
              <div className="relative h-full p-8 flex flex-col justify-between z-10">
                 {/* Top ID Section */}
                 <div className="flex justify-between items-start">
                    <div className="flex items-center gap-6">
                       <div className="relative">
                          <div className={`w-20 h-20 rounded-[1.5rem] p-1 shadow-xl overflow-hidden rotate-[-3deg] group-hover:rotate-0 transition-transform duration-500
                            ${isDark ? "bg-slate-800" : "bg-white ring-4 ring-slate-50"}`}>
                             <Image src={user?.imageUrl || "/logo.jpg"} alt="User" width={80} height={80} className="rounded-[1.2rem] w-full h-full object-cover" />
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-lg border border-slate-100">
                             <Shield size={14} style={{ color: BRAND.GREEN, fill: BRAND.GREEN_SOFT }} />
                          </div>
                       </div>
                       <div>
                          <div className="flex items-center gap-2 mb-1">
                             <h2 className={`text-xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                               {data.profile.fullName}
                             </h2>
                             <CheckCircle2 size={16} style={{ color: BRAND.GREEN }} />
                          </div>
                          <p className={`text-[10px] font-black uppercase tracking-widest bg-slate-100 px-2 py-1 rounded-md inline-block ${isDark ? "bg-white/10 text-white/60" : "text-slate-400"}`}>
                            {data.profile.id}
                          </p>
                       </div>
                    </div>
                    <div className="text-right hidden sm:block">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Destination</p>
                        <div className="flex items-center justify-end gap-1.5 text-sm font-bold" style={{ color: BRAND.RED }}>
                           <Plane size={14} /> Europe
                        </div>
                    </div>
                 </div>

                 {/* Bottom Progress Section */}
                 <div className="space-y-8 mt-12">
                    <div className="space-y-3">
                       <div className={`flex justify-between text-[10px] font-black uppercase tracking-widest ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                          <span className="flex items-center gap-2">Current Status: <span className="text-white bg-slate-900 px-2 py-0.5 rounded ml-1">{data.stats.level}</span></span>
                          <span style={{ color: BRAND.RED }}>{progressPercent}% Complete</span>
                       </div>
                       
                       {/* Custom Progress Bar */}
                       <div className={`h-3 w-full rounded-full overflow-hidden relative ${isDark ? "bg-white/5" : "bg-slate-100"}`}>
                          <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${progressPercent}%` }}
                             transition={{ duration: 1.5, ease: "circOut" }}
                             className="h-full relative overflow-hidden"
                             style={{ backgroundColor: BRAND.RED }}
                          >
                             <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress_1s_linear_infinite]" />
                          </motion.div>
                       </div>
                       <p className="text-[10px] text-slate-400 font-medium text-right pt-1">
                          You need <span className="font-bold text-slate-900">{data.stats.targetPoints - data.stats.points} XP</span> to become a {data.stats.nextLevel}
                       </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className={`rounded-3xl p-5 border transition-all hover:bg-slate-50/50 ${isDark ? "bg-white/5 border-white/5" : "bg-white border-slate-100 shadow-sm"}`}>
                          <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-2 text-slate-400">Activity</p>
                          <div className="flex items-end gap-1">
                             <p className={`text-2xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>{data.stats.hours}</p>
                             <span className="text-xs font-bold mb-1 text-slate-400">Hours</span>
                          </div>
                       </div>
                       <div className={`rounded-3xl p-5 border transition-all hover:bg-slate-50/50 ${isDark ? "bg-white/5 border-white/5" : "bg-white border-slate-100 shadow-sm"}`}>
                          <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-2 text-slate-400">Collection</p>
                          <div className="flex items-center gap-2">
                             <p className={`text-2xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>{data.stats.badges.length}</p>
                             <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center text-[10px]">🏆</div>
                                <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px]">🌍</div>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </DashboardCard>

           {/* B. NEXT EVENT TILE */}
           <DashboardCard isDark={isDark} className="md:col-span-3 lg:col-span-2 !p-0 group relative" delay={0.1}>
              <div className="absolute inset-0 bg-slate-900 z-0">
                 <Image src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop" alt="Event" fill className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
              </div>
              
              <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                 <div className="flex justify-between items-center">
                    <span className="text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-md bg-white/20 backdrop-blur-md border border-white/10">
                       Upcoming
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                      <ArrowUpRight size={14} className="text-slate-900" />
                    </div>
                 </div>
                 
                 <div>
                    <div className="flex items-center gap-2 mb-3" style={{ color: BRAND.GREEN }}>
                       <Clock size={14} />
                       <span className="text-xs font-bold uppercase tracking-wider text-white">
                          {formatDate(data.nextEvent.date)}
                       </span>
                    </div>
                    <h3 className="text-3xl font-black tracking-tight leading-none mb-3 text-white">
                       {lang === 'mn' ? data.nextEvent.title.mn : data.nextEvent.title.en}
                    </h3>
                    <p className="text-xs font-bold flex items-center gap-2 text-slate-400">
                       <MapPin size={14} className="text-white" /> 
                       {lang === 'mn' ? data.nextEvent.location.mn : data.nextEvent.location.en}
                    </p>
                 </div>
              </div>
           </DashboardCard>

           {/* C. QUICK STATS (Split) */}
           <DashboardCard isDark={isDark} className="md:col-span-2 lg:col-span-1 flex flex-col justify-between group hover:-translate-y-1" delay={0.2}>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 transition-transform group-hover:scale-110">
                 <Trophy size={24} />
              </div>
              <div className="mt-6">
                 <h4 className={`text-4xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>#{data.stats.points}</h4>
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total XP Gained</p>
              </div>
           </DashboardCard>

           <DashboardCard isDark={isDark} className="md:col-span-2 lg:col-span-1 flex flex-col justify-between group hover:-translate-y-1" delay={0.3}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: BRAND.GREEN_SOFT, color: BRAND.GREEN }}>
                 <Globe size={24} />
              </div>
              <div className="mt-6">
                 <h4 className={`text-4xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>Global</h4>
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Community Access</p>
              </div>
           </DashboardCard>

           {/* E. ACTIVITY FEED */}
           <DashboardCard isDark={isDark} className="md:col-span-2 lg:col-span-2 row-span-2 !p-0" delay={0.4}>
              <div className={`p-6 border-b flex justify-between items-center ${isDark ? "border-white/5" : "border-slate-100"}`}>
                 <h3 className={`font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                    <Activity size={14} style={{ color: BRAND.RED }} /> Recent Logs
                 </h3>
                 <MoreHorizontal size={16} className="text-slate-400 cursor-pointer hover:text-slate-900" />
              </div>
              
              <div className="p-4 space-y-2">
                 {data.recentActivity.map((activity, index) => (
                    <div key={index} className={`flex items-center gap-4 p-4 rounded-3xl transition-all cursor-default group hover:bg-slate-50 ${isDark ? "hover:bg-white/5" : ""}`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors 
                           ${isDark ? "bg-white/10 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-md"}`}
                           style={{ color: index === 0 ? BRAND.RED : undefined }}>
                            {activity.type === 'event' ? <Calendar size={16}/> : <CheckCircle2 size={16}/>}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className={`text-sm font-bold truncate ${isDark ? "text-white" : "text-slate-800"}`}>{activity.title}</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{formatDate(activity.date)}</p>
                        </div>
                        <span className="text-[10px] font-black px-3 py-1.5 rounded-full" 
                              style={{ backgroundColor: BRAND.GREEN_SOFT, color: BRAND.GREEN }}>
                            +{activity.points} XP
                        </span>
                    </div>
                 ))}
              </div>
              
              <div className={`p-4 border-t mt-auto text-center ${isDark ? "border-white/5" : "border-slate-100"}`}>
                 <button className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] transition-colors hover:text-[#E31B23] ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    View All History <ChevronRight size={10} />
                 </button>
              </div>
           </DashboardCard>

           {/* F. CTA TILE */}
           <DashboardCard isDark={isDark} className="md:col-span-4 lg:col-span-2 !border-none group cursor-pointer shadow-2xl overflow-hidden" delay={0.5} 
                style={{ backgroundColor: BRAND.RED, boxShadow: `0 20px 40px -10px ${BRAND.RED_SOFT}` }}>
              {/* Noise & Gradient Overlay */}
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-700" />

              <div className="relative z-10 flex items-center justify-between h-full py-2 px-2">
                 <div>
                    <div className="flex items-center gap-2 mb-2 opacity-80">
                        <Zap size={14} className="text-yellow-300 fill-current" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-white">Action Required</span>
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight">Complete Profile</h3>
                 </div>
                 <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-90 transition-all duration-300">
                    <ArrowUpRight size={20} style={{ color: BRAND.RED }} />
                 </div>
              </div>
           </DashboardCard>

        </div>
      </div>
    </div>
  );
}