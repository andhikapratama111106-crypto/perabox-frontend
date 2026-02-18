'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    role: 'user' | 'model';
    content: string;
}

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', content: 'Halo! Saya Pera, asisten teknisi Anda. Siap membantu segala kebutuhan rumah Anda. Ada yang bisa saya bantu?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            // Determine API URL: Use env var, or fallback to perabox-backend.vercel.app if on vercel.app
            let apiUrl = process.env.NEXT_PUBLIC_API_URL;

            if (!apiUrl) {
                const currentHost = typeof window !== 'undefined' ? window.location.hostname : '';
                if (currentHost.includes('vercel.app')) {
                    apiUrl = 'https://perabox-backend.vercel.app';
                } else {
                    apiUrl = 'http://localhost:8000';
                }
            }

            const response = await fetch(`${apiUrl}/api/v1/chat/message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages
                }),
            });

            if (!response.ok) throw new Error('Failed to fetch response');

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'model', content: data.response }]);
        } catch (error) {
            console.error('Chat Error:', error);
            setMessages(prev => [...prev, { role: 'model', content: 'Wah, sepertinya saya sedang kesulitan terhubung ke pusat. Mohon coba lagi sebentar lagi ya!' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] font-sans">
            {/* Chat Bubble Button - Mascot Peek Version */}
            <div className="relative">
                {/* Mascot Peeking from top of bubble when closed */}
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ y: 20, opacity: 0, scale: 0.8 }}
                            animate={{ y: -55, opacity: 1, scale: 1 }}
                            exit={{ y: -100, opacity: 0, scale: 1.5 }}
                            whileHover={{ y: -65, scale: 1.1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                            className="absolute left-1/2 -translate-x-1/2 w-28 h-28 pointer-events-none z-10"
                        >
                            <img src="/perabot_mascot.png" alt="Mascot Peek" className="w-full h-full object-contain drop-shadow-2xl" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(139, 94, 60, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center cursor-pointer overflow-hidden relative border-2 border-white/20 z-0"
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.svg
                                key="close"
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </motion.svg>
                        ) : (
                            <motion.div
                                key="chat"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="w-full h-full"
                            >
                                <img src="/perabot_mascot.png" alt="Pera" className="w-full h-full object-cover scale-150 translate-y-2 opacity-20" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>

            {/* Chat Window - Glassmorphism Upgrade */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(10px)" }}
                        className="absolute bottom-20 right-0 w-[350px] md:w-[420px] h-[600px] bg-white/90 backdrop-blur-xl rounded-[32px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden border border-white/40 flex flex-col"
                    >
                        {/* Premium Header */}
                        <div className="bg-gradient-to-br from-primary to-primary/80 p-8 text-white relative">
                            {/* Decorative watermarked mascot */}
                            <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none">
                                <img src="/perabot_mascot.png" alt="" className="w-32 h-32 object-contain" />
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden border-2 border-primary/20 bg-secondary/20">
                                    <img src="/perabot_mascot.png" alt="Pera" className="w-full h-full object-cover scale-110" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-xl tracking-tight">Pera</h3>
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]"></span>
                                    </div>
                                    <p className="text-sm text-white/80 font-medium">Asisten Teknis Anda</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-secondary/10 to-transparent">
                            {messages.map((msg, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={index}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                            ? 'bg-primary text-white rounded-tr-none shadow-md'
                                            : 'bg-white/80 backdrop-blur-md text-dark shadow-sm border border-gray-100 rounded-tl-none font-medium'
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex gap-1.5 px-6">
                                        <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-duration:1s]"></span>
                                        <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-duration:1s] [animation-delay:0.2s]"></span>
                                        <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-duration:1s] [animation-delay:0.4s]"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} className="p-6 bg-white/50 backdrop-blur-md border-t border-gray-100/50 flex gap-3">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Tanya Pera tentang AC..."
                                className="flex-1 bg-gray-100/50 backdrop-blur-sm border border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 disabled:opacity-30 disabled:grayscale transition-all"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </motion.button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChatBot;
