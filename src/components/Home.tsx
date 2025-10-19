import { useState } from "react";
import { Plus, BookOpen, Sparkles, Heart, List, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Calendar } from "./ui/calendar";
import { motion, AnimatePresence } from "motion/react";

interface JournalEntry {
  id: string;
  date: string;
  preview: string;
  mood: string;
  hasAIFeedback: boolean;
  fullDate: Date;
}

const mockEntries: JournalEntry[] = [
  {
    id: "1",
    date: "Today, 9:24 AM",
    preview: "Had a wonderful morning meditation session. Feeling grateful for the quiet moments...",
    mood: "😊",
    hasAIFeedback: true,
    fullDate: new Date(),
  },
  {
    id: "2",
    date: "Yesterday, 8:15 PM",
    preview: "Reflecting on the week's challenges. Sometimes growth comes from discomfort...",
    mood: "🤔",
    hasAIFeedback: true,
    fullDate: new Date(Date.now() - 86400000),
  },
  {
    id: "3",
    date: "Oct 12, 7:30 AM",
    preview: "Morning pages - letting my thoughts flow freely without judgment. It's liberating...",
    mood: "✨",
    hasAIFeedback: false,
    fullDate: new Date(2024, 9, 12),
  },
  {
    id: "4",
    date: "Oct 11, 9:45 PM",
    preview: "Grateful for today's small victories. Progress isn't always linear...",
    mood: "🌟",
    hasAIFeedback: true,
    fullDate: new Date(2024, 9, 11),
  },
  {
    id: "5",
    date: "Oct 10, 6:00 AM",
    preview: "Setting intentions for the week ahead. What do I want to cultivate?",
    mood: "🌱",
    hasAIFeedback: false,
    fullDate: new Date(2024, 9, 10),
  },
];

interface HomeProps {
  onNewEntry: () => void;
  onSelectEntry: (entry: JournalEntry) => void;
}

export function Home({ onNewEntry, onSelectEntry }: HomeProps) {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Get entries for a specific date
  const getEntriesForDate = (date: Date) => {
    return mockEntries.filter(entry => {
      const entryDate = entry.fullDate;
      return (
        entryDate.getDate() === date.getDate() &&
        entryDate.getMonth() === date.getMonth() &&
        entryDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Get all dates that have entries
  const getDatesWithEntries = () => {
    return mockEntries.map(entry => entry.fullDate);
  };

  const selectedDateEntries = selectedDate ? getEntriesForDate(selectedDate) : [];
  const datesWithEntries = getDatesWithEntries();
  return (
    <div className="min-h-screen w-full" style={{ background: "var(--gradient-calm)" }}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="mb-6">
            <h1 className="text-3xl tracking-tight" style={{ fontFamily: "Lora, serif", color: "var(--sage-800)" }}>
              Innerlog
            </h1>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 bg-card/80 backdrop-blur-sm rounded-2xl p-1 border border-border/50">
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="h-4 w-4" />
                <span className="text-sm font-medium">List</span>
              </button>
              <button
                onClick={() => setViewMode("calendar")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  viewMode === "calendar"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <CalendarIcon className="h-4 w-4" />
                <span className="text-sm font-medium">Calendar</span>
              </button>
            </div>
            <Button
              onClick={onNewEntry}
              className="bg-primary hover:bg-primary/90 rounded-2xl px-6 shadow-lg"
            >
              <Plus className="mr-2 h-5 w-5" />
              New Innerlog
            </Button>
          </div>
        </motion.div>

        {/* List View */}
        <AnimatePresence mode="wait">
          {viewMode === "list" && (
            <motion.div
              key="list-view"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {mockEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card
                    onClick={() => onSelectEntry(entry)}
                    className="p-6 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-border/50 bg-card/80 backdrop-blur-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{entry.mood}</span>
                          <span className="text-sm text-muted-foreground">{entry.date}</span>
                          {entry.hasAIFeedback && (
                            <div className="flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                              <Sparkles className="h-3 w-3" />
                              <span>AI Insights</span>
                            </div>
                          )}
                        </div>
                        <p className="text-foreground/80 leading-relaxed">{entry.preview}</p>
                      </div>
                      <BookOpen className="h-5 w-5 text-muted-foreground ml-4 flex-shrink-0" />
                    </div>
                  </Card>
                </motion.div>
              ))}

              {mockEntries.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-center py-20"
                >
                  <Heart className="h-16 w-16 text-primary/30 mx-auto mb-4" />
                  <h3 className="mb-2">No Innerlogs yet</h3>
                  <p className="text-muted-foreground mb-6">Start your journey of self-discovery today</p>
                  <Button
                    onClick={onNewEntry}
                    className="bg-primary hover:bg-primary/90 rounded-2xl px-8"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Create Your First Innerlog
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Calendar View */}
          {viewMode === "calendar" && (
            <motion.div
              key="calendar-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Calendar - Centered */}
              <div className="flex justify-center">
                <Card className="p-8 rounded-3xl shadow-md border border-border/50 bg-card/80 backdrop-blur-sm inline-block">
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-2xl"
                      modifiers={{
                        hasEntry: datesWithEntries,
                      }}
                      modifiersStyles={{
                        hasEntry: {
                          fontWeight: 'bold',
                          textDecoration: 'underline',
                          textDecorationColor: '#a5b4fc',
                          textDecorationThickness: '2px',
                        },
                      }}
                    />
                  </div>
                  <div className="mt-6 p-3 bg-primary/5 rounded-2xl text-center">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold underline decoration-primary decoration-2">Underlined dates</span> have Innerlogs
                    </p>
                  </div>
                </Card>
              </div>

              {/* Entries for Selected Date */}
              <Card className="p-6 rounded-3xl shadow-md border border-border/50 bg-card/80 backdrop-blur-sm max-w-2xl mx-auto">
                <h3 className="mb-4 text-center">
                  {selectedDate?.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h3>
                
                {selectedDateEntries.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDateEntries.map((entry) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div
                          onClick={() => onSelectEntry(entry)}
                          className="p-4 rounded-2xl border border-border/50 bg-background/50 hover:bg-background/80 transition-all duration-200 cursor-pointer hover:shadow-md"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{entry.mood}</span>
                            <span className="text-sm text-muted-foreground">{entry.date.split(',')[1]}</span>
                            {entry.hasAIFeedback && (
                              <div className="flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                                <Sparkles className="h-3 w-3" />
                                <span>AI</span>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-foreground/80 leading-relaxed line-clamp-2">
                            {entry.preview}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-primary/30 mx-auto mb-3" />
                    <p className="text-muted-foreground text-sm">No Innerlogs for this date</p>
                    <Button
                      onClick={onNewEntry}
                      variant="outline"
                      className="mt-4 rounded-2xl"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create Innerlog
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
