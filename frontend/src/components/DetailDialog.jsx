import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Trophy, Users, Calendar, Award, TrendingUp, BookOpen, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DetailDialog({ open, onOpenChange, data }) {
  if (!data) return null;

  const getColorClasses = () => {
    switch (data.color) {
      case 'gold':
        return {
          gradient: 'from-secondary via-secondary-light to-secondary',
          badge: 'bg-gradient-to-r from-secondary to-secondary-light text-secondary-foreground',
          icon: 'bg-gradient-to-br from-secondary to-secondary-light text-white'
        };
      case 'silver':
        return {
          gradient: 'from-primary via-primary-light to-accent',
          badge: 'bg-gradient-to-r from-primary to-accent text-primary-foreground',
          icon: 'bg-gradient-to-br from-primary to-primary-light text-white'
        };
      case 'bronze':
        return {
          gradient: 'from-accent via-accent-light to-primary-light',
          badge: 'bg-gradient-to-r from-accent to-primary text-accent-foreground',
          icon: 'bg-gradient-to-br from-accent to-accent-light text-white'
        };
      default:
        return {
          gradient: 'from-primary to-accent',
          badge: 'bg-primary text-primary-foreground',
          icon: 'bg-primary text-white'
        };
    }
  };

  const colors = getColorClasses();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl glass-card">
        {/* Close Button - Mobile Friendly - Right side for RTL */}
        <button
          onClick={() => onOpenChange(false)}
          className={cn(
            "absolute right-4 top-4 rounded-full p-3 transition-colors z-50",
            "bg-muted/80 hover:bg-muted active:bg-muted/90",
            "ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "disabled:pointer-events-none shadow-lg"
          )}
          aria-label="إغلاق"
        >
          <X className="h-6 w-6 text-foreground" />
        </button>

        <DialogHeader>
          <div className="flex items-center gap-4 mb-4 pl-12">
            <div className="text-5xl sm:text-6xl">{data.medal}</div>
            <div className="flex-1">
              <DialogTitle className="text-2xl sm:text-3xl mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>
                {data.teacher}
              </DialogTitle>
              <DialogDescription className="text-base sm:text-lg" style={{ fontFamily: 'Cairo, sans-serif' }}>
                {data.circle}
              </DialogDescription>
            </div>
          </div>

          <Badge className={cn(
            "text-lg px-6 py-3 rounded-xl w-fit",
            colors.badge
          )} style={{ fontFamily: 'Cairo, sans-serif' }}>
            {data.achievement}
          </Badge>
        </DialogHeader>

        <Separator className="my-6" />

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="glass-card p-6 rounded-2xl text-center animate-scale-in">
            <div className={cn(
              "inline-flex items-center justify-center w-14 h-14 rounded-xl mb-3",
              colors.icon
            )}>
              <Users className="w-7 h-7" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1" style={{ fontFamily: 'Cairo, sans-serif' }}>
              {data.totalStudents}
            </div>
            <div className="text-sm text-muted-foreground" style={{ fontFamily: 'Cairo, sans-serif' }}>إجمالي الطلاب</div>
          </div>

          <div className="glass-card p-6 rounded-2xl text-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <div className={cn(
              "inline-flex items-center justify-center w-14 h-14 rounded-xl mb-3",
              colors.icon
            )}>
              <Calendar className="w-7 h-7" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1" style={{ fontFamily: 'Cairo, sans-serif' }}>
              {data.details.monthlyAchievement}
            </div>
            <div className="text-sm text-muted-foreground" style={{ fontFamily: 'Cairo, sans-serif' }}>إنجاز شهر 11</div>
          </div>

          <div className="glass-card p-6 rounded-2xl text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className={cn(
              "inline-flex items-center justify-center w-14 h-14 rounded-xl mb-3",
              colors.icon
            )}>
              <Award className="w-7 h-7" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-1" style={{ fontFamily: 'Cairo, sans-serif' }}>
              {data.details.levelAchievement}
            </div>
            <div className="text-sm text-muted-foreground" style={{ fontFamily: 'Cairo, sans-serif' }}>إنجاز المستويات</div>
          </div>
        </div>

        {/* Description */}
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className={cn(
              "p-3 rounded-xl shrink-0",
              colors.icon
            )}>
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>تفاصيل الإنجاز</h4>
              <p className="text-base text-muted-foreground leading-relaxed" style={{ fontFamily: 'Cairo, sans-serif' }}>
                {data.details.description}
              </p>
            </div>
          </div>
        </div>

        {/* Achievement Indicator */}
        <div className="mt-6 flex items-center justify-center gap-3 p-4 bg-success/10 rounded-2xl border border-success/20">
          <TrendingUp className="w-5 h-5 text-success" />
          <span className="text-base font-semibold text-success" style={{ fontFamily: 'Cairo, sans-serif' }}>إنجاز متميز ومبارك</span>
          <Trophy className="w-5 h-5 text-success" />
        </div>

        {/* Back Button - Mobile Optimized */}
        <div className="mt-6">
          <Button
            onClick={() => onOpenChange(false)}
            className={cn(
              "w-full h-14 text-lg rounded-xl",
              colors.icon,
              "hover:opacity-90 transition-all duration-300",
              "flex items-center justify-center gap-3"
            )}
            style={{ fontFamily: 'Cairo, sans-serif' }}
          >
            <ArrowRight className="w-5 h-5" />
            <span>رجوع إلى اللوحة</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
