'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Calendar,
    Clock,
    MapPin,
    QrCode,
    MoreHorizontal,
    MessageCircle,
    RotateCcw
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Enhanced Mock Data
const MY_BOOKINGS = [
    {
        id: "BK-7829",
        venue: "City Sports Complex - Field 3",
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2670&auto=format&fit=crop",
        address: "123 Le Loi, District 1, HCMC",
        date: "Today, Mar 25",
        time: "19:00 - 20:30",
        price: 450000,
        status: "UPCOMING",
        paymentStatus: "PAID"
    },
    {
        id: "BK-9921",
        venue: "Tennis Club Saigon",
        image: "https://images.unsplash.com/photo-1628779238951-be2c9f256544?q=80&w=2574&auto=format&fit=crop",
        address: "456 Nguyen Van Linh, District 7",
        date: "Tomorrow, Mar 26",
        time: "07:00 - 09:00",
        price: 600000,
        status: "UPCOMING",
        paymentStatus: "PENDING"
    },
    {
        id: "BK-1022",
        venue: "Badminton Zone A",
        image: "https://images.unsplash.com/photo-1626224583764-847890e058f5?q=80&w=2000&auto=format&fit=crop",
        address: "88 Pham Van Dong, Thu Duc",
        date: "Mar 15, 2024",
        time: "18:00 - 19:00",
        price: 200000,
        status: "COMPLETED",
        paymentStatus: "PAID"
    },
    {
        id: "BK-0012",
        venue: "City Sports Complex - Field 1",
        image: "https://images.unsplash.com/photo-1555661530-68c8e238000d?q=80&w=2000&auto=format&fit=crop",
        address: "123 Le Loi, District 1, HCMC",
        date: "Feb 28, 2024",
        time: "20:00 - 21:00",
        price: 300000,
        status: "CANCELLED",
        paymentStatus: "REFUNDED"
    }
];

export default function CustomerBookingsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">My Bookings</h1>

            <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="mb-8 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl h-auto w-full md:w-auto flex">
                    <TabsTrigger value="upcoming" className="flex-1 md:w-40 rounded-lg py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">Upcoming</TabsTrigger>
                    <TabsTrigger value="completed" className="flex-1 md:w-40 rounded-lg py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">Completed</TabsTrigger>
                    <TabsTrigger value="cancelled" className="flex-1 md:w-40 rounded-lg py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">Cancelled</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="space-y-4">
                    {MY_BOOKINGS.filter(b => b.status === "UPCOMING").map(booking => (
                        <BookingCard key={booking.id} booking={booking} />
                    ))}
                </TabsContent>
                <TabsContent value="completed" className="space-y-4">
                    {MY_BOOKINGS.filter(b => b.status === "COMPLETED").map(booking => (
                        <BookingCard key={booking.id} booking={booking} />
                    ))}
                </TabsContent>
                <TabsContent value="cancelled" className="space-y-4">
                    {MY_BOOKINGS.filter(b => b.status === "CANCELLED").map(booking => (
                        <BookingCard key={booking.id} booking={booking} />
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
}

function BookingCard({ booking }: any) {
    const isUpcoming = booking.status === 'UPCOMING';

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6">
            {/* Image */}
            <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0">
                <img src={booking.image} alt={booking.venue} className="w-full h-full object-cover" />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{booking.venue}</h3>
                            <p className="text-sm text-gray-500 font-mono">{booking.id}</p>
                        </div>
                        <Badge variant={
                            booking.status === 'UPCOMING' ? 'info' :
                                booking.status === 'COMPLETED' ? 'success' : 'danger'
                        }>
                            {booking.status}
                        </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center gap-2 sm:col-span-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="truncate">{booking.address}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-800 pt-4 md:pt-0 pl-0 md:pl-6 gap-3 min-w-[140px]">
                {isUpcoming ? (
                    <>
                        <Button className="w-full bg-gray-900 text-white flex gap-2">
                            <QrCode className="h-4 w-4" /> Check In
                        </Button>
                        <div className="flex w-full gap-2">
                            <Button variant="outline" className="flex-1" size="icon">
                                <MessageCircle className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="flex-1" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                    <DropdownMenuItem>Request Invoice</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">Cancel Booking</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </>
                ) : (
                    <>
                        <Button variant="outline" className="w-full flex gap-2">
                            <RotateCcw className="h-4 w-4" /> Book Again
                        </Button>
                        {booking.status === 'COMPLETED' && (
                            <Button variant="ghost" className="w-full text-primary-600">
                                Write Review
                            </Button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
