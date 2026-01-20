"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { 
  motion, 
  useScroll, 
  useSpring, 
  Variants 
} from "framer-motion";
import { 
  FaBookOpen, 
  FaChild, 
  FaFirstAid, 
  FaLanguage, 
  FaChalkboardTeacher, 
  FaCertificate,
  FaBrain,
  FaHandHoldingHeart,
  FaComments,
  FaLaptop,
  FaUserGraduate
} from "react-icons/fa";
import { CheckCircle2, PlayCircle, Star, Sparkles } from "lucide-react";

// --- DATA STRUCTURE ---
const DATA = {
  hero: {
    title: "Au Pair Бэлтгэл",
    highlight: "Сургалт",
    sub: "Герман, Англи хэлний мэдлэгээ сайжруулж, хүүхэд асрах арга барил, анхны тусламжийн мэдлэг эзэмшин өөртөө итгэлтэйгээр аяллаа эхлүүлээрэй.",
    cta: "Сургалтанд Бүртгүүлэх"
  },
  modules: [
    {
      title: "Гадаад Хэл",
      level: "A1 - B1 Түвшин",
      desc: "Герман болон Англи хэлний эрчимжүүлсэн сургалт. Ярианы дадлага, сонсгол сайжруулах дасгалууд.",
      icon: FaLanguage,
      color: "bg-red-500",
      light: "bg-red-50",
      text: "text-red-600",
      topics: ["Өдөр тутмын яриа", "Гэр бүлтэй харилцах", "Дүрэм & Үгсийн сан"]
    },
    {
      title: "Хүүхэд Асхуй",
      level: "Олон Улсын Стандарт",
      desc: "Хүүхдийн сэтгэл зүй, хөгжлийн онцлог, тоглоомын аргаар сургах, хооллолт ба аюулгүй байдал.",
      icon: FaChild,
      color: "bg-emerald-500",
      light: "bg-emerald-50",
      text: "text-emerald-600",
      topics: ["Хөгжлийн үе шатууд", "Бүтээлч тоглоом", "Эрүүл хооллолт"]
    },
    {
      title: "Анхны Тусламж",
      level: "Сертификаттай",
      desc: "Гэнэтийн ослын үед үзүүлэх анхны тусламж. Хахах, түлэгдэх, гэмтэх үед авах арга хэмжээ.",
      icon: FaFirstAid,
      color: "bg-red-500",
      light: "bg-red-50",
      text: "text-red-600",
      topics: ["CPR хийх", "Шарх цэвэрлэх", "Яаралтай тусламж дуудах"]
    },
    {
      title: "Соёлын Бэлтгэл",
      level: "Зөөлөн Ур Чадвар",
      desc: "Европ гэр бүлийн соёл, харилцааны ёс зүй, зөрчилдөөнийг шийдвэрлэх арга барил.",
      icon: FaHandHoldingHeart,
      color: "bg-emerald-500",
      light: "bg-emerald-50",
      text: "text-emerald-600",
      topics: ["Гэрийн дүрэм", "Дасан зохицох", "Цаг баримтлах"]
    }
  ],
  methodology: [
    { title: "Online & Offline", text: "Танхим болон цахим хосолсон сургалт.", icon: FaLaptop, color: "bg-red-500" },
    { title: "Speaking Club", text: "Гадаад багштай ярианы клуб.", icon: FaComments, color: "bg-emerald-500" },
    { title: "Mentorship", text: "Туршлагатай Au Pair-уудын зөвлөгөө.", icon: FaBrain, color: "bg-red-600" },
  ]
};

// --- VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", bounce: 0.4, duration: 0.8 } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

