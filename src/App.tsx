import { useState } from "react";
import { Home } from "./components/Home";
import { JournalEntry } from "./components/JournalEntry";
import { Insights } from "./components/Insights";
import { Profile } from "./components/Profile";
import { ChatBot } from "./components/ChatBot";
import { BookOpen, BarChart3, User, MessageCircle } from "lucide-react";
import { motion } from "motion/react";

type Screen = "home" | "entry" | "insights" | "chatbot" | "profile";

interface JournalEntryType {
  id: string;
  date: string;
  preview: string;
  mood: string;
  hasAIFeedback: boolean;
}

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("home");
  const [showFreeTrialMessage, setShowFreeTrialMessage] = useState(false);

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return (
          <Home
            onNewEntry={() => setCurrentScreen("entry")}
            onSelectEntry={(entry: JournalEntryType) =>
              setCurrentScreen("entry")
            }
          />
        );
      case "entry":
        return (
          <JournalEntry
            onBack={() => setCurrentScreen("home")}
          />
        );
      case "insights":
        return (
          <Insights 
            onNavigateToCoach={() => {
              setShowFreeTrialMessage(true);
              setCurrentScreen("chatbot");
            }}
          />
        );
      case "chatbot":
        return (
          <ChatBot 
            showFreeTrialMessage={showFreeTrialMessage}
            onDismissFreeTrial={() => setShowFreeTrialMessage(false)}
          />
        );
      case "profile":
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <div className="size-full flex flex-col">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-card/95 backdrop-blur-md border-t border-border shadow-lg"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-around py-4">
            <button
              onClick={() => setCurrentScreen("home")}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-2xl transition-all duration-200 ${
                currentScreen === "home"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BookOpen className="h-6 w-6" />
              <span className="text-xs font-medium">
                Innerlogs
              </span>
            </button>

            <button
              onClick={() => setCurrentScreen("insights")}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-2xl transition-all duration-200 ${
                currentScreen === "insights"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BarChart3 className="h-6 w-6" />
              <span className="text-xs font-medium">
                Insights
              </span>
            </button>

            <button
              onClick={() => setCurrentScreen("chatbot")}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-2xl transition-all duration-200 ${
                currentScreen === "chatbot"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <MessageCircle className="h-6 w-6" />
              <span className="text-xs font-medium">
                Coach
              </span>
            </button>

            <button
              onClick={() => setCurrentScreen("profile")}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-2xl transition-all duration-200 ${
                currentScreen === "profile"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <User className="h-6 w-6" />
              <span className="text-xs font-medium">
                Profile
              </span>
            </button>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}
