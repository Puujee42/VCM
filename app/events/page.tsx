"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { 
  motion, 
  AnimatePresence 
} from "framer-motion";
import { 
  FaVideo, 
  FaArrowRight,
  FaBullhorn,
  FaUserFriends
} from "react-icons/fa";
import { Clock, MapPin, Filter } from "lucide-react";

// --- DATA STRUCTURE ---
const CATEGORIES = ["Бүгд", "Өдөрлөг", "Сургалт", "Клуб"];

const EVENTS = [
  {
    id: 1,
    title: "Au Pair 2025 Нээлттэй Өдөрлөг",
    category: "Өдөрлөг",
    date: { month: "JAN", day: "25" },
    time: "14:00 - 16:00",
    location: "Blue Sky Tower, 3 давхар",
    type: "Offline",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80",
    spots: "Сүүлийн 10 суудал",
    isFull: false,
    tagColor: "bg-red-100 text-red-600"
  },
  {
    id: 2,
    title: "Герман Хэлний Ярианы Клуб",
    category: "Клуб",
    date: { month: "FEB", day: "02" },
    time: "18:00 - 19:30",
    location: "Google Meet",
    type: "Online",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    spots: "Бүртгэл явагдаж байна",
    isFull: false,
    tagColor: "bg-emerald-100 text-emerald-600"
  },
  {
    id: 3,
    title: "Визний Материал Бүрдүүлэлт",
    category: "Сургалт",
    date: { month: "FEB", day: "10" },
    time: "11:00 - 13:00",
    location: "Төв Оффис",
    type: "Offline",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    spots: "Дүүрсэн",
    isFull: true,
    tagColor: "bg-slate-100 text-slate-500"
  },
  {
    id: 4,
    title: "Европ дахь Амьдрал: Q&A",
    category: "Өдөрлөг",
    date: { month: "FEB", day: "15" },
    time: "20:00 - 21:00",
    location: "Instagram Live",
    type: "Online",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    spots: "Нээлттэй",
    isFull: false,
    tagColor: "bg-red-50 text-red-500"
  },
];

