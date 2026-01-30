'use client';

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { useVenueStore } from "@/lib/store/venue.store";
import { venueService } from "@/lib/api/services/venue.service";
import { useOwnerBookings } from "@/lib/hooks/useOwnerBookings";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const bookingSchema = z.object({
    venueId: z.string().min(1, "Please select a venue"),
    courtId: z.string().min(1, "Please select a court"),
    bookingDate: z.string().min(1, "Please select a date"),
    startTime: z.string().min(1, "Please select start time"),
    endTime: z.string().min(1, "Please select end time"),
    customerName: z.string().min(1, "Customer name is required"),
    customerPhone: z.string().optional(),
    totalPrice: z.coerce.number().min(0),
    note: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface NewBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function NewBookingModal({ isOpen, onClose }: NewBookingModalProps) {
    const { venues } = useVenueStore();
    const { createWalkIn, isCreating } = useOwnerBookings();
    const { toast } = useToast();
    const [courts, setCourts] = useState<any[]>([]);
    const [isLoadingCourts, setIsLoadingCourts] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        reset
    } = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            venueId: "",
            courtId: "",
            bookingDate: new Date().toISOString().split('T')[0],
            startTime: "",
            endTime: "",
            customerName: "Walk-in Customer",
            customerPhone: "",
            totalPrice: 0,
            note: "",
        },
    });

    const selectedVenueId = watch("venueId");

    useEffect(() => {
        if (selectedVenueId) {
            const fetchCourts = async () => {
                setIsLoadingCourts(true);
                try {
                    const data = await venueService.getOwnerCourts(selectedVenueId);
                    setCourts(data);
                } catch (error) {
                    console.error("Failed to fetch courts", error);
                } finally {
                    setIsLoadingCourts(false);
                }
            };
            fetchCourts();
        } else {
            setCourts([]);
        }
    }, [selectedVenueId]);

    const onSubmit = async (values: BookingFormValues) => {
        try {
            await createWalkIn({
                ...values,
                status: 'CONFIRMED',
            });
            onClose();
            reset();
        } catch (error: any) {
            // Error handled by hook
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create New Booking (Walk-in)</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="venueId">Venue</Label>
                            <Select
                                id="venueId"
                                options={venues.map(v => ({ value: v.id, label: v.name }))}
                                {...register('venueId')}
                            />
                            {errors.venueId && <p className="text-xs text-red-500">{errors.venueId.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="courtId">Court</Label>
                            <Select
                                id="courtId"
                                disabled={!selectedVenueId || isLoadingCourts}
                                options={courts.map(c => ({ value: c.id, label: c.name }))}
                                {...register('courtId')}
                            />
                            {errors.courtId && <p className="text-xs text-red-500">{errors.courtId.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bookingDate">Date</Label>
                        <Input id="bookingDate" type="date" {...register('bookingDate')} />
                        {errors.bookingDate && <p className="text-xs text-red-500">{errors.bookingDate.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="startTime">Start Time</Label>
                            <Input id="startTime" type="time" {...register('startTime')} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="endTime">End Time</Label>
                            <Input id="endTime" type="time" {...register('endTime')} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="customerName">Customer Name</Label>
                            <Input id="customerName" placeholder="Full name" {...register('customerName')} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="customerPhone">Phone Number</Label>
                            <Input id="customerPhone" placeholder="090..." {...register('customerPhone')} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="totalPrice">Total Price (VND)</Label>
                        <Input id="totalPrice" type="number" {...register('totalPrice')} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="note">Note</Label>
                        <Input id="note" placeholder="Extra details..." {...register('note')} />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isCreating}>
                            {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Booking
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
