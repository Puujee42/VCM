"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  motion, 
  useScroll, 
  useSpring, 
  Variants 
} from "framer-motion";
import { 
  FaNewspaper, 
  FaArrowRight, 
  FaSearch,
  FaTags
} from "react-icons/fa";
import { Calendar, User, ChevronRight } from "lucide-react";

// --- TYPES ---
interface NewsItem {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  tagColor: string;
  featured?: boolean; // Optional property
}

// --- DATA STRUCTURE ---
const NEWS_DATA: NewsItem[] = [
  {
    id: 1,
    title: "2024 оны IAPA-ийн шилдэг Au Pair тодорлоо",
    category: "Global News",
    date: "2024-03-20",
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Эквадор улсаас АНУ-д суугаа оролцогч энэ жилийн шилдгээр шалгарч, олон улсын индэр дээр түүхээ хуваалцлаа.",
    featured: true,
    tagColor: "bg-emerald-500"
  },
  {
    id: 2,
    title: "Гадаад орноор аялж, үнэ төлбөргүй хэл сурцгаая",
    category: "Зөвлөгөө",
    date: "2024-02-15",
    image: "https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?auto=format&fit=crop&w=800&q=80",
    excerpt: "Хэлний мэдлэгээ сайжруулах хамгийн шилдэг арга бол тухайн орчинд нь амьдрах юм. Au Pair хөтөлбөрийн давуу тал.",
    tagColor: "bg-red-500"
  },
  {
    id: 3,
    title: "Гадаад руу явах нь “хэцүү” биш",
    category: "Мотиваци",
    date: "2024-01-10",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
    excerpt: "Зорилготой хүнд бэрхшээл жижиг харагддаг. Манай оролцогчийн бодит түүхээс урам зориг аваарай.",
    tagColor: "bg-emerald-500"
  },
  {
    id: 4,
    title: "Ачаагаа хэрхэн бэлдэж байна?",
    category: "Зөвлөгөө",
    date: "2023-12-05",
    image: "https://images.unsplash.com/photo-1505935428862-770b6f24f629?auto=format&fit=crop&w=800&q=80",
    excerpt: "Оролцогчид чемодандаа юу хийх хэрэгтэй вэ? Туршлагатай Au Pair-уудын зөвлөгөө.",
    tagColor: "bg-slate-800"
  },
  {
    id: 5,
    title: "Sport Day 2023",
    category: "Арга Хэмжээ",
    date: "2023-09-15",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    excerpt: "Манай нийт оролцогчдын дунд зохиогдсон спортын өдөрлөгийн гэрэл зургууд.",
    tagColor: "bg-red-500"
  },
  {
    id: 6,
    title: "Улаан бурханы Вакцины бичиг авах",
    category: "Мэдээлэл",
    date: "2023-08-20",
    image: "https://images.unsplash.com/photo-1576091160550-2187d8001889?auto=format&fit=crop&w=800&q=80",
    excerpt: "Визний материалд шаардлагатай эрүүл мэндийн бичгүүдийг хэрхэн, хаанаас авах заавар.",
    tagColor: "bg-emerald-500"
  },
  {
    id: 7,
    title: "Au Pair-ийн нэг өдөр #1",
    category: "Vlog",
    date: "2023-07-10",
    image: "https://images.unsplash.com/photo-1513258496098-8838ee01dc27?auto=format&fit=crop&w=800&q=80",
    excerpt: "Германд амьдарч буй Оюукагийн нэг өдөр хэрхэн өнгөрдөг вэ? Сонирхолтой влог.",
    tagColor: "bg-red-500"
  }
];

