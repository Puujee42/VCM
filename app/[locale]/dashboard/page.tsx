"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
   Clock, Calendar, MapPin, ArrowUpRight, Activity,
   CheckCircle2, Shield, Settings, BookOpen,
   Sparkles, User, GraduationCap,
   Heart, Video, Lock, CreditCard, ChevronRight,
   LogOut, Plus, ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

// --- CONSTANTS ---
const STEPS = ["Applied", "Documents", "Interview", "Matching", "Visa", "Departure"];

// --- TYPES ---
interface UserData {
   _id: string;
   fullName: string;
   email: string;
   role: 'volunteer' | 'student' | 'guest' | 'admin';
   studentId?: string;
   country?: string;
   step?: string;
   profile?: {
      sex?: string;
      dob?: string;
      nationality?: string;
      phone?: string;
      mobile?: string;
      address?: {
         street?: string;
         number?: string;
         city?: string;
         country?: string;
      };
      educationLevel?: string;
      languages?: string;
      hobbies?: string;
      motivation?: string;
   };
   phone?: string | null;
   hasPassword?: boolean;
   affiliation?: string | null;
   program?: string | null;
}

interface EventData {
    _id: string;
    title: { en: string; mn: string };
    description: { en: string; mn: string };
    date: string;
    timeString: string;
    location: { en: string; mn: string };
    image: string;
    category: string;
}

interface LessonData {
    _id: string;
    title: { en: string; mn: string };
    description: { en: string; mn: string };
    category: string;
    isUnlocked: boolean;
    imageUrl?: string;
    difficulty: string;
}

// --- COMPONENTS ---
const DashboardCard = ({ children, className = "" }: { children: React.ReactNode; className?: string; delay?: number }) => (
   <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
   >
      {children}
   </motion.div>
);

const SectionHeader = ({ icon: Icon, title, subtitle, action }: { icon: any; title: string; subtitle: string; action?: React.ReactNode }) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-500 shadow-sm border border-sky-100">
                <Icon size={24} />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-slate-900 leading-tight">{title}</h2>
                <p className="text-sm font-medium text-slate-400">{subtitle}</p>
            </div>
        </div>
        {action && (
            <div>{action}</div>
        )}
    </div>
);