export default function LessonsPageRedGreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className="min-h-[100dvh] bg-white text-slate-800 font-sans selection:bg-red-500 selection:text-white overflow-hidden">
      
      {/* ─── PROGRESS BAR ─── */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-emerald-500 to-red-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* ─── 1. HERO: ACTION ORIENTED ─── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
         {/* Background Shapes */}
         <div className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
               className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-red-50 rounded-full blur-[80px] opacity-60" 
            />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[80px] opacity-60" />
         </div>

         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={staggerContainer} 
              className="space-y-8"
            >
               <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-red-100 text-red-600 shadow-sm">
                  <FaChalkboardTeacher />
                  <span className="text-xs font-bold uppercase tracking-widest">Training Center</span>
               </motion.div>

               <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black text-slate-900 leading-tight">
                  <span className="block">{DATA.hero.title}</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-emerald-600">
                    {DATA.hero.highlight}
                  </span>
               </motion.h1>
               
               <motion.p variants={fadeInUp} className="text-lg text-slate-600 font-medium leading-relaxed border-l-4 border-emerald-400 pl-6">
                  {DATA.hero.sub}
               </motion.p>

               <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                  <Link href="/register">
                    <button className="px-10 py-4 rounded-xl bg-red-600 text-white font-bold shadow-lg shadow-red-200 hover:bg-emerald-600 hover:shadow-emerald-200 hover:scale-105 transition-all flex items-center gap-3">
                       <FaBookOpen /> {DATA.hero.cta}
                    </button>
                  </Link>
                  <div className="flex items-center gap-4 text-slate-500 font-bold px-4 hover:text-emerald-600 cursor-pointer transition-colors">
                     <PlayCircle className="text-emerald-500" /> Танилцуулга үзэх
                  </div>
               </motion.div>
            </motion.div>

            {/* Hero Graphic: Books/Learning */}
            <div className="relative h-[500px] hidden lg:block">
               <motion.div 
                 animate={{ y: [0, -20, 0] }} 
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute right-10 top-10 w-[450px] h-[500px] bg-white rounded-[3rem] shadow-2xl p-4 border border-emerald-100"
               >
                  <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-white rounded-[2.5rem] relative overflow-hidden flex flex-col items-center justify-center text-center p-8">
                      {/* Decorative Elements */}
                      <FaUserGraduate className="text-9xl text-emerald-100 opacity-50 absolute top-10 left-10 transform -rotate-12" />
                      <FaCertificate className="text-9xl text-red-100 opacity-50 absolute bottom-10 right-10 transform rotate-12" />
                      
                      <div className="relative z-10 bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-white">
                          <h3 className="text-2xl font-black text-slate-800 mb-2">Au Pair Academy</h3>
                          <p className="text-emerald-600 text-sm font-bold uppercase tracking-wide">Certified Program</p>
                          <div className="flex justify-center gap-2 mt-4">
                             {[1,2,3,4,5].map(s => <Star key={s} className="text-yellow-400 fill-yellow-400 w-5 h-5" />)}
                          </div>
                      </div>
                  </div>

                  {/* Floating Badge 1: Red Alert Style */}
                  <motion.div 
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-20 -left-12 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border-l-4 border-red-500"
                  >
                     <div className="bg-red-100 p-2 rounded-lg text-red-600 font-black">A2</div>
                     <div>
                        <p className="font-bold text-slate-800">German</p>
                        <p className="text-xs text-slate-400">Level Up</p>
                     </div>
                  </motion.div>

                  {/* Floating Badge 2: Green Success Style */}
                  <motion.div 
                    animate={{ x: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute bottom-20 -right-8 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border-l-4 border-emerald-500"
                  >
                     <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600"><CheckCircle2 /></div>
                     <div>
                        <p className="font-bold text-slate-800">Success</p>
                        <p className="text-xs text-slate-400">Guaranteed</p>
                     </div>
                  </motion.div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* ─── 2. CURRICULUM: THE LEARNING PATH ─── */}
      <section className="py-24 px-6 relative bg-white">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
               <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm mb-2 block">Curriculum</span>
               <h2 className="text-4xl font-black text-slate-900">Сургалтын <span className="text-red-600 underline decoration-wavy decoration-emerald-300">Хөтөлбөр</span></h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
               {DATA.modules.map((mod, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.1 }}
                     whileHover={{ y: -10 }}
                     className="bg-white rounded-[2rem] border border-slate-100 shadow-lg hover:shadow-2xl hover:border-red-200 transition-all duration-300 relative overflow-hidden group"
                  >
                     <div className={`h-2 w-full ${mod.color}`} />
                     <div className="p-8">
                        <div className={`w-16 h-16 rounded-2xl ${mod.light} ${mod.text} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                           <mod.icon />
                        </div>
                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${mod.light} ${mod.text}`}>
                           {mod.level}
                        </span>
                        <h3 className="text-2xl font-black text-slate-900 mt-4 mb-2">{mod.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">
                           {mod.desc}
                        </p>
                        <ul className="space-y-2">
                           {mod.topics.map((t, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                 <div className={`w-1.5 h-1.5 rounded-full ${mod.color}`} /> {t}
                              </li>
                           ))}
                        </ul>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* ─── 3. INTERACTIVE METHODOLOGY ─── */}
      <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
         {/* Decorative Blobs */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full blur-[100px] opacity-40" />
         <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-100 rounded-full blur-[100px] opacity-40" />
         
         <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
               <motion.div 
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
               >
                  <h2 className="text-4xl font-black text-slate-900 mb-6">Бид хэрхэн <span className="text-emerald-600">сургадаг вэ?</span></h2>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                     Манай сургалтын арга барил нь зөвхөн танхимын сургалтаар хязгаарлагдахгүй. Бид бодит амьдрал дээрх дадлага, харилцан яриа, дүрд тоглох аргуудыг ашигладаг.
                  </p>
                  
                  <div className="space-y-6">
                     {DATA.methodology.map((m, i) => (
                        <motion.div 
                           key={i}
                           whileHover={{ x: 10 }}
                           className="flex items-center gap-5 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 group hover:border-emerald-200"
                        >
                           <div className={`w-12 h-12 rounded-xl ${m.color} text-white flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform`}>
                              <m.icon />
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-900">{m.title}</h4>
                              <p className="text-sm text-slate-500">{m.text}</p>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </motion.div>

               <div className="relative">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-4 translate-y-12">
                        <div className="bg-white p-6 rounded-3xl shadow-lg text-center border-b-4 border-red-500 hover:-translate-y-2 transition-transform">
                           <p className="text-4xl font-black text-red-600">120</p>
                           <p className="text-xs font-bold text-slate-400 uppercase">Цагийн Хичээл</p>
                        </div>
                        <div className="bg-emerald-500 p-6 rounded-3xl shadow-lg text-center text-white hover:-translate-y-2 transition-transform">
                           <FaBookOpen className="text-4xl mx-auto mb-2" />
                           <p className="font-bold">Шилдэг Материал</p>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div className="bg-red-600 p-6 rounded-3xl shadow-lg text-center text-white hover:-translate-y-2 transition-transform">
                           <FaCertificate className="text-4xl mx-auto mb-2" />
                           <p className="font-bold">Албан Ёсны Гэрчилгээ</p>
                        </div>
                        <div className="bg-white p-6 rounded-3xl shadow-lg text-center border-b-4 border-emerald-500 hover:-translate-y-2 transition-transform">
                           <p className="text-4xl font-black text-emerald-600">98%</p>
                           <p className="text-xs font-bold text-slate-400 uppercase">Визийн Амжилт</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* ─── 4. CTA: START YOUR JOURNEY ─── */}
      <section className="py-24 px-6">
         <div className="max-w-4xl mx-auto">
            <motion.div 
               whileHover={{ scale: 1.01 }}
               className="bg-slate-900 rounded-[3rem] p-12 text-center relative overflow-hidden text-white shadow-2xl"
            >
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-emerald-500 to-red-500" />
               <div className="absolute -left-10 top-1/2 w-40 h-40 bg-red-600 rounded-full blur-[80px] opacity-30" />
               <div className="absolute -right-10 bottom-0 w-40 h-40 bg-emerald-600 rounded-full blur-[80px] opacity-30" />

               <div className="relative z-10">
                  <div className="inline-block bg-white/10 backdrop-blur px-6 py-2 rounded-full mb-8 border border-white/20">
                     <span className="flex items-center gap-2 font-bold text-sm">
                        <Sparkles className="text-emerald-400" size={16} /> 2025 Оны Шинэ Элсэлт
                     </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                     Мөрөөдлийн Аялалдаа <br /> Бэлдэхэд Бэлэн үү?
                  </h2>
                  <p className="text-slate-300 mb-10 max-w-lg mx-auto font-medium">
                     Таныг мэргэжлийн багш нар, найрсаг орчин, ирээдүйн боломжууд хүлээж байна.
                  </p>
                  
                  <Link href="/register">
                     <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-12 py-5 rounded-xl bg-red-600 text-white font-black text-lg shadow-xl hover:bg-emerald-600 transition-colors"
                     >
                        Одоо Бүртгүүлэх
                     </motion.button>
                  </Link>
               </div>
            </motion.div>
         </div>
      </section>

    </div>
  );
}