// --- ANIMATION VARIANTS ---
const containerVar: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVar: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function NewsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Safety: Ensure featuredPost exists, otherwise fallback to the first item
  const featuredPost = NEWS_DATA.find(post => post.featured) || NEWS_DATA[0];
  
  // Filter out the featured post from the main grid
  const otherPosts = NEWS_DATA.filter(post => post.id !== featuredPost.id);

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-slate-800 font-sans selection:bg-red-500 selection:text-white">
      
      {/* ─── SCROLL BAR ─── */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-emerald-500 to-red-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* ─── 1. HERO & FEATURED POST ─── */}
      <section className="relative pt-32 pb-20 px-6 bg-slate-50 overflow-hidden">
         {/* Background Orbs */}
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-100 rounded-full blur-[120px] opacity-60 pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-100 rounded-full blur-[120px] opacity-60 pointer-events-none" />

         <div className="max-w-7xl mx-auto relative z-10">
            {/* Header Text */}
            <div className="text-center mb-16">
               <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6"
               >
                  <FaNewspaper className="text-red-500" />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-500">Mongolian Au Pair Blog</span>
               </motion.div>
               <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-4">
                  Мэдээ, <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-emerald-600">Мэдээлэл</span>
               </h1>
            </div>

            {/* Featured Post Card */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.6 }}
               className="group relative rounded-[3rem] overflow-hidden shadow-2xl h-[500px] md:h-[600px] w-full"
            >
               <Image 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  priority
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
               
               <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-3/4">
                  <span className={`inline-block px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-white mb-4 ${featuredPost.tagColor}`}>
                     {featuredPost.category}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight group-hover:text-emerald-300 transition-colors">
                     {featuredPost.title}
                  </h2>
                  <p className="text-slate-200 text-lg md:text-xl font-medium mb-8 line-clamp-2">
                     {featuredPost.excerpt}
                  </p>
                  <Link href={`/news/${featuredPost.id}`}>
                     <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-slate-900 font-bold hover:bg-emerald-500 hover:text-white transition-all shadow-lg">
                        Дэлгэрэнгүй унших <FaArrowRight />
                     </button>
                  </Link>
               </div>
            </motion.div>
         </div>
      </section>

      {/* ─── 2. ARTICLE GRID ─── */}
      <section className="py-24 px-6 bg-white">
         <div className="max-w-7xl mx-auto">
            
            {/* Filter / Search Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
               <h3 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                  <FaTags className="text-red-500" /> Шинэ Нийтлэлүүд
               </h3>
               
               <div className="relative w-full md:w-96">
                  <input 
                     type="text" 
                     placeholder="Мэдээ хайх..." 
                     className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-slate-800 focus:outline-none focus:border-red-500 transition-colors"
                  />
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
               </div>
            </div>

            {/* Grid */}
            <motion.div 
               variants={containerVar}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
               {otherPosts.map((post) => (
                  <motion.div 
                     key={post.id}
                     variants={itemVar}
                     whileHover={{ y: -10 }}
                     className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-300 overflow-hidden flex flex-col group"
                  >
                     <div className="relative h-60 overflow-hidden">
                        <Image 
                           src={post.image} 
                           alt={post.title} 
                           fill 
                           className="object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-lg px-3 py-1 font-bold text-xs text-slate-800 shadow-sm flex items-center gap-2">
                           <Calendar size={12} className="text-red-500" /> {post.date}
                        </div>
                     </div>
                     
                     <div className="p-8 flex-1 flex flex-col">
                        <div className="mb-4">
                           <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-white ${post.tagColor}`}>
                              {post.category}
                           </span>
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-3 leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                           {post.title}
                        </h3>
                        <p className="text-slate-500 text-sm font-medium mb-6 line-clamp-3 flex-1">
                           {post.excerpt}
                        </p>
                        
                        <div className="border-t border-slate-100 pt-6 flex items-center justify-between">
                           <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                              <User size={14} /> Admin
                           </div>
                           <Link href={`/news/${post.id}`} className="text-emerald-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                              Унших <ChevronRight size={16} />
                           </Link>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </motion.div>

            {/* Pagination / Load More */}
            <div className="mt-16 text-center">
               <button className="px-10 py-4 rounded-full border-2 border-slate-200 text-slate-600 font-black uppercase tracking-widest hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all">
                  Бүх мэдээг үзэх
               </button>
            </div>
         </div>
      </section>

      {/* ─── 3. NEWSLETTER CTA ─── */}
      <section className="py-24 px-6 bg-slate-50">
         <div className="max-w-4xl mx-auto bg-gradient-to-r from-red-600 to-emerald-600 rounded-[3rem] p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-full bg-white opacity-10 skew-x-12 pointer-events-none" />
            
            <div className="relative z-10">
               <h2 className="text-3xl md:text-5xl font-black mb-6">Мэдээллээс бүү хоцор!</h2>
               <p className="text-white/90 mb-10 text-lg font-medium max-w-lg mx-auto">
                  Шинэ нийтлэл, зөвлөгөө болон зарлагдсан хөтөлбөрүүдийн талаар мэдээллийг и-мэйлээр аваарай.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto bg-white/20 p-2 rounded-[1.5rem] backdrop-blur-sm">
                  <input 
                     type="email" 
                     placeholder="Таны и-мэйл хаяг..." 
                     className="flex-1 bg-transparent px-6 py-3 text-white placeholder-white/70 font-bold focus:outline-none"
                  />
                  <button className="bg-white text-red-600 px-8 py-3 rounded-2xl font-black shadow-lg hover:bg-slate-100 transition-colors">
                     Бүртгүүлэх
                  </button>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}