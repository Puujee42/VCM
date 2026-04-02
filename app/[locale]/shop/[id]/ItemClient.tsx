"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { ArrowLeft, ShoppingCart, Check, AlertCircle } from "lucide-react";

const BRAND = {
  RED: "#E31B23",
  GREEN: "#00C896",
};

const T = {
  back: { en: "Back to Shop", mn: "Буцах", de: "Zurück zum Shop" },
  details: { en: "Product Details", mn: "Бүтээгдэхүүний тухай", de: "Produktdetails" },
  inStockPrefix: { en: "in stock - Ready to ship", mn: "Агуулахад", de: "auf Lager - Versandfertig" },
  inStockSuffix: { en: "", mn: "ширхэг байна", de: "" },
  outOfStock: { en: "Out of stock", mn: "Дууссан", de: "Ausverkauft" },
  order: { en: "Order / Purchase", mn: "Сагсанд нэмэх эсвэл захиалах", de: "Bestellen / Kaufen" },
  catGeneral: { en: "GENERAL", mn: "ЕРӨНХИЙ", de: "ALLGEMEIN" },
} as const;

const formatCategory = (cat: string, locale: string) => {
  if (!cat || cat.toLowerCase() === 'general') {
    return T.catGeneral[locale as keyof typeof T.catGeneral] || T.catGeneral.en;
  }
  return cat.toUpperCase();
};

export default function ItemClient({ item, locale = 'en' }: { item: any; locale: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);
  const isDark = mounted && theme === "dark";

  const name = item.name?.[locale] || item.name?.en || "Unknown Item";
  const desc = item.description?.[locale] || item.description?.en || "";

  if (!mounted) return null;

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Back button */}
      <Link 
        href={`/${locale}/shop`}
        className={`inline-flex items-center gap-2 mb-10 text-xs font-bold uppercase tracking-widest transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
      >
        <ArrowLeft size={16} />
        {T.back[locale as keyof typeof T.back] || T.back.en}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Left: Image gallery / Main Image */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square overflow-hidden rounded-[2rem] sm:rounded-[3rem] border border-slate-100 dark:border-white/5 bg-slate-100 dark:bg-slate-900"
        >
          <Image
            src={item.image || "/placeholder.jpg"}
            alt={name}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Right: Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          {/* Category */}
          <div className="mb-4">
            <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-white backdrop-blur-md bg-[#00C896] shadow-sm">
              {formatCategory(item.category || "general", locale)}
            </span>
          </div>

          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.9] mb-6 ${isDark ? "text-white" : "text-slate-900"}`}>
            {name}
            <span style={{ color: BRAND.GREEN }}>.</span>
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <span className={`text-3xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
              ${item.price}
            </span>
          </div>

          <div className="w-full h-[1px] bg-slate-200 dark:bg-white/10 mb-8" />

          {/* Description */}
          <div className="mb-10">
            <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {T.details[locale as keyof typeof T.details] || T.details.en}
            </h3>
            <p className={`text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {desc}
            </p>
          </div>

          <div className="w-full h-[1px] bg-slate-200 dark:bg-white/10 mb-8" />

          {/* Order / Status Actions */}
          <div className="space-y-6">
            <div className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest ${item.stock > 0 ? "text-[#00C896]" : "text-[#E31B23]"}`}>
              {item.stock > 0 ? <Check size={18} /> : <AlertCircle size={18} />}
              {item.stock > 0 
                ? (locale === "mn" 
                    ? `${T.inStockPrefix.mn} ${item.stock} ${T.inStockSuffix.mn}` 
                    : `${item.stock} ${T.inStockPrefix[locale as keyof typeof T.inStockPrefix] || T.inStockPrefix.en}`)
                : (T.outOfStock[locale as keyof typeof T.outOfStock] || T.outOfStock.en)
              }
            </div>

            <button
              disabled={item.stock <= 0}
              className={`w-full relative flex items-center justify-center gap-3 py-4 sm:py-5 px-8 rounded-full text-sm font-black uppercase tracking-widest text-white transition-all overflow-hidden ${item.stock <= 0 ? "opacity-50 cursor-not-allowed grayscale" : "hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl"}`}
              style={{ backgroundColor: BRAND.RED }}
            >
              <ShoppingCart size={20} />
              {T.order[locale as keyof typeof T.order] || T.order.en}
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
