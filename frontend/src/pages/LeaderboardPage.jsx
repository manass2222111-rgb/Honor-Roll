import { useState } from "react";
import LeaderboardCard from "@/components/LeaderboardCard";
import DetailDialog from "@/components/DetailDialog";
import { Trophy, Sparkles, Users, TrendingUp } from "lucide-react";

const leaderboardData = [
  {
    rank: 1,
    medal: "🥇",
    teacher: "د. محمد طيب",
    circle: "حلقة د. محمد طيب",
    totalStudents: 16,
    achievement: "المركز الأول",
    color: "gold",
    details: {
      monthlyAchievement: 14,
      levelAchievement: 2,
      description: "14 طالبًا من جدول 'انجاز شهر 11' + طالبان من جدول 'إنجاز المستويات'"
    }
  },
  {
    rank: 2,
    medal: "🥈",
    teacher: "الشيخ إبراهيم حيات",
    circle: "حلقة الشيخ إبراهيم حيات",
    totalStudents: 15,
    achievement: "المركز الثاني",
    color: "silver",
    details: {
      monthlyAchievement: 14,
      levelAchievement: 1,
      description: "14 طالبًا من جدول 'انجاز شهر 11' + طالب واحد من جدول 'إنجاز المستويات'"
    }
  },
  {
    rank: 3,
    medal: "🥉",
    teacher: "الشيخ نعمت الله رحمت الله",
    circle: "حلقة الشيخ نعمت الله رحمت الله",
    totalStudents: 8,
    achievement: "المركز الثالث",
    color: "bronze",
    details: {
      monthlyAchievement: 8,
      levelAchievement: 0,
      description: "8 طلاب (جميعهم من جدول 'انجاز شهر 11')"
    }
  }
];

export default function LeaderboardPage() {
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCardClick = (circle) => {
    setSelectedCircle(circle);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 pattern-bg pointer-events-none"></div>
      
      {/* Floating Shapes */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="py-12 px-4 text-center">
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center justify-center gap-3 mb-6 animate-fade-in-up">
              <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-2xl shadow-lg">
                <Trophy className="w-8 h-8 text-primary-foreground" />
              </div>
              <Sparkles className="w-6 h-6 text-secondary animate-pulse" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s', fontFamily: 'Cairo, sans-serif' }}>
              <span className="gradient-text">لوحة الشرف</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground mb-3 animate-fade-in-up" style={{ animationDelay: '0.2s', fontFamily: 'Cairo, sans-serif' }}>
              حلقات تحفيظ القرآن الكريم المتصدرة
            </p>
            
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-card glass-card rounded-full shadow-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <TrendingUp className="w-5 h-5 text-success" />
              <span className="text-sm font-semibold text-foreground" style={{ fontFamily: 'Cairo, sans-serif' }}>أفضل الإنجازات لشهر 11</span>
            </div>
          </div>
        </header>

        {/* Stats Bar */}
        <div className="max-w-6xl mx-auto px-4 mb-12">
          <div className="glass-card rounded-2xl p-8 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl mb-4 shadow-lg">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-4xl font-bold text-foreground mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>39</div>
                <div className="text-sm text-muted-foreground" style={{ fontFamily: 'Cairo, sans-serif' }}>إجمالي الطلاب المتميزين</div>
              </div>
              
              <div className="text-center animate-scale-in" style={{ animationDelay: '0.5s' }}>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent to-accent-light rounded-2xl mb-4 shadow-lg">
                  <Trophy className="w-8 h-8 text-accent-foreground" />
                </div>
                <div className="text-4xl font-bold text-foreground mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>3</div>
                <div className="text-sm text-muted-foreground" style={{ fontFamily: 'Cairo, sans-serif' }}>حلقات متميزة</div>
              </div>
              
              <div className="text-center animate-scale-in" style={{ animationDelay: '0.6s' }}>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary to-secondary-light rounded-2xl mb-4 shadow-lg gold-shine">
                  <Sparkles className="w-8 h-8 text-secondary-foreground" />
                </div>
                <div className="text-4xl font-bold text-foreground mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>100%</div>
                <div className="text-sm text-muted-foreground" style={{ fontFamily: 'Cairo, sans-serif' }}>التزام وإنجاز</div>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Cards - Podium Style */}
        <div className="max-w-7xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
            {/* Second Place */}
            <div className="md:order-1 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              <LeaderboardCard 
                data={leaderboardData[1]} 
                onClick={() => handleCardClick(leaderboardData[1])}
              />
            </div>
            
            {/* First Place - Elevated */}
            <div className="md:order-2 md:scale-110 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <LeaderboardCard 
                data={leaderboardData[0]} 
                onClick={() => handleCardClick(leaderboardData[0])}
                isFirst={true}
              />
            </div>
            
            {/* Third Place */}
            <div className="md:order-3 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
              <LeaderboardCard 
                data={leaderboardData[2]} 
                onClick={() => handleCardClick(leaderboardData[2])}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-8 text-center text-muted-foreground">
          <p className="text-sm" style={{ fontFamily: 'Cairo, sans-serif' }}>بارك الله في جهودكم المباركة</p>
        </footer>
      </div>

      {/* Detail Dialog */}
      <DetailDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        data={selectedCircle}
      />
    </div>
  );
}
