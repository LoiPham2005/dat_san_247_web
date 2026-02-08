import { z } from 'zod';
import { UserRole } from '@/types/auth.types';

export const loginSchema = z.object({
    email: z.string().email('Địa chỉ email không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export const registerSchema = z.object({
    fullName: z.string().min(2, 'Họ và tên phải có ít nhất 2 ký tự'),
    email: z.string().email('Địa chỉ email không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    phone: z.string().regex(/^[0-9]{10}$/, 'Số điện thoại phải có 10 chữ số'),
    role: z.nativeEnum(UserRole),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
});

export const bookingSchema = z.object({
    venueId: z.string().min(1, 'Venue is required'),
    date: z.date(),
    startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
    duration: z.number().min(1, 'Duration must be at least 1 hour'),
});
