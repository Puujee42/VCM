"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Globe, 
  Rocket, 
  Smartphone, 
  ShieldCheck, 
  Star,
  ArrowRight
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const CONTENT = {
  header: {
    mn: "Гадаад дахь аялалаа эхлүүлээрэй!",
    en: "Start Your Adventure Abroad!"
  },
  subheader: {
    mn: <><strong>Mongolian Aupair</strong>-д тавтай морил! Бид таны гадаадад гарах замыг урьд өмнөхөөс илүү хялбар болгох болно.</>,
    en: <>Welcome to <strong>Mongolian Aupair</strong>! We make your path abroad easier than ever before.</>
  },
  features: [
    {
      icon: Rocket,
      iconColor: "text-emerald-500",
      title: {
        mn: "Хялбар & Заавартай",
        en: "Simple & Guided"
      },
      desc: {
        mn: "Манай систем танд алхам алхмаар зааварчилж, ухаалаг зөвлөгөөг өгөх болно.",
        en: "Our system guides you step-by-step through your application with smart hints."
      }
    },
    {
      icon: Smartphone,
      iconColor: "text-blue-500",
      title: {
        mn: "Бүрэн Уян Хатан",
        en: "Full Flexibility"
      },
      desc: {
        mn: "Гар утас, таблет, компьютер гээд хүссэн төхөөрөмжөөсөө өөрийн хурдаар профайлаа удирдаарай.",
        en: "Manage your profile on mobile, tablet, or PC – at your own pace."
      }
    },
    {
      icon: ShieldCheck,
      iconColor: "text-emerald-600",
      title: {
        mn: "Аюулгүй Байдал",
        en: "Security First"
      },
      desc: {
        mn: "Орчин үеийн шифрлэлт болон мэдээллийн аюулгүй байдлыг бид чандлан хангана.",
        en: "State-of-the-art encryption and strict data protection to keep your info safe."
      }
    },
    {
      icon: Globe,
      iconColor: "text-orange-500",
      title: {
        mn: "Үнэ Төлбөргүй Бүртгэл",
        en: "No Obligations"
      },
      desc: {
        mn: "Бүртгүүлэхэд 100% үнэгүй. Зөвхөн хөтөлбөрт тэнцсэн үедээ л баталгаажуулна.",
        en: "Registration is 100% free. It only becomes binding upon successful placement."
      }
    }
  ],
  footer: {
    ready: {
      mn: "Бэлэн үү?",
      en: "Ready?"
    },
    scroll: {
      mn: "Дэлгэрэнгүйг гүйлгэх",
      en: "Scroll for more"
    }
  }
};

const BeforeLoginNews = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 w-full max-w-[480px] h-[650px] bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] p-10 flex flex-col overflow-hidden"
    >
      {/* Gloss Shine */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent opacity-80 pointer-events-none" />

      {/* Header */}
      <div className="mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
          <Star size={12} fill="currentColor" />
          <span>News & Updates</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 leading-[1.1] tracking-tight">
          {t(CONTENT.header)} 🌍
        </h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pr-4 space-y-8 custom-scrollbar relative z-10">
        <p className="text-slate-600 font-bold text-sm leading-relaxed">
          {t(CONTENT.subheader)}
        </p>

        {CONTENT.features.map((feature, index) => (
          <div key={index} className="flex gap-4">
            <div className="w-12 h-12 shrink-0 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
              <feature.icon className={feature.iconColor} size={24} />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-1">
                {t(feature.title)}
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                {t(feature.desc)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-8 pt-6 border-t border-white/40 relative z-10">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            {t(CONTENT.footer.ready)}
          </p>
          <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest animate-pulse">
            {t(CONTENT.footer.scroll)} <ArrowRight size={12} />
          </div>
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
    </motion.div>
  );
};

export default BeforeLoginNews;
