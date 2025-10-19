import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Sparkles, Send, Brain, TrendingUp, Lightbulb, Check, Mic, MicOff, Target } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Avatar } from "./ui/avatar";
import { motion, AnimatePresence } from "motion/react";
import { Separator } from "./ui/separator";

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😌", label: "Calm" },
  { emoji: "🤔", label: "Thoughtful" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😤", label: "Frustrated" },
  { emoji: "✨", label: "Inspired" },
  { emoji: "😴", label: "Tired" },
  { emoji: "🌟", label: "Grateful" },
  { emoji: "➕", label: "Custom" },
];

// Function to intelligently assign emoji based on custom feeling text
const getEmojiForFeeling = (feeling: string): string => {
  const feelingLower = feeling.toLowerCase().trim();
  
  // Excited/Energetic
  if (feelingLower.match(/excit|energi|pump|thrill|hype|amaz|elat/)) return "🎉";
  if (feelingLower.match(/fire|passion|intense/)) return "🔥";
  
  // Peaceful/Calm
  if (feelingLower.match(/peace|serene|tranquil|zen|relax|chill/)) return "🕊️";
  if (feelingLower.match(/content|satisfy|fulfill/)) return "☺️";
  
  // Love/Warmth
  if (feelingLower.match(/love|warm|affection|tender|caring/)) return "💗";
  if (feelingLower.match(/blessed|fortune|lucky/)) return "🍀";
  
  // Hopeful/Optimistic
  if (feelingLower.match(/hope|optim|bright|positive/)) return "🌈";
  if (feelingLower.match(/determin|motiv|driven|focus/)) return "💪";
  
  // Confused/Uncertain
  if (feelingLower.match(/confus|uncertain|lost|puzzle|perplex/)) return "🤷";
  if (feelingLower.match(/overwhelm|swamp/)) return "😵";
  
  // Anxious/Worried
  if (feelingLower.match(/anxio|worr|nervous|stress|tense/)) return "😰";
  if (feelingLower.match(/scare|afraid|fear/)) return "😨";
  
  // Sad/Down
  if (feelingLower.match(/sad|down|depress|blue|melanchol/)) return "😢";
  if (feelingLower.match(/lonely|alone|isolat/)) return "🥀";
  if (feelingLower.match(/disappoint|let down/)) return "😞";
  
  // Angry/Irritated
  if (feelingLower.match(/angry|mad|furi|rage/)) return "😠";
  if (feelingLower.match(/annoye|irritat|frustrat|aggravat/)) return "😤";
  
  // Creative/Inspired
  if (feelingLower.match(/creativ|inspir|imaginat/)) return "🎨";
  if (feelingLower.match(/enlighten|awaken|realiz/)) return "💡";
  
  // Tired/Exhausted
  if (feelingLower.match(/tired|exhaust|drain|weary|fatigue/)) return "��";
  if (feelingLower.match(/burnt.*out|burnout/)) return "🔋";
  
  // Grateful/Appreciative
  if (feelingLower.match(/grat|thank|appreciat|bless/)) return "🙏";
  if (feelingLower.match(/joy|delight/)) return "😄";
  
  // Playful/Fun
  if (feelingLower.match(/play|fun|silly|goofy/)) return "😜";
  if (feelingLower.match(/adventur|spontan/)) return "🎈";
  
  // Contemplative/Reflective
  if (feelingLower.match(/contempl|reflect|ponder|meditat/)) return "🧘";
  if (feelingLower.match(/curious|wonder|intrigu/)) return "🔍";
  
  // Proud/Accomplished
  if (feelingLower.match(/proud|accomplish|achiev|success/)) return "🏆";
  if (feelingLower.match(/confident|empowered/)) return "✨";
  
  // Vulnerable/Sensitive
  if (feelingLower.match(/vulnerab|sensitiv|fragil|delicate/)) return "🌸";
  if (feelingLower.match(/open.*heart|tender/)) return "💖";
  
  // Restless/Impatient
  if (feelingLower.match(/restless|antsy|impatient/)) return "⚡";
  if (feelingLower.match(/eager|anticipat/)) return "👀";
  
  // Default to a neutral thoughtful emoji
  return "💭";
};

