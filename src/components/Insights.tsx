import { Card } from "./ui/card";
import { motion } from "motion/react";
import { TrendingUp, BookOpen, Flame, Sparkles, Clock, MessageSquare, Heart, Brain, Zap, Calendar, Crown, ArrowRight, Target, Trash2 } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

const moodData = [
  { day: "Mon", score: 7 },
  { day: "Tue", score: 6 },
  { day: "Wed", score: 8 },
  { day: "Thu", score: 7 },
  { day: "Fri", score: 9 },
  { day: "Sat", score: 8 },
  { day: "Sun", score: 8 },
];

const moodDistribution = [
  { mood: "😊", count: 12, name: "Happy" },
  { mood: "😌", count: 8, name: "Calm" },
  { mood: "🤔", count: 6, name: "Reflective" },
  { mood: "😢", count: 3, name: "Down" },
  { mood: "🔥", count: 5, name: "Energized" },
];

const writingTimeData = [
  { time: "Morning", count: 15 },
  { time: "Afternoon", count: 8 },
  { time: "Evening", count: 22 },
  { time: "Night", count: 12 },
];

const emotionBreakdown = [
  { name: "Gratitude", value: 35, color: "#4a7c7e" },
  { name: "Growth", value: 28, color: "#67999b" },
  { name: "Stress", value: 15, color: "#a8c9ca" },
  { name: "Joy", value: 22, color: "#7aadaf" },
];

const topWords = [
  { word: "grateful", size: 32 },
  { word: "growth", size: 28 },
  { word: "reflection", size: 24 },
  { word: "mindful", size: 20 },
  { word: "journey", size: 18 },
  { word: "peace", size: 16 },
  { word: "progress", size: 22 },
  { word: "intention", size: 19 },
];

const highlights = [
  "You've created 5 Innerlogs this week - your best streak yet! 🎉",
  "Common theme: Personal growth and self-compassion",
  "Your mood has improved 23% compared to last week",
  "Evening Innerlogs show deeper reflection patterns",
  "You write 40% more when expressing gratitude",
];

interface InsightsProps {
  onNavigateToCoach: () => void;
}

interface CapturedGoal {
  id: number;
  goal: string;
  date: string;
}

