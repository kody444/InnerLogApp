import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Flame, Bell, Moon, Download, LogOut, User } from "lucide-react";

export function Profile() {
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
          <h1 className="mb-1">Profile</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-6"
        >
          <Card className="p-8 rounded-3xl shadow-md border border-border/50 bg-card/80 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 bg-primary">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  SJ
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 w-full">
                <div className="text-center sm:text-left">
                  <h2 className="mb-1">Sarah Johnson</h2>
                  <p className="text-muted-foreground mb-4">sarah.j@example.com</p>
                </div>
                <div className="grid grid-cols-3 gap-4 py-4 border-t border-border/50">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <Flame className="h-4 w-4 text-orange-500" />
                      <div className="text-xl font-semibold" style={{ fontFamily: 'Lora, serif' }}>
                        7
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Day Streak</p>
                  </div>
                  <div className="text-center border-x border-border/50">
                    <div className="text-xl font-semibold mb-1" style={{ fontFamily: 'Lora, serif' }}>
                      142
                    </div>
                    <p className="text-xs text-muted-foreground">Total Innerlogs</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold mb-1" style={{ fontFamily: 'Lora, serif' }}>
                      28
                    </div>
                    <p className="text-xs text-muted-foreground">Days Active</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="rounded-2xl w-full sm:w-auto">
                <User className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-6"
        >
          <Card className="p-6 rounded-3xl shadow-md border border-border/50 bg-card/80 backdrop-blur-sm">
            <h3 className="mb-6">Preferences</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[var(--soft-blue)]">
                    <Bell className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Daily reminders to create an Innerlog
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="h-px bg-border" />

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[var(--lavender)]">
                    <Moon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">
                      Switch to dark theme
                    </p>
                  </div>
                </div>
                <Switch />
              </div>

              <div className="h-px bg-border" />

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[var(--mint)]">
                    <Download className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Export Data</p>
                    <p className="text-sm text-muted-foreground">
                      Download all your Innerlogs
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="rounded-xl">
                  Export
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Subscription Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-6"
        >
          <Card
            className="p-6 rounded-3xl shadow-md border border-border/50 backdrop-blur-sm"
            style={{ background: "var(--gradient-card)" }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="mb-2">Premium Plan</h3>
                <p className="text-muted-foreground mb-4">
                  Unlock unlimited AI insights and advanced analytics
                </p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-semibold" style={{ fontFamily: 'Lora, serif' }}>
                    $9.99
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Unlimited AI coaching sessions</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Advanced mood analytics</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button className="bg-primary hover:bg-primary/90 rounded-2xl">
                  Upgrade Now
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Sign Out */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center"
        >
          <Button variant="ghost" className="text-destructive hover:text-destructive/90">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
