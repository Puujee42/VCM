"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Loader2, Mail, Phone, School, MapPin, 
  Calendar, Clock, Star, Activity, User, 
  ShieldCheck, Edit3, Save, X, Lock, Eye, EyeOff
} from "lucide-react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations("dashboard");

  const [userData, setUserData] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [userApps, setUserApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Edit States
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: "",
    email: "",
    city: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.replace("/sign-in");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user/dashboard");
        if (res.ok) {
          const data = await res.json();
          setUserData(data.user);
          setActivities(data.activity || []);
          setUserApps(data.applications || []);
          
          // Initialize edit form
          setEditForm({
            fullName: data.user.fullName || "",
            email: data.user.email || "",
            city: data.user.profile?.address?.city || "",
            password: "",
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [status, session, router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/user/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setUserData({
            ...userData,
            fullName: editForm.fullName,
            email: editForm.email,
            profile: {
                ...userData.profile,
                address: {
                    ...userData.profile?.address,
                    city: editForm.city
                }
            }
        });
        setIsEditing(false);
        setEditForm(prev => ({ ...prev, password: "" }));
      } else {
        setMessage({ type: "error", text: result.error || "Failed to update profile" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "An error occurred. Please try again." });
    } finally {
      setUpdating(false);
    }
  };

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-50">
        <Loader2 className="w-10 h-10 animate-spin text-sky-600" />
      </div>
    );
  }

  if (!userData) return null;

  return (
    <div className="min-h-dvh bg-[#FDFBF7] font-sans selection:bg-sky-500 selection:text-white pt-28 pb-20 px-6 relative overflow-hidden">
      {/* Decorative Sky Blue Blurs */}
      <div className="absolute top-0 right-0 w-150 h-150 bg-sky-400 rounded-full blur-[200px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-blue-500 rounded-full blur-[200px] opacity-[0.05] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        
        {/* HEADER / NAVIGATION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
           <div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                 My <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Profile</span>
              </h1>
              <p className="text-sm font-bold text-slate-500 mt-2">Manage your personal details and account settings.</p>
           </div>
           <div className="flex gap-4 w-full md:w-auto">
                {!isEditing ? (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 bg-sky-500 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-white hover:bg-sky-600 shadow-lg shadow-sky-500/20 transition-all"
                    >
                        <Edit3 size={16} /> Edit Profile
                    </button>
                ) : (
                    <button 
                        onClick={() => setIsEditing(false)}
                        className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 bg-white px-6 py-3 rounded-xl border border-slate-200 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all"
                    >
                        <X size={16} /> Cancel
                    </button>
                )}
                <Link href="/dashboard" className="flex-1 md:flex-none inline-flex items-center justify-center bg-white px-6 py-3 rounded-xl border border-slate-200 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200 transition-all">
                    Dashboard
                </Link>
           </div>
        </div>

        {message.text && (
            <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-2xl text-xs font-bold ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}
            >
                {message.text}
            </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* LEFT COLUMN: IDENTITY CARD */}
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-1 space-y-8">
              <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 border border-sky-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
                 {/* Top edge glow */}
                 <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-blue-500" />
                 
                 {isEditing ? (
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <div className="flex flex-col items-center text-center mb-6">
                            <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center text-sky-500 mb-4 border-4 border-white shadow-lg">
                                <User size={32} />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-sky-500">Updating Profile</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                                <input 
                                    type="text" 
                                    value={editForm.fullName}
                                    onChange={(e) => setEditForm({...editForm, fullName: e.target.value})}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                                <input 
                                    type="email" 
                                    value={editForm.email}
                                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">City</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                    <input 
                                        type="text" 
                                        value={editForm.city}
                                        onChange={(e) => setEditForm({...editForm, city: e.target.value})}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                                        placeholder="Current City"
                                    />
                                </div>
                            </div>

                            <div className="pt-2 border-t border-slate-100 mt-2">
                                <label className="text-[9px] font-black uppercase tracking-widest text-sky-500 ml-1">Change Password (Optional)</label>
                                <div className="relative mt-1">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        value={editForm.password}
                                        onChange={(e) => setEditForm({...editForm, password: e.target.value})}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-12 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                                        placeholder="••••••••"
                                        minLength={6}
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-500 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                <p className="text-[8px] text-slate-400 mt-1 ml-1 italic">Leave blank to keep current password.</p>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={updating}
                            className="w-full bg-slate-900 text-white rounded-xl py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-sky-500 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2"
                        >
                            {updating ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            {updating ? "Saving Changes..." : "Save Profile"}
                        </button>
                    </form>
                 ) : (
                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-sky-50 rounded-full flex items-center justify-center text-sky-500 mb-6 border-4 border-white shadow-xl">
                            <User size={40} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-1">{userData.fullName}</h2>
                        <div className="flex gap-2 justify-center mb-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${userData.role === 'admin' ? 'bg-slate-900 text-white' : userData.role === 'volunteer' ? 'bg-emerald-50 text-emerald-600' : 'bg-sky-50 text-sky-600'}`}>
                                {userData.role.replace('_', ' ')}
                            </span>
                        </div>

                        <div className="w-full space-y-4 text-left">
                            <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-4 border border-slate-100 transition-colors hover:bg-sky-50/50">
                                <Mail className="text-sky-500" size={18} />
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Email Address</p>
                                    <p className="text-xs font-bold text-slate-900 truncate">{userData.email}</p>
                                </div>
                            </div>
                            
                            <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-4 border border-slate-100 transition-colors hover:bg-sky-50/50">
                                <Phone className="text-sky-500" size={18} />
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Phone</p>
                                    <p className="text-xs font-bold text-slate-900">{userData.phone || "Not Set"}</p>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-4 border border-slate-100 transition-colors hover:bg-sky-50/50">
                                <MapPin className="text-sky-500" size={18} />
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Location</p>
                                    <p className="text-xs font-bold text-slate-900">{userData.profile?.address?.city || "Not Set"}</p>
                                </div>
                            </div>
                            
                            <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-4 border border-slate-100 transition-colors hover:bg-sky-50/50">
                                <School className="text-sky-500" size={18} />
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Affiliation / School</p>
                                    <p className="text-xs font-bold text-slate-900">{userData.affiliation || "None"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                 )}
              </div>

              {/* ID BLOCK */}
              {!isEditing && (
                  <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
                     <div className="absolute -right-4 -bottom-4 opacity-10">
                        <ShieldCheck size={120} />
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">VCM Database ID</p>
                     <p className="text-sm font-mono tracking-wider opacity-80 break-all">{userData._id}</p>
                  </div>
              )}
           </motion.div>

           {/* RIGHT COLUMN: HISTORY & ACTIVITY */}
           <div className="lg:col-span-2 space-y-8">
              
              {/* CURRENT APPLICATIONS / STATUS */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 border border-sky-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center text-sky-500">
                       <MapPin size={20} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900">Current Program Status</h3>
                 </div>

                 {userApps.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-3xl">
                       <Star className="mx-auto text-slate-300 mb-3" size={32} />
                       <p className="text-xs font-bold text-slate-500">You haven't applied to any programs yet.</p>
                       <Link href="/apply" className="mt-4 inline-block text-[10px] font-black uppercase tracking-widest text-sky-500 hover:text-sky-600 underline">Explore Programs</Link>
                    </div>
                 ) : (
                    <div className="space-y-4">
                       {userApps.map((app: any, idx) => (
                          <div key={idx} className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-50 p-6 rounded-2xl border border-slate-100">
                             <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Target Country</p>
                                <h4 className="text-lg font-black text-slate-900">{app.programId}</h4>
                                <p className="text-xs text-slate-500 mt-1">Submitted: {new Date(app.createdAt).toLocaleDateString()}</p>
                             </div>
                             <div className="mt-4 md:mt-0 text-right">
                                <span className="bg-sky-100 text-sky-700 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-inner inline-block">
                                   {app.status.replace('_', ' ').toUpperCase()}
                                </span>
                             </div>
                          </div>
                       ))}
                    </div>
                 )}
              </motion.div>

              {/* VOLUNTEER ACTIVITY LOG */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 border border-sky-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center text-sky-500">
                       <Activity size={20} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900">Volunteer History</h3>
                 </div>

                 {activities.length === 0 ? (
                    <div className="bg-slate-50 p-8 rounded-3xl text-center">
                       <p className="text-xs font-bold text-slate-500">No recent volunteer activity logged.</p>
                    </div>
                 ) : (
                    <div className="relative pl-6 border-l-2 border-slate-100 space-y-8">
                       {activities.map((act: any, idx) => (
                          <div key={idx} className="relative">
                             <div className="absolute -left-[35px] top-1 w-4 h-4 bg-white border-4 border-sky-400 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
                             <p className="text-[10px] font-black uppercase tracking-widest text-sky-500 mb-1">
                                {new Date(act.date).toLocaleDateString()}
                             </p>
                             <h4 className="text-sm font-bold text-slate-900 mb-1">{act.title}</h4>
                             <p className="text-xs font-medium text-slate-500 leading-relaxed">{act.description}</p>
                          </div>
                       ))}
                    </div>
                 )}
              </motion.div>

           </div>
        </div>
      </div>
    </div>
  );
}
