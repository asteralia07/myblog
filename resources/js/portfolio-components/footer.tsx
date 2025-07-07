"use client"

import { Heart, Coffee } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-8 md:py-12 px-4 md:px-6 border-t border-blue-200/50 dark:border-blue-700/50 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
      <div className="container mx-auto text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 text-slate-600 dark:text-slate-400 text-sm md:text-lg animate-fade-in">
          <span>&copy; 2024 Joshua Pagdonsolan. Crafted with</span>
          <div className="flex items-center space-x-3">
            <Heart className="h-4 w-4 md:h-5 md:w-5 text-blue-500 animate-pulse" />
            <span>and fueled by</span>
            <Coffee className="h-4 w-4 md:h-5 md:w-5 text-blue-600 animate-bounce-gentle" />
          </div>
        </div>
      </div>
    </footer>
  )
}