interface AIInsight {
  patternRecognition: string;
  psychologicalInsight: string;
  actionableAdvice: string;
}

interface JournalEntryProps {
  onBack: () => void;
}

// Extract goals from journal entry
const extractGoals = (text: string): string[] => {
  const goals: string[] = [];
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
  
  const goalPatterns = [
    /(?:i\s+)?(?:want|wish|hope|hoping|wishing|wanting|would\s+like|need|goal\s+is|aim\s+to|plan\s+to|going\s+to|gonna)\s+(?:to\s+)?(.+)/i,
    /(?:my|the)\s+goal\s+(?:is|was)\s+(?:to\s+)?(.+)/i,
    /(?:i'm|i\s+am)\s+(?:hoping|wishing|planning|aiming)\s+(?:to\s+)?(.+)/i,
    /(?:i'd|i\s+would)\s+(?:like|love)\s+(?:to\s+)?(.+)/i,
  ];

  sentences.forEach(sentence => {
    for (const pattern of goalPatterns) {
      const match = sentence.match(pattern);
      if (match && match[1]) {
        const goal = match[1].trim();
        // Clean up and validate the goal
        if (goal.length > 10 && goal.length < 200 && !goal.toLowerCase().includes('i want to say')) {
          goals.push(goal.charAt(0).toUpperCase() + goal.slice(1));
          break; // Only match one pattern per sentence
        }
      }
    }
  });

  return goals;
};

// Save goals to localStorage
const saveGoalsToStorage = (goals: string[]) => {
  if (goals.length === 0) return;
  
  const existingGoals = JSON.parse(localStorage.getItem('capturedGoals') || '[]');
  const newGoals = goals.map(goal => ({
    goal,
    date: new Date().toISOString(),
    id: Date.now() + Math.random(),
  }));
  
  const updatedGoals = [...existingGoals, ...newGoals];
  localStorage.setItem('capturedGoals', JSON.stringify(updatedGoals));
};

// Generate contextual AI responses based on entry content and mood
const generateAIInsight = (entry: string, mood: string | null): AIInsight => {
  const entryLower = entry.toLowerCase();
  
  // Pattern recognition with past entries reference
  let patternRecognition = "Looking at your recent Innerlogs, ";
  
  if (entryLower.includes("stress") || entryLower.includes("anxious") || entryLower.includes("overwhelm")) {
    patternRecognition += "I notice you're navigating stress more consciously than before. Your October 12th Innerlog about feeling liberated through free-form writing shows you're discovering your own path to processing what feels heavy. You're learning to transform tension into clarity through the act of writing itself.";
  } else if (entryLower.includes("grateful") || entryLower.includes("thank") || entryLower.includes("appreciate")) {
    patternRecognition += "your gratitude practice is becoming more nuanced. This builds on your reflections from earlier this week. I'm seeing how you're training your attention to naturally settle on what nourishes you—creating new patterns in how you perceive your daily experiences.";
  } else if (entryLower.includes("challenge") || entryLower.includes("difficult") || entryLower.includes("struggle")) {
    patternRecognition += "you're choosing to face difficult emotions head-on rather than pushing them away. This connects to your October 11th Innerlog about progress being non-linear. You're doing the brave work of accepting all parts of your experience, which is where real transformation happens.";
  } else {
    patternRecognition += "there's a deepening quality to your self-awareness. You're developing the ability to witness your own thoughts and emotions without immediately reacting to them—like becoming both the actor and the audience of your inner life.";
  }

  // Psychological insight
  let psychologicalInsight = "";
  
  if (mood === "😔" || mood === "😤" || entryLower.includes("sad") || entryLower.includes("frustrated")) {
    psychologicalInsight = "What strikes me is your willingness to acknowledge the parts of yourself that feel uncomfortable or unwanted. Many people spend enormous energy trying to hide these feelings, even from themselves. But you're doing something different—you're giving them space, light, and words. This kind of emotional honesty doesn't just release pressure; it integrates these experiences into your fuller sense of self. Your capacity to sit with discomfort is actually a form of strength.";
  } else if (entryLower.includes("growth") || entryLower.includes("learning") || entryLower.includes("progress")) {
    psychologicalInsight = "The way you frame challenges reveals something important: you see yourself as someone capable of evolving. This belief that you can develop and change—rather than being fixed in place—fundamentally shifts how you encounter obstacles. Where others might see threats, you're starting to see invitations to grow. This perspective literally changes how your mind processes difficulty, moving from defensive reactions to curious exploration.";
  } else if (entryLower.includes("meditation") || entryLower.includes("mindful") || entryLower.includes("present")) {
    psychologicalInsight = "Your mindfulness practice is creating space between stimulus and response. You're cultivating the ability to engage with your inner world consciously rather than automatically. This practice isn't just calming—it's restructuring how you relate to stress and emotion at a fundamental level, strengthening your capacity to regulate yourself even in difficult moments.";
  } else {
    psychologicalInsight = "This Innerlog shows an ability to hold complexity—to see multiple truths at once without needing to collapse them into oversimplified answers. You're developing flexibility in how you think and feel, which allows you to acknowledge reality as it is while still moving toward what matters to you. This is the essence of emotional maturity.";
  }

  // Actionable advice
  let actionableAdvice = "";
  
  if (entryLower.includes("stress") || entryLower.includes("anxious")) {
    actionableAdvice = "Tomorrow, when stress rises, try grounding yourself in physical reality: notice 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This interrupts the anxiety spiral and brings you back to the present moment. Also consider creating an Innerlog as a dialogue with your wisest self—what would that part of you say about this situation? Write both sides of the conversation.";
  } else if (entryLower.includes("goal") || entryLower.includes("plan") || entryLower.includes("future")) {
    actionableAdvice = "Transform vague intentions into committed actions by getting specific: instead of 'I'll try to do X,' write 'When [specific situation] happens, I will [specific action].' This bridges the gap between wanting and doing. Your subconscious responds to clarity. What's one crystal-clear commitment you can make for this week?";
  } else if (entryLower.includes("relationship") || entryLower.includes("friend") || entryLower.includes("family")) {
    actionableAdvice = "When someone triggers a strong reaction in you, pause and get curious: 'What might this be showing me about myself?' Sometimes our strongest reactions to others point to something we haven't yet accepted in ourselves. Tomorrow, practice one difficult conversation using 'I feel...' rather than 'You are...'—this transforms blame into honest communication.";
  } else {
    actionableAdvice = "Tonight before sleep, close your eyes and visualize your wisest, most grounded self. What would they say about today's reflection? This isn't fantasy—it's accessing your own inner wisdom that often gets drowned out by daily noise. Then choose one small, concrete action for tomorrow that aligns with today's insight. Small, consistent moves compound into profound change.";
  }

  return {
    patternRecognition,
    psychologicalInsight,
    actionableAdvice,
  };
};

export function JournalEntry({ onBack }: JournalEntryProps) {
  const [entry, setEntry] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [customFeeling, setCustomFeeling] = useState("");
  const [customMoodEmoji, setCustomMoodEmoji] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [aiInsight, setAiInsight] = useState<AIInsight | null>(null);
  const [isReflecting, setIsReflecting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [detectedGoals, setDetectedGoals] = useState<string[]>([]);
  const recognitionRef = useRef<any>(null);

  const handleCustomMoodSubmit = () => {
    if (customFeeling.trim()) {
      const emoji = getEmojiForFeeling(customFeeling);
      setCustomMoodEmoji(emoji);
      setSelectedMood(emoji);
      setShowCustomInput(false);
    }
  };

  const handleReflect = () => {
    setIsReflecting(true);
    
    // Extract goals from entry
    const goals = extractGoals(entry);
    setDetectedGoals(goals);
    
    // Simulate AI processing with psychological analysis
    setTimeout(() => {
      const insight = generateAIInsight(entry, selectedMood);
      setAiInsight(insight);
      setIsReflecting(false);
    }, 2000);
  };

  const handleSaveEntry = () => {
    // Save detected goals to localStorage
    if (detectedGoals.length > 0) {
      saveGoalsToStorage(detectedGoals);
    }
    onBack();
  };

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }

          if (finalTranscript) {
            setEntry((prev) => prev + finalTranscript);
          }
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          if (event.error === 'no-speech' || event.error === 'audio-capture') {
            // Silently handle these common errors
          } else {
            setIsRecording(false);
          }
        };

        recognition.onend = () => {
          if (isRecording) {
            // Restart if still supposed to be recording
            try {
              recognition.start();
            } catch (e) {
              setIsRecording(false);
            }
          }
        };

        recognitionRef.current = recognition;
      } else {
        setIsSupported(false);
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors on cleanup
        }
      }
    };
  }, [isRecording]);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (e) {
        console.error('Error starting recognition:', e);
      }
    }
  };

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
          <h1 className="text-3xl mb-4 tracking-tight" style={{ fontFamily: "Lora, serif", color: "var(--sage-800)" }}>
            Innerlog
          </h1>
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 -ml-2 hover:bg-transparent"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Innerlogs
          </Button>
          <h1 className="mb-2">New InnerLog</h1>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </motion.div>

        {/* Mood Selector */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-6"
        >
          <Card className="p-6 rounded-3xl shadow-md border border-border/50 bg-card/80 backdrop-blur-sm">
            <label className="block mb-3">How are you feeling?</label>
            <div className="flex flex-wrap gap-2">
              {moods.map((mood) => (
                <button
                  key={mood.label}
                  onClick={() => {
                    if (mood.label === "Custom") {
                      setShowCustomInput(!showCustomInput);
                      setSelectedMood(null);
                    } else {
                      setSelectedMood(mood.emoji);
                      setShowCustomInput(false);
                      setCustomFeeling("");
                      setCustomMoodEmoji("");
                    }
                  }}
                  className={`px-4 py-2 rounded-2xl transition-all duration-200 ${
                    mood.label === "Custom" && showCustomInput
                      ? "bg-primary/20 ring-2 ring-primary scale-105"
                      : selectedMood === mood.emoji
                      ? "bg-primary/20 ring-2 ring-primary scale-105"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  <span className="text-2xl mr-2">{mood.emoji}</span>
                  <span className="text-sm">{mood.label}</span>
                </button>
              ))}
            </div>

            {/* Custom Mood Input */}
            <AnimatePresence>
              {showCustomInput && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 overflow-hidden"
                >
                  <div className="p-4 bg-muted/30 rounded-2xl">
                    <p className="text-sm text-muted-foreground mb-3">
                      Describe your feeling
                    </p>
                    <div className="flex gap-2">
                      <Input
                        value={customFeeling}
                        onChange={(e) => setCustomFeeling(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleCustomMoodSubmit();
                          }
                        }}
                        placeholder="e.g., peaceful, energized, contemplative..."
                        className="rounded-2xl border-border/50 bg-background/50"
                      />
                      <Button
                        onClick={handleCustomMoodSubmit}
                        disabled={!customFeeling.trim()}
                        className="bg-primary hover:bg-primary/90 rounded-2xl px-6"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Display Selected Custom Mood */}
            {customMoodEmoji && selectedMood === customMoodEmoji && !showCustomInput && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-3 bg-primary/10 rounded-2xl flex items-center gap-3"
              >
                <span className="text-3xl">{customMoodEmoji}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{customFeeling}</p>
                  <p className="text-xs text-muted-foreground">Selected mood</p>
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Journal Input */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-6"
        >
          <Card className="p-6 rounded-3xl shadow-md border border-border/50 bg-card/80 backdrop-blur-sm">
            <Textarea
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="What's on your mind today?"
              className="min-h-[300px] border-0 bg-transparent resize-none focus-visible:ring-0 p-0 text-base leading-relaxed"
            />
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {entry.length} characters
                </span>
                {isSupported && (
                  <Button
                    onClick={toggleRecording}
                    variant={isRecording ? "default" : "outline"}
                    size="sm"
                    className={`rounded-2xl ${
                      isRecording 
                        ? "bg-red-500 hover:bg-red-600 text-white animate-pulse" 
                        : "border-border/50"
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="mr-2 h-4 w-4" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Mic className="mr-2 h-4 w-4" />
                        Voice
                      </>
                    )}
                  </Button>
                )}
              </div>
              <Button
                onClick={handleReflect}
                disabled={!entry.trim() || isReflecting}
                className="bg-primary hover:bg-primary/90 rounded-2xl"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                {isReflecting ? "Reflecting..." : "Reflect"}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* AI Response */}
        <AnimatePresence>
          {aiInsight && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {/* Main AI Card */}
              <Card
                className="p-6 rounded-3xl shadow-md border border-border/50 backdrop-blur-sm overflow-hidden"
                style={{ background: "var(--gradient-card)" }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <Avatar className="h-10 w-10 bg-primary flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary-foreground" />
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">AI Coach</span>
                      <span className="text-xs text-muted-foreground">Just now</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Reflection & Insights
                    </p>
                  </div>
                </div>

                {/* Pattern Recognition */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-xl bg-primary/10">
                      <Brain className="h-4 w-4 text-primary" />
                    </div>
                    <h4 className="font-medium">Pattern Recognition</h4>
                  </div>
                  <p className="text-foreground/90 leading-relaxed pl-10">
                    {aiInsight.patternRecognition}
                  </p>
                </motion.div>

                <Separator className="my-6" />

                {/* Deeper Insight */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-xl bg-[var(--lavender)]">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <h4 className="font-medium">Deeper Insight</h4>
                  </div>
                  <p className="text-foreground/90 leading-relaxed pl-10">
                    {aiInsight.psychologicalInsight}
                  </p>
                </motion.div>

                <Separator className="my-6" />

                {/* Actionable Advice */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-xl bg-[var(--mint)]">
                      <Lightbulb className="h-4 w-4 text-green-600" />
                    </div>
                    <h4 className="font-medium">Actionable Guidance</h4>
                  </div>
                  <p className="text-foreground/90 leading-relaxed pl-10">
                    {aiInsight.actionableAdvice}
                  </p>
                </motion.div>
              </Card>

              {/* Follow-up Prompt Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Card className="p-4 rounded-3xl shadow-sm border border-primary/20 bg-primary/5">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        <span className="font-medium">Reflection prompt:</span> How does today's
                        insight connect with where you want to be in 6 months? Consider creating
                        another Innerlog tomorrow to build continuity in your growth journey.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Detected Goals Preview */}
        <AnimatePresence>
          {detectedGoals.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <Card className="p-6 rounded-3xl shadow-md border border-primary/30 bg-primary/5 backdrop-blur-sm">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-primary/20">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Goals Detected</h4>
                    <p className="text-sm text-muted-foreground">
                      I noticed {detectedGoals.length} {detectedGoals.length === 1 ? 'goal' : 'goals'} in your Innerlog
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {detectedGoals.map((goal, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-2 text-sm bg-background/50 p-3 rounded-2xl"
                    >
                      <span className="text-primary mt-0.5">•</span>
                      <span>{goal}</span>
                    </motion.li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-4 italic">
                  These will be saved to your Goal Tracker in Insights
                </p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex justify-center"
        >
          <Button
            onClick={handleSaveEntry}
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 rounded-2xl px-12 shadow-lg"
          >
            <Send className="mr-2 h-5 w-5" />
            Save Innerlog
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
