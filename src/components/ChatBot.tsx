import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Sparkles, Bot, User } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatBotProps {
  showFreeTrialMessage?: boolean;
  onDismissFreeTrial?: () => void;
}

const mockJournalContext = [
  "I noticed you've been feeling overwhelmed with work deadlines this week",
  "You mentioned wanting to find more balance in your life",
  "I see you're working on building a consistent morning routine",
  "You've been expressing gratitude for the supportive people around you",
];

const aiResponses = [
  "I've noticed from your recent reflections that you're navigating a period of transition. The tension you're experiencing often emerges when our inner compass points toward change, but external circumstances feel rigid. Consider: what would it look like to honor both your need for stability and your pull toward growth?",
  "Your entries reveal a pattern of seeking external validation while simultaneously craving authentic self-expression. This duality isn't something to resolve—it's information. What if both impulses are valid, each serving a different aspect of your journey?",
  "The struggle with routine you mentioned connects to something deeper—perhaps a question of whether the structures you've built still serve who you're becoming. Rather than forcing consistency, what might emerge if you approached your days with curious flexibility?",
  "I see threads of self-discovery woven through your recent writing. The discomfort you're feeling often accompanies expansion. You're not falling apart; you're making room for something new. What old stories about yourself are ready to be released?",
  "Your reflections suggest you're becoming more aware of patterns that no longer serve you. This awareness itself is transformative. The next step isn't necessarily action—sometimes the deepest work happens in simply witnessing yourself with compassion.",
  "Based on your entries, you're grappling with the space between who you've been and who you're becoming. This liminal space is uncomfortable, but it's also where real transformation occurs. What would it mean to trust this process?",
];

export function ChatBot({ showFreeTrialMessage = false, onDismissFreeTrial }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Welcome. I've been reading through your Innerlogs, and I'm here to explore the patterns and insights within them. What's on your mind today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [freeInsightsRemaining, setFreeInsightsRemaining] = useState(3);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI typing delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
      
      // Decrease free insights count if applicable
      if (freeInsightsRemaining > 0) {
        setFreeInsightsRemaining(prev => prev - 1);
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen w-full p-6" style={{ background: "var(--gradient-calm)" }}>
      <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-3xl mb-4 tracking-tight" style={{ fontFamily: "Lora, serif", color: "var(--sage-800)" }}>
            Innerlog
          </h1>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-2xl">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1>AI Coach</h1>
                {freeInsightsRemaining > 0 && (
                  <p className="text-sm text-muted-foreground mt-0.5">
                    3 Free Entries
                  </p>
                )}
              </div>
            </div>
            {freeInsightsRemaining > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30"
              >
                <p className="text-sm font-medium text-amber-700">
                  {freeInsightsRemaining} {freeInsightsRemaining === 1 ? 'entry' : 'entries'} left
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* AI Coach Introduction */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4"
        >
          <Card className="p-4 rounded-2xl border border-primary/20 bg-primary/5">
            <div className="flex items-start gap-2">
              <Bot className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  I'm your AI Coach. I'm getting to know you more and more every day through the Innerlogs you're creating. I'm trained exclusively on your insights, so the more you journal, the deeper our conversations become.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Free Trial Banner or Context Indicator */}
        {freeInsightsRemaining > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4"
          >
            <Card className="p-5 rounded-2xl border-2 border-amber-500/30 bg-gradient-to-r from-amber-50/50 to-orange-50/30">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-500/10 rounded-xl">
                  <Sparkles className="h-5 w-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h4 className="mb-1 font-medium">Try AI Coach for Free</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    You have <span className="font-medium text-amber-700">{freeInsightsRemaining} free insights</span> to explore personalized AI coaching. Each question you ask will receive deep, contextual guidance based on your Innerlogs. Try it now!
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4"
          >
            <Card className="p-4 rounded-2xl border border-primary/20 bg-primary/5">
              <div className="flex items-start gap-2">
                <Bot className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    Here are some key themes from your recent entries:
                  </p>
                  <div className="mt-2 space-y-1">
                    {mockJournalContext.map((context, idx) => (
                      <p
                        key={idx}
                        className="text-xs text-foreground/70 italic"
                      >
                        • {context}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Messages Container */}
        <Card className="flex-1 rounded-3xl shadow-lg border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                      message.role === "user"
                        ? "bg-primary/20"
                        : "bg-primary/10"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="h-4 w-4 text-primary" />
                    ) : (
                      <Bot className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div
                    className={`flex-1 max-w-[80%] ${
                      message.role === "user" ? "items-end" : "items-start"
                    } flex flex-col`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted/50"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 px-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted/50 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border/50 p-4 bg-background/50">
            <div className="flex gap-3">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask for guidance, insights, or advice..."
                className="flex-1 rounded-2xl border-border/50 bg-background/50 resize-none min-h-[60px] max-h-[120px]"
                disabled={isTyping}
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="bg-primary hover:bg-primary/90 rounded-2xl px-6 h-auto self-end"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
