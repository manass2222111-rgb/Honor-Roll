import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, setDoc } from "firebase/firestore";
import { 
  Trophy, Medal, Users, Star, Edit3, Save, X, Lock, LogOut, Crown, Award, 
  TrendingUp, Activity, Calendar, BookOpen, CheckCircle 
} from 'lucide-react';

// --- 1. إعدادات الاتصال بـ Firebase ---
const firebaseConfig = {
  apiKey: "AIzaSyByNg9H3oqB0t0pKO2X4vjGNPXvT-5Qt68",
  authDomain: "quranleaderboard.firebaseapp.com",
  projectId: "quranleaderboard",
  storageBucket: "quranleaderboard.firebasestorage.app",
  messagingSenderId: "799927439014",
  appId: "1:799927439014:web:c91ff07abd32c20b672e67",
  measurementId: "G-NY3NLJ2D1Z"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- 2. التطبيق الشامل ---
export default function App() {
  
  const defaultData = {
    title: "لوحة التميز القرآني",
    subtitle: "حلقات التحفيظ - الدورة الشتوية 2024",
    monthLabel: "حصاد شهر 12",
    stats: { students: 45, circles: 4, rate: "98%" },
    winners: [
      { rank: 1, name: "الشيخ محمد طيب", circle: "حلقة النور", score: 98, badge: "القمة", desc: "إتمام 5 أجزاء" },
      { rank: 2, name: "الشيخ إبراهيم", circle: "حلقة الفرقان", score: 95, badge: "تميز", desc: "إتمام 3 أجزاء" },
      { rank: 3, name: "الشيخ أحمد", circle: "حلقة البيان", score: 90, badge: "إبداع", desc: "مراجعة شاملة" },
    ]
  };

  const [data, setData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "dashboard", "main"), (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        setDoc(doc(db, "dashboard", "main"), defaultData);
        setData(defaultData);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error:", error);
      setData(defaultData);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await setDoc(doc(db, "dashboard", "main"), data);
      alert("✅ تم الحفظ وتحديث جميع الشاشات بنجاح!");
      setIsAdmin(false);
    } catch (e) {
      alert("❌ خطأ: " + e.message);
    }
    setIsSaving(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin") { 
      setIsAdmin(true);
      setShowLogin(false);
      setPassword("");
    } else {
      alert("كلمة المرور خاطئة");
    }
  };

  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
  };
  
  const handleStatChange = (field, value) => {
    setData({ ...data, stats: { ...data.stats, [field]: value } });
  };

  const updateWinner = (index, field, value) => {
    const newWinners = [...data.winners];
    newWinners[index] = { ...newWinners[index], [field]: value };
    setData({ ...data, winners: newWinners });
  };

  if (loading || !data) return (
    <div className="min-h-screen bg-[#f8f5f0] flex flex-col items-center justify-center text-slate-600">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#b4975a] mb-4"></div>
      <p className="text-lg font-medium text-[#8c7335]">جاري تحميل اللوحة...</p>
    </div>
  );

  return (
    // الخلفية أصبحت "أوف وايت" (بيج فاتح جداً) مريح للعين
    <div className="min-h-screen bg-[#f8f5f0] text-slate-800 font-sans selection:bg-[#b4975a]/20 pb-10" dir="rtl">
      
      {/* زر الإدارة */}
      {!isAdmin && (
        <button 
          onClick={() => setShowLogin(true)} 
          className="fixed bottom-6 left-6 p-4 bg-white hover:bg-[#f0eadd] text-slate-400 hover:text-[#b4975a] rounded-full shadow-xl border border-[#e6dec8] transition-all z-50 group"
          title="دخول المشرف"
        >
          <Lock className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* نافذة الدخول */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2c2820]/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white border border-[#e6dec8] p-8 rounded-2xl w-full max-w-sm text-center shadow-2xl relative">
            <button onClick={() => setShowLogin(false)} className="absolute top-4 left-4 text-slate-400 hover:text-slate-600"><X /></button>
            <div className="bg-[#f8f5f0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#b4975a]/20">
              <Lock className="w-8 h-8 text-[#b4975a]" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#5a4a25]">منطقة المشرفين</h3>
            <form onSubmit={handleLogin}>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="كلمة المرور" className="w-full p-3 bg-[#fdfbf7] border border-[#e6dec8] rounded-xl mb-4 text-center text-slate-800 focus:ring-2 focus:ring-[#b4975a] outline-none" autoFocus />
              <button type="submit" className="w-full bg-gradient-to-r from-[#b4975a] to-[#9a8045] hover:from-[#9a8045] hover:to-[#806a38] text-white py-3 rounded-xl font-bold shadow-md transition-all">دخول</button>
            </form>
          </div>
        </div>
      )}

      {/* --- وضع التعديل (ADMIN) --- */}
      {isAdmin ? (
        <div className="max-w-4xl mx-auto p-4 md:p-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl border border-[#e6dec8] shadow-sm">
            <div>
              <h2 className="text-2xl font-bold text-[#5a4a25] flex items-center gap-2"><Edit3 className="text-[#b4975a]" /> لوحة التحكم</h2>
              <p className="text-slate-500 text-sm mt-1">تعديل البيانات سيظهر فوراً للجميع</p>
            </div>
            <button onClick={() => setIsAdmin(false)} className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg flex items-center gap-2 border border-red-100"><LogOut size={18}/> خروج</button>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#e6dec8] shadow-sm">
              <h3 className="text-[#5a4a25] mb-4 font-bold flex items-center gap-2"><Activity className="w-5 h-5 text-blue-500"/> البيانات العامة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div><label className="block text-xs text-slate-500 mb-1">العنوان الرئيسي</label><input value={data.title} onChange={e => handleChange('title', e.target.value)} className="w-full p-3 bg-[#fdfbf7] border border-[#e6dec8] rounded-xl focus:border-[#b4975a] outline-none transition-colors" /></div>
                <div><label className="block text-xs text-slate-500 mb-1">العنوان الفرعي</label><input value={data.subtitle} onChange={e => handleChange('subtitle', e.target.value)} className="w-full p-3 bg-[#fdfbf7] border border-[#e6dec8] rounded-xl focus:border-[#b4975a] outline-none transition-colors" /></div>
                <div><label className="block text-xs text-slate-500 mb-1">شعار الشهر</label><input value={data.monthLabel} onChange={e => handleChange('monthLabel', e.target.value)} className="w-full p-3 bg-[#fdfbf7] border border-[#e6dec8] rounded-xl focus:border-[#b4975a] outline-none transition-colors" /></div>
              </div>
              <div className="grid grid-cols-3 gap-4 border-t border-[#e6dec8] pt-4">
                <input type="number" value={data.stats.students} onChange={e => handleStatChange('students', e.target.value)} className="w-full p-2 bg-[#fdfbf7] border border-[#e6dec8] rounded-lg text-center" />
                <input type="number" value={data.stats.circles} onChange={e => handleStatChange('circles', e.target.value)} className="w-full p-2 bg-[#fdfbf7] border border-[#e6dec8] rounded-lg text-center" />
                <input value={data.stats.rate} onChange={e => handleStatChange('rate', e.target.value)} className="w-full p-2 bg-[#fdfbf7] border border-[#e6dec8] rounded-lg text-center" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#e6dec8] shadow-sm">
              <h3 className="text-[#b4975a] mb-6 font-bold flex items-center gap-2"><Crown className="w-5 h-5"/> المراكز الأولى</h3>
              {data.winners.map((winner, idx) => (
                <div key={idx} className="mb-6 p-5 bg-[#fdfbf7] rounded-xl border border-[#e6dec8] relative group hover:border-[#b4975a]/50 transition-colors">
                  <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md text-white ${idx === 0 ? 'bg-[#b4975a]' : idx === 1 ? 'bg-slate-400' : 'bg-[#cd7f32]'}`}>{idx + 1}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-xs text-slate-500 mb-1">الاسم</label><input value={winner.name} onChange={e => updateWinner(idx, 'name', e.target.value)} className="w-full p-2 bg-white rounded border border-[#e6dec8] focus:border-[#b4975a] outline-none" /></div>
                    <div><label className="block text-xs text-slate-500 mb-1">الحلقة</label><input value={winner.circle} onChange={e => updateWinner(idx, 'circle', e.target.value)} className="w-full p-2 bg-white rounded border border-[#e6dec8] focus:border-[#b4975a] outline-none" /></div>
                    <div className="col-span-1 md:col-span-2"><label className="block text-xs text-slate-500 mb-1">الوصف (الإنجاز)</label><input value={winner.desc} onChange={e => updateWinner(idx, 'desc', e.target.value)} className="w-full p-2 bg-white rounded border border-[#e6dec8] focus:border-[#b4975a] outline-none" /></div>
                    <div className="grid grid-cols-2 gap-2 col-span-1 md:col-span-2">
                      <div><label className="block text-xs text-slate-500 mb-1">النقاط</label><input type="number" value={winner.score} onChange={e => updateWinner(idx, 'score', e.target.value)} className="w-full p-2 bg-white rounded border border-[#e6dec8] text-center font-mono" /></div>
                      <div><label className="block text-xs text-slate-500 mb-1">اللقب</label><input value={winner.badge} onChange={e => updateWinner(idx, 'badge', e.target.value)} className="w-full p-2 bg-white rounded border border-[#e6dec8] text-center" /></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="sticky bottom-6">
              <button onClick={handleSave} disabled={isSaving} className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-2xl font-bold text-lg shadow-xl shadow-emerald-100 flex items-center justify-center gap-2 transition transform hover:scale-[1.01] active:scale-95 disabled:opacity-70">
                {isSaving ? "جاري الحفظ..." : <><Save className="w-5 h-5" /> حفظ ونشر التعديلات</>}
              </button>
            </div>
          </div>
        </div>
      ) : (
        // --- وضع العرض (VIEW - التصميم الإسلامي الفاخر) ---
        <div className="max-w-6xl mx-auto px-4 py-12">
          
          {/* الرأس */}
          <header className="text-center mb-16 relative animate-in fade-in slide-in-from-top-8 duration-1000">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-full border border-[#b4975a]/30 shadow-sm">
              <Award className="w-4 h-4 text-[#b4975a]" />
              <span className="text-xs font-bold text-[#8c7335] tracking-wide uppercase">{data.monthLabel}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#b4941f] to-[#d4af37] mb-6 tracking-tight leading-tight drop-shadow-sm" style={{ fontFamily: 'Amiri, serif' }}>
              {data.title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
              {data.subtitle}
            </p>
            
            {/* زخرفة إسلامية خفيفة في الخلفية (محاكاة) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[300px] bg-[#b4975a]/5 blur-[100px] -z-10 rounded-full pointer-events-none"></div>
          </header>

          {/* شريط الإحصائيات */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20 max-w-4xl mx-auto">
            <StatCard icon={Users} value={data.stats.students} label="الطلاب المتميزين" color="text-[#1e40af]" delay="100ms" />
            <StatCard icon={BookOpen} value={data.stats.circles} label="الحلقات المتصدرة" color="text-[#b4975a]" delay="200ms" />
            <StatCard icon={Activity} value={data.stats.rate} label="نسبة الإنجاز العام" color="text-[#059669]" delay="300ms" />
          </div>

          {/* منصة التتويج */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-end mb-20 relative">
            
            {/* المركز الثاني */}
            <div className="order-2 lg:order-1 animate-in slide-in-from-bottom-12 duration-1000 delay-200">
              <RankCard 
                rank={2} 
                data={data.winners[1]} 
                icon={<Medal size={32} className="text-slate-500" />}
                color="bg-[#f0f4f8]"
                gradient="from-white to-[#e2e8f0]"
                border="border-slate-200"
                textColor="text-slate-700"
                scoreColor="text-slate-600"
              />
            </div>

            {/* المركز الأول (الذهبي الفاخر) */}
            <div className="order-1 lg:order-2 z-10 transform lg:-translate-y-8 animate-in slide-in-from-bottom-16 duration-1000">
              {/* هالة نورانية خلف المركز الأول */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#b4975a]/20 blur-[80px] -z-10 rounded-full opacity-60"></div>
              <RankCard 
                rank={1} 
                data={data.winners[0]} 
                icon={<Trophy size={40} className="text-[#8c7335]" />}
                color="bg-gradient-to-b from-[#fffbeb] to-[#fef3c7]"
                gradient="from-white to-[#fffbeb]"
                border="border-[#fae69e]"
                textColor="text-[#713f12]"
                scoreColor="text-[#b4975a]"
                isFirst={true}
              />
            </div>

            {/* المركز الثالث */}
            <div className="order-3 lg:order-3 animate-in slide-in-from-bottom-12 duration-1000 delay-400">
              <RankCard 
                rank={3} 
                data={data.winners[2]} 
                icon={<Medal size={32} className="text-[#a05a2c]" />}
                color="bg-[#fff7ed]"
                gradient="from-white to-[#ffedd5]"
                border="border-orange-100"
                textColor="text-[#7c2d12]"
                scoreColor="text-[#c2410c]"
              />
            </div>
          </div>

          <footer className="text-center border-t border-[#e6dec8] pt-8 pb-4">
            <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4 text-[#b4975a]" /> تم التحديث: {new Date().toLocaleDateString('ar-EG')}
            </p>
            <div className="mt-4 text-xs text-[#b4975a] opacity-80">
              اللهم اجعلنا من أهل القرآن
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}

// --- مكونات العرض الفرعية (تصميم البطاقات الفاتحة) ---

const StatCard = ({ icon: Icon, value, label, color, delay }) => (
  <div 
    className="bg-white border border-[#e6dec8] p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-all duration-300 group"
    style={{ animationDelay: delay }}
  >
    <div className={`w-12 h-12 rounded-xl bg-[#fdfbf7] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 border border-[#e6dec8]`}>
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
    <div className="text-3xl font-black text-slate-800 mb-1 tracking-tight">{value}</div>
    <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">{label}</div>
  </div>
);

const RankCard = ({ rank, data, icon, color, gradient, border, textColor, scoreColor, isFirst = false }) => (
  <div className={`relative overflow-hidden rounded-3xl border ${border} bg-gradient-to-b ${gradient} shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group`}>
    {/* شريط الترتيب */}
    <div className="relative h-24 flex items-center justify-center overflow-hidden">
      <div className={`absolute inset-0 opacity-50 ${color}`}></div>
      <div className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-inner bg-white border-4 border-white/80 transform group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <div className="absolute bottom-2 text-[10px] font-black uppercase tracking-widest opacity-60 text-slate-600">المركز {rank}</div>
    </div>

    {/* المحتوى */}
    <div className="p-6 text-center relative z-10">
      <h3 className={`font-bold ${textColor} mb-1 leading-tight ${isFirst ? 'text-3xl' : 'text-2xl'}`}>
        {data.name}
      </h3>
      <p className="text-slate-500 text-sm mb-6 font-medium">{data.circle}</p>

      {/* التفاصيل */}
      <div className="bg-white/60 rounded-2xl p-4 border border-[#e6dec8]/50 backdrop-blur-sm shadow-sm">
        <div className="flex justify-between items-center mb-3 border-b border-[#e6dec8]/50 pb-3">
          <span className="text-xs text-slate-500">النقاط</span>
          <span className={`font-mono font-black text-xl ${scoreColor}`}>
            {data.score}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#fdfbf7] border border-[#e6dec8] text-[10px] text-slate-600">
            <Star className="w-3 h-3 text-[#b4975a] fill-[#b4975a]" />
            {data.badge}
          </span>
          <span className="text-[10px] text-slate-500 truncate max-w-[100px]">
            {data.desc}
          </span>
        </div>
      </div>
    </div>
    
    {/* لمعان خفيف */}
    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
  </div>
);