export default function EventsPageRedGreen() {
  const [activeFilter, setActiveFilter] = useState("Бүгд");
  const containerRef = useRef(null);
  
  const filteredEvents = activeFilter === "Бүгд" 
    ? EVENTS 
    : EVENTS.filter(e => e.category === activeFilter);

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-slate-800 font-sans selection:bg-red-500 selection:text-white">
      
      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
         {/* Animated Background Shapes */}
         <div className="absolute inset-0 w-full h-full pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-red-50 rounded-full blur-[100px] opacity-60" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[100px] opacity-60" />
         </div>

         <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div 
               initial={{ opacity: 0, y: 30 }} 
               animate={{ opacity: 1, y: 0 }} 
               transition={{ duration: 0.8 }}
            >
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-red-100 text-red-600 shadow-sm mb-6">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest">Upcoming Events 2025</span>
               </div>
               
               <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-slate-900">
                  Хамтдаа <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-emerald-600">Хөгжицгөөе</span>
               </h1>
               <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
                  Au Pair хөтөлбөрийн талаарх мэдээлэл, хэлний клуб, соёлын өдөрлөгүүдэд оролцож ирээдүйгээ төлөвлөөрэй.
               </p>
            </motion.div>
         </div>
      </section>

      {/* ─── 2. FILTER & EVENTS GRID ─── */}
      <section className="py-20 px-6">
         <div className="max-w-7xl mx-auto">
            
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
               {CATEGORIES.map((cat) => (
                  <button
                     key={cat}
                     onClick={() => setActiveFilter(cat)}
                     className={`px-8 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm flex items-center gap-2 border-2 ${
                        activeFilter === cat 
                        ? "bg-red-600 border-red-600 text-white shadow-red-200 shadow-lg scale-105" 
                        : "bg-white border-slate-100 text-slate-500 hover:border-red-200 hover:text-red-600"
                     }`}
                  >
                     {activeFilter === cat && <Filter size={14} className="fill-white" />}
                     {cat}
                  </button>
               ))}
            </div>

            {/* Grid */}
            <motion.div 
               layout
               className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
            >
               <AnimatePresence mode="popLayout">
                  {filteredEvents.map((event) => (
                     <motion.div
                        key={event.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-slate-100 hover:border-emerald-200 hover:shadow-xl transition-all group"
                     >
                        <div className="flex flex-col md:flex-row h-full gap-6">
                           
                           {/* Date & Image */}
                           <div className="w-full md:w-48 h-48 md:h-auto relative shrink-0">
                              <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur rounded-2xl px-4 py-2 text-center shadow-lg border border-slate-50">
                                 <span className="block text-xs font-black text-emerald-600 uppercase">{event.date.month}</span>
                                 <span className="block text-2xl font-black text-slate-900">{event.date.day}</span>
                              </div>
                              <Image 
                                 src={event.image} 
                                 alt={event.title}
                                 fill
                                 className="object-cover rounded-[2rem] group-hover:scale-105 transition-transform duration-500"
                              />
                           </div>

                           {/* Content */}
                           <div className="flex-1 py-4 pr-4 flex flex-col justify-between">
                              <div>
                                 <div className="flex items-center gap-3 mb-3">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${event.tagColor}`}>
                                       {event.category}
                                    </span>
                                    {event.type === "Online" ? (
                                       <span className="flex items-center gap-1 text-xs font-bold text-slate-400">
                                          <FaVideo /> Online
                                       </span>
                                    ) : (
                                       <span className="flex items-center gap-1 text-xs font-bold text-slate-400">
                                          <FaUserFriends /> In-Person
                                       </span>
                                    )}
                                 </div>
                                 <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight group-hover:text-red-600 transition-colors">
                                    {event.title}
                                 </h3>
                                 <div className="space-y-2">
                                    <p className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                                       <Clock size={16} className="text-emerald-500" /> {event.time}
                                    </p>
                                    <p className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                                       <MapPin size={16} className="text-emerald-500" /> {event.location}
                                    </p>
                                 </div>
                              </div>

                              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                                 <span className={`text-xs font-bold ${event.isFull ? "text-red-500" : "text-emerald-600"}`}>
                                    {event.spots}
                                 </span>
                                 <button 
                                    disabled={event.isFull}
                                    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                                       event.isFull 
                                       ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                                       : "bg-slate-900 text-white hover:bg-red-600 hover:gap-3"
                                    }`}
                                 >
                                    {event.isFull ? "Дүүрсэн" : "Бүртгүүлэх"} {!event.isFull && <FaArrowRight />}
                                 </button>
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </AnimatePresence>
            </motion.div>
         </div>
      </section>

      {/* ─── 3. NEWSLETTER SECTION ─── */}
      <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
         <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="bg-white rounded-[3rem] p-12 shadow-xl border border-red-50 relative overflow-hidden">
               {/* Background decoration */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-bl-full" />
               <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-50 rounded-tr-full" />
               
               <div className="relative z-10">
                  <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                     <FaBullhorn />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-900">Дараагийн арга хэмжээг <span className="text-emerald-600">бүү алд!</span></h2>
                  <p className="text-slate-500 mb-10 max-w-lg mx-auto font-medium">
                     Шинэ өдөрлөг, сургалтын товыг и-мэйлээр цаг алдалгүй хүлээн аваарай.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                     <input 
                        type="email" 
                        placeholder="Таны и-мэйл хаяг" 
                        className="flex-1 px-6 py-4 rounded-2xl text-slate-900 font-bold bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-red-100"
                     />
                     <button className="px-8 py-4 rounded-2xl bg-red-600 text-white font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors shadow-lg hover:shadow-xl">
                        Нэгдэх
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}