'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Bot,
    Send,
    Sparkles,
    Zap,
    History,
    PlusCircle,
    Search,
    BrainCircuit,
    ChevronRight,
    Terminal,
    BarChart3,
    ShieldCheck,
    MapPin,
    Calendar,
    MessageSquare,
    Phone,
    Video,
    MoreVertical,
    CheckCircle2,
    Settings
} from 'lucide-react';
import { cn } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import '@/app/ai-chat.css';

interface Message {
    id: string;
    content: string;
    isAi: boolean;
    timestamp: Date;
    type?: 'text' | 'action' | 'analysis' | 'recommendation';
    metadata?: any;
}

interface AIChatViewProps {
    role: 'customer' | 'owner' | 'admin' | 'staff';
    currentUserId: string;
    userName: string;
}

export const AIChatView = ({ role, currentUserId, userName }: AIChatViewProps) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            content: `Hello ${userName}! I am your AI Assistant for the ${role} portal. How can I help you today?`,
            isAi: true,
            timestamp: new Date(),
            type: 'text'
        }
    ]);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const getSuggestions = () => {
        switch (role) {
            case 'customer':
                return [
                    { label: 'Find football fields near me', icon: MapPin },
                    { label: 'Check my upcoming bookings', icon: Calendar },
                    { label: 'How do I cancel a booking?', icon: ShieldCheck }
                ];
            case 'owner':
                return [
                    { label: 'Analyze this month\'s revenue', icon: BarChart3 },
                    { label: 'Identify low-traffic time slots', icon: BrainCircuit },
                    { label: 'Suggest a promotion for new users', icon: Zap }
                ];
            case 'admin':
                return [
                    { label: 'Detect potential fraudulent activity', icon: ShieldCheck },
                    { label: 'Summarize system performance', icon: Terminal },
                    { label: 'Users requiring moderation', icon: Search }
                ];
            default:
                return [
                    { label: 'Quick technical summary', icon: Terminal },
                    { label: 'Check support queue status', icon: MessageSquare }
                ];
        }
    };

    const handleSend = (text: string = input) => {
        if (!text.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            content: text,
            isAi: false,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsThinking(true);

        // Mock AI response
        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                content: `I'm processing your request regarding "${text}". In a real implementation, I would connect to the LLM API and analyze your data as a ${role}.`,
                isAi: true,
                timestamp: new Date(),
                type: 'text'
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsThinking(false);
        }, 1500);
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isThinking]);

    return (
        <div className="flex h-[800px] w-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl dark:border-gray-800 dark:bg-slate-900 ai-chat-container">
            {/* Sidebar - Chat History */}
            <div className="hidden w-[300px] flex-col border-r border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-slate-900/50 lg:flex">
                <div className="p-6">
                    <Button className="w-full gap-2 rounded-xl bg-primary-600 font-bold text-white shadow-lg shadow-primary-500/20">
                        <PlusCircle className="h-4 w-4" /> New Session
                    </Button>
                </div>
                <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
                    <div className="mb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2">Recent Insights</div>
                    <div className="space-y-1">
                        {[1, 2, 3].map(i => (
                            <button key={i} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-white dark:hover:bg-slate-800 group">
                                <BrainCircuit className="h-4 w-4 text-primary-500" />
                                <div className="flex-1 overflow-hidden">
                                    <p className="truncate text-sm font-semibold text-gray-700 dark:text-gray-300">Analysis Session {i}</p>
                                    <p className="text-[10px] text-gray-400 italic">2 hours ago</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm dark:bg-slate-800">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-500/10">
                            <Zap className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-900 dark:text-gray-100">AI Tokens</p>
                            <div className="h-1.5 w-24 rounded-full bg-gray-100 dark:bg-gray-700">
                                <div className="h-full w-2/3 rounded-full bg-orange-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="relative flex flex-1 flex-col overflow-hidden bg-transparent">
                {/* Glow Effects */}
                <div className="ai-glow ai-glow-1" />
                <div className="ai-glow ai-glow-2" />

                {/* Header */}
                <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b border-gray-100/50 bg-white/50 px-6 py-4 backdrop-blur-xl dark:border-gray-800/50 dark:bg-slate-900/50">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 shadow-lg shadow-primary-500/30">
                                <Bot className="h-7 w-7 text-white" />
                            </div>
                            <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-green-500 dark:border-slate-900"></span>
                            </span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-lg font-black tracking-tight text-gray-900 dark:text-white uppercase">DatSan AI Assistant</h2>
                                <span className="rounded-lg bg-primary-50 px-2 py-0.5 text-[10px] font-black text-primary-600 dark:bg-primary-900/30">PRO</span>
                            </div>
                            <p className="text-xs font-medium text-gray-500 italic">Optimized for {role} role • GPT-4 powered</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 transition-colors"><Settings className="h-5 w-5" /></button>
                        <button className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 transition-colors"><History className="h-5 w-5" /></button>
                        <button className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 transition-colors"><MoreVertical className="h-5 w-5" /></button>
                    </div>
                </div>

                {/* Messages Container */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar relative z-10">
                    {messages.map((msg) => (
                        <div key={msg.id} className={cn("flex w-full items-start gap-4 animate-in fade-in slide-in-from-bottom-2", msg.isAi ? "justify-start" : "justify-end flex-row-reverse")}>
                            <div className={cn(
                                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold shadow-sm",
                                msg.isAi ? "bg-primary-600 text-white" : "bg-gray-100 dark:bg-slate-800 text-gray-500"
                            )}>
                                {msg.isAi ? <Bot className="h-6 w-6" /> : userName[0]}
                            </div>
                            <div className={cn(
                                "flex flex-col gap-2 max-w-[80%]",
                                msg.isAi ? "items-start" : "items-end"
                            )}>
                                <div className={cn(
                                    "px-5 py-3.5 rounded-2xl text-[14px] leading-relaxed",
                                    msg.isAi
                                        ? "ai-message-ai text-gray-800 dark:text-gray-100 rounded-tl-none font-medium"
                                        : "bg-gray-900 text-white rounded-tr-none shadow-lg dark:bg-white dark:text-gray-900 font-semibold"
                                )}>
                                    {msg.content}
                                </div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter px-1">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    ))}

                    {isThinking && (
                        <div className="flex justify-start items-start gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm">
                                <Bot className="h-6 w-6" />
                            </div>
                            <div className="ai-message-ai px-5 py-4 rounded-2xl rounded-tl-none flex items-center gap-3 border border-indigo-100/50 bg-white/80 dark:bg-slate-800/80">
                                <div className="flex gap-1.5">
                                    <span className="ai-thinking-dot h-2 w-2 rounded-full bg-primary-500" />
                                    <span className="ai-thinking-dot h-2 w-2 rounded-full bg-primary-500" />
                                    <span className="ai-thinking-dot h-2 w-2 rounded-full bg-primary-500" />
                                </div>
                                <span className="text-[12px] font-bold italic text-primary-600 animate-pulse uppercase tracking-widest">Assistant is thinking...</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="shrink-0 p-6 pt-2 z-10">
                    {/* Suggestion Chips */}
                    <div className="mb-4 flex flex-wrap gap-2 overflow-x-auto no-scrollbar pb-2">
                        {getSuggestions().map((s, i) => (
                            <button
                                key={i}
                                onClick={() => handleSend(s.label)}
                                className="ai-chip flex items-center gap-2 whitespace-nowrap rounded-xl border border-gray-100 bg-white/60 px-4 py-2.5 text-[12px] font-bold text-gray-700 shadow-sm backdrop-blur-md transition-all hover:bg-white dark:border-gray-800 dark:bg-slate-800/60 dark:text-gray-300 dark:hover:bg-slate-800"
                            >
                                <s.icon className="h-3.5 w-3.5 text-primary-500" />
                                {s.label}
                                <ChevronRight className="h-3 w-3 opacity-30" />
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 rounded-2xl border border-gray-100 bg-white/80 p-2 shadow-xl backdrop-blur-xl transition-all focus-within:border-primary-500/50 focus-within:ring-4 focus-within:ring-primary-500/5 dark:border-gray-800 dark:bg-slate-900/80">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-900/30">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <input
                            type="text"
                            placeholder={`Ask AI about your ${role} data...`}
                            className="flex-1 border-none bg-transparent px-3 text-[14px] font-medium outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button
                            onClick={() => handleSend()}
                            disabled={!input.trim() || isThinking}
                            className={cn(
                                "flex h-11 w-11 items-center justify-center rounded-xl transition-all",
                                input.trim()
                                    ? "bg-primary-600 text-white shadow-lg shadow-primary-500/30 hover:scale-105 active:scale-95"
                                    : "bg-gray-50 text-gray-300 dark:bg-gray-800"
                            )}
                        >
                            <Send className="h-5 w-5" />
                        </button>
                    </div>
                    <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        DatSan AI model may generate inaccurate results. Please verify financial data.
                    </p>
                </div>
            </div>
        </div>
    );
};
