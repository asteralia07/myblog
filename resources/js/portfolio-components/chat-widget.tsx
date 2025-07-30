"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/portfolio-components/ui/button"
import { Card } from "@/portfolio-components/ui/card"
import { Badge } from "@/portfolio-components/ui/badge"
import {
  MessageCircle,
  Send,
  X,
  Minimize2,
  Bot,
  User,
  Sparkles,
  Loader2,
  RefreshCw,
  Volume2,
  VolumeX,
} from "lucide-react"

interface Message {
  id: number
  type: "user" | "bot"
  content: string
  timestamp: Date
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content: "Hi! 👋 I'm Joshua's AI assistant. Ask me anything about his experience, skills, or projects!",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0)
      inputRef.current?.focus()
    }
  }, [isOpen])

  const playNotificationSound = () => {
    if (soundEnabled && !isOpen) {
      // Simple notification sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = 800
      oscillator.type = "sine"
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    }
  }

  const suggestedQuestions = [
    "What technologies does Joshua use?",
    "Tell me about his recent projects",
    "What's his experience level?",
    "How can I contact him?",
    "What makes him unique?",
  ]

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: message.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)
    setIsTyping(true)

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "",
        },
        body: JSON.stringify({
          message: message.trim(),
          conversation_history: messages.slice(-5),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      // Simulate typing delay
      setTimeout(
        () => {
          const botMessage: Message = {
            id: Date.now() + 1,
            type: "bot",
            content: data.response || "I'm sorry, I couldn't process that request. Please try again.",
            timestamp: new Date(),
          }

          setMessages((prev) => [...prev, botMessage])
          setIsTyping(false)
          setIsLoading(false)

          if (!isOpen) {
            setUnreadCount((prev) => prev + 1)
            playNotificationSound()
          }
        },
        1000 + Math.random() * 1000,
      ) // Random delay between 1-2 seconds
    } catch (error) {
      console.error("Chat error:", error)

      setTimeout(() => {
        const errorMessage: Message = {
          id: Date.now() + 1,
          type: "bot",
          content:
            "I'm currently experiencing some technical difficulties. Please feel free to contact Joshua directly at joshua.pagdonsolan@gmail.com for any questions!",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, errorMessage])
        setIsTyping(false)
        setIsLoading(false)
      }, 1000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: "bot",
        content: "Hi! 👋 I'm Joshua's AI assistant. Ask me anything about his experience, skills, or projects!",
        timestamp: new Date(),
      },
    ])
  }

  const formatTime = (timestamp: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(timestamp)
  }

  const toggleChat = () => {
    if (isOpen) {
      setIsOpen(false)
      setIsMinimized(false)
    } else {
      setIsOpen(true)
      setIsMinimized(false)
      setUnreadCount(0)
    }
  }

  const minimizeChat = () => {
    setIsMinimized(true)
  }

  const restoreChat = () => {
    setIsMinimized(false)
  }

  return (
    <>
      {/* Chat Widget */}
      <div className="fixed bottom-4 right-4 z-50">
        {/* Chat Container */}
        {isOpen && (
          <Card
            ref={chatContainerRef}
            className={`mb-4 w-80 sm:w-96 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-0 shadow-2xl rounded-2xl border border-blue-200 dark:border-blue-700 transition-all duration-300 ${
              isMinimized ? "h-16" : "h-96 sm:h-[500px]"
            } animate-fade-in-up`}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 sm:p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm sm:text-base">Joshua's AI Assistant</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-blue-100 text-xs">Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="text-white hover:bg-white/20 rounded-full p-1 h-8 w-8"
                  >
                    {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearChat}
                    className="text-white hover:bg-white/20 rounded-full p-1 h-8 w-8"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={minimizeChat}
                    className="text-white hover:bg-white/20 rounded-full p-1 h-8 w-8"
                  >
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleChat}
                    className="text-white hover:bg-white/20 rounded-full p-1 h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Minimized State */}
            {isMinimized && (
              <div className="p-4 flex items-center justify-between cursor-pointer" onClick={restoreChat}>
                <span className="text-slate-600 dark:text-slate-300 text-sm">Click to restore chat</span>
                <Badge className="bg-blue-600 text-white">{messages.length - 1} messages</Badge>
              </div>
            )}

            {/* Chat Messages */}
            {!isMinimized && (
              <>
                <div className="h-64 sm:h-80 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 ${
                          message.type === "user"
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white ml-2"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 mr-2"
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.type === "bot" && (
                            <Bot className="h-3 w-3 sm:h-4 sm:w-4 mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                          )}
                          {message.type === "user" && (
                            <User className="h-3 w-3 sm:h-4 sm:w-4 mt-1 text-white flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-xs sm:text-sm leading-relaxed">{message.content}</p>
                            <span
                              className={`text-xs mt-1 block ${
                                message.type === "user" ? "text-blue-100" : "text-slate-500 dark:text-slate-400"
                              }`}
                            >
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl px-4 py-3 mr-2">
                        <div className="flex items-center space-x-2">
                          <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Suggested Questions */}
                {messages.length === 1 && (
                  <div className="px-3 sm:px-4 pb-2">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Quick questions:</p>
                    <div className="flex flex-wrap gap-1">
                      {suggestedQuestions.slice(0, 2).map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSendMessage(question)}
                          className="text-xs bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-full h-6 px-2"
                          disabled={isLoading}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chat Input */}
                <div className="border-t border-slate-200 dark:border-slate-700 p-3 sm:p-4">
                  <div className="flex space-x-2">
                    <div className="flex-1 relative">
                      <textarea
                        ref={inputRef}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything..."
                        className="w-full px-3 py-2 pr-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                        rows={1}
                        disabled={isLoading}
                        style={{ minHeight: "36px", maxHeight: "80px" }}
                      />
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs px-1 py-0">
                          <Sparkles className="h-2 w-2 mr-1" />
                          AI
                        </Badge>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleSendMessage()}
                      disabled={!inputMessage.trim() || isLoading}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl px-3 py-2 h-9"
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-center">Press Enter to send</p>
                </div>
              </>
            )}
          </Card>
        )}

        {/* Chat Toggle Button */}
        <Button
          onClick={toggleChat}
          className={`relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 rounded-full w-14 h-14 sm:w-16 sm:h-16 ${
            isOpen ? "rotate-0" : "animate-bounce-gentle"
          }`}
        >
          {isOpen ? (
            <X className="h-6 w-6 sm:h-7 sm:w-7" />
          ) : (
            <>
              <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
              {unreadCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </div>
              )}
            </>
          )}
        </Button>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 sm:hidden" onClick={toggleChat} />}
    </>
  )
}
