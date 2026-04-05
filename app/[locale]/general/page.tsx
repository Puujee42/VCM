"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Check, X, User, MessageCircle, AlertCircle, ShieldCheck, Mail, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

export default function GeneralDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations("dashboard");

  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    const role = (session?.user as any)?.role;
    if (!role || (!role.startsWith('general_') && role !== 'admin')) {
      router.replace("/dashboard");
      return;
    }

    fetchApplications();
  }, [status, session]);

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/general/applications");
      if (res.ok) {
        const data = await res.json();
        setApplications(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (appId: string, action: 'accept' | 'reject') => {
    if (!confirm(`Are you sure you want to ${action === 'accept' ? 'accept and recommend' : 'reject'} this application?`)) return;
    
    try {
      const res = await fetch("/api/general/applications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId: appId, action }),
      });
      if (res.ok) {
        setApplications(prev => prev.filter(app => app._id !== appId));
      }
    } catch (e) {
      console.error("Action error:", e);
    }
  };

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
           <div className="w-12 h-12 relative">
               <div className="absolute inset-0 border-4 border-sky-100 rounded-full" />
               <div className="absolute inset-0 border-4 border-sky-500 rounded-full border-t-transparent animate-spin" />
           </div>
           <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Loading Queue...</p>
        </div>
      </div>
    );
  }

  const roleName = (session?.user as any)?.role?.replace('general_', '').toUpperCase() || "PROGRAM";

  return (
    <div className="min-h-dvh bg-[#FFFFFF] pt-28 pb-20 px-6 font-sans relative overflow-hidden">
      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-sky-50 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[100px] opacity-30" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
               <ShieldCheck className="text-sky-500" size={20} />
               <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-sky-600">{roleName} MANAGER DASHBOARD</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">Application Queue</h1>
            <p className="text-slate-500 font-medium mt-2">Review and recommend applicants for final verification.</p>
          </div>
          
          <div className="flex gap-4">
            <Link href="/dashboard" className="px-6 py-3 border border-slate-100 bg-white hover:border-sky-200 hover:text-sky-600 rounded-2xl transition-all shadow-sm text-xs font-bold uppercase tracking-widest">
                My Dashboard
            </Link>
          </div>
        </div>

        {applications.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-24 text-center bg-white rounded-[2.5rem] border border-slate-100 shadow-sm"
          >
            <div className="w-20 h-20 bg-sky-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-sky-200">
                <Check size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Queue Cleared!</h3>
            <p className="text-slate-400 font-medium max-w-xs mx-auto">There are no pending applications for your program at this time.</p>
          </motion.div>
        ) : (
          <div className="grid gap-8">
            {applications.map((app, idx) => (
              <motion.div
                key={app._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-20px_rgba(14,165,233,0.1)] hover:border-sky-100 transition-all duration-500 group"
              >
                <div className="flex flex-col lg:flex-row gap-10">
                  <div className="flex-1 space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-500 border border-sky-100 shadow-sm group-hover:scale-110 transition-transform duration-500">
                           <User size={32} />
                        </div>
                        <div>
                           <h3 className="text-2xl font-black text-slate-900">{app.firstName} {app.lastName}</h3>
                           <div className="flex items-center gap-3 mt-1">
                               <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                   <Mail size={14} className="text-sky-400" /> {app.email}
                               </span>
                               <span className="text-slate-200">•</span>
                               <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 bg-sky-50 px-2 py-0.5 rounded">
                                   {app.programId}
                               </span>
                           </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Submitted On</p>
                          <p className="text-xs font-bold text-slate-900">{new Date(app.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Age</p>
                            <p className="text-sm font-bold text-slate-900">{app.age} Years</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Language Level</p>
                            <p className="text-sm font-bold text-slate-900">Level {app.level}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Contact</p>
                            <p className="text-sm font-bold text-slate-900">{app.phone}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-100 relative overflow-hidden group/letter">
                      <div className="absolute top-0 left-0 w-1 h-full bg-sky-500 opacity-20 group-hover/letter:opacity-100 transition-opacity" />
                      <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-black text-sky-600 mb-3">
                         <MessageCircle size={14} /> Application Statement
                      </h4>
                      <p className="text-sm font-medium leading-relaxed italic text-slate-600">
                         &quot;{app.message || 'No statement provided by applicant.'}&quot;
                      </p>
                    </div>
                  </div>

                  <div className="w-full lg:w-72 shrink-0 flex flex-col justify-center gap-4">
                     <p className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400 text-center mb-1">Evaluation</p>
                     
                     <button
                       onClick={() => handleAction(app._id, 'accept')}
                       className="w-full bg-sky-500 text-white py-5 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest hover:bg-sky-600 transition-all shadow-lg shadow-sky-500/20 active:scale-[0.98]"
                     >
                       <Check size={18} /> Accept & Forward
                     </button>
                     
                     <button
                       onClick={() => handleAction(app._id, 'reject')}
                       className="w-full bg-slate-900 text-white py-5 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg shadow-slate-900/10 active:scale-[0.98]"
                     >
                       <X size={18} /> Reject Applicant
                     </button>
                     
                     <p className="text-[9px] text-slate-400 text-center leading-relaxed px-4">
                        Accepting will forward this application to the Main Admin for final approval.
                     </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
