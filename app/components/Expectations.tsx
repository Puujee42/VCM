"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap,
  FileCheck,
  Search,
  Plane,
  ArrowRight,
  Clock
} from "lucide-react";
import {
  useMotionValue,
  useSpring,
  useTransform
} from "framer-motion";
import { Motion as motion } from "./MotionProxy";
import { useTheme } from "next-themes";
// Mock context
// import { useLanguage } from "../context/LanguageContext";
const useLanguage = () => ({ language: "mn" as "mn" | "en" });

// --- BRAND CONFIG ---
const BRAND = {
  RED: "#E31B23",
  RED_SOFT: "rgba(227, 27, 35, 0.1)",
  GREEN: "#00C896",
  GREEN_SOFT: "rgba(0, 200, 150, 0.1)",
  DARK: "#0F172A"
};

const CONTENT = {
  header: {
    badge: { en: "The Process", mn: "Үйл явц" },
    title: { en: "Your Journey Abroad", mn: "Таны Аялал Эндээс Эхэлнэ" },
    subtitle: {
      en: "Four simple steps to start your new life in Europe.",
      mn: "Мөрөөдлийн амьдрал руугаа алхах 4 алхам."
    }
  },
  steps: [
    {
      id: 1,
      icon: GraduationCap,
      title: { en: "Training", mn: "Сургалтад суух" },
      desc: {
        en: "Intensive 17-day language course.",
        mn: "Нийт 17 хоногийн турш хэлний курст сууна."
      },
      duration: "17 Days",
    },
    {
      id: 2,
      icon: FileCheck,
      title: { en: "Proficiency Exam", mn: "Шалгалт өгөх" },
      desc: {
        en: "Take the entry-level proficiency test.",
        mn: "Хэлний анхан шатны түвшин тогтоох шалгалт өгнө."
      },
      duration: "Exam Day",
    },
    {
      id: 3,
      icon: Search,
      title: { en: "Find Family", mn: "Амьдрах айлаа хайх" },
      desc: {
        en: "We help you match with a host family.",
        mn: "Шалгалтдаа тэнцсэний дараа хамт амьдрах айлаа хайна."
      },
      duration: "Matching",
    },
    {
      id: 4,
      icon: Plane,
      title: { en: "Visa & Go", mn: "Виз мэдүүлэх" },
      desc: {
        en: "Guidance on visa and travel.",
        mn: "Виз мэдүүлэхэд хэрэгцээт мэдээллээр хангана."
      },
      duration: "Departure",
    }
  ]
};

// --- 3D STEP CARD ---
const StepCard = ({ step, index, lang, isDark }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  // Alternating colors for badges/numbers only
  const isEven = index % 2 !== 0;
  const accentColor = isEven ? BRAND.GREEN : BRAND.RED;
  const accentSoft = isEven ? BRAND.GREEN_SOFT : BRAND.RED_SOFT;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        relative group h-full p-8 rounded-[2rem] border overflow-hidden flex flex-col justify-between transition-all duration-500
        ${isDark
          ? "bg-[#0F172A] border-white/5 hover:border-white/10"
          : "bg-white border-slate-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-xl hover:border-slate-200"}
      `}
    >
      {/* 3D Content Container */}
      <div className="relative z-10 transform translate-z-20">

        {/* Top Row: Number & Badge */}
        <div className="flex justify-between items-start mb-8">
          {/* Step Number Circle */}
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
            style={{ backgroundColor: accentColor, color: 'white', boxShadow: `0 10px 20px -5px ${accentSoft}` }}>
            {step.id}
          </div>

          {/* Duration Badge */}
          <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md transition-colors`}
            style={{
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              color: accentColor,
              backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : '#FAFAFA'
            }}>
            <Clock size={10} />
            {step.duration}
          </span>
        </div>

        {/* Content */}
        <div className="mb-2">
          <step.icon className={`w-8 h-8 mb-5 transition-colors duration-300`}
            style={{ color: isDark ? 'rgba(255,255,255,0.8)' : '#334155' }} />

          {/* TITLE - UPDATED: No Gradient, just solid Red on hover */}
          <h3 className={`text-2xl font-black mb-3 leading-tight transition-colors duration-300
               ${isDark ? "text-white" : "text-slate-900"} 
               group-hover:text-[#E31B23]`}
          >
            {step.title[lang]}
          </h3>

          <p className={`text-sm font-medium leading-relaxed
               ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            {step.desc[lang]}
          </p>
        </div>
      </div>

    </motion.div>
  );
};

// --- MAIN SECTION ---
export default function ProcessSteps() {
  const { language: lang } = useLanguage();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const isDark = mounted && (theme === 'dark');

  if (!mounted) return null;

  return (
    <section className={`relative py-24 md:py-32 overflow-hidden transition-colors duration-700
       ${isDark ? "bg-slate-950" : "bg-slate-50"}`}>

      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />

        {/* Red Blob (Top Left) */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 15, repeat: Infinity }}
          style={{ backgroundColor: BRAND.RED }}
          className="absolute top-0 left-0 w-[1000px] h-[1000px] rounded-full blur-[150px] mix-blend-multiply"
        />

        {/* Green Blob (Bottom Right) */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{ backgroundColor: BRAND.GREEN }}
          className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] mix-blend-multiply"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-10 h-[2px]" style={{ backgroundColor: BRAND.GREEN }} />
              <span className="text-xs font-black uppercase tracking-[0.25em]" style={{ color: BRAND.GREEN }}>
                {CONTENT.header.badge[lang]}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-6
                       ${isDark ? "text-white" : "text-slate-900"}`}
            >
              {CONTENT.header.title[lang]}<span style={{ color: BRAND.RED }}>.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-lg md:text-xl font-medium max-w-xl ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              {CONTENT.header.subtitle[lang]}
            </motion.p>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/contact" className={`group relative inline-flex items-center gap-4 px-10 py-5 rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 overflow-hidden`}
              style={{ backgroundColor: BRAND.RED, boxShadow: `0 15px 30px -10px ${BRAND.RED_SOFT}` }}>

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />

              <span className="relative z-10 text-xs font-bold uppercase tracking-[0.15em] text-white">
                {lang === 'mn' ? 'Эхлэх' : 'Start Now'}
              </span>
              <div className="relative z-10 w-6 h-6 rounded-full bg-white text-[#E31B23] flex items-center justify-center group-hover:scale-110 group-hover:rotate-[-45deg] transition-transform duration-300">
                <ArrowRight size={12} strokeWidth={3} />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* STEPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">

          {/* Visual Connector Line (Dotted) */}
          <div className={`hidden lg:block absolute top-[4.5rem] left-0 right-0 h-[2px] -z-10`}
            style={{
              backgroundImage: `linear-gradient(to right, ${BRAND.RED} 20%, transparent 20%, transparent 25%, ${BRAND.GREEN} 25%, ${BRAND.GREEN} 45%, transparent 45%, transparent 50%, ${BRAND.RED} 50%, ${BRAND.RED} 70%, transparent 70%, transparent 75%, ${BRAND.GREEN} 75%)`,
              opacity: 0.2
            }}
          />

          {CONTENT.steps.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} lang={lang} isDark={isDark} />
          ))}
        </div>

      </div>
    </section>
  );
}