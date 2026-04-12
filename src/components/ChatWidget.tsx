'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Prevent body scroll when chat is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key to close chat
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Handle click outside to close (desktop only)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        chatContainerRef.current &&
        !chatContainerRef.current.contains(e.target as Node) &&
        window.innerWidth >= 640 // Only on desktop (sm breakpoint)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Initial greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: "Hey there! 👋 I'm your E&F Rise Digital assistant. I'm here to help your business shine online! How can I help you today?",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    
    // Blur input to dismiss keyboard on mobile after sending
    if (inputRef.current && window.innerWidth < 640) {
      inputRef.current.blur();
    }
    
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Show the error message from the API
        setMessages([
          ...newMessages,
          {
            role: 'assistant',
            content: data.message || data.error || "I'm having trouble connecting. Please try again or use the contact form below.",
          },
        ]);
        return;
      }
      
      setMessages([
        ...newMessages,
        { role: 'assistant', content: data.message },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: "I'm having trouble connecting right now. Please try the contact form below or email us at hello@efrisedigital.com",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const clearInput = () => {
    setInput('');
    inputRef.current?.focus();
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-50">
        {/* Pulsing Ring Effect - Two versions for different screen sizes */}
        {!isOpen && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 opacity-75 sm:hidden pointer-events-none"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.75, 0, 0.75],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ width: '64px', height: '64px', left: '-4px', top: '-4px' }}
            />
            <motion.div
              className="hidden sm:block absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 opacity-75 pointer-events-none"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.75, 0, 0.75],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ width: '72px', height: '72px', left: '-4px', top: '-4px' }}
            />
          </>
        )}
        
        {/* Chat Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close chat" : "Open chat"}
          className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 text-white shadow-2xl hover:shadow-amber-500/60 transition-all duration-300 ring-4 ring-white cursor-pointer touch-manipulation active:ring-6 active:ring-orange-300"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.svg
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.div
                key="agent"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center relative rounded-full overflow-hidden ring-2 ring-white/30"
              >
                {/* Professional Agent Photo */}
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face"
                  alt="Customer Support Agent"
                  className="h-full w-full object-cover"
                />
                {/* Online status dot */}
                <motion.div
                  className="absolute bottom-0 right-0 h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-green-500 border-2 border-white"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* New Message Badge */}
          {!isOpen && (
            <motion.div
              className="absolute -top-1 -right-1 h-5 w-5 sm:h-5.5 sm:w-5.5 rounded-full bg-red-500 border-2 border-white pointer-events-none"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            >
              <span className="absolute inset-0 flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-white">!</span>
            </motion.div>
          )}
        </motion.button>
        
        {/* "Chat with us!" Label - Hidden on mobile, better positioned */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
            className="hidden sm:block absolute right-20 top-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2.5 rounded-full shadow-lg font-semibold text-sm whitespace-nowrap pointer-events-none"
          >
            💬 Chat with us!
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-orange-500"></div>
          </motion.div>
        )}
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeChat}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 sm:hidden"
            />
            
            <motion.div
              ref={chatContainerRef}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 sm:inset-auto sm:bottom-24 sm:right-6 lg:bottom-[6.5rem] lg:right-8 z-50 flex h-dvh sm:h-[600px] lg:h-[650px] w-full sm:w-[400px] md:w-[440px] lg:w-[460px] sm:max-w-md flex-col overflow-hidden rounded-none sm:rounded-2xl border-0 sm:border-4 border-amber-400 bg-white shadow-2xl shadow-amber-500/20"
            >
            {/* Header - Sticky to stay visible when keyboard opens */}
            <div className="sticky top-0 z-10 flex items-center gap-3 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 px-4 py-4 sm:px-5 sm:py-5 overflow-hidden">  
              {/* Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-pulse"></div>
              
              {/* Agent Avatar */}
              <motion.div 
                className="relative flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-lg ring-4 ring-white/30 overflow-hidden"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                {/* Professional Agent Photo */}
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face"
                  alt="E&F Rise Digital Support Agent"
                  className="h-full w-full object-cover"
                />
                
                {/* Online Status Indicator */}
                <motion.div
                  className="absolute bottom-0 right-0 h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-green-500 border-2 border-white shadow-sm"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              
              <div className="flex-1 relative z-10 min-w-0">
                <motion.h3 
                  className="font-bold text-white text-base sm:text-lg drop-shadow-md truncate"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  E&F Rise Assistant
                </motion.h3>
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-400 animate-pulse"></span>
                    <p className="text-xs text-white/95 font-medium">Online now</p>
                  </div>
                </motion.div>
              </div>
              
              {/* Enhanced Close button - Visible on all screen sizes */}
              <motion.button
                onClick={closeChat}
                aria-label="Close chat"
                className="relative z-10 flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 transition-all cursor-pointer touch-manipulation"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.5 }}
              >
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 space-y-3 sm:space-y-4 overflow-y-auto bg-gradient-to-b from-orange-50 to-amber-50 px-4 py-4 sm:px-5 sm:py-5 overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Assistant Avatar */}
                  {msg.role === 'assistant' && (
                    <div className="shrink-0 h-8 w-8 sm:h-9 sm:w-9 rounded-full overflow-hidden shadow-md ring-2 ring-amber-200">
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face"
                        alt="Agent"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 sm:px-4 sm:py-3 shadow-md ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-br-md'
                        : 'bg-white text-gray-900 border-2 border-amber-200 rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm sm:text-base leading-relaxed break-words">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start gap-2"
                >
                  <div className="shrink-0 h-8 w-8 sm:h-9 sm:w-9 rounded-full overflow-hidden shadow-md ring-2 ring-amber-200">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face"
                      alt="Agent"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="rounded-2xl border-2 border-amber-200 bg-white px-5 py-3 sm:px-6 sm:py-3.5 shadow-md">
                    <div className="flex space-x-2">
                      <motion.div
                        className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                      />
                      <motion.div
                        className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Sticky to stay visible */}
            <div className="sticky bottom-0 z-10 border-t-2 border-amber-200 bg-white px-4 pt-3 pb-4 sm:px-5 sm:pt-4 sm:pb-5">
              {/* End Chat Button - Always visible */}
              <div className="mb-3 flex justify-center">
                <motion.button
                  onClick={closeChat}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 active:from-gray-300 active:to-gray-400 text-gray-700 text-sm sm:text-base font-semibold transition-all touch-manipulation shadow-md hover:shadow-lg border border-gray-300"
                  aria-label="End chat"
                >
                  <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  End Chat
                </motion.button>
              </div>
              
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex items-end gap-2"
              >
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    inputMode="text"
                    enterKeyHint="send"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="w-full rounded-xl border-2 border-amber-300 bg-amber-50/50 pl-4 pr-11 py-3 sm:pl-4 sm:pr-12 sm:py-3.5 text-sm sm:text-base text-gray-900 placeholder:text-gray-500 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:opacity-50 transition-all duration-200"
                  />
                  {/* Clear input button */}
                  {input && !isLoading && (
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={clearInput}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400 active:bg-gray-500 transition-colors cursor-pointer touch-manipulation"
                      aria-label="Clear input"
                    >
                      <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  )}
                </div>
                <motion.button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Send message"
                  className="flex h-12 w-12 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg hover:shadow-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-200 ring-2 ring-amber-200 touch-manipulation active:ring-4 active:ring-orange-300"
                >
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </form>
              <div className="mt-3 flex items-center justify-center gap-2">
                <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-500 animate-pulse"></div>
                <p className="text-[10px] sm:text-xs text-gray-600 font-medium">
                  🔒 Secured by AI • Instant responses
                </p>
              </div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
