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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        {/* Pulsing Ring Effect - Two versions for different screen sizes */}
        {!isOpen && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 opacity-75 sm:hidden"
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
              className="hidden sm:block absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 opacity-75"
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
          className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 text-white shadow-2xl hover:shadow-amber-500/60 transition-all duration-300 ring-4 ring-white cursor-pointer"
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
              className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-red-500 border-2 border-white"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <span className="absolute inset-0 flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-white">!</span>
            </motion.div>
          )}
        </motion.button>
        
        {/* "Chat with us!" Label - Hidden on mobile */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
            className="hidden sm:block absolute right-20 top-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg font-semibold text-sm whitespace-nowrap"
          >
            💬 Chat with us!
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-orange-500"></div>
          </motion.div>
        )}
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-4 md:right-6 z-50 flex h-full sm:h-[600px] w-full sm:w-[380px] md:w-[420px] sm:max-w-md flex-col overflow-hidden sm:rounded-2xl border-0 sm:border-4 border-amber-400 bg-white shadow-2xl shadow-amber-500/20"
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-4 sm:p-5 overflow-hidden">
              {/* Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-pulse"></div>
              
              {/* Agent Avatar */}
              <motion.div 
                className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white shadow-lg ring-4 ring-white/30 overflow-hidden"
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
              
              <div className="flex-1 relative z-10">
                <motion.h3 
                  className="font-bold text-white text-base sm:text-lg drop-shadow-md"
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
              
              {/* Close button for mobile */}
              <motion.button
                onClick={() => setIsOpen(false)}
                className="sm:hidden relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
                whileTap={{ scale: 0.95 }}
              >
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 space-y-3 sm:space-y-4 overflow-y-auto bg-gradient-to-b from-orange-50 to-amber-50 p-3 sm:p-4">
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
                    <div className="flex-shrink-0 h-7 w-7 sm:h-8 sm:w-8 rounded-full overflow-hidden shadow-md ring-2 ring-amber-200">
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face"
                        alt="Agent"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[80%] sm:max-w-[75%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-md ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-br-sm'
                        : 'bg-white text-gray-900 border-2 border-amber-200 rounded-bl-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start gap-2"
                >
                  <div className="flex-shrink-0 h-7 w-7 sm:h-8 sm:w-8 rounded-full overflow-hidden shadow-md ring-2 ring-amber-200">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face"
                      alt="Agent"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="rounded-2xl border-2 border-amber-200 bg-white px-4 sm:px-5 py-2 sm:py-3 shadow-md">
                    <div className="flex space-x-2">
                      <motion.div
                        className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                      />
                      <motion.div
                        className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t-2 border-amber-200 bg-white p-3 sm:p-4 safe-area-inset-bottom">
              <div className="flex items-end gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 rounded-xl border-2 border-amber-300 bg-amber-50/50 px-3 py-2.5 sm:px-4 sm:py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:opacity-50 transition-all duration-200"
                />
                <motion.button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg hover:shadow-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-200 ring-2 ring-amber-200"
                >
                  <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </div>
              <div className="mt-2 sm:mt-3 flex items-center justify-center gap-2">
                <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-500 animate-pulse"></div>
                <p className="text-[10px] sm:text-xs text-gray-600 font-medium">
                  🔒 Secured by AI • Instant responses
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