export function Insights({ onNavigateToCoach }: InsightsProps) {
  const [capturedGoals, setCapturedGoals] = useState<CapturedGoal[]>([]);

  useEffect(() => {
    // Load goals from localStorage
    const loadGoals = () => {
      const stored = localStorage.getItem('capturedGoals');
      if (stored) {
        const goals = JSON.parse(stored);
        setCapturedGoals(goals);
      }
    };

    loadGoals();
    
    // Refresh when window gets focus (in case goals were added in another tab)
    window.addEventListener('focus', loadGoals);
    return () => window.removeEventListener('focus', loadGoals);
  }, []);

  const deleteGoal = (id: number) => {
    const updatedGoals = capturedGoals.filter(g => g.id !== id);
    setCapturedGoals(updatedGoals);
    localStorage.setItem('capturedGoals', JSON.stringify(updatedGoals));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen w-full" style={{ background: "var(--gradient-calm)" }}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl mb-4 tracking-tight" style={{ fontFamily: "Lora, serif", color: "var(--sage-800)" }}>
            Innerlog
          </h1>
          <h1 className="mb-1">Insights</h1>
          <p className="text-muted-foreground">Your reflection patterns and growth</p>
        </motion.div>

        {/* Stats Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8 px-12"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="p-5 rounded-3xl shadow-md border border-border/50 bg-card/80 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-2xl bg-[var(--lavender)]">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="text-2xl font-semibold mb-0.5" style={{ fontFamily: 'Lora, serif' }}>
                    57
                  </div>
                  <p className="text-sm text-muted-foreground">Total Innerlogs</p>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="p-5 rounded-3xl shadow-md border border-border/50 bg-card/80 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-2xl bg-[var(--mint)]">
                      <Flame className="h-5 w-5 text-orange-500" />
                    </div>
                  </div>
                  <div className="text-2xl font-semibold mb-0.5" style={{ fontFamily: 'Lora, serif' }}>
                    7
                  </div>
                  <p className="text-sm text-muted-foreground">Day streak</p>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="p-5 rounded-3xl shadow-md border border-border/50 bg-card/80 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-2xl bg-[var(--cream)]">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-semibold mb-0.5" style={{ fontFamily: 'Lora, serif' }}>
                    +23%
                  </div>
                  <p className="text-sm text-muted-foreground">Mood trend</p>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="p-5 rounded-3xl shadow-md border border-border/50 bg-card/80 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-2xl bg-[var(--teal-light)]/30">
                      <Heart className="h-5 w-5 text-rose-500" />
                    </div>
                  </div>
                  <div className="text-2xl font-semibold mb-0.5" style={{ fontFamily: 'Lora, serif' }}>
                    8.1
                  </div>
                  <p className="text-sm text-muted-foreground">Avg. mood</p>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="p-5 rounded-3xl shadow-md border border-border/50 bg-card/80 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-2xl bg-[var(--seafoam)]/40">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="text-2xl font-semibold mb-0.5" style={{ fontFamily: 'Lora, serif' }}>
                    12
                  </div>
                  <p className="text-sm text-muted-foreground">This week</p>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="p-5 rounded-3xl shadow-md border border-border/50 bg-card/80 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-2xl bg-[var(--glacier)]">
                      <Zap className="h-5 w-5 text-amber-500" />
                    </div>
                  </div>
                  <div className="text-2xl font-semibold mb-0.5" style={{ fontFamily: 'Lora, serif' }}>
                    21
                  </div>
                  <p className="text-sm text-muted-foreground">Longest streak</p>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="-left-4" />
            <CarouselNext className="-right-4" />
          </Carousel>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Mood Trends Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Card className="p-6 rounded-3xl shadow-md border border-border/50 bg-card/80 backdrop-blur-sm h-full">
              <h3 className="mb-6">Mood Trends (7 Days)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={moodData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="day" stroke="#6e6e6e" style={{ fontSize: '13px' }} />
                  <YAxis stroke="#6e6e6e" domain={[0, 10]} style={{ fontSize: '13px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e0e0e0",
                      borderRadius: "12px",
                      padding: "8px 12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#4a7c7e"
                    strokeWidth={3}
                    dot={{ fill: "#4a7c7e", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

        </div>

        {/* Second Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Emotion Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.65 }}
          >
            <Card className="p-6 rounded-3xl shadow-md border border-border/50 bg-card/80 backdrop-blur-sm h-full">
              <h3 className="mb-6">Emotion Breakdown</h3>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={emotionBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {emotionBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e0e0e0",
                        borderRadius: "12px",
                        padding: "8px 12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {emotionBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.name} ({item.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* AI Goal Tracker - Premium Feature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <Card className="p-6 rounded-3xl shadow-md border border-border/50 bg-card/80 backdrop-blur-sm h-full relative overflow-hidden">
              <div className="flex items-center gap-2 mb-6">
                <Target className="h-5 w-5 text-primary" />
                <h3>AI Goal Tracker</h3>
              </div>
              
              {/* Blurred preview content */}
              <div className="blur-sm select-none pointer-events-none">
                <div className="flex flex-col items-center justify-center py-8 text-center opacity-60">
                  <div className="p-4 rounded-full bg-muted/50 mb-4">
                    <Target className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground max-w-md mb-6">
                    As you add more Innerlogs your AI coach is going to pick up on goals and add them here.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="p-4 bg-background/50 rounded-2xl border border-border/30">
                    <p className="text-sm leading-relaxed mb-2">Start exercising regularly and build a consistent routine</p>
                    <span className="text-xs text-muted-foreground">Oct 15</span>
                  </div>
                  <div className="p-4 bg-background/50 rounded-2xl border border-border/30">
                    <p className="text-sm leading-relaxed mb-2">Read 20 books this year and expand my perspective</p>
                    <span className="text-xs text-muted-foreground">Oct 12</span>
                  </div>
                  <div className="p-4 bg-background/50 rounded-2xl border border-border/30">
                    <p className="text-sm leading-relaxed mb-2">Learn to meditate and practice mindfulness daily</p>
                    <span className="text-xs text-muted-foreground">Oct 10</span>
                  </div>
                </div>
              </div>
              
              {/* Premium overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-card via-card/95 to-card/60 pt-6">
                <div className="text-center px-6 py-8">
                  <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-amber-500/10 mb-4">
                    <Crown className="h-8 w-8 text-amber-600" />
                  </div>
                  <h4 className="mb-2" style={{ fontFamily: 'Lora, serif' }}>
                    Unlock Goal Tracking
                  </h4>
                  <p className="text-sm text-muted-foreground mb-5 max-w-md">
                    Your AI coach automatically detects and tracks goals from your Innerlogs, helping you stay focused on what matters most.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Button 
                      className="rounded-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity shadow-lg text-white"
                    >
                      Upgrade to Premium
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button 
                      onClick={() => console.log('Navigate to free trial purchase')}
                      variant="outline"
                      className="rounded-full border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5"
                    >
                      Start 7-Day Free Trial
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* AI Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.75 }}
          >
            <Card
              className="p-6 rounded-3xl shadow-md border border-border/50 backdrop-blur-sm h-full"
              style={{ background: "var(--gradient-card)" }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3>AI Insights</h3>
              </div>
              <div className="space-y-3">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.08 }}
                    className="p-4 bg-card/60 rounded-2xl border border-border/30"
                  >
                    <p className="text-sm leading-relaxed">{highlight}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* AI Coach Weekly Reflection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <Card 
            className="p-8 rounded-3xl shadow-md border border-border/50 backdrop-blur-sm relative overflow-hidden"
            style={{ background: "var(--gradient-card)" }}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[var(--teal-primary)]">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="mb-0.5">AI Coach Weekly Reflection</h3>
                  <p className="text-sm text-muted-foreground">Personalized insights from your Innerlogs</p>
                </div>
              </div>
            </div>

            <div className="space-y-5 mb-6">
              <div className="leading-relaxed text-foreground/90">
                <p className="mb-4">
                  This week, I noticed a meaningful shift in your writing. On <span className="font-medium">Tuesday's Innerlog about the project deadline</span>, you expressed anxiety, but by <span className="font-medium">Thursday</span>, your reflection showed you'd reframed the challenge as an opportunity to showcase your abilities.
                </p>
              </div>

              {/* Blur overlay for premium upsell */}
              <div className="relative">
                <div className="blur-[6px] select-none pointer-events-none opacity-60">
                  <p className="leading-relaxed text-foreground/70 mb-3">
                    Looking at the connection between your professional stress and personal fulfillment, there's an interesting dynamic emerging. Your Innerlogs suggest you're moving through a transition period where old patterns of self-judgment are giving way to more compassionate self-understanding. This shift isn't just cognitive—it's fundamentally changing how you relate to yourself...
                  </p>
                  <p className="leading-relaxed text-foreground/70 mb-3">
                    Based on patterns I've observed in your previous Innerlogs about relationships and self-worth, I would guide you toward exploring the underlying beliefs that drive your need for external validation. There's a particular thread that emerges when you write about professional achievements...
                  </p>
                  <p className="leading-relaxed text-foreground/70">
                    Your writing reveals a growing awareness of the gap between who you think you should be and who you authentically are. This awareness is powerful—it's the beginning of integration and wholeness.
                  </p>
                </div>
                
                {/* Premium overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-card via-card/98 to-transparent pt-12">
                  <div className="text-center px-6 py-10">
                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-amber-500/10 mb-4">
                      <Crown className="h-8 w-8 text-amber-600" />
                    </div>
                    <h4 className="mb-2" style={{ fontFamily: 'Lora, serif' }}>
                      Unlock Deeper Insights
                    </h4>
                    <p className="text-sm text-muted-foreground mb-5 max-w-md">
                      Get personalized AI coaching that references your entire Innerlog history, identifies hidden patterns, and offers life guidance tailored to your unique journey.
                    </p>
                    <div className="flex flex-col gap-3">
                      <Button 
                        className="rounded-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity shadow-lg text-white"
                      >
                        Upgrade to Premium
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button 
                        onClick={onNavigateToCoach}
                        variant="outline"
                        className="rounded-full border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5"
                      >
                        Try 3 Free Insights
                      </Button>
                    </div>
                    <button 
                      onClick={() => console.log('Navigate to free trial purchase')}
                      className="text-xs text-muted-foreground mt-3 mb-4 hover:text-primary transition-colors cursor-pointer underline underline-offset-2"
                    >
                      7-day free trial • Cancel anytime
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
