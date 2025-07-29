"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Calendar, MapPin, Coffee, Send, Sparkles } from "lucide-react"
import { Link } from '@inertiajs/react';
import { useInView } from "@/hooks/use-in-view"

export default function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <section
      id="contact"
      className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-cyan-50/50 dark:from-slate-900/50 dark:via-blue-900/50 dark:to-slate-900/50 relative overflow-hidden"
      ref={ref}
    >
      <div className="container mx-auto max-w-5xl relative">
        <div
          className={`text-center mb-8 md:mb-16 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 bg-gradient-to-r from-blue-900 via-indigo-600 to-cyan-600 bg-clip-text text-transparent animate-text-shimmer">
            Let's Create Something Amazing
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in-up delay-300 px-4">
            Ready to transform your ideas into reality? I'm here to help you build exceptional digital experiences.
          </p>
        </div>

        <Card
          className={`p-4 md:p-12 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-0 shadow-2xl rounded-2xl md:rounded-3xl border border-blue-100 dark:border-blue-800 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} delay-500`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            <div className="space-y-4 md:space-y-8">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-transparent mb-4 md:mb-8 animate-text-focus-in text-center md:text-left">
                Get In Touch
              </h3>
              <div className="space-y-3 md:space-y-6">
                {[
                  { icon: Mail, label: "Email", value: "joshua.pagdonsolan@gmail.com", gradient: "from-blue-500 to-cyan-500" },
                  {
                    icon: Calendar,
                    label: "Response Time",
                    value: "Usually within 24 hours",
                    gradient: "from-indigo-500 to-blue-500",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "Bay, Laguna, Philippines (Remote Available)",
                    gradient: "from-cyan-500 to-blue-500",
                  },
                ].map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-xl md:rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 group animate-fade-in-up"
                    style={{ animationDelay: `${700 + index * 200}ms` }}
                  >
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${contact.gradient} rounded-lg md:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 animate-bounce-gentle flex-shrink-0`}
                    >
                      <contact.icon className="h-4 w-4 md:h-5 md:w-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-slate-900 dark:text-slate-100 text-sm md:text-base">
                        {contact.label}
                      </div>
                      <div className="text-slate-600 dark:text-slate-400 text-xs md:text-sm truncate">
                        {contact.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center flex flex-col justify-center">
              <div className="mb-6 md:mb-8 animate-fade-in-up delay-1000">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-2xl animate-bounce-gentle">
                  <Coffee className="h-8 w-8 md:h-12 md:w-12 text-white" />
                </div>
                <h4 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-transparent animate-text-focus-in">
                  Coffee Chat?
                </h4>
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6 md:mb-8 animate-fade-in delay-1200 px-4 md:px-0">
                  I'm always excited to discuss new projects, share ideas, or connect with fellow creators.
                </p>
              </div>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold rounded-xl md:rounded-2xl animate-pulse-glow animate-fade-in-up delay-1400 w-full sm:w-auto"
                asChild
              >
                <Link href="mailto:joshua@example.com">
                  <Send className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3" />
                  Start Conversation
                  <Sparkles className="h-4 w-4 md:h-5 md:w-5 ml-2 md:ml-3" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
