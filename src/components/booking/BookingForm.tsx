'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';

export const BookingForm = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Implement actual inputs later */}
            <p>Booking Form Placeholder</p>
            <Button type="submit">Book Now</Button>
        </form>
    );
};
