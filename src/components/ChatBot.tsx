'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUIStore } from '@/store/uiStore';
import { useLanguage } from '@/context/LanguageContext';

interface Message {
    role: 'user' | 'model';
    content: string;
}

const ChatBot = () => {
    const router = useRouter();
    const { t } = useLanguage();
    const isFinishedPreloading = useUIStore((state: any) => state.isFinishedPreloading);
    const [isOpen, setIsOpen] = useState(false);
    const [showProactive, setShowProactive] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', content: t('chatbot.initialMessage') }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Show proactive triggers after delay
    useEffect(() => {
        if (!isOpen) {
            const proactiveTimer = setTimeout(() => {
                setShowProactive(true);
            }, 5000);

            return () => {
                clearTimeout(proactiveTimer);
            };
        }
    }, [isOpen]);

    const renderMessageContent = (content: string) => {
        const lines = content.split('\n');
        return lines.map((line, lineIdx) => {
            const isListItem = line.trim().startsWith('-') || /^\d+\./.test(line.trim());
            const parts = line.split(/(\*\*.*?\*\*)/g);

            return (
                <div key={lineIdx} className={isListItem ? "ml-4 mb-1" : "mb-1"}>
                    {parts.map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
                        }
                        return part;
                    })}
                </div>
            );
        });
    };

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
        }
    };

    useEffect(() => {
        adjustHeight();
    }, [input]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e as any);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        if (textareaRef.current) textareaRef.current.style.height = 'auto';
        setMessages((prev: Message[]) => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        // Check for booking intent
        const bookingKeywords = ['pesan', 'booking', 'book', 'order', 'buat janji', 'mau servis'];
        const hasIntent = bookingKeywords.some(keyword => userMessage.toLowerCase().includes(keyword));

        if (hasIntent) {
            setTimeout(() => {
                setMessages((prev: Message[]) => [...prev, {
                    role: 'model',
                    content: t('chatbot.bookingRedirectMessage')
                }]);

                setTimeout(() => {
                    router.push('/book');
                    setIsOpen(false);
                }, 1500);
            }, 500);
            setIsLoading(false);
            return;
        }

        try {
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

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`Server Error ${response.status}: ${errorData.detail || response.statusText}`);
            }

            const data = await response.json();
            setMessages((prev: Message[]) => [...prev, { role: 'model', content: data.response }]);
        } catch (error: any) {
            console.error('Chat Error:', error);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://perabox-backend.vercel.app';
            setMessages((prev: Message[]) => [...prev, { role: 'model', content: `Wah, sepertinya saya sedang kesulitan terhubung ke pusat (${apiUrl}). Detail: ${error.message}` }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isFinishedPreloading && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="fixed bottom-4 right-4 md:bottom-6 md:right-10 z-[9999] font-sans"
                >
                    {/* Proactive Bubble */}
                    <AnimatePresence>
                        {showProactive && !isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={() => { setIsOpen(true); setShowProactive(false); }}
                                className="absolute bottom-20 right-0 md:right-0 bg-primary text-white px-5 py-3 rounded-2xl shadow-xl cursor-pointer whitespace-nowrap mb-2 font-bold text-sm flex items-center gap-3 group border-2 border-white/20"
                            >
                                <span className="max-w-[180px] md:max-w-none truncate md:whitespace-nowrap">{t('chatbot.proactiveMessage')}</span>
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                >
                                    👋
                                </motion.span>
                                <div className="absolute bottom-[-10px] right-6 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-primary"></div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Chat Bubble Button */}
                    <div className="relative group">
                        {/* Pulse Rings */}
                        {!isOpen && (
                            <>
                                <motion.div
                                    animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 3,
                                        ease: "easeOut"
                                    }}
                                    style={{ willChange: 'transform, opacity' }}
                                    className="absolute inset-0 bg-primary rounded-full -z-10"
                                />
                                <motion.div
                                    animate={{ scale: [1, 1.7], opacity: [0.2, 0] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 3,
                                        delay: 1.5,
                                        ease: "easeOut"
                                    }}
                                    style={{ willChange: 'transform, opacity' }}
                                    className="absolute inset-0 bg-primary/50 rounded-full -z-10"
                                />
                            </>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => { setIsOpen(!isOpen); setShowProactive(false); }}
                            className="w-14 h-14 md:w-16 md:h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center cursor-pointer overflow-hidden relative border-4 border-white z-10"
                        >
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.svg
                                        key="close"
                                        initial={{ opacity: 0, rotate: -180 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: 180 }}
                                        className="w-8 h-8"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                    </motion.svg>
                                ) : (
                                    <motion.div
                                        key="chat"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        className="w-full h-full flex items-center justify-center relative p-0"
                                    >
                                        <Image
                                            src="/perabot_mascot.png"
                                            alt="Pera Mascot"
                                            width={80}
                                            height={80}
                                            className="w-[140%] h-[140%] max-w-none object-contain scale-125 translate-y-1"
                                        />
                                        {/* Peeking animation for extra friendliness */}
                                        <motion.div
                                            className="absolute -top-4 -right-4 w-10 h-10 pointer-events-none"
                                            animate={{
                                                y: [0, -8, 0],
                                                rotate: [0, 20, 0],
                                                scale: [1, 1.2, 1]
                                            }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 3,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            <span className="text-2xl drop-shadow-md">✨</span>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>

                    {/* Chat Window */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 50, scale: 0.3, rotate: 10, originX: 1, originY: 1 }}
                                animate={{
                                    opacity: 1, y: 0, scale: 1, rotate: 0,
                                    transition: { type: "spring", stiffness: 260, damping: 20 }
                                }}
                                exit={{ opacity: 0, y: 50, scale: 0.3, rotate: 10 }}
                                className="absolute bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-[350px] md:w-[420px] max-h-[80vh] md:max-h-[600px] h-[600px] bg-white rounded-[32px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] overflow-hidden border border-gray-100 flex flex-col"
                            >
                                {/* Header */}
                                <motion.div
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-gradient-to-br from-primary to-primary-dark p-6 md:p-8 text-white relative"
                                >
                                    <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none">
                                        <svg className="w-20 h-20 md:w-24 md:h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white/20 overflow-hidden relative">
                                            <motion.div
                                                className="w-full h-full p-2"
                                                animate={{ y: [0, -4, 0] }}
                                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                            >
                                                <Image
                                                    src="/perabot_mascot.png"
                                                    alt="Pera"
                                                    fill
                                                    className="object-contain scale-[1.65] translate-y-2"
                                                />
                                            </motion.div>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-lg md:text-xl tracking-tight">{t('chatbot.headerTitle')}</h3>
                                                <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,1)]"></span>
                                            </div>
                                            <p className="text-xs md:text-sm text-white/80 font-medium tracking-wide">Online</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Messages Area */}
                                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 bg-gray-50/50">
                                    {messages.map((msg, index) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * index }}
                                            key={index}
                                            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'justify-start'}`}
                                        >
                                            {msg.role === 'model' && (
                                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex-shrink-0 relative overflow-hidden border border-primary/20 mt-1">
                                                    <Image
                                                        src="/perabot_mascot.png"
                                                        alt="Pera"
                                                        fill
                                                        className="object-contain scale-[1.65] translate-y-1"
                                                    />
                                                </div>
                                            )}
                                            <div className={`p-3 md:p-4 rounded-2xl text-xs md:text-sm leading-relaxed ${msg.role === 'user'
                                                ? 'bg-primary text-white rounded-tr-none shadow-md shadow-primary/10'
                                                : 'bg-white text-dark shadow-sm border border-gray-100 rounded-tl-none font-medium'
                                                }`}
                                            >
                                                {renderMessageContent(msg.content)}
                                            </div>
                                        </motion.div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-white p-3 md:p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex gap-1.5 px-4 md:px-6">
                                                {[0, 1, 2].map((i) => (
                                                    <motion.span
                                                        key={i}
                                                        animate={{ y: [0, -5, 0] }}
                                                        transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                                                        className="w-1 md:w-1.5 h-1 md:h-1.5 bg-primary/40 rounded-full"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input Area */}
                                <form onSubmit={handleSendMessage} className="p-4 md:p-6 bg-white border-t border-gray-100 flex items-end gap-2 md:gap-3">
                                    <textarea
                                        ref={textareaRef}
                                        rows={1}
                                        value={input}
                                        onKeyDown={handleKeyDown}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Tanya Pera..."
                                        className="flex-1 bg-gray-100 border-none rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium resize-none min-h-[48px] md:min-h-[56px] max-h-[120px] md:max-h-[150px]"
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        disabled={!input.trim() || isLoading}
                                        className="w-12 h-12 md:w-14 md:h-14 bg-primary text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 disabled:opacity-50 transition-all"
                                    >
                                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    </motion.button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ChatBot;
