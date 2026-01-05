'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Search,
    Send,
    Phone,
    Video,
    MoreVertical,
    Paperclip,
    Smile,
    Image as ImageIcon,
    User,
    Check
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function VenueStaffMessages() {
    return (
        <div className="h-[calc(100vh-160px)] animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="h-full border-none shadow-sm dark:bg-gray-900/50 flex overflow-hidden">
                {/* Chat Sidebar */}
                <div className="w-80 border-r dark:border-gray-800 flex flex-col bg-white dark:bg-gray-900/20">
                    <div className="p-4 border-b dark:border-gray-800">
                        <h2 className="text-xl font-bold mb-4">Tin nhắn</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input placeholder="Tìm hội thoại..." className="pl-10 h-10 rounded-xl" />
                        </div>
                    </div>
                    <ScrollArea className="flex-1">
                        {[
                            { name: 'Nguyễn Văn Hải', lastMsg: 'Sân 1 có nướt lọc không bạn?', time: '2 phút', unread: 2, online: true },
                            { name: 'Owner - Anh Hoàng', lastMsg: 'Mai ca sáng nhớ kiểm tra lưới.', time: '1 giờ', unread: 0, online: true },
                            { name: 'Khách - Lê Quân', lastMsg: 'Cảm ơn bạn nhé!', time: 'Hôm qua', unread: 0, online: false },
                            { name: 'Trần Minh Nam', lastMsg: 'Mình muốn đặt sân cho tối mai.', time: 'Hôm qua', unread: 0, online: true },
                        ].map((chat, i) => (
                            <div key={i} className={cn(
                                "p-4 flex gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer border-b last:border-0 dark:border-gray-800",
                                i === 0 && "bg-primary-50 dark:bg-primary-900/10"
                            )}>
                                <div className="relative shrink-0">
                                    <div className="h-12 w-12 rounded-2xl bg-primary-100 flex items-center justify-center font-bold text-primary-700">
                                        {chat.name.charAt(0)}
                                    </div>
                                    {chat.online && (
                                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <p className="font-bold text-sm text-gray-900 dark:text-white truncate">{chat.name}</p>
                                        <span className="text-[10px] text-gray-400 font-medium">{chat.time}</span>
                                    </div>
                                    <p className={cn(
                                        "text-xs truncate",
                                        chat.unread > 0 ? "text-gray-900 dark:text-gray-200 font-bold" : "text-gray-500"
                                    )}>
                                        {chat.lastMsg}
                                    </p>
                                </div>
                                {chat.unread > 0 && (
                                    <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-primary-600">
                                        {chat.unread}
                                    </Badge>
                                )}
                            </div>
                        ))}
                    </ScrollArea>
                </div>

                {/* Chat Window */}
                <div className="flex-1 flex flex-col bg-gray-50/30 dark:bg-gray-900/40">
                    {/* Chat Header */}
                    <div className="p-4 border-b dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-primary-100 flex items-center justify-center font-bold text-primary-700">N</div>
                            <div>
                                <h3 className="font-bold text-sm">Nguyễn Văn Hải</h3>
                                <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Đang hoạt động</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="text-gray-400 rounded-full"><Phone className="h-5 w-5" /></Button>
                            <Button variant="ghost" size="icon" className="text-gray-400 rounded-full"><Video className="h-5 w-5" /></Button>
                            <Button variant="ghost" size="icon" className="text-gray-400 rounded-full"><MoreVertical className="h-5 w-5" /></Button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <ScrollArea className="flex-1 p-6">
                        <div className="space-y-6">
                            <div className="flex justify-center">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">HÔM NAY</span>
                            </div>

                            {/* Received */}
                            <div className="flex gap-3 max-w-[70%]">
                                <div className="h-8 w-8 rounded-lg bg-gray-200 shrink-0 mt-auto" />
                                <div className="space-y-1">
                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 dark:border-gray-700">
                                        <p className="text-sm">Chào bạn, mình vừa đặt sân 1 chiều nay lúc 16:00. Không biết bên mình có sẵn nước lọc không ạ?</p>
                                    </div>
                                    <p className="text-[10px] text-gray-400 pl-1">14:50 PM</p>
                                </div>
                            </div>

                            {/* Sent */}
                            <div className="flex flex-row-reverse gap-3 max-w-[70%] ml-auto text-right">
                                <div className="space-y-1">
                                    <div className="bg-primary-600 text-white p-4 rounded-2xl rounded-br-none shadow-md shadow-primary-500/20">
                                        <p className="text-sm italic">Dạ chào anh Hải. Bên em sân có phục vụ nước lọc miễn phí và có bán kèm nước giải khát ở quầy dịch vụ nữa ạ!</p>
                                    </div>
                                    <div className="flex items-center justify-end gap-1 px-1">
                                        <p className="text-[10px] text-gray-400">14:52 PM</p>
                                        <Check className="h-3 w-3 text-primary-500" />
                                    </div>
                                </div>
                            </div>

                            {/* Received */}
                            <div className="flex gap-3 max-w-[70%]">
                                <div className="h-8 w-8 rounded-lg bg-gray-200 shrink-0 mt-auto" />
                                <div className="space-y-1">
                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 dark:border-gray-700">
                                        <p className="text-sm">Vâng cảm ơn bạn nhé. Tầm 15:50 mình tới.</p>
                                    </div>
                                    <p className="text-[10px] text-gray-400 pl-1">14:53 PM</p>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="p-4 bg-white dark:bg-gray-900/50 border-t dark:border-gray-800">
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-2xl">
                            <Button variant="ghost" size="icon" className="text-gray-400 shrink-0"><Paperclip className="h-5 w-5" /></Button>
                            <Input
                                placeholder="Nhập tin nhắn..."
                                className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-10"
                            />
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="text-gray-400 shrink-0"><Smile className="h-5 w-5" /></Button>
                                <Button variant="ghost" size="icon" className="text-gray-400 shrink-0"><ImageIcon className="h-5 w-5" /></Button>
                                <Button className="bg-primary-600 hover:bg-primary-700 text-white h-10 rounded-xl px-5 ml-1">
                                    <Send className="h-4 w-4 mr-2" /> Gửi
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