const EventCard = ({ event, onRegister, onCancel, isRegistered, locale }: { event: EventData; onRegister?: (id: string) => void; onCancel?: (id: string) => void; isRegistered: boolean; locale: string }) => (
    <div className="group bg-white border border-slate-100 rounded-3xl overflow-hidden hover:border-sky-200 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-500 flex flex-col h-full">
        <div className="relative h-48 w-full overflow-hidden">
            <Image 
                src={event.image} 
                alt={event.title[locale as 'en' | 'mn']} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-sky-600 uppercase tracking-widest border border-sky-100">
                    {event.category}
                </span>
            </div>
            {isRegistered && (
                <div className="absolute top-4 right-4">
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                        Confirmed
                    </span>
                </div>
            )}
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-2">
                <Calendar size={14} className="text-sky-500" />
                <span>{new Date(event.date).toLocaleDateString(locale === 'mn' ? 'mn-MN' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span className="mx-1">•</span>
                <Clock size={14} className="text-sky-500" />
                <span>{event.timeString}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-sky-600 transition-colors">
                {event.title[locale as 'en' | 'mn']}
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-6 line-clamp-2 flex-grow">
                {event.description[locale as 'en' | 'mn']}
            </p>
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-6 font-medium">
                <MapPin size={14} className="text-sky-500 shrink-0" />
                <span className="truncate">{event.location[locale as 'en' | 'mn']}</span>
            </div>
            
            <div className="flex flex-col gap-3">
                <Link 
                    href={`/events/${event._id}`}
                    className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-slate-100"
                >
                    View Details <ExternalLink size={16} />
                </Link>

                {isRegistered ? (
                    <button 
                        onClick={() => onCancel && onCancel(event._id)}
                        className="w-full py-3 text-rose-500 hover:bg-rose-50 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                    >
                        Cancel Registration
                    </button>
                ) : (
                    <button 
                        onClick={() => onRegister && onRegister(event._id)}
                        className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-sky-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        Register Now <ArrowUpRight size={16} />
                    </button>
                )}
            </div>
        </div>
    </div>
);

const LessonCard = ({ lesson, onUnlock, locale }: { lesson: LessonData; onUnlock: (id: string) => void; locale: string }) => (
    <div className={`relative group bg-white border rounded-3xl overflow-hidden transition-all duration-500 ${lesson.isUnlocked ? 'border-slate-100 hover:border-sky-200' : 'border-slate-100'}`}>
        <div className="p-6">
            <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${lesson.isUnlocked ? 'bg-sky-50 text-sky-500' : 'bg-slate-50 text-slate-400'}`}>
                    {lesson.isUnlocked ? <Video size={24} /> : <Lock size={24} />}
                </div>
                <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                    lesson.difficulty === 'beginner' ? 'bg-emerald-50 text-emerald-600' :
                    lesson.difficulty === 'intermediate' ? 'bg-amber-50 text-amber-600' :
                    'bg-rose-50 text-rose-600'
                }`}>
                    {lesson.difficulty}
                </span>
            </div>
            <h3 className={`text-lg font-bold mb-2 ${lesson.isUnlocked ? 'text-slate-900' : 'text-slate-400'}`}>
                {lesson.title[locale as 'en' | 'mn']}
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-6 line-clamp-2">
                {lesson.description[locale as 'en' | 'mn']}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{lesson.category}</span>
                {lesson.isUnlocked ? (
                    <Link href={`/lessons/${lesson._id}`} className="text-sky-500 font-bold text-xs flex items-center gap-1 hover:gap-2 transition-all">
                        Start Learning <ChevronRight size={16} />
                    </Link>
                ) : (
                    <button 
                        onClick={() => onUnlock(lesson._id)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-sky-500 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
                    >
                        Unlock Now <CreditCard size={14} />
                    </button>
                )}
            </div>
        </div>
        
        {!lesson.isUnlocked && (
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] pointer-events-none transition-all group-hover:backdrop-blur-none group-hover:bg-white/0" />
        )}
    </div>
);

export default function MemberDashboard() {
   const locale = useLocale();
   const { data: session, status } = useSession();
   const isLoaded = status !== "loading";
   const user = session?.user;
   const router = useRouter();

   const [userData, setUserData] = useState<UserData | null>(null);
   const [userApps, setUserApps] = useState<any[]>([]);
   const [attendedEvents, setAttendedEvents] = useState<EventData[]>([]);
   const [availableEvents, setAvailableEvents] = useState<EventData[]>([]);
   const [lessons, setLessons] = useState<LessonData[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const dashRes = await fetch('/api/user/dashboard');
            if (dashRes.ok) {
               const data = await dashRes.json();
               if (data.user?.role === 'admin') {
                  router.replace('/admin');
                  return;
               }
               setUserData(data.user);
               setUserApps(data.applications || []);
               setAttendedEvents(data.attendedEvents || []);
               setAvailableEvents(data.availableEvents || []);
               setLessons(data.lessons || []);
            } else {
               setUserData({ _id: "new", fullName: user?.name || "Guest User", email: user?.email || "", role: "guest" });
            }
         } catch (e) {
            console.error("Dashboard Error:", e);
         } finally {
            setLoading(false);
         }
      };

      if (isLoaded && (user as any)?.role === 'admin') {
         router.replace('/admin');
         return;
      }
      if (isLoaded && (user as any)?.role?.startsWith('general_')) {
         router.replace('/general');
         return;
      }

      if (isLoaded && user) {
         fetchData();
      } else if (isLoaded && !user) {
         router.replace('/sign-in');
      }
   }, [isLoaded, user, router]);

   const handleRegisterEvent = async (eventId: string) => {
       try {
           const res = await fetch(`/api/events/${eventId}`, { method: 'POST' });
           if (res.ok) {
               // Update lists locally for instant feedback
               const eventToMove = availableEvents.find(e => e._id === eventId);
               if (eventToMove) {
                   setAvailableEvents(prev => prev.filter(e => e._id !== eventId));
                   setAttendedEvents(prev => [eventToMove, ...prev]);
               }
           } else {
               const data = await res.json();
               alert(data.error || "Failed to register");
           }
       } catch (error) {
           console.error("Registration error:", error);
       }
   };

   const handleCancelEvent = async (eventId: string) => {
       if (!confirm("Are you sure you want to cancel your registration?")) return;
       try {
           const res = await fetch(`/api/events/${eventId}`, { method: 'DELETE' });
           if (res.ok) {
               // Update lists locally
               const eventToMove = attendedEvents.find(e => e._id === eventId);
               if (eventToMove) {
                   setAttendedEvents(prev => prev.filter(e => e._id !== eventId));
                   setAvailableEvents(prev => [eventToMove, ...prev]);
               }
           } else {
               const data = await res.json();
               alert(data.error || "Failed to cancel registration");
           }
       } catch (error) {
           console.error("Cancellation error:", error);
       }
   };

   const handleUnlockLesson = async (lessonId: string) => {
       try {
           const res = await fetch(`/api/lessons`, { 
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ lessonId })
           });
           if (res.ok) {
               // Update locally
               setLessons(prev => prev.map(l => l._id === lessonId ? { ...l, isUnlocked: true } : l));
           } else {
               alert("Checkout flow triggered (Simulated). In a real app, this would redirect to payment.");
               // For demo purposes, let's just unlock it
               setLessons(prev => prev.map(l => l._id === lessonId ? { ...l, isUnlocked: true } : l));
           }
       } catch (error) {
           console.error("Unlock error:", error);
       }
   };

   if (!isLoaded || loading) return (
      <div className="min-h-dvh flex items-center justify-center bg-white">
         <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 relative">
                <div className="absolute inset-0 border-4 border-sky-100 rounded-full" />
                <div className="absolute inset-0 border-4 border-sky-500 rounded-full border-t-transparent animate-spin" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Loading Dashboard...</p>
         </div>
      </div>
   );

   if (!userData) return null;

   const isVolunteer = userData.role === 'volunteer' || userData.role === 'student';
   const normalizedStep = (!userData.step || userData.step === "-") ? "Applied" : userData.step;
   const currentStepIndex = STEPS.indexOf(normalizedStep);
   const progressPercent = Math.max(5, ((currentStepIndex + 1) / STEPS.length) * 100);

   return (
      <div className="min-h-dvh bg-[#FFFFFF] font-sans text-slate-900 pt-28 pb-20 px-6">
         {/* Background Decoration */}
         <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-sky-50 rounded-full blur-[120px] opacity-40" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[100px] opacity-30" />
         </div>

         <div className="relative z-10 max-w-7xl mx-auto space-y-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
               <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="flex items-center gap-3 mb-4">
                     <span className="flex h-2 w-2 rounded-full bg-sky-500 shadow-[0_0_12px_rgba(14,165,233,0.5)] animate-pulse" />
                     <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-sky-600">
                        {isVolunteer ? "Member Dashboard" : "Guest Portal"}
                     </p>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
                     Welcome back, <br />
                     <span className="text-sky-500">{userData.fullName}</span>
                  </h1>
               </motion.div>
               
               <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-wrap gap-4"
               >
                  <Link href="/profile" className="flex items-center gap-2 px-6 py-3 border border-slate-100 bg-white hover:border-sky-200 hover:text-sky-600 rounded-2xl transition-all shadow-sm">
                     <Settings size={18} />
                     <span className="text-xs font-bold uppercase tracking-widest">Settings</span>
                  </Link>
                  <button onClick={() => router.push('/api/auth/signout')} className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white hover:bg-sky-600 rounded-2xl transition-all shadow-lg shadow-slate-900/10">
                     <LogOut size={18} />
                     <span className="text-xs font-bold uppercase tracking-widest">Sign Out</span>
                  </button>
               </motion.div>
            </div>

            {/* Quick Status Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard className="p-8 border-l-4 border-l-sky-500">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-500">
                            <Shield size={28} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Account Status</p>
                            <h3 className="text-lg font-bold text-slate-900 capitalize">{userData.role}</h3>
                        </div>
                    </div>
                </DashboardCard>
                <DashboardCard className="p-8 border-l-4 border-l-emerald-500">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                            <Calendar size={28} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Joined Events</p>
                            <h3 className="text-lg font-bold text-slate-900">{attendedEvents.length} Events</h3>
                        </div>
                    </div>
                </DashboardCard>
                <DashboardCard className="p-8 border-l-4 border-l-amber-500">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
                            <BookOpen size={28} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Learning Progress</p>
                            <h3 className="text-lg font-bold text-slate-900">{lessons.filter(l => l.isUnlocked).length} / {lessons.length} Lessons</h3>
                        </div>
                    </div>
                </DashboardCard>
            </div>

            {/* Application Progress (Volunteers only) */}
            {isVolunteer && (
                <div className="space-y-8">
                    <SectionHeader 
                        icon={Activity} 
                        title="Application Journey" 
                        subtitle="Track your progress towards your destination"
                    />
                    <DashboardCard className="p-10 border-none bg-slate-50/50">
                        <div className="space-y-10">
                           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                              <div>
                                 <h4 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Current Step</h4>
                                 <div className="flex items-center gap-3">
                                    <span className="text-2xl font-black text-slate-900">Step {currentStepIndex + 1}: {normalizedStep}</span>
                                    <span className="bg-sky-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Active</span>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <p className="text-sm font-bold text-sky-600 mb-1">{Math.round(progressPercent)}% Completed</p>
                                 <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden ml-auto">
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} className="h-full bg-sky-500" />
                                 </div>
                              </div>
                           </div>

                           <div className="relative pt-8 pb-4">
                                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 rounded-full" />
                                <div className="absolute top-1/2 left-0 h-1 bg-sky-500 -translate-y-1/2 rounded-full transition-all duration-1000" style={{ width: `${progressPercent}%` }} />
                                
                                <div className="relative flex justify-between">
                                    {STEPS.map((step, idx) => {
                                        const isCompleted = idx < currentStepIndex;
                                        const isCurrent = idx === currentStepIndex;
                                        return (
                                            <div key={step} className="flex flex-col items-center gap-4 relative z-10">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-4 ${
                                                    isCompleted ? 'bg-sky-500 border-sky-100 text-white' : 
                                                    isCurrent ? 'bg-white border-sky-500 text-sky-500' : 
                                                    'bg-white border-slate-100 text-slate-300'
                                                }`}>
                                                    {isCompleted ? <CheckCircle2 size={18} /> : <span className="text-xs font-bold">{idx + 1}</span>}
                                                </div>
                                                <span className={`text-[10px] font-bold uppercase tracking-widest ${isCurrent ? 'text-sky-600' : isCompleted ? 'text-slate-900' : 'text-slate-300'}`}>
                                                    {step}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                           </div>
                        </div>
                    </DashboardCard>
                </div>
            )}

            {/* My Events Section */}
            <div className="space-y-8">
                <SectionHeader 
                    icon={Calendar} 
                    title="My Registered Events" 
                    subtitle="Manage your upcoming registrations and participation"
                    action={
                        <Link href="/events" className="flex items-center gap-2 text-sky-500 font-bold text-sm hover:gap-3 transition-all">
                            Browse More Events <ChevronRight size={18} />
                        </Link>
                    }
                />
                
                {attendedEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {attendedEvents.map(event => (
                            <EventCard 
                                key={event._id} 
                                event={event} 
                                onCancel={handleCancelEvent}
                                isRegistered={true} 
                                locale={locale}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] p-20 text-center">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100 text-slate-300">
                            <Calendar size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No registered events yet</h3>
                        <p className="text-slate-500 text-sm max-w-md mx-auto mb-8">
                            Explore our upcoming workshops, campaigns, and meetings to start your journey with VCM.
                        </p>
                        <Link href="/events" className="inline-flex items-center gap-2 bg-sky-500 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-sky-600 transition-all shadow-lg shadow-sky-500/25">
                            Find Events <Plus size={18} />
                        </Link>
                    </div>
                )}
            </div>

            {/* Available Events Section */}
            {availableEvents.length > 0 && (
                <div className="space-y-8">
                    <SectionHeader 
                        icon={Sparkles} 
                        title="Available for Registration" 
                        subtitle="New opportunities waiting for you"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {availableEvents.map(event => (
                            <EventCard 
                                key={event._id} 
                                event={event} 
                                onRegister={handleRegisterEvent}
                                isRegistered={false} 
                                locale={locale}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Lessons Section */}
            <div className="space-y-8">
                <SectionHeader 
                    icon={BookOpen} 
                    title="Study Modules" 
                    subtitle="Access your learning materials and unlock new lessons"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {lessons.map(lesson => (
                        <LessonCard 
                            key={lesson._id} 
                            lesson={lesson} 
                            onUnlock={handleUnlockLesson}
                            locale={locale}
                        />
                    ))}
                    
                    {lessons.length === 0 && (
                        <div className="col-span-full py-12 text-center text-slate-400">
                            No lessons available at the moment.
                        </div>
                    )}
                </div>
            </div>

            {/* Profile Snapshot */}
            <div className="space-y-8">
                <SectionHeader 
                    icon={User} 
                    title="Profile Snapshot" 
                    subtitle="Your recorded information in our system"
                />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <DashboardCard className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <GraduationCap className="text-sky-500" size={20} />
                            <h3 className="font-bold text-slate-900">Academic Info</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Education Level</p>
                                <p className="text-sm font-bold text-slate-900">{userData.profile?.educationLevel || "Not provided"}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Languages</p>
                                <p className="text-sm font-bold text-slate-900">{userData.profile?.languages || "Not provided"}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Affiliation</p>
                                <p className="text-sm font-bold text-slate-900">{userData.affiliation || "Not provided"}</p>
                            </div>
                        </div>
                    </DashboardCard>

                    <DashboardCard className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <MapPin className="text-sky-500" size={20} />
                            <h3 className="font-bold text-slate-900">Contact & Address</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Phone</p>
                                <p className="text-sm font-bold text-slate-900">{userData.phone || "Not provided"}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email</p>
                                <p className="text-sm font-bold text-slate-900">{userData.email}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current City</p>
                                <p className="text-sm font-bold text-slate-900">{userData.profile?.address?.city || "Not provided"}</p>
                            </div>
                        </div>
                    </DashboardCard>

                    <DashboardCard className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Heart className="text-sky-500" size={20} />
                            <h3 className="font-bold text-slate-900">Motivation</h3>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed italic line-clamp-4">
                            &quot;{userData.profile?.motivation || "No motivation letter submitted yet. Your motivation helps us understand your goals better."}&quot;
                        </p>
                        <Link href="/profile" className="inline-block mt-4 text-xs font-bold text-sky-500 hover:underline">
                            Edit Profile Details →
                        </Link>
                    </DashboardCard>
                </div>
            </div>
         </div>
      </div>
   );
}