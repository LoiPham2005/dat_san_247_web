import React from 'react';
import { Camera, Image as ImageIcon, Mic, MapPin, Calendar as CalendarIcon, Smile, Send, Paperclip, MoreVertical, Phone, Video, Search, MessageSquare } from 'lucide-react';
import { Conversation, ChatMessage } from '@/types/chat.types';
import { MessageBubble } from './MessageBubble';

interface ChatWindowProps {
    conversation: Conversation | null;
    messages: ChatMessage[];
    currentUserId: string;
    onSendMessage: (content: string) => void;
}

export const ChatWindow = ({ conversation, messages, currentUserId, onSendMessage }: ChatWindowProps) => {
    const [inputValue, setInputValue] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);

    if (!conversation) {
        return (
            <div className="chat-main flex items-center justify-center bg-gray-50/50 dark:bg-gray-900/50">
                <div className="text-center">
                    <div className="h-20 w-20 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="h-10 w-10 text-primary-600" />
                    </div>
                    <p className="text-lg font-medium text-gray-400">Select a conversation to start chatting</p>
                </div>
            </div>
        );
    }

    const otherParticipant = conversation.participants.find(p => p.id !== currentUserId);

    const handleSend = () => {
        if (inputValue.trim()) {
            onSendMessage(inputValue.trim());
            setInputValue('');
            setIsTyping(false);
        }
    };

    return (
        <div className="chat-main flex-1 flex flex-col h-full overflow-hidden bg-white dark:bg-[#0f172a]">
            {/* Header */}
            <div className="chat-header sticky top-0 bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-md px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center z-20 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="avatar-container relative">
                        <div className="h-11 w-11 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden ring-2 ring-white dark:ring-gray-900 shadow-sm">
                            {otherParticipant?.avatarUrl ? (
                                <img src={otherParticipant.avatarUrl} alt="" className="h-full w-full object-cover" />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center font-bold text-gray-400">
                                    {otherParticipant?.fullName?.[0]}
                                </div>
                            )}
                        </div>
                        {otherParticipant?.isOnline && (
                            <div className="absolute bottom-0.5 right-0.5 h-3 w-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 text-[15px] leading-tight">{otherParticipant?.fullName}</h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <p className={`text-[10px] font-bold uppercase tracking-wider ${otherParticipant?.isOnline ? 'text-green-500' : 'text-gray-400'}`}>
                                {otherParticipant?.isOnline ? 'Online Now' : 'Offline'}
                            </p>
                            {otherParticipant?.isOnline && (
                                <>
                                    <span className="h-1 w-1 bg-gray-300 rounded-full" />
                                    <p className="text-[10px] text-gray-400 font-medium">Replies in 5 mins</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500 transition-colors"><Phone className="h-4 w-4" /></button>
                    <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500 transition-colors"><Video className="h-4 w-4" /></button>
                    <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500 transition-colors"><Search className="h-4 w-4" /></button>
                    <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500 transition-colors"><MoreVertical className="h-4 w-4" /></button>
                </div>
            </div>

            {/* Messages */}
            <div className="messages-container flex-1 overflow-y-auto p-6 bg-[#f8fafc] dark:bg-[#0f172a] custom-scrollbar flex flex-col gap-3">
                <div className="date-divider relative flex items-center justify-center my-6">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100 dark:border-gray-800"></div></div>
                    <span className="relative z-10 px-4 py-1.5 bg-[#f8fafc] dark:bg-[#0f172a] text-[11px] font-bold text-gray-400 uppercase tracking-widest rounded-full">Today</span>
                </div>
                {messages.map((msg, idx) => (
                    <MessageBubble
                        key={msg.id}
                        message={msg}
                        isOwn={msg.senderId === currentUserId}
                        showAvatar={idx === 0 || messages[idx - 1].senderId !== msg.senderId}
                    />
                ))}
                {isTyping && (
                    <div className="typing-indicator flex items-center gap-2 mt-4 ml-10">
                        <div className="flex gap-1.5">
                            <span className="typing-dot w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce" />
                            <span className="typing-dot w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                            <span className="typing-dot w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                        <span className="text-[11px] text-primary-600 font-bold italic">{otherParticipant?.fullName} is typing...</span>
                    </div>
                )}
            </div>

            {/* Input with More Tools */}
            <div className="chat-input-container p-4 bg-white dark:bg-[#0f172a] border-t border-gray-100 dark:border-gray-800 shrink-0">
                <div className="chat-input-wrapper flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-2xl border border-transparent focus-within:border-primary-500/30 focus-within:bg-white dark:focus-within:bg-gray-800 transition-all shadow-sm">
                    <div className="input-tools flex items-center gap-1 pl-1">
                        <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-white dark:hover:bg-gray-700 rounded-full transition-all" title="Camera"><Camera className="h-4 w-4" /></button>
                        <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-white dark:hover:bg-gray-700 rounded-full transition-all" title="Gallery"><ImageIcon className="h-4 w-4" /></button>
                        <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-white dark:hover:bg-gray-700 rounded-full transition-all" title="File"><Paperclip className="h-4 w-4" /></button>
                    </div>

                    <input
                        type="text"
                        placeholder="Type something nice..."
                        className="flex-1 min-w-0 outline-none bg-transparent text-[14px] px-2 py-2 text-gray-900 dark:text-gray-100"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setIsTyping(e.target.value.length > 0);
                        }}
                        onBlur={() => setIsTyping(false)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />

                    <div className="flex items-center gap-1 pr-1">
                        <button className="p-2 text-gray-400 hover:text-primary-600 rounded-full transition-all"><Smile className="h-5 w-5" /></button>
                        <button className="p-2 text-gray-400 hover:text-primary-600 rounded-full transition-all"><Mic className="h-5 w-5" /></button>
                        <button
                            onClick={handleSend}
                            className={`p-2.5 rounded-xl ml-1 transition-all duration-300 ${inputValue.trim() ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30 scale-100 rotate-0' : 'text-gray-300 scale-90 grayscale opacity-50'}`}
                            disabled={!inputValue.trim()}
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
