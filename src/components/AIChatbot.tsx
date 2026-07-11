'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, AlertTriangle, Calendar, UserRound } from 'lucide-react';
import api from '../utils/api';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  analysis?: {
    condition: string;
    severity: string;
    advice: string;
    recommendedService: { name: string; price: number; duration: number };
    recommendedDoctors: Array<{ id: string; name: string; specialization: string; image: string }>;
  };
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Hello! I am your AI Dental Health Assistant. Describe your symptoms (e.g. "pain in my molar" or "bleeding gums") and I will analyze them and suggest a specialist.',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = { sender: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const data = await api.checkSymptoms(textToSend);
      
      const botMessage: Message = {
        sender: 'bot',
        text: `Here is my assessment based on your description:`,
        analysis: data.analysis,
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Pardon me. I encountered a minor error analyzing your symptoms. Please try typing in a simple sentence about your tooth pain or alignment.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handlePredefinedSymptom = (symptomText: string) => {
    handleSend(symptomText);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-teal-500 text-white shadow-[0_4px_24px_rgba(6,182,212,0.4)] flex items-center justify-center cursor-pointer z-50 border border-cyan-400 hover:scale-105 transition-transform"
      >
        <MessageSquare className="w-6 h-6 animate-pulse" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed bottom-24 right-6 w-[380px] h-[550px] rounded-2xl glass-panel flex flex-col z-50 overflow-hidden shadow-2xl border border-slate-800"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-slate-900/90 to-cyan-950/90 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">AI Diagnostic Assistant</h4>
                  <span className="text-[10px] text-teal-400 font-medium">Online • Consultation Assistant</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-sm ${
                      msg.sender === 'user'
                        ? 'bg-cyan-500 text-white rounded-tr-none'
                        : 'bg-slate-900/80 border border-slate-800 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    
                    {/* Render AI Symptom Diagnosis */}
                    {msg.analysis && (
                      <div className="mt-3.5 pt-3.5 border-t border-slate-800/80 space-y-3 text-slate-300">
                        {/* Severity Banner */}
                        <div className="flex items-center gap-2">
                          <AlertTriangle className={`w-4 h-4 ${msg.analysis.severity === 'HIGH' ? 'text-rose-400' : 'text-amber-400'}`} />
                          <span className="font-semibold text-xs text-slate-100">
                            Severity Assessment:{' '}
                            <span className={msg.analysis.severity === 'HIGH' ? 'text-rose-400' : 'text-amber-400'}>
                              {msg.analysis.severity}
                            </span>
                          </span>
                        </div>

                        {/* Condition & Advice */}
                        <div className="text-xs space-y-1">
                          <p className="font-medium text-slate-200">Possible Condition:</p>
                          <p className="text-teal-300">{msg.analysis.condition}</p>
                          <p className="mt-1 text-slate-400">{msg.analysis.advice}</p>
                        </div>

                        {/* Service Match */}
                        <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-800/20 text-xs flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-cyan-300">{msg.analysis.recommendedService.name}</p>
                            <p className="text-slate-400">Est. Price: ${msg.analysis.recommendedService.price}</p>
                          </div>
                          <a
                            href="/book"
                            className="flex items-center gap-1 bg-cyan-500 hover:bg-cyan-600 text-white px-2.5 py-1 rounded font-medium transition-colors"
                          >
                            <Calendar className="w-3 h-3" /> Book
                          </a>
                        </div>

                        {/* Doctors recommendation */}
                        {msg.analysis.recommendedDoctors && msg.analysis.recommendedDoctors.length > 0 && (
                          <div className="space-y-1.5">
                            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Recommended Specialists</p>
                            {msg.analysis.recommendedDoctors.map((doc, idx) => (
                              <div key={idx} className="flex items-center gap-2 bg-slate-950/40 p-1.5 rounded border border-slate-900">
                                <img src={doc.image} alt={doc.name} className="w-7 h-7 rounded-full object-cover" />
                                <div className="text-[11px]">
                                  <p className="font-medium text-slate-200">{doc.name}</p>
                                  <p className="text-[9px] text-slate-500">{doc.specialization}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-900/80 border border-slate-800 text-slate-400 rounded-2xl rounded-tl-none p-3.5 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Predefined Quick Buttons */}
            {messages.length === 1 && (
              <div className="px-4 py-2 border-t border-slate-900 flex flex-wrap gap-1.5 bg-slate-950/40">
                <button
                  onClick={() => handlePredefinedSymptom('I have a severe throbbing toothache in the back')}
                  className="text-[11px] bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-2 py-1 rounded-full cursor-pointer transition-colors"
                >
                  Severe toothache
                </button>
                <button
                  onClick={() => handlePredefinedSymptom('My gums bleed when I brush')}
                  className="text-[11px] bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-2 py-1 rounded-full cursor-pointer transition-colors"
                >
                  Bleeding gums
                </button>
                <button
                  onClick={() => handlePredefinedSymptom('I want to straighten my crowded teeth')}
                  className="text-[11px] bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-2 py-1 rounded-full cursor-pointer transition-colors"
                >
                  Crooked teeth
                </button>
              </div>
            )}

            {/* Input Footer */}
            <div className="p-3 bg-slate-950/90 border-t border-slate-900 flex gap-2">
              <input
                type="text"
                placeholder="Type dental symptoms..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 placeholder-slate-500"
              />
              <button
                onClick={() => handleSend(input)}
                className="w-9 h-9 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
