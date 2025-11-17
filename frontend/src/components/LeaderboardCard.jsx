import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, TrendingUp, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LeaderboardCard({ data, onClick, isFirst = false }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const duration = 2000;
    const steps = 60;
    const increment = data.totalStudents / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= data.totalStudents) {
        setCount(data.totalStudents);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [data.totalStudents]);

  const getColorClasses = () => {
    switch (data.color) {
      case 'gold':
        return {
          gradient: 'from-secondary via-secondary-light to-secondary',
          shadow: 'shadow-gold hover:shadow-[0_20px_60px_-5px_hsl(var(--secondary)/0.5)]',
          border: 'border-secondary/20',
          badge: 'bg-gradient-to-r from-secondary to-secondary-light text-secondary-foreground',
          glow: 'group-hover:shadow-[0_0_60px_hsl(var(--secondary)/0.4)]',
          icon: 'bg-gradient-to-br from-secondary to-secondary-light'
        };
      case 'silver':
        return {
          gradient: 'from-primary via-primary-light to-accent',
          shadow: 'shadow-elegant hover:shadow-hover',
          border: 'border-primary/20',
          badge: 'bg-gradient-to-r from-primary to-accent text-primary-foreground',
          glow: 'group-hover:shadow-[0_0_50px_hsl(var(--primary)/0.3)]',
          icon: 'bg-gradient-to-br from-primary to-primary-light'
        };
      case 'bronze':
        return {
          gradient: 'from-accent via-accent-light to-primary-light',
          shadow: 'shadow-card hover:shadow-elegant',
          border: 'border-accent/20',
          badge: 'bg-gradient-to-r from-accent to-primary text-accent-foreground',
          glow: 'group-hover:shadow-[0_0_40px_hsl(var(--accent)/0.3)]',
          icon: 'bg-gradient-to-br from-accent to-accent-light'
        };
      default:
        return {
          gradient: 'from-primary to-accent',
          shadow: 'shadow-card hover:shadow-elegant',
          border: 'border-border',
          badge: 'bg-primary text-primary-foreground',
          glow: '',
          icon: 'bg-primary'
        };
    }
  };

  const colors = getColorClasses();

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden cursor-pointer transition-all duration-500 glass-card",
        colors.shadow,
        colors.glow,
        "hover:scale-105 hover:-translate-y-2",
        isFirst && "animate-pulse-glow"
      )}
      onClick={onClick}
    >
      {/* Gradient Overlay */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity duration-500",
        colors.gradient
      )}></div>

      {/* Rank Badge - Top Right */}
      <div className="absolute -top-3 -right-3 z-20">
        <div className={cn(
          "px-6 py-3 rounded-2xl shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500",
          colors.badge,
          isFirst && "gold-shine"
        )}>
          <span className="text-5xl">{data.medal}</span>
        </div>
      </div>

      <div className="relative p-8 pt-12">
        {/* Rank Number */}
        <div className="absolute top-4 left-4">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center shadow-lg",
            colors.icon
          )}>
            <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Cairo, sans-serif' }}>{data.rank}</span>
          </div>
        </div>

        {/* Achievement Badge */}
        <div className="mb-6">
          <Badge className={cn(
            "text-base px-4 py-2 rounded-xl shadow-md",
            colors.badge
          )} style={{ fontFamily: 'Cairo, sans-serif' }}>
            {data.achievement}
          </Badge>
        </div>

        {/* Teacher Name */}
        <h3 className="text-3xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300" style={{ fontFamily: 'Cairo, sans-serif' }}>
          {data.teacher}
        </h3>

        {/* Circle Name */}
        <p className="text-base text-muted-foreground mb-6 flex items-center gap-2" style={{ fontFamily: 'Cairo, sans-serif' }}>
          <Trophy className="w-5 h-5 text-primary" />
          {data.circle}
        </p>

        {/* Animated Counter */}
        <div className="relative">
          <div className="flex items-center justify-between p-6 bg-muted/50 rounded-2xl backdrop-blur-sm group-hover:bg-muted/70 transition-colors duration-300">
            <div className="flex items-center gap-4">
              <div className={cn(
                "p-4 rounded-xl shadow-lg",
                colors.icon
              )}>
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1" style={{ fontFamily: 'Cairo, sans-serif' }}>إجمالي الطلاب</div>
                <div className={cn(
                  "text-5xl font-bold animate-count-up",
                  isFirst ? "gradient-text" : "text-foreground"
                )} style={{ fontFamily: 'Cairo, sans-serif' }}>
                  {count}
                </div>
              </div>
            </div>
            
            <div className="text-success">
              <TrendingUp className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Click Indicator */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span style={{ fontFamily: 'Cairo, sans-serif' }}>انقر لعرض التفاصيل</span>
          <ChevronLeft className="w-4 h-4" />
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className={cn(
        "h-2 w-full bg-gradient-to-r",
        colors.gradient
      )}></div>
    </Card>
  );
}
